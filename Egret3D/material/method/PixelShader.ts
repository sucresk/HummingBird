module Egret3D {

     /**
     * @class Egret3D.PixelShader
     * @classdesc
     * 像素着色器
     */
    export class PixelShader extends GLSL.ShaderBase {
       
        /**
         * @language zh_CN
         * @param materialData 
         * @param usage 
         */
        constructor(materialData: MaterialData, usage: MethodUsageData) {
            super(materialData, usage);
            this.useage = usage;
            this.materialData = materialData;
        }

        /**
         * @language zh_CN
         * @param method 
         */
        public addMethod(method: MethodBase) {
            this.stateChange = true;
            this.useage.fsMethodList.push(method);
        }

        /**
         * @language zh_CN
         * @param method 
         */
        public addEffectMethod(method: EffectMethod) {
            this.stateChange = true;
            this.useage.effectMethodList.push(method);
        }

        /**
         * @language zh_CN
         */
        public getShaderSource(): string {
            var shaderSource: string = super.getShaderSource();
            var index: number = shaderSource.lastIndexOf("}");
            var endS: string = shaderSource.substr(index, shaderSource.length - index);

            shaderSource = shaderSource.substr(0, index);
            shaderSource += "   gl_FragColor = diffuse;\r\n";
            shaderSource += endS;
            return shaderSource ;
        }

        /**
         * @language zh_CN
         */
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