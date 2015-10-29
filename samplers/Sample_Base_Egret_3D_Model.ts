class Sample_Base_Egret_3D_Model {

    private _view3D: BlackSwan.View3D;
    private _view3D2: BlackSwan.View3D;
    private _meshList: Array<BlackSwan.Mesh> = new Array<BlackSwan.Mesh>();

    private _cameraCtl: BlackSwan.LookAtController;

    private _lightGroup: BlackSwan.LightGroup;

    private _label: HTMLElement;
    constructor() {
        this._label = <HTMLElement>document.getElementById("light");
        BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 700, 1000 ), () => this.init3D());
    }

    private init3D() {
        var viewPort: BlackSwan.Rectangle = new BlackSwan.Rectangle(0, 0, 700, 1000);
        this._view3D = new BlackSwan.View3D(viewPort);
        //this._view3D.camera3D.z = -0;

        this.initHUD();
        this.initLights();

        //this.loadAndShowModel("resource/Lion1_LOD1.e3d", "resource/b.dds");
      // this.loadAndShowModel("resource/Lion1_LOD1.e3d", "resource/Lion.dds", "resource/Lion_nmp.dds");
       // this.loadAndShowModel("resource/testModel.e3d", "resource/b.dds", "resource/tt.dds");
       //this.loadAndShowModel("resource/gun_0.e3d", "resource/Tex_0222_0.dds", "resource/Tex_0222_1.dds", "resource/Tex_0222_2.dds");
       //this.loadAndShowModel("resource/gun_1.e3d", "resource/Tex_0220_0.dds", "resource/Tex_0220_1.dds", "resource/Tex_0220_2.dds");
       //this.loadAndShowModel("resource/gun_2.e3d", "resource/Tex_0221_0.dds", "resource/Tex_0221_1.dds", "resource/Tex_0221_2.dds");
       //this.loadAndShowModel("resource/gun_3.e3d", "resource/Tex_0223_0.dds", "resource/Tex_0223_1.dds", "resource/Tex_0223_2.dds");
       //this.loadAndShowModel("resource/gun_4.e3d", "resource/Tex_0219_0.dds", "resource/Tex_0219_1.dds", "resource/Tex_0219_2.dds" );


        this.loadAndShowModel("resource/login/1_03_02.e3d", "resource/login/login_2.png");
        this.loadAndShowModel("resource/login/1_02_01.e3d", "resource/login/login_1.png");
        this.loadAndShowModel("resource/login/1_01_01.e3d", "resource/login/login_1.png");
        this.loadAndShowModel("resource/login/terrain.e3d", "resource/login/login_1.png");

        this._cameraCtl = new BlackSwan.LookAtController(this._view3D.camera3D, new BlackSwan.Object3D() );
        this._cameraCtl.setEyesLength(200);
        window.setInterval(() => this.update());
        var textureUrlLoader: xxq.URLLoader = new xxq.URLLoader();
        textureUrlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.__bgComplete(urlLoader);
        //textureUrlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
       // textureUrlLoader.load("resource/bg.png");
    }

    private initHUD() {
        BlackSwan.RttManager.getInstance().depthFrameBuffer = BlackSwan.Egret3D.context3D.createFramebuffer(512, 512);
        BlackSwan.RttManager.getInstance().normalFrameBuffer = BlackSwan.Egret3D.context3D.createFramebuffer(512, 512);
        BlackSwan.RttManager.getInstance().defaultFrameBuffer = BlackSwan.Egret3D.context3D.createFramebuffer(512, 512);

        var depthHUD: BlackSwan.DebugHUD = new BlackSwan.DebugHUD(this._view3D.x, this._view3D.y, this._view3D.width, this._view3D.height );
        var normalHUD: BlackSwan.DebugHUD = new BlackSwan.DebugHUD(this._view3D.x, this._view3D.y, this._view3D.width, this._view3D.height);
        var colorHUD: BlackSwan.DebugHUD = new BlackSwan.DebugHUD(this._view3D.x, this._view3D.y, this._view3D.width, this._view3D.height);

        depthHUD.texture = BlackSwan.RttManager.getInstance().depthFrameBuffer;
        normalHUD.texture = BlackSwan.RttManager.getInstance().normalFrameBuffer;
        colorHUD.texture = BlackSwan.RttManager.getInstance().defaultFrameBuffer;

        depthHUD.x = 0;
        depthHUD.y = this._view3D.height - 128;
        depthHUD.width = 128;
        depthHUD.height = 128;

        normalHUD.x = 128;
        normalHUD.y = this._view3D.height - 128;
        normalHUD.width = 128;
        normalHUD.height = 128;

        colorHUD.x = 256;
        colorHUD.y = this._view3D.height - 128;
        colorHUD.width = 128;
        colorHUD.height = 128;

        this._view3D.addHUD(depthHUD);
        this._view3D.addHUD(normalHUD);
        this._view3D.addHUD(colorHUD);
    }

    private __bgComplete(e: xxq.URLLoader) {
        e.data.upload(BlackSwan.Egret3D.context3D);

        BlackSwan.CheckerboardTexture.texture.upload(BlackSwan.Egret3D.context3D);
        this._view3D.backImageTexture = e.data.texture;
    }

    private pointLight: BlackSwan.PointLight;
    private directLight: BlackSwan.DirectLight;
    private initLights() {
        this._lightGroup = new BlackSwan.LightGroup();

        this.directLight = new BlackSwan.DirectLight(new BlackSwan.Vector3D(0.5, 1, 0));
        this.directLight.intensity = 10.0 ;
        //this._lightGroup.addDirectLight(this.directLight);
        this.pos.x = this.directLight.rotationX;
        this.pos.y = this.directLight.rotationY;
        this.pos.z = this.directLight.rotationZ;

        var directLight1: BlackSwan.DirectLight = new BlackSwan.DirectLight(new BlackSwan.Vector3D(0.5, 1, -1));
        directLight1.intensity = 1.0;
        //this._lightGroup.addDirectLight(directLight1);
        
        
        this.pointLight = new BlackSwan.PointLight(new BlackSwan.Vector3D(1.0,1.0,1.0,1.0));
        this.pointLight.y = 100;
        this.pointLight.intensity = 1.0;
        //this._lightGroup.addPointLight(this.pointLight);

        var sportLight: BlackSwan.SpotLight = new BlackSwan.SpotLight(new BlackSwan.Vector3D(1.0, 1.0, 1.0));
        sportLight.y = 50;
        sportLight.x = 0;
        sportLight.intensity = 1.0;
        sportLight.diffuse = 0xffff0000;
        //this._lightGroup.addSpotLight(sportLight);

        BlackSwan.Gui.GuiController.addListener("constantAttenuation", () => this.instan );
    }

    private instan() {
        //BlackSwan.Gui.GuiData.data["constantAttenuation"]
    }

    private loadAndShowModel(e3dFile:string, texture:string = null , bump:string = null , spec:string = null ): void {
        var urlLoader: xxq.URLLoader = new xxq.URLLoader();
        //urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_E3D;
      
        var mat: BlackSwan.TextureMaterial = new BlackSwan.TextureMaterial( null , false );
        mat.normalTexture = BlackSwan.CheckerboardTexture.texture;
        urlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.addModel(urlLoader.data, mat)
        //var asynLoadingMaterial: AsyncLoadingTexturematerial = new AsyncLoadingTexturematerial(mat);
        //asynLoadingMaterial.loadTexture(texture, bump, spec);

        urlLoader.load(e3dFile);
    }

    private addModel(geomtry: BlackSwan.GeomtryBase, mat: BlackSwan.MaterialBase) {
        mat.lightGroup = this._lightGroup;
        var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(geomtry, mat);

        mat.specularColor = 0xff000000;

        tmpMesh.x = 0;
        tmpMesh.y = 0;
        tmpMesh.z = 0;

        tmpMesh.scaleX = 1;
        tmpMesh.scaleY = 1;
        tmpMesh.scaleZ = 1;
        //tmpMesh.rotationY += 90 * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS;
        
        tmpMesh.material.castShadow = true;
        tmpMesh.material.acceptShadow = true ;
        this._meshList.push(tmpMesh);
        this._view3D.addChild3D(tmpMesh);
    }

    private time: number = 0;
    private delay: number = 0;
    private q: BlackSwan.Quaternion = new BlackSwan.Quaternion(0, 0, 0, 1);
    private pos: BlackSwan.Vector3D = new BlackSwan.Vector3D(0, 200, 200);
    private tmppos: BlackSwan.Vector3D = new BlackSwan.Vector3D(0, 0, 200);
    private timeDate: Date = new Date();
    private update() {


        BlackSwan.Gui.Stats.stats.update();

       // this._label.innerHTML = "x =>" + (this.time % 360).toString() ;
        this.q.fromEulerAngles(0, ((this.time % 360) * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS ), 0);

        if (this.directLight) {

            this.pos.normalize();
            this.q.rotatePoint(this.pos, this.tmppos);
            this.tmppos.normalize();

            this.directLight.x = this.tmppos.x;
            this.directLight.y = this.tmppos.y;
            this.directLight.z = this.tmppos.z  ;
        }
       
        //if (this._meshList[0])
        //     this._meshList[0].rotationY = this.time * 0.5 % 360 * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS;

        this._cameraCtl.update(  );
        
        this.delay = this.timeDate.getTime() - this.time;
        this.time = this.timeDate.getTime();
        this._view3D.renden( this.time , this.delay );
    }


   
} 

