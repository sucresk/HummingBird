module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.FaceData
     * @classdesc
     * FaceData类 表示索引数据
     */
    export class FaceData {

        /**
        * @language zh_CN
        * 顶点索引数据
        */
        public vertexIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * uv索引数据
        */
        public uvIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * uv2索引数据
        */
        public uv2Indices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 法线索引数据
        */
        public normalIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点色索引数据
        */
        public colorIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 
        */
        public indexIds: Array<any> = new Array<any>(); // used for real index lookups
    } 
}