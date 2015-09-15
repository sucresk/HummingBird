var BlackSwan;
(function (BlackSwan) {
    var GLSL;
    (function (GLSL) {
        var VaryingType = (function () {
            function VaryingType() {
            }
            VaryingType.bool = "bool";
            VaryingType.int = "int";
            VaryingType.float = "float";
            VaryingType.vec2 = "vec2";
            VaryingType.vec3 = "vec3";
            VaryingType.vec4 = "vec4";
            VaryingType.bvec2 = "bvec2";
            VaryingType.bvec3 = "bvec3";
            VaryingType.bvec4 = "bvec4";
            VaryingType.ivec2 = "ivec2";
            VaryingType.ivec3 = "ivec3";
            VaryingType.ivec4 = "ivec4";
            VaryingType.mat2 = "mat2";
            VaryingType.mat3 = "mat3";
            VaryingType.mat4 = "mat4";
            VaryingType.sampler2D = "sampler2D";
            VaryingType.sampleCube = "sampleCube";
            return VaryingType;
        })();
        GLSL.VaryingType = VaryingType;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=VaryingType.js.map