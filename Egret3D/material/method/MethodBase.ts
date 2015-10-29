module BlackSwan {
    export class MethodBase {
        protected materialData: MaterialData;
        protected usage: MethodUsageData;
        protected vsMethodName: string = ""; 
        protected fsMethodName: string = ""; 
        protected context3D: Context3D;

        public acceptShadow: boolean = false;
        constructor() {
        }

        public setMaterialData(materialData: MaterialData, usage: MethodUsageData ) {
            this.usage = usage;
            this.materialData = materialData;
        }

        public get vertexMethodName(): string {
            return this.vsMethodName; 
        }

        public get fragMethodName(): string {
            return this.fsMethodName;
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ,geometry:GeomtryBase , animation:IAnimation ) {
            //change constData
            this.context3D = context3D;
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeomtryBase , animation: IAnimation ) {

        }
    }
}