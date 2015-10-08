module BlackSwan {
    export class VertexShader extends GLSL.ShaderBase {

        constructor( ) {
            super();
        }

        public setUsage(usage: MethodUsageData) {
            this.useage = usage;
            //根据 geomtry 类型 确定用什么 基本的 顶点着色器
            //拿到 顶点method list
            var shaderNameList: Array<string> = new Array<string>() ;
            switch (usage.geomtryBase.geomtryType){
                case GeomtryType.Static:
                    var baseMethod: StaticVertexMethod = new StaticVertexMethod();
                    this.useage.vsMethodList.push(baseMethod);
                    break;
                case GeomtryType.Particle:
                    break;
                default: break;
            }

            for (this.index = 0; this.index < this.useage.vsMethodList.length; this.index++){
                var shaderName: string = this.useage.vsMethodList[this.index].getMethodName(usage);
                shaderNameList.push( shaderName );
            }

            this.getShader(shaderNameList);
        }

   
    }


} 