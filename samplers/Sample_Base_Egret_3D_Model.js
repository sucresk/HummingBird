var Sample_Base_Egret_3D_Model = (function () {
    function Sample_Base_Egret_3D_Model() {
        this._meshList = new Array();
        this.time = 0;
        this.init3D();
    }
    Sample_Base_Egret_3D_Model.prototype.init3D = function () {
        var _this = this;
        var viewPort = new BlackSwan.Rectangle(0, 0, 1024, 800);
        this._view3D = new BlackSwan.View3D(viewPort);
        this._view3D.camera3D.z = -1000;
        viewPort = new BlackSwan.Rectangle(256, 0, 256, 256);
        this._view3D2 = new BlackSwan.View3D(viewPort);
        this._view3D2.camera3D.z = -1000;
        var urlLoader = new xxq.URLLoader();
        urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_DDS;
        urlLoader.onLoadComplete = function (urlLoader) { return _this.onTextureLoadingComplete(urlLoader); };
        urlLoader.load("dds_image.dds");
        window.setInterval(function () { return _this.update(); });
        this._cameraCtl = new BlackSwan.FreeCameraControl(this._view3D);
        this._cameraCtl.start(45, 1600, 45, false, null);
    };
    Sample_Base_Egret_3D_Model.prototype.onTextureLoadingComplete = function (textureLoader) {
        var _this = this;
        var urlLoader = new xxq.URLLoader();
        urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_E3D;
        urlLoader.onLoadComplete = function (urlLoader) { return _this.onLoadingComplete(urlLoader, new BlackSwan.ImageTexture(textureLoader.data)); };
        urlLoader.load("e3d.bin");
    };
    Sample_Base_Egret_3D_Model.prototype.onLoadingComplete = function (urlLoader, texture) {
        var tmpMesh = new BlackSwan.Mesh(urlLoader.data, new BlackSwan.TextureMaterial(texture));
        this._meshList.push(tmpMesh);
        this._view3D.addChild3D(tmpMesh);
    };
    Sample_Base_Egret_3D_Model.prototype.update = function () {
        this.time++;
        this._cameraCtl.update(this.time, 16);
        this._view3D.renden();
        this._view3D2.renden();
    };
    return Sample_Base_Egret_3D_Model;
})();
//# sourceMappingURL=Sample_Base_Egret_3D_Model.js.map