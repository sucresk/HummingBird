var BlackSwan;
(function (BlackSwan) {
    var Mipmap = (function () {
        function Mipmap(data, width, height) {
            this.data = data;
            this.width = width;
            this.height = height;
        }
        Mipmap.generateMipMaps = function (source) {
            var minW = 1;
            var minH = 1;
            var w = Math.ceil(source.width / 2);
            var h = Math.ceil(source.height / 2);
            var mipmaps = new Array();
            mipmaps.push(source);
            var mipmap;
            while (w >= minW || h >= minH) {
                mipmap = new Mipmap(getHalfArray(source.data), w, h);
                w >>= 1;
                h >>= 1;
                source = mipmap;
            }
            function getHalfArray(ary) {
                var result = new Uint8Array(Math.ceil(ary.length / 2));
                var index = 0;
                for (var i = 0; i < ary.length; i++) {
                    if (i % 2 == 0) {
                        result[index++] = ary[i];
                    }
                }
                return result;
            }
        };
        return Mipmap;
    })();
    BlackSwan.Mipmap = Mipmap;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Mipmap.js.map