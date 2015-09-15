var BlackSwan;
(function (BlackSwan) {
    var Matrix4_4 = (function () {
        /**
         * Creat a Matrix4_4 object.
         */
        function Matrix4_4(datas) {
            if (datas === void 0) { datas = null; }
            if (datas) {
                this.rawData = datas;
            }
            else
                this.rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
        Matrix4_4.prototype.append = function (lhs) {
            var m111 = this.rawData[0], m121 = this.rawData[4], m131 = this.rawData[8], m141 = this.rawData[12], m112 = this.rawData[1], m122 = this.rawData[5], m132 = this.rawData[9], m142 = this.rawData[13], m113 = this.rawData[2], m123 = this.rawData[6], m133 = this.rawData[10], m143 = this.rawData[14], m114 = this.rawData[3], m124 = this.rawData[7], m134 = this.rawData[11], m144 = this.rawData[15], m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];
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
        };
        Matrix4_4.prototype.appendRotation = function (degrees, axis) {
            var m = Matrix4_4.getAxisRotation(axis.x, axis.y, axis.z, degrees);
            //this.append(m);
            var tmp = new Matrix4_4();
            var s, c;
            s = Math.sin(degrees / (180 / Math.PI));
            c = Math.cos(degrees / (180 / Math.PI));
            if (axis.x == 1) {
                tmp.rawData[0] = 1.0;
                tmp.rawData[1] = 0.0;
                tmp.rawData[2] = 0.0;
                tmp.rawData[4] = 0.0;
                tmp.rawData[5] = c;
                tmp.rawData[6] = s;
                tmp.rawData[8] = 0.0;
                tmp.rawData[9] = -s;
                tmp.rawData[10] = c;
            }
            if (axis.y == 1) {
                tmp.rawData[0] = c;
                tmp.rawData[1] = 0.0;
                tmp.rawData[2] = -s;
                tmp.rawData[0] = 0.0;
                tmp.rawData[5] = 1.0;
                tmp.rawData[6] = 0.0;
                tmp.rawData[0] = s;
                tmp.rawData[9] = 0.0;
                tmp.rawData[10] = c;
            }
            if (axis.z == 1) {
                tmp.rawData[0] = c;
                tmp.rawData[1] = s;
                tmp.rawData[2] = 0.0;
                tmp.rawData[0] = -s;
                tmp.rawData[5] = c;
                tmp.rawData[6] = 0.0;
                tmp.rawData[0] = 0.0;
                tmp.rawData[9] = 0.0;
                tmp.rawData[10] = 1.0;
            }
            this.append(tmp);
        };
        Matrix4_4.prototype.appendScale = function (xScale, yScale, zScale) {
            //this.append(new Matrix4_4(new Float32Array([xScale, 0.0, 0.0, 0.0, 0.0, yScale, 0.0, 0.0, 0.0, 0.0, zScale, 0.0, 0.0, 0.0, 0.0, 1.0])));
            this.rawData[0] = xScale;
            this.rawData[1] = 0.0;
            this.rawData[2] = 0.0;
            this.rawData[4] = 0.0;
            this.rawData[5] = yScale;
            this.rawData[6] = 0.0;
            this.rawData[8] = 0.0;
            this.rawData[9] = 0.0;
            this.rawData[10] = zScale;
        };
        Matrix4_4.prototype.appendTranslation = function (x, y, z) {
            this.rawData[12] += x;
            this.rawData[13] += y;
            this.rawData[14] += z;
        };
        Matrix4_4.prototype.clone = function () {
            return new Matrix4_4(this.rawData.slice(0));
        };
        Matrix4_4.prototype.copyColumnFrom = function (column, vector3D) {
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
            }
        };
        Matrix4_4.prototype.copyColumnTo = function (column, vector3D) {
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
            }
        };
        Matrix4_4.prototype.copyFrom = function (sourceMatrix3D) {
            var len = sourceMatrix3D.rawData.length;
            for (var c = 0; c < len; c++)
                this.rawData[c] = sourceMatrix3D.rawData[c];
        };
        Matrix4_4.prototype.copyRawDataFrom = function (vector, index, transpose) {
            if (index === void 0) { index = 0; }
            if (transpose === void 0) { transpose = false; }
            if (transpose)
                this.transpose();
            var len = vector.length - index;
            for (var c = 0; c < len; c++)
                this.rawData[c] = vector[c + index];
            if (transpose)
                this.transpose();
        };
        Matrix4_4.prototype.copyRawDataTo = function (vector, index, transpose) {
            if (index === void 0) { index = 0; }
            if (transpose === void 0) { transpose = false; }
            if (transpose)
                this.transpose();
            var len = this.rawData.length;
            for (var c = 0; c < len; c++)
                vector[c + index] = this.rawData[c];
            if (transpose)
                this.transpose();
        };
        Matrix4_4.prototype.copyRowFrom = function (row, vector3D) {
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
                    new Error("no more raw!");
            }
        };
        Matrix4_4.prototype.copyRowTo = function (row, vector3D) {
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
                    vector3D.w = this.rawData[15];
                    break;
                default:
                    new Error("no more raw!");
            }
        };
        Matrix4_4.prototype.copyToMatrix3D = function (dest) {
            dest.rawData = this.rawData.slice(0);
        };
        Matrix4_4.prototype.decompose = function (orientationStyle) {
            if (orientationStyle === void 0) { orientationStyle = "eulerAngles"; }
            var q;
            var vec = [];
            var m = this.clone();
            var mr = m.rawData;
            var pos = new BlackSwan.Vector3D(mr[12], mr[13], mr[14]);
            mr[12] = 0;
            mr[13] = 0;
            mr[14] = 0;
            var scale = new BlackSwan.Vector3D();
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
            var rot = new BlackSwan.Vector3D();
            switch (orientationStyle) {
                case BlackSwan.Orientation3D.AXIS_ANGLE:
                    rot.w = Math.acos((mr[0] + mr[5] + mr[10] - 1) / 2);
                    var len = Math.sqrt((mr[6] - mr[9]) * (mr[6] - mr[9]) + (mr[8] - mr[2]) * (mr[8] - mr[2]) + (mr[1] - mr[4]) * (mr[1] - mr[4]));
                    rot.x = (mr[6] - mr[9]) / len;
                    rot.y = (mr[8] - mr[2]) / len;
                    rot.z = (mr[1] - mr[4]) / len;
                    break;
                case BlackSwan.Orientation3D.QUATERNION:
                    var tr = mr[0] + mr[5] + mr[10];
                    if (tr > 0) {
                        rot.w = Math.sqrt(1 + tr) / 2;
                        rot.x = (mr[6] - mr[9]) / (4 * rot.w);
                        rot.y = (mr[8] - mr[2]) / (4 * rot.w);
                        rot.z = (mr[1] - mr[4]) / (4 * rot.w);
                    }
                    else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
                        rot.x = Math.sqrt(1 + mr[0] - mr[5] - mr[10]) / 2;
                        rot.w = (mr[6] - mr[9]) / (4 * rot.x);
                        rot.y = (mr[1] + mr[4]) / (4 * rot.x);
                        rot.z = (mr[8] + mr[2]) / (4 * rot.x);
                    }
                    else if (mr[5] > mr[10]) {
                        rot.y = Math.sqrt(1 + mr[5] - mr[0] - mr[10]) / 2;
                        rot.x = (mr[1] + mr[4]) / (4 * rot.y);
                        rot.w = (mr[8] - mr[2]) / (4 * rot.y);
                        rot.z = (mr[6] + mr[9]) / (4 * rot.y);
                    }
                    else {
                        rot.z = Math.sqrt(1 + mr[10] - mr[0] - mr[5]) / 2;
                        rot.x = (mr[8] + mr[2]) / (4 * rot.z);
                        rot.y = (mr[6] + mr[9]) / (4 * rot.z);
                        rot.w = (mr[1] - mr[4]) / (4 * rot.z);
                    }
                    break;
                case BlackSwan.Orientation3D.EULER_ANGLES:
                    rot.y = Math.asin(-mr[2]);
                    if (mr[2] != 1 && mr[2] != -1) {
                        rot.x = Math.atan2(mr[6], mr[10]);
                        rot.z = Math.atan2(mr[1], mr[0]);
                    }
                    else {
                        rot.z = 0;
                        rot.x = Math.atan2(mr[4], mr[5]);
                    }
                    break;
            }
            vec.push(pos);
            vec.push(rot);
            vec.push(scale);
            return vec;
        };
        Matrix4_4.prototype.deltaTransformVector = function (v) {
            var x = v.x;
            var y = v.y;
            var z = v.z;
            return new BlackSwan.Vector3D((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10]), (x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11]));
        };
        Matrix4_4.prototype.identity = function () {
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
            this.rawData[0] = 1;
            this.rawData[5] = 1;
            this.rawData[10] = 1;
            this.rawData[15] = 1;
        };
        Matrix4_4.prototype.fill = function (value) {
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
        };
        Matrix4_4.interpolate = function (thisMat, toMat, percent) {
            var m = new Matrix4_4();
            for (var i = 0; i < 16; ++i)
                m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;
            return m;
        };
        Matrix4_4.prototype.interpolateTo = function (toMat, percent) {
            for (var i = 0; i < 16; ++i)
                this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i]) * percent;
        };
        Matrix4_4.prototype.invert = function () {
            var d = this.determinant;
            var invertable = Math.abs(d) > 0.00000000001;
            if (invertable) {
                d = 1 / d;
                var m11 = this.rawData[0];
                var m21 = this.rawData[4];
                var m31 = this.rawData[8];
                var m41 = this.rawData[12];
                var m12 = this.rawData[1];
                var m22 = this.rawData[5];
                var m32 = this.rawData[9];
                var m42 = this.rawData[13];
                var m13 = this.rawData[2];
                var m23 = this.rawData[6];
                var m33 = this.rawData[10];
                var m43 = this.rawData[14];
                var m14 = this.rawData[3];
                var m24 = this.rawData[7];
                var m34 = this.rawData[11];
                var m44 = this.rawData[15];
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
        };
        //public pointAt( pos:Vector3D, at:Vector3D = null, up:Vector3D = null )
        //{
        //}
        Matrix4_4.prototype.prepend = function (rhs) {
            var m111 = rhs.rawData[0], m121 = rhs.rawData[4], m131 = rhs.rawData[8], m141 = rhs.rawData[12], m112 = rhs.rawData[1], m122 = rhs.rawData[5], m132 = rhs.rawData[9], m142 = rhs.rawData[13], m113 = rhs.rawData[2], m123 = rhs.rawData[6], m133 = rhs.rawData[10], m143 = rhs.rawData[14], m114 = rhs.rawData[3], m124 = rhs.rawData[7], m134 = rhs.rawData[11], m144 = rhs.rawData[15], m211 = this.rawData[0], m221 = this.rawData[4], m231 = this.rawData[8], m241 = this.rawData[12], m212 = this.rawData[1], m222 = this.rawData[5], m232 = this.rawData[9], m242 = this.rawData[13], m213 = this.rawData[2], m223 = this.rawData[6], m233 = this.rawData[10], m243 = this.rawData[14], m214 = this.rawData[3], m224 = this.rawData[7], m234 = this.rawData[11], m244 = this.rawData[15];
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
        };
        Matrix4_4.prototype.prependRotation = function (degrees, axis) {
            var m = Matrix4_4.getAxisRotation(axis.x, axis.y, axis.z, degrees);
            this.prepend(m);
        };
        Matrix4_4.prototype.prependScale = function (xScale, yScale, zScale) {
            this.prepend(new Matrix4_4(new Float32Array([xScale, 0, 0, 0, 0, yScale, 0, 0, 0, 0, zScale, 0, 0, 0, 0, 1])));
        };
        Matrix4_4.prototype.prependTranslation = function (x, y, z) {
            var m = new Matrix4_4();
            m.position = new BlackSwan.Vector3D(x, y, z);
            this.prepend(m);
        };
        Matrix4_4.prototype.recompose = function (components) {
            if (components.length < 3)
                return false;
            this.identity();
            this.appendScale(components[2].x, components[2].y, components[2].z);
            var angle;
            angle = -components[1].x;
            BlackSwan.Matrix3DUtils.CALCULATION_MATRIX.copyRawDataFrom(new Float32Array([1, 0, 0, 0, 0, Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 0]));
            this.append(BlackSwan.Matrix3DUtils.CALCULATION_MATRIX);
            angle = -components[1].y;
            BlackSwan.Matrix3DUtils.CALCULATION_MATRIX.copyRawDataFrom(new Float32Array([Math.cos(angle), 0, Math.sin(angle), 0, 0, 1, 0, 0, -Math.sin(angle), 0, Math.cos(angle), 0, 0, 0, 0, 0]));
            this.append(BlackSwan.Matrix3DUtils.CALCULATION_MATRIX);
            angle = -components[1].z;
            BlackSwan.Matrix3DUtils.CALCULATION_MATRIX.copyRawDataFrom(new Float32Array([Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]));
            this.append(BlackSwan.Matrix3DUtils.CALCULATION_MATRIX);
            this.rawData[12] = components[0].x;
            this.rawData[13] = components[0].y;
            this.rawData[14] = components[0].z;
            this.rawData[15] = 1;
            return true;
        };
        Matrix4_4.prototype.transformVector = function (v) {
            if (v == null)
                return new BlackSwan.Vector3D();
            var x = v.x;
            var y = v.y;
            var z = v.z;
            return new BlackSwan.Vector3D((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14]), (x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + this.rawData[15]));
        };
        Matrix4_4.prototype.transformVectors = function (vin, vout) {
            var i = 0;
            var x = 0, y = 0, z = 0;
            while (i + 3 <= vin.length) {
                x = vin[i];
                y = vin[i + 1];
                z = vin[i + 2];
                vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
                vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
                vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
                i += 3;
            }
        };
        Matrix4_4.prototype.transpose = function () {
            var oRawData = this.rawData.slice(0);
            this.rawData[1] = oRawData[4];
            this.rawData[2] = oRawData[8];
            this.rawData[3] = oRawData[12];
            this.rawData[4] = oRawData[1];
            this.rawData[6] = oRawData[9];
            this.rawData[7] = oRawData[13];
            this.rawData[8] = oRawData[2];
            this.rawData[9] = oRawData[6];
            this.rawData[11] = oRawData[14];
            this.rawData[12] = oRawData[3];
            this.rawData[13] = oRawData[7];
            this.rawData[14] = oRawData[11];
        };
        Matrix4_4.getAxisRotation = function (x, y, z, degrees) {
            var m = new Matrix4_4();
            var rad = degrees * (Math.PI / 180);
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            var t = 1 - c;
            var tmp1, tmp2;
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
        };
        Object.defineProperty(Matrix4_4.prototype, "determinant", {
            get: function () {
                return ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4_4.prototype, "position", {
            get: function () {
                return new BlackSwan.Vector3D(this.rawData[12], this.rawData[13], this.rawData[14]);
            },
            set: function (value) {
                this.rawData[12] = value.x;
                this.rawData[13] = value.y;
                this.rawData[14] = value.z;
            },
            enumerable: true,
            configurable: true
        });
        Matrix4_4.prototype.toFixed = function (decimalPlace) {
            var magnitude = Math.pow(10, decimalPlace);
            return "matrix3d(" + Math.round(this.rawData[0] * magnitude) / magnitude + "," + Math.round(this.rawData[1] * magnitude) / magnitude + "," + Math.round(this.rawData[2] * magnitude) / magnitude + "," + Math.round(this.rawData[3] * magnitude) / magnitude + "," + Math.round(this.rawData[4] * magnitude) / magnitude + "," + Math.round(this.rawData[5] * magnitude) / magnitude + "," + Math.round(this.rawData[6] * magnitude) / magnitude + "," + Math.round(this.rawData[7] * magnitude) / magnitude + "," + Math.round(this.rawData[8] * magnitude) / magnitude + "," + Math.round(this.rawData[9] * magnitude) / magnitude + "," + Math.round(this.rawData[10] * magnitude) / magnitude + "," + Math.round(this.rawData[11] * magnitude) / magnitude + "," + Math.round(this.rawData[12] * magnitude) / magnitude + "," + Math.round(this.rawData[13] * magnitude) / magnitude + "," + Math.round(this.rawData[14] * magnitude) / magnitude + "," + Math.round(this.rawData[15] * magnitude) / magnitude + ")";
        };
        Matrix4_4.prototype.toString = function () {
            return "matrix3d(" + Math.round(this.rawData[0] * 1000) / 1000 + "," + Math.round(this.rawData[1] * 1000) / 1000 + "," + Math.round(this.rawData[2] * 1000) / 1000 + "," + Math.round(this.rawData[3] * 1000) / 1000 + "," + Math.round(this.rawData[4] * 1000) / 1000 + "," + Math.round(this.rawData[5] * 1000) / 1000 + "," + Math.round(this.rawData[6] * 1000) / 1000 + "," + Math.round(this.rawData[7] * 1000) / 1000 + "," + Math.round(this.rawData[8] * 1000) / 1000 + "," + Math.round(this.rawData[9] * 1000) / 1000 + "," + Math.round(this.rawData[10] * 1000) / 1000 + "," + Math.round(this.rawData[11] * 1000) / 1000 + "," + Math.round(this.rawData[12] * 1000) / 1000 + "," + Math.round(this.rawData[13] * 1000) / 1000 + "," + Math.round(this.rawData[14] * 1000) / 1000 + "," + Math.round(this.rawData[15] * 1000) / 1000 + ")";
        };
        return Matrix4_4;
    })();
    BlackSwan.Matrix4_4 = Matrix4_4;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Matrix4_4.js.map