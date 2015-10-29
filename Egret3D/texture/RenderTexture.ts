module Egret3D {
    export class RenderTexture extends TextureBase{
        constructor( texture:Texture2D ) {
            super();
            this.useMipmap = false;
            this.texture = texture; 
        }
    }
} 