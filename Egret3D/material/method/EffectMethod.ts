module Egret3D {

     /**
     * @class Egret3D.EffectMethod
     * @classdesc
     * 效果方法
     */
    export class EffectMethod {

        protected materialData: MaterialData; 

        protected usage: MethodUsageData;

        protected vsMethodName: string = ""; 

        protected fsMethodName: string = ""; 

        protected context3D: Context3D;
        /**
         * @language zh_CN
         * constructor
         */

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
        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;
        }

        /**
         * @language zh_CN
         * @returns string
         */
        public get vertexMethodName(): string {
            return this.vsMethodName; 
        }

        /**
         * @language zh_CN
         * @returns string
         */
        public get fragMethodName(): string {
            return this.fsMethodName;
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param usage 
         * @param materialData 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public activateEffect(context3D: Context3D,usage:MethodUsageData,materialData:MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D ,geometry:GeometryBase , animation:IAnimation ) {
            //change constData
            this.context3D = context3D;
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param usage 
         * @param materialData 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeometryBase , animation: IAnimation ) {

        }

        /**
         * @language zh_CN
         */
        public dispose() {
        }
    }
}