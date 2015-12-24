module Egret3D {

    /**
     * @language zh_CN
     * @class Egret3D.AnimNodeBase
     * @classdesc
     * 动画节点基类
     */
    export class AnimNodeBase {

        /**
        * @language zh_CN
        * 顶点Shader
        */
        public vertexShader: string; 

        /**
        * @language zh_CN
        * 片元Shader
        */
        public fragmentShader: string; 

        /**
        * @language zh_CN
        * 使用的属性
        */
        public usageAttribute: string;

        /**
        * @language zh_CN
        * 属性长度
        */
        public usageAttributeLen: number;

        /**
        * @language zh_CN
        * uniform索引
        */
        public uniformIndex: any; 

        /**
        * @language zh_CN
        * 偏移字节数
        */
        public offsetBytes: number;

        /**
        * @language zh_CN
        * 偏移量
        */
        public offset: number;

        /**
        * @language zh_CN
        * 填充GeomtryData
        * @param geometry: Geometry对象
        */
        public fillGeomtryData(geometry: GeometryBase): void {
        }
    }
}
