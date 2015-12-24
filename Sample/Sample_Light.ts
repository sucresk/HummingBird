class Sample_Light {

    private _view3D: Egret3D.View3D;
    private _cameraCtl: Egret3D.LookAtController;
    private _viewPort: Egret3D.Rectangle;

    private _cameraAnimationCtl: Egret3D.CameraAnimationController;
    private _shadowMaping: Egret3D.ShadowMapingMethod;
    constructor() {
        this._viewPort = new Egret3D.Rectangle(0, 0, window.innerWidth, window.innerHeight );
        Egret3D.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new Egret3D.Rectangle(0, 0, this._viewPort.width, this._viewPort.height), () => this.init3D());
    }

    private init3D() {

        this._view3D = new Egret3D.View3D(this._viewPort);
        this._view3D.useShadow = true;
        this._view3D.camera3D.position = new Egret3D.Vector3D(0, 5, -10);

        this._cameraCtl = new Egret3D.LookAtController(this._view3D.camera3D, new Egret3D.Object3D());

        this._cameraCtl.setEyesLength(400);

        this.initScene();

        window.requestAnimationFrame(() => this.update());

        Egret3D.Input.instance.addListenerKeyDown((e: number) => this.keyDown(e));
    }

    private keyDown(e:number) {
        switch (e) {
            case Egret3D.KeyCode.Key_L:
                this._shadowMaping.bias += 0.00001;
                break;
            case Egret3D.KeyCode.Key_K:
                this._shadowMaping.bias -= 0.00001;
                break;
            case Egret3D.KeyCode.Key_H:
                this._shadowMaping.bias += 0.001;
                break;
            case Egret3D.KeyCode.Key_J:
                this._shadowMaping.bias -= 0.001;
                break;
        }
    }

    private initScene() {

        var sprherMesh: Egret3D.Mesh = new Egret3D.Mesh(new Egret3D.SphereGeometry(5, 25, 25), new Egret3D.TextureMaterial());
        sprherMesh.x = 120;
        sprherMesh.y = 120;
        sprherMesh.z = 120;
        var lightGroup: Egret3D.LightGroup = new Egret3D.LightGroup();
        var directLight: Egret3D.DirectLight = new Egret3D.DirectLight(sprherMesh.position.clone());
        directLight.position = sprherMesh.position;
        directLight.diffuse = 0xffffff;
        lightGroup.addDirectLight(directLight);
        Egret3D.ShadowRender.castShadowLight = directLight; 

        var cubeMesh: Egret3D.Mesh = new Egret3D.Mesh(new Egret3D.CubeGeometry(50, 50, 50), new Egret3D.TextureMaterial());
        var planeMesh: Egret3D.Mesh = new Egret3D.Mesh(new Egret3D.PlaneGeometry(1000,1000,1,1,10,10) , new Egret3D.TextureMaterial() );

        cubeMesh.material.lightGroup = lightGroup; 

        this._shadowMaping = new Egret3D.ShadowMapingMethod();
        for (var i: number = 0; i < 1 ; i++){
            var mesh: Egret3D.Mesh = cubeMesh.clone();
            mesh.material.acceptShadow = true;
            mesh.material.castShadow = true;
            mesh.material.lightGroup = lightGroup; 
            mesh.material.shadowMapingMethod = this._shadowMaping;
            mesh.y = 25;
            this._view3D.addChild3D(mesh);

            var wireframeMesh: Egret3D.WireframeMesh = new Egret3D.WireframeMesh();
            wireframeMesh.creatByMesh(mesh);
            this._view3D.addWireframe(wireframeMesh);
        }

        

        planeMesh.material.lightGroup = lightGroup; 
        planeMesh.material.shadowMapingMethod = this._shadowMaping;

        cubeMesh.material.specularColor = 0xffffff; 
        planeMesh.material.specularColor = 0xffffff; 
        cubeMesh.material.specularPower = 0.5;
        planeMesh.material.specularPower = 0.5;
        cubeMesh.material.ambientColor = 0x00235c;
        planeMesh.material.ambientColor = 0x00235c; 

        cubeMesh.material.shininess = 10.0;
        planeMesh.material.shininess = 10.0;

        planeMesh.material.castShadow = true;
        cubeMesh.material.acceptShadow = true; 
        planeMesh.material.acceptShadow = true; 

        this._view3D.addChild3D(sprherMesh);
        this._view3D.addChild3D(planeMesh);

    }

    private time: number = 0;
    private timeDate: Date;
    private delay: number = 0;
    private update() {

        this.timeDate = new Date();

        this.delay = this.timeDate.getTime() - this.time;

        this.time = this.timeDate.getTime();

        this._cameraCtl.update();

        this._view3D.renden(this.time, this.delay);

        window.requestAnimationFrame(() => this.update());
    }
}