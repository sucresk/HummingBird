module Egret3D {
    export class CameraControllerBase {

        protected  _view3d:View3D;
        protected  _target:Object3D;
        protected  _angle:number;
        protected  _distance: number;
        protected  _wide: number;
        protected  _locked:Boolean;
        protected  _lockRect:Rectangle;
        protected  _cameraMoveHandler:Function;
        protected  _lockTarget:Boolean;
        ///protected  _cameraAnim:CameraAnim;

        protected _lookAtPos: Vector3D = new Vector3D;

       constructor(view3d: View3D) {
            this._view3d = view3d;
            this._target = null;
            this._angle = 0;
            this._distance = 0;
            this._wide = 0;
            this._locked = false;
            this._lockRect = null;
            this._cameraMoveHandler = null;
            this._lockTarget = false;
            ///_cameraAnim = new CameraAnim();
        }
        
        public start(angle: number, distance: number, wide: number, locked:Boolean, lockRect:Rectangle):void
		{
			this._angle = angle;
			this._distance = distance;
			this._wide = wide;
			this._locked = locked;
            this._lockRect = lockRect;

            this._view3d.camera3D.rotationX = angle * Matrix3DUtils.DEGREES_TO_RADIANS ;
            this._view3d.camera3D.y = Math.acos(angle* Matrix3DUtils.DEGREES_TO_RADIANS) * distance;
            this._view3d.camera3D.z = -Math.asin(angle * Matrix3DUtils.DEGREES_TO_RADIANS) * distance;
		}
		
        public update(timer: number, elapsed: number):void
		{
		}
		
		public  setCameraLookAtPos(pos:Vector3D):void
		{
		}
		
		public  getCameraPos():Vector3D
		{
			return this._view3d.camera3D.position ;
		}
		
		public  set target(obj:Object3D)
		{
			this._target = obj;
		}
		
		public  get target():Object3D
		{
			return this._target;
		}
		
		public  set lockTarget(value:Boolean)
		{
			this._lockTarget = value;
		}
		
		public  get lockTarget():Boolean
		{
			return this._lockTarget;
		}
		
		public  set cameraMoveHandler(handler:Function)
		{
			this._cameraMoveHandler = handler;
		}
		
		public  get cameraMoveHandler():Function
		{
			return this._cameraMoveHandler;
		}
    }
} 