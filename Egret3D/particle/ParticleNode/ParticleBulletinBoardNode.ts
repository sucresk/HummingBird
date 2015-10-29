module Egret3D {
    export class ParticleBulletinBoardNode extends AnimNodeBase {

        public enableX: boolean = true;
        public enableY: boolean = true;
        public enableZ: boolean = true;

        constructor() {
            super();
            this.vertexShader = "particle_billboard";
            this.usageAttribute = "attribute_billboardXYZ";
            this.usageAttributeLen = 1;
        }

        public fillGeometryData(source: GeometryBase): void {

            var f: number = (this.enableX ? 1 : 0) + (this.enableY ? 10 : 0) + (this.enableZ ? 100 : 0)

            var singleGeometryVerticeNumber: number = source.numberOfVertices / source.geometryNum;
            for (var i: number = 0; i < source.geometryNum; i++) {
                for (var j: number = 0; j < singleGeometryVerticeNumber; j++) {
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 0] = f;
                }
            }
        }
    }
}