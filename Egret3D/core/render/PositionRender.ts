module Egret3D {
                                
    /**
    * @class Egret3D.PositionRender
    * @classdesc
    * position render
    */
    export class PositionRender extends RenderBase {
                        
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
              super();
        }
                                                
        /**
        * @language zh_CN
        * 渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public renden(time: number, delay: number, context3D: Context3D, collect: CollectBase, camera: Camera3D) {

            this._renderList = collect.renderList;

            this._numEntity = this._renderList.length;

            for (this._renderIndex = 0; this._renderIndex < this._numEntity ; this._renderIndex++){
                this._renderList[this._renderIndex].update(time, delay);
                if (!this._renderList[this._renderIndex].isVisible) {
                    continue;
                }
                if (this._renderList[this._renderIndex].material != null) {
                    ///this._renderList[this._renderIndex].material.rendenNormalPass(context3D, camera, this._renderList[this._renderIndex].modelMatrix, this._renderList[this._renderIndex].geomtry, this._renderList[this._renderIndex].animation);
                }
            }

        }

    }
} 