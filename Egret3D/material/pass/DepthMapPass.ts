module Egret3D {
    export class DepthMapPass extends MaterialPassBase {

        private depthMethod: DepthMethod;
        constructor(data: MaterialData) {
            super(data);
        }

        public initUseMethod() {
            this.pixelShader.addShader( "depthMethod_fragment" );
        }

        /**
        * 初始化 shader 的地方
        **/
        public initShader(context3D: Context3D, geometry: GeometryBase, animation: IAnimation) {

            this.vertexShader = new VertexShader(this.materialData, this.materialData.depthPassUsageData);
            this.pixelShader = new PixelShader(this.materialData, this.materialData.depthPassUsageData);

            this.materialData.context3D = context3D;

            this.vertexShader.setVertexShader(geometry);

            this.initUseMethod();

            this.vertexShader.build();
            this.pixelShader.build();

            if (animation) {
                this.vertexShader.maxBone = (<AnimationStateSet>animation).getJointNumber() * 2;
            }

            var vs: string = this.vertexShader.getShaderSource();
            var fs: string = this.pixelShader.getShaderSource();

            var vs_shader: Shader = context3D.creatVertexShader(vs);
            var fs_shader: Shader = context3D.creatFragmentShader(fs);

            this.materialData.depthPassUsageData.program3D = context3D.creatProgram(vs_shader, fs_shader);

            this.context3DChange = true;
        }

        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
         
            for (this.index = 0; this.index < this.materialData.depthPassUsageData.vsMethodList.length; this.index++) {
                this.materialData.depthPassUsageData.vsMethodList[this.index].activate(context3D, this.materialData.depthPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
            for (this.index = 0; this.index < this.materialData.depthPassUsageData.fsMethodList.length; this.index++) {
                this.materialData.depthPassUsageData.fsMethodList[this.index].activate(context3D, this.materialData.depthPassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
        }

        public index: number = 0;
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