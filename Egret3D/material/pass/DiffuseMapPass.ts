module BlackSwan {
    export class DiffuseMapPass extends MaterialPassBase {

        private colorMapMethod: ColorMethod = new ColorMethod(1.0,1.0,1.0,1.0);
        private diffuseMapMethod: DiffuseMethod = new DiffuseMethod();
        private lightingMapMethod: LightingMethod = new LightingMethod();
        constructor() {
            super();
        }

        public set diffuseTexture(texture: TextureBase) {
            this.diffuseMapMethod.diffuseTexture = texture;
        }

        /**
       * 初始化 shader 的地方
       **/
        public initShader(context3D: Context3D, geomtry: GeomtryBase, animation: IAnimation) {
            
            this.vertexShader = new VertexShader();
            this.pixelShader = new PixelShader();

            this.useageData.context3D = context3D;
            this.useageData.geomtryBase = geomtry;
            
            this.addFragmentMethod(this.colorMapMethod);
            this.addFragmentMethod(this.diffuseMapMethod);
            this.addFragmentMethod(this.lightingMapMethod);
            
            this.vertexShader.setUsage(this.useageData);
            this.pixelShader.setUsage(this.useageData);

            this.useageData.texture2D_0.texture = this.diffuseMapMethod.diffuseTexture;

            var vs: string = this.vertexShader.getShaderSource();
            var fs: string = this.pixelShader.getShaderSource();

            var vs_shader: Shader = context3D.creatVertexShader(vs);
            var fs_shader: Shader = context3D.creatFragmentShader(fs);

            this.useageData.program3D = context3D.creatProgram(vs_shader, fs_shader);
            this.context3DChange = true;
        }

        //public set normalTexture(texture: Texture2D) {
        //    (<DiffuseMethod>this.mainFsMethod).normalTexture.data = texture;
        //}

        //public set specularTexture(texture: Texture2D){
        //    (<DiffuseMethod>this.mainFsMethod).specularTexture.data = texture;
        //}

        //public set lightTexture(texture: Texture2D) {
        //    (<DiffuseMethod>this.mainFsMethod).lightTexture.data = texture;
        //}

        //protected initShader() {
        //    super.initShader();
        //}

        //public active(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
        //    super.active(context3D, program3D, modeltransform, camera3D);
        //}

        //public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
        //    super.updata(context3D, program3D, modeltransform, camera3D);
        //}

    }
} 