module Egret3D {
    export class PostCanvas {
        private static singleQuadData: Array<number> = [

            0.0, -1.0, 0.0, 0.0, 0.0,
            1.0, -1.0, 0.0, 1.0, 0.0,
            1.0, 0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 0.0, 0.0, 1.0
            //-1.0, -1.0, 0.0,   0.0,1.0
        ];
        private static singleQuadIndex: Array<number> = [0, 1, 2, 0, 2, 3];

        private _viewMatrix: Matrix4_4;

        public rectangle: Rectangle = new Rectangle(0, 0, 0, 0);
        public texture: TextureBase ;
        public viewMatIndex: WebGLUniformLocation;
        public uiDataIndex: WebGLUniformLocation;

        private vsShaderSource: string; 
        private fsShaderSource: string; 

        private indexBuffer3D: IndexBuffer3D;
        private vertexBuffer3D: VertexBuffer3D;

        private usage: MethodUsageData; 
        private vsShader: GLSL.ShaderBase
        private fsShader:GLSL.ShaderBase
        private viewPort: Rectangle;

        private distortion: boolean = false; 
        private distortionK1: number = 0.5;
        private distortionK1Register: any;
        private uniformDistortionK: Vector3D = new Vector3D();

        private transformChange: boolean = true;
        private position: Vector3D = new Vector3D();
        private rotation: Vector3D = new Vector3D();
        private scale: Vector3D = new Vector3D(1.0,1.0,1.0);
        public set x(value: number) {
            if (this.rectangle.x != value) {
                this.rectangle.x = value;
                this.transformChange = true;
            }
        }
        public set y(value: number) {
            if (this.rectangle.y != value) {
                this.rectangle.y = value;
                this.transformChange = true;
            }
        }
        public get x(): number {
            return this.rectangle.x;
        }
        public get y(): number {
            return this.rectangle.y;
        }
        public set width(value: number) {
            if (this.rectangle.width != value) {
                this.rectangle.width = value;
                this.transformChange = true;
            }
        }
        public set height(value: number) {
            if (this.rectangle.height != value) {
                this.rectangle.height = value;
                this.transformChange = true;
            }
        }
        public get width(): number {
            return this.rectangle.width;
        }
        public get height(): number {
            return this.rectangle.height;
        }


        constructor(view3D: View3D, vs: string = "postCanvas_vertex", fs: string = "postCanvas_fragment") {

            this.viewPort = view3D.viewPort ;
            this.rectangle.x = this.viewPort.x ;
            this.rectangle.y = this.viewPort.y ;
            this.rectangle.width = this.viewPort.width;
            this.rectangle.height = this.viewPort.height;
            this._viewMatrix = new Matrix4_4();

            this.usage = new MethodUsageData();
            this.vsShader = new GLSL.ShaderBase(null, this.usage);
            this.fsShader = new GLSL.ShaderBase(null, this.usage);

            //this.diffuseTexture = CheckerboardTexture.texture.texture ;
            this.setShader(vs, fs);
        }

        public startWarped() {
            this.distortion = true; 
            var scale1: number = 0.0;
            var scale2: number = 0.0;

            var norm: number = Math.sqrt((this.viewPort.height / 2.0) * (this.viewPort.height / 2.0) + (this.viewPort.width / 2.0) * (this.viewPort.width / 2.0));

            var vertDist: number = (this.viewPort.height / 2.0) / norm;

            scale2 = vertDist / (vertDist + this.distortionK1 * vertDist * vertDist * vertDist);

            var horizDist: number = (this.viewPort.width / 2.0) / norm;
            scale1 = (horizDist / ((horizDist + this.distortionK1 * horizDist * horizDist * horizDist)));

            this.uniformDistortionK.x = this.distortionK1;
            this.uniformDistortionK.y = scale1;
            this.uniformDistortionK.z = scale2;
        }

