module BlackSwan {
    export class MaterialBase {

        public materialData: MaterialData;

        public diffusePass   : DiffuseMapPass;
        public shadowPass    : ShadowMapPass ;

        public normalPass: NormalMapPass;
        public depthPass: DepthMapPass;

        public positionPass: MaterialPassBase;

        constructor() {
            this.materialData = new MaterialData();
            this.materialData.defaultPassUsageData.materialSourceData = new Float32Array(12);
            this.ambientColor = 0xff767e96;

            this.normalPass = new NormalMapPass(this.materialData);
            this.depthPass = new DepthMapPass( this.materialData );
        }

        public set diffuseColor(color: number) {
            this.materialData.materialDataNeedChange = true;

            this.materialData.diffuseColor.w = (color >> 24 & 0xff) / 255;
            this.materialData.diffuseColor.x = (color >> 16 & 0xff) / 255;
            this.materialData.diffuseColor.y = (color >> 8 & 0xff) / 255;
            this.materialData.diffuseColor.z = (color & 0xff) / 255;
        }

        public set ambientColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.ambientColor.w = (color >> 24 & 0xff) / 255;
            this.materialData.ambientColor.x = (color >> 16 & 0xff) / 255;
            this.materialData.ambientColor.y = (color >> 8 & 0xff) / 255;
            this.materialData.ambientColor.z = (color & 0xff) / 255;
        }

        public set specularColor(color: number) {
            this.materialData.materialDataNeedChange = true;

            this.materialData.specularColor.w = (color >> 24 & 0xff) / 255;
            this.materialData.specularColor.x = (color >> 16 & 0xff) / 255;
            this.materialData.specularColor.y = (color >> 8 & 0xff) / 255;
            this.materialData.specularColor.z = (color & 0xff) / 255;
        }

        public set castShadow(value: boolean) {
            this.materialData.castShadow  = value;
            if (value) {
               if (!this.shadowPass)
                   this.shadowPass = new ShadowMapPass(this.materialData);
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

        public set alpha(value: number) {
            this.materialData.alpha = value;
        }

        public get alpha(): number {
            return this.materialData.alpha;
        }

        public set blendMode(value: BlendMode) {
            this.materialData.blendMode = value;
            switch (value) {
                case BlendMode.NORMAL:
                    this.materialData.blend_src = Egret3D.ONE;
                    this.materialData.blend_dest = Egret3D.ZERO;
                    break;
                case BlendMode.LAYER:
                    this.materialData.blend_src = Egret3D.SRC_ALPHA;
                    this.materialData.blend_dest = Egret3D.ONE_MINUS_SRC_ALPHA;
                    break;
                case BlendMode.MULTIPLY:
                    this.materialData.blend_src = Egret3D.ZERO;
                    this.materialData.blend_dest = Egret3D.SRC_COLOR;
                    break;
                case BlendMode.ADD:
                    this.materialData.blend_src = Egret3D.SRC_ALPHA;
                    this.materialData.blend_dest = Egret3D.ONE;
                    break;
                case BlendMode.ALPHA:
                    this.materialData.blend_src = Egret3D.SRC_ALPHA;
                    this.materialData.blend_dest = Egret3D.ONE_MINUS_SRC_ALPHA;
                    break;
                case BlendMode.SCREEN:
                    this.materialData.blend_src = Egret3D.ONE;
                    this.materialData.blend_dest = Egret3D.ONE_MINUS_SRC_COLOR;
                    break;
            }
        }

        public get blendMode(): BlendMode {
            return this.materialData.blendMode ;
        }

        public set lightGroup(lightGroup: LightGroup) {
            this.materialData.directLightList = lightGroup.directLightList;
            this.materialData.sportLightList = lightGroup.spotLightList;
            this.materialData.pointLightList = lightGroup.pointLightList;
        }

        //public initPassShader(passType:PassType, context3D:Context3D, geomtry: GeomtryBase) {
        //    switch (passType) {
        //        case PassType.Shadow:
        //            this.shadowPass.initShader(context3D, geomtry);
        //            break;
        //        default:
        //            this.diffusePass.initShader(context3D, geomtry);
        //            break;
        //    }
        //}

        public set diffuseTexture(texture: TextureBase) {
            if (texture)
                this.materialData.diffuseTex = texture;
        }

        public set normalTexture(texture: TextureBase) {
            if (texture)
                this.materialData.normalTex = texture;
        }

        public set specularTexture(texture: TextureBase) {
            if (texture)
                this.materialData.specularTex = texture;
        }

        public activateDiffusePass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeomtryBase,animation:IAnimation ) {
            this.diffusePass.initShader(context3D, geometry );
            //this._geomtry.activate(context3D, this.modelMatrix, camera3D);
            this.diffusePass.activate(context3D, modelMatrix, camera3D, geometry, animation);
        }

        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4,geometry:GeomtryBase , animation: IAnimation ) {
            if (this.materialData._diffuseActiveState) {
                this.diffusePass.draw(context3D, modelMatrix, camera3D, geometry, animation)
            } else {
                this.materialData._diffuseActiveState = true;
                this.activateDiffusePass(context3D, camera3D, modelMatrix, geometry, animation);
            }
        }

        public activateShadowPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeomtryBase,animation: IAnimation ) {
            this.shadowPass.initShader( context3D, geometry );
            this.shadowPass.activate(context3D, modelMatrix, camera3D, geometry , animation );
        }

        public rendenShadowPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeomtryBase,animation: IAnimation ) {
            if (this.materialData._ShadowActiveState) {
                this.shadowPass.draw(context3D, modelMatrix, camera3D, geometry,  animation);
            } else {
                this.materialData._ShadowActiveState = true;
                this.activateShadowPass(context3D, camera3D, modelMatrix, geometry,  animation);
            }
        }


        public activateNormalPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeomtryBase, animation: IAnimation ) {
            this.normalPass.initShader(context3D, geometry );
            //this._geomtry.activate(context3D, this.modelMatrix, camera3D);
            this.normalPass.activate(context3D, modelMatrix, camera3D, geometry,  animation );
        }

        public rendenNormalPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeomtryBase, animation: IAnimation  ) {
            if (this.materialData._NormalActiveState) {
                //context3D.enableDepthTest(true, 0);
                //context3D.enbable(Egret3D.BLEND);
                this.normalPass.draw(context3D, modelMatrix, camera3D,geometry, animation )
            } else {
                this.materialData._NormalActiveState = true;
                this.activateNormalPass(context3D, camera3D,modelMatrix,geometry, animation);
            }
        }

        public activateDepthPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeomtryBase, animation: IAnimation) {
            this.depthPass.initShader(context3D, geometry);
            //this._geomtry.activate(context3D, this.modelMatrix, camera3D);
            this.depthPass.activate(context3D, modelMatrix, camera3D, geometry, animation);
        }

        public rendenDepthPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeomtryBase, animation: IAnimation) {
            if (this.materialData._DepthActiveState) {
                //context3D.enableDepthTest(true, 0);
                //context3D.enbable(Egret3D.BLEND);
                this.depthPass.draw(context3D, modelMatrix, camera3D, geometry, animation)
            } else {
                this.materialData._DepthActiveState = true;
                this.activateDepthPass(context3D, camera3D, modelMatrix, geometry, animation);
            }
        }
      
    }
} 