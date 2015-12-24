module Egret3D {
    export enum FrameBufferType { shadowFrameBufrfer, defaultFrameBuffer, positionFrameBuffer, normalFrameBuffer, specularFrameBuffer, leftEyeFrameBuffer, rightEyeFrameBuffer, nextFrameBuffer }
    export enum FrameBufferFormat { FLOAT_RGB, FLOAT_RGBA, UNSIGNED_BYTE_RGB, UNSIGNED_BYTE_RGBA }
                                    
    /**
    * @class Egret3D.FrameBuffer
    * @classdesc
    * 渲染buffer
    */
    export class FrameBuffer {
        frameBufferName: number;
        width: number;
        height: number;
        texture: RenderTexture;
    }
    
    /**
    * @class Egret3D.RttManager
    * @classdesc
    * 离屏渲染管理
    */
    export class RttManager {
        static instance: RttManager = new RttManager();
      
        public shadowFrameBufrfer: FrameBuffer = new FrameBuffer();
        public defaultFrameBuffer: FrameBuffer = new FrameBuffer();
        public positionFrameBuffer: FrameBuffer = new FrameBuffer();
        public normalFrameBuffer: FrameBuffer = new FrameBuffer();
        public specularFrameBuffer: FrameBuffer = new FrameBuffer();
        public leftEyeFrameBuffer: FrameBuffer = new FrameBuffer();
        public rightFrameBuffer: FrameBuffer = new FrameBuffer();
        public nextFrameBuffer: FrameBuffer = new FrameBuffer();
        
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            if (RttManager.instance)
                new Error("can't new RttManager instance!");
        }
                
        /**
        * @language zh_CN
        * 创建帧缓冲
        * @param framName
        * @param context3D
        * @param width
        * @param height
        * @param format
        * @returns FrameBuffer
        */
        public static creatFrameBuffer(framName: FrameBufferType, context3D: Context3D, width: number, height: number, format:FrameBufferFormat): FrameBuffer {
            var frameBuffer: FrameBuffer = new FrameBuffer();
            frameBuffer.frameBufferName = framName;
            frameBuffer.width = width;
            frameBuffer.height = height;
            frameBuffer.texture = new RenderTexture(context3D.createFramebuffer(width, height, format));
            RttManager.instance[framName] = frameBuffer; 
            return RttManager.instance[framName];
        }
                        
        /**
        * @language zh_CN
        * 把帧缓冲的内容渲染到贴图
        * @param time
        * @param delay
        * @param context3D
        * @param collect
        * @param rec
        */
        public drawFrameBuffersToTexture(time: number, delay: number, context3D: Context3D, collect: CollectBase, camera: Camera3D, rec: Rectangle) {

        }
                                
        /**
        * @language zh_CN
        * 把帧缓冲的内容渲染到贴图
        * @param time
        * @param delay
        * @param renderTragetTexture
        * @param context3D
        * @param render
        * @param collect
        * @param camera
        * @param rec
        */
        public static drawToTexture(time: number, delay: number, renderTragetTexture: Texture2D, context3D: Context3D, render: RenderBase, collect: CollectBase, camera: Camera3D, rec: Rectangle) {
            context3D.viewPort(rec.x, rec.y, rec.width, rec.height);
            context3D.setRenderToTexture(renderTragetTexture, true, 0);
            render.draw(time, delay, context3D, collect, camera);
            context3D.setRenderToBackBuffer();
        }
                                        
        /**
        * @language zh_CN
        * 开始渲染
        * @param renderTragetTexture
        * @param context3D
        * @param rec
        */
        public static drawToTextureStart(renderTragetTexture: Texture2D, context3D: Context3D , rec: Rectangle) {
            context3D.viewPort(rec.x, rec.y, rec.width, rec.height);
            context3D.setRenderToTexture(renderTragetTexture, true, 0);
        }
                                                
        /**
        * @language zh_CN
        * 结束渲染
        * @param time
        * @param delay
        * @param context3D
        * @param render
        * @param collect
        * @param camera
        * @param rec
        */
        public static drawToTextureEnd(time: number, delay: number, context3D: Context3D, render: RenderBase, collect: CollectBase, camera: Camera3D, rec: Rectangle) {
            render.draw(time, delay, context3D, collect, camera);
           // context3D.setRenderToBackBuffer();
        }

        

        //public drawFrameBuffer(time: number, delay: number, renderTragetTexture: Texture2D, render: RenderBase, context3D: Context3D, collect: CollectBase, camera: Camera3D, rec: Rectangle) {
        //    context3D.viewPort(rec.x, rec.y, rec.width, rec.height);
        //    context3D.setRenderToTexture(renderTragetTexture, true, 0);
        //    render.draw(time, delay, context3D, collect, camera);
        //    context3D.setRenderToBackBuffer();
        //}

        //public drawFrameBuffserStart(time: number, delay: number, renderTragetTexture: Texture2D, render: RenderBase, context3D: Context3D, collect: CollectBase, camera: Camera3D, rec: Rectangle) {
        //    context3D.viewPort(rec.x, rec.y, rec.width, rec.height);
        //    context3D.setRenderToTexture(renderTragetTexture, true, 0);
        //}

        //public drawFrameBufferEnd(time: number, delay: number, render: RenderBase, context3D: Context3D, collect: CollectBase, camera: Camera3D, rec: Rectangle) {
        //    render.draw(time, delay, context3D, collect, camera);
        //    context3D.setRenderToBackBuffer();
        //}

        //public drawShadowFrameBuffer(time: number, delay: number, render: RenderBase, context3D: Context3D, collect: CollectBase, rec: Rectangle) {
        //    ///context3D.setRenderToTexture(this.shadowFrameBuffer, true, 0);
        //    ///this.shadowMapRender.viewCamera3D = render.camera3D;
        //    ///this.shadowMapRender.draw(time, delay, context3D, collect);
        //    ///context3D.viewPort(rec.x, rec.y, rec.width, rec.height);
        //    ///context3D.setRenderToBackBuffer();}
    }
}
