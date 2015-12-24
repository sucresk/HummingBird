module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.ElevationGeometry
     * @classdesc
     * ElevationGeometry类 表示圆柱体
     */
    export class ElevationGeometry extends GeometryBase {

        private _segmentsW: number;
        private _segmentsH: number;
        private _width: number;
        private _height: number;
        private _depth: number;
        private _minElevation: number;
        private _maxElevation: number;
        private _scaleU: number = 1.0 ;
        private _scaleV: number = 1.0 ;
        private heightmap: TextureBase;

        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;
        private imageData: ImageData; 

        /**
        * @language zh_CN
        * constructor
        * @param heightmap {ImageTexture}
        * @param width {Number}
        * @param height {Number}
        * @param depth {Number}
        * @param segmentsW {Number}
        * @param segmentsH {Number}
        * @param maxElevation {Number}
        * @param minElevation {Number}
        */
        constructor(heightmap: ImageTexture, width: number = 1000, height: number = 100, depth: number = 1000, segmentsW: number = 30, segmentsH: number = 30, maxElevation: number = 255, minElevation: number = 0) {
            super();
            this._segmentsW = segmentsW;
            this._segmentsH = segmentsH;
            this._width = width;
            this._height = height;
            this._depth = depth;
            this._minElevation = minElevation;
            this._maxElevation = maxElevation;
            this.heightmap = heightmap;

            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.canvas.width = heightmap.width;
            this.canvas.height = heightmap.height ;
            this.ctx.drawImage(heightmap.imageData, 0, 0, heightmap.width, heightmap.height);
            document.body.appendChild(this.canvas);
            this.canvas.hidden = true;
            this.imageData = this.ctx.getImageData(0, 0, this.heightmap.imageData.width, this.heightmap.imageData.height);
            this.buildElevationGeometry();
        }

        public buildTerrain(widthSegment: number, heightSegment: number) {

        }

        public getPixel(x: number, z: number): number {
            var index: number = z * (this.heightmap.imageData.width * 4) + x * 4;
            var color: number = this.imageData.data[index + 3] << 24 | this.imageData.data[index + 0] << 16 | this.imageData.data[index + 1] << 8 | this.imageData.data[index + 2];
            return color;
        }

        public getHeightBypos(x: number, z: number): number {
            var color: number = this.getPixel(x, z);

            return (color > this._maxElevation) ? (this._maxElevation / 0xff) * this._height : ((color < this._minElevation) ? (this._minElevation / 0xff) * this._height : (color / 0xff) * this._height);
        }

        private buildElevationGeometry() {
            var vertices: Array<number>;
            var indices: Array<number>;
            var x: number, z: number;
            var numInds: number;
            var base: number;
            var tw: number = this._segmentsW + 1;
            var numVerts: number = (this._segmentsH + 1) * tw;
            var uDiv: number = (this.heightmap.width - 1) / this._segmentsW;
            var vDiv: number = (this.heightmap.height - 1) / this._segmentsH;
            var u: number, v: number;
            var y: number;

            //if (numVerts == this._subGeometry.numVertices) {
            //    vertices = this._subGeometry.vertexData;
            //    indices = this._subGeometry.indexData;
            // } else {
            vertices = new Array<number>(numVerts * 3 );
            indices = new Array<number>(this._segmentsH * this._segmentsW * 6 );
            //}

            numVerts = 0;
            numInds = 0;
            var col: number;

            for (var zi: number = 0; zi <= this._segmentsH; ++zi) {
                for (var xi: number = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - 0.5) * this._width ;
                    z = (zi / this._segmentsH - 0.5) * this._depth ;
                    u = Math.floor(xi * uDiv);
                    v = Math.floor((this._segmentsH - zi) * vDiv);

                    col = this.getPixel(u, v) & 0xff;
                    y = (col > this._maxElevation) ? (this._maxElevation / 0xff) * this._height : ((col < this._minElevation) ? (this._minElevation / 0xff) * this._height : (col / 0xff) * this._height);

                    //pos
                    vertices[numVerts++] = x;
                    vertices[numVerts++] = y;//Math.random() * 1000;;
                    vertices[numVerts++] = z;
                    //normal
                    vertices[numVerts++] = 1.0 ;
                    vertices[numVerts++] = 1.0 ;
                    vertices[numVerts++] = 1.0 ;
                    //tan
                    vertices[numVerts++] = -1.0;
                    vertices[numVerts++] = 0.0;
                    vertices[numVerts++] = 0.0;
                    //color
                    vertices[numVerts++] = 1.0 ;
                    vertices[numVerts++] = 1.0 ;
                    vertices[numVerts++] = 1.0 ;
                    vertices[numVerts++] = 1.0;
                    //uv
                    vertices[numVerts++] = xi / this._segmentsW * this._scaleU;
                    vertices[numVerts++] = zi / this._segmentsH * this._scaleV;
                    vertices[numVerts++] = xi / this._segmentsW ;
                    vertices[numVerts++] = zi / this._segmentsH ;

                    if (xi != this._segmentsW && zi != this._segmentsH) {
                        base = xi + zi * tw;
                        indices[numInds++] = base;
                        indices[numInds++] = base + tw + 1;
                        indices[numInds++] = base + tw;
                        indices[numInds++] = base;
                        indices[numInds++] = base + 1;
                        indices[numInds++] = base + tw + 1;
                    }
                }

            }


            this.indexData = indices;
            this.verticesData = vertices;
            this.numItems = indices.length;
           // this.updateFaceNormals();
            //this._subGeometry.autoDeriveVertexNormals = true;
            //this._subGeometry.autoDeriveVertexTangents = true;
            //this._subGeometry.updateVertexData(vertices);
            //this._subGeometry.updateIndexData(indices);
        }

        private updateFaceNormals() {
            var i: number = 0, j: number = 0, k: number = 0;
            var index: number;
            var len: number = this.indexData.length;
            var x1: number, x2: number, x3: number;
            var y1: number, y2: number, y3: number;
            var z1: number, z2: number, z3: number;
            var dx1: number, dy1: number, dz1: number;
            var dx2: number, dy2: number, dz2: number;
            var cx: number, cy: number, cz: number;
            var d: number;
            var vertices: Array<number> = this.verticesData;
            var posStride: number = 17;
            var posOffset: number = 0;

            while (i < len) {

                index = posOffset + this.indexData[i++] * posStride;
                x1 = vertices[index];
                y1 = vertices[index + 1];
                z1 = vertices[index + 2];
                index = posOffset + this.indexData[i++] * posStride;
                x2 = vertices[index];
                y2 = vertices[index + 1];
                z2 = vertices[index + 2];
                index = posOffset + this.indexData[i++] * posStride;
                x3 = vertices[index];
                y3 = vertices[index + 1];
                z3 = vertices[index + 2];
                dx1 = x3 - x1;
                dy1 = y3 - y1;
                dz1 = z3 - z1;
                dx2 = x2 - x1;
                dy2 = y2 - y1;
                dz2 = z2 - z1;
                cx = dz1 * dy2 - dy1 * dz2;
                cy = dx1 * dz2 - dz1 * dx2;
                cz = dy1 * dx2 - dx1 * dy2;
                d = Math.sqrt(cx * cx + cy * cy + cz * cz);
                // length of cross product = 2*triangle area
                //if (true) {
                //    var w: number = d * 10000;
                //    if (w < 1)
                //        w = 1;
                //    geomtrtData.faceWeights[k++] = w;
                //}
                d = 1 / d;
                vertices[j * posStride + 3 ] = cx * d;
                vertices[j * posStride + 4 ] = cy * d;
                vertices[j * posStride + 5 ] = cz * d;
                j++;
            }
        }
    }
} 