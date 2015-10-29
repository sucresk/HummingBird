module Egret3D {
    export class AOMapMethod extends EffectMethod {

        private texture: TextureBase;
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "AOMap_fragment";
            this.lightTexture = texture;
        }

        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;

            if (this.texture)
                this.materialData.aoMapTex = this.texture;
            else
                this.materialData.aoMapTex = CheckerboardTexture.texture;
        }

        public set lightTexture(texture: TextureBase) {
            this.texture = texture;
            if (texture) {
                if (this.materialData) {
                    this.materialData.aoMapTex = texture;
                    this.materialData.textureChange = true;
                }
            }
        }

        public activateEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            this.context3D = context3D;
        }

        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
        }

        public dispose() {
        }
    }
} 