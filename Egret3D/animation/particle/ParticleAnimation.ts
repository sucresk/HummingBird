module Egret3D {
    export class ParticleAnimation implements IAnimation{
        ///vertexShader: Shader;
        ///activate(context3D: Context3D);
        public time: number = 0 ;
        public delay: number = 0;
        public speed: number = 1 ;
        private _play: boolean = false;
        public animaNodeCollection: AnimaNodeCollection; 

        constructor(nodeCollection: AnimaNodeCollection) {
            this.animaNodeCollection = nodeCollection ;
        }

        public initShader(vertexShader: VertexShader, pixelShader: PixelShader) {
        }

        private _t: number = 0;
        private _d: number = 0;
        public updata(time: number, delay: number) {
            ///this.time = time;
            this.delay = delay; 

            ///if (this.delay > 16)
            ///    this.delay = 16;
            /// 
            ///if (this.delay <= 16)
            ///    this.delay = 200;

            ///console.log(this.delay);
            this.time += this.delay; 
        }

        public play(animName?: string, speed?: number) {
            ///this.time = new Date().getTime();
        }

        public stop() {
        }

        public isPlay(): boolean {
            return this._play ;
        }

        public getAnimList(): string[] {
            return []; 
        }

        public getAnimNode(): AnimNodeBase[] {
            return [];
        }

        public clone(): IAnimation {
            return null;
        }
    }
}