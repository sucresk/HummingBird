//class Sample_Base {
//    private _view3D: BlackSwan.View3D;
//    private _meshList: Array<BlackSwan.Mesh> = new Array<BlackSwan.Mesh>();
//    private _stateLabel: HTMLElement;
//    private _num: number = 100;
//    private _ad: string = "";
//    constructor() {
//        this._stateLabel = document.getElementById('label');
//        document.body.appendChild(this._stateLabel);
//        this.init3D();
//    }
//    private init3D() {
//        BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, new BlackSwan.Rectangle(0, 0, 1440, 800));
//        var viewPort: BlackSwan.Rectangle = new BlackSwan.Rectangle(0, 0, 1024, 768);
//        this._view3D = new BlackSwan.View3D(viewPort);
//        this._view3D.camera3D.z = -1000;
//        var sphereGeomtry: BlackSwan.SphereGeomtry = new BlackSwan.SphereGeomtry();
//        var cylinderGeomtry: BlackSwan.CylinderGeomtry = new BlackSwan.CylinderGeomtry();
//        var cubeGeomtry: BlackSwan.CubeGeomtry = new BlackSwan.CubeGeomtry();
//        var colorMaterial: BlackSwan.ColorMaterial = new BlackSwan.ColorMaterial();
//        for (var i: number = 0; i < this._num; i++) {
//            var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(cylinderGeomtry, colorMaterial);
//            tmpMesh.x = Math.random() * 1000 - 500;
//            tmpMesh.y = Math.random() * 1000 - 500;
//            tmpMesh.z = Math.random() * 1000 - 500;
//            this._meshList.push(tmpMesh);
//            this._view3D.addChild3D(tmpMesh);
//        }
//        this._stateLabel.innerText = this._ad + "当前数量:" + this._num.toString();
//        window.setInterval(() => this.update());
//        window.onkeydown = (e: KeyboardEvent) => this.keyAToAdd(e);
//        window.ontouchstart = (e: TouchEvent) => this.touchStart(e);
//    }
//    private touchStart(e: TouchEvent) {
//        if (e.touches[0].screenX < 1440 * 0.5) {
//            this._num += 10;
//            this._stateLabel.innerText = this._ad + "当前数量:" + this._num.toString();
//            for (var i: number = 0; i < 10; i++) {
//                var cubeGeomtry: BlackSwan.CubeGeomtry = new BlackSwan.CubeGeomtry();
//                var colorMaterial: BlackSwan.ColorMaterial = new BlackSwan.ColorMaterial();
//                var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(cubeGeomtry, colorMaterial);
//                tmpMesh.x = Math.random() * 1000 - 500;
//                tmpMesh.y = Math.random() * 1000 - 500;
//                tmpMesh.z = Math.random() * 1000 - 500;
//                this._meshList.push(tmpMesh);
//                this._view3D.addChild3D(tmpMesh);
//            }
//        } 
//    }
//    private keyAToAdd(e: KeyboardEvent) {
//        if (e.keyCode == 65) {
//            this._num += 10;
//            this._stateLabel.innerText = this._ad + "当前数量:" + this._num.toString();
//            for (var i: number = 0; i < 10; i++) {
//                var cubeGeomtry: BlackSwan.CubeGeomtry = new BlackSwan.CubeGeomtry();
//                var colorMaterial: BlackSwan.ColorMaterial = new BlackSwan.ColorMaterial();
//                var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(cubeGeomtry, colorMaterial);
//                tmpMesh.x = Math.random() * 1000 - 500;
//                tmpMesh.y = Math.random() * 1000 - 500;
//                tmpMesh.z = Math.random() * 1000 - 500;
//                this._meshList.push(tmpMesh);
//                this._view3D.addChild3D(tmpMesh);
//            }
//        }
//        //if (e.keyCode == 66) {
//        //    this._num -= 10;
//        //    this._stateLabel.innerText = this._ad + "当前数量:" + this._num.toString();
//        //    for (var i: number = 0; i < 10; i++) {
//        //        var cubeGeomtry: BlackSwan.CubeGeomtry = new BlackSwan.CubeGeomtry();
//        //        var colorMaterial: BlackSwan.ColorMaterial = new BlackSwan.ColorMaterial();
//        //        var tmpMesh: BlackSwan.Mesh = new BlackSwan.Mesh(cubeGeomtry, colorMaterial);
//        //        tmpMesh.x = Math.random() * 1000 - 500;
//        //        tmpMesh.y = Math.random() * 1000 - 500;
//        //        tmpMesh.z = Math.random() * 1000 - 500;
//        //        this._meshList.push(tmpMesh);
//        //        this._view3D.addChild3D(tmpMesh);
//        //    }
//        //}
//    }
//    private time: number = 0;
//    private update() {
//        this.time++;
//        for (var i: number = 0; i < this._meshList.length; i++) {
//            this._meshList[i].rotationY = this.time * Math.PI / 180;
//        }
//        this._view3D.renden();
//    }
//}  
//# sourceMappingURL=Sample_Base.js.map