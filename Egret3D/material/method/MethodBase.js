var BlackSwan;
(function (BlackSwan) {
    var MethodBase = (function () {
        function MethodBase() {
        }
        MethodBase.prototype.getShaderSource = function () {
            this.initShaderSource();
            this.initConstData();
            return this.shader.getShaderSource();
        };
        MethodBase.prototype.initShaderSource = function () {
        };
        MethodBase.prototype.initConstData = function () {
        };
        MethodBase.prototype.setData = function (usage, geomtry, animation) {
            this.usage = usage;
            this.geomtry = geomtry;
            this.animation = animation;
            this.shader = new BlackSwan.GLSL.ShaderBase;
        };
        MethodBase.prototype.activate = function (context3D, program3D, modeltransform, camera3D) {
            //change constData
        };
        MethodBase.prototype.updata = function (context3D, program3D, modeltransform, camera3D) {
        };
        return MethodBase;
    })();
    BlackSwan.MethodBase = MethodBase;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=MethodBase.js.map