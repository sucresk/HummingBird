class Sample_CreateView3D {

    protected _time: number = 0;
    protected _delay: number = 0;
    protected _timeDate: Date = null;
    protected _view3D: Egret3D.View3D = null;
    protected _viewPort: Egret3D.Rectangle = null;
    protected _cameraCtl: Egret3D.LookAtController = null;

    public constructor(width: number = 800, height: number = 600) {

        this._viewPort = new Egret3D.Rectangle(0, 0, width, height);

        Egret3D.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, this._viewPort, () => this.onInit3D());
    }

    protected onInit3D(): void {

        this._view3D = new Egret3D.View3D(this._viewPort);

        this._cameraCtl = new Egret3D.LookAtController(this._view3D.camera3D, new Egret3D.Object3D());

        this._cameraCtl.setEyesLength(0.1);

        this.onView3DInitComplete();

        this._time = new Date().getTime();

        requestAnimationFrame(() => this.onUpdate());
    }

    protected onView3DInitComplete(): void {
    }
    
    protected onUpdate(): void {

        this._timeDate = new Date();

        this._delay = this._timeDate.getTime() - this._time;

        this._time = this._timeDate.getTime();

        this._cameraCtl.update();

        this._view3D.renden(this._time, this._delay);

        requestAnimationFrame(() => this.onUpdate());
    }
}