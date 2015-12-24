module Egret3D.openGLES {
    export class CubeTexture implements Egret3D.ICubeTexture {
        public gpu_texture: any;
        public image: HTMLImageElement;

        public image_front: HTMLImageElement;
        public image_back: HTMLImageElement;
        public image_left: HTMLImageElement;
        public image_right: HTMLImageElement;
        public image_up: HTMLImageElement;
        public image_down: HTMLImageElement;
        constructor(cubeTexture: WebGLTexture) {
            this.gpu_texture = cubeTexture;
        }
    }
}