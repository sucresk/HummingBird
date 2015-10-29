module BlackSwan {
    export interface IAnimation {
        //vertexShader: Shader;
        //activate(context3D: Context3D);
        updata(time: number, delay: number):void;

        play(): void;
        stop(): void;
        isPlay(): boolean;
        getAnimList(): string[];
        change(animName: string): boolean;
        clone(): IAnimation;
    }
} 