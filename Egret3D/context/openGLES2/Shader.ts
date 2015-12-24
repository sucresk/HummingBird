module Egret3D.openGLES {
    export class Shader implements Egret3D.Shader {
        static ID_COUNT: number = 0;
        public id: number;

        private _shader: WebGLShader;
        constructor(shader: WebGLShader) {
            this._shader = shader;
        }


        public get shader(): WebGLShader {
            return this._shader;
        }
    }
} 