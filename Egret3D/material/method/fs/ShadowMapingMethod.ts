
module Egret3D {
    export class ShadowMapingMethod extends MethodBase {

        constructor() {
            super();
            this.vsMethodName = "ShadowMapping_vertex";
            this.fsMethodName = "shadowmapping_fragment";
        }

        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;
            this.materialData.shadowMapTex = ShadowRender.frameBuffer.texture;
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation  ) {
            super.activate(context3D, program3D, modeltransform, camera3D,geometry, animation);
            //this.usage.shadowMapTex.uniformIndex = context3D.getUniformLocation(program3D, this.usage.shadowMapTex.name);
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation ) {
            //this.materialData.shadowMapTex = RttManager.getInstance().shadowFrameBuffer;
         //   if (this.materialData.shadowMapTex)
           //     context3D.setTexture2DAt(ContextSamplerType.TEXTURE_7, 7, this.usage.shadowMapTex.uniformIndex, this.materialData.shadowMapTex);
           // context3D.setTexture2DSamplerState(Egret3D.NEAREST, Egret3D.NEAREST, Egret3D.REPEAT, Egret3D.REPEAT);
        }

    }
} 