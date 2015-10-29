module BlackSwan {
    export class PlaneGeomtry extends SubGeomtry {
        
        private w: number = 500.0;
        private h: number = 500.0;
        constructor() {
            super();
            this.buildGeomtry();
        }

        public buildGeomtry() {
            var vertices = new Array<number>();
            vertices.push(
                -this.w, 0.0, -this.h,  0.0, 1.0, 0.0, 0.0, 0.0, 0.0,  1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this.w, 0.0, -this.h,   0.0, 1.0, 0.0, 0.0, 0.0, 0.0,    1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this.w, 0.0, this.h,    0.0, 1.0, 0.0, 0.0, 0.0, 0.0,    1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this.w, 0.0, this.h,   0.0, 1.0, 0.0, 0.0, 0.0, 0.0,   1, 1, 1, 1, 1.0, 1.0, 0, 0
                );

            var cubeVertexIndices = new Array<number>();
            cubeVertexIndices.push(
                0, 3, 1,
                3 , 2 , 1
                );

            this.setGeomtryData(cubeVertexIndices, vertices);
            this.buildBoundBox(this.vertexAttLength);
        }
    }
}