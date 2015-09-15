var BlackSwan;
(function (BlackSwan) {
    var PerspectiveMatrix = (function () {
        function PerspectiveMatrix(fieldOfView) {
            if (fieldOfView === void 0) { fieldOfView = 60; }
            this._near = 1;
            this._far = 300000;
            this._aspectRatio = 1;
            this._matrixInvalid = true;
            this._scissorRect = new BlackSwan.Rectangle();
            this._viewPort = new BlackSwan.Rectangle();
            this._matrix = new BlackSwan.Matrix4_4();
            this.fieldOfView = fieldOfView;
        }
        Object.defineProperty(PerspectiveMatrix.prototype, "near", {
            get: function () {
                return this._near;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PerspectiveMatrix.prototype, "far", {
            get: function () {
                return this._far;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PerspectiveMatrix.prototype, "fieldOfView", {
            get: function () {
                return this._fieldOfView;
            },
            set: function (value) {
                if (this._fieldOfView != value) {
                    this._matrixInvalid = true;
                    this._fieldOfView = value;
                    this._focalLengthInv = Math.tan(this._fieldOfView * Math.PI / 360);
                    this._focalLength = 1 / this._focalLengthInv;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PerspectiveMatrix.prototype, "focalLength", {
            get: function () {
                return this._focalLength;
            },
            set: function (value) {
                if (this._fieldOfView != value) {
                    this._matrixInvalid = true;
                    this._focalLength = value;
                    this._focalLengthInv = 1 / this._focalLength;
                    this._fieldOfView = Math.atan(this._focalLengthInv) * 360 / Math.PI;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PerspectiveMatrix.prototype, "matrix", {
            /**
             * The projection matrix that transforms 3D geometry to normalized homogeneous coordinates.
             */
            get: function () {
                if (this._matrixInvalid) {
                    this.notifyUpdateMatrix();
                    this._matrixInvalid = false;
                }
                return this._matrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PerspectiveMatrix.prototype, "aspectRatio", {
            /**
            * The aspect ratio (width/height) of the view
            */
            get: function () {
                return this._aspectRatio;
            },
            /**
           * The aspect ratio (width/height) of the view
           */
            set: function (value) {
                if (this._aspectRatio == value || (value * 0) != 0)
                    return;
                this._aspectRatio = value;
                this._matrixInvalid = true;
            },
            enumerable: true,
            configurable: true
        });
        PerspectiveMatrix.prototype.updateMatrix = function (viewport, scissorRect) {
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
        };
        PerspectiveMatrix.prototype.notifyUpdateMatrix = function () {
            this._matrix.rawData = BlackSwan.Matrix3DUtils.RAW_DATA_CONTAINER;
            this._yMax = this._near * this._focalLengthInv;
            this._xMax = this._yMax * this._aspectRatio;
            var left, right, top, bottom;
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
            }
            else {
                // assume scissored frustum
                var xWidth = this._xMax * (this._viewPort.width / this._scissorRect.width);
                var yHgt = this._yMax * (this._viewPort.height / this._scissorRect.height);
                var center = this._xMax * (this._scissorRect.x * 2 - this._viewPort.width) / this._scissorRect.width + this._xMax;
                var middle = -this._yMax * (this._scissorRect.y * 2 - this._viewPort.height) / this._scissorRect.height - this._yMax;
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
        };
        return PerspectiveMatrix;
    })();
    BlackSwan.PerspectiveMatrix = PerspectiveMatrix;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=PerspectiveMatrix.js.map