module Egret3D {
                            
    /**
    * @class Egret3D.SphereSky
    * @classdesc
    * default render
    */
    export class DefaultRender extends RenderBase {
                
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
        public draw(time: number, delay: number, context3D: Context3D, collect: CollectBase, camera: Camera3D ) {
            this._renderList = collect.renderList;
            this._numEntity = this._renderList.length;

            ///context3D.gl.clear(context3D.gl.COLOR_BUFFER_BIT | context3D.gl.DEPTH_BUFFER_BIT);
            for (this._renderIndex = 0; this._renderIndex < this._numEntity ; this._renderIndex++){
                this._renderList[this._renderIndex].update(time, delay);

                if (!this._renderList[this._renderIndex].isVisible ) {
                    continue;
                }
                if (this._renderList[this._renderIndex].tag && this._renderList[this._renderIndex].tag.clearDepth && this._renderList[this._renderIndex].tag.cleanState) {
                    this._renderList[this._renderIndex].tag.cleanState = false;
                    context3D.clearDepth(1);
                }

                if (this._renderList[this._renderIndex].material != null) {

                    if (this._renderList[this._renderIndex].material.alpha != 0) {
                        this._renderList[this._renderIndex].material.rendenDiffusePass(context3D, camera , this._renderList[this._renderIndex].modelMatrix, this._renderList[this._renderIndex].geometry, this._renderList[this._renderIndex].animation);
                    }
                }
            }
        }
    }
} 

