module BlackSwan.GLSL {
    export class Sampler3D extends VarRegister {
        public texture: BlackSwan.TextureBase;
        constructor(name: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "sampler3D";
            //this.valueType = valueType;
        }
    }
} 