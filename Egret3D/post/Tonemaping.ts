module Egret3D {

     /**
     * @class Egret3D.Tonemaping
     * @classdesc
     * 颜色调和
     */
    export class Tonemaping extends PostEffectBase{

        /**
         * @language zh_CN
         */
        constructor() {
            super();
            this.postCanvas = new PostCanvas("postCanvas_vertex","Tonemaping");
        }

        /**
         * @language zh_CN
         * @param source 数据来源buffer
         * @param target 渲染的目标buffer
         * @param context3D  gpu设备
         * @param viewPort 视口
         */
        public drawToTarget(source: FrameBuffer, target: FrameBuffer,context3D: Context3D, viewPort:Rectangle) {
            this.postCanvas.width = this.rec.width;
            this.postCanvas.height = this.rec.height;
            this.postCanvas.texture = source.texture;
            this.postCanvas.texture2 = target.texture;
            this.postCanvas.draw(context3D, this.rec);
        } 
    }
}