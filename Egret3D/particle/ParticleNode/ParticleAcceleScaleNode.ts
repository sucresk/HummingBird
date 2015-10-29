module Egret3D {
    export class ParticleAcceleScaleNode extends AnimNodeBase {

        private _acceleScale: Vector3D = new Vector3D();

        constructor() {
            super();
            this.vertexShader = "particle_acceleScale";
            this.usageAttribute = "attribute_acceleScale";
            this.usageAttributeLen = 3;
        }

        public set acceleScale(value: number) {
            this._acceleScale.x =
            this._acceleScale.y =
            this._acceleScale.z = value;
        }

        public fillGeometryData(source: GeometryBase): void {

            var singleGeometryVerticeNumber: number = source.numberOfVertices / source.geometryNum;
            for (var i: number = 0; i < source.geometryNum; i++) {
                for (var j: number = 0; j < singleGeometryVerticeNumber; j++) {
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 0] = this._acceleScale.x;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 1] = this._acceleScale.y;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 2] = this._acceleScale.z;
                }
            }
        }
    }
} 