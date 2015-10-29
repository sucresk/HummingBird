module BlackSwan {
    export class NormalMapMethod extends MethodBase {

        protected _normalTexture: TextureBase;
        constructor() {
            super();
            this.fsMethodName = "normalMap_fragment";
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            super.activate(context3D, program3D, modeltransform, camera3D);
            this.materialData.diffuseTex.upload(context3D);
            this.usage.normalTexture.index = context3D.getUniformLocation(program3D, this.usage.normalTexture.name);
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            super.updata(context3D, program3D, modeltransform, camera3D);
            this.materialData.normalTex.upload(context3D);
            context3D.setTextureAt(ContextSamplerType.TEXTURE_1, 1, this.usage.normalTexture.index, this.materialData.normalTex.texture)
            context3D.setTexture2DSamplerState(WebGLRenderingContext.NEAREST_MIPMAP_LINEAR, WebGLRenderingContext.NEAREST_MIPMAP_LINEAR, ContextSamplerType.REPEAT, ContextSamplerType.REPEAT);
        }

    }
} 