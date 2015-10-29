module Egret3D {
    export class ParticleData {
        sum: number = 10;
        width: number = 1;
        height: number = 1;
        depth: number = 1;

        nodeData: any;
        geometry: GeometryBase;

        hasBillborad: boolean;
        hasBillboradX: boolean;
        hasBillboradY: boolean;
        hasBillboradZ: boolean;

        hasSpeedNode: boolean; 
        hasAccSpeedNode: boolean; 
        hasRotationNode: boolean; 
        hasAccRotationNode: boolean; 


    }
}