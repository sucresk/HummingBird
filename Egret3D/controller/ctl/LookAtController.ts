module BlackSwan {
    export class LookAtController extends ControllerBase{

        protected _lookAtObject:Object3D;
        protected _origin: Vector3D = new Vector3D(0.0, 0.0, 0.0);
        protected _lookAtPosition: Vector3D = new Vector3D();

        private _eyesPos: Vector3D = new Vector3D();
        private _up: Vector3D = Vector3D.Y_AXIS;

        private _eyesLength: number = 0;
        private _rotaEyesLine: Vector3D = new Vector3D(0, 0, 1);
        private _eyesLine: Vector3D = new Vector3D(0, 0, 1);
        private _rotaAngle: Vector3D = new Vector3D();

        private _matRot: Matrix4_4 = new Matrix4_4();

        private _tempVec: Vector3D = new Vector3D();
        private _matTemp: Matrix4_4 = new Matrix4_4();

        private _mouseDown: boolean = false;
        private _mouseRightDown: boolean = false;

        private _screenMoveStartDetail: Point = new Point();
        private _screenMoveDelay: Point = new Point();

        private _isUpdate: boolean = false;

        private _elapsed: number = 0;
        private _speed: number = 3;

        private _keyArray: Array<boolean> = new Array<boolean>();

        public lookAtOffset: Vector3D = new Vector3D(0, 0, 0);
        public firstCamera: boolean = false;
        /**
		 * Creates a new <code>LookAtController</code> object.
		 */
        constructor(targetObject: Object3D = null, lookAtObject: Object3D = null)
        {
            super(targetObject);

            this._keyArray.push(false);
            this._keyArray.push(false);
            this._keyArray.push(false);
            this._keyArray.push(false);

            if (lookAtObject)
                this.lookAtObject = lookAtObject;
            else
                this.lookAtPosition = new Vector3D();

            this._eyesPos.copyFrom(targetObject.position);
            this._lookAtPosition.copyFrom(lookAtObject.position.add(this.lookAtOffset));

            //this._eyesLine.copyFrom(this._lookAtPosition.subtract(this._eyesPos));
            //this._eyesLine.normalize();
            this._rotaEyesLine.copyFrom(this._eyesLine);

            this._target.lookAt(this._eyesPos, this._lookAtPosition);

            Input.instance.addListenerMouseWheel(() => this.mouseWheel());

            Input.instance.addListenerMouseMove(() => this.mouseMove());

            Input.instance.addListenerKeyUp((e:number) => this.keyUp(e));
            Input.instance.addListenerKeyDown((e: number) => this.keyDown(e));


            Input.instance.addListenerSwipeUp(() => this.onSwipeUp());
            Input.instance.addListenerSwipeDown(() => this.onSwipeDown());
            Input.instance.addListenerSwipeLeft(() => this.onSwipeLeft());
            Input.instance.addListenerSwipeRight(() => this.onSwipeRight());
        }


        private onSwipeUp() {
            var c = document.getElementById('console');
            c.innerHTML = "向上";
 
            this._tempVec.copyFrom(this._rotaEyesLine);
            this._matTemp.identity();
            this._matTemp.appendRotation(90, Vector3D.X_AXIS);
            this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec));
            this._tempVec.z = 0;
            this._tempVec.normalize();
            this._tempVec.scaleBy(Math.abs(Input.instance.mouseOffsetY));
            this._tempVec.copyFrom(this._lookAtObject.position.add(this._tempVec));
            this._lookAtObject.position = this._tempVec;
        }

        private onSwipeDown() {
            var c = document.getElementById('console');
            c.innerHTML = "向下";


            this._tempVec.copyFrom(this._rotaEyesLine);
            this._matTemp.identity();
            this._matTemp.appendRotation(90, Vector3D.X_AXIS);
            this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec));
            this._tempVec.z = 0;
            this._tempVec.normalize();
            this._tempVec.scaleBy(Math.abs(Input.instance.mouseOffsetY));
            this._tempVec.copyFrom(this._lookAtObject.position.subtract(this._tempVec));
            this._lookAtObject.position = this._tempVec;
        }
        private onSwipeLeft() {
            var c = document.getElementById('console');
            c.innerHTML = "向左";

            this._tempVec.copyFrom(this._rotaEyesLine);
            this._matTemp.identity();
            this._matTemp.appendRotation(90, Vector3D.Y_AXIS);
            this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec));
            this._tempVec.y = 0;
            this._tempVec.normalize();
            this._tempVec.scaleBy(Math.abs(Input.instance.mouseOffsetX));
            this._tempVec.copyFrom(this._lookAtObject.position.add(this._tempVec));
            this._lookAtObject.position = this._tempVec;
        }
        private onSwipeRight() {
            var c = document.getElementById('console');
            c.innerHTML = "向右 ";


            this._tempVec.copyFrom(this._rotaEyesLine);
            this._matTemp.identity();
            this._matTemp.appendRotation(90, Vector3D.Y_AXIS);
            this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec));
            this._tempVec.y = 0;
            this._tempVec.normalize();

            this._tempVec.scaleBy(Math.abs(Input.instance.mouseOffsetX));
            this._tempVec.copyFrom(this._lookAtObject.position.subtract(this._tempVec));
            this._lookAtObject.position = this._tempVec;
        }

        private mouseWheel() {
            this.setEyesLength(this._eyesLength - Input.instance.wheelDelta * 0.1);
        }

        private mouseMove() {
            if (this._mouseDown && this._mouseRightDown) {
                var x1 = Input.instance.mouseLastX ;
                var y1 = Input.instance.mouseLastY;
                var x2 = Input.instance.mouseX;
                var y2 = Input.instance.mouseY;


                var direction: number = Input.instance.GetSlideDirection(x1, y1, x2, y2);

                switch (direction) {
                    case 0:
                        break;
                    case 1:
                        this.onSwipeUp();
                        break;
                    case 2:
                        this.onSwipeDown();
                        break;
                    case 3:
                        this.onSwipeLeft();
          
                        break;
                    case 4:
                        this.onSwipeRight();
                        break;
                    default:
                        break;
                }
            }
            else if (this._mouseDown) {
                this._rotaAngle.x += Input.instance.mouseOffsetX;
                this._rotaAngle.y += Input.instance.mouseOffsetY;

                if (this._rotaAngle.y >= 60.0 || this._rotaAngle.y <= -60) {
                    this._rotaAngle.y -= Input.instance.mouseOffsetY;
                }
            }
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

            this._lookAtPosition.copyFrom(val.add(this.lookAtOffset));
            
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
            this._lookAtPosition.copyFrom(this._lookAtObject.position.add(this.lookAtOffset));

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
        public update(interpolate: Boolean = true) {
            //interpolate = interpolate; // prevents unused warning
            //this._elapsed = elapsed;
            if (this._target) {

                if (this._lookAtObject) {
                    this._lookAtPosition.copyFrom(this._lookAtObject.position.add(this.lookAtOffset));
                }

                this._tempVec.copyFrom(this._rotaEyesLine);
                this._tempVec.scaleBy(this._eyesLength);
                this._eyesPos.copyFrom(this._lookAtPosition.subtract(this._tempVec));
                this._matRot.identity();

                var rot: Quaternion = new Quaternion();
                rot.fromEulerAngles(this._rotaAngle.y * (Math.PI / 180), this._rotaAngle.x * (Math.PI / 180), 0);
                this._rotaEyesLine.copyFrom(rot.rotatePoint(this._eyesLine));
                this._rotaEyesLine.normalize();

                this._target.lookAt(this._eyesPos, this._lookAtPosition);

                //this._lookAtObject.rotationX = this._rotaAngle.y;
                if (this.firstCamera) {
                    this._lookAtObject.rotationY = this._rotaAngle.x;
                }

                if (this._keyArray[0]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._tempVec.scaleBy(this._speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.add(this._tempVec));
                    this._lookAtObject.position = this._tempVec;
                }

                if (this._keyArray[1]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._matTemp.identity();
                    this._matTemp.appendRotation(90, Vector3D.Y_AXIS);
                    this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec));
                    this._tempVec.y = 0;
                    this._tempVec.normalize();
                    this._tempVec.scaleBy(this._speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.subtract(this._tempVec));
                    this._lookAtObject.position = this._tempVec;
                }

                if (this._keyArray[2]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._tempVec.scaleBy(this._speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.subtract(this._tempVec));
                    this._lookAtObject.position = this._tempVec;
                }

                if (this._keyArray[3]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._matTemp.identity();
                    this._matTemp.appendRotation(90, Vector3D.Y_AXIS);
                    this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec));
                    this._tempVec.y = 0;
                    this._tempVec.normalize();

                    this._tempVec.scaleBy(this._speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.add(this._tempVec));
                    this._lookAtObject.position = this._tempVec;
                }

            }
        }

        public keyDown(key:number) {
            switch (key) {
                case KeyCode.Key_W://w
                    this._keyArray[0] = true;
                    break;
                case KeyCode.Key_A://a
                    this._keyArray[1] = true;
                    break;
                case KeyCode.Key_S://s
                    this._keyArray[2] = true;
                    break;
                case KeyCode.Key_D://d
                    this._keyArray[3] = true;
                    break;
                case KeyCode.Key_Mouse_Left:
                    this._mouseDown = true;
                    break;
                case KeyCode.Key_Mouse_Right:
                    this._mouseRightDown = true;
                    break;
            }
        }

        public keyUp(key: number) {
            switch (key) {
                case KeyCode.Key_W://w
                    this._keyArray[0] = false;
                    break;
                case KeyCode.Key_A://a    
                    this._keyArray[1] = false;           
                    break;
                case KeyCode.Key_S://s        
                    this._keyArray[2] = false;      
                    break;
                case KeyCode.Key_D://d   
                    this._keyArray[3] = false;           
                    break;
                case KeyCode.Key_Mouse_Left:
                    this._mouseDown = false;
                    break;
                case KeyCode.Key_Mouse_Right:
                    this._mouseRightDown = false;
                    break;
            }
        }

        public onButtonUp(b: boolean) {
            this._keyArray[0] = b;
        }

        public onButtonDown(b: boolean) {
            this._keyArray[2] = b;
        }

        public onButtonLeft(b: boolean) {
            this._keyArray[1] = b;
        }

        public onButtonRight(b: boolean) {
            this._keyArray[3] = b;
        }
    }
} 