module Egret3D {

     /**
     * @class Egret3D.DepthMapPass
     * @classdesc
     * 深度贴图通道渲染器
     */
    export class DepthMapPass extends MaterialPassBase {

        private depthMethod: DepthMethod;
        /**
         * @language zh_CN
         * @param data 
         */
        constructor(data: MaterialData) {
            super(data);
        }

        /**
         * @language zh_CN
         */
        public initUseMethod() {
            this.pixelShader.addShader( "depthMethod_fragment" );
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

            this.vertexShader = new VertexShader(this.materialData, this.materialData.depthPassUsageData);
            this.pixelShader = new PixelShader(this.materialData, this.materialData.depthPassUsageData);

            this.materialData.context3D = context3D;

            this.vertexShader.setVertexShader(geometry);

            this.initUseMethod();

            this.vertexShader.build();
            this.pixelShader.build();

            if (animation) {
                this.vertexShader.maxBone = (<SkeletonAnimation>animation).jointNumber * 2;
            }

            var vs: string = this.vertexShader.getShaderSource();
            var fs: string = this.pixelShader.getShaderSource();

            var vs_shader: Shader = context3D.creatVertexShader(vs);
            var fs_shader: Shader = context3D.creatFragmentShader(fs);

            this.materialData.depthPassUsageData.program3D = context3D.creatProgram(vs_shader, fs_shader);

            this.context3DChange = true;
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
         
            for (this.index = 0; this.index < this.materialData.depthPassUsageData.vsMethodList.length; this.index++) {
                this.materialData.depthPassUsageData.vsMethodList[this.index].activate(context3D, this.materialData.depthPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
            for (this.index = 0; this.index < this.materialData.depthPassUsageData.fsMethodList.length; this.index++) {
                this.materialData.depthPassUsageData.fsMethodList[this.index].activate(context3D, this.materialData.depthPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
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

            super.draw(context3D, modeltransform, camera3D, geometry, animation);
            var i: number = 0;
            if (this.context3DChange) {
                this.activate(context3D, modeltransform, camera3D, geometry, animation);
                this.context3DChange = false;
            }

            for (this.index = 0; this.index < this.materialData.depthPassUsageData.vsMethodList.length; this.index++) {
                this.materialData.depthPassUsageData.vsMethodList[this.index].updata(context3D, this.materialData.depthPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }

            for (this.index = 0; this.index < this.materialData.depthPassUsageData.fsMethodList.length; this.index++) {
                this.materialData.depthPassUsageData.fsMethodList[this.index].updata(context3D, this.materialData.depthPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }

            context3D.gl.bindBuffer(Egret3DDrive.ELEMENT_ARRAY_BUFFER, geometry.sharedIndexBuffer.buffer);
            context3D.gl.drawElements(this.materialData.drawMode, geometry.numItems, Egret3DDrive.UNSIGNED_SHORT, 0);
        }

    }
} 