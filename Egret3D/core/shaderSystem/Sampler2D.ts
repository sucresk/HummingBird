module Egret3D.GLSL {
    export class Sampler2D extends VarRegister {
        constructor(name: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "sampler2D";
            ///this.valueType = valueType;
        }
    }
} 