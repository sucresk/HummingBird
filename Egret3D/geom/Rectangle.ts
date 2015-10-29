module Egret3D {
    export class Rectangle {
        public x: number = 0;
        public y: number = 0;
        public width: number = 0;
        public height: number = 0;

        constructor(x: number = 0, y: number = 0, width: number = 32, height: number = 32) {
            this.x = x;
            this.y = y;
            this.width = width; 
            this.height = height;
        }

    }
} 