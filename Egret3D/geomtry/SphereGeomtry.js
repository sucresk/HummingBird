var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var SphereGeomtry = (function (_super) {
        __extends(SphereGeomtry, _super);
        function SphereGeomtry(r, density) {
            if (r === void 0) { r = 10.0; }
            if (density === void 0) { density = 20; }
            _super.call(this);
            this._r = 1.0;
            this._density = 10;
            this._r = r;
            this._density = density;
            this.buildGeomtry();
        }
        SphereGeomtry.prototype.buildGeomtry = function () {
            var vertices = new Array();
            var vertexIndices = new Array();
            var g_rings = this._density;
            var g_segments = this._density;
            var deltaRing = Math.PI / (g_rings);
            var deltaSegment = 2.0 * Math.PI / g_segments;
            for (var j = 0; j < g_rings + 1; j++) {
                var radius = Math.sin(j * deltaRing);
                var y0 = Math.cos(j * deltaRing);
                for (var i = 0; i < g_segments + 1; i++) {
                    var x0 = radius * Math.sin(i * deltaSegment);
                    var z0 = radius * Math.cos(i * deltaSegment);
                    vertices.push(x0 * this._r, y0 * this._r, z0 * this._r, x0, y0, z0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
                }
            }
            for (var j = 0; j < g_rings; j++) {
                for (var i = 0; i < (g_segments + 1); i++) {
                    vertexIndices.push(i + j * (g_segments + 1));
                    vertexIndices.push((i + 1) % (g_segments + 1) + j * (g_segments + 1));
                    vertexIndices.push((i + 1) % (g_segments + 1) + (j + 1) * (g_segments + 1));
                    vertexIndices.push(i + j * (g_segments + 1));
                    vertexIndices.push((i + 1) % (g_segments + 1) + (j + 1) * (g_segments + 1));
                    vertexIndices.push(i + (j + 1) * (g_segments + 1));
                }
            }
            this.setGeomtryData(vertexIndices, vertices);
        };
        return SphereGeomtry;
    })(BlackSwan.SubGeomtry);
    BlackSwan.SphereGeomtry = SphereGeomtry;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=SphereGeomtry.js.map