module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.Ray
     * @classdesc
     * Ray 类 用于检测射线
     */
    export class Ray {
        public origin: Vector3D = new Vector3D();
        public dir: Vector3D = new Vector3D();
        
        /**
        * @language zh_CN
        * constructor
        * @origin 射线原点
        * @direction 射线方向
        */
        constructor(origin: Vector3D = new Vector3D(), direction: Vector3D = new Vector3D()) {
            this.origin.copyFrom(origin);
            this.dir.copyFrom(direction);
        }
        
        /**
        * @language zh_CN
        * 计算一个三角形和一个射线的交点
        * @param v0 三角形的第一个顶点
        * @param v1 三角形的第二个顶点
        * @param v2 三角形的第三个顶点
        * @param ret t(交点到射线起始点的距离) u(交点在v1-v0上的投影的位置) v(交点在v1-v2上的投影的位置, 交点为ret=v0+pU*(v1-v0)+pV*(v2-v0))
        * @returns 相交返回true
        */
        public IntersectTriangle(v0: Vector3D, v1: Vector3D, v2: Vector3D, ret: Array<number> = null): boolean {
            var edge1: Vector3D = v1.subtract(v0);
            var edge2: Vector3D = v2.subtract(v0);

            var pvec: Vector3D = this.dir.crossProduct(edge2);

            var det: number = edge1.dotProduct(pvec);

            var tvec: Vector3D;
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
            var qvec: Vector3D = tvec.crossProduct(edge1);
            // Calculate V parameter and test bounds

            var v: number = this.dir.dotProduct(qvec);
            if (ret != null) {
                ret[2] = v;
            }
            if (v < 0.0 || u + v > det) {
                return false;
            }

            // Calculate T, scale parameters, ray intersects triangle
            var t: number = edge2.dotProduct(qvec);
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
        }
                
        /**
        * @language zh_CN
        * 检测射线相交模型
        * @param mesh 检测的模型
        * @param inPos 相交点
        * @returns 相交返回true
        */
        public IntersectMeshEx(mesh: Mesh, inPos: Vector3D): boolean {
            return this.IntersectMesh(mesh.geometry.verticesData, mesh.geometry.indexData, mesh.geometry.vertexAttLength, mesh.geometry.indexData.length / 3, inPos, mesh.modelMatrix);
        }
                        
        /**
        * @language zh_CN
        * 检测射线相交模型
        * @param verticesData 检测的模型的顶点数据
        * @param indexData 检测的模型的索引数据
        * @param offset 每个顶点的大小
        * @param faces 模型面数
        * @param inPos 返回相交点
        * @param mMat 顶点的世界变换矩阵
        * @returns 相交返回true
        */
        public IntersectMesh(verticesData: Array<number>, indexData: Array<number>, offset: number, faces: number, inPos:Vector3D, mMat: Matrix4_4): boolean {

            var triangle: Array<Vector3D> = new Array<Vector3D>();
            var v0: Vector3D = new Vector3D();
            var v1: Vector3D = new Vector3D();
            var v2: Vector3D = new Vector3D();
            triangle.push(v0);
            triangle.push(v1);
            triangle.push(v2);

            var face: number = -1;
            var t: number = Number.MAX_VALUE;
            var u: number = 0;
            var v: number = 0;
            for (var i: number = 0; i < faces; ++i) {
                for (var j: number = 0; j < 3; ++j) {
                    var index: number = indexData[3 * i + j];
                    var pos: Vector3D = new Vector3D(verticesData[offset * index + 0], verticesData[offset * index + 1], verticesData[offset * index + 2]);
                    pos = mMat.transformVector(pos);

                    triangle[j].x = pos.x;
                    triangle[j].y = pos.y;
                    triangle[j].z = pos.z;
                }

                var ret: Array<number> = new Array<number>();
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
                for (var i: number = 0; i < 3; ++i) {
                    var index: number = indexData[3 * face + i];
                    var pos: Vector3D = new Vector3D(verticesData[offset * index + 0], verticesData[offset * index + 1], verticesData[offset * index + 2]);
                    pos = mMat.transformVector(pos);

                    triangle[i].x = pos.x;
                    triangle[i].y = pos.y;
                    triangle[i].z = pos.z;
                }
                var tmp0: Vector3D = v1.subtract(v0);
                tmp0.scaleBy(u);

                var tmp1: Vector3D = v2.subtract(v0);
                tmp1.scaleBy(v);

                inPos.copyFrom(v0.add(tmp0.add(tmp1)));
                return true;
            }
            return false; 
        }

        private invViewMat: Matrix4_4 = new Matrix4_4();
                        
        /**
        * @language zh_CN
        * 计算摄像机的射线
        * @param width 视口宽
        * @param height 视口高
        * @param viewMat 相机视图矩阵
        * @param projMat 相机投影矩阵
        * @param x 鼠标x
        * @param y 鼠标y
        */
        public CalculateAndTransformRay(width: number, height: number, viewMat: Matrix4_4, projMat: Matrix4_4, x: number, y: number) {
            this.reset();
            this.dir.x = (2.0 * x / width - 1.0) / projMat.rawData[0];
            this.dir.y = (-2.0 * y / height + 1.0) / projMat.rawData[5];
            this.dir.z = 1.0;

            this.invViewMat.copyFrom(viewMat);
            this.origin.copyFrom(this.invViewMat.transformVector(this.origin));
            this.dir.copyFrom(this.invViewMat.deltaTransformVector(this.dir));
            this.dir.normalize();
        }

        /**
        * @language zh_CN
        * 射线重置
        */
        public reset() {
            this.origin.setTo(0, 0, 0);
            this.dir.setTo(0, 0, 0);
        }
    }
} 