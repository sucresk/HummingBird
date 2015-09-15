var BlackSwan;
(function (BlackSwan) {
    (function (ColorFormat) {
        ColorFormat[ColorFormat["Unknown"] = 0] = "Unknown";
        ColorFormat[ColorFormat["RGB565"] = 36194] = "RGB565";
        ColorFormat[ColorFormat["RGBA5551"] = 32855] = "RGBA5551";
        ColorFormat[ColorFormat["RGBA4444"] = 32854] = "RGBA4444";
        ColorFormat[ColorFormat["RGBA8888"] = 6408] = "RGBA8888";
        ColorFormat[ColorFormat["DXT1_RGB"] = 33776] = "DXT1_RGB";
        ColorFormat[ColorFormat["DXT1_RGBA"] = 33777] = "DXT1_RGBA";
        ColorFormat[ColorFormat["DXT3_RGBA"] = 33778] = "DXT3_RGBA";
        ColorFormat[ColorFormat["DXT5_RGBA"] = 33779] = "DXT5_RGBA";
    })(BlackSwan.ColorFormat || (BlackSwan.ColorFormat = {}));
    var ColorFormat = BlackSwan.ColorFormat;
    ;
    (function (InternalFormat) {
        InternalFormat[InternalFormat["PixelArray"] = 0] = "PixelArray";
        InternalFormat[InternalFormat["CompressData"] = 1] = "CompressData";
        InternalFormat[InternalFormat["ImageData"] = 2] = "ImageData";
    })(BlackSwan.InternalFormat || (BlackSwan.InternalFormat = {}));
    var InternalFormat = BlackSwan.InternalFormat;
    ;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Texture2D.js.map