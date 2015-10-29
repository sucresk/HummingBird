module Egret3D {
    export class PixelShader extends GLSL.ShaderBase {
       
        constructor(materialData: MaterialData, usage: MethodUsageData) {
            super(materialData, usage);
            this.useage = usage;
            this.materialData = materialData;
        }

        public addMethod(method: MethodBase) {
            this.stateChange = true;
            this.useage.fsMethodList.push(method);
        }

        public addEffectMethod(method: EffectMethod) {
            this.stateChange = true;
            this.useage.effectMethodList.push(method);
        }

        public getShaderSource(): string {
            var shaderSource: string = super.getShaderSource();
            var index: number = shaderSource.lastIndexOf("}");
            var endS: string = shaderSource.substr(index, shaderSource.length - index);

            shaderSource = shaderSource.substr(0, index);
            shaderSource += "   gl_FragColor = diffuse;\r\n";
            shaderSource += endS;
            return shaderSource ;
        }

        public build() {
            this.stateChange = false;
            for (this.index = 0; this.index < this.useage.fsMethodList.length; this.index++) {
                this.useage.fsMethodList[this.index].setMaterialData(this.materialData, this.useage);
            }
            this.stateChange = false;
            for (this.index = 0; this.index < this.useage.effectMethodList.length; this.index++) {
                this.useage.effectMethodList[this.index].setMaterialData(this.materialData, this.useage);
            }
        }
       
    }
}  