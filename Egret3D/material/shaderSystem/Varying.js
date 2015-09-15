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
        var Varying = (function (_super) {
            __extends(Varying, _super);
            function Varying(name, valueType) {
                _super.call(this);
                this.name = name;
                this.varType = "varying";
                this.valueType = valueType;
            }
            return Varying;
        })(GLSL.VarRegister);
        GLSL.Varying = Varying;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Varying.js.map