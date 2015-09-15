var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var CylinderGeomtry = (function (_super) {
        __extends(CylinderGeomtry, _super);
        function CylinderGeomtry() {
            _super.call(this);
            this.buildGeomtry();
        }
        CylinderGeomtry.prototype.buildGeomtry = function () {
            var vertices = new Array();
            var vertexIndices = new Array();
            var m_nSegments = 10;
            var m_rRadius = 10;
            var m_rHeight = 60;
            var nCurrentSegment = 10;
            var rDeltaSegAngle = (2.0 * Math.PI / m_nSegments);
            var rSegmentLength = 1.0 / m_nSegments;
            for (nCurrentSegment = 0; nCurrentSegment <= m_nSegments; nCurrentSegment++) {
                var x0 = m_rRadius * Math.sin(nCurrentSegment * rDeltaSegAngle);
                var z0 = m_rRadius * Math.cos(nCurrentSegment * rDeltaSegAngle);
                vertices.push(x0, 0.0 + (m_rHeight / 2.0), z0, x0, 0.0, z0, 1, 1, 1, 1, 1.0, 0.0, 0, 0, x0, 0.0 - (m_rHeight / 2.0), z0, x0, 0.0, z0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            }
            vertices.push(0.0, 0.0 + (m_rHeight / 2.0), 0.0, 0.0, 1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            for (nCurrentSegment = 0; nCurrentSegment <= m_nSegments; nCurrentSegment++) {
                var x0 = m_rRadius * Math.sin(nCurrentSegment * rDeltaSegAngle);
                var z0 = m_rRadius * Math.cos(nCurrentSegment * rDeltaSegAngle);
                //float tu0 = (0.5f * sinf(nCurrentSegment * rDeltaSegAngle)) + 0.5f;
                //float tv0 = (0.5f * cosf(nCurrentSegment * rDeltaSegAngle)) + 0.5f;
                vertices.push(x0, 0.0 + (m_rHeight / 2.0), z0, 0.0, 1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            }
            vertices.push(0.0, 0.0 - (m_rHeight / 2.0), 0.0, 0.0, -1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            for (nCurrentSegment = m_nSegments; nCurrentSegment >= 0; nCurrentSegment--) {
                var x0 = m_rRadius * Math.sin(nCurrentSegment * rDeltaSegAngle);
                var z0 = m_rRadius * Math.cos(nCurrentSegment * rDeltaSegAngle);
                vertices.push(x0, 0.0 - (m_rHeight / 2.0), z0, 0.0, -1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            }
            this.setGeomtryData(vertexIndices, vertices);
        };
        return CylinderGeomtry;
    })(BlackSwan.SubGeomtry);
    BlackSwan.CylinderGeomtry = CylinderGeomtry;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=CylinderGeomtry.js.map