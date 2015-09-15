module BlackSwan {
    export class ShaderSystemTool {

        public libs: string[] = [
            "default_vertex"
            //"fs-diffuse",
            //"vs-normal",
            //"fs-normal",
            //"vs-specular",
            //"fs-specular",
        ];

        private methodLibs: any = { };

        public load() {
            for (var i: number = 0; i < this.libs.length; i++){
                var urlload: xxq.URLLoader = new xxq.URLLoader("shader/" + this.libs[i] + ".glsl");
                urlload.onLoadComplete = (loader: xxq.URLLoader) => this.onCompleteShader(loader);
            }
        }

        private onCompleteShader(loader: xxq.URLLoader) {
            this.methodLibs[loader.url] = loader.data;
        }

        public getVsShader(usage: MethodUsageData, shaderLib:string[]): GLSL.ShaderBase {
            var shader: GLSL.ShaderBase = new GLSL.ShaderBase();
            return shader;
        }

        public getFsShader(usage: MethodUsageData, shaderLib: string[]): GLSL.ShaderBase {
            var shader: GLSL.ShaderBase = new GLSL.ShaderBase();
            return shader;
        }

        private getAttribute(): string {
            return "";
        }

        private getVar(): string {
            return "";
        }

        private getUniform(): string {
            return "";
        }

        private getFunction(): string {
            return "";
        }

        private getUniformRegister(): Array<GLSL.Unifrom> {
            return null;
        }

















        //************************************************************************
        //------------------------------------------------------------------------
        //------------------------------------------------------------------------
        private static readShader(str: string) {
            var source: Array<string> = StringUtil.readLines(str);
            var shaderLine: Array<string> = source.concat();

        }

        private static getAttribute(usage: MethodUsageData, shaderLine: Array<string>): GLSL.Attribute {
            var tempStr: string = shaderLine[0];
            var tmpName: string;
            var valueType: string;
            var index: number = tempStr.indexOf("attribute_");
            var attribute: GLSL.TmpVar;
            if (index != -1) {
                var tempArray: Array<string> = tempStr.split(" ");
                tmpName = tempArray[2];
                valueType = tempArray[1];
                attribute = new GLSL.TmpVar(tmpName, valueType);
            }
            shaderLine.shift();

            if (usage[attribute.name])
                usage[attribute.name] = attribute;
            else {

            }
            return attribute;
        }

        private static getTemper(usage: MethodUsageData,shaderLine: Array<string>): GLSL.Varying {
            var tempStr: string = shaderLine[0];
            var tmpName: string;
            var valueType: string;
            var index: number = tempStr.indexOf("tem_");
            var tmpVar: GLSL.TmpVar;
            if (index != -1) {
                var tempArray: Array<string> = tempStr.split(" ");
                tmpName = tempArray[1];
                valueType = tempArray[0];
                tmpVar = new GLSL.TmpVar(tmpName, valueType);
            }
            shaderLine.shift();

            if (usage[tmpVar.name])
                usage[tmpVar.name] = tmpVar;
            return tmpVar;
        }

        private static getVarying(usage: MethodUsageData,shaderLine: Array<string>): GLSL.Varying {
            var tempStr: string = shaderLine[0];
            var varyingName: string;
            var valueType: string;
            var index: number = tempStr.indexOf("varying_");
            var varying: GLSL.Varying;
            if (index != -1) {
                var tempArray: Array<string> = tempStr.split(" ");
                varyingName = tempArray[2];
                valueType = tempArray[1];
                varying = new GLSL.Varying(varyingName, valueType );
            }
            shaderLine.shift();

            if (usage[varying.name])
                usage[varying.name] = varying;
            return varying;
        }

        private static getUniform(usage: MethodUsageData,shaderLine: Array<string>): GLSL.Unifrom {
            var tempStr: string = shaderLine[0];
            var unifromName: string;
            var valueType: string;
            var index: number = tempStr.indexOf("uniform_");
            var unifrom: GLSL.Unifrom;
            if (index != -1) {
                var tempArray: Array<string> = tempStr.split(" ");
                unifromName = tempArray[2];
                valueType = tempArray[1];
                unifrom = new GLSL.Unifrom(unifromName, valueType);
            }
            shaderLine.shift();

            if (usage[unifrom.name])
                usage[unifrom.name] = unifrom;
            return unifrom;
        }
    }
} 