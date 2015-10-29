module Egret3D {
    export class EnvironmentMappingMethod extends EffectMethod {

        private texture: TextureBase; 
        private reflectValue: number = 1.0;
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "EnvironmentMapping_fragment";
            this.lightTexture = texture; 
        }

        public set reflect(value: number) {
            this.reflectValue = value; 
        }

        public get reflect(): number {
            return this.reflectValue;
        }

        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;

            if (this.texture)
                this.materialData.environmentMapTex = this.texture;
            else
                this.materialData.environmentMapTex = CheckerboardTexture.texture;
        }

        public set lightTexture(texture: TextureBase) {
            this.texture = texture; 
            if (texture) {
                if (this.materialData) {
                    this.materialData.environmentMapTex = texture;
                    this.materialData.textureChange = true;
                }
            }
        }

        public activateEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            this.context3D = context3D;
            usage["reflectValue"] = context3D.getUniformLocation(usage.program3D, "reflectValue");
        }

        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            context3D.gl.uniform1f(usage["reflectValue"], this.reflectValue );
        }

        public dispose() {
        }
    }
} 