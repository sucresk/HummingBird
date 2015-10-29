module Egret3D.GLSL {
    export class Attribute extends VarRegister {
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "attribute";
            this.valueType = valueType;
        }
    }
} 