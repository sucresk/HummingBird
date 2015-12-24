class Sample_BlendTerrain extends Sample_CreateView3D{

    protected _wireframeMesh: Egret3D.WireframeMesh = null;
    protected _enableWireframe: boolean = false;

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        this._view3D.sky = new Egret3D.Sky(new Egret3D.SkyTexture(
            <HTMLImageElement>document.getElementById("t1_1"),
            <HTMLImageElement>document.getElementById("t1_2"),
            <HTMLImageElement>document.getElementById("t1_3"),
            <HTMLImageElement>document.getElementById("t1_4"),
            <HTMLImageElement>document.getElementById("t1_5"),
            <HTMLImageElement>document.getElementById("t1_6")
        ));

        Egret3D.AssetsManager.getInstance().setRootURL("resource/");
        Egret3D.AssetsManager.getInstance().addEventListener(Egret3D.Event3D.EVENT_LOAD_COMPLETE, (e: Egret3D.Event3D) => this.onLoadComplete(e));
        Egret3D.AssetsManager.getInstance().addLoadTexture("terrain/height.jpg");
        Egret3D.AssetsManager.getInstance().addLoadTexture("terrain/light.jpg");
        Egret3D.AssetsManager.getInstance().addLoadTexture("terrain/normal.jpg");
        Egret3D.AssetsManager.getInstance().addLoadTexture("terrain/ColorMap.jpg");
        Egret3D.AssetsManager.getInstance().addLoadTexture("terrain/Mask.jpg");
        Egret3D.AssetsManager.getInstance().addLoadTexture("terrain/ground/Cliff.jpg");
        Egret3D.AssetsManager.getInstance().addLoadTexture("terrain/ground/Sand.jpg");
        Egret3D.AssetsManager.getInstance().addLoadTexture("terrain/ground/Sand_2.jpg");
        Egret3D.AssetsManager.getInstance().addLoadTexture("terrain/ground/Sand_stone.jpg");
        Egret3D.AssetsManager.getInstance().startLoad();

        Egret3D.Input.instance.addListenerKeyUp((keyCode: number) => this.onKeyUp(keyCode));

    }

    protected onKeyUp(keyCode: number): void {

        if (keyCode == Egret3D.KeyCode.Key_1) {

            this._enableWireframe = !this._enableWireframe;

            if (true == this._enableWireframe) {
                this._view3D.addWireframe(this._wireframeMesh);
            }
            else {
                this._view3D.delWireframe(this._wireframeMesh);
            }
        }
    }

    protected onLoadComplete(e: Egret3D.Event3D): void {

        Egret3D.AssetsManager.getInstance().removeEventListener(Egret3D.Event3D.EVENT_LOAD_COMPLETE, (e: Egret3D.Event3D) => this.onLoadComplete(e));

        this._cameraCtl.setEyesLength(5000);

        var dir: Egret3D.DirectLight = new Egret3D.DirectLight(new Egret3D.Vector3D(0.5, 0.9, 0.7));

        dir.intensity = 0.6;

        var lightGroup: Egret3D.LightGroup = new Egret3D.LightGroup();

        lightGroup.addDirectLight(dir);

        var colorMap: Egret3D.TextureBase = Egret3D.AssetsManager.getInstance().findTexture("terrain/ColorMap.jpg");
        var mask: Egret3D.TextureBase = Egret3D.AssetsManager.getInstance().findTexture("terrain/Mask.jpg");
        var rtexture: Egret3D.TextureBase = Egret3D.AssetsManager.getInstance().findTexture("terrain/ground/Sand.jpg");
        var gtexture: Egret3D.TextureBase = Egret3D.AssetsManager.getInstance().findTexture("terrain/ground/Cliff.jpg");
        var btexture: Egret3D.TextureBase = Egret3D.AssetsManager.getInstance().findTexture("terrain/ground/Sand_stone.jpg");
        var atexture: Egret3D.TextureBase = Egret3D.AssetsManager.getInstance().findTexture("terrain/ground/Sand_2.jpg");
        var height: Egret3D.TextureBase = Egret3D.AssetsManager.getInstance().findTexture("terrain/height.jpg");
        var light: Egret3D.TextureBase = Egret3D.AssetsManager.getInstance().findTexture("terrain/light.jpg");
        var normalTexture: Egret3D.TextureBase = Egret3D.AssetsManager.getInstance().findTexture("terrain/normal.jpg");
        var geo: Egret3D.ElevationGeometry = new Egret3D.ElevationGeometry(height, 5000, 1000, 5000, 200, 200, 2000, -1000);

        var fog: Egret3D.DistanceFog = new Egret3D.DistanceFog();
        fog.fogColor = 0xefbe95;
        fog.globalDensity = 0.002;
        fog.startDistance = 700;
        fog.distanceScale = 0.08;

        var mat: Egret3D.TerrainMaterial = new Egret3D.TerrainMaterial(colorMap, mask, rtexture, gtexture, btexture, atexture, light);
        mat.normalTexture = normalTexture;
        mat.specularColor = 0xffffff;
        mat.shininess = 100.0;
        mat.specularPower = 0.9;
        mat.setUVTitling(0, 60, 60);
        mat.setUVTitling(1, 60, 60);
        mat.setUVTitling(2, 60, 60);
        mat.setUVTitling(3, 60, 60);
        mat.lightGroup = lightGroup;
        mat.addDiffusePassEffectMothod(fog);

        var mesh: Egret3D.Mesh = new Egret3D.Mesh(geo, mat);

        mesh.isCut = false;

        mesh.material.acceptShadow = false;

        mesh.material.castShadow = false;

        //this._view3D.addChild3D(mesh);

        this._wireframeMesh = new Egret3D.WireframeMesh();

        this._wireframeMesh.creatByMesh(mesh);

        this.onKeyUp(Egret3D.KeyCode.Key_1);
    }

    protected onUpdate(): void {

        super.onUpdate();
    }
} 