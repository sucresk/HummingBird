module Egret3D {
                        
    /**
     * @language zh_CN
     * @class Egret3D.SpotLight
     * @classdesc
     * 聚光灯数据处理
     */
    export class SpotLight extends LightBase {
        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        public static stride: number = 14;
        /**
         * @language zh_CN
         * constructor 
         * @param color {Vector3D}
         */
        constructor(color: Vector3D) {
            super();
            this._diffuse = color;
            this._lightType = 2 ;
        }
                                
        /**
         * @language en_US
         * @writeOnly
         * @param value Cutoff
         */
        public set spotCosCutoff(value: number) {
            this._spotCosCutoff = value;
        }
                
        /**
         * @language en_US
         * @readOnly
         * @returns Cutoff
         */
        public get spotCosCutoff(): number {
            return this._spotCosCutoff ;
        }
                        
        /**
         * @language en_US
         * @writeOnly
         * @param value 指数
         */
        public set spotExponent(value: number) {
            this._spotExponent = value; 
        }
                
        /**
         * @language en_US
         * @readOnly
         * @returns 指数
         */
        public get spotExponent(): number {
            return this._spotExponent;
        }
                                
        /**
         * @language en_US
         * @writeOnly
         * @param value 持续衰减
         */
        public set constantAttenuation(value: number) {
            this._constantAttenuation = value;
        }
                
        /**
         * @language en_US
         * @readOnly
         * @returns 持续衰减
         */
        public get constantAttenuation(): number {
            return this._constantAttenuation ;
        }

        /**
         * @language en_US
         * @writeOnly
         * @param value 线性衰减
         */
        public set linearAttenuation(value: number) {
            this._linearAttenuation = value;
        }
                
        /**
         * @language en_US
         * @readOnly
         * @returns 线性衰减
         */
        public get linearAttenuation(): number {
            return this._linearAttenuation;
        }
        
        /**
         * @language en_US
         * @writeOnly
         * @param value 2次衰减
         */
        public set quadraticAttenuation(value: number) {
            this._quadraticAttenuation = value;
        }
        
        /**
         * @language en_US
         * @readOnly
         * @returns 返回2次衰减
         */
        public get quadraticAttenuation(): number {
            return this._quadraticAttenuation;
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
            lightData[index * SpotLight.stride] = this.x;
            lightData[index * SpotLight.stride + 1] = this.y;
            lightData[index * SpotLight.stride + 2] = this.z;
          
            lightData[index * SpotLight.stride + 3] = this._rot.x;
            lightData[index * SpotLight.stride + 4] = this._rot.y;
            lightData[index * SpotLight.stride + 5] = this._rot.z;
         
            lightData[index * SpotLight.stride + 6] = this._diffuse.x;
            lightData[index * SpotLight.stride + 7] = this._diffuse.y;
            lightData[index * SpotLight.stride + 8] = this._diffuse.z;
          
            lightData[index * SpotLight.stride + 9] = this._spotExponent;
            lightData[index * SpotLight.stride + 10] = this._spotCosCutoff;
            lightData[index * SpotLight.stride + 11] = this._constantAttenuation;
            lightData[index * SpotLight.stride + 12] = this._linearAttenuation;
            lightData[index * SpotLight.stride + 13] = this._quadraticAttenuation;
        }
    }
} 


