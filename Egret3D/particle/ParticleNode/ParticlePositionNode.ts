module Egret3D {
    export class ParticlePositionNode extends AnimNodeBase {

        public value: Value = new Value(null);

        constructor() {
            super();
            //this.vertexShader = "particle_offset";
            //this.usageAttribute = "attribute_offset";
            this.offset = 4; 
            this.usageAttributeLen = 0;
        }

        public fillGeometryData(source: GeometryBase): void {
            var singleGeometryVerticeNumber: number = source.numberOfVertices / source.geometryNum; 
            var position: Vector3D;
            this.value.calculation(source.numberOfVertices);
            for (var i: number = 0; i < source.geometryNum; i++) {
                position = this.value.getData(i);
                for (var j: number = 0; j < singleGeometryVerticeNumber; j++) {
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 0] = position.x ;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 1] = position.y ;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 2] = position.z ;
                }
            }
        }
    }
}