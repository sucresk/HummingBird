module Egret3D {
    export interface ICubeTexture {
        gpu_texture: any;
        image: HTMLImageElement;

        image_front: HTMLImageElement;
        image_back: HTMLImageElement;
        image_left: HTMLImageElement;
        image_right: HTMLImageElement;
        image_up: HTMLImageElement;
        image_down: HTMLImageElement;
    }
}