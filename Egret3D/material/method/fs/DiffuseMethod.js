var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var DiffuseMethod = (function (_super) {
        __extends(DiffuseMethod, _super);
        function DiffuseMethod() {
            _super.apply(this, arguments);
            this.angle = 0;
        }
        DiffuseMethod.prototype.initShaderSource = function () {
            this.usage.texture2D_0 = new BlackSwan.GLSL.Sampler2D(BlackSwan.GLSL.VarConstName.texture2D_0);
            this.usage.texture2D_0.texture = this.diffuseTexture;
            //声明-------------------------------------  
            var tvColor = this.shader.varTemp("tvColor", BlackSwan.GLSL.VaryingType.vec4);
            var temp = this.shader.varTemp("temp", BlackSwan.GLSL.VaryingType.vec4);
            var temp1 = this.shader.varTemp("temp1", BlackSwan.GLSL.VaryingType.vec3);
            this.dirlight = this.shader.varUnifrom("directLight", BlackSwan.GLSL.UniformType.vec4);
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
        };
        DiffuseMethod.prototype.initConstData = function () {
        };
        DiffuseMethod.prototype.getUse = function () {
            return null;
        };
        DiffuseMethod.prototype.getVarStr = function () {
            return "";
        };
        DiffuseMethod.prototype.activate = function (context3D, program3D, modeltransform, camera3D) {
            this.diffuseTexture.upload(context3D);
            this.usage.texture2D_0.index = context3D.getUniformLocation(program3D, this.usage.texture2D_0.name);
            this.dirlight.index = context3D.getUniformLocation(program3D, this.dirlight.name);
        };
        DiffuseMethod.prototype.updata = function (context3D, program3D, modeltransform, camera3D) {
            context3D.setTextureAt(this.usage.texture2D_0.index, this.usage.texture2D_0.texture.texture);
            context3D.setTexture2DSamplerState(BlackSwan.ContextSamplerType.NEAREST, BlackSwan.ContextSamplerType.NEAREST, BlackSwan.ContextSamplerType.REPEAT, BlackSwan.ContextSamplerType.REPEAT);
            context3D.uniform4f(this.dirlight.index, Math.sin(this.angle * 0.01), 0.8, Math.cos(this.angle * 0.01), 0.2);
            this.angle++;
        };
        return DiffuseMethod;
    })(BlackSwan.MethodBase);
    BlackSwan.DiffuseMethod = DiffuseMethod;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=DiffuseMethod.js.map