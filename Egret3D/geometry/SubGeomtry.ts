module Egret3D {
    export class SubGeomtry extends GeomtryBase {

        constructor() {
            super();
        }

        public setGeomtryData(indexData: Array<number>, vertexData: Array<number>) {
            this.indexData = indexData;
            this.verticesData = vertexData;
            this.numItems = indexData.length;
        }

    }
} 