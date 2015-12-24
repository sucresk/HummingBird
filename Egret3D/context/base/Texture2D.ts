module Egret3D {

    ///export enum number { Unknown = 0x0000, RGB565 = 0x8d62, RGBA5551 = 0x8057, RGBA4444 = 0x8056, RGBA8888 = 0x1908, DXT1_RGB = 0x83f0, DXT1_RGBA = 0x83f1, DXT3_RGBA = 0x83f2, DXT5_RGBA = 0x83f3 };

    export enum InternalFormat { PixelArray, CompressData, ImageData };

    export interface Texture2D {
        
        /**
        * @readOnly
        */
        gpu_index: number;
        
        /**
        * @readOnly
        */
        gpu_border: number;
        
        /**
        * @readOnly
        */
        gpu_texture: any;
        
        /**
        * @readOnly
        */
        gpu_colorformat: number;
        
        /**
        * @readOnly
        */
        gpu_internalformat: InternalFormat;
      
        /**
        * @readOnly
        */
        width: number;
        
        /**
        * @readOnly
        */
        height: number;
        
        /**
        * @readOnly
        */
        image: HTMLImageElement;
        
        /**
        * @readOnly
        */
        mipmapDatas: Array<MipmapData>;
        
        /**
        * @readOnly
        */
        frameBuffer: WebGLFramebuffer;
        
        /**
        * @readOnly
        */
        renderbuffer: WebGLRenderbuffer;
    }
}