module BlackSwan.GLSL {
    export class StructVar extends VarRegister {
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.key = "struct";
            this.valueType = valueType;
        }
    }
}  