module Egret3D {

    /**
    * @class Egret3D.Entity
    * @classdesc
    * 3d空间中的实体对象 extends Object3D
    */
    export class Entity extends Object3D{
        public bound: any;
        public canPick: boolean;
        public renderLayer: number;
        
        /**
        * @language zh_CN
        * constructor 
        */
        constructor() {
            super();
        }

    }
} 