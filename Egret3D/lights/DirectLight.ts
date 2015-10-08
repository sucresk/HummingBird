module BlackSwan {
    export class DirectLight extends LightBase {

        public intensity: number = 1.0;
        constructor( dir:Vector3D ) {
            super();
            this._lightType = 0;
            this._rot.x = dir.x;
            this._rot.y = dir.y;
            this._rot.z = dir.z;
        }
    }
} 