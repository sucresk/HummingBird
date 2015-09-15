module BlackSwan {
    export class SphereGeomtry extends SubGeomtry {

        private _r: number = 1.0;
        private _density: number = 10;

        constructor(r: number = 10.0, density:number = 20) {
            super();

            this._r = r;
            this._density = density;

            this.buildGeomtry();
        }

        public buildGeomtry() {

            var vertices = new Array<number>();

            var vertexIndices = new Array<number>();

            var g_rings: number = this._density;
            var g_segments: number = this._density;
            var deltaRing = Math.PI / (g_rings);
            var deltaSegment = 2.0 * Math.PI / g_segments;  

            for (var j= 0; j < g_rings + 1;j++)  
            {
                var radius: number = Math.sin(j * deltaRing);

                var y0: number = Math.cos(j * deltaRing)

                for (var i= 0; i < g_segments + 1;i++)  
                {
                    var x0: number = radius * Math.sin(i * deltaSegment);
                    var z0: number = radius * Math.cos(i * deltaSegment);

                    vertices.push(x0 * this._r, y0 * this._r, z0 * this._r, x0, y0, z0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
                }
            }  

            for (var j= 0; j < g_rings;j++)  
            {
                for (var i= 0; i < (g_segments + 1);i++)  
                {
                    vertexIndices.push(i + j * (g_segments + 1));
                    vertexIndices.push((i + 1) % (g_segments + 1) + j * (g_segments + 1));
                    vertexIndices.push((i + 1) % (g_segments + 1) + (j + 1) * (g_segments + 1));

                    vertexIndices.push(i + j * (g_segments + 1));
                    vertexIndices.push((i + 1) % (g_segments + 1) + (j + 1) * (g_segments + 1));
                    vertexIndices.push(i + (j + 1) * (g_segments + 1));
                }
            }

            this.setGeomtryData(vertexIndices, vertices);
        }
    }
}