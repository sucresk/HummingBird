module BlackSwan {
    export class PixelShader extends GLSL.ShaderBase {
       
        constructor(materialData: MaterialData, usage: MethodUsageData, passType: PassType) {
            super(materialData, usage, passType);
            this.useage = usage;
            this.materialData = materialData;
        }

        public addMethod(method: MethodBase) {
            this.stateChange = true;
            this.useage.fsMethodList.push(method);
        }

        public build() {
            this.stateChange = false;
            for (this.index = 0; this.index < this.useage.fsMethodList.length; this.index++) {
                this.useage.fsMethodList[this.index].setMaterialData(this.materialData, this.useage);
            }
        }
       
    }
}  