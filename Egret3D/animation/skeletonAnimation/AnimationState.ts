module Egret3D {
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
        private _playing: boolean = true;

        constructor(animName:string, timePos:number, length:number, weight:number = 1.0, enable:boolean = false) {
            this._animationName = animName;
            this._blendMask = 0;
            this._timePosition = timePos;
            this._length = length;
            this._weight = weight;
            this._enabled = enable;
            this._loop = true;
        }

        public clone(): AnimationState {

            var animationState: AnimationState = new AnimationState(this._animationName, 0, this._length, this._weight, this._enabled);

            animationState.poseArray = this.poseArray;

            animationState.frameCount = this.frameCount;

            return animationState;
        }

        public hasEnded():boolean {
            return ((this._timePosition >= this._length) && !this._loop);
        }

        public addTime(offset:number) {
            this.timePosition += offset;
        }

        public get currentFrameIndex(): number {

            var currentFrameIndex: number = Math.floor(this._timePosition / 80) % this.poseArray.length;

            return currentFrameIndex;
        }

        public set currentFrameIndex(value: number) {

            value = Math.abs(value) % this.poseArray.length;

            this.timePosition = value * 80;
        }

        public get nextFrameIndex(): number {
            return (this.currentFrameIndex + 1) % this.poseArray.length;
        }

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

        public get loop():boolean {
            return this._loop;
        }

        public set loop(value:boolean) {
            this._loop = value;
        }

        public get play(): boolean {
            return this._playing;
        }

        public set play(value: boolean) {
            this._playing = value;
        }

        public get enabled():boolean {
            return this._enabled;
        }

        public set enabled(value:boolean) {
            this._enabled = value;
            this.parent.notifyAnimationStateEnabled(this, value);
        }

        public get weight():number {
            return this._weight;
        }

        public set weight(value:number) {
            this._weight = value;
            if(this._enabled) {
                this.parent.notifyDirty();
            }
        }

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
                        this._playing = false;
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

            var fps: number = 60.0;

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

