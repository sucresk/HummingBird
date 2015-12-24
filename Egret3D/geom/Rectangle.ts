module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.Rectangle
     * @classdesc
     * Rectangle 类 表示矩形
     */
    export class Rectangle {

        /**
        * @language zh_CN
        * 矩形x坐标
        */
        public x: number = 0;
        
        /**
        * @language zh_CN
        * 矩形y坐标
        */
        public y: number = 0;
        
        /**
        * @language zh_CN
        * 矩形宽
        */
        public width: number = 0;
        
        /**
        * @language zh_CN
        * 矩形高
        */
        public height: number = 0;
                
        /**
        * @language zh_CN
        * constructor
        */
        constructor(x: number = 0, y: number = 0, width: number = 32, height: number = 32) {
            this.x = x;
            this.y = y;
            this.width = width; 
            this.height = height;
        }

    }
} 