var BlackSwan;
(function (BlackSwan) {
    var PickResult = (function () {
        function PickResult() {
            this.target = null;
            this.intPos = new BlackSwan.Vector3D();
        }
        return PickResult;
    })();
    BlackSwan.PickResult = PickResult;
    var Picker = (function () {
        function Picker() {
        }
        Picker.pickObject3DToMinBox = function (camera, objList) {
            var volume = Number.MAX_VALUE;
            var ret = new PickResult();
            var ray = new BlackSwan.Ray();
            ray.CalculateAndTransformRay(BlackSwan.Egret3D.canvasRectangle.width, BlackSwan.Egret3D.canvasRectangle.height, camera.transform, camera.cameraMatrix.matrix, BlackSwan.Egret3D.mouseX, BlackSwan.Egret3D.mouseY);
            for (var i = 0; i < objList.length; ++i) {
                var mesh = objList[i];
                var inPos = new BlackSwan.Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.geomtry.indexData.length / 3, inPos, mesh.transform)) {
                            if (volume > mesh.box.volume) {
                                volume = mesh.box.volume;
                                ret.target = mesh;
                                ret.intPos.copyFrom(inPos);
                            }
                        }
                    }
                }
            }
            if (ret.target == null) {
                return null;
            }
            return ret;
        };
        Picker.pickObject3DToNearest = function (camera, objList) {
            var dis = Number.MAX_VALUE;
            var ret = new PickResult();
            var ray = new BlackSwan.Ray();
            ray.CalculateAndTransformRay(BlackSwan.Egret3D.canvasRectangle.width, BlackSwan.Egret3D.canvasRectangle.height, camera.transform, camera.cameraMatrix.matrix, BlackSwan.Egret3D.mouseX, BlackSwan.Egret3D.mouseY);
            for (var i = 0; i < objList.length; ++i) {
                var mesh = objList[i];
                var inPos = new BlackSwan.Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.geomtry.indexData.length / 3, inPos, mesh.transform)) {
                            var tmp = mesh.position.subtract(camera.position);
                            var d = tmp.length;
                            if (dis > d) {
                                dis = d;
                                ret.target = mesh;
                                ret.intPos.copyFrom(inPos);
                            }
                        }
                    }
                }
            }
            if (ret.target == null) {
                return null;
            }
            return ret;
        };
        Picker.pickObject3DList = function (camera, objList) {
            var ret = new Array();
            var ray = new BlackSwan.Ray();
            ray.CalculateAndTransformRay(BlackSwan.Egret3D.canvasRectangle.width, BlackSwan.Egret3D.canvasRectangle.height, camera.transform, camera.cameraMatrix.matrix, BlackSwan.Egret3D.mouseX, BlackSwan.Egret3D.mouseY);
            for (var i = 0; i < objList.length; ++i) {
                var mesh = objList[i];
                var inPos = new BlackSwan.Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.geomtry.indexData.length / 3, inPos, mesh.transform)) {
                            var target = new PickResult();
                            target.target = mesh;
                            target.intPos.copyFrom(inPos);
                            ret.push(target);
                        }
                    }
                }
            }
            return ret;
        };
        return Picker;
    })();
    BlackSwan.Picker = Picker;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Picker.js.map