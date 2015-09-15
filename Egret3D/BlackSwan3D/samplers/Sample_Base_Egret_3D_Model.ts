class Sample_Base_Egret_3D_Model {

    private _view3D: BlackSwan.View3D;
    private _view3D2: BlackSwan.View3D;
    private _meshList: Array<BlackSwan.Mesh> = new Array<BlackSwan.Mesh>();

    private _cameraCtl: BlackSwan.FreeCameraControl;
    constructor() {

        this.init3D();
    }

    private init3D() {

        var viewPort: BlackSwan.Rectangle = new BlackSwan.Rectangle(0, 0, 1024, 800);
        this._view3D = new BlackSwan.View3D(viewPort);
        this._view3D.camera3D.z = -1000;

        viewPort = new BlackSwan.Rectangle(256, 0, 256, 256);
        this._view3D2 = new BlackSwan.View3D(viewPort);
        this._view3D2.camera3D.z = -1000;

        var urlLoader: xxq.URLLoader = new xxq.URLLoader(); 
        urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
        urlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.onTextureLoadingComplete(urlLoader);
        urlLoader.load("dds_image.dds");

        window.setInterval(() => this.update());
         
        this._cameraCtl = new BlackSwan.FreeCameraControl(this._view3D); 
        this._cameraCtl.start(45, 1600, 45, false, null);
    }

    public onTextureLoadingComplete(textureLoader: xxq.URLLoader) {
        var urlLoader: xxq.URLLoader = new xxq.URLLoader();
        urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_E3D;
        urlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.onLoadingComplete(urlLoader, new BlackSwan.ImageTexture(textureLoader.data));
        urlLoader.load("e3d.bin");
    }

    public onLoadingComplete(urlLoader: xxq.URLLoader, texture: BlackSwan.ImageTexture) {
        var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(urlLoader.data, new BlackSwan.TextureMaterial(texture));
        this._meshList.push(tmpMesh);
        this._view3D.addChild3D(tmpMesh);
    }

    private time: number = 0;
    private update() {

        this.time++;

        this._cameraCtl.update( this.time , 16 );
        
        this._view3D.renden();
        this._view3D2.renden();
    }
} 