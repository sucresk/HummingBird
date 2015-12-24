module Egret3D {
    export enum MaterialType { DIFFUSE, DIFFUSE_BUMP, DIFFUSE_BUMP_SPECULAR, RGBATERRAIN }

     /**
     * @class Egret3D.MaterialBase
     * @classdesc
     * 材质基类
     */
    export class MaterialBase {

        /**
         * @language zh_CN
         * 材质数据
         */
        public materialData: MaterialData;

        /**
         * @language zh_CN
         * diffuse pass
         */
        public diffusePass: MaterialPassBase;
        /**
         * @language zh_CN
         * shadow pass
         */
        public shadowPass    : ShadowMapPass ;
        /**
         * @language zh_CN
         * 法线pass
         */
        public normalPass: NormalMapPass;
        /**
         * @language zh_CN
         * 尝试pass
         */
        public depthPass: DepthMapPass;
        /**
         * @language zh_CN
         * position pass
         */
        public positionPass: MaterialPassBase;
        /**
         * @language zh_CN
         * 
         */
        public outLinePass: MaterialPassBase;
        /**
         * @language zh_CN
         * @param materialData 
         */
        constructor(materialData: MaterialData = null) {
            if (materialData == null) {
                this.materialData = new MaterialData();
                this.materialData.diffusePassUsageData.materialSourceData = new Float32Array(16);
            } else {
                this.materialData = materialData; 
            }
            this.setData(this.materialData);
            
        }

        /**
         * @language zh_CN
         */
        protected initMatPass() {
            switch (this.materialData.matType) {
                case MaterialType.DIFFUSE:
                    this.diffusePass = new DiffuseMapPass(this.materialData);
                    break;
                case MaterialType.DIFFUSE_BUMP:
                    this.diffusePass = new DiffuseMapPass(this.materialData);
                    break;
                case MaterialType.DIFFUSE_BUMP_SPECULAR:
                    this.diffusePass = new DiffuseMapPass(this.materialData);
                    break;
                case MaterialType.RGBATERRAIN:
                    this.diffusePass = new TerrainMapPass(this.materialData);
                    break;
            }
        }

        /**
         * @language zh_CN
         * @param matData 
         */
        public setData(matData: MaterialData) {
            if (this.materialData) {
                this.materialData.dispose();
            } 

            this.materialData = matData;
            this.ambientColor = this.materialData.ambientColor;
            this.ambientPower = this.materialData.ambientPower;
            this.normalPower = this.materialData.normalPower;
            this.specularColor = this.materialData.specularColor;
            this.specularPower = this.materialData.specularPower;
            this.blendMode = this.materialData.blendMode;
        }

        /**
         * @language zh_CN
         * @returns MaterialData
         */
        public getData(): MaterialData {
            return this.materialData; 
        }

        /**
         * @language zh_CN
         * @param method 
         */
        public addDiffusePassMothod(method: MethodBase) {
            this.diffusePass.addMethod(method);
        }

        /**
         * @language zh_CN
         * @param method 
         */
        public addDiffusePassEffectMothod(method: EffectMethod) {
            this.diffusePass.addEffectMethod(method);
        }

        /**
         * @language zh_CN
         * @param method 
         */
        public set shadowMapingMethod(method: ShadowMapingMethod) {
            this.diffusePass.shadowMaping = method;
        }

        /**
         * @language zh_CN
         * @returns ShadowMapingMethod
         */
        public get shadowMapingMethod( ): ShadowMapingMethod {
            return this.diffusePass.shadowMaping;
        }

        /**
         * @language zh_CN
         * @param color 
         */
        public set diffuseColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.diffuseColor = color ;
        }

        /**
         * @language zh_CN
         * @param color 
         */
        public set ambientColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.ambientColor = color;
        }

        /**
         * @language zh_CN
         * @param color 
         */
        public set specularColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.specularColor = color;
        }


        /**
         * @language zh_CN
         * 设置材质alpha
         * @param value 
         */
        public set alpha(value: number) {
            if (this.materialData.alpha != value){
                this.materialData.alpha = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 得到alpha
         * @returns alpha
         */
        public get alpha(): number {
            return this.materialData.alpha;
        }

        /**
         * @language zh_CN
         * @param value 
         */
        public set shininess(value: number) {
            if (this.materialData.shininess != value) {
                this.materialData.shininess = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * @returns number
         */
        public get shininess(): number {
            return this.materialData.shininess;
        }

        /**
         * @language zh_CN
         * @param value 
         */
        public set specularPower(value: number) {
            if (this.materialData.specularPower != value) {
                this.materialData.specularPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * @returns number
         */
        public get specularPower(): number {
            return this.materialData.specularPower;
        }

        /**
         * @language zh_CN
         * @param value 
         */
        public set ambientPower(value: number) {
            if (this.materialData.ambientPower != value) {
                this.materialData.ambientPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * @returns number
         */
        public get ambientPower(): number {
            return this.materialData.ambientPower;
        }
        

        /**
         * @language zh_CN
         * @param value 
         */
        public set diffusePower(value: number) {
            if (this.materialData.diffusePower != value) {
                this.materialData.diffusePower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * @returns number 
         */
        public get diffusePower(): number {
            return this.materialData.diffusePower;
        }

        /**
         * @language zh_CN
         * @param value 
         */
        public set normalPower(value: number) {
            if (this.materialData.normalPower != value) {
                this.materialData.normalPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * @returns number 
         */
        public get normalPower(): number {
            return this.materialData.normalPower;
        }

        /**
         * @language zh_CN
         * @param value 
         */
        public set castShadow(value: boolean) {
            this.materialData.castShadow  = value;
            if (value) {
                if (!ShadowRender.frameBuffer) {
                    alert("要使用shadow view3D.useShadow = true ");
                } else {
                    if (!this.shadowPass)
                        this.shadowPass = new ShadowMapPass(this.materialData);
                }
            }
        }

        /**
         * @language zh_CN
         * @returns boolean 
         */
        public get castShadow(): boolean {
            return this.materialData.castShadow ;
        }

        /**
         * @language zh_CN
         * @param value 
         */
        public set acceptShadow(value: boolean) {
            this.materialData.acceptShadow = value;
        }

        /**
         * @language zh_CN
         * @returns boolean 
         */
        public get acceptShadow(): boolean {
            return this.materialData.acceptShadow;
        }

        public set smooth(val:boolean) {
            this.materialData.smooth = val;
        }

        public get smooth(): boolean {
            return this.materialData.smooth; 
        }
        public set blendMode(value: BlendMode) {
            this.materialData.blendMode = value;
            switch (value) {
                case BlendMode.NORMAL:
                    this.materialData.blend_src = Egret3DDrive.ONE;
                    this.materialData.blend_dest = Egret3DDrive.ZERO;
                    break;
                case BlendMode.LAYER:
                    this.materialData.blend_src = Egret3DDrive.SRC_ALPHA;
                    this.materialData.blend_dest = Egret3DDrive.ZERO;
                    this.materialData.alphaBlending = true ;
                    break;
                case BlendMode.MULTIPLY:
                    this.materialData.blend_src = Egret3DDrive.ZERO;
                    this.materialData.blend_dest = Egret3DDrive.SRC_COLOR;
                    this.materialData.alphaBlending = true;
                    break;
                case BlendMode.ADD:
                    this.materialData.blend_src = Egret3DDrive.SRC_ALPHA;
                    this.materialData.blend_dest = Egret3DDrive.ONE;
                    this.materialData.alphaBlending = true ;
                    break;
                case BlendMode.ALPHA:
                    this.materialData.blend_src = Egret3DDrive.SRC_ALPHA;
                    this.materialData.blend_dest = Egret3DDrive.ONE_MINUS_SRC_ALPHA;
                    this.materialData.alphaBlending = true;
                    break;
                case BlendMode.SCREEN:
                    this.materialData.blend_src = Egret3DDrive.ONE;
                    this.materialData.blend_dest = Egret3DDrive.ONE_MINUS_SRC_COLOR;
                    break;
            }
        }

        /**
         * @language zh_CN
         * @param color 
         * @param thickness 
         */
        public setOutlineStyler(color: number, thickness: number) {
            if (!this.outLinePass){
                //this.outLinePass = new OutLinePass();
            }
        }

        /**
         * @language zh_CN
         * @param value 
         */
        public set depthTest(value: boolean) {
            this.materialData.depthTest = value; 
        }

        /**
         * @language zh_CN
         * @returns boolean 
         */
        public get depthTest(): boolean {
            return this.materialData.depthTest; 
        }

        /**
         * @language zh_CN
         * @returns BlendMode 
         */
        public get blendMode(): BlendMode {
            return this.materialData.blendMode ;
        }

        /**
         * @language zh_CN
         * @param lightGroup 
         */
        public set lightGroup(lightGroup: LightGroup) {
            this.materialData.directLightList = lightGroup.directLightList;
            this.materialData.sportLightList = lightGroup.spotLightList;
            this.materialData.pointLightList = lightGroup.pointLightList;
        }

        /**
         * @language zh_CN
         * @param texture 
         */
        public set diffuseTexture(texture: TextureBase) {
            if (texture) {
                this.materialData.diffuseTex = texture;
                this.materialData.textureChange = true;
            }
        }

        /**
         * @language zh_CN
         * @returns TextureBase 
         */
        public get diffuseTexture(): TextureBase {
            return this.materialData.diffuseTex;
        }

        /**
         * @language zh_CN
         * @param texture 
         */
        public set normalTexture(texture: TextureBase) {
            if (texture) {
                this.materialData.normalTex = texture;
                this.materialData.textureChange = true;
                if (this.materialData.matType != MaterialType.DIFFUSE_BUMP) {
                    this.materialData.matType = MaterialType.DIFFUSE_BUMP; 
                    this.materialData.passChange = true ;
                }
            }
        }

        /**
         * @language zh_CN
         * @param texture 
         */
        public set specularTexture(texture: TextureBase) {
            if (texture) {
                this.materialData.specularTex = texture;
                this.materialData.textureChange = true;
                if (this.materialData.matType != MaterialType.DIFFUSE_BUMP_SPECULAR) {
                    this.materialData.matType = MaterialType.DIFFUSE_BUMP_SPECULAR;
                    this.materialData.passChange = true ;
                }
            }
        }

        /**
         * @language zh_CN
         * @returns MaterialBase 
         */
        public clone(): MaterialBase {
            var mat: MaterialBase = new MaterialBase(this.materialData.clone());
            return mat;
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param camera3D 
         * @param modelMatrix 
         * @param geometry 
         * @param animation 
         */
        public activateDiffusePass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation) {
            if (this.outLinePass){
                this.outLinePass.initShader(context3D, geometry, animation);
                this.outLinePass.activate(context3D, modelMatrix, camera3D, geometry, animation);
            }
            this.diffusePass.initShader(context3D, geometry, animation);
            this.diffusePass.activate(context3D, modelMatrix, camera3D, geometry, animation);
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param camera3D 
         * @param modelMatrix 
         * @param geometry 
         * @param animation 
         */
        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4,geometry:GeometryBase , animation: IAnimation ) {
            if (this.outLinePass) {
                this.outLinePass.draw(context3D, modelMatrix, camera3D, geometry, animation);
            }
            if (!this.materialData.passChange) {
                this.diffusePass.draw(context3D, modelMatrix, camera3D, geometry, animation);
            } else {
                this.activateDiffusePass(context3D, camera3D, modelMatrix, geometry, animation);
                this.materialData.passChange = false ;
            }
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param camera3D 
         * @param modelMatrix 
         * @param geometry 
         * @param animation 
         */
        public activateShadowPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase,animation: IAnimation ) {
            this.shadowPass.initShader(context3D, geometry, animation);
            this.shadowPass.activate(context3D, modelMatrix, camera3D, geometry , animation );
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param camera3D 
         * @param modelMatrix 
         * @param geometry 
         * @param animation 
         */
        public rendenShadowPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase,animation: IAnimation ) {
            if (!this.materialData.passChange) {
                this.shadowPass.draw(context3D, modelMatrix, camera3D, geometry, animation)
            } else {
                this.activateShadowPass(context3D, camera3D, modelMatrix, geometry, animation);
            }
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param camera3D 
         * @param modelMatrix 
         * @param geometry 
         * @param animation 
         */
        public activateNormalPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation ) {
            this.normalPass.initShader(context3D, geometry, animation);
            this.normalPass.activate(context3D, modelMatrix, camera3D, geometry,  animation );
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param camera3D 
         * @param modelMatrix 
         * @param geometry 
         * @param animation 
         */
        public rendenNormalPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation  ) {
            //if (this.materialData._NormalActiveState) {
            //    this.normalPass.draw(context3D, modelMatrix, camera3D,geometry, animation )
            //} else {
            //    this.materialData._NormalActiveState = true;
            //    this.activateNormalPass(context3D, camera3D,modelMatrix,geometry, animation);
            //}
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param camera3D 
         * @param modelMatrix 
         * @param geometry 
         * @param animation 
         */
        public activateDepthPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation) {
            this.depthPass.initShader(context3D, geometry, animation);
            this.depthPass.activate(context3D, modelMatrix, camera3D, geometry, animation);
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param camera3D 
         * @param modelMatrix 
         * @param geometry 
         * @param animation 
         */
        public rendenDepthPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation) {
            //if (this.materialData._DepthActiveState) {
            //    this.depthPass.draw(context3D, modelMatrix, camera3D, geometry, animation)
            //} else {
            //    this.materialData._DepthActiveState = true;
            //    this.activateDepthPass(context3D, camera3D, modelMatrix, geometry, animation);
            //}
        }
      
    }
} 