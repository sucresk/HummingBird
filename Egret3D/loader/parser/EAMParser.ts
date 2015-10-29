module Egret3D {

    export class EAMParser {

        public static parse(datas: ArrayBuffer): AnimationState {

            var bytes: ByteArray = new ByteArray(datas);

            var boneCount: number = bytes.readUnsignedByte();

            var animationName: string = bytes.readUTF();

            var sampling:number = bytes.readUnsignedByte();

            if (boneCount <= 0)
                return new AnimationState(animationName, null, 0, frameCount);

            var boneNameArray: Array<string> = new Array<string>();
            var parentBoneNameArray: Array<string> = new Array<string>();

            for (var i: number = 0; i < boneCount; i++) {
                boneNameArray.push(bytes.readUTF());
                parentBoneNameArray.push(bytes.readUTF());
            }

            var frameCount: number = bytes.readInt();

            var poseArray: Array < SkeletonPose > = new Array<SkeletonPose>();

            var nCount: number = bytes.readInt();

            for (var i: number = 0; i < nCount; i++) {

                var skeletonPose: SkeletonPose = new SkeletonPose();

                skeletonPose.frameTime = bytes.readInt();

                for (var j: number = 0; j < boneCount; j++) {

                    var jointPose: JointPose = new JointPose();

                    jointPose.name = boneNameArray[j];
                    jointPose.parent = parentBoneNameArray[j];

                    jointPose.orientation = new Quaternion();
                    jointPose.orientation.fromEulerAngles(bytes.readFloat(), bytes.readFloat(), bytes.readFloat());

                    jointPose.scale = new Vector3D(bytes.readFloat(), bytes.readFloat(), bytes.readFloat());

                    jointPose.translation = new Vector3D(bytes.readFloat(), bytes.readFloat(), bytes.readFloat());

                    jointPose.localMatrix = new Matrix4_4();
                    jointPose.localMatrix.makeTransform(jointPose.translation, jointPose.scale, jointPose.orientation);
                    skeletonPose.jointPoses.push(jointPose);
                }

                //30帧转60帧;
                if (i > 0) {
                    var pose: SkeletonPose = new SkeletonPose();

                    pose.frameTime = skeletonPose.frameTime - 160 / 2;

                    var currentSkeletonPose: SkeletonPose = poseArray[poseArray.length - 1];
                
                    for (var j: number = 0; j < boneCount; j++) {

                        var jointPose: JointPose = new JointPose();

                        jointPose.name = currentSkeletonPose.jointPoses[j].name;
                        jointPose.parent = currentSkeletonPose.jointPoses[j].parent;

                        jointPose.orientation = new Quaternion();
                        jointPose.orientation.lerp(currentSkeletonPose.jointPoses[j].orientation, skeletonPose.jointPoses[j].orientation, 0.5);

                        jointPose.scale = new Vector3D();
                        jointPose.scale.lerp(currentSkeletonPose.jointPoses[j].scale, skeletonPose.jointPoses[j].scale, 0.5);

                        jointPose.translation = new Vector3D();
                        jointPose.translation.lerp(currentSkeletonPose.jointPoses[j].translation, skeletonPose.jointPoses[j].translation, 0.5);

                        jointPose.localMatrix = new Matrix4_4();
                        jointPose.localMatrix.makeTransform(jointPose.translation, jointPose.scale, jointPose.orientation);
                        pose.jointPoses.push(jointPose);
                    }
                
                    poseArray.push(pose);
                }

                poseArray.push(skeletonPose);
            }

            var animationState: AnimationState = new AnimationState(animationName, 0, poseArray[poseArray.length - 1].frameTime);
            animationState.sampling = sampling;
            animationState.frameCount = frameCount * 2;
            animationState.poseArray = poseArray;
            return animationState;
        }
    }
}