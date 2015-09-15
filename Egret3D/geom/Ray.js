var BlackSwan;
(function (BlackSwan) {
    var Ray = (function () {
        function Ray(origin, direction) {
            if (origin === void 0) { origin = new BlackSwan.Vector3D(); }
            if (direction === void 0) { direction = new BlackSwan.Vector3D(); }
            this.origin = new BlackSwan.Vector3D();
            this.dir = new BlackSwan.Vector3D();
            this.origin.copyFrom(origin);
            this.dir.copyFrom(direction);
        }
        /**
        **  计算一个三角形和一个射线的交点;
        **  v0 三角形的第一个顶点;
        **  v1 三角形的第二个顶点;
        **  v2 三角形的第三个顶点;
        **  ret t(交点到射线起始点的距离) u(交点在v1-v0上的投影的位置) v(交点在v1-v2上的投影的位置, 交点为ret=v0+pU*(v1-v0)+pV*(v2-v0));
        **
        */
        Ray.prototype.IntersectTriangle = function (v0, v1, v2, ret) {
            if (ret === void 0) { ret = null; }
            var edge1 = v1.subtract(v0);
            var edge2 = v2.subtract(v0);
            var pvec = this.dir.crossProduct(edge2);
            var det = edge1.dotProduct(pvec);
            var tvec;
            if (det > 0) {
                tvec = this.origin.subtract(v0);
            }
            else {
                tvec = v0.subtract(this.origin);
                det = -det;
            }
            if (det < 0.0001) {
                return false;
            }
            // Calculate U parameter and test bounds
            var u = tvec.dotProduct(pvec);
            if (ret != null) {
                ret[1] = u;
            }
            if (u < 0.0 || u > det) {
                return false;
            }
            // Prepare to test V parameter
            var qvec = tvec.crossProduct(edge1);
            // Calculate V parameter and test bounds
            var v = this.dir.dotProduct(qvec);
            if (ret != null) {
                ret[2] = v;
            }
            if (v < 0.0 || u + v > det) {
                return false;
            }
            // Calculate T, scale parameters, ray intersects triangle
            var t = edge2.dotProduct(qvec);
            var invDet = 1.0 / det;
            t *= invDet;
            u *= invDet;
            v *= invDet;
            if (ret != null) {
                ret[0] = t;
                ret[1] = u;
                ret[2] = v;
            }
            if (t < 0) {
                return false;
            }
            return true;
        };
        Ray.prototype.IntersectMesh = function (verticesData, indexData, offset, faces, inPos, mMat) {
            var triangle = new Array();
            var v0 = new BlackSwan.Vector3D();
            var v1 = new BlackSwan.Vector3D();
            var v2 = new BlackSwan.Vector3D();
            triangle.push(v0);
            triangle.push(v1);
            triangle.push(v2);
            var face = -1;
            var t = Number.MAX_VALUE;
            var u = 0;
            var v = 0;
            for (var i = 0; i < faces; ++i) {
                for (var j = 0; j < 3; ++j) {
                    var index = indexData[3 * i + j];
                    var pos = new BlackSwan.Vector3D(verticesData[offset * index + 0], verticesData[offset * index + 1], verticesData[offset * index + 2]);
                    pos = mMat.transformVector(pos);
                    triangle[j].x = pos.x;
                    triangle[j].y = pos.y;
                    triangle[j].z = pos.z;
                }
                var ret = new Array();
                ret.push(0.0);
                ret.push(0.0);
                ret.push(0.0);
                if (this.IntersectTriangle(v0, v1, v2, ret)) {
                    if (ret[0] < t) {
                        face = i;
                        t = ret[0];
                        u = ret[1];
                        v = ret[2];
                    }
                }
            }
            if (face < faces && face >= 0) {
                for (var i = 0; i < 3; ++i) {
                    var index = 3 * face + i;
                    var pos = new BlackSwan.Vector3D(verticesData[offset * index + 0], verticesData[offset * index + 1], verticesData[offset * index + 2]);
                    pos = mMat.transformVector(pos);
                    triangle[i].x = pos.x;
                    triangle[i].y = pos.y;
                    triangle[i].z = pos.z;
                }
                var tmp0 = v1.subtract(v0);
                tmp0.scaleBy(u);
                var tmp1 = v2.subtract(v0);
                tmp1.scaleBy(v);
                inPos.copyFrom(v0.add(tmp0.add(tmp1)));
                return true;
            }
            return false;
        };
        Ray.prototype.CalculateAndTransformRay = function (width, height, viewMat, projMat, x, y) {
            this.dir.x = (2.0 * x / width - 1.0) / projMat.rawData[0];
            this.dir.y = (-2.0 * y / height + 1.0) / projMat.rawData[5];
            this.dir.z = 1.0;
            var invViewMat = new BlackSwan.Matrix4_4();
            invViewMat.copyFrom(viewMat);
            //invViewMat.invert();
            this.origin.copyFrom(invViewMat.transformVector(this.origin));
            this.dir.copyFrom(invViewMat.deltaTransformVector(this.dir));
            this.dir.normalize();
        };
        return Ray;
    })();
    BlackSwan.Ray = Ray;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Ray.js.map