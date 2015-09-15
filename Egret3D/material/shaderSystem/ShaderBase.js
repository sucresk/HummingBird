var BlackSwan;
(function (BlackSwan) {
    var GLSL;
    (function (GLSL) {
        var ShaderBase = (function () {
            function ShaderBase() {
                this.source = "precision mediump float;            \t\n";
            }
            ShaderBase.prototype.initShaderSource = function () {
            };
            ShaderBase.prototype.getShaderSource = function () {
                this.initShaderSource();
                return this.source;
            };
            ShaderBase.prototype.mainFun = function () {
                this.source += "void main(void){; \r\n";
            };
            ShaderBase.prototype.mainFunEnd = function () {
                this.source += "} \r\n";
            };
            ShaderBase.prototype.varTemp = function (tempName, valueType) {
                this.source += valueType + " " + tempName + "; \r\n";
                var tmp = new GLSL.Attribute(tempName, valueType);
                return tmp;
            };
            ShaderBase.prototype.varAttribute = function (attributeName, valueType) {
                this.source += "attribute " + valueType + " " + attributeName + "; \r\n";
                var tmp = new GLSL.Attribute(attributeName, valueType);
                return tmp;
            };
            ShaderBase.prototype.varVarying = function (varyingName, valueType) {
                this.source += "varying " + valueType + " " + varyingName + "; \r\n";
                var tmp = new GLSL.Varying(varyingName, valueType);
                return tmp;
            };
            ShaderBase.prototype.varUnifrom = function (unifromName, valueType) {
                this.source += "uniform " + valueType + " " + unifromName + "; \r\n";
                var tmp = new GLSL.Unifrom(unifromName, valueType);
                return tmp;
            };
            //uniform sampler2D depthSampler
            ShaderBase.prototype.connectSampler = function (sampler) {
                this.source += "uniform sampler2D " + sampler.name + "; \r\n";
            };
            ShaderBase.prototype.connectVarying = function (varying) {
                this.source += "varying " + varying.valueType + " " + varying.name + "; \r\n";
            };
            ShaderBase.prototype.connectUniform = function (unifrom) {
                this.source += "uniform " + unifrom.valueType + " " + unifrom.name + "; \r\n";
            };
            ShaderBase.prototype.if = function (conditions) {
                this.source += "if(" + conditions + "){ ; \r\n";
            };
            ShaderBase.prototype.endif = function () {
                this.source += "} ; \r\n";
            };
            ShaderBase.prototype.discard = function () {
                this.source += "discard ; \r\n";
            };
            ShaderBase.prototype.mov = function (target, source) {
                this.source += target + " = " + source + "; \r\n";
            };
            ShaderBase.prototype.add = function (target, source1, source2) {
                this.source += target + " = " + source1 + " + " + source2 + "; \r\n";
            };
            ShaderBase.prototype.sub = function (target, source1, source2) {
                this.source += target + " = " + source1 + " - " + source2 + "; \r\n";
            };
            ShaderBase.prototype.mul = function (target, source1, source2) {
                this.source += target + " = " + source1 + " * " + source2 + "; \r\n";
            };
            ShaderBase.prototype.div = function (target, source1, source2) {
                this.source += target + " = " + source1 + " / " + source2 + "; \r\n";
            };
            ShaderBase.prototype.dot = function (target, source1, source2) {
                this.source += target + " = dot(" + source1 + " , " + source2 + ") ; \r\n";
            };
            ShaderBase.prototype.normalize = function (target, source) {
                this.source += target + " = normalize(" + source + ") ; \r\n";
            };
            ShaderBase.prototype.reflect = function (target, source1, source2) {
                this.source += target + " = reflect(" + source1 + " , " + source2 + ") ; \r\n";
            };
            ShaderBase.prototype.min = function (target, source1, source2) {
                this.source += target + " = min(" + source1 + " , " + source2 + ") ; \r\n";
            };
            ShaderBase.prototype.max = function (target, source1, source2) {
                this.source += target + " = max(" + source1 + " , " + source2 + ") ; \r\n";
            };
            ShaderBase.prototype.pow = function (target, source1, source2) {
                this.source += target + " = pow(" + source1 + " , " + source2 + ") ; \r\n";
            };
            ShaderBase.prototype.tex2D = function (target, tex, uv) {
                this.source += target + " = texture2D(" + tex + " , " + uv + ") ; \r\n";
            };
            ShaderBase.prototype.tex3D = function (target, tex, uv) {
                this.source += target + " = texture3D(" + tex + " , " + uv + ") ; \r\n";
            };
            ShaderBase.prototype.outColor = function (target) {
                this.source += "gl_FragColor = " + target + "  ; \r\n";
            };
            ShaderBase.prototype.outPos = function (target) {
                this.source += "gl_Position = " + target + "  ; \r\n";
            };
            return ShaderBase;
        })();
        GLSL.ShaderBase = ShaderBase;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=ShaderBase.js.map