module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.Joint
     * @classdesc
     * 骨骼
     */
    export class Joint {
        
        /**
        * @language zh_CN
        * 骨骼矩阵是否有效
        */
        public jointMatrixValid: boolean = false;

        /**
        * @language zh_CN
        * 骨骼世界矩阵是否有效
        */
        public worldMatrixValid: boolean = false;

        /**
        * @language zh_CN
        * 骨骼矩阵
        */
        public jointMatrix: Matrix4_4 = new Matrix4_4();

        /**
        * @language zh_CN
        * 骨骼世界矩阵
        */
        public worldMatrix: Matrix4_4 = new Matrix4_4();

        /**
        * @language zh_CN
        * 骨骼名称
        */
        public name: string = null;

        /**
        * @language zh_CN
        * 父骨骼名称
        */
        public parent: string = null;

        /**
        * @language zh_CN
        * 父骨骼索引编号
        */
        public parentIndex: number = -1;

        /**
        * @language zh_CN
        * 骨骼逆矩阵
        */
        public inverseBindPose: Matrix4_4 = null;

        /**
        * @language zh_CN
        * 骨骼缩放量
        */
        public scale: Vector3D = null;

        /**
        * @language zh_CN
        * 骨骼旋转量
        */
        public orientation: Quaternion = null;

        /**
        * @language zh_CN
        * 骨骼平移量
        */
        public translation: Vector3D = null;

        /**
        * @language zh_CN
        * 骨骼本地矩阵
        */
        public localMatrix: Matrix4_4 = null;

        constructor(name: string) {
            this.name = name;
        }

        /**
        * @language zh_CN
        * 克隆新骨骼对象
        * @return 新骨骼对象
        */
        public clone(): Joint {

            var cloneObj: Joint = new Joint(this.name);

            cloneObj.parent = this.parent;
            cloneObj.parentIndex = this.parentIndex;

            if (this.inverseBindPose) {
                cloneObj.inverseBindPose = new Matrix4_4;
                cloneObj.inverseBindPose.copyFrom(this.inverseBindPose);
            }

            if (this.scale) {
                cloneObj.scale = new Vector3D();
                cloneObj.scale.copyFrom(this.scale);
            }

            if (this.orientation) {
                cloneObj.orientation = new Quaternion();
                cloneObj.orientation.copyFrom(this.orientation);
            }

            if (this.translation) {
                cloneObj.translation = new Vector3D();
                cloneObj.translation.copyFrom(this.translation);
            }

            if (this.scale && this.orientation && this.translation) {
                cloneObj.setLocalTransform(cloneObj.orientation, cloneObj.scale, cloneObj.translation);
            }

            return cloneObj;
        }

        /**
        * @language zh_CN
        * 设置骨骼逆矩阵
        * @param translation 平移量
        * @param rotation 旋转量
        * @param scaling 缩放量
        */
        public setInverseBindPose(translation: Vector3D, rotation: Vector3D, scaling: Vector3D): void {

            if (!this.inverseBindPose) {
                this.inverseBindPose = new Matrix4_4();
            }

            this.inverseBindPose.recompose([translation, rotation, scaling]);
        }

        /**
        * @language zh_CN
        * 设置骨骼本地置换
        * @param orientation 旋转量
        * @param scale 缩放量
        * @param translation 平移量
        */
        public setLocalTransform(orientation: Quaternion, scale: Vector3D, translation: Vector3D): void {

            this.translation = translation;
            this.orientation = orientation;
            this.scale = scale;

            if (!this.localMatrix) {
                this.localMatrix = new Matrix4_4();
            }

            this.localMatrix.makeTransform(this.translation, this.scale, this.orientation);
        }
    }
}
