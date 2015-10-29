module Egret3D {
    export class ParticleScaleNode extends AnimNodeBase {

        public value: Value = new Value(null);
        constructor() {
            super();
            this.vertexShader = "particle_scale";
            this.usageAttribute = "attribute_scale";
            this.usageAttributeLen = 3;
            this.value.data.parameters[2] = 0;
        }

        public set startScale(value: number){
            this.value.data.parameters[0] = value;
        }

        public set endScale(value: number) {
            this.value.data.parameters[1] = value;
        }

        public fillGeometryData(source: GeometryBase): void {
            var singleGeometryVerticeNumber: number = source.numberOfVertices / source.geometryNum;
            var val: Vector3D;
            this.value.calculation(source.numberOfVertices);
            for (var i: number = 0; i < source.geometryNum; i++) {
                val = this.value.getData(i);
                for (var j: number = 0; j < singleGeometryVerticeNumber; j++) {
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 0] = val.x;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 1] = val.y;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 2] = val.z;
                }
            }
        }
    }
}