var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var FreeCameraControl = (function (_super) {
        __extends(FreeCameraControl, _super);
        function FreeCameraControl(view3d) {
            _super.call(this, view3d);
            this._moveSpeed = 3;
            this._moveDetail = new BlackSwan.Vector3D();
            this._screenMoveStartDetail = new BlackSwan.Point();
            this._screenMoveDelay = new BlackSwan.Point();
            this._mouseDown = false;
            this.initView();
        }
        FreeCameraControl.prototype.initView = function () {
        };
        FreeCameraControl.prototype.start = function (angle, distance, wide, locked, lockRect) {
            var _this = this;
            _super.prototype.start.call(this, angle, distance, wide, locked, lockRect);
            window.onmousewheel = function (e) { return _this.mouseWheel(e); };
            window.onkeydown = function (e) { return _this.keyDown(e); };
            window.onkeyup = function (e) { return _this.keyUp(e); };
            window.onmousedown = function (e) { return _this.mouseStart(e); };
            window.onmouseup = function (e) { return _this.mouseEnd(e); };
            window.onmousemove = function (e) { return _this.mouseMove(e); };
        };
        FreeCameraControl.prototype.stop = function () {
        };
        FreeCameraControl.prototype.mouseEnd = function (e) {
            this._mouseDown = false;
            if (e.button == 0) {
                this._view3d.onMouseEvent(BlackSwan.MouseEventType.mouse_LEnd);
            }
            else {
                this._view3d.onMouseEvent(BlackSwan.MouseEventType.mouse_REnd);
            }
        };
        FreeCameraControl.prototype.mouseStart = function (e) {
            this._mouseDown = true;
            this._screenMoveStartDetail.x = e.screenX;
            this._screenMoveStartDetail.y = e.screenY;
            if (e.button == 0) {
                this._view3d.onMouseEvent(BlackSwan.MouseEventType.mouse_LStart);
            }
            else {
                this._view3d.onMouseEvent(BlackSwan.MouseEventType.mouse_RStart);
            }
        };
        FreeCameraControl.prototype.mouseMove = function (e) {
            BlackSwan.Egret3D.mouseX = e.clientX - BlackSwan.Egret3D.clientRect.left;
            BlackSwan.Egret3D.mouseY = e.clientY - BlackSwan.Egret3D.clientRect.top;
            this._view3d.onMouseEvent(BlackSwan.MouseEventType.mouse_Move);
            if (this._mouseDown) {
                this._screenMoveDelay.x = e.screenX - this._screenMoveStartDetail.x;
                this._screenMoveDelay.y = e.screenY - this._screenMoveStartDetail.y;
                this._view3d.camera3D.rotationY += this._screenMoveDelay.x * 0.005;
                this._view3d.camera3D.rotationX += this._screenMoveDelay.y * 0.005;
                this._screenMoveStartDetail.x = e.screenX;
                this._screenMoveStartDetail.y = e.screenY;
            }
        };
        FreeCameraControl.prototype.keyDown = function (e) {
            switch (e.keyCode) {
                case 87:
                    this._moveDetail.z = this._moveSpeed;
                    break;
                case 65:
                    this._moveDetail.x = this._moveSpeed;
                    break;
                case 83:
                    this._moveDetail.z = -this._moveSpeed;
                    break;
                case 68:
                    this._moveDetail.x = -this._moveSpeed;
                    break;
            }
        };
        FreeCameraControl.prototype.keyUp = function (e) {
            switch (e.keyCode) {
                case 87:
                    this._moveDetail.z = 0;
                    break;
                case 65:
                    this._moveDetail.x = 0;
                    break;
                case 83:
                    this._moveDetail.z = 0;
                    break;
                case 68:
                    this._moveDetail.x = 0;
                    break;
            }
        };
        FreeCameraControl.prototype.mouseWheel = function (e) {
            this._view3d.camera3D.rotationY += e.wheelDelta * 0.0001;
            //this._view3d.camera3D.z += e.wheelDelta;
        };
        FreeCameraControl.prototype.update = function (timer, elapsed) {
            this._view3d.camera3D.moveLeft(this._moveDetail.x);
            this._view3d.camera3D.moveForward(this._moveDetail.z);
        };
        return FreeCameraControl;
    })(BlackSwan.CameraControllerBase);
    BlackSwan.FreeCameraControl = FreeCameraControl;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=FreeCameraControl.js.map