module Egret3D {
    export class LightBase extends Object3D {

        protected _lightType: number = -1 ;
        protected _ambient: Vector3D = new Vector3D(1.0,1.0,1.0 );
        protected _diffuse: Vector3D = new Vector3D(1.0, 1.0, 1.0 );
        protected _specular: Vector3D = new Vector3D(1.0, 1.0, 1.0 );
        protected _halfVector: Vector3D = new Vector3D(1.0, 1.0, 1.0 );

        
        protected _intensity: number = 1;
        protected _spotExponent: number = 1.1 ;
        protected _spotCutoff: number = 0.7;
        protected _spotCosCutoff: number = 0.1 ;
        protected _constantAttenuation: number = 0.1;
        protected _linearAttenuation: number = 0.1;
        protected _quadraticAttenuation: number = 0.1;

        public _lightIndex: number = -1;

        private len: number = 25 ;
        private _change: boolean = true;
        constructor() {
            super();
        }

        public set intensity(value: number) {
            if (this._intensity != value){
                this._intensity = value;
                this._change = false;
            }
        }

        public get intensity(): number {
            return this._intensity;
        }

        public set ambient(color: number) {
            this._ambient.w = (color >> 24 & 0xff) / 255;
            this._ambient.x = (color >> 16 & 0xff) / 255;
            this._ambient.y = (color >> 8 & 0xff) / 255;
            this._ambient.z = (color & 0xff) / 255;
            this._change = false;
        }

        public get ambient(): number {
            return 0;
        }

        public set diffuse(color: number) {
            this._diffuse.w = (color >> 24 & 0xff) / 255;
            this._diffuse.x = (color >> 16 & 0xff) / 255;
            this._diffuse.y = (color >> 8 & 0xff) / 255;
            this._diffuse.z = (color & 0xff) / 255;
            this._change = false;
        }

        public get diffuse(): number {
            return 0;
        }

        public set specular(color: number) {
            this._specular.w = (color >> 24 & 0xff) / 255;
            this._specular.x = (color >> 16 & 0xff) / 255;
            this._specular.y = (color >> 8 & 0xff) / 255;
            this._specular.z = (color & 0xff) / 255;
            this._change = false;
        }

        public get specular(): number {
            return 0;
        }

        private init() {
            
        }

        public updateLightData(index:number, lightData: Float32Array) {
          
        }

        /**
        * updata the render target state
        */
        //public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D) {
        //    super.rendenDiffusePass(context3D, camera3D);
        //}

    }
}