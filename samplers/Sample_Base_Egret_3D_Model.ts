class Sample_Base_Egret_3D_Model {

    private _view3D: BlackSwan.View3D;
    private _view3D2: BlackSwan.View3D;
    private _meshList: Array<BlackSwan.Mesh> = new Array<BlackSwan.Mesh>();

    private _cameraCtl: BlackSwan.FreeCameraControl;

    private _lightGroup: BlackSwan.LightGroup;
    constructor() {

        BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 1024, 800), () => this.init3D());
    }

    private init3D() {
        var viewPort: BlackSwan.Rectangle = new BlackSwan.Rectangle(0, 0, 1024, 800);
        this._view3D = new BlackSwan.View3D(viewPort);
        this._view3D.camera3D.z = -0;

        this.initLights();

        this.loadAndShowModel("resource/plane.e3d", "resource/b.dds");
        //this.loadAndShowModel("resource/gun_0.e3d", "resource/Tex_0222_2.dds");
       // this.loadAndShowModel("resource/gun_1.e3d", "resource/Tex_0220_2.dds");           //, "resource/Tex_0220_2.dds"
       // this.loadAndShowModel("resource/gun_2.e3d", "resource/Tex_0221_0.dds");           //, "resource/Tex_0221_0.dds"
       // this.loadAndShowModel("resource/gun_3.e3d", "resource/Tex_0223_2.dds");           //, "resource/Tex_0223_2.dds"
       // this.loadAndShowModel("resource/gun_4.e3d", "resource/Tex_0219_2.dds");           //,"resource/Tex_0219_2.dds" 

        //var mat: BlackSwan.ColorMaterial = new BlackSwan.ColorMaterial(1.0,1.0,1.0,1.0);
        //var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(new BlackSwan.CubeGeomtry(), mat);
        //this._meshList.push(tmpMesh);
        //this._view3D.addChild3D(tmpMesh);

        window.setInterval(() => this.update());
         
        this._cameraCtl = new BlackSwan.FreeCameraControl(this._view3D); 
        this._cameraCtl.start(45, 2300, 45, false, null);
    }

    private initLights() {
        this._lightGroup = new BlackSwan.LightGroup();

        var directLight: BlackSwan.DirectLight = new BlackSwan.DirectLight(new BlackSwan.Vector3D(0.8, 1, 0));
        //this._lightGroup.addLight(directLight);

        var pointLight: BlackSwan.PointLight = new BlackSwan.PointLight(new BlackSwan.Vector3D(0.0, 0.0, 1.0));
        pointLight.y = 100;
        pointLight.intensity = 1.0;
        this._lightGroup.addLight(pointLight);

        var sportLight: BlackSwan.SportLight = new BlackSwan.SportLight(new BlackSwan.Vector3D(0.0, 1.0, 0.0));
        sportLight.y = 50;
        sportLight.x = 0;
        sportLight.rotationZ = 0.5;
        sportLight.intensity = 1.0;
        this._lightGroup.addLight(sportLight);
    }

    private loadAndShowModel(e3dFile:string, texture:string = null): void {
        var urlLoader: xxq.URLLoader = new xxq.URLLoader();
        urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_E3D;
        if (null == texture) {
           urlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.addModel(urlLoader.data, new BlackSwan.ColorMaterial( 1.0,0.0,1.0,1.0));
        }
        else {
            urlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.loadTexture(urlLoader.data, texture);
        }
        urlLoader.load(e3dFile);
    }

    private loadTexture(geomtry: BlackSwan.GeomtryBase, texture: string): void {
        var urlLoader: xxq.URLLoader = new xxq.URLLoader();
        urlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.addModel(geomtry, new BlackSwan.TextureMaterial(urlLoader.data) );
        urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
        urlLoader.load(texture);
    }

    private addModel(geomtry: BlackSwan.GeomtryBase, mat: BlackSwan.MaterialBase) {

        mat.lightGroup = this._lightGroup;

        var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(geomtry , mat );
        tmpMesh.x = 0;
        tmpMesh.y = 0;
        tmpMesh.z = 100;
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