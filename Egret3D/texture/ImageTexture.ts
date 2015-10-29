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
                this.texture.gpu_colorformat = Egret3D.ColorFormat_RGBA8888;
            
                this.texture.image = this.imageData;
                this.useMipmap = false ;
                context3D.upLoadTextureData(0, this.texture);
                //context3D.setTexture2DSamplerState(Egret3D.NEAREST, Egret3D.NEAREST, Egret3D.CLAMP_TO_EDGE, Egret3D.CLAMP_TO_EDGE);
            }

            //if (!this.texture) {
            //    this.cubeTexture = context3D.creatCubeTexture();
            //    this.cubeTexture.image = this.imageData;
            //   // this.texture.gpu_internalformat = InternalFormat.ImageData;
            //    //this.texture.gpu_colorformat = Egret3D.ColorFormat_RGBA8888;

            //    context3D.uploadCubetexture(this.cubeTexture);
            //    //context3D.setTexture2DSamplerState(Egret3D.NEAREST, Egret3D.NEAREST, Egret3D.CLAMP_TO_EDGE, Egret3D.CLAMP_TO_EDGE);
            //}
        }
    }
}