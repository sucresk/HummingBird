var BlackSwan;
(function (BlackSwan) {
    var GLSL;
    (function (GLSL) {
        var VarRegister = (function () {
            function VarRegister() {
                this.varType = "";
                this.valueType = "";
            }
            VarRegister.prototype.var = function (compoments) {
                return this.level + " " + this.valueType + " " + name + "." + compoments;
            };
            VarRegister.prototype.use = function (compoments) {
                if (compoments === void 0) { compoments = ""; }
                if (compoments != "")
                    return this.name + "." + compoments;
                return this.name;
            };
            return VarRegister;
        })();
        GLSL.VarRegister = VarRegister;
    })(GLSL = BlackSwan.GLSL || (BlackSwan.GLSL = {}));
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=VarRegister.js.map