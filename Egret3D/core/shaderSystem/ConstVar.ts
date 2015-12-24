module Egret3D.GLSL {
                                    
    /**
    * @class Egret3D.ConstVar
    * @classdesc
    * 常量
    */
    export class ConstVar extends VarRegister {
                
        /**
        * @language zh_CN
        * constructor
        * @param name
        * @param valueType
        */
        constructor(name: string, valueType: string, value: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "const";
            this.valueType = valueType;
            this.value = value;
        }
    }
}  