module Egret3D {
    
    export class TerrainMapPass extends DiffuseMapPass {

        constructor(data: MaterialData) {
            super(data);

            this.diffuseMethod = new TerrainMethod();
        }

        public initUseMethod() {
            var i: number = 0;

            this.materialData.diffusePassUsageData.directLightData = new Float32Array(this.materialData.directLightList.length * DirectLight.stride);
            this.materialData.diffusePassUsageData.sportLightData = new Float32Array(this.materialData.sportLightList.length * SpotLight.stride);
            this.materialData.diffusePassUsageData.pointLightData = new Float32Array(this.materialData.pointLightList.length * PointLight.stride);

           
            this.pixelShader.addMethod(this.diffuseMethod);
            this.pixelShader.addShader(this.diffuseMethod.fragMethodName);


            if (this.materialData.matType == MaterialType.DIFFUSE) {
                this.pixelShader.addShader("diffuseMap_fragment");
            } else if (this.materialData.matType == MaterialType.DIFFUSE_BUMP) {
                this.pixelShader.addShader("diffuseMap_fragment");
                this.pixelShader.addShader("normalMap_fragment");
            } else if (this.materialData.matType == MaterialType.DIFFUSE_BUMP_SPECULAR) {
                this.pixelShader.addShader("diffuseMap_fragment");
                this.pixelShader.addShader("normalMap_fragment");
                this.pixelShader.addShader("specularMap_fragment");
            }

            this.pixelShader.addShader("terrainRGBA_fragment");

            for (i = 0; i < this.materialData.directLightList.length; i++) {
                this.pixelShader.addShader("directLight_fragment");
            }

            for (i = 0; i < this.materialData.sportLightList.length; i++) {
                this.pixelShader.addShader("sportLight_fragment");
            }

            for (i = 0; i < this.materialData.pointLightList.length; i++) {
                this.pixelShader.addShader("pointLight_fragment");
            }

            if (this.animation) {
                if (this.animation.animaNodeCollection) {
                    var vsShaderNames: string[] = this.animation.animaNodeCollection.getNodesVertexShaders();
                    var fsShaderNames: string[] = this.animation.animaNodeCollection.getNodesFragmentShaders();
                    for (i = 0; i < vsShaderNames.length; i++) {
                        this.vertexShader.addShader(vsShaderNames[i]);
                    }
                    for (i = 0; i < fsShaderNames.length; i++) {
                        this.pixelShader.addShader(fsShaderNames[i]);
                    }
                }
            }
            this.pixelShader.addShader("diffuse_fragmentEnd");

            if (this.effectMethodList) {
                for (var i: number = 0; i < this.effectMethodList.length; i++) {
                    this.pixelShader.addEffectMethod(this.effectMethodList[i]);
                    this.pixelShader.addShader(this.effectMethodList[i].fragMethodName);
                }
            }

            if (this.materialData.acceptShadow) {
                var shadowMapingMethod: ShadowMapingMethod = new ShadowMapingMethod();
                this.pixelShader.addMethod(shadowMapingMethod);
                this.vertexShader.addShader(shadowMapingMethod.vertexMethodName);
                this.pixelShader.addShader(shadowMapingMethod.fragMethodName);
            }

        }
    }
} 