module BlackSwan {
    export class ColorMethod extends MethodBase {

        constructor() {
            super();
            this.fsMethodName = "diffuseMethod_fragment";

        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeomtryBase, animation: IAnimation ) {
            super.activate(context3D, program3D, modeltransform, camera3D,geometry,animation);
            this.usage.uniform_materialSource.index = context3D.getUniformLocation(program3D, this.usage.uniform_materialSource.varName);

            if (this.materialData.useDiuufseMap) {
                this.usage.diffuseTexture.index = context3D.getUniformLocation(program3D, this.usage.diffuseTexture.varName);
                this.materialData.diffuseTex.upload(context3D);
            }
            if (this.materialData.useNormalMap) {
                this.usage.normalTexture.index = context3D.getUniformLocation(program3D, this.usage.normalTexture.varName);
                this.materialData.normalTex.upload(context3D);
            }
            if (this.materialData.useSpecularMap) {
                this.usage.specularTexture.index = context3D.getUniformLocation(program3D, this.usage.specularTexture.varName);
                this.materialData.specularTex.upload(context3D);
            }
            if (this.materialData.directLightList.length > 0) {
                this.usage.uniform_directLightSource.index = context3D.getUniformLocation(program3D, this.usage.uniform_directLightSource.varName);
            }
            if (this.materialData.sportLightList.length > 0) {
                this.usage.uniform_sportLightSource.index = context3D.getUniformLocation(program3D, this.usage.uniform_sportLightSource.varName);
            }
            if (this.materialData.pointLightList.length > 0) {
                this.usage.uniform_pointLightSource.index = context3D.getUniformLocation(program3D, this.usage.uniform_pointLightSource.varName);
            }
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeomtryBase, animation: IAnimation ) {

            if (this.materialData.materialDataNeedChange) {
                this.materialData.materialDataNeedChange = false;
                this.materialData.defaultPassUsageData.materialSourceData[0] = this.materialData.diffuseColor.x;
                this.materialData.defaultPassUsageData.materialSourceData[1] = this.materialData.diffuseColor.y;
                this.materialData.defaultPassUsageData.materialSourceData[2] = this.materialData.diffuseColor.z;

                this.materialData.defaultPassUsageData.materialSourceData[3] = this.materialData.ambientColor.x;
                this.materialData.defaultPassUsageData.materialSourceData[4] = this.materialData.ambientColor.y;
                this.materialData.defaultPassUsageData.materialSourceData[5] = this.materialData.ambientColor.z;

                this.materialData.defaultPassUsageData.materialSourceData[6] = this.materialData.specularColor.x;
                this.materialData.defaultPassUsageData.materialSourceData[7] = this.materialData.specularColor.y;
                this.materialData.defaultPassUsageData.materialSourceData[8] = this.materialData.specularColor.z;

                this.materialData.defaultPassUsageData.materialSourceData[9] = this.materialData.alpha;
                this.materialData.defaultPassUsageData.materialSourceData[10] = this.materialData.cutAlpha;
                this.materialData.defaultPassUsageData.materialSourceData[11] = this.materialData.shininess;
            }

            //context3D.uniform1fv(this.usage.uniform_materialSource.index, this.materialData.defaultPassUsageData.materialSourceData);
            context3D.gl.uniform1fv(this.usage.uniform_materialSource.index, this.materialData.defaultPassUsageData.materialSourceData);
            if (this.materialData.useDiuufseMap) {
                //this.materialData.diffuseTex.upload(context3D);
                context3D.setTexture2DAt(ContextSamplerType.TEXTURE_0, 0, this.usage.diffuseTexture.index, this.materialData.diffuseTex.texture)
                this.materialData.diffuseTex.upload(context3D);
                //context3D.gl.activeTexture(ContextSamplerType.TEXTURE_0);
                //context3D.gl.bindTexture(context3D.gl.TEXTURE_2D, this.materialData.diffuseTex.texture.gpu_texture2D);
                //context3D.gl.uniform1i(this.usage.diffuseTexture.index, 0);
               // context3D.setTexture2DSamplerState(Egret3D.NEAREST, Egret3D.NEAREST, Egret3D.REPEAT, Egret3D.REPEAT);
            }
            if (this.materialData.useNormalMap) {
                this.materialData.normalTex.upload(context3D);
                context3D.setTexture2DAt(ContextSamplerType.TEXTURE_1,1 , this.usage.normalTexture.index, this.materialData.normalTex.texture)
               // context3D.setTexture2DSamplerState(Egret3D.NEAREST_MIPMAP_NEAREST, Egret3D.NEAREST_MIPMAP_NEAREST, Egret3D.REPEAT, Egret3D.REPEAT);
            }
            if (this.materialData.useSpecularMap) {
                this.materialData.specularTex.upload(context3D);
                context3D.setTexture2DAt(ContextSamplerType.TEXTURE_2, 2, this.usage.specularTexture.index, this.materialData.specularTex.texture)
                //context3D.setTexture2DSamplerState(Egret3D.NEAREST_MIPMAP_NEAREST, Egret3D.NEAREST_MIPMAP_NEAREST, Egret3D.REPEAT, Egret3D.REPEAT);
            }
            if (this.materialData.directLightList.length > 0){
                //context3D.uniform1fv(this.usage.uniform_directLightSource.index,this.usage.directLightData
               context3D.gl.uniform1fv(this.usage.uniform_directLightSource.index, this.usage.directLightData);
            }
            if (this.materialData.sportLightList.length > 0){
               // context3D.uniform1fv(this.usage.uniform_sportLightSource.index, this.usage.sportLightData);
               context3D.gl.uniform1fv(this.usage.uniform_sportLightSource.index, this.usage.sportLightData);
            }
            if (this.materialData.pointLightList.length > 0){
               // context3D.uniform1fv(this.usage.uniform_pointLightSource.index, this.usage.pointLightData);
               context3D.gl.uniform1fv(this.usage.uniform_pointLightSource.index, this.usage.pointLightData);
            }
        }

        public dispose() {
        }
    }
}