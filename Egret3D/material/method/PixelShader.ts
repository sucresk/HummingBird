module BlackSwan {
    export class PixelShader extends GLSL.ShaderBase {
       
        constructor() {
            super();
        }

        public setUsage(usage: MethodUsageData) {
            this.useage = usage;
            //if (this.skyLight)
            //    shaderList.push("skyLightShader");
            //if (this.directLightNumber > 0)
            //    shaderList.push("directLight");
            //if (this.pointLightNumber > 0)
            //    shaderList.push("pointLight");
            //根据 geomtry 类型 确定用什么 基本的 顶点着色器
            //拿到 顶点method list
            var shaderNameList: Array<string> = new Array<string>();

            for (this.index = 0; this.index < this.useage.fsMethodList.length; this.index++) {
                var shaderName: string = this.useage.fsMethodList[this.index].getMethodName(usage);
                shaderNameList.push(shaderName);
            }

            this.getShader(shaderNameList);

        }
       
    }
}  