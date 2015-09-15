module BlackSwan {
    export class TextureBase {

        public border: number;
        public useMipmap: boolean;

        public width: number;
        public height: number;

        public imageData: HTMLImageElement;
        public mimapData: Array<MipmapData>;

        //gpu
        public texture: Texture2D;
        public upload(context3D: Context3D) {
           
        }
    }
}