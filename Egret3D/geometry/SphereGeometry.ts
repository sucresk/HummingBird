module Egret3D {
    export class SphereGeometry extends SubGeometry {

        private _segmentsW: number = 50;
        private _segmentsH: number = 50;
        private _radius: number = 100;
        constructor(r: number = 100.0, segmentsW: number = 15, segmentsH: number = 15 ){
            super();

            this._radius = r;
            this._segmentsW = segmentsW;
            this._segmentsH = segmentsH;

            this.buildSphere();
        }

        private buildSphere() {
            var vertices:Array<number>;
            var indices: Array<number>;
            var i: number = 0, j: number = 0, triIndex: number = 0 ;
            var numVerts: number = (this._segmentsH + 1) * (this._segmentsW + 1);
            var stride: number = this.vertexAttLength ;
            var skip: number = stride - 9;

            vertices = new Array<number>(numVerts * stride );
            indices = new Array<number>((this._segmentsH - 1) * this._segmentsW * 6 );

            var startIndex: number = 0 ;
            var index: number = 0 ;
            var comp1: number = 0, comp2: number = 0, t1: number = 0, t2: number = 0 ;

            for (j = 0; j <= this._segmentsH; ++j) {

                startIndex = index;

                var horangle: number = Math.PI * j / this._segmentsH;
                var z: number = -this._radius * Math.cos(horangle);
                var ringradius: number = this._radius * Math.sin(horangle);

                for (i = 0; i <= this._segmentsW; ++i) {
                    var verangle: number = 2 * Math.PI * i / this._segmentsW;
                    var x: number = ringradius * Math.cos(verangle);
                    var y: number = ringradius * Math.sin(verangle);
                    var normLen: number = 1 / Math.sqrt(x * x + y * y + z * z);
                    var tanLen: number = Math.sqrt(y * y + x * x);

                        t1 = 0;
                        t2 = tanLen > .007 ? x / tanLen : 0;
                        comp1 = -z;
                        comp2 = y;

                        if (i == this._segmentsW) {

                        vertices[index++] = vertices[startIndex];
                        vertices[index++] = vertices[startIndex + 1];
                        vertices[index++] = vertices[startIndex + 2];
                       
                        vertices[index++] = x * normLen;;
                        vertices[index++] = comp1 * normLen;;
                        vertices[index++] = comp2 * normLen;;

                        vertices[index++] = tanLen > .007 ? -y / tanLen : 1;
                        vertices[index++] = t1;
                        vertices[index++] = t2;

                    } else {
                        vertices[index++] = x;
                        vertices[index++] = comp1;
                        vertices[index++] = comp2;

                        vertices[index++] = x * normLen;
                        vertices[index++] = comp1 * normLen;
                        vertices[index++] = comp2 * normLen;
                        vertices[index++] = tanLen > .007 ? -y / tanLen : 1;
                        vertices[index++] = t1;
                        vertices[index++] = t2;
                    }

                    if (i > 0 && j > 0) {
                        var a: number = (this._segmentsW + 1) * j + i;
                        var b: number = (this._segmentsW + 1) * j + i - 1;
                        var c: number = (this._segmentsW + 1) * (j - 1) + i - 1;
                        var d: number = (this._segmentsW + 1) * (j - 1) + i;

                        if (j == this._segmentsH) {
                            vertices[index - 9] = vertices[startIndex];
                            vertices[index - 8] = vertices[startIndex + 1];
                            vertices[index - 7] = vertices[startIndex + 2];

                            indices[triIndex++] = a;
                            indices[triIndex++] = d;
                            indices[triIndex++] = c;

                        } else if (j == 1) {
                            indices[triIndex++] = a;
                            indices[triIndex++] = c;
                            indices[triIndex++] = b;

                        } else {
                            indices[triIndex++] = a;
                            indices[triIndex++] = d
                            indices[triIndex++] = c;
                            indices[triIndex++] = a;
                            indices[triIndex++] = c;
                            indices[triIndex++] = b;
                        }
                    }

                    index += skip;
                }

            }

            //var i: number, j: number;
            var stride: number = 17 ;
            var numUvs: number = (this._segmentsH + 1) * (this._segmentsW + 1) * stride;
            var data: Array<number>;
            var skip: number = stride - 2;


            var index: number = 13 ;
            for (j = 0; j <= this._segmentsH; ++j) {
                for (i = 0; i <= this._segmentsW; ++i) {
                    vertices[index++] = (i / this._segmentsW) ;
                    vertices[index++] = (j / this._segmentsH);
                    index += skip;
                }
            }

            this.setGeomtryData(indices, vertices);
        }
    }
}