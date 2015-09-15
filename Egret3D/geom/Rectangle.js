var BlackSwan;
(function (BlackSwan) {
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 32; }
            if (height === void 0) { height = 32; }
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        return Rectangle;
    })();
    BlackSwan.Rectangle = Rectangle;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Rectangle.js.map