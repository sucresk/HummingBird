module BlackSwan {
    export class StandAnimation implements IAnimation {
        //public vertexShader: Shader;

        constructor() {
        }

        //activate(context3D: Context3D) {
        //}

        public updata(time: number, delay: number):void {
        }

        public play(): void {
        }

        public stop(): void {
        }

        public isPlay(): boolean {
            return false;
        }

        public getAnimList(): string[]{
            return [];
        }

        public change(animName: string): boolean {
            return false;
        }

        public clone(): StandAnimation {
            return new StandAnimation();
        }
    }
} 