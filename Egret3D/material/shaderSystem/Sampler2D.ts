module BlackSwan.GLSL {
    export class Sampler2D extends VarRegister {
        public texture: BlackSwan.ImageTexture;
        constructor(name: string) {
            super();
            this.name = name;
            this.varType = "sampler2D";
            //this.valueType = valueType;
        }
    }
} 