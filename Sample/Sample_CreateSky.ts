class Sample_CreateSky extends Sample_CreateView3D {

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        var skyTexture: Egret3D.SkyTexture = new Egret3D.SkyTexture(
            <HTMLImageElement>document.getElementById("t1"),
            <HTMLImageElement>document.getElementById("t2"),
            <HTMLImageElement>document.getElementById("t3"),
            <HTMLImageElement>document.getElementById("t4"),
            <HTMLImageElement>document.getElementById("t5"),
            <HTMLImageElement>document.getElementById("t6")
        );

        this._view3D.sky = new Egret3D.Sky(skyTexture);
    }
}