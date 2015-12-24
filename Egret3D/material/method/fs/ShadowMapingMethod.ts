
module Egret3D {

     /**
     * @class Egret3D.ShadowMapingMethod
     * @classdesc
     * 阴影映射
     */
    export class ShadowMapingMethod extends MethodBase {
        /**
         * @language zh_CN
         * 偏移值
         */
        public bias: number = 0.002; 
        /**
         * @language zh_CN
         * 阴影颜色红色通道值
         */
        public shdowColorR: number = 0.0; 
        /**
         * @language zh_CN
         * 阴影颜色绿色通道值
         */
        public shdowColorG: number = 0.0; 
        /**
         * @language zh_CN
         * 阴影颜色蓝色通道值
         */
        public shdowColorB: number = 0.0 ; 
        private weightUniformIndex: any; 


        /**
         * @language zh_CN
         */
        constructor() {
            super();
            this.vsMethodName = "ShadowMapping_vertex";
            this.fsMethodName = "shadowmapping_fragment";
        }

        /**
         * @language zh_CN
         * 设置材质信息
         * @param materialData 
         * @param usage 
         */
        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;
            this.materialData.shadowMapTex = ShadowRender.frameBuffer.texture;
        }

        /**
         * @language zh_CN
         * 激活
         * @param context3D 
         * @param program3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation  ) {
            super.activate(context3D, program3D, modeltransform, camera3D,geometry, animation);
            program3D["shadowParameterUniformIndex"] = context3D.getUniformLocation(program3D, "shadowParameter" );
        }

        /**
         * @language zh_CN
         * 更新
         * @param context3D 
         * @param program3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation ) {
            context3D.uniform4f(program3D["shadowParameterUniformIndex"], this.shdowColorR, this.shdowColorG, this.shdowColorB, this.bias);
        }

    }
} 