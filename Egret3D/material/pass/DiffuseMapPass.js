var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var DiffuseMapPass = (function (_super) {
        __extends(DiffuseMapPass, _super);
        function DiffuseMapPass() {
            _super.call(this);
            this.mainVsMethod = new BlackSwan.StaticVertexMethod();
            this.mainFsMethod = new BlackSwan.DiffuseMethod();
        }
        Object.defineProperty(DiffuseMapPass.prototype, "diffuseTexture", {
            set: function (texture) {
                //<DiffuseMethod>this.mainFsMethod.diffuseTexture.texture = texture;
                //this.mainFsMethod.usage.texture2D_0 = new GLSL.Sampler2D(GLSL.VarConstName.texture2D_0);
                this.mainFsMethod.diffuseTexture = texture;
            },
            enumerable: true,
            configurable: true
        });
        return DiffuseMapPass;
    })(BlackSwan.MaterialPassBase);
    BlackSwan.DiffuseMapPass = DiffuseMapPass;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=DiffuseMapPass.js.map