module BlackSwan {
    export class CheckerboardTexture extends TextureBase {
        public static texture: CheckerboardTexture = new CheckerboardTexture();
        private _width: number = 128;
        private _height: number = 128;
        private _pixelArray: Uint8Array;

        constructor() {
            super();

            this.buildCheckerboard();

            this.mimapData = new Array<MipmapData>();
            this.mimapData.push(new MipmapData(this._pixelArray, this._width, this._height));
        }

        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_border = 0; 
                this.texture.gpu_internalformat = InternalFormat.PixelArray;
                this.texture.gpu_colorformat = Egret3D.ColorFormat_RGBA8888;
                this.texture.mipmapDatas = this.mimapData;
                this.width = this._width;
                this.height = this._height;
                this.useMipmap = false;
                context3D.upLoadTextureData(0, this.texture);
            }
        }

        private buildCheckerboard(): void {
            if (!this._pixelArray) {

                this._pixelArray = new Uint8Array(this._width * this._height * 4);

                var colors: BlackSwan.Color[] = [BlackSwan.Color.white(), BlackSwan.Color.black()];

                var colorIndex = 0;

                var blockSize: number = 4;

                for (var y: number = 0; y < this._height; y++) {
                    for (var x: number = 0; x < this._width; x++) {

                        if ((x % blockSize) == 0) {
                            colorIndex = (colorIndex + 1) % 2;
                        }

                        if ((y % blockSize) == 0 && x == 0) {
                            var tmp: BlackSwan.Color = colors[0];
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