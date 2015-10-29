module Egret3D {
    export class StandAnimation implements IAnimation {
        ///public vertexShader: Shader;
        public time: number;
        public delay: number;
        public speed: number;

        public animaNodeCollection: AnimaNodeCollection; 

        constructor() {
        }

        public initShader(vertexShader: VertexShader, pixelShader: PixelShader) {

        }

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

        public getAnimNode(): AnimNodeBase[] {
            return null;
        }

        public change(animName: string): boolean {
            return false;
        }

        public clone(): StandAnimation {
            return new StandAnimation();
        }
    }
} 