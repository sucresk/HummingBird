module Egret3D {
    export class TGA {
        public width: number;
        public height: number;
        public data: Uint8Array;
        constructor(data:Uint8Array, width:number, height:number) {
            this.data = data;
            this.width = width;
            this.height = height;
        }
    }

} 