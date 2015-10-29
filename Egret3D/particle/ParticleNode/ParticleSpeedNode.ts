module Egret3D {
    export class ParticleSpeedNode extends AnimNodeBase {

        public valueX: Value = new Value(null);
        public valueY: Value = new Value(null);
        public valueZ: Value = new Value(null);


        constructor() {
            super();
            this.vertexShader = "particle_speed";
            this.usageAttribute = "attribute_speed";
            this.usageAttributeLen = 3;
        }

        public setX(valueType: ValueType, ...value) {
            this.valueX.data.parameters = value;
            this.valueX.data.valueType = valueType;
        }

        public setY(valueType: ValueType, ...value) {
            this.valueY.data.parameters = value;
            this.valueY.data.valueType = valueType;
        }

        public setZ(valueType: ValueType, ...value) {
            this.valueZ.data.parameters = value;
            this.valueZ.data.valueType = valueType;
        }

        public fillGeometryData(source: GeometryBase): void {
            var singleGeometryVerticeNumber: number = source.numberOfVertices / source.geometryNum;
            var position: Vector3D = new Vector3D();
            this.valueX.calculation(source.numberOfVertices);
            this.valueY.calculation(source.numberOfVertices);
            this.valueZ.calculation(source.numberOfVertices);

            for (var i: number = 0; i < source.geometryNum; i++) {
                position.x = this.valueX.getData(i).x;
                position.y = this.valueY.getData(i).x;
                position.z = this.valueZ.getData(i).x;
                for (var j: number = 0; j < singleGeometryVerticeNumber; j++) {
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 0] = position.x;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 1] = position.y;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 2] = position.z;
                }
            }
        }
    }
}