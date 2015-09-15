module BlackSwan {
    export class DiffuseMethod extends MethodBase {

        public diffuseTexture: ImageTexture;
        public normalTexture: ImageTexture;
        public specularTexture: ImageTexture;

        private dirlight: GLSL.Unifrom;
        protected initShaderSource() {

            this.usage.texture2D_0 = new GLSL.Sampler2D(GLSL.VarConstName.texture2D_0);
            this.usage.texture2D_0.texture = this.diffuseTexture;

            //声明-------------------------------------  
            var tvColor: GLSL.TmpVar = this.shader.varTemp("tvColor", GLSL.VaryingType.vec4);
            var temp: GLSL.TmpVar = this.shader.varTemp("temp", GLSL.VaryingType.vec4);
            var temp1: GLSL.TmpVar = this.shader.varTemp("temp1", GLSL.VaryingType.vec3);
            this.dirlight = this.shader.varUnifrom( "directLight" , GLSL.UniformType.vec4 );

            this.shader.connectVarying(this.usage.varying_pos);
            this.shader.connectVarying(this.usage.varying_normal);
            this.shader.connectVarying(this.usage.varying_uv0);
            this.shader.connectSampler(this.usage.texture2D_0);
            //main 函数------------------------------------------  

            this.shader.mainFun();

            this.shader.tex2D(temp.use(), this.usage.texture2D_0.use(), this.usage.varying_uv0.use());
            this.shader.if(temp.use("a") + "<0.3");
            this.shader.discard();
            this.shader.endif();

            this.shader.dot(temp1.use("r"), this.usage.varying_normal.use(), this.dirlight.use("xyz"));
            this.shader.max(temp1.use("r"), temp1.use("r"), "0.2");

            this.shader.dot(temp1.use("g"), "-" + this.usage.varying_normal.use(), this.dirlight.use("xyz"));
            this.shader.max(temp1.use("g"), temp1.use("g"), "0.2");

            this.shader.mul(temp.use("rgb"), temp.use("rgb"), temp1.use("rrr"));
            this.shader.mul(temp.use("rgb"), temp.use("rgb"), this.dirlight.use("www"));

            this.shader.mul(temp1.use("rgb"), temp1.use("ggg"), "vec3(1.1,1.1,1.6)");

            this.shader.add(temp.use("rgb"), temp.use("rgb"), temp1.use("rgb"));
            this.shader.outColor(temp.use());
            this.shader.mainFunEnd();
           
        }

        protected initConstData() {
        }

        public getUse(): MethodUsageData {
            return null;
        }

        public getVarStr(): string {
            return "";
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this.diffuseTexture.upload(context3D);
            this.usage.texture2D_0.index = context3D.getUniformLocation(program3D, this.usage.texture2D_0.name);
            this.dirlight.index = context3D.getUniformLocation(program3D,this.dirlight.name);
        }

        private angle: number = 0;
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3D.setTextureAt(this.usage.texture2D_0.index, this.usage.texture2D_0.texture.texture)
            context3D.setTexture2DSamplerState(ContextSamplerType.NEAREST, ContextSamplerType.NEAREST, ContextSamplerType.REPEAT, ContextSamplerType.REPEAT);
            context3D.uniform4f(this.dirlight.index, Math.sin(this.angle * 0.01), 0.8, Math.cos(this.angle * 0.01) , 0.2);
            this.angle++;
           
        }

    }
} 