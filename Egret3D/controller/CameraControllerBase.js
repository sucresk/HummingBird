var BlackSwan;
(function (BlackSwan) {
    var CameraControllerBase = (function () {
        function CameraControllerBase(view3d) {
            //protected  _cameraAnim:CameraAnim;
            this._lookAtPos = new BlackSwan.Vector3D;
            this._view3d = view3d;
            this._target = null;
            this._angle = 0;
            this._distance = 0;
            this._wide = 0;
            this._locked = false;
            this._lockRect = null;
            this._cameraMoveHandler = null;
            this._lockTarget = false;
            //_cameraAnim = new CameraAnim();
        }
        CameraControllerBase.prototype.start = function (angle, distance, wide, locked, lockRect) {
            this._angle = angle;
            this._distance = distance;
            this._wide = wide;
            this._locked = locked;
            this._lockRect = lockRect;
        };
        CameraControllerBase.prototype.update = function (timer, elapsed) {
        };
        CameraControllerBase.prototype.setCameraLookAtPos = function (pos) {
        };
        CameraControllerBase.prototype.getCameraPos = function () {
            return this._view3d.camera3D.position;
        };
        Object.defineProperty(CameraControllerBase.prototype, "target", {
            get: function () {
                return this._target;
            },
            set: function (obj) {
                this._target = obj;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CameraControllerBase.prototype, "lockTarget", {
            get: function () {
                return this._lockTarget;
            },
            set: function (value) {
                this._lockTarget = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CameraControllerBase.prototype, "cameraMoveHandler", {
            get: function () {
                return this._cameraMoveHandler;
            },
            set: function (handler) {
                this._cameraMoveHandler = handler;
            },
            enumerable: true,
            configurable: true
        });
        return CameraControllerBase;
    })();
    BlackSwan.CameraControllerBase = CameraControllerBase;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=CameraControllerBase.js.map