module Egret3D.openGLES {
    export class VertexBuffer3D implements Egret3D.VertexBuffer3D {
        public buffer: WebGLBuffer;
        constructor(buffer: WebGLBuffer) {
            this.buffer = buffer;
        }
    }
}