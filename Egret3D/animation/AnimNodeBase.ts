module Egret3D {
    
    export class AnimNodeBase {
        public vertexShader: string; 
        public fragmentShader: string; 
        public usageAttribute: string;
        public usageAttributeLen: number;

        public uniformIndex: any; 
        public offsetBytes: number;
        public offset: number;

        public fillGeomtryData( geometry:GeometryBase ): void {
        }
    }
} 