var BlackSwan;
(function (BlackSwan) {
    var ControllerBase = (function () {
        /**
         * Base controller class for dynamically adjusting the propeties of a 3D object.
         *
         * @param    targetObject    The 3D object on which to act.
         */
        function ControllerBase(targetObject) {
            if (targetObject === void 0) { targetObject = null; }
            this._autoUpdate = true;
            this._target = targetObject;
        }
        Object.defineProperty(ControllerBase.prototype, "target", {
            /**
             * Target object on which the controller acts. Defaults to null.
             */
            get: function () {
                return this._target;
            },
            set: function (val) {
                if (this._target == val)
                    return;
                //if (this._target && _autoUpdate)
                //    this._target._controller = null;
                this._target = val;
                //if (this._target && _autoUpdate)
                //    this._target._controller = this;
                //notifyUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControllerBase.prototype, "autoUpdate", {
            /**
             * Determines whether the controller applies updates automatically. Defaults to true
             */
            get: function () {
                return this._autoUpdate;
            },
            set: function (val) {
                if (this._autoUpdate == val)
                    return;
                this._autoUpdate = val;
                //if (this._target) {
                //    if (_autoUpdate)
                //        this._target._controller = this;
                //    else
                //        this._target._controller = null;
                //}
            },
            enumerable: true,
            configurable: true
        });
        ControllerBase.prototype.notifyUpdate = function () {
            //if (_targetObject && _targetObject.implicitPartition && _autoUpdate)
            //    _targetObject.implicitPartition.markForUpdate(_targetObject);
        };
        /**
         * Manually applies updates to the target 3D object.
         */
        ControllerBase.prototype.update = function (interpolate) {
            if (interpolate === void 0) { interpolate = true; }
            //throw null ;
        };
        return ControllerBase;
    })();
    BlackSwan.ControllerBase = ControllerBase;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=ControllerBase.js.map