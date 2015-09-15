var Sample_Base_Texture = (function () {
    function Sample_Base_Texture() {
        this._meshList = new Array();
        this.time = 0;
        this.init3D();
    }
    Sample_Base_Texture.prototype.init3D = function () {
        var _this = this;
        BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 1440, 800));
        var viewPort = new BlackSwan.Rectangle(0, 0, 1024, 768);
        this._view3D = new BlackSwan.View3D(viewPort);
        this._view3D.camera3D.z = -1000;
        var tmpMesh = new BlackSwan.Mesh(new BlackSwan.CubeGeomtry(), new BlackSwan.TextureMaterial(new BlackSwan.CheckerboardTexture()));
        this._meshList.push(tmpMesh);
        this._view3D.addChild3D(tmpMesh);
        var urlLoader = new xxq.URLLoader();
        urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
        urlLoader.onLoadComplete = function (urlLoader) { return _this.textureLoadingComplete(urlLoader); };
        urlLoader.load("dds_image.png");
        window.setInterval(function () { return _this.update(); });
        this._cameraCtl = new BlackSwan.FreeCameraControl(this._view3D);
        this._cameraCtl.start(45, 1600, 45, false, null);
    };
    Sample_Base_Texture.prototype.textureLoadingComplete = function (urlLoader) {
        var tmpMesh = new BlackSwan.Mesh(new BlackSwan.CubeGeomtry(), new BlackSwan.TextureMaterial(new BlackSwan.DDSTexture(urlLoader.data)));
        tmpMesh.x = 40;
        this._meshList.push(tmpMesh);
        this._view3D.addChild3D(tmpMesh);
    };
    Sample_Base_Texture.prototype.update = function () {
        this.time++;
        this._cameraCtl.update(this.time, 16);
        this._view3D.renden();
    };
    return Sample_Base_Texture;
})();
//# sourceMappingURL=Sample_Base_Texture.js.map