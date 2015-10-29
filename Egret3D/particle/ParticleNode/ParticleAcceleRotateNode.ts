module Egret3D {
    export class ParticleAcceleRotateNode extends AnimNodeBase {

        public acceleRotate: Vector3D = new Vector3D();

        constructor() {
            super();
            this.vertexShader = "particle_acceleRotate";
            this.usageAttribute = "attribute_acceleRotate";
            this.usageAttributeLen = 3;
        }

        public fillGeometryData(source: GeometryBase): void {

            var x: number = this.acceleRotate.x * Matrix3DUtils.DEGREES_TO_RADIANS;
            var y: number = this.acceleRotate.y * Matrix3DUtils.DEGREES_TO_RADIANS;
            var z: number = this.acceleRotate.z * Matrix3DUtils.DEGREES_TO_RADIANS;

            var singleGeometryVerticeNumber: number = source.numberOfVertices / source.geometryNum;
            for (var i: number = 0; i < source.geometryNum; i++) {
                for (var j: number = 0; j < singleGeometryVerticeNumber; j++) {
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 0] = x;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 1] = y;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 2] = z;
                }
            }
        }
    }
}