module Egret3D {
    export class Mipmap {
        public data: Uint8Array;
        public width: number;
        public height: number;

        constructor(data: Uint8Array, width: number, height: number) {
            this.data = data;
            this.width = width;
            this.height = height;
        }

        public static generateMipMaps(source: Mipmap) {
            var minW = 1;
            var minH = 1;
            var w = Math.ceil(source.width / 2);
            var h = Math.ceil(source.height / 2);
            var mipmaps: Array<Mipmap> = new Array<Mipmap>();
            mipmaps.push(source);
            var mipmap: Mipmap;
            while (w >= minW || h >= minH) {
                mipmap = new Mipmap(getHalfArray(source.data), w, h);
                w >>= 1;
                h >>= 1;
                source = mipmap;
            }

            function getHalfArray(ary: Uint8Array): Uint8Array {
                var result: Uint8Array = new Uint8Array(Math.ceil(ary.length / 2));
                var index = 0;
                for (var i = 0; i < ary.length; i++) {
                    if (i % 2 == 0) {
                        result[index++] = ary[i];
                    }
                }
                return result;
            }
        }
    }
} 