module BlackSwan {
    export class ControllerBase {
        protected _autoUpdate:boolean = true;
        protected _target: Object3D;

        /**
         * Base controller class for dynamically adjusting the propeties of a 3D object.
         *
         * @param    targetObject    The 3D object on which to act.
         */
        constructor(targetObject: Object3D = null) {
            this._target = targetObject;
        }

        /**
		 * Target object on which the controller acts. Defaults to null.
		 */
        public get target(): Object3D {
            return this._target;
        }

        public set target(val: Object3D) {
            if (this._target == val)
                return;

            //if (this._target && _autoUpdate)
            //    this._target._controller = null;

            this._target = val;

            //if (this._target && _autoUpdate)
            //    this._target._controller = this;

            //notifyUpdate();
        }
		
		/**
		 * Determines whether the controller applies updates automatically. Defaults to true
		 */
        public get autoUpdate(): boolean {
            return this._autoUpdate;
        }

        public set autoUpdate(val: boolean) {
            if (this._autoUpdate == val)
                return;

            this._autoUpdate = val;

            //if (this._target) {
            //    if (_autoUpdate)
            //        this._target._controller = this;
            //    else
            //        this._target._controller = null;
            //}
        }


        protected  notifyUpdate()
		{
            //if (_targetObject && _targetObject.implicitPartition && _autoUpdate)
            //    _targetObject.implicitPartition.markForUpdate(_targetObject);
        }
		

		
        /**
         * Manually applies updates to the target 3D object.
         */
        public  update(interpolate: Boolean = true){
            //throw null ;
        }
    }
}