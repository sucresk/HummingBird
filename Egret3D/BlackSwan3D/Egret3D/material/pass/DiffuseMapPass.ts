module BlackSwan {
    export class DiffuseMapPass extends MaterialPassBase {

        constructor() {
            super();
            this.mainVsMethod = new StaticVertexMethod();
            this.mainFsMethod = new DiffuseMethod();
        }

        public set diffuseTexture(texture: ImageTexture) {
            //<DiffuseMethod>this.mainFsMethod.diffuseTexture.texture = texture;
            //this.mainFsMethod.usage.texture2D_0 = new GLSL.Sampler2D(GLSL.VarConstName.texture2D_0);
            this.mainFsMethod.diffuseTexture = texture;
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