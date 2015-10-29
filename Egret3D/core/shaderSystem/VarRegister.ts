module Egret3D.GLSL {
    export class VarRegister {

        public varName: string;/// a

        public name: string; /// a[0]
        public key:string; /// att varying uniform
        public valueType: string = ""; /// float vec2 vec3 vec4 int int2 int3 int4
        public value: any = ""; /// var value

        /// usage use
        public data: any;

        public texture: Egret3D.TextureBase;
        public uniformIndex: any;
        public activeTextureIndex: number = -1; 
        public index: number = -1; 

        public level:string ;
        public var(compoments: string): string {
            return this.level + " " + this.valueType + " " + name + "." + compoments;
        }

        public use(compoments: string = ""): string {
            if (compoments != "")
                return this.name + "." + compoments;
            return this.name;
        }

        public clone(): VarRegister {
            var temp: VarRegister = new VarRegister();
            temp.name = this.name;
            temp.valueType = this.valueType;
            temp.level = this.level;
            temp.varName = this.varName;
            temp.value = this.value;
            return temp;
        }

        protected computeVarName() {
            var index: number = this.name.indexOf("[");
            if (index >= 0) {
                this.varName = this.name.substr(0, index);
            }
            else {
                this.varName = this.name;
            }
        }
    }
} 