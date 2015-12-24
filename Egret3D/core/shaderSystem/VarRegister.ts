module Egret3D.GLSL {
                                                        
    /**
    * @class Egret3D.VarRegister
    * @classdesc
    * shader 变量 基类
    */
    export class VarRegister {
        
        /**
        * @language zh_CN
        * 值名字
        */
        public varName: string;/// a

        
        /**
        * @language zh_CN
        * 变量名
        */
        public name: string; /// a[0]
        
        /**
        * @language zh_CN
        * 变量属性类型
        */
        public key: string; /// att varying uniform

        /**
        * @language zh_CN
        * 变量类型
        */
        public valueType: string = ""; /// float vec2 vec3 vec4 int int2 int3 int4

        /**
        * @language zh_CN
        * 变量值
        */
        public value: any = ""; /// var value

        /**
        * @language zh_CN
        * usage use
        */
        public data: any;
        
        /**
        * @language zh_CN
        * texture
        */
        public texture: Egret3D.TextureBase;
                
        /**
        * @language zh_CN
        * uniform Index
        */
        public uniformIndex: any;
                        
        /**
        * @language zh_CN
        * active Texture Index
        */
        public activeTextureIndex: number = -1; 
                                
        /**
        * @language zh_CN
        * index
        */
        public index: number = -1; 
                                        
        /**
        * @language zh_CN
        * level
        */
        public level: string;
                                                
        /**
        * @language zh_CN
        * 得到组合后的字符串
        * @param compoments
        */
        public var(compoments: string): string {
            return this.level + " " + this.valueType + " " + name + "." + compoments;
        }
                                                        
        /**
        * @language zh_CN
        * 
        * @param compoments
        */
        public use(compoments: string = ""): string {
            if (compoments != "")
                return this.name + "." + compoments;
            return this.name;
        }
                                                                
        /**
        * @language zh_CN
        * 
        * @returns VarRegister
        */
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