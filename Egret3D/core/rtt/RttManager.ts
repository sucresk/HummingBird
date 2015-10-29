module Egret3D {
    export enum FrameBufferType { shadowFrameBufrfer, defaultFrameBuffer, positionFrameBuffer, normalFrameBuffer, specularFrameBuffer, leftEyeFrameBuffer, rightEyeFrameBuffer, nextFrameBuffer }
    export class FrameBuffer {
        frameBufferName: number;
        width: number;
        height: number;
        texture: RenderTexture;
    }

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

        constructor() {
            if (RttManager.instance)
                new Error("can't new RttManager instance!");
        }

        public static creatFrameBuffer(framName: FrameBufferType, context3D: Context3D, width: number, height: number): FrameBuffer {
            var frameBuffer: FrameBuffer = new FrameBuffer();
            frameBuffer.frameBufferName = framName;
            frameBuffer.width = width;
            frameBuffer.height = height;
            frameBuffer.texture = new RenderTexture(context3D.createFramebuffer(width, height));
            RttManager.instance[framName] = frameBuffer; 
            return RttManager.instance[framName];
        }

        public drawFrameBuffersToTexture(time: number, delay: number, context3D: Context3D, collect: CollectBase, camera: Camera3D, rec: Rectangle) {

        }

        public static drawToTexture(time: number, delay: number, renderTragetTexture: Texture2D, context3D: Context3D, render: RenderBase, collect: CollectBase, camera: Camera3D, rec: Rectangle) {
            context3D.viewPort(rec.x, rec.y, rec.width, rec.height);
            context3D.setRenderToTexture(renderTragetTexture, true, 0);
            render.draw(time, delay, context3D, collect, camera);
            context3D.setRenderToBackBuffer();
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
