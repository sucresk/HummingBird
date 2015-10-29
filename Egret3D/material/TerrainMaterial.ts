module Egret3D {
    export class TerrainMaterial extends MaterialBase {
        constructor(colormap: TextureBase, controlTex: TextureBase, splat_0: TextureBase, splat_1: TextureBase, splat_2: TextureBase, splat_3: TextureBase,lightMap:TextureBase=null) {

            super();
            this.materialData.matType = MaterialType.RGBATERRAIN ;
            this.materialData.diffuseTex = colormap;
            this.materialData.maskTex = controlTex;
            this.materialData.splat_0Tex = splat_0;
            this.materialData.splat_1Tex = splat_1;
            this.materialData.splat_2Tex = splat_2;
            this.materialData.splat_3Tex = splat_3;

            if (!lightMap)
                this.materialData.lightMapTex = CheckerboardTexture.texture;
            else
                this.materialData.lightMapTex = lightMap ;

            this.initMatPass();
        }

        public setUVTitling(index: number, x: number, y: number) {
            (<TerrainMethod>this.diffusePass.diffuseMethod).setUVTitling(index, x, y);
        }

    }
}