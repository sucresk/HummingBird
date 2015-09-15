var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var LookAtController = (function (_super) {
        __extends(LookAtController, _super);
        /**
         * Creates a new <code>LookAtController</code> object.
         */
        function LookAtController(targetObject, lookAtObject) {
            if (targetObject === void 0) { targetObject = null; }
            if (lookAtObject === void 0) { lookAtObject = null; }
            _super.call(this, targetObject);
            this._origin = new BlackSwan.Vector3D(0.0, 0.0, 0.0);
            if (lookAtObject)
                this.lookAtObject = lookAtObject;
            else
                this.lookAtPosition = new BlackSwan.Vector3D();
        }
        Object.defineProperty(LookAtController.prototype, "lookAtPosition", {
            /**
         * The Vector3D object that the target looks at.
         */
            get: function () {
                return this._lookAtPosition;
            },
            set: function (val) {
                if (this._lookAtObject) {
                    this._lookAtObject = null;
                }
                this._lookAtPosition = val;
                this.notifyUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LookAtController.prototype, "lookAtObject", {
            /**
             * The 3d object that the target looks at.
             */
            get: function () {
                return this._lookAtObject;
            },
            set: function (val) {
                if (this._lookAtPosition)
                    this._lookAtPosition = null;
                if (this._lookAtObject == val)
                    return;
                this._lookAtObject = val;
                this.notifyUpdate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritDoc
         */
        LookAtController.prototype.update = function (interpolate) {
            if (interpolate === void 0) { interpolate = true; }
            interpolate = interpolate; // prevents unused warning
            if (this._target) {
                if (this._lookAtPosition)
                    this._target.lookAt(this._lookAtPosition);
                else if (this._lookAtObject)
                    this._target.lookAt(this._lookAtObject.position);
            }
        };
        return LookAtController;
    })(BlackSwan.ControllerBase);
    BlackSwan.LookAtController = LookAtController;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=LookAtController.js.map