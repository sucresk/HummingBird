var BlackSwan;
(function (BlackSwan) {
    var GLSL;
    (function (GLSL) {
        var AttributeType = (function () {
            function AttributeType() {
            }
            AttributeType.int = "int";
            AttributeType.float = "float";
            AttributeType.vec2 = "vec2";
            AttributeType.vec3 = "vec3";
            AttributeType.vec4 = "vec4";
            AttributeType.mat2 = "mat2";
            AttributeType.mat3 = "mat3";
            AttributeType.mat4 = "mat4";
            return AttributeType;
        })();
        GLSL.AttributeType = AttributeType;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=AttributeType.js.map