module BlackSwan {
    export class SportLight extends LightBase {

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
    }
} 


