module Egret3D {

    //dds / st3c compressed texture formats
    export enum DDSFormat { RGB_S3TC_DXT1_FORMAT = 2001, RGBA_S3TC_DXT1_FORMAT = 2002, RGBA_S3TC_DXT3_FORMAT = 2003, RGBA_S3TC_DXT5_FORMAT = 2003};

    export class DDSParser {

        constructor() {

        }

        public static parse(buffer: ArrayBuffer, loadMipmaps:boolean = true):TextureBase {
            var dds: DDS = new DDS();
            var headerLengthInt = 31; // The header length in 32 bit ints
            var off_magic = 0;
            var DDS_MAGIC = 0x20534444;
            var DDSD_CAPS = 0x1,
                DDSD_HEIGHT = 0x2,
                DDSD_WIDTH = 0x4,
                DDSD_PITCH = 0x8,
                DDSD_PIXELFORMAT = 0x1000,
                DDSD_MIPMAPCOUNT = 0x20000,
                DDSD_LINEARSIZE = 0x80000,
                DDSD_DEPTH = 0x800000;

            var DDSCAPS_COMPLEX = 0x8,
                DDSCAPS_MIPMAP = 0x400000,
                DDSCAPS_TEXTURE = 0x1000;

            var DDSCAPS2_CUBEMAP = 0x200,
                DDSCAPS2_CUBEMAP_POSITIVEX = 0x400,
                DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800,
                DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000,
                DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000,
                DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000,
                DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000,
                DDSCAPS2_VOLUME = 0x200000;

            var DDPF_ALPHAPIXELS = 0x1,
                DDPF_ALPHA = 0x2,
                DDPF_FOURCC = 0x4,
                DDPF_RGB = 0x40,
                DDPF_YUV = 0x200,
                DDPF_LUMINANCE = 0x20000;


            var FOURCC_DXT1 = DDSParser.fourCCToInt32("DXT1");
            var FOURCC_DXT3 = DDSParser.fourCCToInt32("DXT3");
            var FOURCC_DXT5 = DDSParser.fourCCToInt32("DXT5");

            //Pixel formats
            var RGBA_FORMAT = 1021;


            var off_magic = 0;
            var off_size = 1;
            var off_flags = 2;
            var off_height = 3;
            var off_width = 4;
            var off_mipmapCount = 7;

            var off_pfFlags = 20;
            var off_pfFourCC = 21;
            var off_RGBBitCount = 22;
            var off_RBitMask = 23;
            var off_GBitMask = 24;
            var off_BBitMask = 25;
            var off_ABitMask = 26;
            var off_caps = 27;
            var off_caps2 = 28;
            var off_caps3 = 29;
            var off_caps4 = 30;

            var header:Int32Array = new Int32Array(buffer, 0, headerLengthInt);

            if (header[off_magic] !== DDS_MAGIC) {
                console.error('DDSParser.parse: Invalid magic number in DDS header.');
                return null;
            }
            if (!(header[off_pfFlags] & DDPF_FOURCC)) {
                console.error('DDSParser.parse: Unsupported format, must contain a FourCC code.');
                return null;
            }

            var blockBytes: number;
            var fourCC = header[off_pfFourCC];
            var isRGBAUncompressed = false;
            switch (fourCC) {
                case FOURCC_DXT1:
                    blockBytes = 8;
                    dds.format = DDSFormat.RGB_S3TC_DXT1_FORMAT;
                    break;
                case FOURCC_DXT3:
                    blockBytes = 16;
                    dds.format = DDSFormat.RGBA_S3TC_DXT3_FORMAT;
                    break;
                case FOURCC_DXT5:
                    blockBytes = 16;
                    dds.format = DDSFormat.RGBA_S3TC_DXT5_FORMAT;
                    break;

                default:
                    if (header[off_RGBBitCount] == 32
                        && header[off_RBitMask] & 0xff0000
                        && header[off_GBitMask] & 0xff00
                        && header[off_BBitMask] & 0xff
                        && header[off_ABitMask] & 0xff000000) {
                        isRGBAUncompressed = true;
                        blockBytes = 64;
                        dds.format = RGBA_FORMAT;
                    } else {
                        console.error('DDSParser.parse: Unsupported FourCC code ', DDSParser.int32ToFourCC(fourCC));
                        return null;
                    }
            }

            dds.mipmapCount = 1;

            if ((header[off_flags] & DDSD_MIPMAPCOUNT) && loadMipmaps !== false) {
                dds.mipmapCount = Math.max(1, header[off_mipmapCount]);
            }

            dds.isCubemap = header[off_caps2] & DDSCAPS2_CUBEMAP ? true : false;
            dds.width = header[off_width];
            dds.height = header[off_height];
            var dataOffset = header[off_size] + 4;

            // Extract mipmaps buffers

            var width = dds.width;
            var height = dds.height;
            var faces = dds.isCubemap ? 6 : 1;

            //是否软解DXT;
            var useSoftwareSolution: boolean = false;
            if (dds.format == DDSFormat.RGB_S3TC_DXT1_FORMAT && Egret3DDrive.ColorFormat_DXT1_RGB == 0)
                useSoftwareSolution = true;
            else if (dds.format == DDSFormat.RGBA_S3TC_DXT3_FORMAT && Egret3DDrive.ColorFormat_DXT3_RGBA == 0)
                useSoftwareSolution = true;
            else if (dds.format == DDSFormat.RGBA_S3TC_DXT5_FORMAT && Egret3DDrive.ColorFormat_DXT5_RGBA == 0)
                useSoftwareSolution = true;

            for (var face = 0; face < faces; face++) {
                for (var i = 0; i < dds.mipmapCount; i++) {

                    var byteArray: Uint8Array;

                    if (isRGBAUncompressed) {
                        byteArray = DDSParser.loadARGBMip(buffer, dataOffset, width, height);
                        var dataLength = byteArray.length;
                    } else {
                        var dataLength = Math.max(4, width) / 4 * Math.max(4, height) / 4 * blockBytes;

                        byteArray = new Uint8Array(buffer, dataOffset, dataLength);

                        if (useSoftwareSolution) {
                            byteArray = DDSParser.softSolutionDXT(width, height, dds.format, byteArray);
                        }
                    }

                    var mipmap: MipmapData = new MipmapData(byteArray, width, height);
                    dds.mipmaps.push(mipmap);
                    dataOffset += dataLength;
                    width = Math.max(width * 0.5, 1);
                    height = Math.max(height * 0.5, 1);
                }
                width = dds.width;
                height = dds.height;
            }

            var texture: TextureBase = new TextureBase();

            if (useSoftwareSolution) {
                texture.internalFormat = InternalFormat.PixelArray;
                texture.colorFormat = Egret3DDrive.ColorFormat_RGBA8888;
            }
            else {
                texture.internalFormat = InternalFormat.CompressData;
                if (FOURCC_DXT1 == fourCC)
                    texture.colorFormat = Egret3DDrive.ColorFormat_DXT1_RGB;
                else if (FOURCC_DXT3 == fourCC)
                    texture.colorFormat = Egret3DDrive.ColorFormat_DXT3_RGBA;
                else if (FOURCC_DXT5 == fourCC)
                    texture.colorFormat = Egret3DDrive.ColorFormat_DXT5_RGBA;
            }
            
            texture.mimapData = dds.mipmaps;
            return texture;
        }
       
