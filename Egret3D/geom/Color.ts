module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.Color
     * @classdesc
     * 可使用 Color 类调整显示对象的颜色值
     */
    export class Color {

        
        /**
        * @language zh_CN
        * alpha
        */
        public a: number = 255;
                
        /**
        * @language zh_CN
        * red
        */
        public r: number = 255;
                
        /**
        * @language zh_CN
        * green
        */
        public g: number = 255;
                
        /**
        * @language zh_CN
        * blue
        */
        public b: number = 255;

                        
        /**
        * @language zh_CN
        * 返回白色
        * @retrun 白色
        */
        public static white(): Color {
            return new Color(255, 255, 255, 255);
        }
                                
        /**
        * @language zh_CN
        * 返回黑色
        * @retrun 黑色
        */
        public static black(): Color {
            return new Color(0, 0, 0, 255);
        }
                                
        /**
        * @language zh_CN
        * 返回白色
        * @retrun 白色
        */
        public static red(): Color {
            return new Color(255, 0, 0, 255);
        }
                                
        /**
        * @language zh_CN
        * 返回绿色
        * @retrun 绿色
        */
        public static green(): Color {
            return new Color(0, 255, 0, 255);
        }
                                
        /**
        * @language zh_CN
        * 返回蓝色
        * @retrun 蓝色
        */
        public static blue(): Color {
            return new Color(0, 0, 255, 255);
        }
                                        
        /**
        * @language zh_CN
        * constructor
        * @param r red
        * @param g green
        * @param b blue
        * @param a alpha
        */
        constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 255) {
            this.a = a;
            this.r = r;
            this.g = g;
            this.b = b;
        }
                                                
        /**
        * @language zh_CN
        * 以number值返加颜色
        * @param colorFormat 格式
        * @returns 颜色
        */
        public getColor(colorFormat: number = Egret3DDrive.ColorFormat_RGBA8888): number {

            if (colorFormat == Egret3DDrive.ColorFormat_RGB565)
                return 0;

            if (colorFormat == Egret3DDrive.ColorFormat_RGBA5551)
                return 0;

            if (colorFormat == Egret3DDrive.ColorFormat_RGBA4444)
                return 0;
            
            return this.r << 24 | this.g << 16 | this.b << 8 | this.a;
        }
                                                        
        /**
        * @language zh_CN
        * 颜色取差值
        * @param c0
        * @param c1
        * @param t (0.0-1.0)
        */
        public lerp(c0: Color, c1: Color, t: number): void {
            ///t(c1 - c0) + c0

            this.a = t * (c1.a - c0.a) + c0.a;
            this.r = t * (c1.r - c0.r) + c0.r;
            this.g = t * (c1.g - c0.g) + c0.g;
            this.b = t * (c1.b - c0.b) + c0.b;
        }
    }
} 