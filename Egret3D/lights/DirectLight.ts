module Egret3D {
    export class DirectLight extends LightBase {
        public static stride: number = 7;
        //direction 3 
        //color 3 
        //intensity 1 
        constructor( dir:Vector3D ) {
            super();
            dir.normalize();
            this._lightType = 0;
            this._rot.x = dir.x;
            this._rot.y = dir.y;
            this._rot.z = dir.z;
        }

        public set castShadow(value: boolean) {
            //if (value )
            //    RttManager.getInstance().shadowMapRender.castShadowLight = this; 
        }

        public updateLightData(index: number, lightData: Float32Array) {
            lightData[index * DirectLight.stride + 0] = this._rot.x;
            lightData[index * DirectLight.stride + 1] = this._rot.y;
            lightData[index * DirectLight.stride + 2] = this._rot.z;
            
            lightData[index * DirectLight.stride + 3] = this._diffuse.x;
            lightData[index * DirectLight.stride + 4] = this._diffuse.y;
            lightData[index * DirectLight.stride + 5] = this._diffuse.z;
            
            lightData[index * DirectLight.stride + 6] = this._intensity;
        }
    }
} 