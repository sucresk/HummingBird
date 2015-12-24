module Egret3D {

     /**
     * @class Egret3D.TextureBase
     * @classdesc
     * 贴图基类
     */
    export class TextureBase {

        /**
         * @language zh_CN
         */
        public border: number;
    
        /**
         * @language zh_CN
         * 是否使用mipmap
         */
        public useMipmap: boolean;

        /**
         * @language zh_CN
         * 贴图元素对象
         */
        public imageData: HTMLImageElement;
        /**
         * @language zh_CN
         * mipmap数据
         */
        public mimapData: Array<MipmapData>;
        /**
         * @language zh_CN
         * 颜色格式
         */
        public colorFormat: number;
        /**
         * @language zh_CN
         * 内部格式
         */
        public internalFormat: InternalFormat;

        /**
         * @language zh_CN
         * 贴图 gup 数据
         */
        public texture: Texture2D;
        /**
         * @language zh_CN
         * 立方形贴图
         */
        public cubeTexture: ICubeTexture;


        /**
         * @language zh_CN
         */
        constructor() {
            this.border = 0;
            this.useMipmap = true;
            this.imageData = null;
            this.colorFormat = Egret3DDrive.ColorFormat_RGBA8888;
            this.internalFormat = InternalFormat.PixelArray;
            this.mimapData = new Array<MipmapData>();
        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * @param context3D 
         */
        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_internalformat = this.internalFormat;
                this.texture.gpu_colorformat = this.colorFormat;
                this.texture.mipmapDatas = this.mimapData;
                this.texture.image = this.imageData;
                this.texture.gpu_border = 0;

                if (this.useMipmap) {
                    for (var i: number = 0; i < this.mimapData.length; i++) {
                        context3D.upLoadTextureData(i, this.texture);
                    }
                }
                else {
                    context3D.upLoadTextureData(0, this.texture);
                }
                
             
            }
        }

        /**
         * @language zh_CN
         * @readOnly
         * @returns width
         */
        public get width(): number {
            if (this.imageData)
                return this.imageData.width;
            else if (this.mimapData.length > 0)
                return this.mimapData[0].width;
            return 0;
        }

        /**
         * @language zh_CN
         * @readOnly
         * @returns height
         */
        public get height(): number {
            if (this.imageData)
                return this.imageData.height;
            else if (this.mimapData.length > 0)
                return this.mimapData[0].height;
            return 0;
        }
    }
}