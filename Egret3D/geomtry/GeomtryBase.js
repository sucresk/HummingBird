var BlackSwan;
(function (BlackSwan) {
    var GeomtryBase = (function () {
        function GeomtryBase() {
            this.posAtt = -1;
            this.normalAtt = -1;
            this.tangentAtt = -1;
            this.vertexColorAtt = -1;
            this.uvAtt = -1;
            this.uv2Att = -1;
            this.positionSize = 3;
            this.normalSize = 3;
            this.tangentSize = 3;
            this.colorSize = 4;
            this.uvSize = 2;
            this.uv2Size = 2;
            this.numItems = 0;
            this.minPos = new BlackSwan.Vector3D();
            this.maxPos = new BlackSwan.Vector3D();
        }
        GeomtryBase.prototype.buildGeomtry = function () {
        };
        GeomtryBase.prototype.activate = function (context3D, modeltransform, camera3D) {
        };
        GeomtryBase.prototype.updata = function (context3D, modeltransform, camera3D) {
        };
        GeomtryBase.prototype.buildBoundBox = function (offset) {
            this.minPos.copyFrom(new BlackSwan.Vector3D(99999.0, 99999.0, 99999.0));
            this.maxPos.copyFrom(new BlackSwan.Vector3D(-99999.0, -99999.0, -99999.0));
            for (var i = 0; i < this.verticesData.length; i += offset) {
                if (this.maxPos.x < this.verticesData[i]) {
                    this.maxPos.x = this.verticesData[i];
                }
                if (this.maxPos.y < this.verticesData[i + 1]) {
                    this.maxPos.y = this.verticesData[i + 1];
                }
                if (this.maxPos.z < this.verticesData[i + 2]) {
                    this.maxPos.z = this.verticesData[i + 2];
                }
                if (this.minPos.x > this.verticesData[i]) {
                    this.minPos.x = this.verticesData[i];
                }
                if (this.minPos.y > this.verticesData[i + 1]) {
                    this.minPos.y = this.verticesData[i + 1];
                }
                if (this.minPos.z > this.verticesData[i + 2]) {
                    this.minPos.z = this.verticesData[i + 2];
                }
            }
        };
        return GeomtryBase;
    })();
    BlackSwan.GeomtryBase = GeomtryBase;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=GeomtryBase.js.map