module Egret3D {

    /**
     * @language zh_CN
     * @class Egret3D.AnimaNodeCollection
     * @classdesc
     * 动画节点容器
     */
    export class AnimaNodeCollection {

        /**
        * @language zh_CN
        * 动画节点容器
        */
        public nodes: Array<AnimNodeBase> = new Array<AnimNodeBase>();

        /**
        * @language zh_CN
        * 顶点数
        */
        public numberOfVertices: number;

        /**
        * @language zh_CN
        * 顶点字节大小
        */
        public vertexSizeInBytes: number;

        private _nodeData: Float32Array;

        private _vertexAttributes: Object = {};

        /**
        * @language zh_CN
        * 构造函数
        */
        constructor() {
            this.nodes = new Array<AnimNodeBase>();
        }

        /**
        * @language zh_CN
        * 添加节点
        * @param node 节点对象
        */
        public addNode(node: AnimNodeBase) {
            this.nodes.push(node);
        }

        /**
        * @language zh_CN
        * 移除节点
        * @param node 节点对象
        */
        public removeNode(node: AnimNodeBase) {
            var index: number = this.nodes.indexOf(node);
            if (index != -1)
                this.nodes.splice(index, 1);
        }

        /**
        * @language zh_CN
        * 获取节点容器
        * @return 节点容器
        */
        public getNodes(): Array<AnimNodeBase> {
            return this.nodes;
        }

        /**
        * @language zh_CN
        * 获取节点顶点Shader
        * @return 顶点Shader容器
        */
        public getNodesVertexShaders(): Array<string> {
            var shaderNames: string[] = [];
            for (var i: number = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].vertexShader != "" && this.nodes[i].vertexShader != undefined && this.nodes[i].vertexShader != null)
                    shaderNames.push(this.nodes[i].vertexShader);
            }
            return shaderNames;
        }

        /**
        * @language zh_CN
        * 获取节点片元Shader
        * @return 片元Shader容器
        */
        public getNodesFragmentShaders(): Array<string> {
            var shaderNames: string[] = [];
            for (var i: number = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].fragmentShader != "" && this.nodes[i].fragmentShader != undefined && this.nodes[i].fragmentShader != null)
                    shaderNames.push(this.nodes[i].fragmentShader);
            }
            return shaderNames;
        }

        /**
        * @language zh_CN
        * 计算节点
        */
        public calculateNode() {
            ///init data to updata gpu
            ///this.vertexInfos = this.vertexInfos || new Array<VertexInfo>();
            ///this.vertexInfos.length = 0; 
            var offset: number = 4 + 3 + 2;
            for (var i: number = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].usageAttributeLen > 0) {
                    this.nodes[i].offset = offset;
                    this.nodes[i].offsetBytes = offset * Float32Array.BYTES_PER_ELEMENT;
                    offset += this.nodes[i].usageAttributeLen;
                }
            }

            this.numberOfVertices = offset;
            this.vertexSizeInBytes = offset * Float32Array.BYTES_PER_ELEMENT;
        }
    }
}