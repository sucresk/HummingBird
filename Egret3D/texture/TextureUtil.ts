module Egret3D {
    export class TextureUtil {
        private static context2D: CanvasRenderingContext2D; 
        private static canvas2D: HTMLCanvasElement; 

        public static getTextureData(image: HTMLImageElement): HTMLCanvasElement {
            
            var width: number = 1024 ;//image["width"];
            var height: number = 1024  ;//image["height"];
            
            TextureUtil.canvas2D.width = width;
            TextureUtil.canvas2D.height = height;

            TextureUtil.context2D.clearRect(0, 0, width, height);
            TextureUtil.context2D.drawImage(image, 0, 0, width, height ,
                0, 0, width, height); 

            return TextureUtil.canvas2D;
      
        }

        public static regist() {
            if (!TextureUtil.canvas2D){
              TextureUtil.canvas2D = <HTMLCanvasElement>document.getElementById("TextureCanvasUtil");
                if (!TextureUtil.context2D) {
                    TextureUtil.canvas2D = <HTMLCanvasElement>document.createElement("canvas");
                    TextureUtil.canvas2D.id = "TextureCanvasUtil";
                    TextureUtil.canvas2D.hidden = true; 
                    document.body.appendChild(TextureUtil.canvas2D);
                    TextureUtil.context2D = <CanvasRenderingContext2D>TextureUtil.canvas2D.getContext("2d");
                }
            }
        }
    }
} 