module BlackSwan {
    export interface IAnimation {
        vertexShader: Shader;
        activate(context3D: Context3D);
        updata(time:number,delay:number);
    }
} 