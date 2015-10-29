module Egret3D {
    export class PickResult {
        public localPosition: Vector3D = new Vector3D();
        public globalPosition: Vector3D = new Vector3D();
        public object3DPosition: Vector3D = new Vector3D();
        public uv: Vector3D = new Vector3D();

        public near: number = 0;
    }
}