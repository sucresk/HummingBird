module BlackSwan {
    export class TextureBase {

        public border: number;
        public useMipmap: boolean;

        public imageData: HTMLImageElement;
        public mimapData: Array<MipmapData>;
        public colorFormat: ColorFormat;
        public internalFormat: InternalFormat;

        //gpu
        public texture: Texture2D;

        constructor() {
            this.border = 0;
            this.useMipmap = false;
            this.imageData = null;
            this.colorFormat = ColorFormat.RGBA8888;
            this.internalFormat = InternalFormat.PixelArray;
            this.mimapData = new Array<MipmapData>();
        }

        public upload(context3D: Context3D) {

            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_internalformat = this.internalFormat;
                this.texture.gpu_colorformat = this.colorFormat;
                this.texture.mipmapDatas = this.mimapData;
                this.texture.image = this.imageData;
                this.texture.gpu_border = 0;
            }

            if (this.useMipmap) {

            }
            else {
                context3D.upLoadTextureData(0, this.texture);
            }
        }

        public get width(): number {
            if (this.imageData)
                return this.imageData.width;
            else if (this.mimapData.length > 0)
                return this.mimapData[0].width;
            return 0;
        }

        public get height(): number {
            if (this.imageData)
                return this.imageData.height;
            else if (this.mimapData.length > 0)
                return this.mimapData[0].height;
            return 0;
        }
    }
}