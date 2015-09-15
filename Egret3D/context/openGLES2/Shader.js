var BlackSwan;
(function (BlackSwan) {
    var openGLES;
    (function (openGLES) {
        var Shader = (function () {
            function Shader(shader) {
                this._shader = shader;
            }
            Object.defineProperty(Shader.prototype, "shader", {
                get: function () {
                    return this._shader;
                },
                enumerable: true,
                configurable: true
            });
            Shader.ID_COUNT = 0;
            return Shader;
        })();
        openGLES.Shader = Shader;
    })(openGLES = BlackSwan.openGLES || (BlackSwan.openGLES = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Shader.js.map