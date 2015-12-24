module Egret3D {
    export enum GeometryType {
        Static, Skin, Particle, Billbord, VertexAnim, Grass, Ribbon, wrieFrame ,
        Shadow
    }
    /**
     * @language zh_CN
     * @class Egret3D.GeometryBase
     * @classdesc
     * GeometryBase类 表示几何形状基类
     */
    export class GeometryBase {

        /**
        * @language zh_CN
        * 网格类型
        */
        public geomtryType: number = 0;

        /**
        * @language zh_CN
        * 顶点属性长度
        */
        public vertexAttLength: number = 17;

        /**
        * @language zh_CN
        * 顶点数据
        */
        public verticesData: Array<number>;
        /**
        * @language zh_CN
        * 索引数据
        */
        public indexData: Array<number>;

        /**
        * @language zh_CN
        * 
        */
        public numberOfVertices: number;
        /**
        * @language zh_CN
        * 顶点字节数
        */
        public vertexSizeInBytes: number;
        /**
        * @language zh_CN
        * 
        */
        public geometryNum: number;

        /**
        * @language zh_CN
        * 顶点坐标大小
        */
        public positionSize: number = 3;
        /**
        * @language zh_CN
        * 顶点法线大小
        */
        public normalSize: number = 3;
        /**
        * @language zh_CN
        * 顶点切线大小
        */
        public tangentSize: number = 3;
        /**
        * @language zh_CN
        * 顶点色大小
        */
        public colorSize: number = 4;
        /**
        * @language zh_CN
        * 顶点uv大小
        */
        public uvSize: number = 2;
        /**
        * @language zh_CN
        * 顶点uv2大小
        */
        public uv2Size: number = 2;
        /**
        * @language zh_CN
        * 
        */
        public numItems: number = 0;

        /**
        * @language zh_CN
        * shader buffer
        */
        public sharedVertexBuffer: VertexBuffer3D;
        /**
        * @language zh_CN
        * shader index
        */
        public sharedIndexBuffer: IndexBuffer3D;

        /**
        * @language zh_CN
        * 包围盒min pos
        */
        public minPos: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 包围盒max pos
        */
        public maxPos: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 漫反射贴图名
        */
        public textureFile: string = "";
        /**
        * @language zh_CN
        * 高光贴图名
        */
        public textureSpecular: string = "";
        /**
        * @language zh_CN
        * 法线贴图名
        */
        public textureBump: string = "";
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {

        }

        /**
        * @language zh_CN
        * 生成网格
        */
        public buildGeomtry() {

        }
         
        /**
        * @language zh_CN
        * 数据更新
        * @param time 当前时间
        * @param delay 每帧间隔时间
        */
        public updata(time:number,delay:number) {
        }

        /**
        * @language zh_CN
        * 生成包围盒
        */
        public buildBoundBox() {

            this.minPos.copyFrom(new Vector3D(99999.0, 99999.0, 99999.0));
            this.maxPos.copyFrom(new Vector3D(-99999.0, -99999.0, -99999.0));
            for (var i: number = 0; i < this.verticesData.length; i += this.vertexAttLength) {
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
        }

        private rotationQ: Quaternion;

        /**
        * @language zh_CN
        * 转旋网格的每个顶点
        * @param euler 转旋欧拉角
        */
        public rotationGeomtry(euler:Vector3D) {
            this.rotationQ = new Quaternion();
            this.rotationQ.fromEulerAngles(euler.x * Matrix3DUtils.RADIANS_TO_DEGREES, euler.y * Matrix3DUtils.RADIANS_TO_DEGREES, euler.z * Matrix3DUtils.RADIANS_TO_DEGREES);
            var pos: Vector3D = new Vector3D();
            for (var i: number = 0; i < this.verticesData.length / this.vertexAttLength; i++){
                pos.x = this.verticesData[this.vertexAttLength * i + 0];
                pos.y = this.verticesData[this.vertexAttLength * i + 1];
                pos.z = this.verticesData[this.vertexAttLength * i + 2];

                this.rotationQ.rotatePoint(pos, pos);
                this.verticesData[this.vertexAttLength * i + 0] = pos.x; 
                this.verticesData[this.vertexAttLength * i + 1] = pos.y; 
                this.verticesData[this.vertexAttLength * i + 2] = pos.z; 
            }
        }
    }
} 