module BlackSwan.openGLES {
    export class VertexBuffer3D implements BlackSwan.VertexBuffer3D {
        public buffer: WebGLBuffer;
        constructor(buffer: WebGLBuffer) {
            this.buffer = buffer;
        }
    }
}