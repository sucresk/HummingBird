module BlackSwan.openGLES {
    export class Texture2D  implements BlackSwan.Texture2D {
        private context3D: Context3D;

        public gpu_index: number;
        public gpu_border: number;
        public gpu_colorformat: ColorFormat;
        public gpu_internalformat: InternalFormat;
        public gpu_texture2D: any;

        public image: HTMLImageElement;
        public mipmapDatas: Array<MipmapData>;

        constructor(texture2D: WebGLTexture , context3D: any ) {
            this.gpu_texture2D = texture2D;
            this.context3D = context3D
            this.mipmapDatas = new Array<MipmapData>();
        }
    }
}