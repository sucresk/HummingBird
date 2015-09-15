var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var GLSL;
    (function (GLSL) {
        var Sampler3D = (function (_super) {
            __extends(Sampler3D, _super);
            function Sampler3D(name) {
                _super.call(this);
                this.name = name;
                this.varType = "sampler3D";
                //this.valueType = valueType;
            }
            return Sampler3D;
        })(GLSL.VarRegister);
        GLSL.Sampler3D = Sampler3D;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Sampler3D.js.map