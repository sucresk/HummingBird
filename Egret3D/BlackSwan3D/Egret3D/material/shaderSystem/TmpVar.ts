module BlackSwan.GLSL {
    export class TmpVar extends VarRegister {
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.varType = "";
            this.valueType = valueType;
        }
    }
} 