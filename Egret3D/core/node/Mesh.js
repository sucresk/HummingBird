var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(geomtry, material) {
            _super.call(this);
            this._geomtry = geomtry;
            this._material = material;
            this.box.fillBox(this._geomtry.minPos, this._geomtry.maxPos);
        }
        Object.defineProperty(Mesh.prototype, "geomtry", {
            get: function () {
                return this._geomtry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mesh.prototype, "context3D", {
            set: function (con) {
                this._context3D = con;
                this._material.initShader(con, this._geomtry, this._animation);
            },
            enumerable: true,
            configurable: true
        });
        Mesh.prototype.activateDiffusePass = function (context3D, camera3D) {
            this._geomtry.activate(context3D, this.transform, camera3D);
            this._material.activateDiffusePass(context3D, this.transform, camera3D);
        };
        Mesh.prototype.rendenDiffusePass = function (context3D, camera3D) {
            context3D.enableDepthTest(true, 0);
            context3D.enbable(BlackSwan.Egret3D.BLEND);
            this._geomtry.updata(context3D, this.transform, camera3D);
            this._material.renderDiffusePass(context3D, this.transform, camera3D);
            context3D.drawElement(BlackSwan.Egret3D.TRIANGLES, this._geomtry.sharedIndexBuffer, 0, this._geomtry.numItems);
        };
        return Mesh;
    })(BlackSwan.RenderableItem);
    BlackSwan.Mesh = Mesh;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Mesh.js.map