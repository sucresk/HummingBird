module Egret3D {
    export enum MaterialType { DIFFUSE, DIFFUSE_BUMP, DIFFUSE_BUMP_SPECULAR, RGBATERRAIN }
    export class MaterialBase {

        public materialData: MaterialData;

        public diffusePass: MaterialPassBase;
        public shadowPass    : ShadowMapPass ;

        public normalPass: NormalMapPass;
        public depthPass: DepthMapPass;
        public positionPass: MaterialPassBase;

        public outLinePass: MaterialPassBase;
        constructor(materialData: MaterialData = null) {
            if (materialData == null) {
                this.materialData = new MaterialData();
                this.materialData.diffusePassUsageData.materialSourceData = new Float32Array(16);
            } else {
                this.materialData = materialData; 
            }
            this.setData(this.materialData);
            
        }

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

        public getData(): MaterialData {
            return this.materialData; 
        }

        public set openRtt(flag: boolean) {
            if (flag) {
                this.normalPass = new NormalMapPass(this.materialData);
                this.depthPass = new DepthMapPass(this.materialData);
            }
            else {
            }
        }

        public addDiffusePassMothod(method: MethodBase) {
            this.diffusePass.addMethod(method);
        }

        public addDiffusePassEffectMothod(method: EffectMethod) {
            this.diffusePass.addEffectMethod(method);
        }

        public set diffuseColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.diffuseColor = color ;
        }

        public set ambientColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.ambientColor = color;
        }

        public set specularColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.specularColor = color;
        }


        public set alpha(value: number) {
            if (this.materialData.alpha != value){
                this.materialData.alpha = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        public get alpha(): number {
            return this.materialData.alpha;
        }

        public set shininess(value: number) {
            if (this.materialData.shininess != value) {
                this.materialData.shininess = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        public get shininess(): number {
            return this.materialData.shininess;
        }


        public set specularPower(value: number) {
            if (this.materialData.specularPower != value) {
                this.materialData.specularPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        public get specularPower(): number {
            return this.materialData.specularPower;
        }

        public set ambientPower(value: number) {
            if (this.materialData.ambientPower != value) {
                this.materialData.ambientPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        public get ambientPower(): number {
            return this.materialData.ambientPower;
        }
        

        public set diffusePower(value: number) {
            if (this.materialData.diffusePower != value) {
                this.materialData.diffusePower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        public get diffusePower(): number {
            return this.materialData.diffusePower;
        }

        public set normalPower(value: number) {
            if (this.materialData.normalPower != value) {
                this.materialData.normalPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        public get normalPower(): number {
            return this.materialData.normalPower;
        }

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

        public get castShadow(): boolean {
            return this.materialData.castShadow ;
        }

        public set acceptShadow(value: boolean) {
            this.materialData.acceptShadow = value;
        }

        public get acceptShadow(): boolean {
            return this.materialData.acceptShadow;
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

        public setOutlineStyler(color: number, thickness: number) {
            if (!this.outLinePass){
                //this.outLinePass = new OutLinePass();
            }
            this.outLinePass
        }

        public set depthTest(value: boolean) {
            this.materialData.depthTest = value; 
        }

        public get depthTest(): boolean {
            return this.materialData.depthTest; 
        }

        public get blendMode(): BlendMode {
            return this.materialData.blendMode ;
        }

        public set lightGroup(lightGroup: LightGroup) {
            this.materialData.directLightList = lightGroup.directLightList;
            this.materialData.sportLightList = lightGroup.spotLightList;
            this.materialData.pointLightList = lightGroup.pointLightList;
        }

        public set diffuseTexture(texture: TextureBase) {
            if (texture) {
                this.materialData.diffuseTex = texture;
                this.materialData.textureChange = true;
               // this.materialData.matType = MaterialType.DIFFUSE; 
            }
        }

        public get diffuseTexture(): TextureBase {
            return this.materialData.diffuseTex;
        }

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

        public clone(): MaterialBase {
            var mat: MaterialBase = new MaterialBase(this.materialData.clone());
            return mat;
        }

        public activateDiffusePass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation) {
            if (this.outLinePass){
                this.outLinePass.initShader(context3D, geometry, animation);
                this.outLinePass.activate(context3D, modelMatrix, camera3D, geometry, animation);
            }
            this.diffusePass.initShader(context3D, geometry, animation);
            this.diffusePass.activate(context3D, modelMatrix, camera3D, geometry, animation);
        }

        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4,geometry:GeometryBase , animation: IAnimation ) {
            if (this.outLinePass) {
                this.outLinePass.draw(context3D, modelMatrix, camera3D, geometry, animation)
            }
            if (!this.materialData.passChange) {
                this.diffusePass.draw(context3D, modelMatrix, camera3D, geometry, animation)
            } else {
                this.activateDiffusePass(context3D, camera3D, modelMatrix, geometry, animation);
                this.materialData.passChange = false ;
            }
        }

        public activateShadowPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase,animation: IAnimation ) {
            this.shadowPass.initShader(context3D, geometry, animation);
            this.shadowPass.activate(context3D, modelMatrix, camera3D, geometry , animation );
        }

        public rendenShadowPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase,animation: IAnimation ) {
            if (!this.materialData.passChange) {
                this.shadowPass.draw(context3D, modelMatrix, camera3D, geometry, animation)
            } else {
                this.activateShadowPass(context3D, camera3D, modelMatrix, geometry, animation);
            }
        }

        public activateNormalPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation ) {
            this.normalPass.initShader(context3D, geometry, animation);
            this.normalPass.activate(context3D, modelMatrix, camera3D, geometry,  animation );
        }

        public rendenNormalPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation  ) {
            //if (this.materialData._NormalActiveState) {
            //    this.normalPass.draw(context3D, modelMatrix, camera3D,geometry, animation )
            //} else {
            //    this.materialData._NormalActiveState = true;
            //    this.activateNormalPass(context3D, camera3D,modelMatrix,geometry, animation);
            //}
        }

        public activateDepthPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation) {
            this.depthPass.initShader(context3D, geometry, animation);
            this.depthPass.activate(context3D, modelMatrix, camera3D, geometry, animation);
        }

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