module Egret3D {

     /**
     * @class Egret3D.TextureMaterial
     * @classdesc
     * 纹理材质
     */
    export class TextureMaterial extends MaterialBase {
        /**
         * @language zh_CN
         * @param texture 
         * @param materialData 
         */
        constructor(texture: TextureBase = null , materialData:MaterialData = null ) {
            super(materialData);
            
            if (!texture) {
                this.diffuseTexture = CheckerboardTexture.texture;
            } else {
                this.diffuseTexture = texture;
            }

            this.initMatPass();
        }

        /**
         * @language zh_CN
         */
        public clone(): TextureMaterial {
            var mat: TextureMaterial = new TextureMaterial(this.diffuseTexture, this.materialData.clone());
            return mat ;
        }
    }
} 