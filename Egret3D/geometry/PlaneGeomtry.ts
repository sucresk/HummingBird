module Egret3D {
    export class PlaneGeomtry extends SubGeomtry {

        private _segmentsW: number = 1;
        private _segmentsH: number = 1;
        private _width: number = 500.0;
        private _height: number = 500.0;
        private _scaleU: number = 1; 
        private _scaleV: number = 1; 
        private _rotation: Vector3D;
        constructor(width: number = 500, height: number = 500, segmentsW: number = 1, segmentsH: number = 1, uScale: number = 1, vScale: number = 1 ) {
            super();
            this._width = width;
            this._height = height;
            this._segmentsW = segmentsW;
            this._segmentsH = segmentsH;
            this._scaleU = uScale;
            this._scaleV = vScale;

            this.buildGeometry();
        }

        private buildGeometry(): void {
            var vertices: Array<number>;
            var indices: Array<number>;
            var x: number, y: number;
            var numIndices: number;
            var base: number;
            var tw: number = this._segmentsW + 1;
            var numVertices: number = (this._segmentsH + 1) * tw;
            var stride: number = this.vertexAttLength;
            var skip: number = stride - 15;

            numIndices = this._segmentsH * this._segmentsW * 6;

            vertices = new Array<number>(numVertices * stride);
            indices = new Array<number>(numIndices);

            numIndices = 0;
            var point: Vector3D = new Vector3D();
            var index: number = 0;
            for (var yi: number = 0; yi <= this._segmentsH; ++yi) {
                for (var xi: number = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - .5) * this._width;
                    y = (yi / this._segmentsH - .5) * this._height;
                
                    vertices[index++] = x;
                    vertices[index++] = 0;
                    vertices[index++] = y;

                    vertices[index++] = 0;
                    vertices[index++] = 1;
                    vertices[index++] = 0;

                    vertices[index++] = 1;
                    vertices[index++] = 0;
                    vertices[index++] = 0;

                    vertices[index++] = 1;
                    vertices[index++] = 1;
                    vertices[index++] = 1;
                    vertices[index++] = 1;

                    vertices[index++] = (xi / this._segmentsW) * this._scaleU ;
                    vertices[index++] = (1 - yi / this._segmentsH) * this._scaleV ;

                    index += skip;

                    if (xi != this._segmentsW && yi != this._segmentsH) {
                        base = xi + yi * tw;
                        var mult: number = 1;

                        indices[numIndices++] = base * mult;
                        indices[numIndices++] = (base + tw + 1) * mult;
                        indices[numIndices++] = (base + tw) * mult;

                        indices[numIndices++] = base * mult;
                        indices[numIndices++] = (base + 1) * mult;
                        indices[numIndices++] = (base + tw + 1) * mult;

                    }
                }
            }

            this.setGeomtryData(indices, vertices);
            this.buildBoundBox(this.vertexAttLength);

        }
    }
}