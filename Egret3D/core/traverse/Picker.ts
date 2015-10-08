module BlackSwan{
    export class PickResult {
        public target: Object3D = null;
        public intPos: Vector3D = new Vector3D();
    }

    export class Picker {

        public static pickObject3DToMinBox(camera: Camera3D, objList: Array<Object3D>): PickResult {
            var volume: number = Number.MAX_VALUE;
            var ret: PickResult = new PickResult();
            var ray: Ray = new Ray();
            ray.CalculateAndTransformRay(Egret3D.canvasRectangle.width, Egret3D.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Egret3D.mouseX, Egret3D.mouseY);
            for (var i: number = 0; i < objList.length; ++i) {
                var mesh: BlackSwan.Mesh = <BlackSwan.Mesh>objList[i];
                var inPos: Vector3D = new Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.geomtry.indexData.length / 3, inPos, mesh.modelMatrix)) {
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
        }

        public static pickObject3DToNearest(camera: Camera3D, objList: Array<Object3D>): PickResult {
            var dis: number = Number.MAX_VALUE;
            var ret: PickResult = new PickResult();
            var ray: Ray = new Ray();
            ray.CalculateAndTransformRay(Egret3D.canvasRectangle.width, Egret3D.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Egret3D.mouseX, Egret3D.mouseY);
            for (var i: number = 0; i < objList.length; ++i) {
                var mesh: BlackSwan.Mesh = <BlackSwan.Mesh>objList[i];
                var inPos: Vector3D = new Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.geomtry.indexData.length / 3, inPos, mesh.modelMatrix)) {
                            var tmp:Vector3D = mesh.position.subtract(camera.position);
                            var d: number = tmp.length;
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
        }

        public static pickObject3DList(camera: Camera3D, objList: Array<Object3D>): Array<PickResult> {
            var ret: Array<PickResult> = new Array<PickResult>();
            var ray: Ray = new Ray();
            ray.CalculateAndTransformRay(Egret3D.canvasRectangle.width, Egret3D.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Egret3D.mouseX, Egret3D.mouseY);
            for (var i: number = 0; i < objList.length; ++i) {
                var mesh: BlackSwan.Mesh = <BlackSwan.Mesh>objList[i];
                var inPos: Vector3D = new Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.geomtry.indexData.length / 3, inPos, mesh.modelMatrix)) {
                            var target: PickResult = new PickResult();
                            target.target = mesh;
                            target.intPos.copyFrom(inPos);
                            ret.push(target);
                        }
                    }
                }
            }
            return ret;
        }
    }
}