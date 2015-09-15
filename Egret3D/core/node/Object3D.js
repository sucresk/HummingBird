var BlackSwan;
(function (BlackSwan) {
    (function (MouseEventType) {
        MouseEventType[MouseEventType["mouse_Move"] = 0] = "mouse_Move";
        MouseEventType[MouseEventType["mouse_LStart"] = 1] = "mouse_LStart";
        MouseEventType[MouseEventType["mouse_LEnd"] = 2] = "mouse_LEnd";
        MouseEventType[MouseEventType["mouse_RStart"] = 3] = "mouse_RStart";
        MouseEventType[MouseEventType["mouse_REnd"] = 4] = "mouse_REnd";
        MouseEventType[MouseEventType["mouse_DClick"] = 5] = "mouse_DClick";
        MouseEventType[MouseEventType["mouse_Max"] = 6] = "mouse_Max";
    })(BlackSwan.MouseEventType || (BlackSwan.MouseEventType = {}));
    var MouseEventType = BlackSwan.MouseEventType;
    var Object3D = (function () {
        function Object3D() {
            this._childs = new Array();
            this._transform = new BlackSwan.Matrix4_4();
            this._sceneTransform = new BlackSwan.Matrix4_4();
            this._pivotPoint = new BlackSwan.Vector3D();
            this._pivotZero = true;
            this._pos = new BlackSwan.Vector3D();
            this._rot = new BlackSwan.Vector3D();
            this._sca = new BlackSwan.Vector3D(1, 1, 1);
            this._offsetRotion = new BlackSwan.Vector3D();
            this._mIsMatrixDirty = false;
            this._octreeNode = null;
            this.octree = null;
            this.isCut = true; // 是否需要视锥体裁剪;
            this.box = new BlackSwan.CubeBoxBound();
            this.isCheckBox = true;
            this._mouse_func_list = new Array();
            this._transformComponents = new Array();
            this._transformComponents[0] = this._pos;
            this._transformComponents[1] = this._rot;
            this._transformComponents[2] = this._sca;
            for (var i = 0; i < MouseEventType.mouse_Max; ++i) {
                this._mouse_func_list.push(null);
            }
        }
        Object.defineProperty(Object3D.prototype, "parent", {
            set: function (p) {
                this._parent = p;
                this.context3D = p.context3D;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "context3D", {
            get: function () {
                return this._context3D;
            },
            set: function (con) {
                this._context3D = con;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "position", {
            get: function () {
                return this._pos;
            },
            set: function (vec) {
                this._pos = vec;
                if (this.octree != null) {
                    this.octree.checkObject3D(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "x", {
            get: function () {
                return this._pos.x;
            },
            set: function (value) {
                if (this._pos.x == value)
                    return;
                this._pos.x = value;
                this._mIsMatrixDirty = true;
                if (this.octree != null) {
                    this.octree.checkObject3D(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "y", {
            get: function () {
                return this._pos.y;
            },
            set: function (value) {
                if (this._pos.y == value)
                    return;
                this._pos.y = value;
                this._mIsMatrixDirty = true;
                if (this.octree != null) {
                    this.octree.checkObject3D(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "z", {
            get: function () {
                return this._pos.z;
            },
            set: function (value) {
                if (this._pos.z == value)
                    return;
                this._pos.z = value;
                this._mIsMatrixDirty = true;
                if (this.octree != null) {
                    this.octree.checkObject3D(this);
                }
                //if (this.layerFilter != null) {
                //    this.layerFilter.isSort = true;
                //}
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotationX", {
            get: function () {
                return this._rot.x;
            },
            set: function (value) {
                if (this._rot.x == value)
                    return;
                this._rot.x = value;
                this._mIsMatrixDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotationY", {
            get: function () {
                return this._rot.y;
            },
            set: function (value) {
                if (this._rot.y == value)
                    return;
                this._rot.y = value;
                this._mIsMatrixDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotationZ", {
            get: function () {
                return this._rot.z;
            },
            set: function (value) {
                if (this._rot.z == value)
                    return;
                this._rot.z = value;
                this._mIsMatrixDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scaleX", {
            get: function () {
                return this._sca.x;
            },
            set: function (value) {
                if (this._sca.x == value)
                    return;
                this._sca.x = value;
                this._mIsMatrixDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scaleY", {
            get: function () {
                return this._sca.y;
            },
            set: function (value) {
                if (this._sca.y == value)
                    return;
                this._sca.y = value;
                this._mIsMatrixDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scaleZ", {
            get: function () {
                return this._sca.z;
            },
            set: function (value) {
                if (this._sca.z == value)
                    return;
                this._sca.z = value;
                this._mIsMatrixDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "sceneTransform", {
            /**
             * The transformation matrix that transforms from model to world space.
             */
            get: function () {
                if (this._mIsMatrixDirty)
                    this.updateSceneTransform();
                return this._sceneTransform;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the scene transformation matrix.
         */
        Object3D.prototype.updateSceneTransform = function () {
            //if (this._parent && !_parent._isRoot) {
            //    _sceneTransform.copyFrom(_parent.sceneTransform);
            //    _sceneTransform.prepend(transform);
            //} else
            this._sceneTransform.copyFrom(this.transform);
        };
        Object.defineProperty(Object3D.prototype, "transform", {
            /**
             * The transformation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
             */
            get: function () {
                if (this._mIsMatrixDirty)
                    this.updateTransform();
                return this._transform;
            },
            enumerable: true,
            configurable: true
        });
        Object3D.prototype.updateTransform = function () {
            this._transform.recompose(this._transformComponents);
            //this._transform.idObject3D();
            if (!this._pivotZero) {
                this._transform.prependTranslation(-this._pivotPoint.x, -this._pivotPoint.y, -this._pivotPoint.z);
                this._transform.appendTranslation(this._pivotPoint.x, this._pivotPoint.y, this._pivotPoint.z);
            }
            //this._mIsMatrixDirty = false;
        };
        /**
         * Rotates the 3d object around to face a point defined relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         *
         * @param    target        The vector defining the point to be looked at
         * @param    upAxis        An optional vector used to define the desired up orientation of the 3d object after rotation has occurred
         */
        Object3D.prototype.lookAt = function (target, upAxis) {
            if (upAxis === void 0) { upAxis = null; }
            var yAxis, zAxis, xAxis;
            var raw;
            if (!upAxis)
                upAxis = BlackSwan.Vector3D.Y_AXIS;
            zAxis = target.subtract(this._pos);
            zAxis.normalize();
            xAxis = upAxis.crossProduct(zAxis);
            xAxis.normalize();
            if (xAxis.length < .05)
                xAxis = upAxis.crossProduct(BlackSwan.Vector3D.Z_AXIS);
            yAxis = zAxis.crossProduct(xAxis);
            raw = BlackSwan.Matrix3DUtils.RAW_DATA_CONTAINER;
            raw[0] = this._sca.x * xAxis.x;
            raw[1] = this._sca.y * xAxis.y;
            raw[2] = this._sca.z * xAxis.z;
            raw[3] = 0;
            raw[4] = this._sca.x * yAxis.x;
            raw[5] = this._sca.y * yAxis.y;
            raw[6] = this._sca.z * yAxis.z;
            raw[7] = 0;
            raw[8] = this._sca.x * zAxis.x;
            raw[9] = this._sca.y * zAxis.y;
            raw[10] = this._sca.z * zAxis.z;
            raw[11] = 0;
            raw[12] = this._pos.x;
            raw[13] = this._pos.y;
            raw[14] = this._pos.z;
            raw[15] = 1;
            this._transform.copyRawDataFrom(raw);
            this.transform = this.transform;
            if (zAxis.z < 0) {
                this._rot.x = (180 - this._rot.y);
                this._rot.y -= 180;
                this._rot.z -= 180;
            }
        };
        /**
          * Moves the 3d object forwards along it's local z axis
          *
          * @param    distance    The length of the movement
          */
        Object3D.prototype.moveForward = function (distance) {
            this.translateLocal(BlackSwan.Vector3D.Z_AXIS, distance);
        };
        /**
         * Moves the 3d object backwards along it's local z axis
         *
         * @param    distance    The length of the movement
         */
        Object3D.prototype.moveBackward = function (distance) {
            this.translateLocal(BlackSwan.Vector3D.Z_AXIS, -distance);
        };
        /**
         * Moves the 3d object backwards along it's local x axis
         *
         * @param    distance    The length of the movement
         */
        Object3D.prototype.moveLeft = function (distance) {
            this.translateLocal(BlackSwan.Vector3D.X_AXIS, -distance);
        };
        /**
         * Moves the 3d object forwards along it's local x axis
         *
         * @param    distance    The length of the movement
         */
        Object3D.prototype.moveRight = function (distance) {
            this.translateLocal(BlackSwan.Vector3D.X_AXIS, distance);
        };
        /**
         * Moves the 3d object forwards along it's local y axis
         *
         * @param    distance    The length of the movement
         */
        Object3D.prototype.moveUp = function (distance) {
            this.translateLocal(BlackSwan.Vector3D.Y_AXIS, distance);
        };
        /**
         * Moves the 3d object backwards along it's local y axis
         *
         * @param    distance    The length of the movement
         */
        Object3D.prototype.moveDown = function (distance) {
            this.translateLocal(BlackSwan.Vector3D.Y_AXIS, -distance);
        };
        /**
         * Moves the 3d object along a vector by a defined length
         *
         * @param    axis        The vector defining the axis of movement
         * @param    distance    The length of the movement
         */
        Object3D.prototype.translateLocal = function (axis, distance) {
            var x = axis.x, y = axis.y, z = axis.z;
            var len = distance / Math.sqrt(x * x + y * y + z * z);
            this.transform.prependTranslation(x * len, y * len, z * len);
            this._transform.copyColumnTo(3, this._pos);
        };
        Object3D.prototype.addChild = function (child) {
            this._childs.push(child);
            //child.parent = this;
            return child;
        };
        Object3D.prototype.addChildAt = function (child, index) {
            if (index < 0) {
                this._childs.splice(0, 0, child);
            }
            else if (index >= this._childs.length) {
                this._childs.push(child);
            }
            else {
                this._childs.splice(index, 0, child);
            }
            return child;
        };
        Object3D.prototype.getChildAt = function (index) {
            if (index < 0 || index >= this._childs.length)
                return null;
            return this._childs[index];
        };
        Object3D.prototype.getChildIndex = function (child) {
            for (var index = 0; index < this._childs.length; ++index) {
                if (this._childs[index] != child) {
                    continue;
                }
                return index;
            }
            return -1;
        };
        Object3D.prototype.removeChild = function (child) {
            for (var index = 0; index < this._childs.length; ++index) {
                if (this._childs[index] != child) {
                    continue;
                }
                //child.parent = null;
                this._childs.splice(index);
                return child;
            }
            return null;
        };
        Object3D.prototype.removeChildAt = function (index) {
            if (index < 0 || index >= this._childs.length)
                return null;
            var object3D = this._childs[index];
            //object3D.parent = null;
            this._childs.splice(index);
            return object3D;
        };
        Object3D.prototype.setChildIndex = function (child, index) {
            for (var i = 0; i < this._childs.length; ++i) {
                if (this._childs[i] != child) {
                    continue;
                }
                if (i == index) {
                    return;
                }
                else if (index > i) {
                    for (var m = i; m > index; --m) {
                        this._childs[m] = this._childs[m - 1];
                    }
                }
                else if (index < i) {
                    for (var m = i; m < index; ++m) {
                        this._childs[m] = this._childs[m + 1];
                    }
                }
                this._childs[index] = child;
                return;
            }
        };
        Object3D.prototype.swapChildren = function (child1, child2) {
            var index1 = 0, index2 = 0;
            for (; index1 < this._childs.length; ++index1) {
                if (this._childs[index1] != child1) {
                    continue;
                }
                for (; index2 < this._childs.length; ++index2) {
                    if (this._childs[index2] != child2) {
                        continue;
                    }
                    var tmp = this._childs[index1];
                    this._childs[index1] = this._childs[index2];
                    this._childs[index2] = tmp;
                    break;
                }
                return;
            }
        };
        Object3D.prototype.swapChildrenAt = function (index1, index2) {
            if (index1 < 0 || index1 >= this._childs.length)
                return;
            if (index2 < 0 || index2 >= this._childs.length)
                return;
            var tmp = this._childs[index1];
            this._childs[index1] = this._childs[index2];
            this._childs[index2] = tmp;
        };
        Object.defineProperty(Object3D.prototype, "octreeNode", {
            get: function () {
                return this._octreeNode;
            },
            set: function (node) {
                this._octreeNode = node;
            },
            enumerable: true,
            configurable: true
        });
        Object3D.prototype.listenerMouseEvent = function (e, func) {
            this._mouse_func_list[e] = func;
        };
        Object3D.prototype.isMouseEvent = function (e) {
            return (this._mouse_func_list[e] != null);
        };
        Object3D.prototype.onMouseEvent = function (e) {
            if (this._mouse_func_list[e] != null) {
                this._mouse_func_list[e](this);
            }
        };
        return Object3D;
    })();
    BlackSwan.Object3D = Object3D;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Object3D.js.map