var BlackSwan;
(function (BlackSwan) {
    var openGLES;
    (function (openGLES) {
        var Program3D = (function () {
            function Program3D(pg3D) {
                this.pMatrixUniform = -1;
                this.mMatrixUniform = -1;
                this.vertextAttrib = {};
                this.program = pg3D;
            }
            return Program3D;
        })();
        openGLES.Program3D = Program3D;
    })(openGLES = BlackSwan.openGLES || (BlackSwan.openGLES = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Program3D.js.map