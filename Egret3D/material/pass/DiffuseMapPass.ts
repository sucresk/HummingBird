module Egret3D {

     /**
     * @class Egret3D.DiffuseMapPass
     * @classdesc
     * 漫反射贴图通道渲染器
     */
    export class DiffuseMapPass extends MaterialPassBase {

        /**
         * @language zh_CN
         * @param data 
         */
        constructor(data: MaterialData) {
            super(data);
        }
           
        /**
         * @language zh_CN
         * 初始化
         */
        public initUseMethod() {
            var i: number = 0;

            this.materialData.diffusePassUsageData.directLightData = new Float32Array(this.materialData.directLightList.length * DirectLight.stride);
            this.materialData.diffusePassUsageData.sportLightData = new Float32Array(this.materialData.sportLightList.length * SpotLight.stride);
            this.materialData.diffusePassUsageData.pointLightData = new Float32Array(this.materialData.pointLightList.length * PointLight.stride);

            this.diffuseMethod = new DiffuseMethod();
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
                if (this.animation.animaNodeCollection){
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

            if (this.materialData.acceptShadow && this.shadowMaping) {
                this.pixelShader.addMethod(this.shadowMaping);
                this.vertexShader.addShader(this.shadowMaping.vertexMethodName);
                this.pixelShader.addShader(  this.shadowMaping.fragMethodName);
            }

            this.pixelShader.addShader("diffuse_fragmentEnd");

            if (this.effectMethodList){
                for (var i: number = 0; i < this.effectMethodList.length; i++) {
                    this.pixelShader.addEffectMethod(this.effectMethodList[i]);
                    this.pixelShader.addShader(this.effectMethodList[i].fragMethodName);
                }
            }

  
            
        }

        /**
        * 初始化 shader 的地方
        */
        /**
         * @language zh_CN
         * 初始化 shader 的地方
         * @param context3D 
         * @param geometry 
         * @param animation 
         */
        public initShader(context3D: Context3D, geometry: GeometryBase, animation: IAnimation) {
            super.initShader(context3D, geometry, animation);

            this.vertexShader = new VertexShader(this.materialData, this.materialData.diffusePassUsageData);
            this.pixelShader = new PixelShader(this.materialData, this.materialData.diffusePassUsageData);

            this.materialData.context3D = context3D;
            
          
            this.vertexShader.setVertexShader(geometry);
            this.initUseMethod();

            if (animation) {
                animation.initShader( this.vertexShader , this.pixelShader );
            }

            this.vertexShader.build();
            this.pixelShader.build();

            var vs: string = this.vertexShader.getShaderSource();
            var fs: string = this.pixelShader.getShaderSource() ;

            var vs_shader: Shader = context3D.creatVertexShader(vs);
            var fs_shader: Shader = context3D.creatFragmentShader(fs);

            this.materialData.diffusePassUsageData.program3D = context3D.creatProgram(vs_shader, fs_shader);
            this.context3DChange = true;
        }

        /**
         * @language zh_CN
         * 重置纹理
         */
        protected resetTexture() {
            //--------texture----------------
            var sampler2D: GLSL.Sampler2D;
            for (var index in this.materialData.diffusePassUsageData.sampler2DList) {
                sampler2D = this.materialData.diffusePassUsageData.sampler2DList[index];
                if (this.materialData[sampler2D.varName]) {
                    sampler2D.texture = this.materialData[sampler2D.varName];
                }
            }

            var sampler3D: GLSL.Sampler3D;
            for (var index in this.materialData.diffusePassUsageData.sampler3DList) {
                sampler3D = this.materialData.diffusePassUsageData.sampler3DList[index];
                if (this.materialData[sampler3D.varName]) {
                    sampler3D.texture = this.materialData[sampler3D.varName];
                }
            }
            this.materialData.textureChange = false; 
        }   

        /**
         * @language zh_CN
         * 激活
         * @param context3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {

            this.materialData.diffusePassUsageData.uniform_materialSource.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, this.materialData.diffusePassUsageData.uniform_materialSource.varName);

            if (this.materialData.directLightList.length > 0) {
               this.materialData.diffusePassUsageData.uniform_directLightSource.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, this.materialData.diffusePassUsageData.uniform_directLightSource.varName);
            }
            if (this.materialData.sportLightList.length > 0) {
               this.materialData.diffusePassUsageData.uniform_sportLightSource.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, this.materialData.diffusePassUsageData.uniform_sportLightSource.varName);
            }
            if (this.materialData.pointLightList.length > 0) {
               this.materialData.diffusePassUsageData.uniform_pointLightSource.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, this.materialData.diffusePassUsageData.uniform_pointLightSource.varName);
            }

            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.vsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.vsMethodList[this.index].activate(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.fsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.fsMethodList[this.index].activate(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.effectMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.effectMethodList[this.index].activateEffect(context3D, this.materialData.diffusePassUsageData, this.materialData , modeltransform, camera3D, geometry, animation);
            }

            this.resetTexture();

            //--------texture----------------
            var sampler2D: GLSL.Sampler2D;
            for (var index in this.materialData.diffusePassUsageData.sampler2DList) {
                sampler2D = this.materialData.diffusePassUsageData.sampler2DList[index];
                sampler2D.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, sampler2D.varName);
            }

                  //--------texture----------------
            var sampler3D: GLSL.Sampler3D;
            for (var index in this.materialData.diffusePassUsageData.sampler3DList) {
                sampler3D = this.materialData.diffusePassUsageData.sampler3DList[index];
                sampler3D.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, sampler3D.varName);
            }

        }

        /**
         * @language zh_CN
         */
        public index: number = 0;
        /**
         * @language zh_CN
         * 绘制
         * @param context3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public draw(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {

            context3D.gl.useProgram(this.materialData.diffusePassUsageData.program3D.program);
            super.draw(context3D, modeltransform, camera3D, geometry, animation);
            var i: number = 0;
   
            if (this.materialData.materialDataNeedChange) {
                this.materialData.diffusePassUsageData.materialSourceData[0] = (this.materialData.diffuseColor >> 16 & 0xff) / 255.0;
                this.materialData.diffusePassUsageData.materialSourceData[1] = (this.materialData.diffuseColor >> 8 & 0xff) / 255.0;
                this.materialData.diffusePassUsageData.materialSourceData[2] = (this.materialData.diffuseColor & 0xff) / 255.0;

                this.materialData.diffusePassUsageData.materialSourceData[3] = (this.materialData.ambientColor >> 16 & 0xff)/255.0 ;
                this.materialData.diffusePassUsageData.materialSourceData[4] = (this.materialData.ambientColor >> 8 & 0xff)/255.0 ;
                this.materialData.diffusePassUsageData.materialSourceData[5] = (this.materialData.ambientColor & 0xff)/255.0 ;

                this.materialData.diffusePassUsageData.materialSourceData[6] = (this.materialData.specularColor >> 16 & 0xff) / 255.0;
                this.materialData.diffusePassUsageData.materialSourceData[7] = (this.materialData.specularColor >> 8 & 0xff) / 255.0;
                this.materialData.diffusePassUsageData.materialSourceData[8] = (this.materialData.specularColor & 0xff)/255.0;

                this.materialData.diffusePassUsageData.materialSourceData[9] = this.materialData.alpha;
                this.materialData.diffusePassUsageData.materialSourceData[10] = this.materialData.cutAlpha;
                this.materialData.diffusePassUsageData.materialSourceData[11] = this.materialData.shininess;

                this.materialData.diffusePassUsageData.materialSourceData[12] = this.materialData.diffusePower;
                this.materialData.diffusePassUsageData.materialSourceData[13] = this.materialData.specularPower;
                this.materialData.diffusePassUsageData.materialSourceData[14] = this.materialData.ambientPower;
                this.materialData.diffusePassUsageData.materialSourceData[15] = this.materialData.normalPower ; //保留
            }
            context3D.gl.uniform1fv(this.materialData.diffusePassUsageData.uniform_materialSource.uniformIndex, this.materialData.diffusePassUsageData.materialSourceData);
            
            //texture 2D
            var sampler2D: GLSL.Sampler2D;
            for (var index in this.materialData.diffusePassUsageData.sampler2DList) {
                sampler2D = this.materialData.diffusePassUsageData.sampler2DList[index];
                if (this.materialData.materialDataNeedChange) {
                    var min_filter: number = this.materialData.smooth ? context3D.gl.LINEAR_MIPMAP_LINEAR : context3D.gl.LINEAR ;
                    var mag_filter: number = this.materialData.smooth ? context3D.gl.LINEAR_MIPMAP_LINEAR : context3D.gl.LINEAR;
                    
                    var wrap_u_filter: number = this.materialData.repeat ? context3D.gl.REPEAT : context3D.gl.CLAMP_TO_EDGE  ;
                    var wrap_v_filter: number = this.materialData.repeat ? context3D.gl.REPEAT : context3D.gl.CLAMP_TO_EDGE　;
                    context3D.setTexture2DSamplerState(min_filter, mag_filter, wrap_u_filter, wrap_v_filter);
                    this.materialData.materialDataNeedChange = false;
                }
                context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture);
            }

            var sampler3D: GLSL.Sampler3D;
            for (var index in this.materialData.diffusePassUsageData.sampler3DList) {
                sampler3D = this.materialData.diffusePassUsageData.sampler3DList[index];
                context3D.setCubeTextureAt(sampler3D.activeTextureIndex, sampler3D.uniformIndex, sampler3D.index, sampler3D.texture.cubeTexture);
            }

            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.vsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.vsMethodList[this.index].updata(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }

            if (this.materialData.diffusePassUsageData.uniform_directLightSource){
                for (i = 0; i < this.materialData.directLightList.length; i++) {
                    this.materialData.directLightList[i].updateLightData(i, this.materialData.diffusePassUsageData.directLightData);
                }
                context3D.gl.uniform1fv(this.materialData.diffusePassUsageData.uniform_directLightSource.uniformIndex, this.materialData.diffusePassUsageData.directLightData);
            }

            if (this.materialData.diffusePassUsageData.uniform_sportLightSource){
                for (i = 0; i < this.materialData.sportLightList.length; i++) {
                    this.materialData.sportLightList[i].updateLightData(i, this.materialData.diffusePassUsageData.sportLightData);
                }
                context3D.gl.uniform1fv(this.materialData.diffusePassUsageData.uniform_sportLightSource.uniformIndex, this.materialData.diffusePassUsageData.sportLightData);
            }

            if (this.materialData.diffusePassUsageData.uniform_pointLightSource){
                for (i = 0; i < this.materialData.pointLightList.length; i++) {
                    this.materialData.pointLightList[i].updateLightData(i, this.materialData.diffusePassUsageData.pointLightData);
                }
                context3D.gl.uniform1fv(this.materialData.diffusePassUsageData.uniform_pointLightSource.uniformIndex, this.materialData.diffusePassUsageData.pointLightData);
            }

            if (this.context3DChange) {
                this.activate(context3D, modeltransform, camera3D,geometry, animation);
                this.context3DChange = false;
            }

            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.vsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.vsMethodList[this.index].updata(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D, geometry, animation );
            }

            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.fsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.fsMethodList[this.index].updata(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D, geometry, animation );
            }

            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.effectMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.effectMethodList[this.index].updataEffect(context3D, this.materialData.diffusePassUsageData, this.materialData , modeltransform, camera3D, geometry, animation);
            }

            context3D.gl.bindBuffer(Egret3DDrive.ELEMENT_ARRAY_BUFFER, geometry.sharedIndexBuffer.buffer);
            context3D.gl.drawElements(this.materialData.drawMode, geometry.numItems, Egret3DDrive.UNSIGNED_SHORT, 0);
            if (this.materialData.alphaBlending) 
                context3D.gl.depthMask(true);

            for (var index in this.materialData.diffusePassUsageData.sampler2DList) {
             //sampler2D = this.materialData.defaultPassUsageData.sampler2DList[index];
             //sampler2D.texture = this.materialData[sampler2D.varName]
             //sampler2D.texture.upload(context3D);
             //context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture);
             //context3D.gl.bindTexture();
             context3D.gl.bindTexture(context3D.gl.TEXTURE_2D, null );
           }
        }
    }
} 