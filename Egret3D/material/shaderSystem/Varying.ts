module BlackSwan.GLSL {
    export class Varying extends VarRegister {
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "varying";
            this.valueType = valueType;
        }
    }
} 