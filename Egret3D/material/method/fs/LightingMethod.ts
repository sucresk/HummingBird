module BlackSwan {
    export class LightingMethod extends MethodBase {

        constructor() {
            super();
            this.methodName = "LightDiffuse_fragment";
        }
        
        private lightMode: Float32Array = new Float32Array(4);
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
          
           this.lightMode[0] = 0.0 ; 0.2;
           this.lightMode[1] = 0.0 ; 0.1;
           this.lightMode[2] = 0.0 ; 0.4;
           this.lightMode[3] = 0.0; 1.0;

            this.usage.uniform_lightModelSource.index = context3D.getUniformLocation(program3D, this.usage.uniform_lightModelSource.varName);
            this.usage.uniform_LightSource.index = context3D.getUniformLocation(program3D, this.usage.uniform_LightSource.varName);
        }

        private angle: number = 0;
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.angle +=0.1;

            context3D.uniform4fv(this.usage.uniform_lightModelSource.index, this.lightMode);
            context3D.uniform1fv(this.usage.uniform_LightSource.index, this.usage.lightData );
        }

    }
}