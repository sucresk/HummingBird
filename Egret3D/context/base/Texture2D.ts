module BlackSwan {

    //export enum number { Unknown = 0x0000, RGB565 = 0x8d62, RGBA5551 = 0x8057, RGBA4444 = 0x8056, RGBA8888 = 0x1908, DXT1_RGB = 0x83f0, DXT1_RGBA = 0x83f1, DXT3_RGBA = 0x83f2, DXT5_RGBA = 0x83f3 };

    export enum InternalFormat { PixelArray, CompressData, ImageData };

    export interface Texture2D {
        gpu_index: number;
        gpu_border: number;
        gpu_texture: any;
        gpu_colorformat: number;
        gpu_internalformat: InternalFormat;
      
        width: number ;
        height: number;
        image: HTMLImageElement;
        mipmapDatas: Array<MipmapData>;

        frameBuffer: any;
        renderbuffer: any;
    }
}