module Egret3D {
    export class ParticleRotateNode extends AnimNodeBase {
        public value: Value = new Value(null);
        constructor() {
            super();
            this.vertexShader = "particle_rotate";
            this.usageAttribute = "attribute_rotate";
            this.usageAttributeLen = 3;
        }

        public fillGeometryData(source: GeomtryBase): void {
            var singleGeometryVerticeNumber: number = source.numberOfVertices / source.geometryNum;
            var position: Vector3D;
            this.value.calculation(source.numberOfVertices);

            for (var i: number = 0; i < source.geometryNum; i++) {
                position = this.value.getData(i);

                position.x = position.x * Matrix3DUtils.DEGREES_TO_RADIANS;
                position.y = position.y * Matrix3DUtils.DEGREES_TO_RADIANS;
                position.z = position.z * Matrix3DUtils.DEGREES_TO_RADIANS;

                for (var j: number = 0; j < singleGeometryVerticeNumber; j++) {
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 0] = position.x;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 1] = position.y;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 2] = position.z;
                }
            }
        }
    }
}