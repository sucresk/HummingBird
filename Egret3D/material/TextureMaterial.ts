module Egret3D {
    export class TextureMaterial extends MaterialBase {
        constructor(texture: TextureBase = null , materialData:MaterialData = null ) {
            super(materialData);
            
            if (!texture) {
                this.diffuseTexture = CheckerboardTexture.texture;
            } else {
                this.diffuseTexture = texture;
            }

            this.initMatPass();
        }

        public clone(): TextureMaterial {
            var mat: TextureMaterial = new TextureMaterial(this.diffuseTexture, this.materialData.clone());
            return mat ;
        }
    }
} 