module Egret3D {

    export interface ICubeTexture {

        /**
        * @readOnly
        */
        gpu_texture: any;

        /**
        * @readOnly
        */
        image: HTMLImageElement;
        
        /**
        * @readOnly
        */
        image_front: HTMLImageElement;
        
        /**
        * @readOnly
        */
        image_back: HTMLImageElement;
        
        /**
        * @readOnly
        */
        image_left: HTMLImageElement;
        
        /**
        * @readOnly
        */
        image_right: HTMLImageElement;
        
        /**
        * @readOnly
        */
        image_up: HTMLImageElement;
        
        /**
        * @readOnly
        */
        image_down: HTMLImageElement;
    }
}