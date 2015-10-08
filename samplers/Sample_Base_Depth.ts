class Sample_Base_Depth {

    private _view3D: BlackSwan.View3D;
    private _meshList: Array<BlackSwan.Mesh> = new Array<BlackSwan.Mesh>();
    private _stateLabel: HTMLElement;
    private _num: number = 50;
    private _ad: string = "";

    private _cameraCtl: BlackSwan.FreeCameraControl;
    constructor() {

        //this._stateLabel = document.getElementById('label');
        //document.body.appendChild(this._stateLabel);

        //this.init3D();

        BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0,0,256,256) , ()=> this.init3D() );
    }

    private init3D() {

        //BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 1440, 800));

        var viewPort: BlackSwan.Rectangle = new BlackSwan.Rectangle(0, 0, 1024, 768);
        this._view3D = new BlackSwan.View3D(viewPort);
        this._view3D.camera3D.z = -0;

        var cubeGeomtry: BlackSwan.CubeGeomtry = new BlackSwan.CubeGeomtry();
        /*var depthMaterial: BlackSwan.DepthMaterial = new BlackSwan.DepthMaterial();

        for (var i: number = 0; i < this._num; i++) {
            var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(cubeGeomtry, depthMaterial);
            tmpMesh.x = Math.random() * 3000 - 1500;
            tmpMesh.y = Math.random() * 3000 - 1500;
            tmpMesh.z = Math.random() * 3000 - 1500;
            this._meshList.push(tmpMesh);
            this._view3D.addChild3D(tmpMesh);
        }*/

        //var binModelLoader : BlackSwan.BinModelLoader = new BlackSwan.BinModelLoader();
        //binModelLoader.loadBinModelFromFile("resource/jingjichang_1/MyModel/jingjichang_1_1_1_Model.bin", (loader: BlackSwan.BinModelLoader) => this.complete(loader))

        //binModelLoader = new BlackSwan.BinModelLoader();
        //binModelLoader.loadBinModelFromFile("resource/jingjichang_1/MyModel/jingjichang_1_2_1_Model.bin", (loader: BlackSwan.BinModelLoader) => this.complete(loader))

        //binModelLoader = new BlackSwan.BinModelLoader();
        //binModelLoader.loadBinModelFromFile("MyModel/1_03_02_Model.bin", (loader: BlackSwan.BinModelLoader) => this.complete(loader))

        //binModelLoader = new BlackSwan.BinModelLoader();
        //binModelLoader.loadBinModelFromFile("MyModel/world_Model.bin", (loader: BlackSwan.BinModelLoader) => this.complete(loader))

        
         
        this._cameraCtl = new BlackSwan.FreeCameraControl(this._view3D);
        this._cameraCtl.start(45, 1600, 45, false, null);


        window.setInterval(() => this.update());
        //window.onkeydown = (e: KeyboardEvent) => this.keyAToAdd(e);
        //window.ontouchstart = (e: TouchEvent) => this.touchStart(e);
    }

    public complete(loader: BlackSwan.BinModelLoader) {

        var img = document.getElementById('myTexture');
        //var floatMaterial: BlackSwan.BinaryTexture = new BlackSwan.BinaryTexture(null);
        //floatMaterial.fillData(2048, 2048, 0xff00ff00 );
        var depthMaterial: BlackSwan.TextureMaterial = new BlackSwan.TextureMaterial(new BlackSwan.ImageTexture(<HTMLImageElement>img));
        //var depthMaterial: BlackSwan.TextureMaterial = new BlackSwan.TextureMaterial( floatMaterial );

        var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(loader.geomtryBase, depthMaterial);
        tmpMesh.isCut = false;
        this._meshList.push(tmpMesh);
        tmpMesh.listenerMouseEvent(BlackSwan.MouseEventType.mouse_LStart, (obj: BlackSwan.Object3D) => this.onMouseLStart(obj));
        this._view3D.addChild3D(tmpMesh);
       
    }

    public onMouseLStart(obj: BlackSwan.Object3D) {
        console.log("onMouseLStart");
    }

    //private touchStart(e: TouchEvent) {
    //    if (e.touches[0].screenX < 1440 * 0.5) {
    //        this._num += 10;
    //        this._stateLabel.innerText = this._ad + "当前数量:" + this._num.toString();

    //        for (var i: number = 0; i < 10; i++) {
    //            var cubeGeomtry: BlackSwan.CubeGeomtry = new BlackSwan.CubeGeomtry();
    //            var depthMaterial: BlackSwan.DepthMaterial = new BlackSwan.DepthMaterial();
    //            var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(cubeGeomtry, depthMaterial);
    //            tmpMesh.x = Math.random() * 1000 - 500;
    //            tmpMesh.y = Math.random() * 1000 - 500;
    //            tmpMesh.z = Math.random() * 1000 - 500;
    //            this._meshList.push(tmpMesh);
    //            this._view3D.addChild3D(tmpMesh);
    //        }
    //    }

    //}

    //private keyAToAdd(e: KeyboardEvent) {
    //    if (e.keyCode == 65) {
    //        this._num += 10;
    //        this._stateLabel.innerText = this._ad + "当前数量:" + this._num.toString();

    //        for (var i: number = 0; i < 10; i++) {
    //            var cubeGeomtry: BlackSwan.CubeGeomtry = new BlackSwan.CubeGeomtry();
    //            var depthMaterial: BlackSwan.DepthMaterial = new BlackSwan.DepthMaterial();
    //            var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(cubeGeomtry, depthMaterial);
    //            tmpMesh.x = Math.random() * 1000 - 500;
    //            tmpMesh.y = Math.random() * 1000 - 500;
    //            tmpMesh.z = Math.random() * 1000 - 500;
    //            this._meshList.push(tmpMesh);
    //            this._view3D.addChild3D(tmpMesh);
    //        }
    //    }

    //    //if (e.keyCode == 66) {
    //    //    this._num -= 10;
    //    //    this._stateLabel.innerText = this._ad + "当前数量:" + this._num.toString();

    //    //    for (var i: number = 0; i < 10; i++) {
    //    //        var cubeGeomtry: BlackSwan.CubeGeomtry = new BlackSwan.CubeGeomtry();
    //    //        var colorMaterial: BlackSwan.ColorMaterial = new BlackSwan.ColorMaterial();
    //    //        var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(cubeGeomtry, colorMaterial);
    //    //        tmpMesh.x = Math.random() * 1000 - 500;
    //    //        tmpMesh.y = Math.random() * 1000 - 500;
    //    //        tmpMesh.z = Math.random() * 1000 - 500;
    //    //        this._meshList.push(tmpMesh);
    //    //        this._view3D.addChild3D(tmpMesh);
    //    //    }
    //    //}
    //}

    private time: number = 0;
    private update() {

        this.time++;

        this._cameraCtl.update( this.time , 16 );
        for (var i: number = 0; i < this._meshList.length; i++) {
            //this._meshList[i].rotationY = this.time * Math.PI / 180;
        }
        this._view3D.renden();
    }
} 