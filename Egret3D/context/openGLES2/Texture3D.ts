module BlackSwan.openGLES {
    export class Texture3D implements BlackSwan.Texture3D {
        public texture3D: WebGLTexture;
        constructor(texture3D: WebGLTexture) {
            this.texture3D = texture3D;
        }
    }
}