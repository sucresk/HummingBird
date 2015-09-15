var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var TextureMaterial = (function (_super) {
        __extends(TextureMaterial, _super);
        function TextureMaterial(texture) {
            _super.call(this);
            this.diffuseTexture = texture;
        }
        return TextureMaterial;
    })(BlackSwan.MaterialBase);
    BlackSwan.TextureMaterial = TextureMaterial;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=TextureMaterial.js.map