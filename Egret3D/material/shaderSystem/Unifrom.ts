module BlackSwan.GLSL {
    export class Unifrom extends VarRegister {
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.varType = "uniform";
            this.valueType = valueType;
        }
    }
} 