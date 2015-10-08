module BlackSwan {
    export class LookAtController extends ControllerBase{

        protected _lookAtObject:Object3D;
        protected _origin: Vector3D = new Vector3D(0.0, 0.0, 0.0);
        protected _lookAtPosition: Vector3D = new Vector3D();


        private _eyesPos: Vector3D = new Vector3D();
        private _up: Vector3D = Vector3D.Y_AXIS;

        private _eyesLength: number = 0;
        private _rotaEyesLine: Vector3D = new Vector3D();
        private _eyesLine: Vector3D = new Vector3D();
        private _rotaAngle: Vector3D = new Vector3D();

        private _matRot: Matrix4_4 = new Matrix4_4();

        private _tempVec: Vector3D = new Vector3D();

        private _mouseDown: boolean = false;

        private _screenMoveStartDetail: Point = new Point();
        private _screenMoveDelay: Point = new Point();

        private _isUpdate: boolean = false;

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

            this._eyesPos.copyFrom(targetObject.position);
            this._lookAtPosition.copyFrom(lookAtObject.position);

            this._eyesLine.copyFrom(this._lookAtPosition.subtract(this._eyesPos));
            this._eyesLine.normalize();
            this._rotaEyesLine.copyFrom(this._eyesLine);
            this._target.position = this._eyesPos;
            //this._target.lookAt(this._lookAtPosition, this._up);

            window.onmousewheel = (e: MouseWheelEvent) => this.mouseWheel(e);

            window.onmousedown = (e: MouseEvent) => this.mouseStart(e);
            window.onmouseup = (e: MouseEvent) => this.mouseEnd(e);
            window.onmousemove = (e: MouseEvent) => this.mouseMove(e);
        }

        /**
         * The Vector3D object that the target looks at.
         */
        public  get lookAtPosition(): Vector3D {
            return this._lookAtPosition;
        }

        public  set lookAtPosition(val: Vector3D) {
            if (this._lookAtObject)
                this._lookAtObject = null;

            this._lookAtPosition.copyFrom(val);
            
            this.notifyUpdate();
        }
		
		/**
		 * The 3d object that the target looks at.
		 */
        public  get lookAtObject(): Object3D {
            return this._lookAtObject;
        }

        public set lookAtObject(val: Object3D) {
            if (this._lookAtObject == val)
                return;

            this._lookAtObject = val;
            this._lookAtPosition.copyFrom(this._lookAtObject.position);

            this.notifyUpdate();
        }

        public setEyesLength(length: number) {
            this._eyesLength = length;
            if (this._eyesLength < 1) {
                this._eyesLength = 1;
            }
        }

        public set rotationX(value: number) {
            this._rotaAngle.x = value;
        }

        public set rotationY(value: number) {
            this._rotaAngle.y = value;
        }

        public set rotationZ(value: number) {
            this._rotaAngle.z = value;
        }
		
		/**
		 * @inheritDoc
		 */
        public update(interpolate: boolean = true){
            interpolate = interpolate; // prevents unused warning
			
            if (this._target) {

                if (this._lookAtObject) {
                    this._lookAtPosition.copyFrom(this._lookAtObject.position);
                }

                this._tempVec.copyFrom(this._rotaEyesLine);
                this._tempVec.scaleBy(this._eyesLength);
                this._eyesPos.copyFrom(this._lookAtPosition.subtract(this._tempVec));
                this._matRot.identity();
                this._matRot.appendRotation(this._rotaAngle.x, Vector3D.Y_AXIS);
                this._matRot.appendRotation(this._rotaAngle.y, Vector3D.X_AXIS);

                this._rotaEyesLine.copyFrom(this._matRot.transformVector(this._eyesLine));
                this._rotaEyesLine.normalize();

                this._target.position = this._eyesPos;
                //this._target.lookAt(this._lookAtPosition, this._up);
            }
        }

        public mouseEnd(e: MouseEvent) {
            this._mouseDown = false;
        }

        public mouseStart(e: MouseEvent) {
            this._mouseDown = true;
            this._screenMoveStartDetail.x = e.screenX;
            this._screenMoveStartDetail.y = e.screenY;
        }

        public mouseMove(e: MouseEvent) {

            this._screenMoveDelay.x = e.screenX - this._screenMoveStartDetail.x;
            this._screenMoveDelay.y = e.screenY - this._screenMoveStartDetail.y;

            this._screenMoveStartDetail.x = e.screenX;
            this._screenMoveStartDetail.y = e.screenY;
            if (this._mouseDown) {
                this._rotaAngle.x += this._screenMoveDelay.x;
                this._rotaAngle.y += this._screenMoveDelay.y;

                if (this._rotaAngle.y >= 60.0 || this._rotaAngle.y <= -60) {
                    this._rotaAngle.y -= this._screenMoveDelay.y;
                }
            }
        }

        public mouseWheel(e: MouseWheelEvent) {
            this.setEyesLength(this._eyesLength + e.wheelDelta * 0.1);
        }
    }
} 