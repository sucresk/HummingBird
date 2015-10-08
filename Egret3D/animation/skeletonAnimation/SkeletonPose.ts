module BlackSwan {
    export class SkeletonPose{

        public jointPoses:Array<JointPose>;

        constructor() {
            this.jointPoses = new Array<JointPose>();
        }

        public get numJointPoses():number{
            return this.jointPoses.length;
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
    }
}