module Egret3D {

     /**
     * @class Egret3D.NormalMethod
     * @classdesc
     * 法线方法
     */
    export class NormalMethod extends MethodBase {

        /**
         * @language zh_CN
         */
        constructor() {
            super();
            this.fsMethodName = "normalMethod_fragment";
        }

        /**
         * @language zh_CN
         * 激活
         * @param context3D 
         * @param program3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation ) {
            super.activate(context3D, program3D, modeltransform, camera3D,geometry, animation);
        }

        /**
         * @language zh_CN
         * 更新
         * @param context3D 
         * @param program3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation ) {
        }

        /**
         * @language zh_CN
         * 销毁
         */
        public dispose() {
        }
    }
}