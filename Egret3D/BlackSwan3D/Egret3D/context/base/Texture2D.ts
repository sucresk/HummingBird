module BlackSwan {

    export enum ColorFormat { Unknown = 0x0000, RGB565 = 0x8d62, RGBA5551 = 0x8057, RGBA4444 = 0x8056, RGBA8888 = 0x1908, DXT1_RGB = 0x83f0, DXT1_RGBA = 0x83f1, DXT3_RGBA = 0x83f2, DXT5_RGBA = 0x83f3 };

    export enum InternalFormat { PixelArray, CompressData, ImageData };

    export interface Texture2D {
        gpu_index: number;
        gpu_border: number;
        gpu_texture2D: any;
        gpu_colorformat: ColorFormat;
        gpu_internalformat: InternalFormat;
      
        image: HTMLImageElement;
        mipmapDatas: Array<MipmapData>;
    }
}