class Sample_MaterialBlend extends Sample_CreateSky{

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        super.onView3DInitComplete();

        var plane: Egret3D.Mesh = new Egret3D.Mesh(new Egret3D.PlaneGeometry(), new Egret3D.TextureMaterial());

        var box1: Egret3D.Mesh = new Egret3D.Mesh(new Egret3D.CubeGeometry(40, 40, 40), new Egret3D.TextureMaterial());
        box1.x = -40;
        box1.y = 20;
        box1.material.blendMode = Egret3D.BlendMode.ADD;

        var box2: Egret3D.Mesh = new Egret3D.Mesh(new Egret3D.CubeGeometry(40, 40, 40), new Egret3D.TextureMaterial());
        box2.x = 40;
        box2.y = 20;
        box2.material.blendMode = Egret3D.BlendMode.ALPHA;

        this._view3D.addChild3D(box1);

        this._view3D.addChild3D(box2);

        this._view3D.addChild3D(plane);

        this._cameraCtl.setEyesLength(500);
    }
}