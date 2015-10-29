class Sample_Base_Egret_3D_Model_FirstCamera {

    private _view3D: BlackSwan.View3D;
    private _cameraCtl: BlackSwan.LookAtController;
    private _meshList: Array<BlackSwan.Mesh> = new Array<BlackSwan.Mesh>();
    private _currentObj: number = 0;

    private _lightGroup: BlackSwan.LightGroup;
    constructor() {
        BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 688, 432), () => this.init3D());
    }

    private init3D() {
        var viewPort: BlackSwan.Rectangle = new BlackSwan.Rectangle(0, 0, 688, 432);
        this._view3D = new BlackSwan.View3D(viewPort);
        this.initLights();

        this._cameraCtl = new BlackSwan.LookAtController(this._view3D.camera3D, new BlackSwan.Object3D());
        this._cameraCtl.setEyesLength(100);
        this._cameraCtl.firstCamera = true;

        this.loadStaticModel("resource/plane.esm", "resource/b.dds");
        //this.loadStaticModel("resource/xiaoqiao/npc.esm", "resource/xiaoqiao/MO_OctopusCaptain_LV1.png");

        this.loadAnimationModel("resource/xiaoqiao/", "xiaoqiao.esm",
            [
               "idle_1.eam",
               "run_1.eam",
               "attack_1.eam",
               "attack_2.eam",
               "death_1.eam",
               "skill_1.eam",
               "skill_2.eam",
               "skill_3.eam",
               "skill_4.eam"
            ]);

        BlackSwan.Gui.GuiController.addListener("spotCutoff", this.test);
        
        window.setInterval(() => this.update());
        this._view3D.camera3D.position = new BlackSwan.Vector3D(0, 0, -10);


        //window.onkeyup = (e: KeyboardEvent) => this.keyUp(e);

        var textureUrlLoader: xxq.URLLoader = new xxq.URLLoader();
        textureUrlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.__bgComplete(urlLoader);
        //textureUrlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
        textureUrlLoader.load("resource/bg.png");
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
        this.directLight.intensity = 1.0;
        this.directLight.castShadow = true;
        this._lightGroup.addDirectLight(this.directLight);

        var directLight1: BlackSwan.DirectLight = new BlackSwan.DirectLight(new BlackSwan.Vector3D(0.5, 1, -1));
        directLight1.intensity = 1.0;
        this._lightGroup.addDirectLight(directLight1);
        
        
        this.pointLight = new BlackSwan.PointLight(new BlackSwan.Vector3D(1.0, 1.0, 1.0, 1.0));
        this.pointLight.y = 100;
        this.pointLight.intensity = 1.0;
        //this._lightGroup.addPointLight(this.pointLight);

        var sportLight: BlackSwan.SpotLight = new BlackSwan.SpotLight(new BlackSwan.Vector3D(1.0, 1.0, 1.0));
        sportLight.y = 50;
        sportLight.x = 0;
        sportLight.intensity = 1.0;
        sportLight.diffuse = 0xffff0000;
        //this._lightGroup.addSpotLight(sportLight);

    }

    private loadStaticModel(e3dFile: string, texture: string = null, bump: string = null, spec: string = null): void {
        var urlLoader: xxq.URLLoader = new xxq.URLLoader();
        //urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_E3D;
      
        var mat: BlackSwan.TextureMaterial = new BlackSwan.TextureMaterial(null);
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

        tmpMesh.scaleX = 3;
        tmpMesh.scaleY = 3;
        tmpMesh.scaleZ = 3;
        //tmpMesh.rotationY += 90 * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS;
        
        tmpMesh.material.castShadow = true;
        tmpMesh.material.acceptShadow = true;



        this._view3D.addChild3D(tmpMesh);


    }

    public test(name:string, value: number): void {
        console.log("value:" + value);
    }

    public keyUp(e: KeyboardEvent) {

        if (this._meshList.length <= 0)
            return;

        switch (e.keyCode) {
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:

                var index: number = e.keyCode - 49;

                var animList: string[] = this._meshList[this._currentObj].animation.getAnimList();

                if (index >= animList.length)
                    break;

                this._meshList[this._currentObj].animation.change(animList[index]);

                this._meshList[this._currentObj].animation.play();

                break;
            case 48:
                this._currentObj = (this._currentObj + 1) % this._meshList.length;
                break;
        }
    }

    private loadAnimationModel(rootURL:string, e3dGeomFile: string, e3dAnimFiles: string[]): void {

        var urlLoader: xxq.URLLoader = new xxq.URLLoader();
        urlLoader.onLoadComplete = (loader: xxq.URLLoader) => e3danimation(loader.data,this._lightGroup);
        urlLoader.load(rootURL + e3dGeomFile);

        var _view3D: BlackSwan.View3D = this._view3D;
        var _meshList: Array<BlackSwan.Mesh> = this._meshList;
        var _cameraCtl: BlackSwan.LookAtController = this._cameraCtl;

        function e3danimation(geomtry: BlackSwan.GeomtryBase, lightGroup:BlackSwan.LightGroup): void {

            var material: BlackSwan.TextureMaterial = new BlackSwan.TextureMaterial(null);
            material.lightGroup = lightGroup;
            material.castShadow = true; 
            material.acceptShadow = false;

            if (geomtry.textureFile.length > 0) {
                var asynLoadingMaterial: AsyncLoadingTexturematerial = new AsyncLoadingTexturematerial(material);
                asynLoadingMaterial.loadTexture(rootURL + "hero_27.dds");
            }

            var tmpMesh: BlackSwan.Mesh;

            if (geomtry.geomtryType == BlackSwan.GeomtryType.Skin) {

                var skinGeomtry: BlackSwan.SkinGeomtry = <BlackSwan.SkinGeomtry>geomtry;

                tmpMesh = new BlackSwan.Mesh(geomtry, material, new BlackSwan.AnimationStateSet(skinGeomtry.initialSkeleton));
            }
            else {
                tmpMesh = new BlackSwan.Mesh(geomtry, material);
            }
            
            for (var i: number = 0; i < 1; i++) {
                tmpMesh = tmpMesh.clone();
                //tmpMesh.x = -500 + (i / 5) * 100;
                //tmpMesh.z = -500 + (i % 5) * 100;
                _view3D.addChild3D(tmpMesh);
                
                _meshList.push(tmpMesh);
                _cameraCtl.lookAtObject = tmpMesh;
                _cameraCtl.lookAtOffset.setTo(0, 150, 0);
            }

            if (e3dAnimFiles.length > 0) {
                loadE3DAnimation(tmpMesh, 0);
            }
        }

        function loadE3DAnimation(skinMesh: BlackSwan.Mesh, index:number): void {
            var urlLoader: xxq.URLLoader = new xxq.URLLoader();
            urlLoader.onLoadComplete = (loader: xxq.URLLoader) => addAnimationToSkinGeomtry(skinMesh, loader.data, index);
            urlLoader.load(rootURL + e3dAnimFiles[index]);
        }

        function addAnimationToSkinGeomtry(skinMesh: BlackSwan.Mesh, animation: BlackSwan.AnimationState, index: number): void {

            (<BlackSwan.AnimationStateSet>skinMesh.animation).addAnimationState(animation);

            if (index + 1 >= e3dAnimFiles.length) {

                for (var i: number = 0; i < _meshList.length; i++) {
                    _meshList[i].animation.change(_meshList[i].animation.getAnimList()[0]);
                    _meshList[i].animation.play();
                }

                return;
            }

            loadE3DAnimation(skinMesh, index + 1);
        }
    }

    private time: number = 0;
    private delay: number = 0;
    private update() {
        this.time = new Date().getTime();
        BlackSwan.Gui.Stats.stats.update();
        this._cameraCtl.update();

        this._view3D.renden(this.time, this.delay);
        this.delay = new Date().getTime() - this.time;
    }
} 
