module Egret3D.GLSL {
    export class Sampler3D extends VarRegister {  
        constructor(name: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "samplerCube";
        }
    }
} 