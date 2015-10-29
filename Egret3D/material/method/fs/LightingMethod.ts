module BlackSwan {
    export class LightingMethod extends MethodBase {

        constructor() {
            super();
            this.fsMethodName = "LightDiffuse_fragment";
        }
        
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
           this.usage.uniform_LightSource.index = context3D.getUniformLocation(program3D, this.usage.uniform_LightSource.varName);
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3D.uniform1fv(this.usage.uniform_LightSource.index, this.materialData.lightData );
        }

    }
}