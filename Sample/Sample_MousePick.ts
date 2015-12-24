class Sample_MousePick extends Sample_CreateSky{

    protected _boxs: Egret3D.Mesh[] = [null, null];
    protected _currentSelected: Egret3D.Mesh = null;

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        this._boxs[0] = new Egret3D.Mesh(new Egret3D.CubeGeometry(), new Egret3D.TextureMaterial());
        this._boxs[0].x = -80;
        this._boxs[0].mouseEnable = true;
        this._boxs[0].addEventListener(Egret3D.Event3D.MOUSE_CLICK, (e: Egret3D.Event3D) => this.onMouseClick(e));
        this._view3D.addChild3D(this._boxs[0]);

        this._boxs[1] = new Egret3D.Mesh(new Egret3D.CubeGeometry(), new Egret3D.TextureMaterial());
        this._boxs[1].x = 80;
        this._boxs[1].mouseEnable = true;
        this._boxs[1].addEventListener(Egret3D.Event3D.MOUSE_CLICK, (e: Egret3D.Event3D) => this.onMouseClick(e));
        this._view3D.addChild3D(this._boxs[1]);

        this._cameraCtl.setEyesLength(1000);

        super.onView3DInitComplete();
    }

    protected onMouseClick(e: Egret3D.Event3D): void {
        this._currentSelected = e.currentTarget;
    }

    protected onUpdate(): void {

        if (this._currentSelected != null) {
            this._currentSelected.rotationY += this._delay / 4.0;
        }

        super.onUpdate();
    }
}