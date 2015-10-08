module BlackSwan {
    export class AnimationState {

        private _animationState:string = "";
        private _timePosition:number;
        private _weight:number;
        private _enabled:boolean;
        private _loop:boolean;
        private _length:number;

        constructor(animName:string, timePos:number, length:number, weight:number = 1.0, enable:boolean = false) {
        }

        public hasEnded():boolean {
            return true;
        }

        //修改时间位置
        public addTime(offset:number) {

        }

        public get length():number {
            return this._length;
        }

        public set length(value:number) {
            this._length = value;
        }

        //取得动画名字
        public get animationState():string {
            return this._animationState;
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
        }

        //动画权重
        public get weight():number {
            return this._weight;
        }

        public set weight(value:number) {
            this._weight = value;
        }

        //动画局部时间位置
        public get timePosition():number {
            return this._timePosition;
        }

        public set timePosition(value:number) {
            this._timePosition = value;
        }
    }
}