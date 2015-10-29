module Egret3D {

    export enum ValueType {
        constValue, constRandomValue, cube3D, plane, sphere, cone, triangle, cylinder, line, curve, beizier
    }

    export class ValueData {
        //public valueType: number = ValueType.cube3D;
        public valueType: number = 0;
        public parameters: Array<any> = [];
    }

    export class Value {

        static valueShape: Array<any> = [];
        static regist() {
            Value.valueShape.push(new ConstValueShape());
            Value.valueShape.push(new BallSurfaceValueShape());

            //Value.valueShape.push(new CircleValueShape());
            Value.valueShape.push(new ConstRandomValueShape());
            Value.valueShape.push(new CubeVector3DValueShape());
            Value.valueShape.push(new CircleValueShape() );
        }

        private valueData: ValueData;

        private values: Array<any>;

        constructor(data: ValueData) {
            if (data === null)
                this.data = new ValueData();
            else
                this.data = this.valueData;
        }

        public set data(valueData: ValueData) {
            this.valueData = valueData;
        }

        public get data(): ValueData {
            return this.valueData;
        }

        public getData(index: number): any {
            return this.values[index];
        }

        public calculation(num: number) {
            this.values = Value.valueShape[this.valueData.valueType].calculation(num, this.valueData.parameters);
        }

    }


    class ValueShape {
        public calculation(num: number, ...data): Vector3D[] {
            new Error("asd");
            return null;
        }
    }

    class ConstValueShape extends ValueShape {
        //width height
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            var val: Vector3D;
            var parameter: any[] = parameters[0];
            for (var i: number = 0; i < num; i++) {
                val = new Vector3D();
                val.x = parameter[0];
                val.y = parameter[1];
                val.z = parameter[2];
                values.push(val);
            }
            return values;
        }
    }

    class ConstRandomValueShape extends ValueShape {
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            var val: Vector3D;
            var parameter: any[] = parameters[0];
            for (var i: number = 0; i < num; i++) {
                val = new Vector3D();
                val.x = Math.random() * parameter[0];
                val.y = Math.random() * parameter[1];
                val.z = Math.random() * parameter[2];
                values.push(val);
            }
            return values;
        }
    }

    class CubeVector3DValueShape extends ValueShape {

        // width height depth
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            var val: Vector3D;
            var parameter: any[] = parameters[0];
            for (var i: number = 0; i < num; i++) {
                val = new Vector3D();
                val.x = Math.random() * parameter[0] - parameter[0] * 0.5;
                val.y = Math.random() * parameter[1] - parameter[1] * 0.5;
                val.z = Math.random() * parameter[2] - parameter[2] * 0.5;
                values.push(val);
            }
            return values;
        }
    }

    class PlaneValueShape extends ValueShape {
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            var tmpPar = parameters[0];
            var pos: Vector3D;
            var width: number = tmpPar[0];
            var height: number = tmpPar[1];
            for (var i: number = 0; i < num; i++) {
                pos = new Vector3D();
                pos.x = Math.random() * width - width * 0.5;
                pos.y = Math.random() * height - height * 0.5;
                pos.z = 0;
                values.push(pos);
            }
            return values;
        }
    }

    class SphereValueShape extends ValueShape {
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            return values;
        }
    }

    class ConeValueShape extends ValueShape {
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            return values;
        }
    }

    class TriangleValueShape extends ValueShape {
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            return values;
        }
    }

    //圆柱体.以Y轴为高 (parameters = [R, height])
    class CylinderValueShape extends ValueShape {
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            var tmpPar = parameters[0];
            var pos: Vector3D;
            var r: number = tmpPar[0];
            var height: number = tmpPar[1];
            for (var i: number = 0; i < num; i++) {
                pos = new Vector3D();
                pos.x = Math.random() * r ;
                pos.z = Math.random() * r ;
                if (Math.random() > 0.5) pos.x *= -1;
                if (Math.random() > 0.5) pos.z *= -1;
                pos.y = Math.random() * height - height * 0.5;
                if ((pos.x * pos.x + pos.z * pos.z) > (r * r)) {
                    //不在圆内就重新随机 
                    i--;
                } else {
                    values.push(pos);
                }
            }
            return values;
        }
    }

    //线性分布
    class LineValueShape extends ValueShape {
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            var tmpPar = parameters[0];
            var pos: Vector3D;
            var length: number = tmpPar[0];
            for (var i: number = 0; i < num; i++) {
                pos = new Vector3D(Math.random() * length, 0, 0);
                values.push(pos);
            }
            return values;
        }
    }

    //球表面分布
    class BallSurfaceValueShape extends ValueShape {
        //parameters = [R]
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            var r: number = parameters[0][0];
            values = this.getPoints1(num, r);
            return values;
        }

        private getPoints1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var x: number;
            var y: number;
            var z: number;
            var s: number;
            var n: number;
            for (var i: number = 0; i < num; i++) {
                x = Math.random() * 2 -1;
                y = Math.random() * 2 -1 ;
                z = Math.random() * 2 - 1 ;
                s = x * x + y * y + z * z;
                if (s > 1) {
                    i--;
                } else {
                    n = Math.sqrt(s);
                    values.push(new Vector3D(x / n * r, y / n  * r, z / n * r));
                }
            }
            return values;
        }

        private getPoints2(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            for (var i: number = 0; i < num; i++) {
                
            }
            return values;
        }
    }

    //球内分布
    class BallValueShape extends ValueShape {

        //parameters = [R]
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            var r: number = parameters[0][0];

            values = this.getPoints1(num, r);
            return values;
        }

        private getPoints1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var x: number;
            var y: number;
            var z: number;
            var pos: Vector3D;
            var radio: Vector3D = new Vector3D(0, 0, 0);
            for (var i: number = 0; i < num; i++) {
                x = Math.random() * 2 * r - r;
                y = Math.random() * 2 * r - r;
                z = Math.random() * 2 * r - r;
                pos = new Vector3D(x, y, z);
                if (Vector3D.distance(radio, pos) > r) {
                    i--;
                } else {
                    values.push(pos);
                }
            }
            return values;
        }
    }

    //平面圆
    class CircleValueShape extends ValueShape {
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[];
            var tmpPar = parameters[0];
            var r: number = tmpPar[0];

            //var time: number = new Date().getTime();
            values = this.createRandomPoint1(num, r);//createRandomPoint1 比 createRandomPoint2 大部分情况下快了15% - 25%, 少数情况下略高于createRandomPoint2
            //console.log('createRandomPoint1 cost time: ', new Date().getTime() - time);
            //time = new Date().getTime();
            //this.createRandomPoint2(num, r);
            //console.log('createRandomPoint2 cost time: ', new Date().getTime() - time);
            return values;
            
        }
        //非稳定算法.但是因为没有三角函数和开平方的计算.反而在大部分情况下效率会更高
        private createRandomPoint1(num: number, r:number): Vector3D[] {
            var values: Vector3D[] = [];
            var d: number = r * 2;
            for (var i: number = 0; i < num; i++) {
                var x = Math.random() * d - r;
                var z = Math.random() * d - r;
                if ((x * x + z * z) > (r * r)) {
                    i--;
                } else {
                    values.push(new Vector3D(x, 0, z));
                }
            }
            return values;
        }

        private createRandomPoint2(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var pos: Vector3D;
            var tempR: number;
            var theta: number;
            for (var i: number = 0; i < num; i++) {
                pos = new Vector3D();
                tempR = Math.sqrt(Math.random()) * r;
                theta = Math.random() * 360;
                pos.x = tempR * Math.sin(theta);
                pos.z = tempR * Math.cos(theta);
                pos.y = 0;
                values.push(pos);
            }
            return values;
        }
    }

    //贝塞尔曲线, 以Y为平面, parameters = [p0, p1, p2, p3]
    class BezierCurveValueShape extends ValueShape {
        public calculation(num: number, ...parameters): Vector3D[] {
            var values: Vector3D[] = [];
            //var tmpPar = parameters[0];
            var tmpPar:Vector3D[] = [];
            tmpPar.push(new Vector3D(0, 0, 0));
            tmpPar.push(new Vector3D(-200, 1000, 700));
            tmpPar.push(new Vector3D(200, -50, 300));
            tmpPar.push(new Vector3D(-300, -220, 500));
            
            var p0: Vector3D = tmpPar[0];
            var p1: Vector3D = tmpPar[1];
            var p2: Vector3D = tmpPar[2];
            var p3: Vector3D = tmpPar[3];
            var t: number;
            var yt: number;
            var x: number;
            var y: number;
            var z: number;
            for (var i: number = 0; i < num; i++) {
                t = Math.random();
                yt = 1 - t;
                x = p0.x * yt * yt * yt + 3 * p1.x * yt * yt * t + 3 * p2.x * yt * t * t + p3.x * t * t * t;
                y = p0.y * yt * yt * yt + 3 * p1.y * yt * yt * t + 3 * p2.y * yt * t * t + p3.y * t * t * t;
                z = p0.z * yt * yt * yt + 3 * p1.z * yt * yt * t + 3 * p2.z * yt * t * t + p3.z * t * t * t;
                values.push(new Vector3D(x, y, z));
            }
            return values;
        }
    }

    class CurveVauleShape extends ValueShape {
    }

    class BezierValueShape extends ValueShape {
    }

}