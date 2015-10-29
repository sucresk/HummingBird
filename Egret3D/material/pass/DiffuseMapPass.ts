module BlackSwan {
    export class DiffuseMapPass extends MaterialPassBase {

        private diffuseMethod: DiffuseMethod;
        constructor(data: MaterialData) {
            super(data);
           
           
        }
           
        public initUseMethod() {
            var i: number = 0;

            this.materialData.defaultPassUsageData.directLightData = new Float32Array(this.materialData.directLightList.length * DirectLight.stride);
            this.materialData.defaultPassUsageData.sportLightData = new Float32Array(this.materialData.sportLightList.length * SpotLight.stride);
            this.materialData.defaultPassUsageData.pointLightData = new Float32Array(this.materialData.pointLightList.length * PointLight.stride);

            this.diffuseMethod = new DiffuseMethod();
            this.pixelShader.addMethod(this.diffuseMethod);
            this.pixelShader.addShader(this.diffuseMethod.fragMethodName);

            if (this.materialData.useDiuufseMap) {
                this.pixelShader.addShader("diffuseMap_fragment");
            }

            if (this.materialData.useNormalMap) {
                this.pixelShader.addShader("normalMap_fragment");
            }

            if (this.materialData.useSpecularMap) {
                this.pixelShader.addShader("specularMap_fragment");
            }

            for (i = 0; i < this.materialData.directLightList.length; i++) {
                this.pixelShader.addShader("directLight_fragment");
            }

            for (i = 0; i < this.materialData.sportLightList.length; i++) {
                this.pixelShader.addShader("sportLight_fragment");
            }

            for (i = 0; i < this.materialData.pointLightList.length; i++) {
                this.pixelShader.addShader("pointLight_fragment");
            }

            if (this.materialData.acceptShadow) {
                var shadowMapingMethod: ShadowMapingMethod = new ShadowMapingMethod();
                this.pixelShader.addMethod(shadowMapingMethod);
                this.vertexShader.addShader(shadowMapingMethod.vertexMethodName);
                this.pixelShader.addShader(shadowMapingMethod.fragMethodName);
            }

        }

        /**
        * 初始化 shader 的地方
        **/
        public initShader(context3D: Context3D, geometry: GeomtryBase ) {

            this.vertexShader = new VertexShader(this.materialData, this.materialData.defaultPassUsageData, PassType.Diffuse);
            this.pixelShader = new PixelShader(this.materialData, this.materialData.defaultPassUsageData, PassType.Shadow);

            this.materialData.context3D = context3D;

            this.initUseMethod();

            this.vertexShader.build(geometry);
            this.pixelShader.build();

            var vs: string = this.vertexShader.getShaderSource();
            var fs: string = this.pixelShader.getShaderSource();

            var vs_shader: Shader = context3D.creatVertexShader(vs);
            var fs_shader: Shader = context3D.creatFragmentShader(fs);

            this.materialData.defaultPassUsageData.program3D = context3D.creatProgram(vs_shader, fs_shader);

            this.context3DChange = true;
        }

        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeomtryBase , animation: IAnimation ) {
            for (this.index = 0; this.index < this.materialData.defaultPassUsageData.vsMethodList.length; this.index++) {
                this.materialData.defaultPassUsageData.vsMethodList[this.index].activate(context3D, this.materialData.defaultPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
            for (this.index = 0; this.index < this.materialData.defaultPassUsageData.fsMethodList.length; this.index++) {
                this.materialData.defaultPassUsageData.fsMethodList[this.index].activate(context3D, this.materialData.defaultPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
        }

        public index: number = 0;
        public draw(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeomtryBase,animation: IAnimation ) {
           
            var i: number = 0;
            for (i = 0; i < this.materialData.directLightList.length; i++) {
                this.materialData.directLightList[i].updateLightData(i, this.materialData.defaultPassUsageData.directLightData);
            }

            for (i = 0; i < this.materialData.sportLightList.length; i++) {
                this.materialData.sportLightList[i].updateLightData(i, this.materialData.defaultPassUsageData.sportLightData);
            }

            for (i = 0; i < this.materialData.pointLightList.length; i++) {
                this.materialData.pointLightList[i].updateLightData(i, this.materialData.defaultPassUsageData.pointLightData);
            }

            if (this.context3DChange) {
                this.activate(context3D, modeltransform, camera3D,geometry, animation);
                this.context3DChange = false;
            }

           
            //context3D.setProgram(this.materialData.defaultPassUsageData.program3D);
            //context3D.enableDepthTest(true, 0);
            //context3D.enbable(Egret3D.BLEND);
            //context3D.enbable(Egret3D.CULL_FACE);+

            context3D.gl.useProgram(this.materialData.defaultPassUsageData.program3D.program);
            context3D.gl.enable(context3D.gl.DEPTH_TEST);
            context3D.gl.enable(Egret3D.BLEND);
            context3D.gl.enable(Egret3D.CULL_FACE)
            context3D.gl.cullFace(this.materialData.cullFrontOrBack);
           
            //context3D.setBlendFactors(this.materialData.blend_src, this.materialData.blend_dest);
            //context3D.gl.blendFunc(this.materialData.blend_src, this.materialData.blend_dest);
            for (this.index = 0; this.index < this.materialData.defaultPassUsageData.vsMethodList.length; this.index++) {
                this.materialData.defaultPassUsageData.vsMethodList[this.index].updata(context3D, this.materialData.defaultPassUsageData.program3D, modeltransform, camera3D, geometry, animation );
            }

            //return;

            for (this.index = 0; this.index < this.materialData.defaultPassUsageData.fsMethodList.length; this.index++) {
                this.materialData.defaultPassUsageData.fsMethodList[this.index].updata(context3D, this.materialData.defaultPassUsageData.program3D, modeltransform, camera3D, geometry, animation );
            }

            //context3D.drawElement(Egret3D.TRIANGLES, this.materialData.geomtryBase.sharedIndexBuffer, 0, this.materialData.geomtryBase.numItems);

            context3D.gl.bindBuffer(Egret3D.ELEMENT_ARRAY_BUFFER, geometry.sharedIndexBuffer.buffer);
            context3D.gl.drawElements(Egret3D.TRIANGLES, geometry.numItems, Egret3D.UNSIGNED_SHORT, 0 );
        }

    }
} 