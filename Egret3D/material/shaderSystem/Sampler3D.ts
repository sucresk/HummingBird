module BlackSwan.GLSL {
    export class Sampler3D extends VarRegister {
        public texture: BlackSwan.ImageTexture;
        constructor(name: string) {
            super();
            this.name = name;
            this.varType = "sampler3D";
            //this.valueType = valueType;
        }
    }
} 