module Egret3D {

     /**
     * @class Egret3D.LightMapMethod
     * @classdesc
     * 光照贴图方法
     */
    export class LightMapMethod extends EffectMethod {

        private texture: TextureBase; 
        /**
         * @language zh_CN
         * @param texture 
         */
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "lightMap_fragment";
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
                this.materialData.lightMapTex = this.texture;
            else
                this.materialData.lightMapTex = CheckerboardTexture.texture;
        }

        /**
         * @language zh_CN
         * @param texture 
         */
        public set lightTexture(texture: TextureBase) {
            this.texture = texture; 
            if (texture) {
                if (this.materialData) {
                    this.materialData.lightMapTex = texture;
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
            //usage["uniform_globalFog"] = context3D.getUniformLocation(usage.program3D, "uniform_globalFog");
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
           // context3D.gl.uniform1fv(usage["uniform_globalFog"], this._data);
        }

        /**
         * @language zh_CN
         */
        public dispose() {
        }
    }
} 