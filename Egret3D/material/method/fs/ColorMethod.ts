module BlackSwan {
    export class ColorMethod extends MethodBase {

        //private ambientColor: Vector3D = new Vector3D( 1.0 ,1.0 ,1.0 , 1.0);
        //private diffuseColor: Vector3D = new Vector3D(1.0, 1.0 , 1.0 , 1.0);
        //private specularColor: Vector3D = new Vector3D(0.0,0.0,0.0, 1.0);
        //private specularExp: number = 60;

        protected materialSource: Float32Array = new Float32Array(4 * 4);

        constructor(r: number, g: number, b: number, a: number) {
            super();
            this.methodName = "color_fragment";
            this.setAmbientColorColor(0.0,0.0,0.0, 1.0);
            this.setDiffuseColor(r,g,b,a);
            this.setSpecular(0.0, 0.0, 0.0, 60.0);
            this.setShininess(1.0);   
        }

        public setAmbientColorColor(r: number, g: number, b: number, power: number) {
            this.materialSource[0] = r;
            this.materialSource[1] = g;
            this.materialSource[2] = b;
            this.materialSource[3] = power;
        }

        public setDiffuseColor(r: number, g: number, b: number, power: number) {
            this.materialSource[4] = r;
            this.materialSource[5] = g;
            this.materialSource[6] = b;
            this.materialSource[7] = power;
        }

        public setSpecular(r: number, g: number, b: number, exp: number = 60) {
            this.materialSource[8] = r;
            this.materialSource[9] = g;
            this.materialSource[10] = b;
            this.materialSource[11] = exp;
        }

        public setShininess(shininess: number) {
            this.materialSource[12] = shininess;
            this.materialSource[13] = shininess;
            this.materialSource[14] = shininess;
            this.materialSource[15] = shininess;
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
            super.activate(context3D, program3D, modeltransform, camera3D);
            this.usage.uniform_materialSource.index = context3D.getUniformLocation(program3D, this.usage.uniform_materialSource.varName);
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
            context3D.uniform4fv(this.usage.uniform_materialSource.index,this.materialSource);
        }

    }
} 