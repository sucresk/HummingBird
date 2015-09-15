module BlackSwan {
    export class BinaryTexture extends TextureBase {

        private binaryImageData: Uint8Array;
        constructor(image: Float32Array) {
            this.binaryImageData = image;
            super();

            ColorFormat.RGBA8888
        }

        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
            }
            
            if (this.useMipmap) {
            }
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