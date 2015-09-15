var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var HoverController = (function (_super) {
        __extends(HoverController, _super);
        /**
         * Creates a new <code>HoverController</code> object.
         */
        function HoverController(targetObject, lookAtObject, panAngle, tiltAngle, distance, minTiltAngle, maxTiltAngle, minPanAngle, maxPanAngle, steps, yFactor, wrapPanAngle) {
            if (targetObject === void 0) { targetObject = null; }
            if (lookAtObject === void 0) { lookAtObject = null; }
            if (panAngle === void 0) { panAngle = 0; }
            if (tiltAngle === void 0) { tiltAngle = 90; }
            if (distance === void 0) { distance = 1000; }
            if (minTiltAngle === void 0) { minTiltAngle = -90; }
            if (maxTiltAngle === void 0) { maxTiltAngle = 90; }
            if (minPanAngle === void 0) { minPanAngle = NaN; }
            if (maxPanAngle === void 0) { maxPanAngle = NaN; }
            if (steps === void 0) { steps = 8; }
            if (yFactor === void 0) { yFactor = 2; }
            if (wrapPanAngle === void 0) { wrapPanAngle = false; }
            _super.call(this, targetObject, lookAtObject);
            this._currentPanAngle = 0;
            this._currentTiltAngle = 90;
            this._panAngle = 0;
            this._tiltAngle = 90;
            this._distance = 1000;
            this._minPanAngle = -Infinity;
            this._maxPanAngle = Infinity;
            this._minTiltAngle = -90;
            this._maxTiltAngle = 90;
            this._steps = 8;
            this._yFactor = 2;
            this._wrapPanAngle = false;
            this.distance = distance;
            this.panAngle = panAngle;
            this.tiltAngle = tiltAngle;
            this.minPanAngle = minPanAngle || -Infinity;
            this.maxPanAngle = maxPanAngle || Infinity;
            this.minTiltAngle = minTiltAngle;
            this.maxTiltAngle = maxTiltAngle;
            this.steps = steps;
            this.yFactor = yFactor;
            this.wrapPanAngle = wrapPanAngle;
            //values passed in contrustor are applied immediately
            this._currentPanAngle = this.panAngle;
            this._currentTiltAngle = this.tiltAngle;
        }
        Object.defineProperty(HoverController.prototype, "steps", {
            /**
             * Fractional step taken each time the <code>hover()</code> method is called. Defaults to 8.
             *
             * Affects the speed at which the <code>tiltAngle</code> and <code>panAngle</code> resolve to their targets.
             *
             * @see    #tiltAngle
             * @see    #panAngle
             */
            get: function () {
                return this._steps;
            },
            set: function (val) {
                val = (val < 1) ? 1 : val;
                if (this._steps == val)
                    return;
                this._steps = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "panAngle", {
            /**
             * Rotation of the camera in degrees around the y axis. Defaults to 0.
             */
            get: function () {
                return this._panAngle;
            },
            set: function (val) {
                val = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, val));
                if (this._panAngle == val)
                    return;
                this._panAngle = val;
                this.notifyUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "tiltAngle", {
            /**
             * Elevation angle of the camera in degrees. Defaults to 90.
             */
            get: function () {
                return this._tiltAngle;
            },
            set: function (val) {
                val = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, val));
                if (this._tiltAngle == val)
                    return;
                this._tiltAngle = val;
                this.notifyUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "distance", {
            /**
             * Distance between the camera and the specified target. Defaults to 1000.
             */
            get: function () {
                return this._distance;
            },
            set: function (val) {
                if (this._distance == val)
                    return;
                this._distance = val;
                this.notifyUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "minPanAngle", {
            /**
             * Minimum bounds for the <code>panAngle</code>. Defaults to -Infinity.
             *
             * @see    #panAngle
             */
            get: function () {
                return this._minPanAngle;
            },
            set: function (val) {
                if (this._minPanAngle == val)
                    return;
                this._minPanAngle = val;
                this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "maxPanAngle", {
            /**
             * Maximum bounds for the <code>panAngle</code>. Defaults to Infinity.
             *
             * @see    #panAngle
             */
            get: function () {
                return this._maxPanAngle;
            },
            set: function (val) {
                if (this._maxPanAngle == val)
                    return;
                this._maxPanAngle = val;
                this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "minTiltAngle", {
            /**
             * Minimum bounds for the <code>tiltAngle</code>. Defaults to -90.
             *
             * @see    #tiltAngle
             */
            get: function () {
                return this._minTiltAngle;
            },
            set: function (val) {
                if (this._minTiltAngle == val)
                    return;
                this._minTiltAngle = val;
                this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "maxTiltAngle", {
            /**
             * Maximum bounds for the <code>tiltAngle</code>. Defaults to 90.
             *
             * @see    #tiltAngle
             */
            get: function () {
                return this._maxTiltAngle;
            },
            set: function (val) {
                if (this._maxTiltAngle == val)
                    return;
                this._maxTiltAngle = val;
                this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "yFactor", {
            /**
             * Fractional difference in distance between the horizontal camera orientation and vertical camera orientation. Defaults to 2.
             *
             * @see    #distance
             */
            get: function () {
                return this._yFactor;
            },
            set: function (val) {
                if (this._yFactor == val)
                    return;
                this._yFactor = val;
                this.notifyUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "wrapPanAngle", {
            /**
             * Defines whether the value of the pan angle wraps when over 360 degrees or under 0 degrees. Defaults to false.
             */
            get: function () {
                return this._wrapPanAngle;
            },
            set: function (val) {
                if (this._wrapPanAngle == val)
                    return;
                this._wrapPanAngle = val;
                this.notifyUpdate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the current tilt angle and pan angle values.
         *
         * Values are calculated using the defined <code>tiltAngle</code>, <code>panAngle</code> and <code>steps</code> variables.
         *
         * @param interpolate   If the update to a target pan- or tiltAngle is interpolated. Default is true.
         *
         * @see    #tiltAngle
         * @see    #panAngle
         * @see    #steps
         */
        HoverController.prototype.update = function (interpolate) {
            if (interpolate === void 0) { interpolate = true; }
            if (this._tiltAngle != this._currentTiltAngle || this._panAngle != this._currentPanAngle) {
                this.notifyUpdate();
                if (this._wrapPanAngle) {
                    if (this._panAngle < 0)
                        this._panAngle = (this._panAngle % 360) + 360;
                    else
                        this._panAngle = this._panAngle % 360;
                    if (this._panAngle - this._currentPanAngle < -180)
                        this._currentPanAngle -= 360;
                    else if (this._panAngle - this._currentPanAngle > 180)
                        this._currentPanAngle += 360;
                }
                if (interpolate) {
                    this._currentTiltAngle += (this._tiltAngle - this._currentTiltAngle) / (this.steps + 1);
                    this._currentPanAngle += (this._panAngle - this._currentPanAngle) / (this.steps + 1);
                }
                else {
                    this._currentPanAngle = this._panAngle;
                    this._currentTiltAngle = this._tiltAngle;
                }
                //snap coords if angle differences are close
                if ((Math.abs(this.tiltAngle - this._currentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._currentPanAngle) < 0.01)) {
                    this._currentTiltAngle = this._tiltAngle;
                    this._currentPanAngle = this._panAngle;
                }
            }
            var pos = (this.lookAtObject) ? this.lookAtObject.position : (this.lookAtObject) ? this._lookAtPosition : this._origin;
            this.target.x = pos.x + this.distance * Math.sin(this._currentPanAngle * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS);
            this.target.z = pos.z + this.distance * Math.cos(this._currentPanAngle * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS);
            this.target.y = pos.y + this.distance * Math.sin(this._currentTiltAngle * BlackSwan.Matrix3DUtils.DEGREES_TO_RADIANS) * this.yFactor;
            _super.prototype.update.call(this);
        };
        return HoverController;
    })(BlackSwan.LookAtController);
    BlackSwan.HoverController = HoverController;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=HoverController.js.map