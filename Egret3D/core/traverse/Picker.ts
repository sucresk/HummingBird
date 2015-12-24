module Egret3D{

    /**
    * @class Egret3D.Picker
    * @classdesc
    * 鼠标拾取
    */
    export class Picker {
        protected static ray: Ray = new Ray();
                                                        
        /**
        * @language zh_CN
        * 返回鼠标拾取对象包围盒子得到的所有对象
        * @param camera 当前相机
        * @param objects 检测的对象列表
        * @returns 拾取的object列表
        */
        public static pickObject3DList(camera: Camera3D, objects: Array<Object3D>): Array<Object3D> {
            var ret: Array<Object3D> = new Array<Object3D>();
            var ray: Ray = this.ray;
            ray.CalculateAndTransformRay(Egret3DDrive.canvasRectangle.width, Egret3DDrive.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Input.instance.mouseX, Input.instance.mouseY);
            for (var i: number = 0; i < objects.length; ++i) {
                var mesh: Egret3D.Mesh = <Egret3D.Mesh>objects[i];
                var inPos: Vector3D = new Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.box != null) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.box.indexData.length / 3, inPos, mesh.modelMatrix)) {
                            var target: PickResult = new PickResult();
                            objects[i].pickerData.globalPosition.copyFrom(inPos);
                            ret.push(objects[i]);
                        }
                    }
                }
            }
            return ret;
        }
                                                                
        /**
        * @language zh_CN
        * 返回鼠标拾取对象模型得到的所有对象
        * @param camera 当前相机
        * @param objects 检测的对象列表
        * @returns 拾取的object列表
        */
        public static pickObject3DListToMesh(camera: Camera3D, objects: Array<Object3D>): Array<Object3D> {
            var ret: Array<Object3D> = new Array<Object3D>();
            var ray: Ray = this.ray;
            ray.CalculateAndTransformRay(Egret3DDrive.canvasRectangle.width, Egret3DDrive.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Input.instance.mouseX, Input.instance.mouseY);
            for (var i: number = 0; i < objects.length; ++i) {
                var mesh: Egret3D.Mesh = <Egret3D.Mesh>objects[i];
                var inPos: Vector3D = new Vector3D();
                if (ray.IntersectMesh(mesh.geometry.verticesData, mesh.geometry.indexData, mesh.geometry.vertexAttLength, mesh.geometry.indexData.length / 3, inPos, mesh.modelMatrix)) {
                    var target: PickResult = new PickResult();
                    objects[i].pickerData.globalPosition.copyFrom(inPos);
                    ///target.target = mesh;
                    ///target.intPos.copyFrom(inPos);
                    ret.push(objects[i]);
                }
            }
            return ret;
        }
    }
}