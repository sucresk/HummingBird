module BlackSwan {
    export class VertexShader extends GLSL.ShaderBase {

        constructor( materialData: MaterialData, usage: MethodUsageData, passType: PassType) {
            super(materialData, usage, passType );
   
        }

        public build(geometry:GeomtryBase ) {
            var baseMethod: MethodBase;
           
            //根据 geomtry 类型 确定用什么 基本的 顶点着色器
            //拿到 顶点method list
            switch (geometry.geomtryType) {
                case GeomtryType.Static:
                    baseMethod = new StaticVertexMethod();
                    this.useage.vsMethodList.push(baseMethod);
                    this.addShader(baseMethod.vertexMethodName);
                    if (this.passType == PassType.Diffuse) {
                        baseMethod.acceptShadow = this.materialData.acceptShadow;
                    }
                    if (this.passType == PassType.Shadow) {
                        baseMethod.acceptShadow = false;
                        this.addShader("Shadow_vertex_static");
                    }
                    break;
                case GeomtryType.Skin:
                    baseMethod = new SkinVertexMethod();
                    this.useage.vsMethodList.push(baseMethod);
                    this.addShader(baseMethod.vertexMethodName);
                    baseMethod.acceptShadow = this.materialData.acceptShadow;
                    if (this.passType == PassType.Shadow) {
                        baseMethod.acceptShadow = false;
                        this.addShader("Shadow_vertex_static");
                    }
                    break;
                case GeomtryType.Particle:
                    break;
                default: break;
            }

            for (this.index = 0; this.index < this.useage.vsMethodList.length; this.index++){
                this.useage.vsMethodList[this.index].setMaterialData(this.materialData, this.useage);
            }
        }

        public addMethod(method: MethodBase) {
            this.stateChange = true;
            this.useage.vsMethodList.push(method);
        }

    }


} 