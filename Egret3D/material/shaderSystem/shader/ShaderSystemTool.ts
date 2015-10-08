module BlackSwan {
    export class ShaderSystemTool {
        private libs: string[] = [
            "default_vertex",
            "color_fragment",
            "diffuse_fragment",

            "LightDiffuse_fragment",
            //"fs-specular",
        ];

        private _shaderLibs: any = {};
        private _methodLibs: any = {};

        private _loaderDict: { [url: string]: string } = {};

        private _loadFunc: Function;

        private _loadList: Array<string> = new Array<string>();

        private _shaderContentDict: { [name: string]: GLSL.ShaderContent } = {};
        private static _filterChar: string[] = [" ", "  ", ";", "\n", "\r", "\t", "\n", "\r", "\t"];

        public static instance: ShaderSystemTool;
        public static regist(func: Function) {
            if (!this.instance) {
                this.instance = new ShaderSystemTool();
                this.instance._loadFunc = func;
                this.instance.load();
            }
        }

        public load() {
            for (var i: number = 0; i < this.libs.length; i++) {
                this._loadList.push(this.libs[i]);
            }
            for (var i: number = 0; i < this.libs.length; i++){
                var urlload: xxq.URLLoader = new xxq.URLLoader("/Egret3D/material/shaderSystem/shader/" + this.libs[i] + ".glsl");
                urlload.onLoadComplete = (loader: xxq.URLLoader) => this.onCompleteShader(loader);
                this._loaderDict[urlload.url] = this.libs[i];
            }
        }

        private onCompleteShader(loader: xxq.URLLoader) {

            var content: GLSL.ShaderContent = this.readShader(loader.data);
            content.name = this._loaderDict[loader.url];
            this._methodLibs[content.name] = content;
            this._shaderContentDict[content.name] = content;
            var index: number = -1;
            for (var i: number = 0; i < this._loadList.length; ++i) {
                if (this._loadList[i] == content.name) {
                    index = i;
                    break;
                }
            }

            if (index >= 0) {
                this._loadList.splice(index, 1);
            }

            if (this._loadList.length <= 0) {
                this._loadFunc(this);
            }
        }

        //public getVsShader(usage: MethodUsageData, shaderLib:string[]): GLSL.ShaderBase {
        //    var shader: GLSL.ShaderBase = new GLSL.ShaderBase();
        //    return shader;
        //}

        //public getFsShader(usage: MethodUsageData, shaderLib: string[]): GLSL.ShaderBase {
        //    var shader: GLSL.ShaderBase = new GLSL.ShaderBase();
        //    return shader;
        //}

        //private getAttribute(): string {
        //    return "";
        //}

        private getVar(): string {
            return "";
        }

        //private getUniform(): string {
        //    return "";
        //}

        private getFunction(): string {
            return "";
        }

        private getUniformRegister(): Array<GLSL.Uniform> {
            return null;
        }

        // [def,anim]
        public getShader(shaderNameList: Array<string>, usage: MethodUsageData): GLSL.ShaderContent {
            var i: number = 0;
            var varName: string = "";
            var shaderContent: GLSL.ShaderContent = null;
            for (i = 0; i < shaderNameList.length; ++i) {
                if (varName != "") {
                    varName += "/";
                }
                varName += shaderNameList[i];
            }
            if (this._shaderContentDict[varName] == undefined) {
                shaderContent = new GLSL.ShaderContent();

                for (i = 0; i < shaderNameList.length; ++i) {
                    var tempContent: GLSL.ShaderContent = this._shaderContentDict[shaderNameList[i]];
                    shaderContent.addContent(tempContent);
                }

                this._shaderContentDict[varName] = shaderContent;
            }
            else {
                shaderContent = this._shaderContentDict[varName];
            }

            if (shaderContent == null) {
                return null;
            }

            for (i = 0; i < shaderContent.attributeList.length; i++) {
                varName = shaderContent.attributeList[i].varName;
                usage[varName] = shaderContent.attributeList[i].clone();
            }

            for (i = 0; i < shaderContent.varyingList.length; i++) {
                varName = shaderContent.varyingList[i].varName;
                if ( !usage[varName] ){
                    usage[varName] = shaderContent.varyingList[i].clone();
                }
            }

            for (i = 0; i < shaderContent.tempList.length; i++) {
                varName = shaderContent.tempList[i].varName;
                usage[varName] = shaderContent.tempList[i].clone();
            }

            for (i = 0; i < shaderContent.uniformList.length; i++) {
                varName = shaderContent.uniformList[i].varName;
                usage[varName] = shaderContent.uniformList[i].clone();
            }

            for (i = 0; i < shaderContent.constList.length; i++) {
                varName = shaderContent.constList[i].varName;
                usage[varName] = shaderContent.constList[i].clone();
            }

            for (i = 0; i < shaderContent.sampler2DList.length; i++) {
                varName = shaderContent.sampler2DList[i].varName;
                usage[varName] = shaderContent.sampler2DList[i].clone();
            }

            for (i = 0; i < shaderContent.sampler3DList.length; i++) {
                varName = shaderContent.sampler3DList[i].varName;
                usage[varName] = shaderContent.sampler3DList[i].clone();
            }

            return shaderContent;
        }












        //************************************************************************
        //-shader helper----------------------------------------------------------
        //------------------------------------------------------------------------
        private readShader(str: string): GLSL.ShaderContent {
            var content: GLSL.ShaderContent = new GLSL.ShaderContent();

            var shaderStr: string = StringUtil.processShaderFile(str);

            var source: Array<string> = StringUtil.parseContent(shaderStr);
            var shaderLine: Array<string> = source.concat();
            while (shaderLine.length > 0) {

                var line: string = shaderLine[0];
                shaderLine.shift();

                var ret: string = this.getLineType(line);
                var index: number = -1;

                index = ret.indexOf("struct");
                if (index != -1) {
                    var tempArray: Array<string> = ret.split(" ");
                    var structStr: string = line;

                    content.addStruct(tempArray[1], structStr);
                    this.processStruct(tempArray[1], structStr, content);
                    continue;
                }

                index = ret.indexOf("function");
                if (index != -1) {
                    var tempArray: Array<string> = ret.split(" ");
                    var func: string = line;
                    content.addFunc(tempArray[1], func);
                    continue;
                }


                index = ret.indexOf("unknown");
                if (index != -1) {
                    var tempArray: Array<string> = StringUtil.parseLines(line);
                    var key: string = StringUtil.getVarKey(tempArray);
                    var valueType: string = StringUtil.getVarType(tempArray);
                    if (valueType == "sampler2D") {
                        var sampler2D: GLSL.Sampler2D = this.getSampler2D(line);
                        if (sampler2D)
                            content.addVar(sampler2D);
                    }
                    else if (valueType == "sampler3D") {
                        var sampler3D: GLSL.Sampler2D = this.getSampler3D(line);
                        if (sampler3D)
                            content.addVar(sampler2D);
                    }
                    else {
                        if (key == "attribute") {
                            var att: GLSL.Attribute = this.getAttribute(line);
                            if (att)
                                content.addVar(att);
                        }
                        else if (key == "varying") {
                            var varying: GLSL.Varying = this.getVarying(line);
                            if (varying)
                                content.addVar(varying);
                        }
                        else if (key == "uniform") {
                            var uniform: GLSL.Uniform = this.getUniform(line);
                            if (uniform)
                                content.addVar(uniform);
                        }
                        else if (key == "const") {
                            var ConstVar: GLSL.ConstVar = this.getConst(line);
                            if (ConstVar)
                                content.addVar(ConstVar);
                        }
                        else {
                            content.addVar(this.getTemper(line));
                        }
                    }
                    continue;
                }
            }

            return content;
        }

        private getLineType(line: string): string {
            var index: number = line.indexOf("{");
            if (index > 0) {
                var firstStr: string = line.substr(0, index);
                if (firstStr.indexOf("struct") >= 0) {
                    var s_pos: number = firstStr.lastIndexOf(" ");
                    s_pos++;
                    var structName: string = firstStr.substr(s_pos, firstStr.length - s_pos);
                    return ("struct " + structName);
                }
                if (firstStr.indexOf("=") < 0) {

                    var pos: number = line.indexOf("(");
                    var s_pos: number = line.lastIndexOf(" ", pos);
                    s_pos++;
                    var func: string = line.substr(s_pos, pos - s_pos);

                    return ("function " + func);
                }
            }
            return "unknown";
        }

        private getAttribute(shaderLine: string): GLSL.Attribute {
            var tempStr: string = shaderLine;
            var tmpName: string;
            var valueType: string;
            var attribute: GLSL.TmpVar;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            tmpName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            attribute = new GLSL.Attribute(tmpName, valueType);
            return attribute;
        }

        private getTemper(shaderLine: string): GLSL.TmpVar {
            var tempStr: string = shaderLine;
            var tmpName: string;
            var valueType: string;
            var tmpVar: GLSL.TmpVar;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            tmpName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            tmpVar = new GLSL.TmpVar(tmpName, valueType);
            return tmpVar;
        }

        private getVarying(shaderLine: string): GLSL.Varying {
            var tempStr: string = shaderLine;
            var varyingName: string;
            var valueType: string;
            var varying: GLSL.Varying;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            varyingName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            varying = new GLSL.Varying(varyingName, valueType );
            return varying;
        }

        private getUniform(shaderLine: string): GLSL.Uniform {
            var tempStr: string = shaderLine;
            var uniformName: string;
            var valueType: string;
            var uniform: GLSL.Uniform;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            uniformName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            uniform = new GLSL.Uniform(uniformName, valueType);
            return uniform;
        }

        private getConst(shaderLine: string): GLSL.ConstVar {
            var tempStr: string = shaderLine;
            var constVarName: string;
            var valueType: string;
            var varValue: string;
            var constVar: GLSL.ConstVar;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            constVarName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            varValue = StringUtil.getVarValue(tempArray);

            constVar = new GLSL.ConstVar(constVarName, valueType, varValue);

            return constVar;
        }

        private getSampler2D(shaderLine: string): GLSL.Sampler2D {
            var tempStr: string = shaderLine;
            var sampler2DName: string;
            var valueType: string;
            var sampler2D: GLSL.Sampler2D;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            sampler2DName = StringUtil.getVarName(tempArray);
            sampler2D = new GLSL.Sampler2D(sampler2DName);
            return sampler2D;
        }

        private getSampler3D(shaderLine: string): GLSL.Sampler3D {
            var tempStr: string = shaderLine;
            var sampler3DName: string;
            var valueType: string;
            var sampler3D: GLSL.Sampler3D;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            sampler3DName = StringUtil.getVarName(tempArray);

            sampler3D = new GLSL.Sampler3D(sampler3DName);
            return sampler3D;
        }

        private filterCharacter(name: string): string {
            var src: string = name;
            var dest: string = src;
            for (var i: number = 0; i < ShaderSystemTool._filterChar.length; ++i) {
                while (true) {
                    dest = src.replace(ShaderSystemTool._filterChar[i], "");
                    if (src == dest) {
                        break;
                    }
                    src = dest;
                }
            }
            return dest;
        }

        private processStruct(name: string, structStr: string, content: GLSL.ShaderContent) {
            var pos: number = structStr.lastIndexOf("}");
            pos++;
            var end: number = structStr.lastIndexOf(";");
            var varName = structStr.substr(pos, end - pos);
            var varList: Array<string> = StringUtil.parseLines(varName);
            for (var i: number = 0; i < varList.length; ++i) {
                var varTmp: GLSL.TmpVar = this.getTemper(name + " " + varList[i] + ";");
                if (varTmp)
                    content.addVar(varTmp);
            }
        }
    }
}