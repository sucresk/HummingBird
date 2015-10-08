module BlackSwan.GLSL {
    export class TmpVar extends VarRegister {
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "";
            this.valueType = valueType;
        }
    }
} 