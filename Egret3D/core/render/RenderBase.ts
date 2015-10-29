module BlackSwan {
    export class RenderBase {

        //protected _context3D: Context3D;

        protected _frameBuffer: WebGLFramebuffer;
        protected _frameBufferTexture: WebGLTexture;
        public camera3D: Camera3D;
        constructor(camera3D:Camera3D) {
            this.camera3D = camera3D;
        }

        public draw(time: number , delay: number, context3D: Context3D, collect: CollectBase) {


        }
    }
} 