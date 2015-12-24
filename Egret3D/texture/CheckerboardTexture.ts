module Egret3D {

     /**
     * @class Egret3D.CheckerboardTexture
     * @classdesc
     * 棋盘格纹理
     */
    export class CheckerboardTexture extends TextureBase {

        /**
         * @language zh_CN
         */
        public static texture: CheckerboardTexture = new CheckerboardTexture();
        private _width: number = 32;
        private _height: number = 32;
        private _pixelArray: Uint8Array;


        /**
         * @language zh_CN
         */
        constructor() {
            super();

            this.buildCheckerboard();

            this.mimapData = new Array<MipmapData>();
            this.mimapData.push(new MipmapData(this._pixelArray, this._width, this._height));
        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * @param context3D 
         */
        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_border = 0; 
                this.texture.gpu_internalformat = InternalFormat.PixelArray;
                this.texture.gpu_colorformat = Egret3DDrive.ColorFormat_RGBA8888;
                this.texture.mipmapDatas = this.mimapData;
                this.useMipmap = false;
                context3D.upLoadTextureData(0, this.texture);
            }
        }

        private buildCheckerboard(): void {
            if (!this._pixelArray) {

                this._pixelArray = new Uint8Array(this._width * this._height * 4);

                var colors: Egret3D.Color[] = [Egret3D.Color.white(), Egret3D.Color.black()];

                var colorIndex = 0;

                var blockSize: number = 4;

                for (var y: number = 0; y < this._height; y++) {
                    for (var x: number = 0; x < this._width; x++) {

                        if ((x % blockSize) == 0) {
                            colorIndex = (colorIndex + 1) % 2;
                        }

                        if ((y % blockSize) == 0 && x == 0) {
                            var tmp: Egret3D.Color = colors[0];
                            colors[0] = colors[1];
                            colors[1] = tmp;
                            colorIndex = 0;
                        }

                        this._pixelArray[(y * (this._width * 4) + x * 4) + 0] = colors[colorIndex].r;
                        this._pixelArray[(y * (this._width * 4) + x * 4) + 1] = colors[colorIndex].g;
                        this._pixelArray[(y * (this._width * 4) + x * 4) + 2] = colors[colorIndex].b;
                        this._pixelArray[(y * (this._width * 4) + x * 4) + 3] = colors[colorIndex].a;
                    }
                }
            }
        }
    }
}