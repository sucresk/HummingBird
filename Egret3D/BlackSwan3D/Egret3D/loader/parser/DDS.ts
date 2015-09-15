module BlackSwan {
    export class DDS {
        public mipmaps: Array<BlackSwan.Mipmap>;
        public width: number;
        public height: number;
        public format: number;
        public mipmapCount: number;
        public isCubemap: boolean;
        constructor() {
            this.mipmaps = new Array<BlackSwan.Mipmap>();
            this.width = 0;
            this.height = 0;
            this.format = null;
            this.mipmapCount = 1;
        }
    }

}