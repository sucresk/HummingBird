module Egret3D {

     /**
     * @class Egret3D.PostEffectBase
     * @classdesc
     * 后期合成基类
     */
    export class PostEffectBase {
        /**
         * @language zh_CN
         */
        public nextFrameBuffer: FrameBuffer;
        protected rec: Rectangle = new Rectangle(); 
        protected postCanvas: PostCanvas; 

        /**
         * @language zh_CN
         */
        constructor() {
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param width 
         * @param height 
         */
        public init(context3D: Context3D, width: number, height: number) {
            this.nextFrameBuffer = RttManager.creatFrameBuffer(FrameBufferType.defaultFrameBuffer, context3D, width, height, FrameBufferFormat.UNSIGNED_BYTE_RGB);
            this.rec.width = width;
            this.rec.height = height;
        }

        /**
         * @language zh_CN
         * @param source 数据来源buffer
         * @param target 渲染的目标buffer
         * @param context3D  gpu设备
         * @param viewPort 视口
         */
        public drawToTarget(source: FrameBuffer, target: FrameBuffer, context3D: Context3D,viewPort:Rectangle) {

        } 
    }
}