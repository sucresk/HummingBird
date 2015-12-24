module Egret3D {
                        
    /**
    * @class Egret3D.SphereSky
    * @classdesc
    * 天空球
    */
    export class SphereSky {

        private viewMatIndex: WebGLUniformLocation;
        private skyTexture: ImageTexture;

        private vsShaderSource: string;
        private fsShaderSource: string;

        private usage: MethodUsageData;
        private vsShader: GLSL.ShaderBase;
        private fsShader: GLSL.ShaderBase;
        private sphereGeometry: SphereGeometry;

        private skyMatrix: Matrix4_4;
        private normalMatrix: Matrix4_4 = new Matrix4_4();
                        
        /**
        * @language zh_CN
        * constructor
        * @param tex1 天空球贴图
        */
        constructor(tex1: HTMLImageElement ) {
            this.skyTexture = new ImageTexture(tex1);
            this.usage = new MethodUsageData();
            this.vsShader = new GLSL.ShaderBase(null, this.usage);
            this.fsShader = new GLSL.ShaderBase(null, this.usage);
            this.setShader("spheresky_vertex", "spheresky_fragment");
            this.skyMatrix = new Matrix4_4();
        } 
                                
        /**
        * @language zh_CN
        * 设置渲染用的shader文件名字
        * @param vsName vs文件名
        * @param fsName fs文件名
        */
        public setShader(vsName: string, fsName: string) {
            this.vsShader.addShader(vsName);
            this.fsShader.addShader(fsName);

            this.vsShaderSource = this.vsShader.getShaderSource();
            this.fsShaderSource = this.fsShader.getShaderSource();
        }

        private rebuild(context3D: Context3D) {
            var vertexShader: Shader = context3D.creatVertexShader(this.vsShaderSource);
            var fragmentShader: Shader = context3D.creatFragmentShader(this.fsShaderSource);

            this.usage.program3D = context3D.creatProgram(vertexShader, fragmentShader);

            if (this.usage.program3D) {
                context3D.setProgram(this.usage.program3D);
            }

            this.sphereGeometry = this.sphereGeometry || new SphereGeometry();
            if (!this.sphereGeometry.sharedVertexBuffer) {
                this.sphereGeometry.sharedVertexBuffer = context3D.creatVertexBuffer(this.sphereGeometry.verticesData);
                this.sphereGeometry.numberOfVertices = this.sphereGeometry.verticesData.length / this.sphereGeometry.vertexAttLength;
                this.sphereGeometry.vertexSizeInBytes = this.sphereGeometry.positionSize * Float32Array.BYTES_PER_ELEMENT + ///pos 0
                3 * Float32Array.BYTES_PER_ELEMENT + ///normal 12
                3 * Float32Array.BYTES_PER_ELEMENT + ///tangent 24
                4 * Float32Array.BYTES_PER_ELEMENT + ///color 36 
                2 * Float32Array.BYTES_PER_ELEMENT + ///uv 52
                2 * Float32Array.BYTES_PER_ELEMENT; ///uv2 60
                this.sphereGeometry.sharedIndexBuffer = context3D.creatIndexBuffer(this.sphereGeometry.indexData);
            }

            this.usage.attribute_position.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_position");
            this.usage.attribute_normal.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_normal");
            this.usage.attribute_uv0.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_uv0");
            this.usage.uniform_ProjectionMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ProjectionMatrix");
            this.usage.uniform_ModelMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ModelMatrix");
            this.usage.uniform_normalMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_normalMatrix");
            ///--------texture----------------
            ///this.usage.sky_texture.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "sky_texture");
        }

        private px: number = 0;
        private py: number = 0;
        private pz: number = 0;

        private offest: Vector3D = new Vector3D(); 
                                        
        /**
        * @language zh_CN
        * 渲染
        * @param context3D 设备上下文
        * @param camera 渲染时的相机
        */
        public draw(context3D: Context3D, camera:Camera3D ) {
            
            if (!this.usage.program3D)
                this.rebuild(context3D);

            context3D.setProgram(this.usage.program3D);
            context3D.gl.enable(Egret3DDrive.CULL_FACE)
            context3D.gl.cullFace(Egret3DDrive.FRONT);
            context3D.gl.enable(Egret3DDrive.BLEND);
            context3D.gl.blendFunc(Egret3DDrive.ONE, Egret3DDrive.ZERO);

            context3D.bindVertexBuffer(this.sphereGeometry.sharedVertexBuffer);

            context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_position.uniformIndex, 3, Egret3DDrive.FLOAT, false, this.sphereGeometry.vertexSizeInBytes, 0);
            context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_normal.uniformIndex, 3, Egret3DDrive.FLOAT, false, this.sphereGeometry.vertexSizeInBytes, 12);
            context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_uv0.uniformIndex, 2, Egret3DDrive.FLOAT, false, this.sphereGeometry.vertexSizeInBytes, 52 );

            this.skyMatrix.identity();
            this.skyMatrix.appendTranslation(camera.x, camera.y, camera.z);

            this.normalMatrix.copyFrom(this.skyMatrix);
            this.normalMatrix.invert();
            this.normalMatrix.transpose();
            this.normalMatrix.appendScale(1, 1, 1);

            context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.uniformIndex, false, camera.viewProjectionMatrix.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_ModelMatrix.uniformIndex, false, this.skyMatrix.rawData );
            context3D.uniformMatrix4fv(this.usage.uniform_normalMatrix.uniformIndex, false, this.normalMatrix.rawData);

            this.skyTexture.upload(context3D);
            ///--------texture----------------
            ///context3D.setTexture2DAt(context3D.gl.TEXTURE0, 0, this.usage.sky_texture.uniformIndex, this.skyTexture.texture);

            ///context3D.gl.activeTexture(context3D.gl.TEXTURE0);
            ///context3D.gl.bindTexture(context3D.gl.TEXTURE_2D, this.skyTexture.texture.gpu_texture);
            ///context3D.gl.uniform1i(this.usage.sky_texture.index, 0);

            context3D.drawElement(DrawMode.TRIANGLES, this.sphereGeometry.sharedIndexBuffer, 0, this.sphereGeometry.numItems );
        }

    }
} 