module BlackSwan {
    export class Box {
        public min: Vector3D = new Vector3D();
        public max: Vector3D = new Vector3D();

        public vexData: Array<number> = new Array<number>();
        public indexData: Array<number> = new Array<number>();

        public width: number = 0;
        public heigth: number = 0;
        public depth: number = 0;
        public volume: number = 0;

        public center: Vector3D = new Vector3D();
        public radius: number = 0;

        constructor(min:Vector3D = new Vector3D(), max:Vector3D = new Vector3D()) {
            this.min.copyFrom(min);
            this.max.copyFrom(max);
            this.computeData();
        }

        public copyFrom(box: Box) {
            this.min.copyFrom(box.min);
            this.max.copyFrom(box.max);
            this.computeData();
        }

        public fillBox(min: Vector3D, max: Vector3D) {
            this.min.copyFrom(min);
            this.max.copyFrom(max);
            this.computeData();
        }

        public inBox(pos: Vector3D): boolean {
            if (pos.x <= this.max.x && pos.x >= this.min.x &&
                pos.y <= this.max.y && pos.y >= this.min.y &&
                pos.z <= this.max.z && pos.z >= this.min.z) {
                return true;
            }
            return false;
        }

        public intersectAABBs(box2: Box, boxIntersect: Box): boolean {
            if (this.min.x > box2.max.x) {
                return false;
            }

            if (this.max.x < box2.min.x) {
                return false;
            }

            if (this.min.y > box2.max.y) {
                return false;
            }

            if (this.max.y < box2.min.y) {
                return false;
            }

            if (this.min.z > box2.max.z) {
                return false;
            }

            if (this.max.z < box2.min.z) {
                return false;
            }

            boxIntersect.min.x = Math.max(this.min.x, box2.min.x);
            boxIntersect.max.x = Math.min(this.max.x, box2.max.x);
            boxIntersect.min.y = Math.max(this.min.y, box2.min.y);
            boxIntersect.max.y = Math.min(this.max.y, box2.max.y);
            boxIntersect.min.z = Math.max(this.min.z, box2.min.z);
            boxIntersect.max.z = Math.min(this.max.z, box2.max.z);
            return true;
        }

        public Transform(mat: Matrix4_4): Box {
            var box: Box = new Box();
            box.fillBox(mat.transformVector(this.min), mat.transformVector(this.max));
            return box;
        }
        
        public toString(): string {
            return "Box [min:(" + this.min.x + ", " + this.min.y + ", " + this.min.z + ") max:(" + this.max.x + ", " + this.max.y + ", " + this.max.z + ")]";
        }

        private computeData() {
            this.vexData.length = 0;
            this.indexData.length = 0;

            var sub: Vector3D = this.max.subtract(this.min);

            this.vexData.push(this.min.x);
            this.vexData.push(this.min.y);
            this.vexData.push(this.min.z);

            this.vexData.push(this.min.x);
            this.vexData.push(this.min.y);
            this.vexData.push(this.min.z + sub.z);

            this.vexData.push(this.min.x + sub.x);
            this.vexData.push(this.min.y);
            this.vexData.push(this.min.z + sub.z);

            this.vexData.push(this.min.x + sub.x);
            this.vexData.push(this.min.y);
            this.vexData.push(this.min.z);

            this.vexData.push(this.max.x - sub.x);
            this.vexData.push(this.max.y);
            this.vexData.push(this.max.z - sub.z);


            this.vexData.push(this.max.x - sub.x);
            this.vexData.push(this.max.y);
            this.vexData.push(this.max.z);

            this.vexData.push(this.max.x);
            this.vexData.push(this.max.y);
            this.vexData.push(this.max.z);

            this.vexData.push(this.max.x);
            this.vexData.push(this.max.y);
            this.vexData.push(this.max.z - sub.z);

            this.indexData.push(
                0, 4, 7, 0, 7, 3,
                2, 6, 5, 2, 5, 1,
                4, 5, 6, 4, 6, 7,
                0, 1, 5, 0, 5, 4,
                3, 7, 6, 3, 6, 2
                );

            this.width = this.max.x - this.min.x;
            this.heigth = this.max.y - this.min.y;
            this.depth = this.max.z - this.min.z;
            this.volume = this.width * this.heigth * this.depth;

            var c: Vector3D = this.max.subtract(this.min);
            c.scaleBy(0.5);

            this.radius = c.length;
            this.center.copyFrom(this.min);
            var tmp: Vector3D = this.center.add(c);
            this.center.copyFrom(tmp);
        }
    }
}