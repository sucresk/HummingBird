var BlackSwan;
(function (BlackSwan) {
    var openGLES;
    (function (openGLES) {
        var Texture2D = (function () {
            function Texture2D(texture2D, context3D) {
                this.texture2D = texture2D;
                this.context3D = context3D;
                this.colorformat = BlackSwan.ColorFormat.RGBA8888;
            }
            Texture2D.prototype.uploadTexture = function (mipLevel) {
                this.context3D.upLoadTextureData(mipLevel, this);
            };
            return Texture2D;
        })();
        openGLES.Texture2D = Texture2D;
    })(openGLES = BlackSwan.openGLES || (BlackSwan.openGLES = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Texture2D.js.map