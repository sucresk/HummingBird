module Egret3D {

    export enum AnimationEvent {
        EVENT_UNKNOWN,
        EVENT_PLAY_COMPLETE,
        EVENT_FRAME_CHANGE,
    };

    export class AnimationStateSet implements IAnimation{
        
        public time: number;
        public delay: number;
        public speed: number;

        public currentAnim: string = "";
        public animaNodeCollection: AnimaNodeCollection; 

        private _skinSkeleton: Skeleton = null;
        private _animationSkeleton: Skeleton = new Skeleton();
        private _animationStates:{[id:string]:AnimationState};
        private _skeletonMatrix: Float32Array;
        private _eventCallbackList: { [eventType: number]: Array<Function> } = [];
        private _bindList: { [jointIndex: number]: Array<Object3D> };
        private _animList: Array<string> = [];
        private _enabledAnimationStates: Array<AnimationState>;
        private _useCache: boolean = true;
        private _smooth: boolean = false;
        private _dirtyFrameNumber: number;
        private _playSpeed: number = 1.0;
        private _playing: boolean = false;
        private _currentFrame: number = 0;
        

        /// 临时变量，用于在具体函数中计算时避免实时创建;
        private _temp_smooth: SkeletonPose = new SkeletonPose();
        private _temp_quat: Quaternion = new Quaternion();
        private _temp_vec3: Vector3D = new Vector3D();

        constructor(skinSkeleton:Skeleton){
            this._animationStates = {};
            this._bindList = {};
            this._dirtyFrameNumber = 0;
            this._enabledAnimationStates = [];
            this._skinSkeleton = skinSkeleton;
            this._skeletonMatrix = new Float32Array(this._skinSkeleton.numJoints * 8);
        }

        public initShader(vertexShader:VertexShader,pixelShader:PixelShader) {
            vertexShader.maxBone = this.getJointNumber() * 2;
        }

        public clone(): AnimationStateSet {

            var ret: AnimationStateSet = new AnimationStateSet(this._skinSkeleton);

            for (var id in this._animationStates) {
                ret._animationStates[id] = this._animationStates[id].clone();
            }

            ret._animationSkeleton = this._animationSkeleton;

            ret._animList = this._animList;

            return ret;
        }

        public get skeletonMatrixData(): Float32Array {
            return this._skeletonMatrix;
        }

        public getJointNumber(): number {
            return this._skinSkeleton.numJoints;
        }

        public addAnimationState(animationState: AnimationState): AnimationState {

            if (this._animationStates[animationState.animationName]) {
                return this._animationStates[animationState.animationName];
            }

            if (this._animationSkeleton.numJoints < animationState.poseArray[0].jointPoses.length && this._animationSkeleton.numJoints != animationState.poseArray[0].jointPoses.length) {

                this._animationSkeleton.joints = [];

                var jointPoses: Array<JointPose> = animationState.poseArray[0].jointPoses;
                
                for (var i: number = 0; i < jointPoses.length; i++) {

                    var joint: Joint = new Joint();
                    joint.name = jointPoses[i].name;
                    joint.parentIndex = animationState.poseArray[0].findJointPoseIndex(jointPoses[i].parent);


                    var inverseBindPoseJoint: Joint = this._skinSkeleton.findJoint(joint.name);

                    if (inverseBindPoseJoint) {
                        joint.inverseBindPose = inverseBindPoseJoint.inverseBindPose;
                    }
                    else {
                        joint.inverseBindPose = null;
                    }

                    this._animationSkeleton.joints.push(joint);
                }
            }

            animationState.fillFrame(this._animationSkeleton);

            animationState.parent = this;

            this._animationStates[animationState.animationName] = animationState;

            this._animList.push(animationState.animationName);

            return animationState;
        }

        public updata(time: number, delay: number): void {

            if (this._enabledAnimationStates.length <= 0)
                return;

            var animationState: AnimationState = this._enabledAnimationStates[0];

            var currentFrameIndex: number = 0;

            var currentSkeleton: SkeletonPose = null;

            if (this._playing) {
                animationState.addTime(delay * this._playSpeed * 5);
            }

            if (animationState.currentFrameIndex == this._currentFrame)
                return;

            currentFrameIndex = animationState.currentFrameIndex;

            var frame: number = Math.abs(currentFrameIndex - this._currentFrame);
            var temp_frameIndex: number = this._currentFrame;
            for (var index: number = 0; index < frame; index++) {

                this._currentFrame = temp_frameIndex;

                if (this._currentFrame != currentFrameIndex) {
                    if (this._eventCallbackList[AnimationEvent.EVENT_FRAME_CHANGE]) {
                        var callbackList: Array<Function> = this._eventCallbackList[AnimationEvent.EVENT_FRAME_CHANGE];
                        for (var i: number = 0; i < callbackList.length; i++) {
                            (callbackList[i])(AnimationEvent.EVENT_FRAME_CHANGE, this);
                        }
                    }
                }

                temp_frameIndex++;
            }

            if (this._currentFrame > currentFrameIndex) {

                this._currentFrame = currentFrameIndex;

                if (this._eventCallbackList[AnimationEvent.EVENT_PLAY_COMPLETE]) {

                    var callbackList: Array<Function> = this._eventCallbackList[AnimationEvent.EVENT_PLAY_COMPLETE];

                    for (var i: number = 0; i < callbackList.length; i++) {
                        (callbackList[i])(AnimationEvent.EVENT_PLAY_COMPLETE, this);
                    }
                }
            }
            else {
                this._currentFrame = currentFrameIndex;
            }

            currentFrameIndex = this._currentFrame;

            animationState.currentFrameIndex = currentFrameIndex;

            currentSkeleton = animationState.poseArray[currentFrameIndex];

            


            if (this._useCache) {

                if (!currentSkeleton.skeletonMatrixValid) {

                    currentSkeleton.calculateJointWorldMatrix(this._animationSkeleton);

                    if (!currentSkeleton.skeletonMatrix) {
                        currentSkeleton.skeletonMatrix = new Float32Array(this._skeletonMatrix.length);
                    }

                    currentSkeleton.toMatrixData(this._skinSkeleton.joints, currentSkeleton.skeletonMatrix);

                    currentSkeleton.skeletonMatrixValid = true;
                }

                this.updateBindList(currentSkeleton);

                this._skeletonMatrix = currentSkeleton.skeletonMatrix;
            }
            else {
                
                if (!currentSkeleton.skeletonMatrixValid) {
                
                    currentSkeleton.calculateJointWorldMatrix(this._animationSkeleton);
                
                    currentSkeleton.skeletonMatrixValid = true;
                }
                
                if (this._smooth) {

                    var beforeFrame: SkeletonPose = animationState.poseArray[currentFrameIndex];

                    var nextFrame: SkeletonPose = animationState.poseArray[(currentFrameIndex + 1) % animationState.poseArray.length];

                    this._temp_smooth.skeletonLerp(beforeFrame, nextFrame, animationState.timePosition);

                    this._temp_smooth.calculateJointWorldMatrix(this._animationSkeleton);

                    this._temp_smooth.toMatrixData(this._skinSkeleton.joints, this._skeletonMatrix);

                    this.updateBindList(this._temp_smooth);
                }
                else {
                    currentSkeleton.toMatrixData(this._skinSkeleton.joints, this._skeletonMatrix);
                
                    this.updateBindList(currentSkeleton);
                }
            }
        }

        public play(animName: string = null, speed: number = 1.0): boolean {

            if (this._playing && this.currentAnim == animName)
                return true;

            if (this.currentAnim != animName) {

                if (!this._animationStates[animName])
                    return false;

                this.currentAnim = animName;

                this._enabledAnimationStates = [];

                this._enabledAnimationStates.push(this._animationStates[animName]);
            }

            this._currentFrame = 0;

            this._enabledAnimationStates[0].play = true;

            this._enabledAnimationStates[0].timePosition = 0;

            this._playSpeed = speed;

            this._playing = true;

            return true;
        }

        public playOnce(animName: string = null, speed: number = 1.0): boolean {

            ///if (this._playing && this.currentAnim == animName)
            ///    return true;

            if (this.currentAnim != animName) {

                if (!this._animationStates[animName])
                    return false;

                this.currentAnim = animName;

                this._enabledAnimationStates = [];

                this._enabledAnimationStates.push(this._animationStates[animName]);
            }

            this._currentFrame = 0;

            this._enabledAnimationStates[0].play = true;

            this._enabledAnimationStates[0].timePosition = 0;

            this._enabledAnimationStates[0].loop = false;

            this._playSpeed = speed;

            this._playing = true;

            return true;
        }

        public get currentFrame(): number {
            return this._currentFrame;
        }

        public set currentFrame(value: number) {

            if (this._enabledAnimationStates.length <= 0)
                return;

            this._enabledAnimationStates[0].timePosition = value * 160;
        }

        public getTotalNumberOfFrame(animName: string = null): number {

            animName = animName ? animName : this.currentAnim;

            var animation: AnimationState = this._animationStates[animName];

            if (!animation)
                return 0;

            return animation.poseArray.length;
        }

        public stop(): void {

            this._playing = false;
        }

        public isPlay(): boolean {

            if (false == this._enabledAnimationStates[0].play ) {
                return false;
            }

            return this._playing && this._enabledAnimationStates.length > 0;
        }

        public setPlaySpeed(speed: number): void {
            this._playSpeed = speed;
        }

        public bindToJointPose(jointName: string, obj3d: Object3D): boolean {

            var jointIndex: number = this._animationSkeleton.findJointIndex(jointName);

            if (jointIndex < 0)
                return false;

            var list: Array<Object3D> = null;

            if (this._bindList[jointIndex]) {
                list = this._bindList[jointIndex];
            }
            else {
                list = new Array<Object3D>();

                this._bindList[jointIndex] = list;
            }

            list.push(obj3d);

            return true;
        }

        public updateBindList(skeletonPose: SkeletonPose): void {

            var list: Array<Object3D> = null;

            var jointPose: JointPose = null;

            var obj3D: Object3D = null;

            for (var jointIndex in this._bindList) {

                list = this._bindList[jointIndex];

                if (list.length <= 0)
                    continue;

                jointPose = skeletonPose.jointPoses[jointIndex];

                if (!jointPose)
                    continue;

                for (var i: number = 0; i < list.length; i++) {
                    
                    obj3D = list[i];

                    this._temp_quat.fromMatrix(jointPose.worldMatrix);
                    this._temp_quat.toEulerAngles(this._temp_vec3);
                    obj3D.rotationX = this._temp_vec3.x;
                    obj3D.rotationY = this._temp_vec3.y;
                    obj3D.rotationZ = this._temp_vec3.z;

                    ///obj3D.scaleX = jointPose.worldMatrix.scale.x;
                    ///obj3D.scaleY = jointPose.worldMatrix.scale.y;
                    ///obj3D.scaleZ = jointPose.worldMatrix.scale.z;

                    obj3D.x = jointPose.worldMatrix.position.x;
                    obj3D.y = jointPose.worldMatrix.position.y;
                    obj3D.z = jointPose.worldMatrix.position.z;
                }
            }

        }

        public getAnimList(): string[]{
            return this._animList;
        }
        public getAnimNode(): AnimNodeBase[] {
            return null ;
        }

        public createAnimationState(animName:string, timePos:number, length:number, weight:number, enabled:boolean = false) :AnimationState{
            if(this._animationStates[animName]) {
                console.log("animation named " + animName + "already exists. AnimationStateSet::createAnimationState");
            }
            var state: AnimationState = new AnimationState(animName, timePos, length, weight, enabled);
            state.parent = this;
            this._animationStates[animName] = state;
            return state;
        }

        public addEventListening(event: AnimationEvent, callback: Function): boolean {

            if (!this._eventCallbackList[event]) {
                this._eventCallbackList[event] = [];
            }
            
            var tmp: Array<Function> = this._eventCallbackList[event];

            for (var i: number = 0; i < tmp.length; i++) {
                if (tmp[i] == callback)
                    return false;
            }

            tmp.push(callback);

            return true;
        }

        public removeEventListening(event: AnimationEvent, callback: Function): void {

            if (!this._eventCallbackList[event]) {
                return;
            }

            var tmp: Array<Function> = this._eventCallbackList[event];

            for (var i: number = 0; i < tmp.length; i++) {

                if (tmp[i] != callback)
                    continue;

                tmp.splice(i);

                break;
            }
        }

        public removeAllEventListening(): void {
            this._eventCallbackList = [];
        }

        public get dirtyFrameNumber():number {
            return this._dirtyFrameNumber;
        }

        public getAnimationState(name:string):AnimationState{
            return this._animationStates[name];
        }

        public hasAnimationState(name: string): boolean{
            if (this._animationStates[name])
                return true;
            return false ;
        }

        public notifyDirty():void {
            this._dirtyFrameNumber++;
        }

        public notifyAnimationStateEnabled(animationState:AnimationState, enabled:boolean):void {
            this._enabledAnimationStates.splice(this._enabledAnimationStates.indexOf(animationState), 1);
            if(enabled) {
                this._enabledAnimationStates.push(animationState);
            }
            this.notifyDirty();
        }

        public removeAnimationState(name:string){
            if(!this._animationStates[name]) {
                console.log("animation named: " + name + "not exists. AnimationStateSet::removeAnimationState");
            }
            delete this._animationStates[name];
        }

        public removeAllAnimationStates(){
            this._animationStates = {};
            this._enabledAnimationStates = [];

        }

    }

    class AnimationEventInfo {
        public eventType: AnimationEvent = AnimationEvent.EVENT_UNKNOWN;
        public callbacks: Array<Function> = [];
    }
}
