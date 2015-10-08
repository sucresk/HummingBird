module BlackSwan {
    export class CheckerboardTexture extends TextureBase {

        private static _width: number = 128;
        private static _height: number = 128;
        private static _pixelArray: Uint8Array;

        constructor() {
            super();

            this.buildCheckerboard();

            this.mimapData = new Array<MipmapData>();
            this.mimapData.push(new MipmapData(CheckerboardTexture._pixelArray, CheckerboardTexture._width, CheckerboardTexture._height));
        }

        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_internalformat = InternalFormat.PixelArray;
                this.texture.gpu_colorformat = ColorFormat.RGBA8888;
                this.texture.mipmapDatas = this.mimapData;
                this.width = CheckerboardTexture._width;
                this.height = CheckerboardTexture._height;
                this.useMipmap = false;
            }
            context3D.upLoadTextureData(0, this.texture);
        }

        private buildCheckerboard(): void {
            if (!CheckerboardTexture._pixelArray) {

                CheckerboardTexture._pixelArray = new Uint8Array(CheckerboardTexture._width * CheckerboardTexture._height * 4);

                var colors: BlackSwan.Color[] = [BlackSwan.Color.white(), BlackSwan.Color.black()];

                var colorIndex = 0;

                var blockSize: number = 4;

                for (var y: number = 0; y < CheckerboardTexture._height; y++) {
                    for (var x: number = 0; x < CheckerboardTexture._width; x++) {

                        if ((x % blockSize) == 0) {
                            colorIndex = (colorIndex + 1) % 2;
                        }

                        if ((y % blockSize) == 0 && x == 0) {
                            var tmp: BlackSwan.Color = colors[0];
                            colors[0] = colors[1];
                            colors[1] = tmp;
                            colorIndex = 0;
                        }

                        CheckerboardTexture._pixelArray[(y * (CheckerboardTexture._width * 4) + x * 4) + 0] = colors[colorIndex].r;
                        CheckerboardTexture._pixelArray[(y * (CheckerboardTexture._width * 4) + x * 4) + 1] = colors[colorIndex].g;
                        CheckerboardTexture._pixelArray[(y * (CheckerboardTexture._width * 4) + x * 4) + 2] = colors[colorIndex].b;
                        CheckerboardTexture._pixelArray[(y * (CheckerboardTexture._width * 4) + x * 4) + 3] = colors[colorIndex].a;
                    }
                }
            }
        }
    }
}