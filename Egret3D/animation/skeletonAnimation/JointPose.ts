module Egret3D{
    export class JointPose{

        public name: string;
        public parent: string;
        public orientation: Quaternion;
        public translation:Vector3D;
        public scale: Vector3D;

        public localMatrix: Matrix4_4;
        public worldMatrix: Matrix4_4 = new Matrix4_4();
        public worldMatrixValid: boolean = false;

        public jointMatrix: Matrix4_4 = new Matrix4_4();
        public jointMatrixValid: boolean = false;

        constructor(){

        }

        public toMatrix3D(target:Matrix4_4 = null):Matrix4_4 {
            if(!target) target = new Matrix4_4;
            this.orientation.toMatrix3D(target);
            target.appendTranslation(this.translation.x, this.translation.y, this.translation.z);
            return target;
        }

        public copyFrom(pose:JointPose){
            var or:Quaternion = pose.orientation;
            var tr:Vector3D = pose.translation;
            this.orientation.x = or.x;
            this.orientation.y = or.y;
            this.orientation.z = or.z;
            this.orientation.w = or.w;

            this.translation.x = tr.x;
            this.translation.y = tr.y;
            this.translation.z = tr.z;


        }

    }

}