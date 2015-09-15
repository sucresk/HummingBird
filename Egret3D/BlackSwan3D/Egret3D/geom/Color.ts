module BlackSwan {

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

        public getColor(colorFormat: ColorFormat = ColorFormat.RGBA8888): number {

            if (colorFormat == ColorFormat.RGB565)
                return 0;

            if (colorFormat == ColorFormat.RGBA5551)
                return 0;

            if (colorFormat == ColorFormat.RGBA4444)
                return 0;

            return this.r << 24 | this.g << 16 | this.b << 8 | this.a;
        }
    }
} 