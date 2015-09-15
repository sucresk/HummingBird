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
        var Attribute = (function (_super) {
            __extends(Attribute, _super);
            function Attribute(name, valueType) {
                _super.call(this);
                this.name = name;
                this.varType = "attribute";
                this.valueType = valueType;
            }
            return Attribute;
        })(GLSL.VarRegister);
        GLSL.Attribute = Attribute;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Attribute.js.map