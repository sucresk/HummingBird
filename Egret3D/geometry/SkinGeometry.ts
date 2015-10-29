module Egret3D {
    export class SkinGeometry extends GeometryBase {

        public initialSkeleton: Skeleton;

        public time0: number = 0;

        constructor() {
            super();
            this.geomtryType = GeometryType.Skin;
        }

        public setGeomtryData(indexData: Array<number>, vertexData: Array<number>, skeleton: Skeleton) {
            this.indexData = indexData;
            this.verticesData = vertexData;
            this.numItems = indexData.length;
            this.initialSkeleton = skeleton;
        }
    }
} 