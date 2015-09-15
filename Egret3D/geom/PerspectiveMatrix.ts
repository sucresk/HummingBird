module BlackSwan {
    export class PerspectiveMatrix {

        private _matrix: Matrix4_4;

        private _fieldOfView: number;

        private _focalLength: number;

        private _focalLengthInv: number;

        private _yMax: number;

        private _xMax: number;

        private _projectionCenter: Vector3D;

        private _near: number = 1;

        private _far: number = 300000;

        private _aspectRatio: number = 1;

        private _matrixInvalid: boolean = true;

        private _scissorRect: Rectangle = new Rectangle();

        private _viewPort: Rectangle = new Rectangle();

        constructor(fieldOfView: number = 60) {

            this._matrix = new Matrix4_4();

            this.fieldOfView = fieldOfView;
           
        }

        public get near() {
            return this._near;
        }

        public get far() {
            return this._far;
        }

        public set fieldOfView(value: number) {
            if (this._fieldOfView != value) {
                this._matrixInvalid = true;
                this._fieldOfView = value;

                this._focalLengthInv = Math.tan(this._fieldOfView * Math.PI / 360);
                this._focalLength = 1 / this._focalLengthInv;
            }
        }

        public get fieldOfView(): number {
            return this._fieldOfView;
        }

        public set focalLength(value: number) {
            if (this._fieldOfView != value) {
                this._matrixInvalid = true;
                this._focalLength = value;

                this._focalLengthInv = 1 / this._focalLength;
                this._fieldOfView = Math.atan(this._focalLengthInv) * 360 / Math.PI;
            }
        }

        public get focalLength(): number {
            return this._focalLength;
        }

        /**
		 * The projection matrix that transforms 3D geometry to normalized homogeneous coordinates.
		 */
        public get matrix(): Matrix4_4 {
            if (this._matrixInvalid) {
                this.notifyUpdateMatrix();
                this._matrixInvalid = false;
            }
            return this._matrix;
        }

        /**
        * The aspect ratio (width/height) of the view
        */
        public get aspectRatio(): number {
            return this._aspectRatio;
        }

         /**
        * The aspect ratio (width/height) of the view
        */
        public set aspectRatio(value: number){
            if (this._aspectRatio == value || (value * 0) != 0)
                return;
            this._aspectRatio = value;
            this._matrixInvalid = true;
        }

        public updateMatrix(viewport: Rectangle, scissorRect: Rectangle) {

            if (this._scissorRect === scissorRect) { }
            else {
                this._matrixInvalid = true;
            }
            
            if (this._viewPort === viewport) { }
            else {
                this._matrixInvalid = true;
            }

            if (this._matrixInvalid)
                this.notifyUpdateMatrix();
        }

        private notifyUpdateMatrix(): void {
           
            this._matrix.rawData = Matrix3DUtils.RAW_DATA_CONTAINER;

            this._yMax = this._near * this._focalLengthInv;

            this._xMax = this._yMax * this._aspectRatio;

            var left: number, right: number, top: number, bottom: number;

            if (this._scissorRect.x == 0 && this._scissorRect.y == 0 && this._scissorRect.width == this._viewPort.width && this._scissorRect.height == this._viewPort.height) {
                // assume unscissored frustum
                left = -this._xMax;
                right = this._xMax;
                top = -this._yMax;
                bottom = this._yMax;
                // assume unscissored frustum
                this._matrix.rawData[0] = this._near / this._xMax;
                this._matrix.rawData[5] = this._near / this._yMax;
                this._matrix.rawData[10] = this._far / (this._far - this._near);
                this._matrix.rawData[11] = 1;
                this._matrix.rawData[1] = this._matrix.rawData[2] = this._matrix.rawData[3] = this._matrix.rawData[4] =
                this._matrix.rawData[6] = this._matrix.rawData[7] = this._matrix.rawData[8] = this._matrix.rawData[9] =
                this._matrix.rawData[12] = this._matrix.rawData[13] = this._matrix.rawData[15] = 0;
                this._matrix.rawData[14] = -this._near * this._matrix.rawData[10];
            } else {
                // assume scissored frustum
                var xWidth: number = this._xMax * (this._viewPort.width / this._scissorRect.width);
                var yHgt: number = this._yMax * (this._viewPort.height / this._scissorRect.height);
                var center: number = this._xMax * (this._scissorRect.x * 2 - this._viewPort.width) / this._scissorRect.width + this._xMax;
                var middle: number = -this._yMax * (this._scissorRect.y * 2 - this._viewPort.height) / this._scissorRect.height - this._yMax;

                left = center - xWidth;
                right = center + xWidth;
                top = middle - yHgt;
                bottom = middle + yHgt;

                this._matrix.rawData[0] = 2 * this._near / (right - left);
                this._matrix.rawData[5] = 2 * this._near / (bottom - top);
                this._matrix.rawData[8] = (right + left) / (right - left);
                this._matrix.rawData[9] = (bottom + top) / (bottom - top);
                this._matrix.rawData[10] = (this._far + this._near) / (this._far - this._near);
                this._matrix.rawData[11] = 1;
                this._matrix.rawData[1] = this._matrix.rawData[2] = this._matrix.rawData[3] = this._matrix.rawData[4] =
                this._matrix.rawData[6] = this._matrix.rawData[7] = this._matrix.rawData[12] = this._matrix.rawData[13] = this._matrix.rawData[15] = 0;
                this._matrix.rawData[14] = -2 * this._far * this._near / (this._far - this._near);
            }

            this._matrixInvalid = false;
        }
    }
}