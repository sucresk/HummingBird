module BlackSwan {
    export class CheckerboardTexture extends BitmapTexture {

        private static _width: number = 128;
        private static _height: number = 128;
        private static _pixelArray: Uint8Array;

        constructor() {

            this.buildCheckerboard();

            super(CheckerboardTexture._width, CheckerboardTexture._height, CheckerboardTexture._pixelArray, ColorFormat.RGBA8888);
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