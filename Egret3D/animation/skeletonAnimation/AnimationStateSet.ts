module BlackSwan {
    export class AnimationStateSet implements IAnimation{

        private _animationStates:{[id:string]:AnimationState};
        private _dirtyFrameNumber:number;
        private _enabledAnimationStates: Array<AnimationState>;
        private _playSpeed: number = 30;
        private _time: number = 0;
        private _frameRate: number = 60;
        private _useCache: boolean = true;
        private _smooth: boolean = false;
        private _skeletonMatrix: Float32Array;
        private _skeletonCacheMatrix: Float32Array;
        private _initialSkeleton: Skeleton = new Skeleton();
        private _animList: Array<string> = [];
        private _currentAnim: string;
        private _bindList: { [jointIndex:number]: Array<Object3D> };

        // 临时变量，用于在具体函数中计算时避免实时创建;
        private _temp_smooth: SkeletonPose = new SkeletonPose();
        private _temp_quat: Quaternion = new Quaternion();
        private _temp_vec3: Vector3D = new Vector3D();

        constructor(initialSkeleton:Skeleton){
            this._animationStates = {};
            this._bindList = {};
            this._dirtyFrameNumber = 0;
            this._enabledAnimationStates = [];
            this.initialSkeleton = initialSkeleton;
        }

        public clone(): AnimationStateSet {

            var ret: AnimationStateSet = new AnimationStateSet(this._initialSkeleton);

            ret._animationStates = this._animationStates;

            ret._animList = this._animList;

            return ret;
        }

        public set initialSkeleton(skeleton: Skeleton) {

            this._initialSkeleton = skeleton;

            this._temp_smooth = new SkeletonPose();

            for (var i: number = 0; i < this._initialSkeleton.joints.length; i++) {
                this._temp_smooth.jointPoses.push(new JointPose());
            }

            this._temp_smooth.skeletonMatrix = new Float32Array(this._temp_smooth.jointPoses.length * 8);

            this._skeletonMatrix = this._temp_smooth.skeletonMatrix;

            if (this._useCache) {
                this._skeletonCacheMatrix = this._skeletonMatrix;
            }
        }

        public get initialSkeleton(): Skeleton {
            return this._initialSkeleton;
        }

        public get skeletonMatrixData(): Float32Array {

            if (this._useCache)
                return this._skeletonCacheMatrix;

            return this._skeletonMatrix;
        }

        public getJointNumber(): number {
            return this.initialSkeleton.numJoints;
        }

        public addAnimationState(animationState: AnimationState): AnimationState {
            if (this._animationStates[animationState.animationName]) {
                return this._animationStates[animationState.animationName];
            }

            //temp code;
            var newAnimationState: AnimationState = new AnimationState(animationState.animationName, animationState.timePosition, animationState.length);
            newAnimationState.frameCount = animationState.frameCount;
            newAnimationState.sampling = animationState.sampling;
            
            for (var frameIndex: number = 0; frameIndex < animationState.poseArray.length; frameIndex++) {

                var skeletonPose: SkeletonPose = animationState.poseArray[frameIndex];

                var newSkeletonPose: SkeletonPose = new SkeletonPose();
                newSkeletonPose.frameTime = skeletonPose.frameTime;

                var jointPose: JointPose = null;

                for (var jointIndex: number = 0; jointIndex < this.initialSkeleton.joints.length; jointIndex++) {

                    jointPose = null;

                    for (var i: number = 0; i < skeletonPose.jointPoses.length; i++) {
                        if (skeletonPose.jointPoses[i].name != this.initialSkeleton.joints[jointIndex].name)
                            continue;

                        jointPose = skeletonPose.jointPoses[i];

                        break;
                    }

                    if (!jointPose)
                        return null;

                    newSkeletonPose.jointPoses.push(jointPose);
                }

                newAnimationState.poseArray.push(newSkeletonPose);
            }

            newAnimationState.fillFrame(this.initialSkeleton);

            newAnimationState.parent = this;

            this._animationStates[animationState.animationName] = newAnimationState;

            this._animList.push(animationState.animationName);

            return newAnimationState;
        }

        public updata(time: number, delay: number): void {

            this._time += delay;

            for (var i = 0; i < this._enabledAnimationStates.length; i++) {

                var animationState = this._enabledAnimationStates[i];

                var Tnow: number = this._time % ((animationState.poseArray[animationState.poseArray.length - 1].frameTime - animationState.poseArray[0].frameTime) + (1000.0 / 60.0));

                var currentFrameIndex: number = Math.floor(Tnow / (1000.0 / 60.0)) % animationState.poseArray.length;

                var currentSkeleton: SkeletonPose = animationState.poseArray[currentFrameIndex];
                
                if (this._useCache) {

                    if (!currentSkeleton.skeletonMatrixValid) {

                        currentSkeleton.calculateJointWorldMatrix(this.initialSkeleton);

                        if (!currentSkeleton.skeletonMatrix) {
                            currentSkeleton.skeletonMatrix = new Float32Array(this._skeletonMatrix.length);
                        }

                        currentSkeleton.toMatrixData(currentSkeleton.skeletonMatrix);

                        currentSkeleton.skeletonMatrixValid = true;
                    }

                    this.updateBindList(currentSkeleton);

                    this._skeletonCacheMatrix = currentSkeleton.skeletonMatrix;
                }
                else {

                    if (!currentSkeleton.skeletonMatrixValid) {

                        currentSkeleton.calculateJointWorldMatrix(this.initialSkeleton);

                        currentSkeleton.skeletonMatrixValid = true;
                    }

                    if (this._smooth) {

                        var beforeFrame: SkeletonPose = animationState.poseArray[currentFrameIndex];

                        var nextFrame: SkeletonPose = animationState.poseArray[(currentFrameIndex + 1) % animationState.poseArray.length];

                        this._temp_smooth.skeletonLerp(beforeFrame, nextFrame, Tnow);

                        this._temp_smooth.calculateJointWorldMatrix(this.initialSkeleton);

                        this._temp_smooth.toMatrixData(this._skeletonMatrix);

                        this.updateBindList(this._temp_smooth);
                    }
                    else {
                        currentSkeleton.toMatrixData(this._skeletonMatrix);

                        this.updateBindList(currentSkeleton);
                    }
                }
            }
        }

        public play(): void {
        }

        public stop(): void {
        }

        public isPlay(): boolean {
            return true;
        }

        public bindToJointPose(jointName: string, obj3d: Object3D): boolean {

            var jointIndex: number = this._initialSkeleton.findJointIndex(jointName);

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

                    //obj3D.scaleX = jointPose.worldMatrix.scale.x;
                    //obj3D.scaleY = jointPose.worldMatrix.scale.y;
                    //obj3D.scaleZ = jointPose.worldMatrix.scale.z;

                    obj3D.x = jointPose.worldMatrix.position.x;
                    obj3D.y = jointPose.worldMatrix.position.y;
                    obj3D.z = jointPose.worldMatrix.position.z;
                }
            }

        }

        public getAnimList(): string[]{
            return this._animList;
        }

        public change(animName: string): boolean {

            if (this._currentAnim == animName)
                return;

            if (!this._animationStates[animName])
                return false;

            this._currentAnim = animName;

            this._enabledAnimationStates = [];

            this._enabledAnimationStates.push(this._animationStates[animName]);

            this._time = 0;

            return true;
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
}
