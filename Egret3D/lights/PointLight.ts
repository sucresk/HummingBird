module Egret3D {
    export class PointLight extends LightBase {
        public static stride: number = 7;
   
        constructor( color:number ) {
            super();
            this._lightType = 1; 
            this.diffuse = color;
        }

        //public set constantAttenuation(value: number) {
        //    this._constantAttenuation = value;
        //}

        //public get constantAttenuation(): number {
        //    return this._constantAttenuation;
        //}

        //public set linearAttenuation(value: number) {
        //    this._linearAttenuation = value;
        //}

        //public get linearAttenuation(): number {
        //    return this._linearAttenuation;
        //}

        //public set quadraticAttenuation(value: number) {
        //    this._quadraticAttenuation = value;
        //}

        //public get quadraticAttenuation(): number {
        //    return this._quadraticAttenuation;
        //}

        //lightPos 3
        //direction 3 
        //color 3
        //intensity
        //constantAttenuation 1
        //linearAttenuation 1
        //quadrAttenuation 1
        public updateLightData(index: number, lightData: Float32Array) {
            lightData[index * PointLight.stride] = this.x;
            lightData[index * PointLight.stride + 1] = this.y;
            lightData[index * PointLight.stride + 2] = this.z;

            lightData[index * PointLight.stride + 3] = this._diffuse.x;
            lightData[index * PointLight.stride + 4] = this._diffuse.y;
            lightData[index * PointLight.stride + 5] = this._diffuse.z;

            lightData[index * PointLight.stride + 6] = this._intensity;
        }

        /**
       * updata the render target state
       */
        //public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D) {
        //    super.rendenDiffusePass(context3D, camera3D);
        //}
        
    }
} 