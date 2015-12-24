module Egret3D {
                            
    /**
    * @class Egret3D.RenderBase
    * @classdesc
    * 渲染器基类
    */
    export class RenderBase {

        ///protected _context3D: Context3D;
        protected _renderIndex: number = 0;
        protected _numEntity: number = 0; 
        protected _frameBuffer: WebGLFramebuffer;
        protected _frameBufferTexture: WebGLTexture;
        protected _renderList: Array<Object3D>;
                        
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            ///this.camera3D = camera3D;
        }
                                        
        /**
        * @language zh_CN
        * 每帧渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public draw(time: number , delay: number, context3D: Context3D, collect: CollectBase , camera:Camera3D ) {


        }
    }
} 