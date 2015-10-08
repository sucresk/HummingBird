module BlackSwan {
    export class PointLight extends LightBase {

        constructor(color: Vector3D ) {
            super();
            this._lightType = 1; 
            this._diffuse = color;
            this.intensity = 2.0; 
            this.constantAttenuation = 1; 
            this.linearAttenuation = 1; 
            this.quadraticAttenuation = 1; 
        }

        public set intensity(value: number) {
            this._intensity = value;
        }

        public get intensity(): number {
            return this._intensity;
        }

        public set constantAttenuation(value: number) {
            this._constantAttenuation = value;
        }

        public get constantAttenuation(): number {
            return this._constantAttenuation;
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

        /**
       * updata the render target state
       */
        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D) {
            super.rendenDiffusePass(context3D, camera3D);
        }
        
    }
} 