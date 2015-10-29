module Egret3D {
    export class EffectMethod {
        protected materialData: MaterialData; 
        protected usage: MethodUsageData;
        protected vsMethodName: string = ""; 
        protected fsMethodName: string = ""; 
        protected context3D: Context3D;
        constructor() {
        }

        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;
        }

        public get vertexMethodName(): string {
            return this.vsMethodName; 
        }

        public get fragMethodName(): string {
            return this.fsMethodName;
        }

        public activateEffect(context3D: Context3D,usage:MethodUsageData,materialData:MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D ,geometry:GeometryBase , animation:IAnimation ) {
            //change constData
            this.context3D = context3D;
        }

        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeometryBase , animation: IAnimation ) {

        }

        public dispose() {
        }
    }
}