module Egret3D {

    export class AnimaNodeCollection {
        public nodes: Array<AnimNodeBase> = new Array<AnimNodeBase>(); 
        private _nodeData: Float32Array; 
        private _vertexAttributes: Object = {};

        public numberOfVertices: number;
        public vertexSizeInBytes: number;
        constructor() {
            this.nodes = new Array<AnimNodeBase>() ; 
        }

        public addNode(node: AnimNodeBase) {
            this.nodes.push( node );
        }

        public removeNode(node: AnimNodeBase ) {
            var index: number = this.nodes.indexOf(node);
            if (index != -1)
                this.nodes.splice(index, 1);
        }

        public getNodes(): Array<AnimNodeBase> {
            return this.nodes;
        }

        public getNodesVertexShaders(): Array<string> {
            var shaderNames: string[] = [];
            for (var i: number = 0; i < this.nodes.length; i++){
                if (this.nodes[i].vertexShader != "" && this.nodes[i].vertexShader != undefined && this.nodes[i].vertexShader != null )
                    shaderNames.push(this.nodes[i].vertexShader);
            }
            return shaderNames; 
        }

        public getNodesFragmentShaders(): Array<string> {
            var shaderNames: string[] = [];
            for (var i: number = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].fragmentShader != "" && this.nodes[i].fragmentShader != undefined && this.nodes[i].fragmentShader != null)
                    shaderNames.push(this.nodes[i].fragmentShader);
            }
            return shaderNames; 
        }

        public calculateNode() {
            ///init data to updata gpu
            ///this.vertexInfos = this.vertexInfos || new Array<VertexInfo>();
            ///this.vertexInfos.length = 0; 
            var offset: number = 4 + 3 + 2 ; 
            for (var i: number = 0; i < this.nodes.length; i++){
                if (this.nodes[i].usageAttributeLen>0){
                    this.nodes[i].offset = offset;
                    this.nodes[i].offsetBytes = offset * Float32Array.BYTES_PER_ELEMENT;
                    offset += this.nodes[i].usageAttributeLen; 
                }
            }
        
            this.numberOfVertices = offset;
            this.vertexSizeInBytes = offset * Float32Array.BYTES_PER_ELEMENT ;
        }
    }
} 