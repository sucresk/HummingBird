module Egret3D {
    export class TextureBase {

        public border: number;
        public useMipmap: boolean;

        public imageData: HTMLImageElement;
        public mimapData: Array<MipmapData>;
        public colorFormat: number;
        public internalFormat: InternalFormat;

        //gpu
        public texture: Texture2D;
        public cubeTexture: ICubeTexture;

        constructor() {
            this.border = 0;
            this.useMipmap = true;
            this.imageData = null;
            this.colorFormat = Egret3DDrive.ColorFormat_RGBA8888;
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

                if (this.useMipmap) {
                    for (var i: number = 0; i < this.mimapData.length; i++) {
                        context3D.upLoadTextureData(i, this.texture);
                    }
                }
                else {
                    context3D.upLoadTextureData(0, this.texture);
                }
                
                context3D.gl.texParameteri(context3D.gl.TEXTURE_2D, context3D.gl.TEXTURE_MIN_FILTER, context3D.gl.LINEAR_MIPMAP_LINEAR);
                context3D.gl.texParameteri(context3D.gl.TEXTURE_2D, context3D.gl.TEXTURE_MAG_FILTER, context3D.gl.LINEAR_MIPMAP_LINEAR);
                context3D.gl.texParameteri(context3D.gl.TEXTURE_2D, context3D.gl.TEXTURE_WRAP_S, context3D.gl.REPEAT);
                context3D.gl.texParameteri(context3D.gl.TEXTURE_2D, context3D.gl.TEXTURE_WRAP_T, context3D.gl.REPEAT);
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