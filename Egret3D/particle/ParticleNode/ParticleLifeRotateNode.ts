module Egret3D {
    export class ParticleLifeRotateNode extends AnimNodeBase {

        public rotate: Vector3D = new Vector3D();

        constructor() {
            super();
            this.vertexShader = "particle_lifeRotate";
            this.usageAttribute = "attribute_lifeRotate";
            this.usageAttributeLen = 3;
        }

        public fillGeometryData(source: GeometryBase): void {

            var x: number = this.rotate.x * Matrix3DUtils.DEGREES_TO_RADIANS;
            var y: number = this.rotate.y * Matrix3DUtils.DEGREES_TO_RADIANS;
            var z: number = this.rotate.z * Matrix3DUtils.DEGREES_TO_RADIANS;

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