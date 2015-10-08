module BlackSwan {
    export class MaterialBase {

        protected diffusePass  : MaterialPassBase;
        protected normalPass   : MaterialPassBase;
        protected positionPass : MaterialPassBase;
        protected depthPass    : MaterialPassBase;

        
        constructor() {

        }

        public set lightGroup(lightGroup: LightGroup) {
            this.diffusePass.lightGroup = lightGroup.lights ;
        }

        public initShader(context3D:Context3D, geomtry: GeomtryBase, animation: IAnimation) {
            this.diffusePass.initShader(context3D, geomtry ,animation );
        }

        public set diffuseTexture(texture: TextureBase) {
            (<DiffuseMapPass>this.diffusePass).diffuseTexture = texture;
        }

        //public set normalTexture(texture: Texture2D) {
        //    (<DiffuseMapPass>this.diffusePass).normalTexture = texture;
        //}

        //public set specularTexture(texture: Texture2D) {
        //    (<DiffuseMapPass>this.diffusePass).specularTexture = texture;
        //}

        //public set lightTexture(texture: Texture2D) {
        //    (<DiffuseMapPass>this.diffusePass).lightTexture = texture;
        //}

        public activateDiffusePass(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.diffusePass.activate(context3D, modeltransform, camera3D);
        }

        public activateNormalPass(context3D: Context3D,  modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.normalPass.activate(context3D, modeltransform, camera3D);
        }

        public activatePositionPass(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.positionPass.activate(context3D,  modeltransform, camera3D);
        }

        public activateDepthPass(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.depthPass.activate(context3D, modeltransform, camera3D);
        }

        public renderDiffusePass(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.diffusePass.updata(context3D, modeltransform, camera3D);
        }

        public renderNormalPass(context3D: Context3D,  modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.normalPass.updata(context3D, modeltransform, camera3D);
        }

        public renderPositionPass(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.positionPass.updata(context3D, modeltransform, camera3D);
        }

        public renderDepthPass(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.depthPass.updata(context3D, modeltransform, camera3D);
        }
    }
} 