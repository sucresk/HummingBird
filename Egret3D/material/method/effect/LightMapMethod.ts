module Egret3D {
    export class LightMapMethod extends EffectMethod {

        private texture: TextureBase; 
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "lightMap_fragment";
            this.lightTexture = texture; 
        }

        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;

            if (this.texture)
                this.materialData.lightMapTex = this.texture;
            else
                this.materialData.lightMapTex = CheckerboardTexture.texture;
        }

        public set lightTexture(texture: TextureBase) {
            this.texture = texture; 
            if (texture) {
                if (this.materialData) {
                    this.materialData.lightMapTex = texture;
                    this.materialData.textureChange = true;
                }
            }
        }

        public activateEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            this.context3D = context3D;
            //usage["uniform_globalFog"] = context3D.getUniformLocation(usage.program3D, "uniform_globalFog");
        }

        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
           // context3D.gl.uniform1fv(usage["uniform_globalFog"], this._data);
        }

        public dispose() {
        }
    }
} 