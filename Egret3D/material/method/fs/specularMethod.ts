module BlackSwan {
    export class SpecularMethod extends MethodBase {

        protected _specularTexture: TextureBase;
        
        constructor() {
            super();
            this.fsMethodName = "specularMap_fragment";
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
            super.activate(context3D,program3D,modeltransform,camera3D);
            this.usage.specularTexture.index = context3D.getUniformLocation(program3D, this.usage.specularTexture.name);
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            super.updata(context3D, program3D, modeltransform, camera3D);
            this.materialData.specularTex.upload(context3D);
            context3D.setTextureAt(ContextSamplerType.TEXTURE_2, 2, this.usage.specularTexture.index, this.materialData.specularTex.texture)
            context3D.setTexture2DSamplerState(ContextSamplerType.NEAREST, ContextSamplerType.NEAREST, ContextSamplerType.REPEAT, ContextSamplerType.REPEAT);
        }

    }
} 