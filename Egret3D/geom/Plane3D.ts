module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.Plane3D
     * @classdesc
     * Plane3D 类
     */
    export class Plane3D {
        /**
         * @language en_US
	     * The A coefficient of this plane. (Also the x dimension of the plane normal)
	     */
        public a: number;

        /**
         * @language en_US
         * The B coefficient of this plane. (Also the y dimension of the plane normal)
         */
        public b: number;

        /**
         * @language en_US
         * The C coefficient of this plane. (Also the z dimension of the plane normal)
         */
        public c: number;

        /**
         * @language en_US
         * The D coefficient of this plane. (Also the inverse dot product between normal and point)
         */
        public d: number;

        // indicates the alignment of the plane
        public static ALIGN_ANY: number = 0;
        public static ALIGN_XY_AXIS: number = 1;
        public static ALIGN_YZ_AXIS: number = 2;
        public static ALIGN_XZ_AXIS: number = 3;

        /**
         * @language en_US
         * Create a Plane3D with ABCD coefficients
         */
        constructor(a: number = 0, b: number = 0, c: number = 0, d: number = 0) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
        }

        /**
         * @language en_US
         */
        public setTo(a: number = 0, b: number = 0, c: number = 0, d: number = 0) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
        }

        /**
         * @language en_US
         * Fills this Plane3D with the coefficients from 3 points in 3d space.
         * @param p0 Vector3D
         * @param p1 Vector3D
         * @param p2 Vector3D
         */
        public fromPoints(p0: Vector3D, p1: Vector3D, p2: Vector3D) {
            var d1x: number = p1.x - p0.x;
            var d1y: number = p1.y - p0.y;
            var d1z: number = p1.z - p0.z;

            var d2x: number = p2.x - p0.x;
            var d2y: number = p2.y - p0.y;
            var d2z: number = p2.z - p0.z;

            this.a = d1y * d2z - d1z * d2y;
            this.b = d1z * d2x - d1x * d2z;
            this.c = d1x * d2y - d1y * d2x;
            this.d = -(this.a * p0.x + this.b * p0.y + this.c * p0.z);
        }

        /**
         * @language en_US
         * Fills this Plane3D with the coefficients from the plane's normal and a point in 3d space.
         * @param normal Vector3D
         * @param point  Vector3D
         */
        public fromNormalAndPoint(normal: Vector3D, point: Vector3D) {
            this.a = normal.x;
            this.b = normal.y;
            this.c = normal.z;
            this.d = -(this.a * point.x + this.b * point.y + this.c * point.z);
        }

        /**
         * @language en_US
         * Normalize this Plane3D
         * @returns Plane3D This Plane3D.
         */
        public normalize(): number {
            var len: number = Math.sqrt(this.a * this.a + this.b * this.b + this.c * this.c);
            if (len > 0.0) {
                var invLength: number = 1.0 / len;
                this.a *= invLength;
                this.b *= invLength;
                this.c *= invLength;
                this.d *= invLength;
            }
            
            return len;
        }

        /**
         * @language en_US
         * Returns the signed distance between this Plane3D and the point p.
         * @param p Vector3D
         * @returns Number
         */
        public distance(p: Vector3D): number {
            return this.a * p.x + this.b * p.y + this.c * p.z + this.d;
        }

        /**
         * @language en_US
         * Classify a point against this Plane3D. (in front, back or intersecting)
         * @param p Vector3D
         * @returns int Plane3.FRONT or Plane3D.BACK or Plane3D.INTERSECT
         */
        public classifyPoint(p: Vector3D, epsilon: number = 0.01): number {

            var dis: number = this.distance(p);

            if (dis < -epsilon) {
                return PlaneClassification.BACK;
            }
            else if (dis > epsilon) {
                return PlaneClassification.FRONT;
            }

            return PlaneClassification.INTERSECT;
        }
        
        /**
         * @language en_US
         * @returns string
         */
        public toString(): string {
            return "Plane3D [a:" + this.a + ", b:" + this.b + ", c:" + this.c + ", d:" + this.d + "]";
        }
    }
} 