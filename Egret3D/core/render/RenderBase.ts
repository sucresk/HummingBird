module Egret3D {
    export class RenderBase {

        ///protected _context3D: Context3D;
        protected _renderIndex: number = 0;
        protected _numEntity: number = 0; 
        protected _frameBuffer: WebGLFramebuffer;
        protected _frameBufferTexture: WebGLTexture;
        protected _renderList: Array<Object3D>;

        constructor() {
            ///this.camera3D = camera3D;
        }

        public draw(time: number , delay: number, context3D: Context3D, collect: CollectBase , camera:Camera3D ) {


        }
    }
} 