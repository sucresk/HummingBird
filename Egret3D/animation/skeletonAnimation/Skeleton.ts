module BlackSwan{
    export class Skeleton{

        public joints: Array<Joint>;

        constructor() {
            this.joints = new Array<Joint>();
        }

        public get numJoints():number {
            return this.joints.length;
        }

        public jointFromName(name:string):Joint {
            var index:number = this.jointIndexFromName(name);
            if(index != -1) {
                return this.joints[index];
            }
            return null;
        }

        public jointIndexFromName(name:string):number{
            for(var i:number = 0; i < this.joints.length; i++) {
                if(this.joints[i].name  == name) {
                    return i;
                }
            }
            return -1;
        }
    }
}