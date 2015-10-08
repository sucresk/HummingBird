module BlackSwan {
    export class DiffuseMethod extends MethodBase {

        protected _diffuseTexture: TextureBase;
        protected _normalTexture: TextureBase;
        protected _specularTexture: TextureBase;

      
        constructor() {
            super();
            this.methodName = "diffuse_fragment";
        }

        public set diffuseTexture(texture: TextureBase) {
            this._diffuseTexture = texture;
        }

        public get diffuseTexture(): TextureBase {
            return this._diffuseTexture;
        }

        public set normalTexture(texture: TextureBase) {
            this._normalTexture = texture;
        }

        public get normalTexture(): TextureBase {
            return this._normalTexture;
        }

        public set specularTexture(texture: TextureBase) {
            this._specularTexture = texture;
        }

        public get specularTexture(): TextureBase {
            return this._specularTexture;
        } 

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
            super.activate(context3D,program3D,modeltransform,camera3D);
            this.diffuseTexture.upload(context3D);
            this.usage.texture2D_0.index = context3D.getUniformLocation(program3D, this.usage.texture2D_0.name);
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            super.updata(context3D,program3D,modeltransform,camera3D);
            context3D.setTextureAt(this.usage.texture2D_0.index, this.usage.texture2D_0.texture.texture)
            context3D.setTexture2DSamplerState(ContextSamplerType.NEAREST, ContextSamplerType.NEAREST, ContextSamplerType.REPEAT, ContextSamplerType.REPEAT);
        }

    }
} 