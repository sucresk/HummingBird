module BlackSwan {
    export class Matrix4_4 {

        public rawData: Float32Array;

        /**
            * Creat a Matrix4_4 object.
            */
        constructor(datas: Float32Array = null) {
            if (datas)
            {
                this.rawData = datas;
            }
            else
                this.rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }

        public lookAt(eye: Vector3D, at: Vector3D, up: Vector3D) {
            var zaxis: Vector3D = at.subtract(eye);
            zaxis.normalize();
            var xaxis: Vector3D = up.crossProduct(zaxis);
            xaxis.normalize();
            var yaxis = zaxis.crossProduct(xaxis);

            this.rawData[0] = xaxis.x;
            this.rawData[1] = yaxis.x;
            this.rawData[2] = zaxis.x;
            this.rawData[3] = 0;

            this.rawData[4] = xaxis.y;
            this.rawData[5] = yaxis.y;
            this.rawData[6] = zaxis.y;
            this.rawData[7] = 0;

            this.rawData[8] = xaxis.z;
            this.rawData[9] = yaxis.z;
            this.rawData[10] = zaxis.z;
            this.rawData[11] = 0;

            this.rawData[12] = -xaxis.dotProduct(eye);
            this.rawData[13] = -yaxis.dotProduct(eye);
            this.rawData[14] = -zaxis.dotProduct(eye);

            this.rawData[15] = 1;
        }

        public perspective(fovy: number, aspect: number, zn: number, zf: number) {
            var angle: number = fovy * (Math.PI / 180.0);
            var yScale: number = Math.tan((Math.PI  - angle) / 2.0);
            var xScale: number = yScale / aspect;

            this.rawData[0] = xScale;
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;

            this.rawData[4] = 0;
            this.rawData[5] = yScale;
            this.rawData[6] = 0;
            this.rawData[7] = 0;

            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[10] = zf / (zf - zn);
            this.rawData[11] = 1;

            this.rawData[12] = 0;
            this.rawData[13] = 0;
            this.rawData[14] = -zn * zf / (zf - zn);
            this.rawData[15] = 0;
        }

        public ortho(w: number, h: number, zn: number, zf: number) {
            this.rawData[0] = 2 / w;
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;

            this.rawData[4] = 0;
            this.rawData[5] = 2 / h;
            this.rawData[6] = 0;
            this.rawData[7] = 0;

            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[10] = 1 / (zf - zn);
            this.rawData[11] = 0;

            this.rawData[12] = 0;
            this.rawData[13] = 0;
            this.rawData[14] = zn / (zn - zf);
            this.rawData[15] = 1;
        }

        public orthoOffCenter(l: number, r: number, b: number, t: number, zn: number, zf: number) {
            this.rawData[0] = 2 / (r - 1);
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;

            this.rawData[4] = 0;
            this.rawData[5] = 2 / (t - b);
            this.rawData[6] = 0;
            this.rawData[7] = 0;

            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[10] = 1 / (zf - zn);
            this.rawData[11] = 0;

            this.rawData[12] = (1 + r) / (1 - r);
            this.rawData[13] = (t + b) / (b - t);
            this.rawData[14] = zn / (zn - zf);
            this.rawData[15] = 1;
        }

        public append(lhs: Matrix4_4) {
            var m111: number = this.rawData[0], m121: number = this.rawData[4], m131: number = this.rawData[8], m141: number = this.rawData[12], m112: number = this.rawData[1], m122: number = this.rawData[5], m132: number = this.rawData[9], m142: number = this.rawData[13], m113: number = this.rawData[2], m123: number = this.rawData[6], m133: number = this.rawData[10], m143: number = this.rawData[14], m114: number = this.rawData[3], m124: number = this.rawData[7], m134: number = this.rawData[11], m144: number = this.rawData[15], m211: number = lhs.rawData[0], m221: number = lhs.rawData[4], m231: number = lhs.rawData[8], m241: number = lhs.rawData[12], m212: number = lhs.rawData[1], m222: number = lhs.rawData[5], m232: number = lhs.rawData[9], m242: number = lhs.rawData[13], m213: number = lhs.rawData[2], m223: number = lhs.rawData[6], m233: number = lhs.rawData[10], m243: number = lhs.rawData[14], m214: number = lhs.rawData[3], m224: number = lhs.rawData[7], m234: number = lhs.rawData[11], m244: number = lhs.rawData[15];

            this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
            this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
            this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
            this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

            this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
            this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
            this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
            this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

            this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
            this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
            this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
            this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

            this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
            this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
            this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
            this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
        }

        public add(lhs: Matrix4_4): Matrix4_4 {
            var m111: number = this.rawData[0], m121: number = this.rawData[4], m131: number = this.rawData[8], m141: number = this.rawData[12], m112: number = this.rawData[1], m122: number = this.rawData[5], m132: number = this.rawData[9], m142: number = this.rawData[13], m113: number = this.rawData[2], m123: number = this.rawData[6], m133: number = this.rawData[10], m143: number = this.rawData[14], m114: number = this.rawData[3], m124: number = this.rawData[7], m134: number = this.rawData[11], m144: number = this.rawData[15], m211: number = lhs.rawData[0], m221: number = lhs.rawData[4], m231: number = lhs.rawData[8], m241: number = lhs.rawData[12], m212: number = lhs.rawData[1], m222: number = lhs.rawData[5], m232: number = lhs.rawData[9], m242: number = lhs.rawData[13], m213: number = lhs.rawData[2], m223: number = lhs.rawData[6], m233: number = lhs.rawData[10], m243: number = lhs.rawData[14], m214: number = lhs.rawData[3], m224: number = lhs.rawData[7], m234: number = lhs.rawData[11], m244: number = lhs.rawData[15];

            this.rawData[0] = m111 + m211;
            this.rawData[1] = m112 + m212;
            this.rawData[2] = m113 + m213;
            this.rawData[3] = m114 + m214;

            this.rawData[4] = m121 + m221;
            this.rawData[5] = m122 + m222;
            this.rawData[6] = m123 + m223;
            this.rawData[7] = m124 + m224;

            this.rawData[8] =  m131 + m231;
            this.rawData[9] =  m132 + m232;
            this.rawData[10] = m133 + m233;
            this.rawData[11] = m134 + m234;

            this.rawData[12] = m141 + m241;
            this.rawData[13] = m142 + m242;
            this.rawData[14] = m143 + m243;
            this.rawData[15] = m144 + m244;
            return this;
        }

        public sub(lhs: Matrix4_4): Matrix4_4 {
            var m111: number = this.rawData[0], m121: number = this.rawData[4], m131: number = this.rawData[8], m141: number = this.rawData[12], m112: number = this.rawData[1], m122: number = this.rawData[5], m132: number = this.rawData[9], m142: number = this.rawData[13], m113: number = this.rawData[2], m123: number = this.rawData[6], m133: number = this.rawData[10], m143: number = this.rawData[14], m114: number = this.rawData[3], m124: number = this.rawData[7], m134: number = this.rawData[11], m144: number = this.rawData[15], m211: number = lhs.rawData[0], m221: number = lhs.rawData[4], m231: number = lhs.rawData[8], m241: number = lhs.rawData[12], m212: number = lhs.rawData[1], m222: number = lhs.rawData[5], m232: number = lhs.rawData[9], m242: number = lhs.rawData[13], m213: number = lhs.rawData[2], m223: number = lhs.rawData[6], m233: number = lhs.rawData[10], m243: number = lhs.rawData[14], m214: number = lhs.rawData[3], m224: number = lhs.rawData[7], m234: number = lhs.rawData[11], m244: number = lhs.rawData[15];

            this.rawData[0] = m111 - m211;
            this.rawData[1] = m112 - m212;
            this.rawData[2] = m113 - m213;
            this.rawData[3] = m114 - m214;

            this.rawData[4] = m121 - m221;
            this.rawData[5] = m122 - m222;
            this.rawData[6] = m123 - m223;
            this.rawData[7] = m124 - m224;

            this.rawData[8] = m131 - m231;
            this.rawData[9] = m132 - m232;
            this.rawData[10] = m133 - m233;
            this.rawData[11] = m134 - m234;

            this.rawData[12] = m141 - m241;
            this.rawData[13] = m142 - m242;
            this.rawData[14] = m143 - m243;
            this.rawData[15] = m144 - m244;
            return this;
        }

        public mult(v:number): Matrix4_4 {
            this.rawData[0] *= v;
            this.rawData[1] *= v;
            this.rawData[2] *= v;
            this.rawData[3] *= v;

            this.rawData[4] *= v;
            this.rawData[5] *= v;
            this.rawData[6] *= v;
            this.rawData[7] *= v;

            this.rawData[8] *= v;
            this.rawData[9] *= v;
            this.rawData[10] *= v;
            this.rawData[11] *= v;

            this.rawData[12] *= v;
            this.rawData[13] *= v;
            this.rawData[14] *= v;
            this.rawData[15] *= v;
            return this;
        }
        
        public rotation(x: number, y: number, z: number) {
            this.appendRotation(x, Vector3D.X_AXIS);
            this.appendRotation(y, Vector3D.Y_AXIS);
            this.appendRotation(z, Vector3D.Z_AXIS);
        }

        public appendRotation(degrees: number, axis: Vector3D): void //, pivot:Vector3D = null )
        {
            var m: Matrix4_4 = Matrix4_4.getAxisRotation(axis.x, axis.y, axis.z, degrees);
            //this.append(m);

            var tmp: Matrix4_4 = new Matrix4_4();
            var s: number, c: number;

            var angle: number = degrees * Matrix3DUtils.DEGREES_TO_RADIANS;
            s = Math.sin(angle);
            c = Math.cos(angle);

            if (axis.x == 1) {
                tmp.rawData[0] = 1.0; tmp.rawData[1] = 0.0; tmp.rawData[2] = 0.0; tmp.rawData[3] = 0.0;
                tmp.rawData[4] = 0.0; tmp.rawData[5] = c; tmp.rawData[6] = s; tmp.rawData[7] = 0.0;
                tmp.rawData[8] = 0.0; tmp.rawData[9] = -s; tmp.rawData[10] = c; tmp.rawData[7] = 0.0;
                tmp.rawData[12] = 0.0; tmp.rawData[13] = 0.0; tmp.rawData[14] = 0.0; tmp.rawData[15] = 1.0;
            }

            if (axis.y == 1) {
                tmp.rawData[0] = c; tmp.rawData[1] = 0.0; tmp.rawData[2] = -s; tmp.rawData[3] = 0.0;
                tmp.rawData[4] = 0.0; tmp.rawData[5] = 1.0; tmp.rawData[6] = 0.0; tmp.rawData[7] = 0.0;
                tmp.rawData[8] = s; tmp.rawData[9] = 0.0; tmp.rawData[10] = c; tmp.rawData[11] = 0.0;
                tmp.rawData[12] = 0.0; tmp.rawData[13] = 0.0; tmp.rawData[14] = 0.0; tmp.rawData[15] = 1.0;
            }

            if (axis.z == 1) {
                tmp.rawData[0] = c; tmp.rawData[1] = s; tmp.rawData[2] = 0.0; tmp.rawData[3] = 0.0;
                tmp.rawData[4] = -s; tmp.rawData[5] = c; tmp.rawData[6] = 0.0; tmp.rawData[7] = 0.0;
                tmp.rawData[8] = 0.0; tmp.rawData[9] = 0.0; tmp.rawData[10] = 1.0; tmp.rawData[11] = 0.0;
                tmp.rawData[12] = 0.0; tmp.rawData[13] = 0.0; tmp.rawData[14] = 0.0; tmp.rawData[15] = 1.0;
            }

            this.append(tmp);
        }

        public appendScale(xScale: number, yScale: number, zScale: number) {
            //this.append(new Matrix4_4(new Float32Array([xScale, 0.0, 0.0, 0.0, 0.0, yScale, 0.0, 0.0, 0.0, 0.0, zScale, 0.0, 0.0, 0.0, 0.0, 1.0])));
            this.rawData[0] = xScale; this.rawData[1] = 0.0; this.rawData[2] = 0.0;
            this.rawData[4] = 0.0; this.rawData[5] = yScale; this.rawData[6] = 0.0;
            this.rawData[8] = 0.0; this.rawData[9] = 0.0; this.rawData[10] = zScale;
        }

        public appendTranslation(x: number, y: number, z: number) {
            this.rawData[12] += x;
            this.rawData[13] += y;
            this.rawData[14] += z;
        }

        public clone(): Matrix4_4 {
            //return new Matrix4_4(this.rawData.slice(0));
            var ret: Matrix4_4 = new Matrix4_4();

            ret.copyFrom(this);

            return ret;
        }

        public copyColumnFrom(column: number, vector3D: Vector3D) {
            switch (column) {
                case 0:
                    this.rawData[0] = vector3D.x;
                    this.rawData[1] = vector3D.y;
                    this.rawData[2] = vector3D.z;
                    this.rawData[3] = vector3D.w;
                    break;
                case 1:
                    this.rawData[4] = vector3D.x;
                    this.rawData[5] = vector3D.y;
                    this.rawData[6] = vector3D.z;
                    this.rawData[7] = vector3D.w;
                    break;
                case 2:
                    this.rawData[8] = vector3D.x;
                    this.rawData[9] = vector3D.y;
                    this.rawData[10] = vector3D.z;
                    this.rawData[11] = vector3D.w;
                    break;
                case 3:
                    this.rawData[12] = vector3D.x;
                    this.rawData[13] = vector3D.y;
                    this.rawData[14] = vector3D.z;
                    this.rawData[15] = vector3D.w;
                    break;
                default:
                    //throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
            }
        }

        public copyColumnTo(column: number, vector3D: Vector3D) {
            switch (column) {
                case 0:
                    vector3D.x = this.rawData[0];
                    vector3D.y = this.rawData[1];
                    vector3D.z = this.rawData[2];
                    vector3D.w = this.rawData[3];
                    break;
                case 1:
                    vector3D.x = this.rawData[4];
                    vector3D.y = this.rawData[5];
                    vector3D.z = this.rawData[6];
                    vector3D.w = this.rawData[7];
                    break;
                case 2:
                    vector3D.x = this.rawData[8];
                    vector3D.y = this.rawData[9];
                    vector3D.z = this.rawData[10];
                    vector3D.w = this.rawData[11];
                    break;
                case 3:
                    vector3D.x = this.rawData[12];
                    vector3D.y = this.rawData[13];
                    vector3D.z = this.rawData[14];
                    vector3D.w = this.rawData[15];
                    break;
                default:
                   // throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
            }
        }

        public copyFrom(sourceMatrix3D: Matrix4_4): Matrix4_4 {
            var len: number = sourceMatrix3D.rawData.length;
            for (var c: number = 0; c < len; c++)
                this.rawData[c] = sourceMatrix3D.rawData[c];
            return this;
        }

        public copyRawDataFrom(vector: Float32Array, index: number = 0, transpose: boolean = false): void {
            if (transpose)
                this.transpose();

            var len: number = vector.length - index;
            for (var c: number = 0; c < len; c++)
                this.rawData[c] = vector[c + index];

            if (transpose)
                this.transpose();
        }

        public copyRawDataTo(vector: Float32Array, index: number = 0, transpose: boolean = false) {
            if (transpose)
                this.transpose();

            var len: number = this.rawData.length
            for (var c: number = 0; c < len; c++)
                vector[c + index] = this.rawData[c];

            if (transpose)
                this.transpose();
        }

        public copyRowFrom(row: number, vector3D: Vector3D) {
            switch (row) {
                case 0:
                    this.rawData[0] = vector3D.x;
                    this.rawData[4] = vector3D.y;
                    this.rawData[8] = vector3D.z;
                    this.rawData[12] = vector3D.w;
                    break;
                case 1:
                    this.rawData[1] = vector3D.x;
                    this.rawData[5] = vector3D.y;
                    this.rawData[9] = vector3D.z;
                    this.rawData[13] = vector3D.w;
                    break;
                case 2:
                    this.rawData[2] = vector3D.x;
                    this.rawData[6] = vector3D.y;
                    this.rawData[10] = vector3D.z;
                    this.rawData[14] = vector3D.w;
                    break;
                case 3:
                    this.rawData[3] = vector3D.x;
                    this.rawData[7] = vector3D.y;
                    this.rawData[11] = vector3D.z;
                    this.rawData[15] = vector3D.w;
                    break;
                default:
                    new Error( "no more raw!" );
            }
        }

        public copyRowTo(row: number, vector3D: Vector3D) {
            switch (row) {
                case 0:
                    vector3D.x = this.rawData[0];
                    vector3D.y = this.rawData[4];
                    vector3D.z = this.rawData[8];
                    vector3D.w = this.rawData[12];
                    break;
                case 1:
                    vector3D.x = this.rawData[1];
                    vector3D.y = this.rawData[5];
                    vector3D.z = this.rawData[9];
                    vector3D.w = this.rawData[13];
                    break;
                case 2:
                    vector3D.x = this.rawData[2];

                    vector3D.y = this.rawData[6];
                    vector3D.z = this.rawData[10];
                    vector3D.w = this.rawData[14];
                    break;
                case 3:
                    vector3D.x = this.rawData[3];
                    vector3D.y = this.rawData[7];
                    vector3D.z = this.rawData[11];
                    vector3D.w = this.rawData[15]
                    break;
                default:
                    new Error("no more raw!");
            }
        }

        public copyToMatrix3D(dest: Matrix4_4) {
            dest.rawData = this.rawData.slice(0);
        }

        public decompose(orientationStyle: string = "eulerAngles"): Vector3D[] {
            var q: Quaternion;

            var vec: Vector3D[] = [];
            var m = this.clone();
            var mr = m.rawData;

            var pos: Vector3D = new Vector3D(mr[12], mr[13], mr[14]);
            mr[12] = 0;
            mr[13] = 0;
            mr[14] = 0;

            var scale: Vector3D = new Vector3D();

            scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
            scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
            scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);

            if (mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0)
                scale.z = -scale.z;

            mr[0] /= scale.x;
            mr[1] /= scale.x;
            mr[2] /= scale.x;
            mr[4] /= scale.y;
            mr[5] /= scale.y;
            mr[6] /= scale.y;
            mr[8] /= scale.z;
            mr[9] /= scale.z;
            mr[10] /= scale.z;

            var rot = new Vector3D();

            switch (orientationStyle) {
                case Orientation3D.AXIS_ANGLE:

                    rot.w = Math.acos((mr[0] + mr[5] + mr[10] - 1) / 2);

                    var len: number = Math.sqrt((mr[6] - mr[9]) * (mr[6] - mr[9]) + (mr[8] - mr[2]) * (mr[8] - mr[2]) + (mr[1] - mr[4]) * (mr[1] - mr[4]));
                    rot.x = (mr[6] - mr[9]) / len;
                    rot.y = (mr[8] - mr[2]) / len;
                    rot.z = (mr[1] - mr[4]) / len;

                    break;
                case Orientation3D.QUATERNION:

                    var tr = mr[0] + mr[5] + mr[10];

                    if (tr > 0) {
                        rot.w = Math.sqrt(1 + tr) / 2;

                        rot.x = (mr[6] - mr[9]) / (4 * rot.w);
                        rot.y = (mr[8] - mr[2]) / (4 * rot.w);
                        rot.z = (mr[1] - mr[4]) / (4 * rot.w);
                    } else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
                        rot.x = Math.sqrt(1 + mr[0] - mr[5] - mr[10]) / 2;

                        rot.w = (mr[6] - mr[9]) / (4 * rot.x);
                        rot.y = (mr[1] + mr[4]) / (4 * rot.x);
                        rot.z = (mr[8] + mr[2]) / (4 * rot.x);
                    } else if (mr[5] > mr[10]) {
                        rot.y = Math.sqrt(1 + mr[5] - mr[0] - mr[10]) / 2;

                        rot.x = (mr[1] + mr[4]) / (4 * rot.y);
                        rot.w = (mr[8] - mr[2]) / (4 * rot.y);
                        rot.z = (mr[6] + mr[9]) / (4 * rot.y);
                    } else {
                        rot.z = Math.sqrt(1 + mr[10] - mr[0] - mr[5]) / 2;

                        rot.x = (mr[8] + mr[2]) / (4 * rot.z);
                        rot.y = (mr[6] + mr[9]) / (4 * rot.z);
                        rot.w = (mr[1] - mr[4]) / (4 * rot.z);
                    }


                    break;
                case Orientation3D.EULER_ANGLES:

                    rot.y = Math.asin(-mr[2]);

                    if (mr[2] != 1 && mr[2] != -1) {
                        rot.x = Math.atan2(mr[6], mr[10]);
                        rot.z = Math.atan2(mr[1], mr[0]);
                    } else {
                        rot.z = 0;
                        rot.x = Math.atan2(mr[4], mr[5]);
                    }

                    break;
            }

            vec.push(pos);
            vec.push(rot);
            vec.push(scale);

            return vec;
        }

        public deltaTransformVector(v: Vector3D): Vector3D {
            var x: number = v.x;
            var y: number = v.y;
            var z: number = v.z;

            return new Vector3D((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10]), (x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11]));
        }

        public identity() {
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;
            this.rawData[4] = 0;
            this.rawData[6] = 0;
            this.rawData[7] = 0;
            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[11] = 0;
            this.rawData[12] = 0;
            this.rawData[13] = 0;
            this.rawData[14] = 0;

            this.rawData[0]     = 1;
            this.rawData[5]     = 1;
            this.rawData[10]    = 1;
            this.rawData[15]    = 1;

        }

        public fill( value:number ) {
            this.rawData[1] = value;
            this.rawData[2] = value;
            this.rawData[3] = value;
            this.rawData[4] = value;
            this.rawData[6] = value;
            this.rawData[7] = value;
            this.rawData[8] = value;
            this.rawData[9] = value;
            this.rawData[11] = value;
            this.rawData[12] = value;
            this.rawData[13] = value;
            this.rawData[14] = value;
            this.rawData[0] = value;
            this.rawData[5] = value;
            this.rawData[10] = value;
            this.rawData[15] = value;
        }

        static interpolate(thisMat: Matrix4_4, toMat: Matrix4_4, percent: number): Matrix4_4 {
            var m: Matrix4_4 = new Matrix4_4();
            for (var i: number = 0; i < 16; ++i)
                m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;

            return m;
        }

        public interpolateTo(toMat: Matrix4_4, percent: number) {
            for (var i: number = 0; i < 16; ++i)
                this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i]) * percent;
        }

        public invers33() {
            // Invert a 3x3 using cofactors.  This is about 8 times faster than
            // the Numerical Recipes code which uses Gaussian elimination.

           var rkInverse_00 = this.rawData[5] * this.rawData[10] - this.rawData[9] * this.rawData[6];
           var rkInverse_01 = this.rawData[8] * this.rawData[6] - this.rawData[4] * this.rawData[10];
           var rkInverse_02 = this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5];
           var rkInverse_10 = this.rawData[9] * this.rawData[2] - this.rawData[1] * this.rawData[10];
           var rkInverse_11 = this.rawData[0] * this.rawData[10] - this.rawData[8] * this.rawData[2];
           var rkInverse_12 = this.rawData[8] * this.rawData[1] - this.rawData[0] * this.rawData[9];
           var rkInverse_20 = this.rawData[1] * this.rawData[6] - this.rawData[5] * this.rawData[2];
           var rkInverse_21 = this.rawData[4] * this.rawData[2] - this.rawData[0] * this.rawData[6];
           var rkInverse_22 = this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1];

           var fDet: number =
               this.rawData[0] * rkInverse_00 +
               this.rawData[4] * rkInverse_10 +
               this.rawData[8] * rkInverse_20;

            if (Math.abs(fDet) > 0.00000000001) {
                var fInvDet: number = 1.0 / fDet;

                this.rawData[0] = fInvDet * rkInverse_00;
                this.rawData[4] = fInvDet * rkInverse_01;
                this.rawData[8] = fInvDet * rkInverse_02;
                this.rawData[1] = fInvDet * rkInverse_10;
                this.rawData[5] = fInvDet * rkInverse_11;
                this.rawData[9] = fInvDet * rkInverse_12;
                this.rawData[2] = fInvDet * rkInverse_20;
                this.rawData[6] = fInvDet * rkInverse_21;
                this.rawData[10] = fInvDet * rkInverse_22  ;
            }
        }

        public invert(): boolean {
            var d = this.determinant;
            var invertable = Math.abs(d) > 0.00000000001;

            if (invertable) {
                d = 1 / d;
                var m11: number = this.rawData[0];
                var m21: number = this.rawData[4];
                var m31: number = this.rawData[8];
                var m41: number = this.rawData[12];
                var m12: number = this.rawData[1];
                var m22: number = this.rawData[5];
                var m32: number = this.rawData[9];
                var m42: number = this.rawData[13];
                var m13: number = this.rawData[2];
                var m23: number = this.rawData[6];
                var m33: number = this.rawData[10];
                var m43: number = this.rawData[14];
                var m14: number = this.rawData[3];
                var m24: number = this.rawData[7];
                var m34: number = this.rawData[11];
                var m44: number = this.rawData[15];

                this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
                this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
                this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
                this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
                this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
                this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
                this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
                this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
                this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
                this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
                this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
                this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
                this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
                this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
                this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
                this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
            }
            return invertable;
        }

       
         //public pointAt( pos:Vector3D, at:Vector3D = null, up:Vector3D = null )
         //{
         //}

        public prepend(rhs: Matrix4_4) {
            var m111: number = rhs.rawData[0], m121: number = rhs.rawData[4], m131: number = rhs.rawData[8], m141: number = rhs.rawData[12], m112: number = rhs.rawData[1], m122: number = rhs.rawData[5], m132: number = rhs.rawData[9], m142: number = rhs.rawData[13], m113: number = rhs.rawData[2], m123: number = rhs.rawData[6], m133: number = rhs.rawData[10], m143: number = rhs.rawData[14], m114: number = rhs.rawData[3], m124: number = rhs.rawData[7], m134: number = rhs.rawData[11], m144: number = rhs.rawData[15], m211: number = this.rawData[0], m221: number = this.rawData[4], m231: number = this.rawData[8], m241: number = this.rawData[12], m212: number = this.rawData[1], m222: number = this.rawData[5], m232: number = this.rawData[9], m242: number = this.rawData[13], m213: number = this.rawData[2], m223: number = this.rawData[6], m233: number = this.rawData[10], m243: number = this.rawData[14], m214: number = this.rawData[3], m224: number = this.rawData[7], m234: number = this.rawData[11], m244: number = this.rawData[15];

            this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
            this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
            this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
            this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

            this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
            this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
            this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
            this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

            this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
            this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
            this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
            this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

            this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
            this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
            this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
            this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
        }

        public prependRotation(degrees: number, axis: Vector3D) {
            var m: Matrix4_4 = Matrix4_4.getAxisRotation(axis.x, axis.y, axis.z, degrees);
            this.prepend(m);
        }

        public prependScale(xScale: number, yScale: number, zScale: number) {
            this.prepend(new Matrix4_4(new Float32Array([xScale, 0, 0, 0, 0, yScale, 0, 0, 0, 0, zScale, 0, 0, 0, 0, 1])));
        }

        public prependTranslation(x: number, y: number, z: number) {
            var m = new Matrix4_4();
            m.position = new Vector3D(x, y, z);
            this.prepend(m);
        }

        public makeTransform(pos: Vector3D, scale: Vector3D, rot: Quaternion) {
            
            rot.toMatrix3D(Matrix3DUtils.CALCULATION_MATRIX);

            this.rawData[0] = Matrix3DUtils.CALCULATION_MATRIX[0] * scale.x;
            this.rawData[1] = Matrix3DUtils.CALCULATION_MATRIX[1] * scale.y;
            this.rawData[2] = Matrix3DUtils.CALCULATION_MATRIX[3] * scale.z;
            this.rawData[3] = 0;

            this.rawData[4] = Matrix3DUtils.CALCULATION_MATRIX[4] * scale.x;
            this.rawData[5] = Matrix3DUtils.CALCULATION_MATRIX[5] * scale.y;
            this.rawData[6] = Matrix3DUtils.CALCULATION_MATRIX[6] * scale.z;
            this.rawData[7] = 0;

            this.rawData[8] = Matrix3DUtils.CALCULATION_MATRIX[8] * scale.x;
            this.rawData[9] = Matrix3DUtils.CALCULATION_MATRIX[9] * scale.y;
            this.rawData[10] = Matrix3DUtils.CALCULATION_MATRIX[10] * scale.z;
            this.rawData[11] = 0;

            this.rawData[12] = pos.x;
            this.rawData[13] = pos.y;
            this.rawData[14] = pos.z;
            this.rawData[15] = 1;
        }

        public recompose(components: Vector3D[]): boolean {

            if (components.length < 3) return false
            this.identity();
            this.appendScale(components[2].x, components[2].y, components[2].z);

            var angle: number;
            angle = -components[1].x * Matrix3DUtils.DEGREES_TO_RADIANS;

            Matrix3DUtils.CALCULATION_MATRIX.copyRawDataFrom(new Float32Array([1, 0, 0, 0, 0, Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 0]));
            this.append(Matrix3DUtils.CALCULATION_MATRIX);
            angle = -components[1].y * Matrix3DUtils.DEGREES_TO_RADIANS;

            Matrix3DUtils.CALCULATION_MATRIX.copyRawDataFrom(new Float32Array([Math.cos(angle), 0, Math.sin(angle), 0, 0, 1, 0, 0, -Math.sin(angle), 0, Math.cos(angle), 0, 0, 0, 0, 0]));
            this.append(Matrix3DUtils.CALCULATION_MATRIX);
            angle = -components[1].z * Matrix3DUtils.DEGREES_TO_RADIANS;

            Matrix3DUtils.CALCULATION_MATRIX.copyRawDataFrom(new Float32Array([Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]));
            this.append(Matrix3DUtils.CALCULATION_MATRIX);

            this.rawData[12] = components[0].x;
            this.rawData[13] = components[0].y;
            this.rawData[14] = components[0].z;
            this.rawData[15] = 1;

            return true;
        }

        public transformVector(v: Vector3D): Vector3D {
            if (v == null)
                return new Vector3D();

            var x: number = v.x;
            var y: number = v.y;
            var z: number = v.z;

            var out: Vector3D = new Vector3D();
            out.x = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
            out.y = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
            out.z = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
            out.w = x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + this.rawData[15];

            return out;
        }

        public transformVectors(vin: number[], vout: number[]) {
            var i: number = 0;
            var x: number = 0, y: number = 0, z: number = 0;

            while (i + 3 <= vin.length) {
                x = vin[i];
                y = vin[i + 1];
                z = vin[i + 2];
                vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
                vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
                vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
                i += 3;
            }
        }

        public transformPlane(plane: Plane3D): Plane3D {
            var mat: Matrix4_4 = new Matrix4_4();
            mat.copyFrom(this);
            mat.invert();
            mat.transpose();
            var v: Vector3D = new Vector3D(plane.a, plane.b, plane.c, plane.d);
            v.copyFrom(mat.transformVector(v));
            var p: Plane3D = new Plane3D();
            p.a = v.x;
            p.b = v.y;
            p.c = v.z;
            p.d = v.w / Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

            return p;
        }


        private oRawData: Float32Array = new Float32Array(16);
        public transpose() {
           
            for (var i: number = 0; i < this.oRawData.length; i++ ){
                this.oRawData[i] = this.rawData[i] ;
            }

            this.rawData[1] = this.oRawData[4];
            this.rawData[2] = this.oRawData[8];
            this.rawData[3] = this.oRawData[12];
            this.rawData[4] = this.oRawData[1];
            this.rawData[6] = this.oRawData[9];
            this.rawData[7] = this.oRawData[13];
            this.rawData[8] = this.oRawData[2];
            this.rawData[9] = this.oRawData[6];
            this.rawData[11] = this.oRawData[14];
            this.rawData[12] = this.oRawData[3];
            this.rawData[13] = this.oRawData[7];
            this.rawData[14] = this.oRawData[11];
        }

        static getAxisRotation(x: number, y: number, z: number, degrees: number): Matrix4_4 {
            var m: Matrix4_4 = new Matrix4_4();

            var rad = degrees * (Math.PI / 180);
            var c: number = Math.cos(rad);
            var s: number = Math.sin(rad);
            var t: number = 1 - c;
            var tmp1: number, tmp2: number;

            m.rawData[0] = c + x * x * t;
            m.rawData[5] = c + y * y * t;
            m.rawData[10] = c + z * z * t;

            tmp1 = x * y * t;
            tmp2 = z * s;
            m.rawData[1] = tmp1 + tmp2;
            m.rawData[4] = tmp1 - tmp2;
            tmp1 = x * z * t;
            tmp2 = y * s;
            m.rawData[8] = tmp1 + tmp2;
            m.rawData[2] = tmp1 - tmp2;
            tmp1 = y * z * t;
            tmp2 = x * s;
            m.rawData[9] = tmp1 - tmp2;
            m.rawData[6] = tmp1 + tmp2;

            return m;
        }

        public get determinant(): number {
            return ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
        }

        public get position(): Vector3D {
            return new Vector3D(this.rawData[12], this.rawData[13], this.rawData[14]);
        }

        public set position(value: Vector3D) {
            this.rawData[12] = value.x;
            this.rawData[13] = value.y;
            this.rawData[14] = value.z;
        }

        public get scale(): Vector3D {
            return new Vector3D(this.rawData[0], this.rawData[5], this.rawData[10]);
        }

        public toFixed(decimalPlace: number): string {
            var magnitude: number = Math.pow(10, decimalPlace);
            return "matrix3d(" + Math.round(this.rawData[0] * magnitude) / magnitude + "," + Math.round(this.rawData[1] * magnitude) / magnitude + "," + Math.round(this.rawData[2] * magnitude) / magnitude + "," + Math.round(this.rawData[3] * magnitude) / magnitude + "," + Math.round(this.rawData[4] * magnitude) / magnitude + "," + Math.round(this.rawData[5] * magnitude) / magnitude + "," + Math.round(this.rawData[6] * magnitude) / magnitude + "," + Math.round(this.rawData[7] * magnitude) / magnitude + "," + Math.round(this.rawData[8] * magnitude) / magnitude + "," + Math.round(this.rawData[9] * magnitude) / magnitude + "," + Math.round(this.rawData[10] * magnitude) / magnitude + "," + Math.round(this.rawData[11] * magnitude) / magnitude + "," + Math.round(this.rawData[12] * magnitude) / magnitude + "," + Math.round(this.rawData[13] * magnitude) / magnitude + "," + Math.round(this.rawData[14] * magnitude) / magnitude + "," + Math.round(this.rawData[15] * magnitude) / magnitude + ")";
        }

        public toString(): string {
            return "matrix3d(" + Math.round(this.rawData[0] * 1000) / 1000 + "," + Math.round(this.rawData[1] * 1000) / 1000 + "," + Math.round(this.rawData[2] * 1000) / 1000 + "," + Math.round(this.rawData[3] * 1000) / 1000 + "," + Math.round(this.rawData[4] * 1000) / 1000 + "," + Math.round(this.rawData[5] * 1000) / 1000 + "," + Math.round(this.rawData[6] * 1000) / 1000 + "," + Math.round(this.rawData[7] * 1000) / 1000 + "," + Math.round(this.rawData[8] * 1000) / 1000 + "," + Math.round(this.rawData[9] * 1000) / 1000 + "," + Math.round(this.rawData[10] * 1000) / 1000 + "," + Math.round(this.rawData[11] * 1000) / 1000 + "," + Math.round(this.rawData[12] * 1000) / 1000 + "," + Math.round(this.rawData[13] * 1000) / 1000 + "," + Math.round(this.rawData[14] * 1000) / 1000 + "," + Math.round(this.rawData[15] * 1000) / 1000 + ")";
        }

        public lerp(m0: Matrix4_4, m1: Matrix4_4, t: number): void {
            //t(m1 - m0) + m0
            this.copyFrom(m1).sub(m0).mult(t).add(m0);
        }
    }
}