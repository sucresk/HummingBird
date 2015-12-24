module Egret3D {
    export class ShaderSystemTool {
        private libs: string[] = [
            ///---ok------------------
            "default_vertex", 
            "diffuseMap_fragment", 
            "diffuse_fragmentEnd", 
            "normalMap_fragment", 
            "specularMap_fragment", 
            "diffuseMethod_fragment",
            "Color_fragment",
            "directLight_fragment",
            "sportLight_fragment",
            "pointLight_fragment", 
            "skeleton_vertex", 
            "particle_vertex", 
            "particle_vertexEnd", 
            ///---ok------------------
            ///"LightDiffuse_fragment", 
            "Shadow_vertex_static", 
            "Shadow_vertex_sksleton", 
            "Shadow_fragment", 
            "ShadowMapping_vertex", 
            "shadowmapping_fragment", 
            "depthMethod_fragment", 
            "normalMethod_fragment", 
            "postCanvas_vertex", 
            "postCanvas_fragment", 
            "sky_fragment", 
            "sky_vertex",  
            "spheresky_vertex",
            "spheresky_fragment",
            "terrainRGBA_fragment", 
            "warpedImage_fragment",
            "lightMap_fragment",
            "EnvironmentMapping_fragment", 
            "distanceFog_fragment", 
            "AOMap_fragment", 
            "wireframe_vertex",
            "wireframe_fragment",
            ///ok

            ///--particle--
            "particle_time",
            "particle_position",
            "particle_offset",
            "particle_speed",
            "particle_billboard",
            "particle_acceleration",
            "particle_lifeRotate",
            "particle_acceleRotate",
            "particle_scale",
            "particle_acceleScale",
            ///--particle--
            //post----
            "BrightPassFilter",
            "GaussianBlurHorizontal",
            "GaussianBlurVertical",
            "Composition",
            "Tonemaping",
        ];

        private _shaderLibs: any = {};
        private _methodLibs: any = {};
        private _loaderDict: { [url: string]: string } = {};

        private _loadFunc: Function;

        private _loadList: Array<string> = new Array<string>();

        private _shaderContentDict: { [name: string]: GLSL.ShaderContent } = {};
        private static _filterChar: string[] = [" ", "  ", ";", "\n", "\r", "\t", "\n", "\r", "\t"];

        private static _instance: ShaderSystemTool;

        /**
        * @language zh_CN
        * @readOnly
        * 单例
        */
        public static get instance(): ShaderSystemTool {
            if (!this._instance) {
                this._instance = new ShaderSystemTool();
            }
            return this._instance;
        }

        /**
        * @language zh_CN
        * 注册加载shader文件回调
        * @event func 加载完成响应
        */
        public static regist(func: Function) {
            this.instance._loadFunc = func;
            this.instance.load("");
        }

        private load(url:string) {
            for (var i: number = 0; i < this.libs.length; i++) {
                this._loadList.push(this.libs[i]);
            }
            for (var i: number = 0; i < this.libs.length; i++){
                var urlload: Egret3D.URLLoader = new Egret3D.URLLoader(url+"Egret3D/core/shaderSystem/shader/" + this.libs[i] + ".glsl");
                urlload.onLoadComplete = (loader: Egret3D.URLLoader) => this.onCompleteShader(loader);
                this._loaderDict[urlload.url] = this.libs[i];
            }
        }

        private onCompleteShader(loader: Egret3D.URLLoader) {
            var content: GLSL.ShaderContent = this.readShader(loader.data);
            content.name = this._loaderDict[loader.url];
            this._shaderLibs[content.name] = loader.data;
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

        /**
        * @language zh_CN
        * 得到shader内容
        * @param name shader 名字
        * @returns shader内容
        */
        public getShaderSource( name:string ): string {

            return this._shaderLibs[name] = this._shaderLibs[name] || "" ;
        }

        /**
        * @language zh_CN
        * 返回组合shader后的内容
        * @param shaderNameList 要组合的shader名字列表
        * @param usage
        * @returns shader 内容
        */
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

            ///usage.sampler3DList.length = 0; 
            ///for (i = 0; i < shaderContent.sampler3DList.length; i++) {
            ///    var sampler3D: GLSL.Sampler3D = shaderContent.sampler3DList[i].clone();
            ///    sampler3D.activeTextureIndex = this.getTextureIndex(i);
            ///    sampler3D.index = i;
            ///    usage.sampler3DList.push(sampler3D);
            ///}

            return shaderContent;
        }

        ///************************************************************************
        ///-shader helper----------------------------------------------------------
        ///------------------------------------------------------------------------
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
                    else if (valueType == "samplerCube") {
                        var sampler3D: GLSL.Sampler3D = this.getSampler3D(line);
                        if (sampler3D)
                            content.addVar(sampler3D);
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