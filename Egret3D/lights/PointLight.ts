module Egret3D {
                    
    /**
     * @language zh_CN
     * @class Egret3D.PointLight
     * @classdesc
     * 点光源数据处理
     */
    export class PointLight extends LightBase {
        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        public static stride: number = 7;
   
        /**
         * @language en_US
         * constructor
         * @param color 
         */
        /**
         * @language zh_CN
         * constructor 
         * @param color {Number}
         */
        constructor( color:number ) {
            super();
            this._lightType = 1; 
            this.diffuse = color;
        }

        /**
         * @language en_US
         * @param index 
         * @param lightData 
         */
        /**
         * @language zh_CN
         * 更新灯光数据
         * @param index 灯光ID
         * @param lightData 灯光数据
         */
        public updateLightData(index: number, lightData: Float32Array) {
            lightData[index * PointLight.stride] = this.x;
            lightData[index * PointLight.stride + 1] = this.y;
            lightData[index * PointLight.stride + 2] = this.z;

            lightData[index * PointLight.stride + 3] = this._diffuse.x;
            lightData[index * PointLight.stride + 4] = this._diffuse.y;
            lightData[index * PointLight.stride + 5] = this._diffuse.z;

            lightData[index * PointLight.stride + 6] = this._intensity;
        }
    }
} 