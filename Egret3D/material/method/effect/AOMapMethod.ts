module Egret3D {
    /**
     * @class Egret3D.AOMapMethod
     * @classdesc
     * AO贴图方法
     */
    export class AOMapMethod extends EffectMethod {

        private texture: TextureBase;
        /**
         * @language zh_CN
         * @param texture 
         */
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "AOMap_fragment";
            this.lightTexture = texture;
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
                this.materialData.aoMapTex = this.texture;
            else
                this.materialData.aoMapTex = CheckerboardTexture.texture;
        }

        /**
         * @language zh_CN
         * @param texture 
         */
        public set lightTexture(texture: TextureBase) {
            this.texture = texture;
            if (texture) {
                if (this.materialData) {
                    this.materialData.aoMapTex = texture;
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
        }

        /**
         * @language zh_CN
         */
        public dispose() {
        }
    }
} 