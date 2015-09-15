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
        var Unifrom = (function (_super) {
            __extends(Unifrom, _super);
            function Unifrom(name, valueType) {
                _super.call(this);
                this.name = name;
                this.varType = "uniform";
                this.valueType = valueType;
            }
            return Unifrom;
        })(GLSL.VarRegister);
        GLSL.Unifrom = Unifrom;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Unifrom.js.map