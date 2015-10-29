module Egret3D.GLSL {
    export class ShaderBase {

        protected materialData: MaterialData;
        protected useage: MethodUsageData;

        protected index: number = 0;
        protected source: string = "precision highp float;            \t\n";

        protected shadersName: Array<string> = new Array<string>();
        protected endShadername: string = "";
        protected stateChange: boolean = false;

        public maxBone: number = 0;

        constructor( materialData: MaterialData, usage: MethodUsageData) {
            this.useage = usage;
            this.materialData = materialData;
        }

        public addShader(shaderName: string) {
            this.shadersName.push(shaderName);
        }

        public addEnd(shaderName: string) {
            this.endShadername = shaderName ;
        }

        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
           
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
      
        }

        public getShaderSource(): string {

            if (this.endShadername != "") {
                var index: number = this.shadersName.indexOf(this.endShadername);
                if (index == -1) {
                    this.shadersName.push(this.endShadername);
                }
            }

            var shaderContent = ShaderSystemTool.instance.getShader(this.shadersName, this.useage);

            var i: number; 
            ///var attribute
            for (var key in shaderContent.attributeList) {
                this.connectAtt(shaderContent.attributeList[key]);
            }
            ///var struct
            for (var key in shaderContent.structDict) {
                this.connectStruct(shaderContent.structDict[key]);
            }
            ///var varying
            for (i = 0; i < shaderContent.varyingList.length; i++) {
                this.connectVarying(shaderContent.varyingList[i]);
            }
            ///temp
            for (i = 0; i < shaderContent.tempList.length; i++) {
                this.connectTemp(shaderContent.tempList[i]);
            }
            ///const
            for (i = 0; i < shaderContent.constList.length; i++) {

                if (shaderContent.constList[i].varName == "max_directLight") {
                    shaderContent.constList[i].value = this.materialData.directLightList.length.toString();
                }
                if (shaderContent.constList[i].varName == "bonesNumber") {
                    shaderContent.constList[i].value = this.maxBone ;///(<AnimationStateSet>this.geometey.animation).getJointNumber() * 2;
                }
                if (shaderContent.constList[i].varName == "max_sportLight") {
                    shaderContent.constList[i].value = this.materialData.sportLightList.length.toString();
                }
                if (shaderContent.constList[i].varName == "max_pointLight") {
                    shaderContent.constList[i].value = this.materialData.pointLightList.length.toString();
                }
                this.connectConst(shaderContent.constList[i]);
            }
            ///uniform
            for (i = 0; i < shaderContent.uniformList.length; i++) {
                this.connectUniform(shaderContent.uniformList[i]);
            }
            ///sampler
            for (i = 0; i < shaderContent.sampler2DList.length; i++) {
                var sampler2D: GLSL.Sampler2D = shaderContent.sampler2DList[i];
                sampler2D = sampler2D.clone();
                this.connectSampler(sampler2D);
                sampler2D.activeTextureIndex = this.getTexture2DIndex(i);
                sampler2D.index = i;
                this.useage.sampler2DList.push(sampler2D);
            }
            ///sampler
            for (i = 0; i < shaderContent.sampler3DList.length; i++) {
                var sampler3D: GLSL.Sampler3D = shaderContent.sampler3DList[i]; 
                sampler3D = sampler3D.clone();
                this.connectSampler3D(sampler3D);
                sampler3D.activeTextureIndex = this.getTexture2DIndex(shaderContent.sampler2DList.length+i);
                sampler3D.index = shaderContent.sampler2DList.length + i;
                this.useage.sampler3DList.push(sampler3D);
            }
            ///---------------------------------------------------------------------------------
            ///---------------------------------------------------------------------------------
            for (i = 0; i < shaderContent.funcList.length; i++) {
                this.source += shaderContent.funcList[i].func;
            }
            return this.source;
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
        ///uniform sampler2D depthSampler
        public connectSampler(sampler: GLSL.Sampler2D) {
            this.source += "uniform sampler2D " + sampler.name + "; \r\n";

        }

        public connectSampler3D(sampler: GLSL.Sampler3D) {
            this.source += "uniform samplerCube " + sampler.name + "; \r\n";
        }

        private getTexture2DIndex(i: number): number {
            switch (i) {
                case 0:
                    return ContextSamplerType.TEXTURE_0;
                    break;
                case 1:
                    return ContextSamplerType.TEXTURE_1;
                    break;
                case 2:
                    return ContextSamplerType.TEXTURE_2;
                    break;
                case 3:
                    return ContextSamplerType.TEXTURE_3;
                    break;
                case 4:
                    return ContextSamplerType.TEXTURE_4;
                    break;
                case 5:
                    return ContextSamplerType.TEXTURE_5;
                    break;
                case 6:
                    return ContextSamplerType.TEXTURE_6;
                    break;
                case 7:
                    return ContextSamplerType.TEXTURE_7;
                    break;
                case 8:
                    return ContextSamplerType.TEXTURE_8;
                    break;
            }

            throw new Error("texture not big then 8")
            return -1;
        }

        public dispose() {
            this.materialData = null; 
            this.useage = null; 
            this.source = "";
            this.source = null;
            this.shadersName.length = 0;
            this.shadersName = null;
        }

    }
} 