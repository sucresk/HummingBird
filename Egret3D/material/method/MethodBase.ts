module BlackSwan {
    export class MethodBase {
        protected usage: MethodUsageData;
        protected methodName: string = "" ; 
        constructor() {
        }
        public getMethodName(usage: MethodUsageData): string {
            this.usage = usage;
            return this.methodName ;
        }


        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
            //change constData
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
        }
    }
}