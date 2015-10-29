module BlackSwan {
    export enum TextureMaterialType { DIFFUSE, DIFFUSE_BUMP, DIFFUSE_BUMP_SPECULAR, RGBATERRAIN }
    export class TextureMaterial extends MaterialBase {
        constructor(texture: TextureBase = null, useNormalMap: boolean = false , useSpecularMap:boolean = false ) {
            super();
            this.diffusePass = new DiffuseMapPass(this.materialData);
            if (!texture) {
                this.diffuseTexture = CheckerboardTexture.texture;
            } else {
                this.diffuseTexture = texture;
            }
            
            this.useDiuufseMap = true;
            this.useNormalMap = useNormalMap;
            this.useSpecularMap = useSpecularMap; 
        }

        public set useDiuufseMap(value: boolean) {
            this.materialData.useDiuufseMap = value;
            if (this.materialData.useDiuufseMap) {
                this.materialData.diffuseTex = CheckerboardTexture.texture;
            }
        }

        public set useNormalMap(value:boolean) {
            this.materialData.useNormalMap = value;
            if (this.materialData.useNormalMap){
                this.materialData.normalTex = CheckerboardTexture.texture;
            }
        }

        public set useSpecularMap(value: boolean) {
            this.materialData.useSpecularMap = value;
            if (this.materialData.useSpecularMap){
                this.materialData.specularTex = CheckerboardTexture.texture;
            }
        }

        public get useDiuufseMap(): boolean {
            return this.materialData.useDiuufseMap;
        }

        public get useNormalMap(): boolean {
            return this.materialData.useNormalMap ;
        }

        public get useSpecularMap( ): boolean {
            return this.materialData.useSpecularMap ;
        }
    }
} 