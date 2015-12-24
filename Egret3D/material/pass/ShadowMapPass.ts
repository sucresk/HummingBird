module Egret3D {

     /**
     * @class Egret3D.ShadowMapPass
     * @classdesc
     * 阴影贴图通道渲染器
     */
    export class ShadowMapPass extends MaterialPassBase {
        /**
         * @language zh_CN
         * @param data 
         */
        constructor(data:MaterialData) {
            super(data);
        }

        /**
         * @language zh_CN
         * 初始化
         */
        public initUseMethod() {
            var i: number = 0;
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
            this.pixelShader.addShader("Shadow_fragment");
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

            this.vertexShader = new VertexShader(this.materialData, this.materialData.shadowPassUsageData);
            this.pixelShader = new PixelShader(this.materialData, this.materialData.shadowPassUsageData);

            this.materialData.context3D = context3D;

            this.vertexShader.setVertexShader(geometry);
            this.initUseMethod();

            if (animation) {
                animation.initShader(this.vertexShader, this.pixelShader);
            }

            this.vertexShader.build();
            this.pixelShader.build();

            var vs: string = this.vertexShader.getShaderSource();
            var fs: string = this.pixelShader.getShaderSource();

            var vs_shader: Shader = context3D.creatVertexShader(vs);
            var fs_shader: Shader = context3D.creatFragmentShader(fs);

            this.materialData.shadowPassUsageData.program3D = context3D.creatProgram(vs_shader, fs_shader);
            this.context3DChange = true;
        }

        private index: number;
        /**
         * @language zh_CN
         * 激活
         * @param context3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation ) {

            for (this.index = 0; this.index < this.materialData.shadowPassUsageData.vsMethodList.length; this.index++) {
                this.materialData.shadowPassUsageData.vsMethodList[this.index].activate(context3D, this.materialData.shadowPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
            for (this.index = 0; this.index < this.materialData.shadowPassUsageData.fsMethodList.length; this.index++) {
                this.materialData.shadowPassUsageData.fsMethodList[this.index].activate(context3D, this.materialData.shadowPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }

            //--------texture----------------
            var sampler2D: GLSL.Sampler2D;
            for (var index in this.materialData.shadowPassUsageData.sampler2DList) {
                sampler2D = this.materialData.shadowPassUsageData.sampler2DList[index];
                sampler2D.uniformIndex = context3D.getUniformLocation(this.materialData.shadowPassUsageData.program3D, sampler2D.varName);
            }

            //--------texture----------------
            var sampler3D: GLSL.Sampler3D;
            for (var index in this.materialData.shadowPassUsageData.sampler3DList) {
                sampler3D = this.materialData.shadowPassUsageData.sampler3DList[index];
                sampler3D.uniformIndex = context3D.getUniformLocation(this.materialData.shadowPassUsageData.program3D, sampler3D.varName);
            }

        }
        
        /**
         * @language zh_CN
         * 绘制
         * @param context3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public draw(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation ) {

            if (this.context3DChange) {
                this.activate(context3D, modeltransform, camera3D, geometry, animation);
                this.context3DChange = false;
            }

            context3D.gl.useProgram(this.materialData.shadowPassUsageData.program3D.program);
            super.draw(context3D, modeltransform, camera3D, geometry, animation);
            var i: number = 0;

            //texture 2D
            var sampler2D: GLSL.Sampler2D;
            for (var index in this.materialData.shadowPassUsageData.sampler2DList) {
                sampler2D = this.materialData.shadowPassUsageData.sampler2DList[index];
                sampler2D.texture = this.materialData[sampler2D.varName]
                sampler2D.texture.upload(context3D);
                context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture);
            }

            var sampler3D: GLSL.Sampler3D;
            for (var index in this.materialData.shadowPassUsageData.sampler3DList) {
                sampler3D = this.materialData.shadowPassUsageData.sampler3DList[index];
                sampler3D.texture = this.materialData[sampler3D.varName]
                sampler3D.texture.upload(context3D);
                context3D.setCubeTextureAt(sampler3D.activeTextureIndex, sampler3D.uniformIndex, sampler3D.index, sampler3D.texture.cubeTexture);
            }

            for (this.index = 0; this.index < this.materialData.shadowPassUsageData.vsMethodList.length; this.index++) {
                this.materialData.shadowPassUsageData.vsMethodList[this.index].updata(context3D, this.materialData.shadowPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }

            for (this.index = 0; this.index < this.materialData.shadowPassUsageData.fsMethodList.length; this.index++) {
                this.materialData.shadowPassUsageData.fsMethodList[this.index].updata(context3D, this.materialData.shadowPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }

            context3D.gl.bindBuffer(Egret3DDrive.ELEMENT_ARRAY_BUFFER, geometry.sharedIndexBuffer.buffer);
            context3D.gl.drawElements(this.materialData.drawMode, geometry.numItems, Egret3DDrive.UNSIGNED_SHORT, 0);

            //if (this.materialData.alphaBlending)
            //context3D.gl.depthMask(this.materialData.alphaBlending);

            for (var index in this.materialData.shadowPassUsageData.sampler2DList) {
                context3D.gl.bindTexture(context3D.gl.TEXTURE_2D, null);
            }
        }

    }
} 