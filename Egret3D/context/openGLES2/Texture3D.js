var BlackSwan;
(function (BlackSwan) {
    var openGLES;
    (function (openGLES) {
        var Texture3D = (function () {
            function Texture3D(texture3D) {
                this.texture3D = texture3D;
            }
            return Texture3D;
        })();
        openGLES.Texture3D = Texture3D;
    })(openGLES = BlackSwan.openGLES || (BlackSwan.openGLES = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Texture3D.js.map