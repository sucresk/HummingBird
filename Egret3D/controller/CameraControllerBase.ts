module Egret3D {
        
    /**
    * @class Egret3D.CameraControllerBase
    * @classdesc
    * 相机控制器基类
    */
    export class CameraControllerBase {

        protected  _view3d:View3D;
        protected  _target:Object3D;
        protected  _angle:number;
        protected  _distance: number;
        protected  _wide: number;
        protected  _locked:Boolean;
        protected  _cameraMoveHandler:Function;
        protected  _lockTarget:Boolean;

        protected _lookAtPos: Vector3D = new Vector3D;

        /**
        * @language zh_CN
        * constructor
        * @param  view3d
        */
        constructor(view3d: View3D) {
            this._view3d = view3d;
            this._target = null;
            this._angle = 0;
            this._distance = 0;
            this._wide = 0;
            this._locked = false;
            this._cameraMoveHandler = null;
            this._lockTarget = false;
            ///_cameraAnim = new CameraAnim();
        }
        
        /**
        * @language zh_CN
        * 
        * @param angle
        * @param distance
        * @param wide
        * @param locked
        */
        public start(angle: number, distance: number, wide: number, locked:Boolean):void
	    {
		    this._angle = angle;
		    this._distance = distance;
		    this._wide = wide;
		    this._locked = locked;

            this._view3d.camera3D.rotationX = angle * Matrix3DUtils.DEGREES_TO_RADIANS ;
            this._view3d.camera3D.y = Math.acos(angle* Matrix3DUtils.DEGREES_TO_RADIANS) * distance;
            this._view3d.camera3D.z = -Math.asin(angle * Matrix3DUtils.DEGREES_TO_RADIANS) * distance;
	    }
		        
        /**
        * @language zh_CN
        * 
        * @param timer
        * @param elapsed
        */
        public update(timer: number, elapsed: number):void
	    {
	    }
				        
        /**
        * @language zh_CN
        * 
        * @param pos
        */
	    public  setCameraLookAtPos(pos:Vector3D):void
	    {
	    }
						        
        /**
        * @language zh_CN
        * 
        * @retruns Vector3D
        */
	    public  getCameraPos():Vector3D
	    {
		    return this._view3d.camera3D.position ;
	    }
								        
        /**
        * @language zh_CN
        * 
        * @param obj
        */
	    public  set target(obj:Object3D)
	    {
		    this._target = obj;
	    }
								        
        /**
        * @language zh_CN
        * 
        * @retruns Object3D
        */
	    public  get target():Object3D
	    {
		    return this._target;
	    }
										        
        /**
        * @language zh_CN
        * 
        * @param value
        */
	    public  set lockTarget(value:Boolean)
	    {
		    this._lockTarget = value;
	    }
										        
        /**
        * @language zh_CN
        * 
        * @retruns Boolean
        */
	    public  get lockTarget():Boolean
	    {
		    return this._lockTarget;
	    }
												        
        /**
        * @language zh_CN
        * 
        * @event handler
        */
	    public  set cameraMoveHandler(handler:Function)
	    {
		    this._cameraMoveHandler = handler;
	    }
												        
        /**
        * @language zh_CN
        * 
        * @retruns Function
        */
	    public  get cameraMoveHandler():Function
	    {
		    return this._cameraMoveHandler;
	    }
    }
}