        public setShader( vsName:string , fsName:string ) {
            //this.vsShader.addShader("postCanvas_vertex");
            //this.fsShader.addShader("postCanvas_fragment");

            this.vsShader.addShader(vsName);
            this.fsShader.addShader(fsName);

            this.vsShaderSource = this.vsShader.getShaderSource();
            this.fsShaderSource = this.fsShader.getShaderSource();

        }

        private rebuild( context3D:Context3D ) {
            var vertexShader: Shader = context3D.creatVertexShader( this.vsShaderSource );
            var fragmentShader: Shader = context3D.creatFragmentShader(this.fsShaderSource);

           this.usage.program3D = context3D.creatProgram(vertexShader, fragmentShader);

           if (this.usage.program3D) {
               context3D.setProgram(this.usage.program3D);
           }

           if (!this.vertexBuffer3D) {
               this.vertexBuffer3D = context3D.creatVertexBuffer(PostCanvas.singleQuadData);
               this.indexBuffer3D = context3D.creatIndexBuffer(PostCanvas.singleQuadIndex);
           }

           this.usage.attribute_position.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_position");
           this.usage.attribute_uv0.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_uv0");

           this.usage.uniform_ProjectionMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ProjectionMatrix");

           if (this.distortion) {
               this.distortionK1Register = context3D.getUniformLocation(this.usage.program3D, "_K");
           }
           //--------texture----------------
           var sampler2D: GLSL.Sampler2D;
           for (var index in this.usage.sampler2DList) {
               sampler2D = this.usage.sampler2DList[index];
               sampler2D.uniformIndex = context3D.getUniformLocation(this.usage.program3D, sampler2D.varName);
           }

           //--------texture----------------
           var sampler3D: GLSL.Sampler3D;
           for (var index in this.usage.sampler3DList) {
               sampler3D = this.usage.sampler3DList[index];
               sampler3D.uniformIndex = context3D.getUniformLocation(this.usage.program3D, sampler3D.varName);
           }
          
       }

       private px: number = 0; 
       private py: number = 0; 

       public draw(context3D: Context3D,texture:Texture2D) {

           if (this.transformChange)
               this.notifyUpdate();

           context3D.gl.clear(Egret3DDrive.DEPTH_BUFFER_BIT);

           if (!this.usage.program3D)
               this.rebuild(context3D);

           context3D.enbable(context3D.gl.DEPTH_TEST);
           context3D.setBlendFactors(Egret3DDrive.ONE,Egret3DDrive.ZERO);

           context3D.setProgram(this.usage.program3D);  
           context3D.bindVertexBuffer(this.vertexBuffer3D);

           context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_position.uniformIndex, 3, Egret3DDrive.FLOAT, false, 20, 0);
           context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_uv0.uniformIndex, 2, Egret3DDrive.FLOAT, false, 20, 12);

           context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.uniformIndex, false, this._viewMatrix.rawData);
           if (this.distortion) {
                context3D.uniform3f(this.distortionK1Register,this.uniformDistortionK.x , this.uniformDistortionK.y , this.uniformDistortionK.z );
           }

            //--------texture----------------
           var sampler2D: GLSL.Sampler2D;
           for (var index in this.usage.sampler2DList) {
               sampler2D = this.usage.sampler2DList[index];
               if (sampler2D.varName == "texture2D_1") {
                   context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, texture );
               }
           }

           context3D.drawElement(DrawMode.TRIANGLES, this.indexBuffer3D, 0, 6);
       }

       private notifyUpdate() {
           this.transformChange = false;  
           this._viewMatrix.identity();
           this.px = ( this.viewPort.width - this.rectangle.x * 2.0 ) * (1 / this.viewPort.width);
           this.py = (this.viewPort.height - this.rectangle.y * 2.0 ) * (1 / this.viewPort.height);

           this.position.x = -1 * this.px ;
           this.position.y = this.py;
           //this.rotation.z = 90;

           this.scale.x = this.rectangle.width / this.viewPort.width * 2.0 ;
           this.scale.y = this.rectangle.height / this.viewPort.height * 2.0  ;

           this._viewMatrix.recompose([this.position,this.rotation,this.scale]);
       }
    }
} 