class AsyncLoadingTexturematerial {

    private _mat: BlackSwan.TextureMaterial;
    constructor(mat: BlackSwan.TextureMaterial) {
        this._mat = mat; 
    }

    public loadTexture(texture: string, bump: string = null , spec:string = null ): void {
        if (texture){
            var textureUrlLoader: xxq.URLLoader = new xxq.URLLoader();
            textureUrlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.__textureComplete(urlLoader);
            //textureUrlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
            textureUrlLoader.load(texture);
        }

        if (bump){
            var bumpUrlLoader: xxq.URLLoader = new xxq.URLLoader();
            bumpUrlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.__bumpComplete(urlLoader);
            //bumpUrlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
            bumpUrlLoader.load(bump);
        }

        if (spec) {
            var specUrlLoader: xxq.URLLoader = new xxq.URLLoader();
            specUrlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.__specComplete(urlLoader);
            //bumpUrlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
            specUrlLoader.load(spec);
        }
    }
    
    private __specComplete(e: xxq.URLLoader) {
        e.data.upload(BlackSwan.Egret3D.context3D);
        this._mat.specularTexture = e.data;
    }

    private __textureComplete(e: xxq.URLLoader) {
        e.data.upload(BlackSwan.Egret3D.context3D);
       this._mat.diffuseTexture = e.data;
    }

    private __bumpComplete(e: xxq.URLLoader) {
        e.data.upload(BlackSwan.Egret3D.context3D);
       this._mat.normalTexture = e.data; 
    }
}