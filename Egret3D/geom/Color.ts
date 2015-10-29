module Egret3D {

    export class Color {

        public a: number = 255;
        public r: number = 255;
        public g: number = 255;
        public b: number = 255;

        public static white(): Color {
            return new Color(255, 255, 255, 255);
        }

        public static black(): Color {
            return new Color(0, 0, 0, 255);
        }

        public static red(): Color {
            return new Color(255, 0, 0, 255);
        }

        public static green(): Color {
            return new Color(0, 255, 0, 255);
        }

        public static blue(): Color {
            return new Color(0, 0, 255, 255);
        }

        constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 255) {
            this.a = a;
            this.r = r;
            this.g = g;
            this.b = b;
        }

        public getColor(colorFormat: number = Egret3DDrive.ColorFormat_RGBA8888): number {

            if (colorFormat == Egret3DDrive.ColorFormat_RGB565)
                return 0;

            if (colorFormat == Egret3DDrive.ColorFormat_RGBA5551)
                return 0;

            if (colorFormat == Egret3DDrive.ColorFormat_RGBA4444)
                return 0;
            
            return this.r << 24 | this.g << 16 | this.b << 8 | this.a;
        }

        public lerp(c0: Color, c1: Color, t: number): void {
            ///t(c1 - c0) + c0

            this.a = t * (c1.a - c0.a) + c0.a;
            this.r = t * (c1.r - c0.r) + c0.r;
            this.g = t * (c1.g - c0.g) + c0.g;
            this.b = t * (c1.b - c0.b) + c0.b;
        }
    }
} 