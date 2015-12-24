module Egret3D.openGLES {
    export class IndexBuffer3D implements Egret3D.IndexBuffer3D {
        public buffer: WebGLBuffer;
        constructor(buffer: WebGLBuffer) {
            this.buffer = buffer;
        }
    }
}