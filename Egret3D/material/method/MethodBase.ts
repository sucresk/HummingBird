module Egret3D {

     /**
     * @class Egret3D.MethodBase
     * @classdesc
     * 所有方法的基类
     */
    export class MethodBase {
        /**
         * @language zh_CN
         */
        protected materialData: MaterialData;
        /**
         * @language zh_CN
         */
        protected usage: MethodUsageData;
        /**
         * @language zh_CN
         */
        protected vsMethodName: string = ""; 
        /**
         * @language zh_CN
         */
        protected fsMethodName: string = ""; 
        /**
         * @language zh_CN
         */
        protected context3D: Context3D;

        /**
         * @language zh_CN
         */
        public acceptShadow: boolean = false;

        /**
         * @language zh_CN
         */
        constructor() {
        }

        /**
         * @language zh_CN
         * @param materialData 
         * @param usage 
         */
        public setMaterialData(materialData: MaterialData, usage: MethodUsageData ) {
            this.usage = usage;
            this.materialData = materialData;
        }

        /**
         * @language zh_CN
         */
        public get vertexMethodName(): string {
            return this.vsMethodName; 
        }

        /**
         * @language zh_CN
         */
        public get fragMethodName(): string {
            return this.fsMethodName;
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param program3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ,geometry:GeometryBase , animation:IAnimation ) {
            //change constData
            this.context3D = context3D;
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param program3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeometryBase , animation: IAnimation ) {

        }

        /**
         * @language zh_CN
         */
        public dispose() {
        }
    }
}