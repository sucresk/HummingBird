module BlackSwan {
    export class LightBase extends RenderableItem {

        protected _lightType: number = -1 ;
        protected _ambient: Vector3D = new Vector3D(0.0,0.0,0.0 );
        protected _diffuse: Vector3D = new Vector3D(1.0, 1.0, 1.0 );
        protected _specular: Vector3D = new Vector3D(0.0, 0.0, 0.0 );
        protected _halfVector: Vector3D = new Vector3D(1.0, 1.0, 1.0 );

        
        protected _intensity: number = 1;
        protected _spotExponent: number = 1;
        protected _spotCutoff: number = 0.7;
        protected _spotCosCutoff: number = 0.1 ;
        protected _constantAttenuation: number = 0.8;
        protected _linearAttenuation: number = 0.8;
        protected _quadraticAttenuation: number = 0.8;

        public _lightIndex: number = -1;

        private len: number = 25 ;
        private _change: boolean = true;
        constructor() {
            super();
        }

        public set ambient(value:number) {
        }

        public get ambient(): number {
            return 0;
        }

        public set diffuse(value: number) {
        }

        public get diffuse(): number {
            return 0;
        }

        public set specular(value: number) {
        }

        public get specular(): number {
            return 0;
        }

        public set halfVector(value: number) {
        }

        public get halfVector(): number {
            return 0;
        }

        private init() {
            
        }

        public updata(index:number, lightData: Float32Array) {
            //light
            ////lightType
            //// 0 dirlight
            //// 1 pointlight
            //// 2 sportLight
            lightData[index * this.len + 0] = this._lightType;
            ////position
            lightData[index * this.len + 1] = this._pos.x ;
            lightData[index * this.len + 2] = this._pos.y ;
            lightData[index * this.len + 3] = this._pos.z ;
            ////spotExponent
            lightData[index * this.len + 4] = this._spotExponent ;
            ////dir
            lightData[index * this.len + 5] = this._rot.x;
            lightData[index * this.len + 6] = this._rot.y;
            lightData[index * this.len + 7] = this._rot.z;
            ////spotCutoff
            lightData[index * this.len + 8] = this._spotCutoff ;//0~1
            ////halfVector
            lightData[index * this.len +9] = this._halfVector.x;
            lightData[index * this.len + 10] = this._halfVector.y ;
            lightData[index * this.len + 11] = this._halfVector.z ;
            ////spotCosCutoff
            lightData[index * this.len +12] = this._spotCosCutoff ;//0~1
            ////ambient
            lightData[index * this.len + 13] = this._ambient.x ;
            lightData[index * this.len + 14] = this._ambient.y ;
            lightData[index * this.len + 15] = this._ambient.z ;
            ////diffuse
            lightData[index * this.len + 17] = this._diffuse.x * this._intensity;
            lightData[index * this.len + 18] = this._diffuse.y * this._intensity;
            lightData[index * this.len + 19] = this._diffuse.z * this._intensity;
            ////linearAttenuation
            lightData[index * this.len +20] = this._linearAttenuation ;
            ////specular
            lightData[index * this.len + 21] = this._specular.x;
            lightData[index * this.len + 22] = this._specular.y;
            lightData[index * this.len + 23] = this._specular.z;
            ////constantAttenuation
            lightData[index * this.len +16] = this._constantAttenuation ;
            ////quadraticAttenuation
            lightData[index * this.len +24] = this._quadraticAttenuation ;
        }

        /**
        * updata the render target state
        */
        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D) {
            super.rendenDiffusePass(context3D, camera3D);
        }

    }
}