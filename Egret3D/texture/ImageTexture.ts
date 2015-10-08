module BlackSwan {
    export class ImageTexture extends TextureBase  {

        public imageData: HTMLImageElement;

        constructor(img: HTMLImageElement) {
            super();

            this.imageData = img;
        }
        
        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_internalformat = InternalFormat.ImageData;
                this.texture.gpu_colorformat = ColorFormat.RGBA8888;
                this.texture.image = this.imageData;
                this.useMipmap = false;
            }
            context3D.upLoadTextureData(0, this.texture);
        }
    }
}