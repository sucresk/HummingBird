module BlackSwan {
    export class MethodBase {
        public usage: MethodUsageData;
        public geomtry: GeomtryBase;
        public animation: IAnimation;

        public shader: GLSL.ShaderBase;

        public getShaderSource(): string {
            this.initShaderSource();
            this.initConstData();
            return this.shader.getShaderSource();
        }

        protected initShaderSource() {
        }

        protected initConstData() {
        }

        public setData(usage: MethodUsageData, geomtry: GeomtryBase, animation: IAnimation ) {
            this.usage = usage;
            this.geomtry = geomtry;
            this.animation = animation; 
            this.shader = new GLSL.ShaderBase;
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            //change constData
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }

    }
}