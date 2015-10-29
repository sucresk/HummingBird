module Egret3D {

    export enum BlendMode {
        ALPHA , 
        LAYER , 
        NORMAL , 
        MULTIPLY , 
        ADD , 
        SUB , 
        DIV , 
        SCREEN 
    }

    export class ContextSamplerType {

        public static TEXTURE_0: any;
        public static TEXTURE_1: any;
        public static TEXTURE_2: any;
        public static TEXTURE_3: any;
        public static TEXTURE_4: any;
        public static TEXTURE_5: any;
        public static TEXTURE_6: any;
        public static TEXTURE_7: any;
        public static TEXTURE_8: any;

        /**
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static REPEAT: number;

        /**
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static NEAREST: number;

           /**
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static LINEAR: number;
    }

} 