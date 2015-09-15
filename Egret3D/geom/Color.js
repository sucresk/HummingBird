var BlackSwan;
(function (BlackSwan) {
    var Color = (function () {
        function Color(r, g, b, a) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            if (a === void 0) { a = 255; }
            this.a = 255;
            this.r = 255;
            this.g = 255;
            this.b = 255;
            this.a = a;
            this.r = r;
            this.g = g;
            this.b = b;
        }
        Color.white = function () {
            return new Color(255, 255, 255, 255);
        };
        Color.black = function () {
            return new Color(0, 0, 0, 255);
        };
        Color.red = function () {
            return new Color(255, 0, 0, 255);
        };
        Color.green = function () {
            return new Color(0, 255, 0, 255);
        };
        Color.blue = function () {
            return new Color(0, 0, 255, 255);
        };
        Color.prototype.getColor = function (colorFormat) {
            if (colorFormat === void 0) { colorFormat = BlackSwan.ColorFormat.RGBA8888; }
            if (colorFormat == BlackSwan.ColorFormat.RGB565)
                return 0;
            if (colorFormat == BlackSwan.ColorFormat.RGBA5551)
                return 0;
            if (colorFormat == BlackSwan.ColorFormat.RGBA4444)
                return 0;
            return this.r << 24 | this.g << 16 | this.b << 8 | this.a;
        };
        return Color;
    })();
    BlackSwan.Color = Color;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Color.js.map