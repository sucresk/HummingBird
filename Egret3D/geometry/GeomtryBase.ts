module Egret3D {
    export enum GeomtryType {
        Static, Skin, Particle, Billbord, VertexAnim, Grass, Ribbon, wrieFrame ,
        Shadow
    }

    export class GeomtryBase {

        public geomtryType: number = 0;

        public vertexAttLength: number = 17;

        public verticesData: Array<number>;
        public indexData: Array<number>;

        public numberOfVertices: number;
        public vertexSizeInBytes: number;
        public geometryNum: number;

        public posAtt: number = -1;
        public normalAtt: number = - 1;
        public tangentAtt: number = - 1;
        public vertexColorAtt: number = -1;
        public uvAtt: number = -1;
        public uv2Att: number = -1;

        public positionSize: number = 3;
        public normalSize: number = 3;
        public tangentSize: number = 3;
        public colorSize: number = 4;
        public uvSize: number = 2;
        public uv2Size: number = 2;
        public numItems: number = 0;

        public sharedVertexBuffer: VertexBuffer3D;
        public sharedIndexBuffer: IndexBuffer3D;

        public minPos: Vector3D = new Vector3D();
        public maxPos: Vector3D = new Vector3D();

        public textureFile: string = "";
        public textureSpecular: string = "";
        public textureBump: string = "";

        constructor() {

        }

        public buildGeomtry() {

        }

        //public setGeomtryData(indexData: Array<number>, vertexData: Array<number>) {
        //    this.indexData = indexData;
        //    this.verticesData = vertexData;
        //    this.numItems = indexData.length;
        //}

        //public activate(context3D:Context3D , modeltransform:Matrix4_4 ,camera3D: Camera3D) {
        //}
         
        public updata(time:number,delay:number) {
        }

        public buildBoundBox(offset: number) {

            this.minPos.copyFrom(new Vector3D(99999.0, 99999.0, 99999.0));
            this.maxPos.copyFrom(new Vector3D(-99999.0, -99999.0, -99999.0));
            for (var i: number = 0; i < this.verticesData.length; i += offset) {
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
        public rotationGeomtry(euler:Vector3D) {
            this.rotationQ = new Quaternion();
            this.rotationQ.fromEulerAngles(euler.x, euler.y, euler.z);
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