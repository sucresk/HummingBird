module Egret3D {

    /**
     * @language zh_CN
     * @class Egret3D.EAMParser
     * @classdesc
     * 用 EAMParser 类 解析.eam 文件
     */
    export class EAMParser {

       /**
        * @language zh_CN
        * @param datas 加载的二进制流
        * @returns SkeletonAnimationClip
        */
        public static parse(datas: ArrayBuffer): SkeletonAnimationClip {

            var bytes: ByteArray = new ByteArray(datas);

            var boneCount: number = bytes.readUnsignedByte();

            var animationName: string = bytes.readUTF();

            var sampling:number = bytes.readUnsignedByte();

            if (boneCount <= 0)
                return new SkeletonAnimationClip(animationName);

            var boneNameArray: Array<string> = new Array<string>();
            var parentBoneNameArray: Array<string> = new Array<string>();

            for (var i: number = 0; i < boneCount; i++) {
                boneNameArray.push(bytes.readUTF());
                parentBoneNameArray.push(bytes.readUTF());
            }

            var frameCount: number = bytes.readInt();

            var poseArray: Array<Skeleton> = new Array<Skeleton>();

            var nCount: number = bytes.readInt();

            for (var i: number = 0; i < nCount; i++) {

                var skeletonPose: Skeleton = new Skeleton();

                skeletonPose.frameTime = bytes.readInt();

                for (var j: number = 0; j < boneCount; j++) {

                    var jointPose: Joint = new Joint( boneNameArray[j] );

                    jointPose.parent = parentBoneNameArray[j];

                    jointPose.setLocalTransform(
                        new Quaternion().fromEulerAngles(bytes.readFloat() * Matrix3DUtils.RADIANS_TO_DEGREES, bytes.readFloat() * Matrix3DUtils.RADIANS_TO_DEGREES, bytes.readFloat() * Matrix3DUtils.RADIANS_TO_DEGREES),
                        new Vector3D(bytes.readFloat(), bytes.readFloat(), bytes.readFloat()),
                        new Vector3D(bytes.readFloat(), bytes.readFloat(), bytes.readFloat())
                    );

                    skeletonPose.joints.push(jointPose);
                }

                if (i > 0) {
                    var pose: Skeleton = new Skeleton();

                    pose.frameTime = skeletonPose.frameTime - 160 / 2;

                    var currentSkeletonPose: Skeleton = poseArray[poseArray.length - 1];
                
                    for (var j: number = 0; j < boneCount; j++) {

                        var jointPose: Joint = new Joint( currentSkeletonPose.joints[j].name );

                        jointPose.parent = currentSkeletonPose.joints[j].parent;

                        jointPose.orientation = new Quaternion();
                        jointPose.orientation.lerp(currentSkeletonPose.joints[j].orientation, skeletonPose.joints[j].orientation, 0.5);

                        jointPose.scale = new Vector3D();
                        jointPose.scale.lerp(currentSkeletonPose.joints[j].scale, skeletonPose.joints[j].scale, 0.5);

                        jointPose.translation = new Vector3D();
                        jointPose.translation.lerp(currentSkeletonPose.joints[j].translation, skeletonPose.joints[j].translation, 0.5);

                        jointPose.setLocalTransform(jointPose.orientation, jointPose.scale, jointPose.translation);

                        pose.joints.push(jointPose);
                    }
                
                    poseArray.push(pose);
                }

                poseArray.push(skeletonPose);
            }

            var skeletonAnimationClip: SkeletonAnimationClip = new SkeletonAnimationClip(animationName);
            skeletonAnimationClip.sampling = sampling;
            skeletonAnimationClip.frameCount = frameCount * 2;
            skeletonAnimationClip.poseArray = poseArray;
            return skeletonAnimationClip;
        }
    }
}