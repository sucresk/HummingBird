module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.SubGeometry
     * @classdesc
     * SubGeometry类 
     */
    export class SubGeometry extends GeometryBase {
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            super();
        }

        /**
        * @language zh_CN
        * 设置网格数据
        * @param indexData 顶点
        * @param vertexData: 索引
        */
        public setGeomtryData(indexData: Array<number>, vertexData: Array<number>) {
            this.indexData = indexData;
            this.verticesData = vertexData;
            this.numItems = indexData.length;
        }

    }
} 