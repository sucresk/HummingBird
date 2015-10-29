module Egret3D {
    export class MaterialData {
        //public _diffuseActiveState: boolean = false;
        //public _ShadowActiveState: boolean = false;
        //public _NormalActiveState: boolean = false;
        //public _DepthActiveState: boolean = false;
        //public _PositionActiveState: boolean = false;

        public passChange: boolean = true;

        public matType: MaterialType = MaterialType.DIFFUSE; 

        public diffusePassUsageData: MethodUsageData = new MethodUsageData(); 
        public depthPassUsageData: MethodUsageData = new MethodUsageData(); 
        public normalPassUsageData: MethodUsageData = new MethodUsageData(); 
        public positionPassUsageData: MethodUsageData = new MethodUsageData(); 
        public postPassUsageData: MethodUsageData = new MethodUsageData(); 
        public lightPassUsageData: MethodUsageData = new MethodUsageData(); 
        public shadowPassUsageData: MethodUsageData = new MethodUsageData(); 

        public drawMode: number = DrawMode.TRIANGLES ; 

        public context3D: Context3D;
  
        //frameBuffer
        public shadowMapTex: TextureBase;
        public diffuseTex: TextureBase;//= CheckerboardTexture.texture ;
        public normalTex: TextureBase = CheckerboardTexture.texture;
        public specularTex: TextureBase = CheckerboardTexture.texture;
        public lightMapTex: TextureBase = CheckerboardTexture.texture;
        public aoMapTex: TextureBase = CheckerboardTexture.texture;
        public environmentMapTex: TextureBase = CheckerboardTexture.texture;

        public maskTex: TextureBase = CheckerboardTexture.texture ;
        public splat_0Tex: TextureBase = CheckerboardTexture.texture;
        public splat_1Tex: TextureBase = CheckerboardTexture.texture;
        public splat_2Tex: TextureBase = CheckerboardTexture.texture;
        public splat_3Tex: TextureBase = CheckerboardTexture.texture;

        public directLightList: Array<DirectLight> = new Array<DirectLight>();
        public sportLightList: Array<SpotLight> = new Array<SpotLight>();
        public pointLightList: Array<PointLight> = new Array<PointLight>();

        public layer: number = 0;
        public castShadow: boolean = false;
        public acceptShadow: boolean = false;
        public depthTest: boolean = true;
        public smooth: boolean = false; 
        public blendMode: BlendMode = BlendMode.NORMAL ; 
        public blend_src: number;
        public blend_dest: number ;
        public alphaBlending: boolean = false; 
        public ambientColor: number = 0xffffff;
        public diffuseColor: number = 0xffffff;
        public specularColor: number = 0xffffff ;
        public shininess: number = 8.0;
        public cutAlpha: number = 0.7;
        public alpha: number = 1;
        public specularPower: number = 1.0; 
        public ambientPower: number = 1.0; 
        public diffusePower: number = 1.0; 
        public normalPower: number = 1.0; 

        //material state
        //public shaderNeedChange: boolean = false;
        public materialDataNeedChange: boolean = true;
        public textureChange: boolean = false; 

        public cullFrontOrBack: number = Egret3DDrive.BACK;

        public clone(): MaterialData {
            var data: MaterialData = new MaterialData();
            data.diffusePassUsageData = this.diffusePassUsageData;
            data.depthPassUsageData = this.depthPassUsageData;
            data.normalPassUsageData = this.normalPassUsageData;
            data.positionPassUsageData = this.positionPassUsageData;
            data.postPassUsageData = this.positionPassUsageData;
            data.lightPassUsageData = this.positionPassUsageData;
            data.shadowPassUsageData = this.positionPassUsageData;

            data.diffuseTex = CheckerboardTexture.texture;
            data.textureChange = true;
            data.matType = MaterialType.DIFFUSE; 

            data.drawMode = this.drawMode;
            data.context3D = this.context3D;
            data.diffuseTex = this.diffuseTex;
            data.specularTex = this.specularTex;
            data.lightMapTex = this.lightMapTex;
            data.environmentMapTex = this.environmentMapTex;
            data.shadowMapTex = this.shadowMapTex;
            data.splat_0Tex = this.splat_0Tex;
            data.splat_1Tex = this.splat_1Tex;
            data.splat_2Tex = this.splat_2Tex;
            data.splat_3Tex = this.splat_3Tex;

            data.layer = this.layer;
            data.castShadow = this.castShadow;
            data.acceptShadow = this.acceptShadow;
            data.depthTest = this.depthTest;
            data.smooth = this.smooth;
            data.blendMode = this.blendMode;
            data.blend_src = this.blend_src;
            data.blend_dest = this.blend_dest;

            data.ambientColor = this.ambientColor;
            data.diffuseColor = this.diffuseColor;
            data.specularColor = this.specularColor;
            data.shininess = this.shininess;

            data.shininess = this.shininess;
            data.cutAlpha = this.cutAlpha;
            data.alpha = this.alpha;
            data.specularPower = this.specularPower;
            data.ambientPower = this.ambientPower;
            data.diffusePower = this.diffusePower;
            data.normalPower = this.normalPower;

            data.passChange = this.passChange;
            data.materialDataNeedChange = this.materialDataNeedChange;
            data.textureChange = true;

            data.cullFrontOrBack = this.cullFrontOrBack;

            //material state
            return data;
        }

        public dispose() {
            if (this.diffusePassUsageData)
                this.diffusePassUsageData.dispose();
            if (this.depthPassUsageData)
                this.depthPassUsageData.dispose();
            if (this.normalPassUsageData)
                this.normalPassUsageData.dispose();
            if (this.normalPassUsageData)
                this.normalPassUsageData.dispose();
            if (this.positionPassUsageData)
                this.positionPassUsageData.dispose();
            if (this.postPassUsageData)
                this.postPassUsageData.dispose();
            if (this.lightPassUsageData)
                this.lightPassUsageData.dispose();
            if (this.shadowPassUsageData)
                this.shadowPassUsageData.dispose();

            if (this.directLightList.length>0){
                this.directLightList.length = 0;
                this.directLightList = null; 
            }
            if (this.sportLightList.length > 0) {
                this.sportLightList.length = 0;
                this.sportLightList = null;
            }
            if (this.pointLightList.length > 0) {
                this.pointLightList.length = 0;
                this.pointLightList = null;
            }

        }
    }
} 