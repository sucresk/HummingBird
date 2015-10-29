module Egret3D {
    export class SpotLight extends LightBase {
        public static stride: number = 14;
       //lightPos 3
       //spotCosCutoff 1
       //spotColor 3
       //spotDirection 3 
       //spotExponent 1
       //constantAttenuation 1
       //linearAttenuation 1
       //quadrAttenuation 1
        constructor(color: Vector3D) {
            super();
            this._diffuse = color;
            this._lightType = 2 ;
        }

        public set spotCosCutoff(value: number) {
            this._spotCosCutoff = value;
        }

        public get spotCosCutoff(): number {
            return this._spotCosCutoff ;
        }

        public set spotExponent(value: number) {
            this._spotExponent = value; 
        }

        public get spotExponent(): number {
            return this._spotExponent;
        }

        public set constantAttenuation(value: number) {
            this._constantAttenuation = value;
        }

        public get constantAttenuation(): number {
            return this._constantAttenuation ;
        }

        public set linearAttenuation(value: number) {
            this._linearAttenuation = value;
        }

        public get linearAttenuation(): number {
            return this._linearAttenuation;
        }

        public set quadraticAttenuation(value: number) {
            this._quadraticAttenuation = value;
        }

        public get quadraticAttenuation(): number {
            return this._quadraticAttenuation;
        }

       //lightPos 3
       //spotDirection 3 
       //spotColor 3
       //spotExponent 1
       //spotCosCutoff 1
       //constantAttenuation 1
       //linearAttenuation 1
       //quadrAttenuation 1
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


