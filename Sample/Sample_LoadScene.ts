class Sample_LoadScene extends Sample_CreateSky{

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {
        Egret3D.AssetsManager.getInstance().addLoadScene("resource/scene");
        Egret3D.AssetsManager.getInstance().addEventListener(Egret3D.Event3D.EVENT_LOAD_COMPLETE, (e: Egret3D.Event3D) => this.onLoadComplete(e));
        Egret3D.AssetsManager.getInstance().startLoad();
    }

    protected onLoadComplete(e: Egret3D.Event3D): void {

        var meshList: Egret3D.Mesh[] = Egret3D.AssetsManager.getInstance().findScene("resource/scene");

        var container: Egret3D.Object3D = new Egret3D.Object3D();

        for (var i: number = 0; i < meshList.length; i++) {
            container.addChild(meshList[i]);
        }

        this._view3D.addChild3D(container);
    }
}