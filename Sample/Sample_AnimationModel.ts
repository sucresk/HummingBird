class Sample_AnimationModel extends Sample_CreateSky {

    protected _xiaoQiao: Egret3D.Mesh = null;

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        Egret3D.AssetsManager.getInstance().addLoadAnimModel("resource/xiaoqiao/", "xiaoqiao.esm",
            ["idle_1.eam", "run_1.eam", "attack_1.eam", "death_1.eam", "skill_1.eam", "skill_2.eam", "skill_3.eam", "skill_4.eam"]);

        Egret3D.AssetsManager.getInstance().addEventListener(Egret3D.Event3D.EVENT_LOAD_COMPLETE, (e: Egret3D.Event3D) => this.onLoadComplete(e));

        Egret3D.AssetsManager.getInstance().startLoad();

        this._cameraCtl.setEyesLength(600);

        super.onView3DInitComplete();
    }

    protected onKeyUp(keyCode:number): void {
        switch (keyCode) {
            case Egret3D.KeyCode.Key_1:
            case Egret3D.KeyCode.Key_2:
            case Egret3D.KeyCode.Key_3:
            case Egret3D.KeyCode.Key_4:
            case Egret3D.KeyCode.Key_5:
            case Egret3D.KeyCode.Key_6:
            case Egret3D.KeyCode.Key_7:
            case Egret3D.KeyCode.Key_8:
                if (this._xiaoQiao != null) {

                    var index: number = Egret3D.KeyCode.Key_8 - keyCode;

                    var animList: string[] = this._xiaoQiao.animation.skeletonAnimationController.getAnimList();

                    if (index >= animList.length)
                        return;

                    this._xiaoQiao.animation.skeletonAnimationController.play(animList[index]);
                }
                break;
        }
    }

    protected onLoadComplete(e: Egret3D.Event3D): void {

        this._xiaoQiao = Egret3D.AssetsManager.getInstance().findAnimModel("resource/xiaoqiao/xiaoqiao.esm");

        this._xiaoQiao.y = -80;

        this._view3D.addChild3D(this._xiaoQiao);

        Egret3D.Input.instance.addListenerKeyUp((keyCode: number) => this.onKeyUp(keyCode));
    }
}