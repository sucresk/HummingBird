module Egret3D {
    
    /**
     * @class Egret3D.WireframeLine
     * @classdesc
     * 线渲染 
     */   
    export class WireframeLine extends WireframeBase {
                                
        /**
        * @language zh_CN
        * constructor
        * @param vs vs文件名
        * @param fs fs文件名
        */
        constructor(vs: string = "wireframe_vertex", fs: string = "wireframe_fragment") {
            super(vs, fs);
        }
                
        /**
        * @language zh_CN
        * 根据两个顶点创建一条线段
        * @param first 线段的起始点
        * @param second 线段的结束点
        */
        public createFromData(first: Vector3D, second: Vector3D) {
            this.vertexData = [];
            this.vertexCount = 0;
            this.vertexData.push(
                first.x, first.y, first.z,
                second.x, second.y, second.z
            );
            this.vertexCount = 2;
        }
    }
} 