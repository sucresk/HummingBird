var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var RoundControl = (function (_super) {
        __extends(RoundControl, _super);
        function RoundControl(view3d) {
            _super.call(this, view3d);
            this._far = 1000;
            this.initView();
        }
        RoundControl.prototype.initView = function () {
            this.m_rec = new BlackSwan.Rectangle(0, 90, this._view3d.width - 300, this._view3d.height - 80);
            this.m_firlst = new BlackSwan.HoverController(this._view3d.camera3D);
            this.m_firlst.distance = this._far;
            this.m_firlst.minTiltAngle = 0;
            this.m_firlst.maxTiltAngle = 90;
            this.m_firlst.panAngle = 45;
            this.m_firlst.tiltAngle = 20;
            this.m_firlst.lookAtPosition = new BlackSwan.Vector3D(0, 35, 0);
        };
        RoundControl.prototype.start = function (angle, distance, wide, locked, lockRect) {
            var _this = this;
            _super.prototype.start.call(this, angle, distance, wide, locked, lockRect);
            window.onmousewheel = function (e) { return _this.__WHEELHandler(e); };
            window.onmousedown = function (e) { return _this.__rightDownHandler(e); };
            window.onmouseup = function (e) { return _this.__rightUpHandler(e); };
            //window.onmousemove = (e: MouseEvent) => this.__upDataHandler(e);
        };
        RoundControl.prototype.stop = function () {
            window.onmousewheel = null;
            window.onmousedown = null;
            window.onmouseup = null;
            window.onmousemove = null;
        };
        //private  checkZoon():boolean {
        //    this.m_rec.x = this._view3d.x;
        //    this.m_rec.y = this._view3d.y;
        //    this.m_rec.width = this._view3d.width;
        //    this.m_rec.height = this._view3d.height;
        //    return this.m_rec.contains(_stage.mouseX, _stage.mouseY);
        //}
        RoundControl.prototype.__WHEELHandler = function (event) {
            //			if( UICanvas.mouse2D ) return ;
            this._far -= event.wheelDelta * 0.1;
            //			if( _far > 150 )
            //				_far = 150 ;
            //			else if( _far < 35 )
            //				_far = 35 ;
            //			TweenMax.to( m_firlst , 0.2 , {distance:_far} );
            this.m_firlst.distance = this._far;
        };
        RoundControl.prototype.__rightUpHandler = function (event) {
            this.m_mouseDown = false;
        };
        RoundControl.prototype.__upDataHandler = function (event) {
            //			if( m_mouseDown )
            //				m_firlst.update()
            if (this.m_mouseDown) {
                this.m_firlst.panAngle = 0.3 * (event.screenX - this.lastMouseX) + this.lastPanAngle;
                this.m_firlst.tiltAngle = 0.3 * (event.screenY - this.lastMouseY) + this.lastTiltAngle;
            }
            this.m_firlst.update();
        };
        RoundControl.prototype.__rightDownHandler = function (event) {
            //if (!checkZoon()) return;
            //			if( !m_rec.contains( _stage.mouseX , _stage.mouseY ) || UICanvas.mouse2D ) return ;
            if (event.button == 2) {
                this.lastPanAngle = this.m_firlst.panAngle;
                this.lastTiltAngle = this.m_firlst.tiltAngle;
                this.lastMouseX = event.screenX;
                this.lastMouseY = event.screenY;
                this.m_mouseDown = true;
            }
        };
        RoundControl.prototype.update = function (timer, elapsed) {
            this.m_firlst.update();
        };
        return RoundControl;
    })(BlackSwan.CameraControllerBase);
    BlackSwan.RoundControl = RoundControl;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=RoundControl.js.map