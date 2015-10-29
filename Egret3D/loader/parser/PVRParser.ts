module Egret3D {
    export enum PVRFormat {RGB_PVRTC_4BPPV1_Format = 2100, RGB_PVRTC_2BPPV1_Format = 2101, RGBA_PVRTC_4BPPV1_Format = 2102, RGBA_PVRTC_2BPPV1_Format = 2103};
    export class PVRParser {
        constructor() {

        }

        public static parse(buffer:ArrayBuffer):PVR {

            var pvr:PVR = new PVR;
            var headerLengthInt = 13;
            var header = new Uint32Array(buffer, 0, headerLengthInt);
            var pvrDatas = {
                buffer: buffer,
                header: header,
            };

            // PVR v3
            if (header[0] === 0x03525650) {

                pvr = PVRParser._parseV3(pvrDatas);

            }
            // PVR v2
            else if (header[11] === 0x21525650) {

                pvr = PVRParser._parseV2(pvrDatas);

            } else {

                console.log("PVRParser unknow pvr format. PVRParser::parse");

            }
            return pvr;
        }

        private static _parseV2(pvrDatas):PVR {
            var header = pvrDatas.header;

            var headerLength = header[0],
                height = header[1],
                width = header[2],
                numMipmaps = header[3],
                flags = header[4],
                dataLength = header[5],
                bpp = header[6],
                bitmaskRed = header[7],
                bitmaskGreen = header[8],
                bitmaskBlue = header[9],
                bitmaskAlpha = header[10],
                pvrTag = header[11],
                numSurfs = header[12];


            var TYPE_MASK = 0xff;
            var PVRTC_2 = 24,
                PVRTC_4 = 25;

            var formatFlags = flags & TYPE_MASK;


            var bpp, format;
            var _hasAlpha = bitmaskAlpha > 0;

            if (formatFlags === PVRTC_4) {

                format = _hasAlpha ? PVRFormat.RGBA_PVRTC_4BPPV1_Format : PVRFormat.RGB_PVRTC_4BPPV1_Format;
                bpp = 4;

            } else if (formatFlags === PVRTC_2) {

                format = _hasAlpha ? PVRFormat.RGBA_PVRTC_2BPPV1_Format : PVRFormat.RGB_PVRTC_2BPPV1_Format;
                bpp = 2;

            } else
                throw new Error("pvrtc - unknown format " + formatFlags);


            pvrDatas.dataPtr = headerLength;
            pvrDatas.bpp = bpp;
            pvrDatas.format = format;
            pvrDatas.width = width;
            pvrDatas.height = height;
            pvrDatas.numSurfaces = numSurfs;
            pvrDatas.numMipmaps = numMipmaps + 1;

            // guess cubemap type seems tricky in v2
            // it juste a pvr containing 6 surface (no explicit cubemap type)
            pvrDatas.isCubemap = ( numSurfs === 6 );

            return PVRParser._extract(pvrDatas);

        }

        private static _parseV3(pvrDatas:any):PVR {
            var header = pvrDatas.header;
            var bpp, format;

            var metaLen = header[12],
                pixelFormat = header[2],
                height = header[6],
                width = header[7],
                numSurfs = header[9],
                numFaces = header[10],
                numMipmaps = header[11];

            switch (pixelFormat) {
                case 0 : // PVRTC 2bpp RGB
                    bpp = 2;
                    format = PVRFormat.RGB_PVRTC_2BPPV1_Format;
                    break;
                case 1 : // PVRTC 2bpp RGBA
                    bpp = 2;
                    format = PVRFormat.RGBA_PVRTC_2BPPV1_Format;
                    break;
                case 2 : // PVRTC 4bpp RGB
                    bpp = 4;
                    format = PVRFormat.RGB_PVRTC_4BPPV1_Format;
                    break;
                case 3 : // PVRTC 4bpp RGBA
                    bpp = 4;
                    format = PVRFormat.RGBA_PVRTC_4BPPV1_Format;
                    break;
                default :
                    throw new Error("pvrtc - unsupported PVR format " + pixelFormat);
            }

            pvrDatas.dataPtr = 52 + metaLen;
            pvrDatas.bpp = bpp;
            pvrDatas.format = format;
            pvrDatas.width = width;
            pvrDatas.height = height;
            pvrDatas.numSurfaces = numFaces;
            pvrDatas.numMipmaps = numMipmaps;

            pvrDatas.isCubemap = ( numFaces === 6 );

            return PVRParser._extract(pvrDatas);
        }

        private static _extract(pvrDatas):PVR {
            var pvr:PVR = new PVR();

            var buffer = pvrDatas.buffer;
            var dataOffset = pvrDatas.dataPtr,
                bpp = pvrDatas.bpp,
                numSurfs = pvrDatas.numSurfaces,
                dataSize = 0,
                blockSize = 0,
                blockWidth = 0,
                blockHeight = 0,
                widthBlocks = 0,
                heightBlocks = 0;

            if (bpp === 2) {
                blockWidth = 8;
                blockHeight = 4;
            } else {
                blockWidth = 4;
                blockHeight = 4;
            }
            blockSize = ( blockWidth * blockHeight ) * bpp / 8;
            pvr.mipmaps.length = pvrDatas.numMipmaps * numSurfs;
            var mipLevel = 0;
            while (mipLevel < pvrDatas.numMipmaps) {
                var sWidth = pvrDatas.width >> mipLevel;
                var sHeight = pvrDatas.height >> mipLevel;

                widthBlocks = sWidth / blockWidth;
                heightBlocks = sHeight / blockHeight;

                // Clamp to minimum number of blocks
                if (widthBlocks < 2) {
                    widthBlocks = 2;
                }
                if (heightBlocks < 2) {
                    heightBlocks = 2;
                }

                dataSize = widthBlocks * heightBlocks * blockSize;
                for (var surfIndex = 0; surfIndex < numSurfs; surfIndex++) {
                    var byteArray = new Uint8Array(buffer, dataOffset, dataSize);
                    var mipmap = {
                        data: byteArray,
                        width: sWidth,
                        height: sHeight
                    };
                    pvr.mipmaps[surfIndex * pvrDatas.numMipmaps + mipLevel] = mipmap;
                    dataOffset += dataSize;
                }
                mipLevel++;
            }

            return pvr;
        }
    }
}
