module Egret3D.openGLES {
    export class Texture2D  implements Egret3D.Texture2D {
        private context3D: Context3D;

        public gpu_index: number;
        public gpu_border: number;
        public gpu_colorformat: number;
        public gpu_internalformat: InternalFormat;
        public gpu_texture: any;

        public image: HTMLImageElement;
        public mipmapDatas: Array<MipmapData>;
        public frameBuffer: WebGLFramebuffer;
        public renderbuffer: WebGLRenderbuffer;

        public width: number = 0;
        public height: number = 0;

        constructor(texture2D: WebGLTexture , context3D: any ) {
            this.gpu_texture = texture2D;
            this.context3D = context3D
            this.mipmapDatas = new Array<MipmapData>();
        }
    }
}