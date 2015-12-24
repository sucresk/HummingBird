module Egret3D {

     /**
     * @class Egret3D.HDR
     * @classdesc
     * 后期HDR合成
     */
    export class HDR extends PostEffectBase {

        private brightPost: BrightPost;
        private gaussianBlurHorizontalPost: GaussianBlurHorizontalPost;
        private gaussianBlurVerticalPost: GaussianBlurVerticalPost;
        private composition: Composition;
        private toneMap: Tonemaping;

        /**
         * @language zh_CN
         */
        constructor() {
            super();
            this.brightPost = new BrightPost();
            this.gaussianBlurHorizontalPost = new GaussianBlurHorizontalPost();
            this.gaussianBlurVerticalPost = new GaussianBlurVerticalPost();
            this.composition = new Composition();
            this.toneMap = new Tonemaping();
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param width 
         * @param height 
         */
        public init(context3D: Context3D, width: number, height: number) {
            this.brightPost.init(context3D, width, height);
            this.gaussianBlurHorizontalPost.init(context3D, width, height);
            this.gaussianBlurVerticalPost.init(context3D, width, height);
            this.composition.init(context3D, width, height);
            this.toneMap.init(context3D, width, height);
        }

        private lumAdapt: number = 0.0;
        private lum: number = 1.0;

        /**
         * @language zh_CN
         * @param source 数据来源buffer
         * @param target 渲染的目标buffer
         * @param context3D  gpu设备
         * @param viewPort 视口
         */
        public drawToTarget(source: FrameBuffer, target: FrameBuffer, context3D: Context3D, viewPort: Rectangle) {
            this.lumAdapt += (this.lum - this.lumAdapt) * (1 - Math.pow(0.98, 30 * 16));

            var next: FrameBuffer = source;

            this.brightPost.drawToTarget(source, next, context3D, viewPort);
            next = this.brightPost.nextFrameBuffer;
            this.nextFrameBuffer = this.brightPost.nextFrameBuffer;

            this.gaussianBlurHorizontalPost.drawToTarget(source, next, context3D, viewPort);
            next = this.gaussianBlurHorizontalPost.nextFrameBuffer;

            this.gaussianBlurVerticalPost.drawToTarget(source, next, context3D, viewPort);
            next = this.gaussianBlurVerticalPost.nextFrameBuffer;

            this.composition.drawToTarget(source, next, context3D, viewPort);
            this.nextFrameBuffer = this.composition.nextFrameBuffer;
          
            context3D.setRenderToBackBuffer();
        }
    }
}