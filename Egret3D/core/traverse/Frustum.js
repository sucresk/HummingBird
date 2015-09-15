var BlackSwan;
(function (BlackSwan) {
    var Frustum = (function () {
        function Frustum() {
            this._vtxNum = 8;
            this._planeNum = 6;
            this._vertex = new Array();
            for (var i = 0; i < this._vtxNum; ++i) {
                this._vertex.push(new BlackSwan.Vector3D());
            }
            this._pos = new BlackSwan.Vector3D();
            this._plane = new Array();
            for (var i = 0; i < 6; ++i) {
                this._plane.push(new BlackSwan.Plane3D());
            }
            this.box = new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(), new BlackSwan.Vector3D());
            //this.box = new CubeBoxBound(new Vector3D(99999.0, 99999.0, 99999.0), new Vector3D(-99999.0, -99999.0, -99999.0));
        }
        Frustum.prototype.makeFrustum = function (fovY, aspectRatio, nearPlane, farPlane) {
            var tangent = Math.tan(fovY / 2.0 * (Math.PI / 180.0));
            var nearHeight = nearPlane * tangent;
            var nearWidth = nearHeight * aspectRatio;
            var farHeight = farPlane * tangent;
            var farWidth = farHeight * aspectRatio;
            // near top right
            this._vertex[0].x = nearWidth;
            this._vertex[0].y = nearHeight;
            this._vertex[0].z = nearPlane;
            // near top left
            this._vertex[1].x = -nearWidth;
            this._vertex[1].y = nearHeight;
            this._vertex[1].z = nearPlane;
            // near bottom left
            this._vertex[2].x = -nearWidth;
            this._vertex[2].y = -nearHeight;
            this._vertex[2].z = nearPlane;
            // near bottom right
            this._vertex[3].x = nearWidth;
            this._vertex[3].y = -nearHeight;
            this._vertex[3].z = nearPlane;
            // far top right
            this._vertex[4].x = farWidth;
            this._vertex[4].y = farHeight;
            this._vertex[4].z = farPlane;
            // far top left
            this._vertex[5].x = -farWidth;
            this._vertex[5].y = farHeight;
            this._vertex[5].z = farPlane;
            // far bottom left
            this._vertex[6].x = -farWidth;
            this._vertex[6].y = -farHeight;
            this._vertex[6].z = farPlane;
            // far bottom right
            this._vertex[7].x = farWidth;
            this._vertex[7].y = -farHeight;
            this._vertex[7].z = farPlane;
        };
        Frustum.prototype.make = function (camera) {
            this.makeFrustum(camera.cameraMatrix.fieldOfView, camera.cameraMatrix.aspectRatio, camera.cameraMatrix.near, 3000.0);
            // 摄像机变化之后的顶点也变化;
            var vtx = new Array();
            var mat = new BlackSwan.Matrix4_4();
            mat.copyFrom(camera.transform);
            for (var i = 0; i < this._vtxNum; ++i) {
                vtx.push(mat.transformVector(this._vertex[i]));
            }
            for (var i = 0; i < vtx.length; ++i) {
                if (this.box.max.x < vtx[i].x) {
                    this.box.max.x = vtx[i].x;
                }
                if (this.box.max.y < vtx[i].y) {
                    this.box.max.y = vtx[i].y;
                }
                if (this.box.max.z < vtx[i].z) {
                    this.box.max.z = vtx[i].z;
                }
                if (this.box.min.x > vtx[i].x) {
                    this.box.min.x = vtx[i].x;
                }
                if (this.box.min.y > vtx[i].y) {
                    this.box.min.y = vtx[i].y;
                }
                if (this.box.min.z > vtx[i].z) {
                    this.box.min.z = vtx[i].z;
                }
            }
            //var pos: Vector3D = this._vtx[0].add(this._vtx[5]);
            //pos.scaleBy(0.5);
            //this._pos.copyFrom(pos);
            //var rawData: Float32Array = camera.viewProjection.rawData;
            //var col0: Vector3D = new Vector3D(rawData[0], rawData[4], rawData[8], rawData[12]);
            //var col1: Vector3D = new Vector3D(rawData[1], rawData[5], rawData[9], rawData[13]);
            //var col2: Vector3D = new Vector3D(rawData[2], rawData[6], rawData[0], rawData[14]);
            //var col3: Vector3D = new Vector3D(rawData[3], rawData[7], rawData[11], rawData[15]);
            //this._plane[0] = new Plane3D(col2.x, col2.y, col2.z, col2.w);
            //var tmp: Vector3D = col3.subtract(col2);
            //this._plane[1] = new Plane3D(tmp.x, tmp.y, tmp.z, tmp.w);
            //tmp = col3.add(col0);
            //this._plane[2] = new Plane3D(tmp.x, tmp.y, tmp.z, tmp.w);
            //tmp = col3.subtract(col0);
            //this._plane[3] = new Plane3D(tmp.x, tmp.y, tmp.z, tmp.w);
            //tmp = col3.subtract(col1);
            //this._plane[4] = new Plane3D(tmp.x, tmp.y, tmp.z, tmp.w);
            //tmp = col3.add(col1);
            //this._plane[5] = new Plane3D(tmp.x, tmp.y, tmp.z, tmp.w);
            this._plane[0].fromPoints(vtx[4], vtx[5], vtx[6]); // 远平面(far);
            this._plane[1].fromPoints(vtx[1], vtx[6], vtx[5]); // 左平面(left);
            this._plane[2].fromPoints(vtx[0], vtx[4], vtx[7]); // 右平面(right);
            this._plane[3].fromPoints(vtx[1], vtx[0], vtx[3]); // 近平面(near);
            this._plane[4].fromPoints(vtx[1], vtx[5], vtx[4]); // 上平面(top);
            this._plane[5].fromPoints(vtx[3], vtx[7], vtx[6]); // 下平面(bottom);
            for (var i = 0; i < this._planeNum; i++) {
                this._plane[i].normalize();
            }
            //var bb: boolean = this.inPoint(new Vector3D(-0, -0, 100));
            //var b2: boolean = bb;
        };
        Frustum.prototype.inPoint = function (pos) {
            var dis = 0;
            for (var i = 0; i < this._plane.length; ++i) {
                dis = (this._plane[i].a * pos.x + this._plane[i].b * pos.y + this._plane[i].c * pos.z + this._plane[i].d);
                if (dis > 0.0) {
                    return false;
                }
            }
            return true;
        };
        Frustum.prototype.inSphere = function (center, radius) {
            var dis = 0;
            for (var i = 0; i < this._plane.length; ++i) {
                dis = (this._plane[i].a * center.x + this._plane[i].b * center.y + this._plane[i].c * center.z + this._plane[i].d);
                if (dis > radius) {
                    return false;
                }
            }
            return true;
        };
        Frustum.prototype.inBox = function (box) {
            var v = new Array();
            var dis = 0;
            for (var i = 0; i < this._plane.length; ++i) {
                var incount = box.vexData.length / 3;
                for (var j = 0; j < box.vexData.length; j += 3) {
                    dis = (this._plane[i].a * box.vexData[j] + this._plane[i].b * box.vexData[j + 1] + this._plane[i].c * box.vexData[j + 2] + this._plane[i].d);
                    if (dis > 0) {
                        incount--;
                    }
                }
                if (incount <= 0) {
                    return false;
                }
            }
            return true;
        };
        Frustum.prototype.getPos = function () {
            return this._pos;
        };
        return Frustum;
    })();
    BlackSwan.Frustum = Frustum;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Frustum.js.map