        private static loadARGBMip(buffer: ArrayBuffer, dataOffset: number, width: number, height: number) {
            var dataLength: number = width * height * 4;
            var srcBuffer: Uint8Array = new Uint8Array(buffer, dataOffset, dataLength);
            var byteArray: Uint8Array = new Uint8Array(dataLength);
            var dst:number = 0;
            var src: number = 0;
            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    var b = srcBuffer[src]; src++;
                    var g = srcBuffer[src]; src++;
                    var r = srcBuffer[src]; src++;
                    var a = srcBuffer[src]; src++;
                    byteArray[dst] = r; dst++;	//r
                    byteArray[dst] = g; dst++;	//g
                    byteArray[dst] = b; dst++;	//b
                    byteArray[dst] = a; dst++;	//a
                }
            }
            return byteArray;
        }

        private static fourCCToInt32(value: string): number {
             return value.charCodeAt(0) + (value.charCodeAt(1) << 8) + (value.charCodeAt(2) << 16) + (value.charCodeAt(3) << 24);
        }

        private static int32ToFourCC(value: number): string {
            return String.fromCharCode(value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff, (value >> 24) & 0xff69);
        }

        //软解DXT数据块到像素组;
        private static softSolutionDXT(width: number, height: number, format: DDSFormat, byteArray: Uint8Array): Uint8Array {

            var nCount: number;

            var colorArray: Uint8Array = new Uint8Array(width * height * 4);

            //色彩表;
            var colorTab: Color[] = [new Color(), new Color(), new Color(), new Color()];

            //索引表;
            var indexTab: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            switch (format) {
                case DDSFormat.RGB_S3TC_DXT1_FORMAT:
                case DDSFormat.RGBA_S3TC_DXT1_FORMAT:
                    {
                        nCount = byteArray.length / 8;

                        for (var blockIndex: number = 0; blockIndex < nCount; blockIndex++) {

                            var _16bit_0: number = byteArray[blockIndex * 8 + 0] | (byteArray[blockIndex * 8 + 1] << 8);
                            var _16bit_1: number = byteArray[blockIndex * 8 + 2] | (byteArray[blockIndex * 8 + 3] << 8);

                            //极端颜色1;
                            colorTab[0].r = (_16bit_0 >> 11) & 0x1F;
                            colorTab[0].g = (_16bit_0 >> 5) & 0x3F;
                            colorTab[0].b = _16bit_0 & 0x1F;
                            colorTab[0].a = 0xFF;

                            //极端颜色2;
                            colorTab[1].r = (_16bit_1 >> 11) & 0x1F;
                            colorTab[1].g = (_16bit_1 >> 5) & 0x3F;
                            colorTab[1].b = _16bit_1 & 0x1F;
                            colorTab[1].a = 0xFF;

                            if (_16bit_0 > _16bit_1) {
                                //线性插值计算出剩下的两个颜色;
                                colorTab[2].lerp(colorTab[0], colorTab[1], 0.33);

                                colorTab[3].lerp(colorTab[0], colorTab[1], 0.66);
                            }
                            else {
                                //线性插值计算出剩下的一个颜色;
                                colorTab[2].lerp(colorTab[0], colorTab[1], 0.5);
                            }
                            

                            //取出16个2位索引;
                            for (var i: number = 0; i < 4; i++) {
                                indexTab[(i * 4) + 0] = byteArray[blockIndex * 8 + 4 + i] & 0x03;
                                indexTab[(i * 4) + 1] = (byteArray[blockIndex * 8 + 4 + i] >> 2) & 0x03;
                                indexTab[(i * 4) + 2] = (byteArray[blockIndex * 8 + 4 + i] >> 4) & 0x03;
                                indexTab[(i * 4) + 3] = (byteArray[blockIndex * 8 + 4 + i] >> 6) & 0x03;
                            }

                            for (var ci: number = 0; ci < colorTab.length; ci++) {
                                colorTab[ci].r = colorTab[ci].r * 8;
                                colorTab[ci].g = colorTab[ci].g * 4;
                                colorTab[ci].b = colorTab[ci].b * 8;
                            }

                            //填充像素数组;
                            var globalX: number = (blockIndex % (width / 4)) * 4;
                            var globalY: number = Math.floor(blockIndex / (width / 4)) * 4;

                            if (globalY + 0 < height) {

                                if (globalX + 0 < width) {
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 0) * 4) + 0] = colorTab[indexTab[0]].r;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 0) * 4) + 1] = colorTab[indexTab[0]].g;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 0) * 4) + 2] = colorTab[indexTab[0]].b;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 0) * 4) + 3] = colorTab[indexTab[0]].a;
                                }

                                if (globalX + 1 < width) {
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 1) * 4) + 0] = colorTab[indexTab[1]].r;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 1) * 4) + 1] = colorTab[indexTab[1]].g;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 1) * 4) + 2] = colorTab[indexTab[1]].b;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 1) * 4) + 3] = colorTab[indexTab[1]].a;
                                }

                                if (globalX + 2 < width) {
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 2) * 4) + 0] = colorTab[indexTab[2]].r;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 2) * 4) + 1] = colorTab[indexTab[2]].g;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 2) * 4) + 2] = colorTab[indexTab[2]].b;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 2) * 4) + 3] = colorTab[indexTab[2]].a;
                                }

                                if (globalX + 3 < width) {
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 3) * 4) + 0] = colorTab[indexTab[3]].r;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 3) * 4) + 1] = colorTab[indexTab[3]].g;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 3) * 4) + 2] = colorTab[indexTab[3]].b;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 3) * 4) + 3] = colorTab[indexTab[3]].a;
                                }
                            }

                            if (globalY + 1 < height) {

                                if (globalX + 0 < width) {
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 0) * 4) + 0] = colorTab[indexTab[4]].r;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 0) * 4) + 1] = colorTab[indexTab[4]].g;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 0) * 4) + 2] = colorTab[indexTab[4]].b;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 0) * 4) + 3] = colorTab[indexTab[4]].a;
                                }

                                if (globalX + 1 < width) {
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 1) * 4) + 0] = colorTab[indexTab[5]].r;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 1) * 4) + 1] = colorTab[indexTab[5]].g;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 1) * 4) + 2] = colorTab[indexTab[5]].b;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 1) * 4) + 3] = colorTab[indexTab[5]].a;
                                }

                                if (globalX + 2 < width) {
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 2) * 4) + 0] = colorTab[indexTab[6]].r;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 2) * 4) + 1] = colorTab[indexTab[6]].g;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 2) * 4) + 2] = colorTab[indexTab[6]].b;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 2) * 4) + 3] = colorTab[indexTab[6]].a;
                                }

                                if (globalX + 3 < width) {
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 3) * 4) + 0] = colorTab[indexTab[7]].r;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 3) * 4) + 1] = colorTab[indexTab[7]].g;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 3) * 4) + 2] = colorTab[indexTab[7]].b;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 3) * 4) + 3] = colorTab[indexTab[7]].a;
                                }
                            }

                            if (globalY + 2 < height) {

                                if (globalX + 0 < width) {
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 0) * 4) + 0] = colorTab[indexTab[8]].r;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 0) * 4) + 1] = colorTab[indexTab[8]].g;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 0) * 4) + 2] = colorTab[indexTab[8]].b;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 0) * 4) + 3] = colorTab[indexTab[8]].a;
                                }

                                if (globalX + 1 < width) {
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 1) * 4) + 0] = colorTab[indexTab[9]].r;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 1) * 4) + 1] = colorTab[indexTab[9]].g;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 1) * 4) + 2] = colorTab[indexTab[9]].b;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 1) * 4) + 3] = colorTab[indexTab[9]].a;
                                }

                                if (globalX + 2 < width) {
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 2) * 4) + 0] = colorTab[indexTab[10]].r;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 2) * 4) + 1] = colorTab[indexTab[10]].g;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 2) * 4) + 2] = colorTab[indexTab[10]].b;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 2) * 4) + 3] = colorTab[indexTab[10]].a;
                                }

                                if (globalX + 3 < width) {
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 3) * 4) + 0] = colorTab[indexTab[11]].r;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 3) * 4) + 1] = colorTab[indexTab[11]].g;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 3) * 4) + 2] = colorTab[indexTab[11]].b;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 3) * 4) + 3] = colorTab[indexTab[11]].a;
                                }
                            }

                            if (globalY + 3 < height) {

                                if (globalX + 0 < width) {
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 0) * 4) + 0] = colorTab[indexTab[12]].r;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 0) * 4) + 1] = colorTab[indexTab[12]].g;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 0) * 4) + 2] = colorTab[indexTab[12]].b;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 0) * 4) + 3] = colorTab[indexTab[12]].a;
                                }

                                if (globalX + 1 < width) {
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 1) * 4) + 0] = colorTab[indexTab[13]].r;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 1) * 4) + 1] = colorTab[indexTab[13]].g;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 1) * 4) + 2] = colorTab[indexTab[13]].b;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 1) * 4) + 3] = colorTab[indexTab[13]].a;
                                }

                                if (globalX + 2 < width) {
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 2) * 4) + 0] = colorTab[indexTab[14]].r;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 2) * 4) + 1] = colorTab[indexTab[14]].g;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 2) * 4) + 2] = colorTab[indexTab[14]].b;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 2) * 4) + 3] = colorTab[indexTab[14]].a;
                                }

                                if (globalX + 3 < width) {
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 3) * 4) + 0] = colorTab[indexTab[15]].r;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 3) * 4) + 1] = colorTab[indexTab[15]].g;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 3) * 4) + 2] = colorTab[indexTab[15]].b;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 3) * 4) + 3] = colorTab[indexTab[15]].a;
                                }
                            }
                        }
                    }
                    break;
                case DDSFormat.RGBA_S3TC_DXT3_FORMAT:
                    {
                        nCount = byteArray.length / 16;

                        for (var blockIndex: number = 0; blockIndex < nCount; blockIndex++) {

                            var _16bit_0: number = byteArray[blockIndex * 16 + 8] | (byteArray[blockIndex * 16 + 9] << 8);
                            var _16bit_1: number = byteArray[blockIndex * 16 + 10] | (byteArray[blockIndex * 16 + 11] << 8);

                            //极端颜色1;
                            colorTab[0].r = (_16bit_0 >> 11) & 0x1F;
                            colorTab[0].g = (_16bit_0 >> 5) & 0x3F;
                            colorTab[0].b = _16bit_0 & 0x1F;
                            colorTab[0].a = 0xFF;

                            //极端颜色2;
                            colorTab[1].r = (_16bit_1 >> 11) & 0x1F;
                            colorTab[1].g = (_16bit_1 >> 5) & 0x3F;
                            colorTab[1].b = _16bit_1 & 0x1F;
                            colorTab[1].a = 0xFF;

                            if (_16bit_0 > _16bit_1) {
                                //线性插值计算出剩下的两个颜色;
                                colorTab[2].lerp(colorTab[0], colorTab[1], 0.33);

                                colorTab[3].lerp(colorTab[0], colorTab[1], 0.66);
                            }
                            else {
                                //线性插值计算出剩下的一个颜色;
                                colorTab[2].lerp(colorTab[0], colorTab[1], 0.5);

                                colorTab[3].a = 0;
                            }
                            

                            //取出16个2位索引;
                            for (var i: number = 0; i < 4; i++) {
                                indexTab[(i * 4) + 0] = byteArray[blockIndex * 16 + 12 + i] & 0x03;
                                indexTab[(i * 4) + 1] = (byteArray[blockIndex * 16 + 12 + i] >> 2) & 0x03;
                                indexTab[(i * 4) + 2] = (byteArray[blockIndex * 16 + 12 + i] >> 4) & 0x03;
                                indexTab[(i * 4) + 3] = (byteArray[blockIndex * 16 + 12 + i] >> 6) & 0x03;
                            }

                            for (var ci: number = 0; ci < colorTab.length; ci++) {
                                colorTab[ci].r = colorTab[ci].r * 8;
                                colorTab[ci].g = colorTab[ci].g * 4;
                                colorTab[ci].b = colorTab[ci].b * 8;
                            }

                            //填充像素数组;
                            var globalX: number = (blockIndex % (width / 4)) * 4;
                            var globalY: number = Math.floor(blockIndex / (width / 4)) * 4;

                            if (globalY + 0 < height) {

                                if (globalX + 0 < width) {
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 0) * 4) + 0] = colorTab[indexTab[0]].r;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 0) * 4) + 1] = colorTab[indexTab[0]].g;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 0) * 4) + 2] = colorTab[indexTab[0]].b;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 0) * 4) + 3] = (byteArray[blockIndex * 16 + 0] & 0x0F) * 17;
                                }

                                if (globalX + 1 < width) {
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 1) * 4) + 0] = colorTab[indexTab[1]].r;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 1) * 4) + 1] = colorTab[indexTab[1]].g;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 1) * 4) + 2] = colorTab[indexTab[1]].b;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 1) * 4) + 3] = ((byteArray[blockIndex * 16 + 0] >> 4) & 0x0F) * 17;
                                }

                                if (globalX + 2 < width) {
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 2) * 4) + 0] = colorTab[indexTab[2]].r;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 2) * 4) + 1] = colorTab[indexTab[2]].g;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 2) * 4) + 2] = colorTab[indexTab[2]].b;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 2) * 4) + 3] = (byteArray[blockIndex * 16 + 1] & 0x0F) * 17;
                                }

                                if (globalX + 3 < width) {
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 3) * 4) + 0] = colorTab[indexTab[3]].r;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 3) * 4) + 1] = colorTab[indexTab[3]].g;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 3) * 4) + 2] = colorTab[indexTab[3]].b;
                                    colorArray[(globalY + 0) * (width * 4) + ((globalX + 3) * 4) + 3] = ((byteArray[blockIndex * 16 + 1] >> 4) & 0x0F) * 17;
                                }
                            }

                            if (globalY + 1 < height) {

                                if (globalX + 0 < width) {
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 0) * 4) + 0] = colorTab[indexTab[4]].r;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 0) * 4) + 1] = colorTab[indexTab[4]].g;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 0) * 4) + 2] = colorTab[indexTab[4]].b;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 0) * 4) + 3] = (byteArray[blockIndex * 16 + 2] & 0x0F) * 17;
                                }

                                if (globalX + 1 < width) {
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 1) * 4) + 0] = colorTab[indexTab[5]].r;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 1) * 4) + 1] = colorTab[indexTab[5]].g;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 1) * 4) + 2] = colorTab[indexTab[5]].b;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 1) * 4) + 3] = ((byteArray[blockIndex * 16 + 2] >> 4) & 0x0F) * 17;
                                }

                                if (globalX + 2 < width) {
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 2) * 4) + 0] = colorTab[indexTab[6]].r;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 2) * 4) + 1] = colorTab[indexTab[6]].g;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 2) * 4) + 2] = colorTab[indexTab[6]].b;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 2) * 4) + 3] = (byteArray[blockIndex * 16 + 3] & 0x0F) * 17;
                                }

                                if (globalX + 3 < width) {
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 3) * 4) + 0] = colorTab[indexTab[7]].r;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 3) * 4) + 1] = colorTab[indexTab[7]].g;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 3) * 4) + 2] = colorTab[indexTab[7]].b;
                                    colorArray[(globalY + 1) * (width * 4) + ((globalX + 3) * 4) + 3] = ((byteArray[blockIndex * 16 + 3] >> 4) & 0x0F) * 17;
                                }
                            }

                            if (globalY + 2 < height) {

                                if (globalX + 0 < width) {
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 0) * 4) + 0] = colorTab[indexTab[8]].r;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 0) * 4) + 1] = colorTab[indexTab[8]].g;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 0) * 4) + 2] = colorTab[indexTab[8]].b;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 0) * 4) + 3] = (byteArray[blockIndex * 16 + 4] & 0x0F) * 17;
                                }

                                if (globalX + 1 < width) {
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 1) * 4) + 0] = colorTab[indexTab[9]].r;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 1) * 4) + 1] = colorTab[indexTab[9]].g;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 1) * 4) + 2] = colorTab[indexTab[9]].b;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 1) * 4) + 3] = ((byteArray[blockIndex * 16 + 4] >> 4) & 0x0F) * 17;
                                }

                                if (globalX + 2 < width) {
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 2) * 4) + 0] = colorTab[indexTab[10]].r;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 2) * 4) + 1] = colorTab[indexTab[10]].g;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 2) * 4) + 2] = colorTab[indexTab[10]].b;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 2) * 4) + 3] = (byteArray[blockIndex * 16 + 5] & 0x0F) * 17;
                                }

                                if (globalX + 3 < width) {
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 3) * 4) + 0] = colorTab[indexTab[11]].r;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 3) * 4) + 1] = colorTab[indexTab[11]].g;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 3) * 4) + 2] = colorTab[indexTab[11]].b;
                                    colorArray[(globalY + 2) * (width * 4) + ((globalX + 3) * 4) + 3] = ((byteArray[blockIndex * 16 + 5] >> 4) & 0x0F) * 17;
                                }
                            }

                            if (globalY + 3 < height) {

                                if (globalX + 0 < width) {
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 0) * 4) + 0] = colorTab[indexTab[12]].r;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 0) * 4) + 1] = colorTab[indexTab[12]].g;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 0) * 4) + 2] = colorTab[indexTab[12]].b;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 0) * 4) + 3] = (byteArray[blockIndex * 16 + 6] & 0x0F) * 17;
                                }

                                if (globalX + 1 < width) {
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 1) * 4) + 0] = colorTab[indexTab[13]].r;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 1) * 4) + 1] = colorTab[indexTab[13]].g;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 1) * 4) + 2] = colorTab[indexTab[13]].b;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 1) * 4) + 3] = ((byteArray[blockIndex * 16 + 6] >> 4) & 0x0F) * 17;
                                }

                                if (globalX + 2 < width) {
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 2) * 4) + 0] = colorTab[indexTab[14]].r;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 2) * 4) + 1] = colorTab[indexTab[14]].g;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 2) * 4) + 2] = colorTab[indexTab[14]].b;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 2) * 4) + 3] = (byteArray[blockIndex * 16 + 7] & 0x0F) * 17;
                                }

                                if (globalX + 3 < width) {
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 3) * 4) + 0] = colorTab[indexTab[15]].r;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 3) * 4) + 1] = colorTab[indexTab[15]].g;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 3) * 4) + 2] = colorTab[indexTab[15]].b;
                                    colorArray[(globalY + 3) * (width * 4) + ((globalX + 3) * 4) + 3] = ((byteArray[blockIndex * 16 + 7] >> 4) & 0x0F) * 17;
                                }
                            }
                        }
                    }
                    break;
                case DDSFormat.RGBA_S3TC_DXT5_FORMAT:
                    break;
            }

            return colorArray;
        }
    }

    class DDS {
        public mipmaps: Array<Egret3D.MipmapData>;
        public width: number;
        public height: number;
        public format: number;
        public mipmapCount: number;
        public isCubemap: boolean;
        constructor() {
            this.mipmaps = new Array<Egret3D.MipmapData>();
            this.width = 0;
            this.height = 0;
            this.format = null;
            this.mipmapCount = 1;
        }
    }
}