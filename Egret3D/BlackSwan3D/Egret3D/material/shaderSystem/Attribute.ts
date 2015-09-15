module BlackSwan.GLSL {
    export class Attribute extends VarRegister {
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.varType = "attribute";
            this.valueType = valueType;
        }
    }
} 