class Sample_CreateBox extends Sample_CreateSky{

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        var box: Egret3D.Mesh = new Egret3D.Mesh(new Egret3D.CubeGeometry(), new Egret3D.TextureMaterial());

        this._view3D.addChild3D(box);

        this._cameraCtl.setEyesLength(1000);

        super.onView3DInitComplete();
    }
} 