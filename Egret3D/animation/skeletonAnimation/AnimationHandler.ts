module Egret3D{
    export class AnimationHandler{
        public static _animations:Array<AnimationStateSet> = [];
        constructor() {

        }

        public static play(animation:AnimationStateSet):void {
            if(this._animations.indexOf(animation) === -1) {
                this._animations.push(animation);
            }
        }

        public static stop(animation:AnimationStateSet):void {
            var index:number  = this._animations.indexOf(animation);
            if(index !== -1 ) {
                this._animations.splice(index, 1);
            }
        }

        public static update(time:number):void {
            for (var i = 0; i < this._animations.length; i++) {
                var animation:AnimationStateSet = this._animations[i];
                ///animation.update(time);
            }

        }
    }

}