module BlackSwan {
    export class BitmapTexture extends TextureBase {

        constructor(w: number, h: number, pixelArray: Uint8Array, colorFormat: ColorFormat = ColorFormat.RGBA8888) {
            super();

            this.width = w;
            this.height = h;

            this.colorformat = colorFormat;
            this.mimapData = new Array<MipmapData>();
            this.internalformat = InternalFormat.PixelArray;

            var mipmap: MipmapData = new MipmapData(pixelArray, this.width, this.height);
            this.mimapData.push(mipmap);
        }

        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
            }
            //this.texture.uploadTexture(0);
        }

        public fillData(w: number, h: number, color: number) {
            var count: number = 0;
            var index: number;
            var r: number, g: number, b: number, a: number;
            this.binaryImageData = new Uint8Array(w * h * 4);

            while (count < this.binaryImageData.length) {

                var a: number = color >>> 24;
                var r: number = color >>> 16 & 0xFF;
                var g: number = color >>> 8 & 0xFF;
                var b: number = color & 0xFF;

                this.imageData[count++] = r;
                this.imageData[count++] = g;
                this.imageData[count++] = b;
                this.imageData[count++] = a;
            }
        }
    }
}