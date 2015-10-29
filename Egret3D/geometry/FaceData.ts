module Egret3D {
    export class FaceData {
        public vertexIndices: Array<number> = new Array<number>();
        public uvIndices: Array<number> = new Array<number>();
        public uv2Indices: Array<number> = new Array<number>();
        public normalIndices: Array<number> = new Array<number>();
        public colorIndices: Array<number> = new Array<number>();
        public indexIds: Array<any> = new Array<any>(); // used for real index lookups
    } 
}