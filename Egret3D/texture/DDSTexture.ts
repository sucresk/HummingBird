module BlackSwan {
    export class DDSTexture extends TextureBase {
       
        public format: DDSFormat;
        public mipmapCount: number;
        public isCubemap: boolean;

        constructor() {

            super();
            this.mimapData = new Array<MipmapData>();
            this.width = 0;
            this.height = 0;
            this.format = null;
            this.mipmapCount = 1;
         

        }

        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_internalformat = InternalFormat.CompressData;
                if (DDSFormat.RGB_S3TC_DXT1_FORMAT == this.format) {
                    this.texture.gpu_colorformat = ColorFormat.DXT1_RGB;
                }
                else if (DDSFormat.RGBA_S3TC_DXT1_FORMAT == this.format) {
                    this.texture.gpu_colorformat = ColorFormat.DXT1_RGBA;
                }
                else if (DDSFormat.RGBA_S3TC_DXT3_FORMAT == this.format) {
                    this.texture.gpu_colorformat = ColorFormat.DXT3_RGBA;
                }
                else if (DDSFormat.RGBA_S3TC_DXT5_FORMAT == this.format) {
                    this.texture.gpu_colorformat = ColorFormat.DXT5_RGBA;
                }

                if (this.useMipmap) {
                    //context3D.upLoadTextureData();
                } else {
                    // 0 
                }
            }
        }
    }
}