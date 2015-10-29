module Egret3D {
    export interface IAnimation {

        time: number;
        delay: number;
        speed: number;
        
        animaNodeCollection: AnimaNodeCollection; 
        initShader( vertexShader:VertexShader , pixelShader:PixelShader );

        updata(time: number, delay: number):void;
        play(animName?: string, speed?: number): void;
        stop(): void;
        isPlay(): boolean;
        getAnimList(): string[];
        getAnimNode(): Array<AnimNodeBase>;
        clone(): IAnimation;
    }
} 