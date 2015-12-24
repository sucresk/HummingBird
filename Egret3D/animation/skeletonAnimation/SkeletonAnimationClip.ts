module Egret3D {

    /**
     * @language zh_CN
     * @class Egret3D.SkeletonAnimationClip
     * @classdesc
     * 骨骼动画
     */
    export class SkeletonAnimationClip{
        
        /**
        * @language zh_CN
        * 帧数
        */
        public frameCount: number = 0;

        private _animName: string = null;
        private _sampling: number = 1;
        private _timePosition: number;
        private _loop: boolean = true;
        private _playing: boolean = true;
        private _enabled: boolean = true;
        private _weight: number = 1.0;
        private _length: number = 0;
        private _parent: SkeletonAnimation = null;
        private _poseArray: Array<Skeleton> = null;

        constructor(animName: string) {
            this._animName = animName;
        }

        /**
        * @language zh_CN
        * 父对象
        */
        public get parent(): SkeletonAnimation {
            return this._parent;
        }

        /**
        * @language zh_CN
        * 动画Pose骨架序列
        */
        public get poseArray(): Array<Skeleton> {
            return this._poseArray;
        }

        /**
        * @language zh_CN
        * 动画Pose骨架序列
        */
        public set poseArray(array: Array<Skeleton>) {

            this._poseArray = array;

            this._length = array[array.length - 1].frameTime;
        }

        /**
        * @language zh_CN
        * 克隆新的SkeletonAnimationClip对象
        * @return 新的SkeletonAnimationClip
        */
        public clone(): SkeletonAnimationClip {

            var cloneObj: SkeletonAnimationClip = new SkeletonAnimationClip(this.animationName);

            cloneObj.frameCount = this.frameCount;

            cloneObj.poseArray = this._poseArray;

            return cloneObj;
        }
        
        /**
        * @language zh_CN
        * 是否已经结束
        * @return 是否已经结束
        */
        public hasEnded(): boolean {
            return ((this._timePosition >= this._length) && !this._loop);
        }

        /**
        * @language zh_CN
        * 添加动画播放时间偏移量
        * @param offset 时间增量
        */
        public addTime(offset: number) {
            this.timePosition += offset;
        }

        /**
        * @language zh_CN
        * 当前帧索引
        */
        public get currentFrameIndex(): number {

            var currentFrameIndex: number = Math.floor(this._timePosition / 80) % this._poseArray.length;

            return currentFrameIndex;
        }

        /**
        * @language zh_CN
        * 当前帧索引
        */
        public set currentFrameIndex(value: number) {

            value = Math.abs(value) % this._poseArray.length;

            this.timePosition = value * 80;
        }

        /**
        * @language zh_CN
        * 下一帧的索引
        */
        public get nextFrameIndex(): number {
            return (this.currentFrameIndex + 1) % this._poseArray.length;
        }

        /**
        * @language zh_CN
        * 动画名称
        */
        public get animationName(): string {
            return this._animName;
        }

        /**
        * @language zh_CN
        * 动画长度
        */
        public get length(): number {
            return this._length;
        }

        /**
        * @language zh_CN
        * 采样率
        */
        public get sampling(): number {
            return this._sampling;
        }

        /**
        * @language zh_CN
        * 采样率
        */
        public set sampling(value: number) {
            this._sampling = Math.max(value, 1);
        }

        /**
        * @language zh_CN
        * 是否循环
        */
        public get loop(): boolean {
            return this._loop;
        }

        /**
        * @language zh_CN
        * 是否循环
        */
        public set loop(value: boolean) {
            this._loop = value;
        }

        /**
        * @language zh_CN
        * 是否播放中
        */
        public get play(): boolean {
            return this._playing;
        }

        /**
        * @language zh_CN
        * 是否播放
        */
        public set play(value: boolean) {
            this._playing = value;
        }

        /**
        * @language zh_CN
        * 是否启用
        */
        public get enabled(): boolean {
            return this._enabled;
        }

        /**
        * @language zh_CN
        * 是否启用
        */
        public set enabled(value: boolean) {
            this._enabled = value;
            //this.parent.notifyAnimationStateEnabled(this, value);
        }

        /**
        * @language zh_CN
        * 混合权重
        */
        public get weight(): number {
            return this._weight;
        }

        /**
        * @language zh_CN
        * 混合权重
        */
        public set weight(value: number) {
            this._weight = value;
            if (this._enabled) {
                ;//this.parent.notifyDirty();
            }
        }

        /**
        * @language zh_CN
        * 播放的时间位置
        */
        public get timePosition(): number {
            return this._timePosition;
        }

        /**
        * @language zh_CN
        * 播放的时间位置
        */
        public set timePosition(value: number) {
            if (value != this._timePosition) {
                this._timePosition = value;
                if (this._loop) {
                    this._timePosition = value % this._length;
                    if (this._timePosition < 0) {
                        this._timePosition += this._length;
                    }
                } else {
                    if (this._timePosition < 0) {
                        this._timePosition = 0;
                    } else if (this._timePosition > this._length) {
                        this._timePosition = this._length;
                        this._playing = false;
                    }
                }
                if (this.enabled) {
                    ;//this.parent.notifyDirty();
                }
            }
        }

        /**
        * @language zh_CN
        * 填充帧
        * @param initialSkeleton 初始骨架
        */
        public fillFrame(initialSkeleton: Skeleton): void {

            for (var i: number = 0; i < this._poseArray.length; i++) {
                this._poseArray[i].calculateJointWorldMatrix(initialSkeleton);
            }

            if (this.frameCount == this._poseArray.length - 1)
                return;

            var skeletonPose: Array<Skeleton> = new Array<Skeleton>();

            var fps: number = 60.0;

            var gpf: number = 1000.0 / fps;

            skeletonPose.push(this._poseArray[0]);

            for (var frameIndex: number = 1; frameIndex <= this.frameCount; frameIndex++) {

                var currFrame: Skeleton = skeletonPose[frameIndex - 1];

                var nextFrame: Skeleton = this._poseArray[(Math.floor(frameIndex / this.sampling) + 1) % this._poseArray.length];

                var targetSkeletonPose: Skeleton = new Skeleton();

                targetSkeletonPose.skeletonLerp(currFrame, nextFrame, frameIndex * gpf);

                skeletonPose.push(targetSkeletonPose);
            }

            this.poseArray = skeletonPose;
        }

    }
}