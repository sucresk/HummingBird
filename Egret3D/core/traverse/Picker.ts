module Egret3D{
    export class Picker {

        static ray: Ray = new Ray();
        public static pickObject3DToMinBox(camera: Camera3D, objList: Array<Object3D>): PickResult {
            var volume: number = Number.MAX_VALUE;
            var ret: PickResult = new PickResult();
            var ray: Ray = this.ray;
            ray.CalculateAndTransformRay(Egret3DDrive.canvasRectangle.width, Egret3DDrive.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Input.instance.mouseX, Input.instance.mouseY);
            for (var i: number = 0; i < objList.length; ++i) {
                var mesh: Egret3D.Mesh = <Egret3D.Mesh>objList[i];
                var inPos: Vector3D = new Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.box.indexData.length / 3, inPos, mesh.modelMatrix)) {
                            if (volume > mesh.box.volume) {
                                volume = mesh.box.volume;
                                ///ret.target = mesh;
                                ///ret.intPos.copyFrom(inPos);
                            }
                        }
                    }
                }
            }

            ///if (ret.target == null) {
            ///    return null;
            ///}

            return ret;
        }

        public static pickObject3DToNearest(camera: Camera3D, objList: Array<Object3D>): PickResult {
            var dis: number = Number.MAX_VALUE;
            var ret: PickResult = new PickResult();
            var ray: Ray = this.ray;
            ray.CalculateAndTransformRay(Egret3DDrive.canvasRectangle.width, Egret3DDrive.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Input.instance.mouseX, Input.instance.mouseY);
            for (var i: number = 0; i < objList.length; ++i) {
                var mesh: Egret3D.Mesh = <Egret3D.Mesh>objList[i];
                var inPos: Vector3D = new Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.box.indexData.length / 3, inPos, mesh.modelMatrix)) {
                            var tmp:Vector3D = mesh.position.subtract(camera.position);
                            var d: number = tmp.length;
                            if (dis > d) {
                                dis = d;
                                ///ret.target = mesh;
                                ///ret.intPos.copyFrom(inPos);
                            }
                        }
                    }
                }
            }

            ///if (ret.target == null) {
            ///    return null;
            ///}

            return ret;
        }

        public static pickObject3DList(camera: Camera3D, objList: Array<Object3D>): Array<Object3D> {
            var ret: Array<Object3D> = new Array<Object3D>();
            var ray: Ray = this.ray;
            ray.CalculateAndTransformRay(Egret3DDrive.canvasRectangle.width, Egret3DDrive.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Input.instance.mouseX, Input.instance.mouseY);
            for (var i: number = 0; i < objList.length; ++i) {
                var mesh: Egret3D.Mesh = <Egret3D.Mesh>objList[i];
                var inPos: Vector3D = new Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.box.indexData.length / 3, inPos, mesh.modelMatrix)) {
                            var target: PickResult = new PickResult();
                            objList[i].pickerData.globalPosition.copyFrom(inPos);
                            ret.push(objList[i]);
                        }
                    }
                }
            }
            return ret;
        }

        public static pickObject3DList1(camera: Camera3D, objList: Array<Object3D>): Array<Object3D> {
            var ret: Array<Object3D> = new Array<Object3D>();
            var ray: Ray = this.ray;
            ray.CalculateAndTransformRay(Egret3DDrive.canvasRectangle.width, Egret3DDrive.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Input.instance.mouseX, Input.instance.mouseY);
            for (var i: number = 0; i < objList.length; ++i) {
                var mesh: Egret3D.Mesh = <Egret3D.Mesh>objList[i];
                var inPos: Vector3D = new Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.box.indexData.length / 3, inPos, mesh.modelMatrix)) {
                            objList[i].pickerData.globalPosition.copyFrom(inPos);
                            ///target.target = mesh;
                            ///target.intPos.copyFrom(inPos);
                            ret.push(objList[i]);;
                        }
                    }
                }
            }
            return ret;
        }

        public static pickObject3DListToMesh(camera: Camera3D, objList: Array<Object3D>): Array<Object3D> {
            var ret: Array<Object3D> = new Array<Object3D>();
            var ray: Ray = this.ray;
            ray.CalculateAndTransformRay(Egret3DDrive.canvasRectangle.width, Egret3DDrive.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Input.instance.mouseX, Input.instance.mouseY);
            for (var i: number = 0; i < objList.length; ++i) {
                var mesh: Egret3D.Mesh = <Egret3D.Mesh>objList[i];
                var inPos: Vector3D = new Vector3D();
                if (ray.IntersectMesh(mesh.geometry.verticesData, mesh.geometry.indexData, mesh.geometry.vertexAttLength, mesh.geometry.indexData.length / 3, inPos, mesh.modelMatrix)) {
                    var target: PickResult = new PickResult();
                    objList[i].pickerData.globalPosition.copyFrom(inPos);
                    ///target.target = mesh;
                    ///target.intPos.copyFrom(inPos);
                    ret.push(objList[i]);
                }
            }
            return ret;
        }
    }
}