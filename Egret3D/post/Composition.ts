module Egret3D {

     /**
     * @class Egret3D.Composition
     * @classdesc
     * 后期合成
     */
    export class Composition extends PostEffectBase{

        /**
         * @language zh_CN
         */
        constructor() {
            super();
            this.postCanvas = new PostCanvas("postCanvas_vertex","Composition");
        }

        /**
         * @language zh_CN
         * @param source 数据来源buffer
         * @param target 渲染的目标buffer
         * @param context3D  gpu设备
         * @param viewPort 视口
         */
        public drawToTarget(source: FrameBuffer, target: FrameBuffer,context3D: Context3D, viewPort:Rectangle) {
            context3D.setRenderToTexture(this.nextFrameBuffer.texture.texture, true, 0);
            this.postCanvas.width = this.rec.width;
            this.postCanvas.height = this.rec.height;
            this.postCanvas.texture = target.texture;
            this.postCanvas.texture2 = source.texture;
            this.postCanvas.draw(context3D , this.rec);
        } 
    }
}