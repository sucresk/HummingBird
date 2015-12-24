module Egret3D {
     /**
     * @class Egret3D.EnvironmentMappingMethod
     * @classdesc
     * 环境贴图方法
     */
    export class EnvironmentMappingMethod extends EffectMethod {

        private texture: TextureBase; 

        private reflectValue: number = 1.0;
        /**
         * @language zh_CN
         * @param texture 
         */
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "EnvironmentMapping_fragment";
            this.lightTexture = texture; 
        }

        /**
         * @language zh_CN
         * @param value 
         */
        public set reflect(value: number) {
            this.reflectValue = value; 
        }

        /**
         * 
         * @returns number
         */
        public get reflect(): number {
            return this.reflectValue;
        }

        /**
         * @language zh_CN
         * @param materialData 
         * @param usage 
         */
        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;

            if (this.texture)
                this.materialData.environmentMapTex = this.texture;
            else
                this.materialData.environmentMapTex = CheckerboardTexture.texture;
        }

        /**
         * @language zh_CN
         * @param texture 
         */
        public set lightTexture(texture: TextureBase) {
            this.texture = texture; 
            if (texture) {
                if (this.materialData) {
                    this.materialData.environmentMapTex = texture;
                    this.materialData.textureChange = true;
                }
            }
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param usage 
         * @param materialData 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public activateEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            this.context3D = context3D;
            usage["reflectValue"] = context3D.getUniformLocation(usage.program3D, "reflectValue");
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param usage 
         * @param materialData 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            context3D.gl.uniform1f(usage["reflectValue"], this.reflectValue );
        }

        /**
         * @language zh_CN
         */
        public dispose() {
        }
    }
} 