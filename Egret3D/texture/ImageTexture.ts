module BlackSwan {
    export class ImageTexture extends TextureBase {
        private image: HTMLImageElement;
        constructor(image: HTMLImageElement) {
            super();
            this.image = image; 
        }

        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_internalformat = InternalFormat.ImageData;
                this.texture.gpu_border = 0;
                this.texture.image = this.image;
                this.width = this.image.width;
                this.height = this.image.height;
                this.useMipmap = false;
            }
            context3D.upLoadTextureData(0, this.texture );
        }
    }

    

} 