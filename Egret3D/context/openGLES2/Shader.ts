module BlackSwan.openGLES {
    export class Shader implements BlackSwan.Shader {
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