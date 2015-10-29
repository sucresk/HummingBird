module Egret3D {
    export class NormalMethod extends MethodBase {

        constructor() {
            super();
            this.fsMethodName = "normalMethod_fragment";
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation ) {
            super.activate(context3D, program3D, modeltransform, camera3D,geometry, animation);
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation ) {
        }

        public dispose() {
        }
    }
}