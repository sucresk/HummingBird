module BlackSwan {
    export class Camera3D extends Entity{
       
        private _viewPort: Rectangle = new Rectangle();
        private _scissorRect: Rectangle = new Rectangle();
        private _aspectRatio: number;
        public projectMatrix: Matrix4_4 = new Matrix4_4();
        private temp: Matrix4_4 = new Matrix4_4();
        constructor() {

            super();
            this._modeMatrix3D.lookAt(new Vector3D(0.0, 0.0, -150.0), new Vector3D(0.0, 0.0, 0.0), new Vector3D(0, 1, 0));
           
        }

        public set aspectRatio(value: number) {
            this._aspectRatio = value;
            this.projectMatrix.perspective(45, value , 1, 30000);
        }

        public set fieldOfView(value: number) {
        }

        public get fieldOfView(): number {
            return 60 ;
        }

        public set focalLength(value: number) {
        
        }

        public get focalLength(): number {
            return 45 ;
        }

      

        public get viewProjectionMatrix(): Matrix4_4 {
            this.temp.copyFrom(this.modelMatrix);
            this.temp.lookAt(new Vector3D(0.0, 500.0, -500 ), new Vector3D(0.0, 0.0, 0.0), new Vector3D(0, 1, 0));
            this.temp.append(this.projectMatrix);
            return this.temp ;
        }

        public updateScissorRect(x: number, y: number, width: number, height: number) {
            this._scissorRect.x = x;
            this._scissorRect.y = y;
            this._scissorRect.width = width;
            this._scissorRect.height = height;
        }

       public updateViewport(x: number, y: number, width: number, height: number) {
           this._viewPort.x = x;
           this._viewPort.y = y;
           this._viewPort.width = width;
           this._viewPort.height = height;
       }

    }
} 