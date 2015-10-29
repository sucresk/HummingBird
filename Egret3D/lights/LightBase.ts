module BlackSwan {
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
            this._intensity = value;
        }

        public get intensity(): number {
            return this._intensity;
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