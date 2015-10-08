module BlackSwan.GLSL {
    export class Uniform extends VarRegister {
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "uniform";
            this.valueType = valueType;
        }
    }
} 