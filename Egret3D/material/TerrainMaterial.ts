module Egret3D {

     /**
     * @class Egret3D.TerrainMaterial
     * @classdesc
     * 地形材质
     */
    export class TerrainMaterial extends MaterialBase {
        /**
         * @language zh_CN
         * @param colormap 
         * @param controlTex 
         * @param splat_0 
         * @param splat_1 
         * @param splat_2 
         * @param splat_3 
         * @param lightMap 
         */
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

        /**
         * @language zh_CN
         * @param index 
         * @param x 
         * @param y 
         */
        public setUVTitling(index: number, x: number, y: number) {
            (<TerrainMethod>this.diffusePass.diffuseMethod).setUVTitling(index, x, y);
        }

    }
}