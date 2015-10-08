class Sample_Base_Egret_3D_Model_Anim {

    private _view3D: BlackSwan.View3D;
    private _view3D2: BlackSwan.View3D;
    private _meshList: Array<BlackSwan.Mesh> = new Array<BlackSwan.Mesh>();

    private _stFrame: Array<STFrame> = new Array<STFrame>();
    private _currentFrameIndex: number = -1;

    private _cameraCtl: BlackSwan.FreeCameraControl;
    constructor() {

        BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 1024, 800), () => this.init3D());
    }

    private init3D() {
        var viewPort: BlackSwan.Rectangle = new BlackSwan.Rectangle(0, 0, 1024, 800);
        this._view3D = new BlackSwan.View3D(viewPort);
        this._view3D.camera3D.z = -0;

        var urlLoader: xxq.URLLoader = new xxq.URLLoader();
        urlLoader.dataformat = xxq.URLLoader.DATAFORMAT_BINARY;
        urlLoader.onLoadComplete = (urlLoader: xxq.URLLoader) => this.showAnim(urlLoader);
        urlLoader.load("resource/1.e3danim");

        window.setInterval(() => this.update());

        this._cameraCtl = new BlackSwan.FreeCameraControl(this._view3D);
        this._cameraCtl.start(45, 1600, 45, false, null);
    }

    private showAnim(urlLoader: xxq.URLLoader): void {
        var bytes: BlackSwan.ByteArray = urlLoader.data;

        var nFrameCount: number = bytes.readUnsignedInt();

        var needCreate: boolean = true;

        while (nFrameCount--) {

            var stFrame = new STFrame();

            var nBoneCount: number = bytes.readUnsignedInt();

            while (nBoneCount--) {

                var stBone = new STBone();

                //Scaling
                stBone.scale.x = bytes.readFloat() * 0.5;
                stBone.scale.y = bytes.readFloat() * 0.5;
                stBone.scale.z = bytes.readFloat() * 0.5;

                //rotat
                stBone.rotat.x = bytes.readFloat();
                stBone.rotat.y = bytes.readFloat();
                stBone.rotat.z = bytes.readFloat();

                //translation
                stBone.position.x = bytes.readFloat();
                stBone.position.y = bytes.readFloat();
                stBone.position.z = bytes.readFloat();

                stFrame.bone.push(stBone);

                if (needCreate) {
                    var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(new BlackSwan.CubeGeomtry(), new BlackSwan.ColorMaterial(1.0,0.0,0.0,1.0));
                    tmpMesh.scaleX = stBone.scale.x;
                    tmpMesh.scaleY = stBone.scale.y;
                    tmpMesh.scaleZ = stBone.scale.z;
                    tmpMesh.rotationX = stBone.rotat.x;
                    tmpMesh.rotationY = stBone.rotat.y;
                    tmpMesh.rotationZ = stBone.rotat.z;
                    tmpMesh.position.x = stBone.position.x;
                    tmpMesh.position.y = stBone.position.y;
                    tmpMesh.position.z = stBone.position.z;
                    this._meshList.push(tmpMesh);
                    this._view3D.addChild3D(tmpMesh);
                }
            }

            this._stFrame.push(stFrame);

            needCreate = false;
        }
    }

    private time: number = 0;
    private update() {

        this.time++;

        if (this._stFrame.length > 0) {
            var frameIndex: number = Math.round(this.time / 1) % this._stFrame.length;

            if (frameIndex != this._currentFrameIndex) {
                this._currentFrameIndex = frameIndex;

                var bone: Array<STBone> = this._stFrame[this._currentFrameIndex].bone;

                for (var i: number = 0; i < bone.length; i++) {

                    this._meshList[i].scaleX = bone[i].scale.x;
                    this._meshList[i].scaleY = bone[i].scale.y;
                    this._meshList[i].scaleZ = bone[i].scale.z;

                    this._meshList[i].rotationX = bone[i].rotat.x;
                    this._meshList[i].rotationY = bone[i].rotat.y;
                    this._meshList[i].rotationZ = bone[i].rotat.z;

                    this._meshList[i].position.x = bone[i].position.x;
                    this._meshList[i].position.y = bone[i].position.y;
                    this._meshList[i].position.z = bone[i].position.z;
                }
            }
        }

        this._cameraCtl.update(this.time, 16);

        this._view3D.renden();
    }
} 

class STBone {
    public scale: BlackSwan.Vector3D = new BlackSwan.Vector3D();
    public rotat: BlackSwan.Vector3D = new BlackSwan.Vector3D();
    public position: BlackSwan.Vector3D = new BlackSwan.Vector3D();
}

class STFrame {
    public bone: Array<STBone> = new Array<STBone>();
}