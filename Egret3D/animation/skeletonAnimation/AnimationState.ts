module BlackSwan {
    export class AnimationState {

        public poseArray: Array<SkeletonPose> = new Array<SkeletonPose>();
        public parent: AnimationStateSet;
        public frameCount: number = 0;
        

        private _animationName:string = "";
        private _timePosition:number;
        private _weight:number;
        private _enabled:boolean;
        private _loop:boolean;
        private _length:number;
        private _blendMask: number;
        private _sampling: number = 1;

        constructor(animName:string, timePos:number, length:number, weight:number = 1.0, enable:boolean = false) {
            this._animationName = animName;
            this._blendMask = 0;
            this._timePosition = timePos;
            this._length = length;
            this._weight = weight;
            this._enabled = enable;
            this._loop = true;
        }

        public hasEnded():boolean {
            return ((this._timePosition >= this._length) && !this._loop);
        }

        //修改时间位置
        public addTime(offset:number) {
            this.timePosition += offset;
        }

        //取得动画名字
        public get animationName():string {
            return this._animationName;
        }

        public get length():number {
            return this._length;
        }

        public set length(value:number) {
            this._length = value;
        }

        public get sampling(): number {
            return this._sampling;
        }

        public set sampling(value: number) {
            this._sampling = Math.max(value, 1);
        }

        //动画是否循环播放状态
        public get loop():boolean {
            return this._loop;
        }

        public set loop(value:boolean) {
            this._loop = value;
        }

        //是否播放状态
        public get enabled():boolean {
            return this._enabled;
        }

        public set enabled(value:boolean) {
            this._enabled = value;
            this.parent.notifyAnimationStateEnabled(this, value);
        }

        //动画权重
        public get weight():number {
            return this._weight;
        }

        public set weight(value:number) {
            this._weight = value;
            if(this._enabled) {
                this.parent.notifyDirty();
            }
        }

        //动画局部时间位置
        public get timePosition():number {
            return this._timePosition;
        }

        public set timePosition(value:number) {
            if(value != this._timePosition) {
                this._timePosition = value;
                if(this._loop) {
                    this._timePosition = value % this._length;
                    if(this._timePosition < 0) {
                        this._timePosition += this._length;
                    }
                }else {
                    if(this._timePosition < 0) {
                            this._timePosition = 0;
                    }else if(this._timePosition > this._length) {
                        this._timePosition = this._length;
                    }
                }
                if(this.enabled) {
                    this.parent.notifyDirty();
                }
            }
        }

        public fillFrame(initialSkeleton:Skeleton): void {

            for (var i: number = 0; i < this.poseArray.length; i++) {
                this.poseArray[i].calculateJointWorldMatrix(initialSkeleton);
            }

            if (this.frameCount == this.poseArray.length - 1)
                return;

            var skeletonPose: Array<SkeletonPose> = new Array<SkeletonPose>();

            var fps: number = 30.0;

            var gpf: number = 1000.0 / fps;

            skeletonPose.push(this.poseArray[0]);

            for (var frameIndex: number = 1; frameIndex <= this.frameCount; frameIndex++) {

                var currFrame: SkeletonPose = skeletonPose[frameIndex - 1];

                var nextFrame: SkeletonPose = this.poseArray[(Math.floor(frameIndex / this.sampling) + 1) % this.poseArray.length];

                var targetSkeletonPose: SkeletonPose = new SkeletonPose();

                targetSkeletonPose.skeletonLerp(currFrame, nextFrame, frameIndex * gpf);

                skeletonPose.push(targetSkeletonPose);
            }

            this.poseArray = skeletonPose;
        }
    }
}