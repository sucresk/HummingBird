module BlackSwan {
    export class SubGeomtry extends GeomtryBase {

        constructor() {
            super();
        }

        public setGeomtryData(indexData: Array<number>, vertexData: Array<number>) {
            this.indexData = indexData;
            this.verticesData = vertexData;
            this.numItems = indexData.length;
        }

        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }

        public updata(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }
    }
} 