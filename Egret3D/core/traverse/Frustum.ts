module Egret3D {
                    
    /**
    * @class Egret3D.Frustum
    * @classdesc
    * 摄相机视椎体
    */
    export class Frustum {
        
        public box: CubeBoxBound;

        private _vtxNum: number = 8;
        private _planeNum: number = 6;
        private _vertex: Array<Vector3D>;

        private _pos: Vector3D;
        private _plane: Array<Plane3D>;

        /**
        * @language zh_CN
        * 视椎体中心点
        */
        public center: Vector3D;

        private _curVer: Array<Vector3D>;
        
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            this._vertex = new Array<Vector3D>();
            for (var i: number = 0; i < this._vtxNum; ++i) {
                this._vertex.push(new Vector3D());
            }

            this._pos = new Vector3D();
            this._plane = new Array<Plane3D>();
            for (var i: number = 0; i < 6; ++i) {
                this._plane.push(new Plane3D());
            }
            this.box = new CubeBoxBound(new Vector3D(), new Vector3D());
            ///this.box = new CubeBoxBound(new Vector3D(99999.0, 99999.0, 99999.0), new Vector3D(-99999.0, -99999.0, -99999.0));
            this.center = new Vector3D();
        }

        /**
        * @language zh_CN
        * 生成一个视椎体
        * @param fovY 观察时y 轴方向的角度，就是观察范围夹角。
        * @param aspectRatio 纵横比，在视空间宽度除以高度.
        * @param nearPlane 近裁剪面位置Z值.
        * @param farPlane 远裁剪面位置Z值.
        */
        public makeFrustum(fovY: number, aspectRatio: number, nearPlane: number, farPlane: number) {
            ///var tangent: number = Math.tan(fovY / 2.0 * (Math.PI / 180.0));
            var tangent: number = Math.tan(fovY / 2.0 * (Math.PI / 180.0));

            var nearHeight: number = nearPlane * tangent;
            var nearWidth: number = nearHeight * aspectRatio;
            var farHeight: number = farPlane * tangent;
            var farWidth: number = farHeight * aspectRatio;

            /// near top right
            this._vertex[0].x = nearWidth;
            this._vertex[0].y = nearHeight;
            this._vertex[0].z = nearPlane;
            /// near top left
            this._vertex[1].x = -nearWidth;
            this._vertex[1].y = nearHeight;
            this._vertex[1].z = nearPlane;
            /// near bottom left
            this._vertex[2].x = -nearWidth;
            this._vertex[2].y = -nearHeight;
            this._vertex[2].z = nearPlane;
            /// near bottom right
            this._vertex[3].x = nearWidth;
            this._vertex[3].y = -nearHeight;
            this._vertex[3].z = nearPlane;
            /// far top right
            this._vertex[4].x = farWidth;
            this._vertex[4].y = farHeight;
            this._vertex[4].z = farPlane;
            /// far top left
            this._vertex[5].x = -farWidth;
            this._vertex[5].y = farHeight;
            this._vertex[5].z = farPlane;
            /// far bottom left
            this._vertex[6].x = -farWidth;
            this._vertex[6].y = -farHeight;
            this._vertex[6].z = farPlane;
            /// far bottom right
            this._vertex[7].x = farWidth;
            this._vertex[7].y = -farHeight;
            this._vertex[7].z = farPlane;
        }

        /**
        * @language zh_CN
        * 数据更新.
        * @param camera 视椎的摄像机.
        */
        public update(camera: Camera3D) {

            this.makeFrustum(camera.fieldOfView, camera.aspectRatio, camera.near, camera.far);

            /// 摄像机变化之后的顶点也变化;
            var vtx: Array<Vector3D> = new Array<Vector3D>();
            var mat: Matrix4_4 = new Matrix4_4();
            mat.copyFrom(camera.modelMatrix);
            ///mat.invert(); /// 眼睛的世界矩阵;

            this._curVer = vtx;

            for (var i: number = 0; i < this._vtxNum; ++i) {
                vtx.push(mat.transformVector(this._vertex[i]));
            }

            for (var i: number = 0; i < vtx.length; ++i) {
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

            this.box.calculateBox();

            this._plane[0].fromPoints(vtx[4], vtx[5], vtx[6]);        /// 远平面(far);
            this._plane[1].fromPoints(vtx[1], vtx[6], vtx[5]);        /// 左平面(left);
            this._plane[2].fromPoints(vtx[0], vtx[4], vtx[7]);        /// 右平面(right);

            this._plane[3].fromPoints(vtx[1], vtx[0], vtx[3]);        /// 近平面(near);
            this._plane[4].fromPoints(vtx[1], vtx[5], vtx[4]);        /// 上平面(top);
            this._plane[5].fromPoints(vtx[3], vtx[7], vtx[6]);        /// 下平面(bottom);
            for (var i: number = 0; i < this._planeNum; i++) {
                this._plane[i].normalize();
            }

            var nearCenter: Vector3D = new Vector3D();
            nearCenter.copyFrom(vtx[0].subtract(vtx[2]));
            nearCenter.scaleBy(0.5);
            nearCenter.copyFrom(vtx[2].add(nearCenter));

            var farCenter: Vector3D = new Vector3D();
            farCenter.copyFrom(vtx[4].subtract(vtx[6]));
            farCenter.scaleBy(0.5);
            farCenter.copyFrom(vtx[6].add(farCenter));

            this.center.copyFrom(farCenter.subtract(nearCenter));
            this.center.scaleBy(0.5);
            this.center.copyFrom(nearCenter.add(this.center));
        }
        
        /**
        * @language zh_CN
        * 检测一个坐标点是否在视椎体内
        * @param pos 检测的坐标
        @ return 在视椎内返回ture
        */
        public inPoint(pos: Vector3D): boolean {
            var dis: number = 0;
            for (var i: number = 0; i < this._plane.length; ++i) {
                dis = this._plane[i].distance(pos);
                if (dis > 0.0) {
                    return false;
                }
            }
            return true;
        }
                
        /**
        * @language zh_CN
        * 检测一个球是否在视椎体内
        * @param center 球的坐标
        * @param radius 球的半径
        @ return 在视椎内返回ture
        */
        public inSphere(center: Vector3D, radius: number): boolean {
            var dis: number = 0;
            for (var i: number = 0; i < this._plane.length; ++i) {
                dis = this._plane[i].distance(center);
                if (dis > radius) {
                    return false;
                }
            }
            return true;
        }
                        
        /**
        * @language zh_CN
        * 检测一个盒子是否在视椎体内
        * @param box 盒子
        @ return 在视椎内返回ture
        */
        public inBox(box: CubeBoxBound): boolean {
            var v: Array<Vector3D> = new Array<Vector3D>();
            var dis: number = 0;

            var temp: Vector3D = new Vector3D();
            for (var i: number = 0; i < this._plane.length; ++i) {
                var incount: number = box.vexData.length / 3;
                for (var j: number = 0; j < box.vexData.length; j += 3) {
                    temp.setTo(box.vexData[j], box.vexData[j + 1], box.vexData[j + 2]);
                    dis = this._plane[i].distance(temp);
                    if (dis > 0) {
                        incount--;
                    }
                }

                if (incount <= 0) {
                    return false;
                }
            }

            return true;
        }
    }
}