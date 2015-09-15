module BlackSwan {
    export class LookAtController extends ControllerBase{

        protected _lookAtPosition:Vector3D;
        protected _lookAtObject:Object3D;
        protected _origin:Vector3D = new Vector3D(0.0, 0.0, 0.0);
        /**
		 * Creates a new <code>LookAtController</code> object.
		 */
        constructor(targetObject: Object3D = null, lookAtObject: Object3D = null)
		{
            super(targetObject);

            if (lookAtObject)
                this.lookAtObject = lookAtObject;
            else
                this.lookAtPosition = new Vector3D();
        }


        /**
     * The Vector3D object that the target looks at.
     */
        public  get lookAtPosition(): Vector3D {
            return this._lookAtPosition;
        }

        public  set lookAtPosition(val: Vector3D) {
            if (this._lookAtObject) {
                this._lookAtObject = null;
            }

            this._lookAtPosition = val;
            
            this.notifyUpdate();
        }
		
		/**
		 * The 3d object that the target looks at.
		 */
        public  get lookAtObject(): Object3D {
            return this._lookAtObject;
        }

        public  set lookAtObject(val: Object3D) {
            if (this._lookAtPosition)
                this._lookAtPosition = null;

            if (this._lookAtObject == val)
                return;

            this._lookAtObject = val;

            this.notifyUpdate();
        }
		
		/**
		 * @inheritDoc
		 */
        public update(interpolate: boolean = true){
            interpolate = interpolate; // prevents unused warning
			
            if (this._target) {

                if (this._lookAtPosition)
                    this._target.lookAt(this._lookAtPosition);
                else if (this._lookAtObject)
                    this._target.lookAt(this._lookAtObject.position);
            }
        }
       
    }
} 