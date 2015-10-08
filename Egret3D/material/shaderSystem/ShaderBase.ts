module BlackSwan.GLSL {
    export class ShaderBase {


        protected useage: MethodUsageData;
        protected index: number = 0;
        protected source: string = "precision mediump float;            \t\n";
        constructor() {
        }

        public getShaderSource(): string {
            return this.source;
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            for (this.index = 0; this.index < this.useage.vsMethodList.length; this.index++) {
                this.useage.vsMethodList[this.index].activate(context3D, program3D, modeltransform, camera3D);
            }
            for (this.index = 0; this.index < this.useage.fsMethodList.length; this.index++) {
                this.useage.fsMethodList[this.index].activate(context3D, program3D, modeltransform, camera3D);
            }
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            for (this.index = 0; this.index < this.useage.vsMethodList.length; this.index++) {
                this.useage.vsMethodList[this.index].updata(context3D, program3D, modeltransform, camera3D);
            }
            for (this.index = 0; this.index < this.useage.fsMethodList.length; this.index++) {
                this.useage.fsMethodList[this.index].updata(context3D, program3D, modeltransform, camera3D);
            }
        }











        protected getShader(methods: Array<string>): string {
            var shaderContent = ShaderSystemTool.instance.getShader(methods, this.useage);

            var i: number; 
            //var attribute
            for (var key in shaderContent.attributeList) {
                this.connectAtt(shaderContent.attributeList[key]);
            }
            //var struct
            for (var key in shaderContent.structDict) {
                this.connectStruct(shaderContent.structDict[key]);
            }
            //var varying
            for (i = 0; i < shaderContent.varyingList.length; i++) {
                this.connectVarying(shaderContent.varyingList[i]);
            }
            //temp
            for (i = 0; i < shaderContent.tempList.length; i++) {
                this.connectTemp(shaderContent.tempList[i]);
            }
            //const
            for (i = 0; i < shaderContent.constList.length; i++) {
                if (shaderContent.constList[i].varName == "maxLight") {
                    shaderContent.constList[i].value = this.useage.lights.length.toString();
                }
                this.connectConst(shaderContent.constList[i]);
            }
            //uniform
            for (i = 0; i < shaderContent.uniformList.length; i++) {
                this.connectUniform(shaderContent.uniformList[i]);
            }
            //sampler
            for (i = 0; i < shaderContent.sampler2DList.length; i++) {
                this.connectSampler(shaderContent.sampler2DList[i]);
            }
            //---------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------
            for (i = 0; i < shaderContent.funcList.length; i++) {
                this.source += shaderContent.funcList[i].func;
            }
            return this.source;
        }

        public mainFun() {
            this.source += "void main(void){; \r\n";
        }

        public mainFunEnd() {
            this.source += "} \r\n";
        }

        public connectAtt(att: GLSL.Attribute) {
            this.source += "attribute " + att.valueType + " " + att.name + "; \r\n";
        }

        public connectTemp(tempVar: GLSL.TmpVar) {
            this.source += tempVar.valueType + " " + tempVar.name + "; \r\n";
        }

        public connectStruct(struct: string) {
            this.source += struct + " \r\n";
        }

        public connectConst(constVar: GLSL.ConstVar) {
            this.source += "const " + constVar.valueType + " " + constVar.name + " = " + constVar.value + "; \r\n";
        }

        public connectVarying(varying: GLSL.Varying) {
            this.source += "varying " + varying.valueType + " " + varying.name + "; \r\n";
        }

        public connectUniform(unifrom: GLSL.Uniform) {
            this.source += "uniform " + unifrom.valueType + " " + unifrom.name + "; \r\n";
        }
        //uniform sampler2D depthSampler
        public connectSampler(sampler: GLSL.Sampler2D) {
            this.source += "uniform sampler2D " + sampler.name + "; \r\n";
        }

    

     

 

        //public connectUniformStruct(structVar: GLSL.StructVar) {
        //    this.source += "uniform " + structVar.valueType + " " + structVar.name + "; \r\n";
        //}

        public if(conditions: string) {
            this.source += "if(" + conditions + "){ ; \r\n";
        }

        public endif() {
            this.source += "} ; \r\n";
        }

        public discard() {
            this.source += "discard ; \r\n";
        }

        public mov(target: string, source: string) {
            this.source += target + " = " + source + "; \r\n";
        }

        public add(target: string, source1: string, source2: string) {
            this.source += target + " = " + source1 + " + " + source2 + "; \r\n";
        }

        public sub(target: string, source1: string, source2: string) {
            this.source += target + " = " + source1 + " - " + source2 + "; \r\n";
        }

        public mul(target: string, source1: string, source2: string) {
            this.source += target + " = " + source1 + " * " + source2 + "; \r\n";
        }

        public div(target: string, source1: string, source2: string) {
            this.source += target + " = " + source1 + " / " + source2 + "; \r\n";
        }

        public dot(target: string, source1: string, source2: string) {
            this.source += target + " = dot(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public normalize(target: string, source: string) {
            this.source += target + " = normalize(" + source + ") ; \r\n";
        }

        public reflect(target: string, source1: string, source2: string) {
            this.source += target + " = reflect(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public min(target: string, source1: string, source2: string) {
            this.source += target + " = min(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public max(target: string, source1: string, source2: string) {
            this.source += target + " = max(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public pow(target: string, source1: string, source2: string) {
            this.source += target + " = pow(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public tex2D(target: string, tex: string, uv: string) {
            this.source += target + " = texture2D(" + tex + " , " + uv + ") ; \r\n";
        }

        public tex3D(target: string, tex: string, uv: string) {
            this.source += target + " = texture3D(" + tex + " , " + uv + ") ; \r\n";
        }

        public outColor(target: string) {
            this.source += "gl_FragColor = " + target + "  ; \r\n";
        }

        public outPos(target: string) {
            this.source += "gl_Position = " + target + "  ; \r\n";
        }

    }
} 