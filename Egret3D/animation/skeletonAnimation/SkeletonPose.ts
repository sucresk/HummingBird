module BlackSwan {
    export class SkeletonPose{

        public jointPoses: Array<JointPose>;
        public skeletonMatrix: Float32Array;
        public skeletonMatrixValid: boolean = false;
        public frameTime: number = 0;

        private _temp_q0: Quaternion = new Quaternion();
        private _temp_q1: Quaternion = new Quaternion();
        private _temp_q2: Quaternion = new Quaternion();
        private _temp_v0: Vector3D = new Vector3D();
        private _temp_v1: Vector3D = new Vector3D();
        private _temp_v2: Vector3D = new Vector3D();

        constructor() {
            this.jointPoses = new Array<JointPose>();
        }

        public get numJointPoses():number{
            return this.jointPoses.length;
        }

        public findJointPose(name: string): JointPose {

            for (var i: number = 0; i < this.jointPoses.length; i++) {
                if (this.jointPoses[i].name == name)
                    return this.jointPoses[i];
            }

            return null;
        }

        public jointPoseFromName(name:string):JointPose {
            var index:number = this.jointPoseIndexFromName(name);
            if(index != -1 ) {
                return this.jointPoses[index];
            }
            return null;
        }

        public jointPoseIndexFromName(name:string):number {
            var index:number;
            for(var i:number = 0; i < this.jointPoses.length; i++) {
                if(this.jointPoses[i].name == name) {
                    return index;
                }
            }

            return -1;
        }

        public calculateJointWorldMatrix(initialSkeleton:Skeleton): void {

            for (var i: number = 0; i < this.jointPoses.length; i++) {

                var jointPose: JointPose = this.jointPoses[i];

                this.calculateAbsoluteMatrix(this.jointPoses, i, initialSkeleton);
            }

            for (var i: number = 0; i < this.jointPoses.length; i++) {

                var jointPose: JointPose = this.jointPoses[i];

                if (!jointPose.jointMatrixValid) {
                    jointPose.jointMatrix = new Matrix4_4();
                    jointPose.jointMatrix.copyFrom(initialSkeleton.joints[i].inverseBindPose);
                    jointPose.jointMatrix.append(jointPose.worldMatrix);
                    jointPose.jointMatrixValid = true;
                }
            }

            this.skeletonMatrixValid = false;
        }

        public calculateAbsoluteMatrix(currentSkeletonPose: Array<JointPose>, jointIndex: number, initialSkeleton: Skeleton): void {

            var currentJointPose: JointPose = currentSkeletonPose[jointIndex];

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

        public skeletonLerp(skeleton0: SkeletonPose, skeleton1: SkeletonPose, tNow: number): void {

            this.frameTime = tNow;

            var t: number = (tNow - skeleton0.frameTime) / Math.abs(skeleton1.frameTime - skeleton0.frameTime);

            for (var index: number = 0; index < skeleton0.jointPoses.length; index++) {

                if (index >= this.jointPoses.length) {
                    this.jointPoses.push(new JointPose());
                }

                var newJointPose: JointPose = this.jointPoses[index];

                newJointPose.name = skeleton0.jointPoses[index].name;

                newJointPose.worldMatrixValid = true;

                this._temp_q0.fromMatrix(skeleton0.jointPoses[index].worldMatrix);
                this._temp_q1.fromMatrix(skeleton1.jointPoses[index].worldMatrix);
                this._temp_q2.lerp(this._temp_q0, this._temp_q1, t);

                skeleton0.jointPoses[index].worldMatrix.copyColumnTo(3, this._temp_v0);
                skeleton1.jointPoses[index].worldMatrix.copyColumnTo(3, this._temp_v1);
                this._temp_v2.lerp(this._temp_v0, this._temp_v1, t);

                this._temp_q2.toMatrix3D(newJointPose.worldMatrix);
                newJointPose.worldMatrix.rawData[12] = this._temp_v2.x;
                newJointPose.worldMatrix.rawData[13] = this._temp_v2.y;
                newJointPose.worldMatrix.rawData[14] = this._temp_v2.z;
                newJointPose.jointMatrixValid = false;
                this.skeletonMatrixValid = false;
            }
        }

        public toMatrixData(target: Float32Array = null): Float32Array {

            if (!target) {
                target = new Float32Array( this.jointPoses.length * 8 );
            }

            for (var i: number = 0; i < this.jointPoses.length; i++) {

                this._temp_q0.fromMatrix(this.jointPoses[i].jointMatrix);

                target[i * 8 + 0] = this._temp_q0.x;
                target[i * 8 + 1] = this._temp_q0.y;
                target[i * 8 + 2] = this._temp_q0.z;
                target[i * 8 + 3] = this._temp_q0.w;

                target[i * 8 + 4] = this.jointPoses[i].jointMatrix.rawData[12];
                target[i * 8 + 5] = this.jointPoses[i].jointMatrix.rawData[13];
                target[i * 8 + 6] = this.jointPoses[i].jointMatrix.rawData[14];
                target[i * 8 + 7] = 1;
            }

            return target;
        }


    }
}