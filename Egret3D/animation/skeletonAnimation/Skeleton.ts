module Egret3D {

    /**
     * @language zh_CN
     * @class Egret3D.Skeleton
     * @classdesc
     * 骨架
     */
    export class Skeleton {

        /**
        * @language zh_CN
        * 当前骨架帧时间
        */
        public frameTime: number = 0;

        /**
        * @language zh_CN
        * 骨架包含的骨骼
        */
        public joints: Array<Joint> = [];

        /**
        * @language zh_CN
        * 骨架矩阵是否有效
        */
        public skeletonMatrixValid: boolean = false;

        private _skeletonMatrix: Float32Array = null;
        private _initialSkeleton: Skeleton = null;
        private _temp_q0: Quaternion = new Quaternion();
        private _temp_q1: Quaternion = new Quaternion();
        private _temp_q2: Quaternion = new Quaternion();
        private _temp_v0: Vector3D = new Vector3D();
        private _temp_v1: Vector3D = new Vector3D();
        private _temp_v2: Vector3D = new Vector3D();

        constructor(initialSkeleton: Skeleton = null) {

            if (initialSkeleton) {
                this.initialSkeleton = initialSkeleton;
            }
        }

        /**
        * @language zh_CN
        * 克隆新骨架对象
        * @return 新骨架对象
        */
        public clone(): Skeleton {

            var cloneObj: Skeleton = new Skeleton(this.initialSkeleton);

            cloneObj.frameTime = this.frameTime;

            for (var i: number = 0; i < this.joints.length; i++) {
                cloneObj.joints.push(this.joints[i].clone() );
            }

            return cloneObj;
        }

        /**
        * @language zh_CN
        * 重置骨架数据
        */
        public reset(): void {

            for (var i: number = 0; i < this.joints.length; i++) {

                this.joints[i].jointMatrix.identity();
                this.joints[i].jointMatrixValid = false;
                this.joints[i].worldMatrix.identity();
                this.joints[i].worldMatrixValid = false;

                this.joints[i].orientation.x =
                this.joints[i].orientation.y =
                this.joints[i].orientation.z =
                this.joints[i].orientation.w = 0;

                this.joints[i].scale.x =
                this.joints[i].scale.y =
                this.joints[i].scale.z =
                this.joints[i].scale.w = 0;

                this.joints[i].translation.x =
                this.joints[i].translation.y =
                this.joints[i].translation.z =
                this.joints[i].translation.w = 0;
            }
        }

        /**
        * @language zh_CN
        * 设置初始骨架
        * @param value 初始骨架
        */
        public set initialSkeleton(value: Skeleton) {

            this._initialSkeleton = value;

            if (!this._skeletonMatrix) {

                this._skeletonMatrix = new Float32Array(this._initialSkeleton.numJoint * 8);

                this.skeletonMatrixValid = false;
            }
        }

        /**
        * @language zh_CN
        * 初始骨架
        */
        public get initialSkeleton(): Skeleton {
            return this._initialSkeleton;
        }

        /**
        * @language zh_CN
        * 骨架矩阵阵列
        */
        public get skeletonMatrix(): Float32Array {
            return this._skeletonMatrix;
        }

        /**
        * @language zh_CN
        * 骨骼数量
        */
        public get numJoint(): number {
            return this.joints.length;
        }

        /**
        * @language zh_CN
        * 通过名称查找指定骨骼
        * @param name 骨骼名称
        * @return 骨骼对象
        */
        public findJoint(name: string): Joint {

            for (var i: number = 0; i < this.joints.length; i++) {
                if (this.joints[i].name == name)
                    return this.joints[i];
            }

            return null;
        }

        /**
        * @language zh_CN
        * 通过名称查找骨骼索引编号
        * @param name 骨骼名称
        * @return 骨骼索引编号
        */
        public findJointIndex(name: string): number {

            for (var i: number = 0; i < this.joints.length; i++) {
                if (this.joints[i].name == name)
                    return i;
            }

            return -1;
        }

        /**
        * @language zh_CN
        * 骨架插值
        * @param skeleton0 骨架0
        * @param skeleton1 骨架1
        * @param tNow 新骨架帧时间（骨架0.frameTime ~ 骨架1.frameTime）
        */
        public skeletonLerp(skeleton0: Skeleton, skeleton1: Skeleton, tNow: number): void {

            this.frameTime = tNow;

            var t: number = (tNow - skeleton0.frameTime) / Math.abs(skeleton1.frameTime - skeleton0.frameTime);

            this.lerp(skeleton0, skeleton1, t);
        }

        /**
        * @language zh_CN
        * 骨架插值计算
        * @param skeleton0 骨架0
        * @param skeleton1 骨架1
        * @param t 时间因子(0.0~1.0);
        */
        public lerp(skeleton0: Skeleton, skeleton1: Skeleton, t: number): void {

            for (var index: number = 0; index < skeleton0.joints.length; index++) {

                if (index >= this.joints.length) {
                    this.joints.push(new Joint(null));
                }

                var newJointPose: Joint = this.joints[index];

                newJointPose.name = skeleton0.joints[index].name;

                newJointPose.worldMatrixValid = true;

                this._temp_q0.fromMatrix(skeleton0.joints[index].worldMatrix);
                this._temp_q1.fromMatrix(skeleton1.joints[index].worldMatrix);
                this._temp_q2.lerp(this._temp_q0, this._temp_q1, t);

                skeleton0.joints[index].worldMatrix.copyRowTo(3, this._temp_v0);
                skeleton1.joints[index].worldMatrix.copyRowTo(3, this._temp_v1);
                this._temp_v2.lerp(this._temp_v0, this._temp_v1, t);

                this._temp_q2.toMatrix3D(newJointPose.worldMatrix);
                newJointPose.worldMatrix.rawData[12] = this._temp_v2.x;
                newJointPose.worldMatrix.rawData[13] = this._temp_v2.y;
                newJointPose.worldMatrix.rawData[14] = this._temp_v2.z;
                newJointPose.jointMatrixValid = false;
                this.skeletonMatrixValid = false;
            }
        }

        /**
        * @language zh_CN
        * 骨架转矩阵阵列数组
        * @param target 用于储存的矩阵阵列数组
        * @return 矩阵阵列数组
        */
        public toMatrixData(target: Float32Array = null): Float32Array {

            var joints: Array<Joint> = this._initialSkeleton.joints;

            if (!target) {
                target = new Float32Array(this.joints.length * 8);
            }

            for (var i: number = 0; i < joints.length; i++) {

                for (var j: number = 0; j < this.joints.length; j++) {

                    if (this.joints[j].name != joints[i].name)
                        continue;

                    this._temp_q0.fromMatrix(this.joints[j].jointMatrix);

                    target[i * 8 + 0] = this._temp_q0.x;
                    target[i * 8 + 1] = this._temp_q0.y;
                    target[i * 8 + 2] = this._temp_q0.z;
                    target[i * 8 + 3] = this._temp_q0.w;

                    target[i * 8 + 4] = this.joints[j].jointMatrix.rawData[12];
                    target[i * 8 + 5] = this.joints[j].jointMatrix.rawData[13];
                    target[i * 8 + 6] = this.joints[j].jointMatrix.rawData[14];
                    target[i * 8 + 7] = 1;

                    break;
                }

            }

            return target;
        }

        /**
        * @language zh_CN
        * 更新骨架矩阵
        */
        public updateSkeletonMatrix(): void {

            if (this.skeletonMatrixValid) {
                return;
            }

            this.toMatrixData(this._skeletonMatrix);

            this.skeletonMatrixValid = true;
        }

        /**
        * @language zh_CN
        * 计算骨骼世界矩阵
        * @param initialSkeleton 初始骨架对象
        */
        public calculateJointWorldMatrix(initialSkeleton: Skeleton): void {

            for (var i: number = 0; i < this.joints.length; i++) {

                var jointPose: Joint = this.joints[i];

                this.calculateAbsoluteMatrix(this.joints, i, initialSkeleton);
            }

            for (var i: number = 0; i < this.joints.length; i++) {

                var jointPose: Joint = this.joints[i];

                if (!jointPose.jointMatrixValid) {
                    jointPose.jointMatrix = new Matrix4_4();
                    if (initialSkeleton.joints[i].inverseBindPose) {
                        jointPose.jointMatrix.copyFrom(initialSkeleton.joints[i].inverseBindPose);
                        jointPose.jointMatrix.append(jointPose.worldMatrix);
                    }
                    jointPose.jointMatrixValid = true;
                }
            }

            this.skeletonMatrixValid = false;
        }

        private calculateAbsoluteMatrix(currentSkeletonPose: Array<Joint>, jointIndex: number, initialSkeleton: Skeleton): void {

            var currentJointPose: Joint = currentSkeletonPose[jointIndex];

            var currentJointParentIndex: number = initialSkeleton.joints[jointIndex].parentIndex;

            if (currentJointParentIndex >= 0) {
                this.calculateAbsoluteMatrix(currentSkeletonPose, currentJointParentIndex, initialSkeleton);
            }

            if (!currentJointPose.worldMatrixValid) {

                currentJointPose.worldMatrix.copyFrom(currentJointPose.localMatrix);

                if (currentJointParentIndex >= 0) {
                    currentJointPose.worldMatrix.append(currentSkeletonPose[currentJointParentIndex].worldMatrix);
                }

                currentJointPose.worldMatrixValid = true;
            }
        }

    }
}