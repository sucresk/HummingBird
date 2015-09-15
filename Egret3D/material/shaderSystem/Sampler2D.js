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
        var Sampler2D = (function (_super) {
            __extends(Sampler2D, _super);
            function Sampler2D(name) {
                _super.call(this);
                this.name = name;
                this.varType = "sampler2D";
                //this.valueType = valueType;
            }
            return Sampler2D;
        })(GLSL.VarRegister);
        GLSL.Sampler2D = Sampler2D;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Sampler2D.js.map