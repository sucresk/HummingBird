module Egret3D {

    /**
     * @language zh_CN
     * @class Egret3D.SkeletonAnimation
     * @classdesc
     * 骨骼动画控制器
     */
    export class SkeletonAnimation extends EventDispatcher implements IAnimation {

        /**
        * @language zh_CN
        * 动画播放完一个周期的事件
        */
        public static EVENT_PLAY_COMPLETE: string = "event_play_complete";

        /**
        * @language zh_CN
        * 动画帧更改的事件
        */
        public static EVENT_FRAME_CHANGE: string = "event_frame_change";

        /**
        * @language zh_CN
        * 时间
        */
        public time: number;

        /**
        * @language zh_CN
        * 延迟
        */
        public delay: number;

        /**
        * @language zh_CN
        * 速度
        */
        public speed: number;

        /**
        * @language zh_CN
        * 当前动画
        */
        public currentAnim: string;

        /**
        * @language zh_CN
        * 是否开启平滑
        */
        public smooth: boolean = false;

        private _initialSkeleton: Skeleton = null;
        private _animList: Array<string> = [];
        private _skeletonMatrix: Float32Array;
        private _animationSkeleton: Skeleton = new Skeleton();
        private _bindList: { [jointIndex: number]: Array<Object3D> } = {};
        private _enabledSkeletonAnimationClips: Array<SkeletonAnimationClip> = [];
        private _eventCallbackList: { [eventType: number]: Array<Function> } = [];
        private _skeletonAnimationClips: { [id: string]: SkeletonAnimationClip } = {};
        private _blendSkeleton: Skeleton = null;
        
        private _useCache: boolean = true;
        private _dirtyFrameNumber: number;
        private _playSpeed: number = 1.0;
        private _playing: boolean = false;
        private _currentFrame: number = 0;
        

        private _temp_smooth: Skeleton = new Skeleton();
        private _temp_quat: Quaternion = new Quaternion();
        private _temp_vec3: Vector3D = new Vector3D();

        constructor(initialSkeleton: Skeleton) {
            super();
            this._initialSkeleton = initialSkeleton;
            this._skeletonMatrix = new Float32Array(this._initialSkeleton.numJoint * 8);
        }

        /**
        * @language zh_CN
        * 骨骼动画容器
        * @return SkeletonAnimation对象
        */
        public get skeletonAnimationController(): SkeletonAnimation {
            return this;
        }

        /**
        * @language zh_CN
        * 初始化Shader
        * @param vertexShader vertexShader
        * @param pixelShader pixelShader
        * @return xxx
        */
        public initShader(vertexShader: VertexShader, pixelShader: PixelShader) {
            vertexShader.maxBone = this.jointNumber * 2;
        }

        /**
        * @language zh_CN
        * 克隆新的SkeletonAnimation对象
        * @return 新的SkeletonAnimation对象
        */
        public clone(): SkeletonAnimation {

            var ret: SkeletonAnimation = new SkeletonAnimation(this._initialSkeleton);

            for (var id in this._skeletonAnimationClips) {
                ret._skeletonAnimationClips[id] = this._skeletonAnimationClips[id].clone();
            }

            ret._animationSkeleton = this._animationSkeleton;

            ret._animList = this._animList;

            ret._blendSkeleton = this._blendSkeleton.clone();

            return ret;
        }

        /**
        * @language zh_CN
        * 当前播放的骨架矩阵阵列数组
        */
        public get currentSkeletonMatrixData(): Float32Array {
            return this._skeletonMatrix;
        }

        /**
        * @language zh_CN
        * 骨骼数
        */
        public get jointNumber(): number {
            return this._initialSkeleton.numJoint;
        }

        /**
        * @language zh_CN
        * 添加SkeletonAnimationClip对象
        * @param animationState SkeletonAnimationClip对象
        * @return SkeletonAnimationClip对象
        */
        public addSkeletonAnimationClip(animationState: SkeletonAnimationClip): SkeletonAnimationClip {

            if (this._skeletonAnimationClips[animationState.animationName]) {
                return this._skeletonAnimationClips[animationState.animationName];
            }

            if (this._animationSkeleton.numJoint < animationState.poseArray[0].joints.length && this._animationSkeleton.numJoint != animationState.poseArray[0].joints.length) {

                this._animationSkeleton.joints = [];

                var jointPoses: Array<Joint> = animationState.poseArray[0].joints;

                for (var i: number = 0; i < jointPoses.length; i++) {

                    var joint: Joint = new Joint(jointPoses[i].name);
                    joint.parentIndex = animationState.poseArray[0].findJointIndex(jointPoses[i].parent);


                    var inverseBindPoseJoint: Joint = this._initialSkeleton.findJoint(joint.name);

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

            for (var i: number = 0; i < animationState.poseArray.length; i++) {
                animationState.poseArray[i].initialSkeleton = this._initialSkeleton;
            }

            this._skeletonAnimationClips[animationState.animationName] = animationState;

            this._animList.push(animationState.animationName);

            if (!this._blendSkeleton) {

                this._blendSkeleton = animationState.poseArray[0].clone();

                //for (var i: number = 0; i < this._blendSkeleton.joints.length; i++) {
                //    this._blendSkeleton.joints[i].orientation = new Quaternion();
                //    this._blendSkeleton.joints[i].scale = new Vector3D();
                //    this._blendSkeleton.joints[i].translation = new Vector3D();
                //}
            }

            return animationState;
        }

        /**
        * @language zh_CN
        * 更新
        * @param time 总时间
        * @param delay 延迟时间
        */
        public updata(time: number, delay: number): void {

            if (this._enabledSkeletonAnimationClips.length <= 0)
                return;

            var currentFrameIndex: number = 0;

            var currentSkeleton: Skeleton = null;

            var animationState: SkeletonAnimationClip = null;

            var currentSkeleton1: Skeleton = null;

            var animationState1: SkeletonAnimationClip = null;

            this._blendSkeleton.reset();

            var blendSpeed: number = delay / 300 * 1;

            for (var i: number = 0; i < this._enabledSkeletonAnimationClips.length; i++) {

                animationState = this._enabledSkeletonAnimationClips[i];

                if (i != this._enabledSkeletonAnimationClips.length - 1) {

                    animationState.weight = Math.max(0, animationState.weight - blendSpeed);
                    
                    if (animationState.weight <= 0) {
                    
                        this._enabledSkeletonAnimationClips.splice(i, 1); i--;
                    
                        continue;
                    }
                }
                else {
                    animationState.weight = Math.min(1, animationState.weight + blendSpeed);
                }

                animationState.addTime(delay * this._playSpeed * 5);
            }

            if (this._enabledSkeletonAnimationClips.length > 1) {

                animationState = this._enabledSkeletonAnimationClips[0];
                currentSkeleton = animationState.poseArray[animationState.currentFrameIndex];
                if (!currentSkeleton.skeletonMatrixValid) {
                    currentSkeleton.calculateJointWorldMatrix(this._animationSkeleton);
                }

                animationState1 = this._enabledSkeletonAnimationClips[1];
                currentSkeleton1 = animationState1.poseArray[animationState1.currentFrameIndex];
                if (!currentSkeleton1.skeletonMatrixValid) {
                    currentSkeleton1.calculateJointWorldMatrix(this._animationSkeleton);
                }

                for (var i: number = 0; i < this._blendSkeleton.numJoint; i++) {

                    this._blendSkeleton.joints[i].orientation.lerp(currentSkeleton.joints[i].orientation, currentSkeleton1.joints[i].orientation, animationState1.weight);
                    this._blendSkeleton.joints[i].scale.lerp(currentSkeleton.joints[i].scale, currentSkeleton1.joints[i].scale, animationState1.weight);
                    this._blendSkeleton.joints[i].translation.lerp(currentSkeleton.joints[i].translation, currentSkeleton1.joints[i].translation, animationState1.weight);


                    this._blendSkeleton.joints[i].setLocalTransform(
                        this._blendSkeleton.joints[i].orientation,
                        this._blendSkeleton.joints[i].scale,
                        this._blendSkeleton.joints[i].translation
                    );
                }

                this._blendSkeleton.calculateJointWorldMatrix(this._animationSkeleton);

                this._blendSkeleton.toMatrixData(this._skeletonMatrix);
            }
            else {
                animationState = this._enabledSkeletonAnimationClips[0];

                currentSkeleton = animationState.poseArray[animationState.currentFrameIndex];

                if (!currentSkeleton.skeletonMatrixValid) {
                    currentSkeleton.calculateJointWorldMatrix(this._animationSkeleton);
                }

                currentSkeleton.toMatrixData(this._skeletonMatrix);
            }
            
        }

        /**
        * @language zh_CN
        * 播放
        * @param animName 动画名称
        * @param speed 速度
        * @return 是否成功
        */
        public play(animName: string = null, speed: number = 1.0): boolean {

            if (!this._skeletonAnimationClips[animName])
                return false;

            this._enabledSkeletonAnimationClips.push(this._skeletonAnimationClips[animName]);

            this._enabledSkeletonAnimationClips[this._enabledSkeletonAnimationClips.length - 1].weight = this._enabledSkeletonAnimationClips.length > 1 ? 0 : 1;

            this._enabledSkeletonAnimationClips[this._enabledSkeletonAnimationClips.length - 1].play = true;

            this._enabledSkeletonAnimationClips[this._enabledSkeletonAnimationClips.length - 1].timePosition = 0;

            /*if (this._playing && this.currentAnim == animName)
                return true;

            if (this.currentAnim != animName) {

                if (!this._skeletonAnimationClips[animName])
                    return false;

                this.currentAnim = animName;

                this._enabledSkeletonAnimationClips = [];

                this._enabledSkeletonAnimationClips.push(this._skeletonAnimationClips[animName]);
            }

            this._enabledSkeletonAnimationClips[0].play = true;

            this._enabledSkeletonAnimationClips[0].timePosition = 0;*/

            this._currentFrame = 0;

            this._playSpeed = speed;

            this._playing = true;

            return true;
        }

        /**
        * @language zh_CN
        * 播放一次
        * @param animName 动画名称
        * @param speed 播放速度
        * @return 是否成功
        */
        public playOnce(animName: string = null, speed: number = 1.0): boolean {

            ///if (this._playing && this.currentAnim == animName)
            ///    return true;

            if (this.currentAnim != animName) {

                if (!this._skeletonAnimationClips[animName])
                    return false;

                this.currentAnim = animName;

                this._enabledSkeletonAnimationClips = [];

                this._enabledSkeletonAnimationClips.push(this._skeletonAnimationClips[animName]);
            }

            this._currentFrame = 0;

            this._enabledSkeletonAnimationClips[0].play = true;

            this._enabledSkeletonAnimationClips[0].timePosition = 0;

            this._enabledSkeletonAnimationClips[0].loop = false;

            this._playSpeed = speed;

            this._playing = true;

            return true;
        }

        /**
        * @language zh_CN
        * 当前帧索引
        */
        public get currentFrame(): number {
            return this._currentFrame;
        }

        /**
        * @language zh_CN
        * 当前帧索引
        */
        public set currentFrame(value: number) {

            if (this._enabledSkeletonAnimationClips.length <= 0)
                return;

            this._enabledSkeletonAnimationClips[0].timePosition = value * 160;
        }

        /**
        * @language zh_CN
        * 获取总帧数
        * @param animName 动画名称
        * @return 动画总帧数
        */
        public getTotalNumberOfFrame(animName: string = null): number {

            animName = animName ? animName : this.currentAnim;

            var animation: SkeletonAnimationClip = this._skeletonAnimationClips[animName];

            if (!animation)
                return 0;

            return animation.poseArray.length;
        }

        /**
        * @language zh_CN
        * 停止动画播放
        */
        public stop(): void {

            this._playing = false;
        }

        /**
        * @language zh_CN
        * 动画是否在播放
        * @return 是否在播放
        */
        public isPlay(): boolean {

            if (false == this._enabledSkeletonAnimationClips[0].play) {
                return false;
            }

            return this._playing && this._enabledSkeletonAnimationClips.length > 0;
        }

        /**
        * @language zh_CN
        * 设置动画播放速度
        * @param speed 播放速度
        */
        public setPlaySpeed(speed: number): void {
            this._playSpeed = speed;
        }

        /**
        * @language zh_CN
        * 绑定3D对象到骨骼
        * @param jointName 骨骼名称
        * @param obj3d 3D对象
        * @return 是否成功
        */
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

        private updateBindList(skeletonPose: Skeleton): void {

            var list: Array<Object3D> = null;

            var jointPose: Joint = null;

            var obj3D: Object3D = null;

            for (var jointIndex in this._bindList) {

                list = this._bindList[jointIndex];

                if (list.length <= 0)
                    continue;

                jointPose = skeletonPose.joints[jointIndex];

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

        /**
        * @language zh_CN
        * 获取动画列表
        * @return 动画列表
        */
        public getAnimList(): string[] {
            return this._animList;
        }

        /**
        * @language zh_CN
        * 获取动画节点
        */
        public getAnimNode(): AnimNodeBase[] {
            return null;
        }

        /**
        * @language zh_CN
        * 脏帧数
        * @return xxx
        */
        public get dirtyFrameNumber(): number {
            return this._dirtyFrameNumber;
        }

        /**
        * @language zh_CN
        * 获取SkeletonAnimationClip对象
        * @param name 动画名称
        * @return SkeletonAnimationClip对象
        */
        public getAnimationState(name: string): SkeletonAnimationClip {
            return this._skeletonAnimationClips[name];
        }


        /**
        * @language zh_CN
        * 移除动画
        * @param name 动画名称
        */
        public removeAnimationState(name: string) {
            if (!this._skeletonAnimationClips[name]) {
                console.log("animation named: " + name + "not exists. SkeletonAnimationClip::removeAnimationState");
            }
            delete this._skeletonAnimationClips[name];
        }

        /**
        * @language zh_CN
        * 移除所有动画
        */
        public removeAllAnimationStates() {
            this._skeletonAnimationClips = {};
            this._enabledSkeletonAnimationClips = [];
        }

    }
}
