module Egret3D {
    export class Sky {

        private viewMatIndex: WebGLUniformLocation;
        private skyTexture: SkyTexture;

        private vsShaderSource: string;
        private fsShaderSource: string;

        private usage: MethodUsageData;
        private vsShader: GLSL.ShaderBase;
        private fsShader: GLSL.ShaderBase;
        private cubeGeometry: CubeGeometry;

        private skyMatrix: Matrix4_4;
        private modelMatrix: Matrix4_4;

        constructor(skyTexture:SkyTexture ) {
            this.skyTexture = skyTexture;
            this.usage = new MethodUsageData();
            this.vsShader = new GLSL.ShaderBase(null, this.usage);
            this.fsShader = new GLSL.ShaderBase(null, this.usage);
            this.setShader("sky_vertex", "sky_fragment");
            this.skyMatrix = new Matrix4_4();
            this.modelMatrix = new Matrix4_4();
        } 

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

            this.cubeGeometry = this.cubeGeometry || new CubeGeometry( );
            if (!this.cubeGeometry.sharedVertexBuffer) {
                this.cubeGeometry.sharedVertexBuffer = context3D.creatVertexBuffer(this.cubeGeometry.verticesData);
                this.cubeGeometry.numberOfVertices = this.cubeGeometry.verticesData.length / this.cubeGeometry.vertexAttLength;
                this.cubeGeometry.vertexSizeInBytes = this.cubeGeometry.positionSize * Float32Array.BYTES_PER_ELEMENT + ///pos 0
                3 * Float32Array.BYTES_PER_ELEMENT + ///normal 12
                3 * Float32Array.BYTES_PER_ELEMENT + ///tangent 24
                4 * Float32Array.BYTES_PER_ELEMENT + ///color 36 
                2 * Float32Array.BYTES_PER_ELEMENT + ///uv 52
                2 * Float32Array.BYTES_PER_ELEMENT; ///uv2 60
                this.cubeGeometry.sharedIndexBuffer = context3D.creatIndexBuffer(this.cubeGeometry.indexData);
            }

            this.usage.attribute_position.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_position");
            this.usage.uniform_ProjectionMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ProjectionMatrix");
            this.usage.uniform_ModelMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ModelMatrix");

            ///--------texture----------------
            ///var sampler2D: GLSL.Sampler2D;
            ///for (var index in this.usage.sampler2DList) {
            ///    sampler2D = this.usage.sampler2DList[index];
            ///    sampler2D.uniformIndex = context3D.getUniformLocation(this.usage.program3D, sampler2D.varName);
            ///}
            var sampler3D: GLSL.Sampler3D;
            for (var index in this.usage.sampler3DList) {
                sampler3D = this.usage.sampler3DList[index];
                sampler3D.uniformIndex = context3D.getUniformLocation(this.usage.program3D, sampler3D.varName);
                if (sampler3D.varName=="sky_texture"){
                    sampler3D.texture = this.skyTexture;
                }
            }
            ///this.test = CheckerboardTexture.texture; 
            ///this.skyUni = context3D.getUniformLocation(this.usage.program3D, "sky_texture");
            ///this.texUni = context3D.getUniformLocation(this.usage.program3D, "diffuseTex" );
        }

        private skyUni: any;
        private texUni: any;
        private test: TextureBase; 
        private px: number = 0;
        private py: number = 0;
        private pz: number = 0;

        private offest: Vector3D = new Vector3D(); 

        public draw(context3D: Context3D, camera:Camera3D ) {

            if (!this.usage.program3D)
                this.rebuild(context3D);

            context3D.setProgram(this.usage.program3D);

            context3D.gl.enable(Egret3DDrive.CULL_FACE)
            context3D.gl.cullFace(Egret3DDrive.FRONT);

            context3D.bindVertexBuffer(this.cubeGeometry.sharedVertexBuffer);
            context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_position.uniformIndex, 3, Egret3DDrive.FLOAT, false, this.cubeGeometry.vertexSizeInBytes , 0);

            this.skyMatrix.identity();
            this.skyMatrix.appendTranslation(camera.x, camera.y, camera.z);

            context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.uniformIndex, false, camera.viewProjectionMatrix.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_ModelMatrix.uniformIndex, false, this.skyMatrix.rawData);
          
            ///--------texture----------------
            ///var sampler2D: GLSL.Sampler2D;
            ///for (var index in this.usage.sampler2DList) {
            ///    sampler2D = this.usage.sampler2DList[index];
                ///sampler2D.texture.upload(context3D);
                ///context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture);
            ///}
            
            ///context3D.setTexture2DAt(context3D.gl.TEXTURE1, this.texUni, 1, this.test.texture.gpu_texture );
            var sampler3D: GLSL.Sampler3D;
            for (var index in this.usage.sampler3DList) {
              sampler3D = this.usage.sampler3DList[index];
              sampler3D.texture.upload(context3D);
              context3D.setCubeTextureAt(sampler3D.activeTextureIndex , sampler3D.uniformIndex, sampler3D.index , sampler3D.texture.cubeTexture );
            }

             ///this.skyTexture.upload(context3D);
            /// context3D.setCubeTextureAt(context3D.gl.TEXTURE0, this.skyUni, 0, this.skyTexture.cubeTexture.gpu_texture );
            context3D.drawElement(DrawMode.TRIANGLES, this.cubeGeometry.sharedIndexBuffer, 0, this.cubeGeometry.numItems);
        }

    }
} 