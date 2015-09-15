var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var SubGeomtry = (function (_super) {
        __extends(SubGeomtry, _super);
        function SubGeomtry() {
            _super.call(this);
        }
        SubGeomtry.prototype.setGeomtryData = function (indexData, vertexData) {
            this.indexData = indexData;
            this.verticesData = vertexData;
            this.numItems = indexData.length;
        };
        SubGeomtry.prototype.activate = function (context3D, modeltransform, camera3D) {
        };
        SubGeomtry.prototype.updata = function (context3D, modeltransform, camera3D) {
        };
        return SubGeomtry;
    })(BlackSwan.GeomtryBase);
    BlackSwan.SubGeomtry = SubGeomtry;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=SubGeomtry.js.map