module BlackSwan.openGLES {
    export class IndexBuffer3D implements BlackSwan.IndexBuffer3D {
        public buffer: WebGLBuffer;
        constructor(buffer: WebGLBuffer) {
            this.buffer = buffer;
        }
    }
}