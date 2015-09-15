module BlackSwan {
    export class HoverController extends LookAtController{
        private _currentPanAngle: number = 0;
        private _currentTiltAngle: number = 90;

        private _panAngle: number = 0;
        private _tiltAngle: number = 90;
        private _distance: number = 1000;
        private _minPanAngle: number = -Infinity;
        private _maxPanAngle: number = Infinity;
        private _minTiltAngle: number = -90;
        private _maxTiltAngle: number = 90;
        private _steps: number = 8;
        private _yFactor: number = 2;
        private _wrapPanAngle: boolean = false;


		/**
		 * Creates a new <code>HoverController</code> object.
		 */
        constructor(targetObject: Object3D = null, lookAtObject: Object3D = null, panAngle: number = 0, tiltAngle: number = 90, distance: number = 1000, minTiltAngle: number = -90, maxTiltAngle: number = 90, minPanAngle: number = NaN, maxPanAngle: number = NaN, steps: number = 8, yFactor: number = 2, wrapPanAngle: boolean = false) {
            super(targetObject, lookAtObject);
            this.distance = distance;
            this.panAngle = panAngle;
            this.tiltAngle = tiltAngle;
            this.minPanAngle = minPanAngle || -Infinity;
            this.maxPanAngle = maxPanAngle || Infinity;
            this.minTiltAngle = minTiltAngle;
            this.maxTiltAngle = maxTiltAngle;
            this.steps = steps;
            this.yFactor = yFactor;
            this.wrapPanAngle = wrapPanAngle;
			
            //values passed in contrustor are applied immediately
            this._currentPanAngle = this.panAngle;
            this._currentTiltAngle = this.tiltAngle;
        }

        /**
         * Fractional step taken each time the <code>hover()</code> method is called. Defaults to 8.
         *
         * Affects the speed at which the <code>tiltAngle</code> and <code>panAngle</code> resolve to their targets.
         *
         * @see    #tiltAngle
         * @see    #panAngle
         */
        public get steps(): number {
            return this._steps;
        }

        public set steps(val: number){
            val = (val < 1) ? 1 : val;

            if (this._steps == val)
                return;

            this._steps = val;
            
        }
		
		/**
		 * Rotation of the camera in degrees around the y axis. Defaults to 0.
		 */
        public get panAngle(): number {
            return this._panAngle;
        }

        public set panAngle(val: number) {
            val = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, val));

            if (this._panAngle == val)
                return;

            this._panAngle = val;

            this.notifyUpdate();
        }
		
        /**
		 * Elevation angle of the camera in degrees. Defaults to 90.
		 */
        public get tiltAngle(): number {
            return this._tiltAngle;
        }

        public  set tiltAngle(val: number) {
            val = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, val));

            if (this._tiltAngle == val)
                return;

            this._tiltAngle = val;

            this.notifyUpdate();
        }
		
		/**
		 * Distance between the camera and the specified target. Defaults to 1000.
		 */
        public get distance(): number {
            return this._distance;
        }

        public set distance(val: number) {
            if (this._distance == val)
                return;

            this._distance = val;

            this.notifyUpdate();
        }
		
		/**
		 * Minimum bounds for the <code>panAngle</code>. Defaults to -Infinity.
		 *
		 * @see    #panAngle
		 */
        public get minPanAngle(): number {
            return this._minPanAngle;
        }

        public  set minPanAngle(val: number) {
            if (this._minPanAngle == val)
                return;

            this._minPanAngle = val;

            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        }
		
		/**
		 * Maximum bounds for the <code>panAngle</code>. Defaults to Infinity.
		 *
		 * @see    #panAngle
		 */
        public  get maxPanAngle(): number {
            return this._maxPanAngle;
        }

        public  set maxPanAngle(val: number){
            if (this._maxPanAngle == val)
                return;

            this._maxPanAngle = val;

            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        }
		
		/**
		 * Minimum bounds for the <code>tiltAngle</code>. Defaults to -90.
		 *
		 * @see    #tiltAngle
		 */
        public get minTiltAngle(): number {
            return this._minTiltAngle;
        }

        public  set minTiltAngle(val: number){
            if (this._minTiltAngle == val)
                return;

            this._minTiltAngle = val;

            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        }
		
		/**
		 * Maximum bounds for the <code>tiltAngle</code>. Defaults to 90.
		 *
		 * @see    #tiltAngle
		 */
        public get maxTiltAngle(): number {
            return this._maxTiltAngle;
        }

        public  set maxTiltAngle(val: number){
            if (this._maxTiltAngle == val)
                return;

            this._maxTiltAngle = val;

            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        }
		
		/**
		 * Fractional difference in distance between the horizontal camera orientation and vertical camera orientation. Defaults to 2.
		 *
		 * @see    #distance
		 */
        public get yFactor(): number {
            return this._yFactor;
        }

        public  set yFactor(val: number){
            if (this._yFactor == val)
                return;

            this._yFactor = val;

            this.notifyUpdate();
        }
		
		/**
		 * Defines whether the value of the pan angle wraps when over 360 degrees or under 0 degrees. Defaults to false.
		 */
        public  get wrapPanAngle(): boolean {
            return this._wrapPanAngle;
        }

        public set wrapPanAngle(val: boolean) {
            if (this._wrapPanAngle == val)
                return;

            this._wrapPanAngle = val;

            this.notifyUpdate();
        }
	
		
		/**
		 * Updates the current tilt angle and pan angle values.
		 *
		 * Values are calculated using the defined <code>tiltAngle</code>, <code>panAngle</code> and <code>steps</code> variables.
		 *
		 * @param interpolate   If the update to a target pan- or tiltAngle is interpolated. Default is true.
		 *
		 * @see    #tiltAngle
		 * @see    #panAngle
		 * @see    #steps
		 */
		public update(interpolate: boolean = true) {
            if (this._tiltAngle != this._currentTiltAngle || this._panAngle != this._currentPanAngle) {

                this.notifyUpdate();

                if (this._wrapPanAngle) {
                    if (this._panAngle < 0)
                        this._panAngle = (this._panAngle % 360) + 360;
                else
                        this._panAngle = this._panAngle % 360;

                    if (this._panAngle - this._currentPanAngle < -180)
                        this._currentPanAngle -= 360;
                    else if (this._panAngle - this._currentPanAngle > 180)
                        this._currentPanAngle += 360;
            }

            if (interpolate) {
                this._currentTiltAngle += (this._tiltAngle - this._currentTiltAngle) / (this.steps + 1);
                this._currentPanAngle += (this._panAngle - this._currentPanAngle) / (this.steps + 1);
            } else {
                this._currentPanAngle = this._panAngle;
                this._currentTiltAngle = this._tiltAngle;
            }
				
            //snap coords if angle differences are close
            if ((Math.abs(this.tiltAngle - this._currentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._currentPanAngle) < 0.01)) {
                this._currentTiltAngle = this._tiltAngle;
                this._currentPanAngle = this._panAngle;
            }
        }

            var pos: Vector3D = (this.lookAtObject) ? this.lookAtObject.position : (this.lookAtObject) ? this._lookAtPosition : this._origin;
            this.target.x = pos.x + this.distance * Math.sin(this._currentPanAngle * Matrix3DUtils.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * Matrix3DUtils.DEGREES_TO_RADIANS);
            this.target.z = pos.z + this.distance * Math.cos(this._currentPanAngle * Matrix3DUtils.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * Matrix3DUtils.DEGREES_TO_RADIANS);
            this.target.y = pos.y + this.distance * Math.sin(this._currentTiltAngle * Matrix3DUtils.DEGREES_TO_RADIANS) * this.yFactor;

        super.update();
    }
    }
}