module Egret3D {
     /**
     * @class Egret3D.RenderTexture
     * @classdesc
     * 渲染材质
     */
    export class RenderTexture extends TextureBase{
        /**
         * @language zh_CN
         * @param texture 
         */
        constructor( texture:Texture2D ) {
            super();
            this.useMipmap = false;
            this.texture = texture; 
        }
    }
} 