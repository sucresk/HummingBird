var BlackSwan;
(function (BlackSwan) {
    var ShaderSystemTool = (function () {
        function ShaderSystemTool() {
            this.libs = [
                "default_vertex"
            ];
            this.methodLibs = {};
        }
        ShaderSystemTool.prototype.load = function () {
            var _this = this;
            for (var i = 0; i < this.libs.length; i++) {
                var urlload = new xxq.URLLoader("shader/" + this.libs[i] + ".glsl");
                urlload.onLoadComplete = function (loader) { return _this.onCompleteShader(loader); };
            }
        };
        ShaderSystemTool.prototype.onCompleteShader = function (loader) {
            this.methodLibs[loader.url] = loader.data;
        };
        ShaderSystemTool.prototype.getVsShader = function (usage, shaderLib) {
            var shader = new BlackSwan.GLSL.ShaderBase();
            return shader;
        };
        ShaderSystemTool.prototype.getFsShader = function (usage, shaderLib) {
            var shader = new BlackSwan.GLSL.ShaderBase();
            return shader;
        };
        ShaderSystemTool.prototype.getAttribute = function () {
            return "";
        };
        ShaderSystemTool.prototype.getVar = function () {
            return "";
        };
        ShaderSystemTool.prototype.getUniform = function () {
            return "";
        };
        ShaderSystemTool.prototype.getFunction = function () {
            return "";
        };
        ShaderSystemTool.prototype.getUniformRegister = function () {
            return null;
        };
        //************************************************************************
        //------------------------------------------------------------------------
        //------------------------------------------------------------------------
        ShaderSystemTool.readShader = function (str) {
            var source = BlackSwan.StringUtil.readLines(str);
            var shaderLine = source.concat();
        };
        ShaderSystemTool.getAttribute = function (usage, shaderLine) {
            var tempStr = shaderLine[0];
            var tmpName;
            var valueType;
            var index = tempStr.indexOf("attribute_");
            var attribute;
            if (index != -1) {
                var tempArray = tempStr.split(" ");
                tmpName = tempArray[2];
                valueType = tempArray[1];
                attribute = new BlackSwan.GLSL.TmpVar(tmpName, valueType);
            }
            shaderLine.shift();
            if (usage[attribute.name])
                usage[attribute.name] = attribute;
            else {
            }
            return attribute;
        };
        ShaderSystemTool.getTemper = function (usage, shaderLine) {
            var tempStr = shaderLine[0];
            var tmpName;
            var valueType;
            var index = tempStr.indexOf("tem_");
            var tmpVar;
            if (index != -1) {
                var tempArray = tempStr.split(" ");
                tmpName = tempArray[1];
                valueType = tempArray[0];
                tmpVar = new BlackSwan.GLSL.TmpVar(tmpName, valueType);
            }
            shaderLine.shift();
            if (usage[tmpVar.name])
                usage[tmpVar.name] = tmpVar;
            return tmpVar;
        };
        ShaderSystemTool.getVarying = function (usage, shaderLine) {
            var tempStr = shaderLine[0];
            var varyingName;
            var valueType;
            var index = tempStr.indexOf("varying_");
            var varying;
            if (index != -1) {
                var tempArray = tempStr.split(" ");
                varyingName = tempArray[2];
                valueType = tempArray[1];
                varying = new BlackSwan.GLSL.Varying(varyingName, valueType);
            }
            shaderLine.shift();
            if (usage[varying.name])
                usage[varying.name] = varying;
            return varying;
        };
        ShaderSystemTool.getUniform = function (usage, shaderLine) {
            var tempStr = shaderLine[0];
            var unifromName;
            var valueType;
            var index = tempStr.indexOf("uniform_");
            var unifrom;
            if (index != -1) {
                var tempArray = tempStr.split(" ");
                unifromName = tempArray[2];
                valueType = tempArray[1];
                unifrom = new BlackSwan.GLSL.Unifrom(unifromName, valueType);
            }
            shaderLine.shift();
            if (usage[unifrom.name])
                usage[unifrom.name] = unifrom;
            return unifrom;
        };
        return ShaderSystemTool;
    })();
    BlackSwan.ShaderSystemTool = ShaderSystemTool;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=ShaderSystemTool.js.map