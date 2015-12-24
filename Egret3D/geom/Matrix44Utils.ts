module Egret3D {
     /**
     * @language zh_CN
     * @class Egret3D.Matrix3DUtils
     * @classdesc
     * 可使用 Matrix3DUtils 类 进行3d矩阵的计算
     */   
    export class Matrix3DUtils {
                                                                       
        /**
        * @language zh_CN
        * 1弧度为多少角度
        */
        public static RADIANS_TO_DEGREES: number = 180 / Math.PI;
                                                                               
        /**
        * @language zh_CN
        * 1角度为多少弧度
        */
        public static DEGREES_TO_RADIANS: number = Math.PI / 180;
        public static RAW_DATA_CONTAINER: Float32Array = new Float32Array(16);
        public static CALCULATION_MATRIX: Matrix4_4 = new Matrix4_4();
                                                                                       
        /**
        * @language zh_CN
        * 四元数转矩阵
        * @param quarternion 源四元数
        * @param m 目标矩阵
        * @returns 返回转出矩阵
        */
        public static quaternion2matrix(quarternion: Quaternion, m: Matrix4_4 = null): Matrix4_4 {
            var x: number = quarternion.x;
            var y: number = quarternion.y;
            var z: number = quarternion.z;
            var w: number = quarternion.w;

            var xx: number = x * x;
            var xy: number = x * y;
            var xz: number = x * z;
            var xw: number = x * w;

            var yy: number = y * y;
            var yz: number = y * z;
            var yw: number = y * w;

            var zz: number = z * z;
            var zw: number = z * w;

            var raw: Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
            raw[0] = 1 - 2 * (yy + zz);
            raw[1] = 2 * (xy + zw);
            raw[2] = 2 * (xz - yw);
            raw[4] = 2 * (xy - zw);
            raw[5] = 1 - 2 * (xx + zz);
            raw[6] = 2 * (yz + xw);
            raw[8] = 2 * (xz + yw);
            raw[9] = 2 * (yz - xw);
            raw[10] = 1 - 2 * (xx + yy);
            raw[3] = raw[7] = raw[11] = raw[12] = raw[13] = raw[14] = 0;
            raw[15] = 1;

            if (m) {
                m.copyRawDataFrom(raw);
                return m;
            } else
                return new Matrix4_4(new Float32Array(raw));
        }
                                                                                               
        /**
        * @language zh_CN
        * 得到矩阵朝前的方向
        * @param m 源矩阵
        * @param v 返回的方向 可为null
        * @returns 返回方向
        */
        public static getForward(m: Matrix4_4, v: Vector3D = null): Vector3D {
            if (v === null) {
                v = new Vector3D(0.0, 0.0, 0.0);
            }

            m.copyRowTo(2, v);
            v.normalize();
            return v;
        }
                                                                                                       
        /**
        * @language zh_CN
        * 得到矩阵朝上的方向
        * @param m 源矩阵
        * @param v 返回的方向 可为null
        * @returns 返回方向
        */
        public static getUp(m: Matrix4_4, v: Vector3D = null): Vector3D {
            //v ||= new Vector3D(0.0, 0.0, 0.0);

            if (v === null) {

                v = new Vector3D(0.0, 0.0, 0.0);

            }

            m.copyRowTo(1, v);
            v.normalize();

            return v;
        }
                                                                                                               
        /**
        * @language zh_CN
        * 得到矩阵朝右的方向
        * @param m 源矩阵
        * @param v 返回的方向 可为null
        * @returns 返回方向
        */
        public static getRight(m: Matrix4_4, v: Vector3D = null): Vector3D {
            //v ||= new Vector3D(0.0, 0.0, 0.0);
            if (v === null) {

                v = new Vector3D(0.0, 0.0, 0.0);

            }

            m.copyRowTo(0, v);
            v.normalize();

            return v;
        }
                                                                                                                       
        /**
        * @language zh_CN
        * 比较两个矩阵是否相同
        * @param m1 矩阵1
        * @param m2 矩阵2
        * @returns 相同返回true
        */
        public static compare(m1: Matrix4_4, m2: Matrix4_4): boolean {
            var r1: Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
            var r2: Float32Array = m2.rawData;
            m1.copyRawDataTo(r1);

            for (var i: number = 0; i < 16; ++i) {
                if (r1[i] != r2[i])
                    return false;
            }

            return true;
        }
                                                                                                                               
        /**
        * @language zh_CN
        * 得到平面的反射矩阵
        * @param plane 反射的面
        * @param target 计算返回的矩阵
        * @returns 返回计算的结果
        */
        public static reflection(plane: Plane3D, target: Matrix4_4 = null): Matrix4_4 {
            if (target === null)
                target = new Matrix4_4();

            var a: number = plane.a, b: number = plane.b, c: number = plane.c, d: number = plane.d;
            var rawData: Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
            var ab2: number = -2 * a * b;
            var ac2: number = -2 * a * c;
            var bc2: number = -2 * b * c;
            // reflection matrix
            rawData[0] = 1 - 2 * a * a;
            rawData[4] = ab2;
            rawData[8] = ac2;
            rawData[12] = -2 * a * d;
            rawData[1] = ab2;
            rawData[5] = 1 - 2 * b * b;
            rawData[9] = bc2;
            rawData[13] = -2 * b * d;
            rawData[2] = ac2;
            rawData[6] = bc2;
            rawData[10] = 1 - 2 * c * c;
            rawData[14] = -2 * c * d;
            rawData[3] = 0;
            rawData[7] = 0;
            rawData[11] = 0;
            rawData[15] = 1;
            target.copyRawDataFrom(rawData);

            return target;
        }

        /**
        * @language zh_CN
        * 得到矩阵的平移
        * @param transform 计算的矩阵
        * @param result 计算返回平移坐标
        * @returns 返回平移坐标
        */
        public static getTranslation(transform: Matrix4_4, result: Vector3D = null): Vector3D {
            if (!result)
                result = new Vector3D();

            transform.copyRowTo(3, result);
            return result;
        }
    }
} 