module Egret3D {
    export class ParticleTimeNode extends AnimNodeBase {

        public startTimeValue: Value = new Value(null);
        public spaceTimeValue: Value = new Value(null);
        public lifeTimeValue: Value = new Value(null);
        public isLoop: boolean = true;

        private start: number  = 0 ;
        private space: number  = 0 ;
        private life: number   = 0 ;
        constructor() {
            super();
            this.vertexShader = "particle_time";
            this.usageAttribute = "attribute_time" ;
            this.usageAttributeLen = 4;
        }

        public setStartTime(valueType: ValueType, data: any) {
            //this.start = d;
            this.startTimeValue.data.parameters = data  ;
        }

        public setSpaceTime(valueType: ValueType, data: any) {
            //this.space = value;
            this.spaceTimeValue.data.parameters = data ;
        }

        public setLifeTime(valueType: ValueType, data: any) {
            //this.life = value; 
            this.lifeTimeValue.data.parameters = data;
        }

        public get startTime(): number {
            return this.start;
        }

        public get spaceTime(): number {
            return this.space;
        }

        public get lifeTime(): number {
            return this.life;
        }

        public fillGeometryData(source: GeometryBase): void {
            var singleGeometryVerticeNumber: number = source.numberOfVertices / source.geometryNum;
            var startVal: Vector3D;
            var spaceVal: Vector3D;
            var lifeVal: Vector3D;
            var compressValue: number = this.isLoop ? 1 : 0;
            this.startTimeValue.calculation(source.numberOfVertices);
            this.spaceTimeValue.calculation(source.numberOfVertices);
            this.lifeTimeValue.calculation(source.numberOfVertices);
            for (var i: number = 0; i < source.geometryNum; i++) {
                startVal = this.startTimeValue.getData(i);
                spaceVal = this.spaceTimeValue.getData(i);
                lifeVal = this.lifeTimeValue.getData(i);
                if (startVal.x > this.start)
                    this.start = startVal.x;
                if (spaceVal.x > this.space)
                    this.space = spaceVal.x;
                if (lifeVal.x > this.life)
                    this.life = lifeVal.x;
                for (var j: number = 0; j < singleGeometryVerticeNumber ; j++) {
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 0] = startVal.x;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 1] = spaceVal.x;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 2] = lifeVal.x;
                    source.verticesData[j * source.vertexAttLength + this.offset + i * singleGeometryVerticeNumber * source.vertexAttLength + 3] = compressValue;
                }
            }
        }
    }
} 