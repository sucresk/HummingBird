var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var StaticVertexMethod = (function (_super) {
        __extends(StaticVertexMethod, _super);
        function StaticVertexMethod() {
            _super.apply(this, arguments);
        }
        StaticVertexMethod.prototype.initShaderSource = function () {
            //--var---------------------------------------------------------------------------
            //---------------------------------------------------------------------------------
            this.usage.attribute_pos = this.shader.varAttribute(BlackSwan.GLSL.VarConstName.attribute_position, BlackSwan.GLSL.AttributeType.vec3);
            this.usage.attribute_normal = this.shader.varAttribute(BlackSwan.GLSL.VarConstName.attribute_normal, BlackSwan.GLSL.AttributeType.vec3);
            this.usage.attribute_uv0 = this.shader.varAttribute(BlackSwan.GLSL.VarConstName.attribute_uv0, BlackSwan.GLSL.AttributeType.vec2);
            this.usage.varying_pos = this.shader.varVarying(BlackSwan.GLSL.VarConstName.varying_pos, BlackSwan.GLSL.VaryingType.vec3);
            this.usage.varying_normal = this.shader.varVarying(BlackSwan.GLSL.VarConstName.varying_normal, BlackSwan.GLSL.VaryingType.vec3);
            this.usage.varying_uv0 = this.shader.varVarying(BlackSwan.GLSL.VarConstName.varying_uv0, BlackSwan.GLSL.VaryingType.vec2);
            this.usage.uniformModelMatrix = this.shader.varUnifrom(BlackSwan.GLSL.VarConstName.uniform_modelMatrix, BlackSwan.GLSL.UniformType.mat4);
            this.usage.uniformProjectionMatrix = this.shader.varUnifrom(BlackSwan.GLSL.VarConstName.uniform_projectionMatrix, BlackSwan.GLSL.UniformType.mat4);
            var temp = this.shader.varTemp("temp", BlackSwan.GLSL.AttributeType.vec4);
            //---------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------
            this.shader.mainFun();
            this.shader.mul(temp.use(), this.usage.uniformModelMatrix.use(), "vec4(" + this.usage.attribute_pos.use() + ",1.0 )");
            this.shader.mov(this.usage.varying_pos.use("xyz"), temp.use("xyz"));
            this.shader.mul(temp.use(), this.usage.uniformProjectionMatrix.use(), temp.use());
            this.shader.mov(this.usage.varying_normal.use(), this.usage.attribute_normal.use());
            this.shader.mov(this.usage.varying_uv0.use(), this.usage.attribute_uv0.use());
            this.shader.outPos(temp.use());
            this.shader.mainFunEnd();
        };
        StaticVertexMethod.prototype.initConstData = function () {
        };
        /**
        -pos 3 12 0
        -normal 3 12 12
        -tangent 3 12 24
        -color 4 16 36
        -uv0 2  8 52
        -uv1 8 60
        */
        StaticVertexMethod.prototype.activate = function (context3D, program3D, modeltransform, camera3D) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            this.geomtry.sharedVertexBuffer = context3D.creatVertexBuffer(this.geomtry.verticesData);
            this.geomtry.numberOfVertices = this.geomtry.verticesData.length / BlackSwan.GeomtryData.vertexAttLength;
            this.geomtry.vertexSizeInBytes = this.geomtry.positionSize * Float32Array.BYTES_PER_ELEMENT +
                3 * Float32Array.BYTES_PER_ELEMENT +
                3 * Float32Array.BYTES_PER_ELEMENT +
                4 * Float32Array.BYTES_PER_ELEMENT +
                2 * Float32Array.BYTES_PER_ELEMENT +
                2 * Float32Array.BYTES_PER_ELEMENT; //uv2
            this.geomtry.sharedIndexBuffer = context3D.creatIndexBuffer(this.geomtry.indexData);
            context3D.bindVertexBuffer(this.geomtry.sharedVertexBuffer);
            this.usage.attribute_pos.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_pos.name);
            this.usage.attribute_normal.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_normal.name);
            this.usage.attribute_uv0.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_uv0.name);
            this.usage.uniformModelMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniformModelMatrix.name);
            this.usage.uniformProjectionMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniformProjectionMatrix.name);
        };
        StaticVertexMethod.prototype.updata = function (context3D, program3D, modeltransform, camera3D) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            context3D.bindVertexBuffer(this.geomtry.sharedVertexBuffer);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_pos.index, 3, BlackSwan.Egret3D.FLOAT, false, this.geomtry.vertexSizeInBytes, 0);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_normal.index, 3, BlackSwan.Egret3D.FLOAT, false, this.geomtry.vertexSizeInBytes, 12);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_uv0.index, 2, BlackSwan.Egret3D.FLOAT, false, this.geomtry.vertexSizeInBytes, 52);
            context3D.uniformMatrix4fv(this.usage.uniformModelMatrix.index, false, modeltransform.rawData);
            context3D.uniformMatrix4fv(this.usage.uniformProjectionMatrix.index, false, camera3D.viewProjection.rawData);
        };
        return StaticVertexMethod;
    })(BlackSwan.MethodBase);
    BlackSwan.StaticVertexMethod = StaticVertexMethod;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=StaticVertexMethod.js.map