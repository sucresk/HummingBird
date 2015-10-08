module BlackSwan {
    export class AnimationStateSet {

        constructor(){
        }

        public createAnimationState(animName:string, timePos:number, length:number, weight:number, enabled:boolean = false) :AnimationState{
            return new AnimationState(animName, timePos, length, weight, enabled );
        }

        public getAnimationState(name:string):AnimationState{
            return null;
        }

        public hasAnimationState(name:string):boolean{
            return false;
        }

        public removeAnimationState(name:string){

        }

        public removeAllAnimationStates(){

        }

    }
}
