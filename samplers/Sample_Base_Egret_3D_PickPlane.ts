class Sample_Base_Egret_3D_PickPlane {

    private _view3D: BlackSwan.View3D;
    private _view3D2: BlackSwan.View3D;
    private _meshList: Array<BlackSwan.Mesh> = new Array<BlackSwan.Mesh>();

    private _cameraCtl: BlackSwan.LookAtController;

    private _lightGroup: BlackSwan.LightGroup;

    private _label: HTMLElement;

    private _isDownLeft = false;

    private _colorList: Array<number> = new Array<number>();

    constructor() {
        this._label = <HTMLElement>document.getElementById("light");
        BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 1024, 800), () => this.init3D());

        BlackSwan.Input.instance.addListenerKeyUp((key: number) => this.keyUp(key));
        BlackSwan.Input.instance.addListenerKeyDown((key: number) => this.keyDown(key));
    }

    private keyUp(key: number) {
        if (key == BlackSwan.KeyCode.Key_Mouse_Right) {
            this._isDownLeft = false;
        }
    }

    private keyDown(key: number) {
        if (key == BlackSwan.KeyCode.Key_Mouse_Right) {
            this._isDownLeft = true;
        }
    }
    private init3D() {
        var viewPort: BlackSwan.Rectangle = new BlackSwan.Rectangle(0, 0, 1024, 800);
        this._view3D = new BlackSwan.View3D(viewPort);
        //this._view3D.camera3D.z = -0;

        this.initLights();

        //this.loadAndShowModel("resource/Lion1_LOD1.e3d", "resource/b.dds");
       // this.loadAndShowModel("resource/Lion1_LOD1.e3d", "resource/Lion.dds", "resource/Lion_nmp.dds");
        this.loadAndShowModel("resource/Plane.esm", "resource/b.dds", "resource/tt.dds");

        //this.loadAndShowModel("resource/plane.e3d", "resource/b.dds", "resource/tt.dds");
       //this.loadAndShowModel("resource/gun_0.e3d", "resource/Tex_0222_0.dds", "resource/Tex_0222_1.dds", "resource/Tex_0222_2.dds");
       //this.loadAndShowModel("resource/gun_1.e3d", "resource/Tex_0220_0.dds", "resource/Tex_0220_1.dds", "resource/Tex_0220_2.dds");
       //this.loadAndShowModel("resource/gun_2.e3d", "resource/Tex_0221_0.dds", "resource/Tex_0221_1.dds", "resource/Tex_0221_2.dds");
       //this.loadAndShowModel("resource/gun_3.e3d", "resource/Tex_0223_0.dds", "resource/Tex_0223_1.dds", "resource/Tex_0223_2.dds");
       //this.loadAndShowModel("resource/gun_4.e3d", "resource/Tex_0219_0.dds", "resource/Tex_0219_1.dds", "resource/Tex_0219_2.dds" );

        //var mat: BlackSwan.ColorMaterial = new BlackSwan.ColorMaterial(1.0, 1.0, 1.0, 1.0);
        //mat.lightGroup = this._lightGroup;
        //var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(new BlackSwan.PlaneGeomtry(), mat);
        //this._meshList.push(tmpMesh);
        //this._view3D.addChild3D(tmpMesh);

        this._cameraCtl = new BlackSwan.LookAtController(this._view3D.camera3D, new BlackSwan.Object3D() );
        this._cameraCtl.setEyesLength(200);
        window.setInterval(() => this.update());


        //var mat: BlackSwan.ColorMaterial = new BlackSwan.ColorMaterial(1.0, 1.0, 1.0, 1.0);
        //var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(new BlackSwan.CubeGeomtry(), mat);
        //this._meshList.push(tmpMesh);
        //this._view3D.addChild3D(tmpMesh);
    }

    private pointLight: BlackSwan.PointLight;
    private directLight: BlackSwan.DirectLight;
    private initLights() {
        this._lightGroup = new BlackSwan.LightGroup();

        this.directLight = new BlackSwan.DirectLight(new BlackSwan.Vector3D(0.5, 1, 0));
        this.directLight.intensity = 10.0 ;
        this._lightGroup.addDirectLight(this.directLight);
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
      
        var mat: BlackSwan.TextureMaterial = new BlackSwan.TextureMaterial(null );
        mat.normalTexture = BlackSwan.CheckerboardTexture.texture;
        urlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.addModel(urlLoader.data, mat)
        var asynLoadingMaterial: AsyncLoadingTexturematerial = new AsyncLoadingTexturematerial(mat);
        asynLoadingMaterial.loadTexture(texture, bump, spec);

        urlLoader.load(e3dFile);
    }

    private addModel(geomtry: BlackSwan.GeomtryBase, mat: BlackSwan.MaterialBase) {
        mat.lightGroup = this._lightGroup;
        var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(geomtry, mat);

        tmpMesh.x = 0;
        tmpMesh.y = 0;
        tmpMesh.z = 0;

        //tmpMesh.scaleX = 3;
        //tmpMesh.scaleY = 3;
        //tmpMesh.scaleZ = 3;
        //tmpMesh.rotationY += 90 * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS;
        
        //tmpMesh.material.castShadow = true;
        //tmpMesh.material.acceptShadow = true;

        this._colorList[this._meshList.length] = tmpMesh.material.diffuseColor;

        this._meshList.push(tmpMesh);
        this._view3D.addChild3D(tmpMesh);
    }

    private doPick() {
        var pickList: Array<BlackSwan.PickResult> = null;
        pickList = BlackSwan.Picker.pickObject3DList(this._view3D.camera3D, this._meshList);
        //pickList = BlackSwan.Picker.pickObject3DListToMesh(this._view3D.camera3D, this._meshList);
        for (var i: number = 0; i < pickList.length; ++i) {
            var p: BlackSwan.PickResult = pickList[i];
            var mesh: BlackSwan.Mesh = <BlackSwan.Mesh>p.target;
            mesh.material.ambientColor = 0xFF0000FF;

            var console = document.getElementById('console');
            console.innerHTML = "touchEnd : " + p.intPos.toString();
        }
    }

             

    private time: number = 0;
    private delay: number = 0;
    private q: BlackSwan.Quaternion = new BlackSwan.Quaternion(0, 0, 0, 1);
    private pos: BlackSwan.Vector3D = new BlackSwan.Vector3D(0, 200, 200);
    private tmppos: BlackSwan.Vector3D = new BlackSwan.Vector3D(0, 0, 200);
    private timeDate: Date = new Date();
    private update() {

        BlackSwan.Gui.Stats.stats.update();

        this._label.innerHTML = "x =>" + (this.time % 360).toString() ;
        this.q.fromEulerAngles(0, ((this.time % 360) * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS ), 0);

        if (this.directLight) {

            this.pos.normalize();
            this.q.rotatePoint(this.pos, this.tmppos);
            this.tmppos.normalize();

            this.directLight.x = this.tmppos.x;
            this.directLight.y = this.tmppos.y;
            this.directLight.z = this.tmppos.z  ;
        }
       
        for (var i: number = 0; i < this._meshList.length; ++i) {
            this._meshList[i].material.ambientColor = this._colorList[i];
        }

        if (this._isDownLeft) {
            this.doPick();
        }
        //if (this._meshList[0])
        //     this._meshList[0].rotationY = this.time * 0.5 % 360 * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS;

        this._cameraCtl.update(  );
        
        this.delay = this.timeDate.getTime() - this.time;
        this.time = this.timeDate.getTime();
        this._view3D.renden( this.time , this.delay );
    }
   
} 