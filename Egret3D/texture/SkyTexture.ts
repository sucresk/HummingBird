module Egret3D {
     /**
     * @class Egret3D.SkyTexture
     * @classdesc
     * 天空贴图
     */
    export class SkyTexture extends TextureBase  {

         private image_front: HTMLImageElement;
         private image_back: HTMLImageElement;
         private image_left: HTMLImageElement;
         private image_right: HTMLImageElement;
         private image_up: HTMLImageElement;
         private image_down: HTMLImageElement;


        /**
         * @language zh_CN
         */
         constructor(
            image_front: HTMLImageElement,
            image_back: HTMLImageElement,
            image_left: HTMLImageElement,
            image_right: HTMLImageElement,
            image_up: HTMLImageElement,
            image_down: HTMLImageElement
             ) {
            super();

         imageData: HTMLImageElement;

         this.image_front = image_front;
         this.image_back = image_back;
         this.image_left = image_left;
         this.image_right = image_right;
         this.image_up = image_up;
         this.image_down = image_down;

        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * @param context3D 
         */
        public upload(context3D: Context3D) {
            if (!this.cubeTexture) {
                this.cubeTexture = context3D.creatCubeTexture();
                //this.texture.gpu_internalformat = InternalFormat.ImageData;
                //this.texture.gpu_colorformat = Egret3D.ColorFormat_RGBA8888;
                this.cubeTexture.image_front = this.image_front;
                this.cubeTexture.image_back = this.image_back;
                this.cubeTexture.image_left = this.image_left;
                this.cubeTexture.image_right = this.image_right;
                this.cubeTexture.image_up = this.image_up;
                this.cubeTexture.image_down  = this.image_down;

                context3D.uploadCubetexture(this.cubeTexture);
                //context3D.setTexture2DSamplerState(Egret3D.NEAREST, Egret3D.NEAREST, Egret3D.CLAMP_TO_EDGE, Egret3D.CLAMP_TO_EDGE);
            }
        }
    }
}