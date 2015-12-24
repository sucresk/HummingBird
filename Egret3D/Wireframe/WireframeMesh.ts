module Egret3D {

    /**
     * @class Egret3D.WriframeMesh
     * @classdesc
     * 模型线框网格 以线框形式渲染模型
     */   
    export class WireframeMesh extends WireframeBase {
                                
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            super("wireframe_vertex", "wireframe_fragment");
        }

        public creatByMesh(mesh: Mesh) {
            this.createFromGeometry(mesh.geometry);
            mesh.bindWireframe( this );
        }
        
        /**
        * @language zh_CN
        * 根据geometry创建一个线框
        * @param geometry 模型数据
        */
        public createFromGeometry(geometry: GeometryBase) {
            this.vertexData = [];
            this.vertexCount = 0;
            var pos_0: Vector3D = new Vector3D();
            var pos_1: Vector3D = new Vector3D();
            var pos_2: Vector3D = new Vector3D();
            for (var i: number = 0; i < geometry.indexData.length / 3; ++i) {
                var index_0: number = geometry.indexData[i * 3 + 0];
                var index_1: number = geometry.indexData[i * 3 + 1];
                var index_2: number = geometry.indexData[i * 3 + 2];

                pos_0.x = geometry.verticesData[index_0 * geometry.vertexAttLength];
                pos_0.y = geometry.verticesData[index_0 * geometry.vertexAttLength + 1];
                pos_0.z = geometry.verticesData[index_0 * geometry.vertexAttLength + 2];

                pos_1.x = geometry.verticesData[index_1 * geometry.vertexAttLength];
                pos_1.y = geometry.verticesData[index_1 * geometry.vertexAttLength + 1];
                pos_1.z = geometry.verticesData[index_1 * geometry.vertexAttLength + 2];

                pos_2.x = geometry.verticesData[index_2 * geometry.vertexAttLength];
                pos_2.y = geometry.verticesData[index_2 * geometry.vertexAttLength + 1];
                pos_2.z = geometry.verticesData[index_2 * geometry.vertexAttLength + 2];

                this.vertexData.push(
                    pos_0.x, pos_0.y, pos_0.z,
                    pos_1.x, pos_1.y, pos_1.z,

                    pos_1.x, pos_1.y, pos_1.z,
                    pos_2.x, pos_2.y, pos_2.z,

                    pos_2.x, pos_2.y, pos_2.z,
                    pos_0.x, pos_0.y, pos_0.z
                );
                this.vertexCount += 6;
            }
        }
    }
}