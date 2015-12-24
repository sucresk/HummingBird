module Egret3D {

     /**
     * @class Egret3D.MaterialData
     * @classdesc
     * 材质数据
     */
    export class MaterialData {

        /**
        * @language zh_CN
        * 材质类型
        */
        public matType: MaterialType = MaterialType.DIFFUSE; 

        /**
        * @language zh_CN
        * diffuse pass usage data
        */
        public diffusePassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * 深度 pass usage data
        */
        public depthPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * 法线 pass usage data
        */
        public normalPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * position pass usage data
        */
        public positionPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * post pass usage data
        */
        public postPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * 灯光 pass usage data
        */
        public lightPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * 阴影 pass usage data
        */
        public shadowPassUsageData: MethodUsageData = new MethodUsageData(); 


        /**
        * @language zh_CN
        * 渲染模式
        */
        public drawMode: number = DrawMode.TRIANGLES ; 


        /**
        * @language zh_CN
        * 设备
        */
        public context3D: Context3D;

  
        /**
        * @language zh_CN
        * 阴影贴图
        */
        public shadowMapTex: TextureBase;

        /**
        * @language zh_CN
        * 漫反射贴图
        */
        public diffuseTex: TextureBase;//= CheckerboardTexture.texture ;

        /**
        * @language zh_CN
        * 法线贴图
        */
        public normalTex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * 特效贴图
        */
        public specularTex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * 灯光贴图
        */
        public lightMapTex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * ao 贴图
        */
        public aoMapTex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * 环境贴图
        */
        public environmentMapTex: TextureBase = CheckerboardTexture.texture;


        /**
        * @language zh_CN
        * mask 贴图
        */
        public maskTex: TextureBase = CheckerboardTexture.texture ;

        /**
        * @language zh_CN
        * splat_0 贴图
        */
        public splat_0Tex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_1 贴图
        */
        public splat_1Tex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_2 贴图
        */
        public splat_2Tex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_3 贴图
        */
        public splat_3Tex: TextureBase = CheckerboardTexture.texture;


        /**
        * @language zh_CN
        * 方向光列表
        */
        public directLightList: Array<DirectLight> = new Array<DirectLight>();

        /**
        * @language zh_CN
        * 聚光灯列表
        */
        public sportLightList: Array<SpotLight> = new Array<SpotLight>();

        /**
        * @language zh_CN
        * 点光源列表
        */
        public pointLightList: Array<PointLight> = new Array<PointLight>();


        /**
        * @language zh_CN
        * 
        */
        public layer: number = 0;

        /**
        * @language zh_CN
        * 
        */
        public castShadow: boolean = false;

        /**
        * @language zh_CN
        * 
        */
        public acceptShadow: boolean = true ;

        /**
        * @language zh_CN
        * 
        */
        public depthTest: boolean = true;

        /**
        * @language zh_CN
        * 
        */
        public smooth: boolean = true; 

        /**
        * @language zh_CN
        * 
        */
        public blendMode: BlendMode = BlendMode.NORMAL ; 

        /**
        * @language zh_CN
        * 
        */
        public blend_src: number;

        /**
        * @language zh_CN
        * 
        */
        public blend_dest: number ;

        /**
        * @language zh_CN
        * 
        */
        public alphaBlending: boolean = false; 

        /**
        * @language zh_CN
        * 
        */
        public ambientColor: number = 0x00235c;

        /**
        * @language zh_CN
        * 
        */
        public diffuseColor: number = 0xffffff;

        /**
        * @language zh_CN
        * 
        */
        public specularColor: number = 0xffffff ;

        /**
        * @language zh_CN
        * 
        */
        public shininess: number = 8.0;

        /**
        * @language zh_CN
        * 
        */
        public cutAlpha: number = 0.7;

        /**
        * @language zh_CN
        * 
        */
        public repeat: boolean = false ;

        /**
        * @language zh_CN
        * 
        */
        public alpha: number = 1;

        /**
        * @language zh_CN
        * 
        */
        public specularPower: number = 1.0; 

        /**
        * @language zh_CN
        * 
        */
        public ambientPower: number = 1.0; 

        /**
        * @language zh_CN
        * 
        */
        public diffusePower: number = 1.0; 

        /**
        * @language zh_CN
        * 
        */
        public normalPower: number = 1.0; 

        /**
        * @language zh_CN
        * 
        */
        public materialDataNeedChange: boolean = true;

        /**
        * @language zh_CN
        * 
        */
        public textureChange: boolean = false; 


        /**
        * @language zh_CN
        * 
        */
        public passChange: boolean = true;


        /**
        * @language zh_CN
        * 
        */
        public cullFrontOrBack: number = Egret3DDrive.BACK;


        /**
        * @language zh_CN
        * 
        * @returns MaterialData
        */
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

        /**
        * @language zh_CN
        * 
        * @returns
        */
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