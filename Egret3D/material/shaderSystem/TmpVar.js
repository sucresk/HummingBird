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
        var TmpVar = (function (_super) {
            __extends(TmpVar, _super);
            function TmpVar(name, valueType) {
                _super.call(this);
                this.name = name;
                this.varType = "";
                this.valueType = valueType;
            }
            return TmpVar;
        })(GLSL.VarRegister);
        GLSL.TmpVar = TmpVar;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=TmpVar.js.map