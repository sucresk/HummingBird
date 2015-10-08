class Sample_Base_Texture {

    private _view3D: BlackSwan.View3D;
    private _meshList: Array<BlackSwan.Mesh> = new Array<BlackSwan.Mesh>();

    private _cameraCtl: BlackSwan.FreeCameraControl;
    constructor() {

        BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 256, 256), () => this.init3D());
    }

    private init3D() {

        //BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 1440, 800));

        var viewPort: BlackSwan.Rectangle = new BlackSwan.Rectangle(0, 0, 1024, 768);
        this._view3D = new BlackSwan.View3D(viewPort);
        this._view3D.camera3D.z = -1000;

        var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(new BlackSwan.CubeGeomtry(), new BlackSwan.TextureMaterial(new BlackSwan.CheckerboardTexture()));
        this._meshList.push(tmpMesh);
        this._view3D.addChild3D(tmpMesh);

        var urlLoader: xxq.URLLoader = new xxq.URLLoader();
        urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
        urlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.textureLoadingComplete(urlLoader);
        urlLoader.load("dds_image.png");

        window.setInterval(() => this.update());
         
        this._cameraCtl = new BlackSwan.FreeCameraControl(this._view3D);
        this._cameraCtl.start(45, 1600, 45, false, null);
    }

    public textureLoadingComplete(urlLoader: xxq.URLLoader) {
        var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(new BlackSwan.CubeGeomtry(), new BlackSwan.TextureMaterial(urlLoader.data));
        tmpMesh.x = 40;
        this._meshList.push(tmpMesh);
        this._view3D.addChild3D(tmpMesh);
    }

    private time: number = 0;
    private update() {

        this.time++;

        this._cameraCtl.update( this.time , 16 );
        
        this._view3D.renden();
    }
} 