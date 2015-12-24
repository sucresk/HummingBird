module Egret3D {
                    
    /**
    * @language zh_CN
    * @class Egret3D.PickResult
    * @classdesc
    * 鼠标拾取返回数据
    */
    export class PickResult {
        public localPosition: Vector3D = new Vector3D();
                        
        /**
        * @language zh_CN
        * 鼠标拾取模型上的交点 (世界坐标)
        */
        public globalPosition: Vector3D = new Vector3D();
        public object3DPosition: Vector3D = new Vector3D();
        public uv: Vector3D = new Vector3D();
        public near: number = 0;
    }
}