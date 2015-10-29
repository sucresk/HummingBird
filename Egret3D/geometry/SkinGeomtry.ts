module Egret3D {
    export class SkinGeomtry extends GeomtryBase {

        public initialSkeleton: Skeleton;

        public time0: number = 0;

        constructor() {
            super();
            this.geomtryType = GeomtryType.Skin;
        }

        public setGeomtryData(indexData: Array<number>, vertexData: Array<number>, skeleton: Skeleton) {
            this.indexData = indexData;
            this.verticesData = vertexData;
            this.numItems = indexData.length;
            this.initialSkeleton = skeleton;
        }
    }
} 