module Egret3D {

     /**
     * @class Egret3D.ImageTexture
     * @classdesc
     * 图像贴图
     */
    export class ImageTexture extends TextureBase  {

        /**
         * @language zh_CN
         * 贴图数据
         */
        public imageData: HTMLImageElement;

        /**
         * @language zh_CN
         * @param img 
         */
        constructor(img: HTMLImageElement) {
            super();

            this.imageData = img;
        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * @param context3D 
         */
        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_internalformat = InternalFormat.ImageData;
                this.texture.gpu_colorformat = Egret3DDrive.ColorFormat_RGBA8888;
            
                this.texture.image = this.imageData;
                this.useMipmap = false ;
               

           //   if (this.imageData.width > 0 && (this.imageData.width & (this.imageData.width - 1)) != 0 )
                context3D.upLoadTextureData(0, this.texture);
             // else
             //     alert( "纹理不是2的N次" );
             // context3D.setTexture2DSamplerState(Egret3D.NEAREST, Egret3D.NEAREST, Egret3D.CLAMP_TO_EDGE, Egret3D.CLAMP_TO_EDGE);
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