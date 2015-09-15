var BlackSwan;
(function (BlackSwan) {
    //dds / st3c compressed texture formats
    (function (DDSFormat) {
        DDSFormat[DDSFormat["RGB_S3TC_DXT1_FORMAT"] = 2001] = "RGB_S3TC_DXT1_FORMAT";
        DDSFormat[DDSFormat["RGBA_S3TC_DXT1_FORMAT"] = 2002] = "RGBA_S3TC_DXT1_FORMAT";
        DDSFormat[DDSFormat["RGBA_S3TC_DXT3_FORMAT"] = 2003] = "RGBA_S3TC_DXT3_FORMAT";
        DDSFormat[DDSFormat["RGBA_S3TC_DXT5_FORMAT"] = 2003] = "RGBA_S3TC_DXT5_FORMAT";
    })(BlackSwan.DDSFormat || (BlackSwan.DDSFormat = {}));
    var DDSFormat = BlackSwan.DDSFormat;
    ;
    var DDSParser = (function () {
        function DDSParser() {
        }
        DDSParser.parse = function (buffer, loadMipmaps) {
            if (loadMipmaps === void 0) { loadMipmaps = true; }
            var dds = new BlackSwan.DDS();
            var headerLengthInt = 31; // The header length in 32 bit ints
            var off_magic = 0;
            var DDS_MAGIC = 0x20534444;
            var DDSD_CAPS = 0x1, DDSD_HEIGHT = 0x2, DDSD_WIDTH = 0x4, DDSD_PITCH = 0x8, DDSD_PIXELFORMAT = 0x1000, DDSD_MIPMAPCOUNT = 0x20000, DDSD_LINEARSIZE = 0x80000, DDSD_DEPTH = 0x800000;
            var DDSCAPS_COMPLEX = 0x8, DDSCAPS_MIPMAP = 0x400000, DDSCAPS_TEXTURE = 0x1000;
            var DDSCAPS2_CUBEMAP = 0x200, DDSCAPS2_CUBEMAP_POSITIVEX = 0x400, DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800, DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000, DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000, DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000, DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000, DDSCAPS2_VOLUME = 0x200000;
            var DDPF_ALPHAPIXELS = 0x1, DDPF_ALPHA = 0x2, DDPF_FOURCC = 0x4, DDPF_RGB = 0x40, DDPF_YUV = 0x200, DDPF_LUMINANCE = 0x20000;
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
            var header = new Int32Array(buffer, 0, headerLengthInt);
            if (header[off_magic] !== DDS_MAGIC) {
                console.error('DDSParser.parse: Invalid magic number in DDS header.');
                return dds;
            }
            if (!(header[off_pfFlags] & DDPF_FOURCC)) {
                console.error('DDSParser.parse: Unsupported format, must contain a FourCC code.');
                return dds;
            }
            var blockBytes;
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
                    }
                    else {
                        console.error('DDSParser.parse: Unsupported FourCC code ', DDSParser.int32ToFourCC(fourCC));
                        return dds;
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
            for (var face = 0; face < faces; face++) {
                for (var i = 0; i < dds.mipmapCount; i++) {
                    if (isRGBAUncompressed) {
                        var byteArray = DDSParser.loadARGBMip(buffer, dataOffset, width, height);
                        var dataLength = byteArray.length;
                    }
                    else {
                        var dataLength = Math.max(4, width) / 4 * Math.max(4, height) / 4 * blockBytes;
                        var byteArray = new Uint8Array(buffer, dataOffset, dataLength);
                    }
                    var mipmap = new BlackSwan.Mipmap(byteArray, width, height);
                    dds.mipmaps.push(mipmap);
                    dataOffset += dataLength;
                    width = Math.max(width * 0.5, 1);
                    height = Math.max(height * 0.5, 1);
                }
                width = dds.width;
                height = dds.height;
            }
            return dds;
        };
        DDSParser.loadARGBMip = function (buffer, dataOffset, width, height) {
            var dataLength = width * height * 4;
            var srcBuffer = new Uint8Array(buffer, dataOffset, dataLength);
            var byteArray = new Uint8Array(dataLength);
            var dst = 0;
            var src = 0;
            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    var b = srcBuffer[src];
                    src++;
                    var g = srcBuffer[src];
                    src++;
                    var r = srcBuffer[src];
                    src++;
                    var a = srcBuffer[src];
                    src++;
                    byteArray[dst] = r;
                    dst++; //r
                    byteArray[dst] = g;
                    dst++; //g
                    byteArray[dst] = b;
                    dst++; //b
                    byteArray[dst] = a;
                    dst++; //a
                }
            }
            return byteArray;
        };
        DDSParser.fourCCToInt32 = function (value) {
            return value.charCodeAt(0) + (value.charCodeAt(1) << 8) + (value.charCodeAt(2) << 16) + (value.charCodeAt(3) << 24);
        };
        DDSParser.int32ToFourCC = function (value) {
            return String.fromCharCode(value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff, (value >> 24) & 0xff69);
        };
        return DDSParser;
    })();
    BlackSwan.DDSParser = DDSParser;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=DDSParser.js.map