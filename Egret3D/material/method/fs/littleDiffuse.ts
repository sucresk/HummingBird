module BlackSwan {
    export class LittleDiffuse extends MethodBase {

        constructor() {
            super();
            this.fsMethodName = "littleDiffuse";
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            super.activate(context3D, program3D, modeltransform, camera3D);
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }

    }
} 