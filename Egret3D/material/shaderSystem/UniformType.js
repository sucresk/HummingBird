var BlackSwan;
(function (BlackSwan) {
    var GLSL;
    (function (GLSL) {
        var UniformType = (function () {
            function UniformType() {
            }
            UniformType.bool = "bool";
            UniformType.int = "int";
            UniformType.float = "float";
            UniformType.vec2 = "vec2";
            UniformType.vec3 = "vec3";
            UniformType.vec4 = "vec4";
            UniformType.bvec2 = "bvec2";
            UniformType.bvec3 = "bvec3";
            UniformType.bvec4 = "bvec4";
            UniformType.ivec2 = "ivec2";
            UniformType.ivec3 = "ivec3";
            UniformType.ivec4 = "ivec4";
            UniformType.mat2 = "mat2";
            UniformType.mat3 = "mat3";
            UniformType.mat4 = "mat4";
            UniformType.sampler2D = "sampler2D";
            UniformType.sampleCube = "sampleCube";
            return UniformType;
        })();
        GLSL.UniformType = UniformType;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=UniformType.js.map