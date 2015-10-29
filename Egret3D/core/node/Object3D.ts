module Egret3D {
    export enum MouseEventType {
        mouse_Move,             /// 鼠标移动;
        mouse_LStart,           /// 鼠标左键点击;
        mouse_LEnd,             /// 鼠标左键弹起;
        mouse_RStart,           /// 鼠标右键按下;
        mouse_REnd,             /// 鼠标右键弹起;
        mouse_DClick,           /// 鼠标双击;
        mouse_Max,
    }

    export class Object3D {
        public static renderListChange: boolean = true;
        static s_id: number = 0;

        protected _modeMatrix3D: Matrix4_4 = new Matrix4_4();
        protected _transformChange: boolean = false;
        protected _pivotPoint: Vector3D = new Vector3D();
        protected _pivotZero: Boolean = true;
        protected _pos: Vector3D = new Vector3D();
        protected _rot: Vector3D = new Vector3D();
        protected _sca: Vector3D = new Vector3D(1, 1, 1);
        protected _pivot: Vector3D = new Vector3D();
        protected _worldPosition: Vector3D = new Vector3D();
        protected _qut: Quaternion = new Quaternion();
        protected _offsetRotion: Vector3D = new Vector3D();
        protected _transformComponents: Array<Vector3D>;
        protected _globalTransform: Array<Vector3D>;
        protected _localMatrix = new Matrix4_4();
        protected _active: boolean = false;

        public name: string;
        public id: number;
        public layer: number = 0x00000000;
        public mouseEnable: boolean = false;
        public renderLayer: number;
        public isCut: boolean = true; /// 是否需要视锥体裁剪;
        public parent: Object3D;
        public childs: Array<Object3D> = new Array<Object3D>();
        public animation: IAnimation = null;
        public geometry: GeometryBase = null;
        public material: MaterialBase = null;
        public box: CubeBoxBound = new CubeBoxBound();
        public isCheckBox = true;
        public octreeNodes: Array<OctreeNode> = null;
        public pickerData: PickResult = new PickResult();
        public isController: boolean = true;
        public isVisible: boolean = true;
        public isDisable: boolean = false;

        private _worldBox: CubeBoxBound = new CubeBoxBound();
        private _mouse_func_list: Array<Function> = new Array<Function>();

        private eventlist: Object = {};
        constructor() {
            this.id = ++Object3D.s_id;

            this._modeMatrix3D.identity();

            this._transformComponents = new Array<Vector3D>();
            this._transformComponents[0] = this._pos;
            this._transformComponents[1] = this._rot;
            this._transformComponents[2] = this._sca;

            this._globalTransform = new Array<Vector3D>();
            this._globalTransform[0] = new Vector3D();
            this._globalTransform[1] = new Vector3D();
            this._globalTransform[2] = new Vector3D(1, 1, 1);

            for (var i: number = 0; i < MouseEventType.mouse_Max; ++i) {
                this._mouse_func_list.push(null);
            }
        }

        public get position(): Vector3D {
            return this._pos;
        }

        public set position(vec: Vector3D) {
            this.updateTransformChange(this, true);
            this._pos.copyFrom(vec);
            this._transformChange = true; 
        }

        public get worldPosition(): Vector3D {
            this._worldPosition.copyFrom(this.position);

            var obj: Object3D = this;
            while (obj.parent != null) {
                this._worldPosition.copyFrom(this._worldPosition.add(obj.parent.position));
                obj = obj.parent;
            }

            return this._worldPosition;
        }

        public get rotation(): Vector3D {
            return this._rot;
        }

        public set rotation(value: Vector3D) {
            this._rot.x = value.x;
            this._rot.y = value.y;
            this._rot.z = value.z;
            this.updateTransformChange(this, true);
            this._transformChange = true; 
        }

        public get scale(): Vector3D {
            return this._sca;
        }

        public set scale(val: Vector3D) {
            this._sca = val;
            this._transformChange = true; 
        }

        public set x(value: number) {
            this.updateTransformChange(this, true);

            if (this._pos.x == value)
                return;

            this._pos.x = value;
            this._transformChange = true; 
        }

        public set y(value: number) {
            this.updateTransformChange(this, true);

            if (this._pos.y == value)
                return;

            this._pos.y = value;
            this._transformChange = true; 

        }

        public set z(value: number) {
            this.updateTransformChange(this, true);

            if (this._pos.z == value)
                return;

            this._pos.z = value;
            this._transformChange = true; 

        }

        public set rotationX(value: number) {
            this.updateTransformChange(this, true);

            if (this._rot.x == value)
                return;

            this._rot.x = value;
            this._qut.fromEulerAngles(this._rot.x * (Math.PI / 180), this._rot.y * (Math.PI / 180), this._rot.z * (Math.PI / 180));
            this._transformChange = true; 

        }

        public set rotationY(value: number) {
            this.updateTransformChange(this, true);

            if (this._rot.y == value)
                return;

            this._rot.y = value;
            this._qut.fromEulerAngles(this._rot.x * (Math.PI / 180), this._rot.y * (Math.PI / 180), this._rot.z * (Math.PI / 180));
            this._transformChange = true; 

        }

        public set rotationZ(value: number) {
            this.updateTransformChange(this, true);

            if (this._rot.z == value)
                return;

            this._rot.z = value;
            this._qut.fromEulerAngles(this._rot.x * (Math.PI / 180), this._rot.y * (Math.PI / 180), this._rot.z * (Math.PI / 180));
            this._transformChange = true; 

        }

        public set scaleX(value: number) {
            this.updateTransformChange(this, true);

            if (this._sca.x == value)
                return;

            this._sca.x = value;
            this._transformChange = true; 

        }

        public set scaleY(value: number) {
            this.updateTransformChange(this, true);

            if (this._sca.y == value)
                return;

            this._sca.y = value;
            this._transformChange = true; 

        }

        public set scaleZ(value: number) {
            this.updateTransformChange(this, true);

            if (this._sca.z == value)
                return;

            this._sca.z = value;
            this._transformChange = true; 

        }

        public get x(): number {
            return this._pos.x;
        }

        public get y(): number {
            return this._pos.y;
        }

        public get z(): number {
            return this._pos.z
        }

        public get rotationX(): number {
            return this._rot.x;
        }

        public get rotationY(): number {
            return this._rot.y;
        }

        public get rotationZ(): number {
            return this._rot.z;
        }

        public get scaleX(): number {
            return this._sca.x;
        }

        public get scaleY(): number {
            return this._sca.y;
        }

        public get scaleZ(): number {
            return this._sca.z;
        }

        public get modelMatrix(): Matrix4_4 {
            if (this._transformChange) {
                this.updateModleMatrix();
                ///this._worldBox.copyFrom(this.box.Transform(this._modeMatrix3D));
                this._transformChange = false;
            }
            return this._modeMatrix3D;
        }

        public get globalPosition(): Vector3D {
            return new Vector3D(this.modelMatrix[12], this.modelMatrix[13], this.modelMatrix[14]);
        }

        public get globalRotation(): Vector3D {
            var mat: Matrix4_4 = new Matrix4_4();
            mat.identity();
            this.calculateRotation(mat);
            this._qut.fromMatrix(mat);
            return this._qut.toEulerAngles();;
        }

        public get globalScale(): Vector3D {
            var scale: Vector3D = new Vector3D(1, 1, 1);
            this.calculateScale(scale);
            return scale;
        }

        private calculateScale(scale: Vector3D) {
            scale.x *= this._sca.x;
            scale.y *= this._sca.y;
            scale.z *= this._sca.z;
            if (this.parent) {
                this.parent.calculateScale(scale);
            }
        }

        private calculateRotation(mat: Matrix4_4) {
            this._localMatrix.identity();
            this._localMatrix.appendRotation(this._rot.x, Vector3D.X_AXIS);
            this._localMatrix.appendRotation(this._rot.y, Vector3D.Y_AXIS);
            this._localMatrix.appendRotation(this._rot.z, Vector3D.Z_AXIS);
            mat.append(this._localMatrix);

            if (this.parent) {
                this.parent.calculateRotation(mat);
            }
        }

        public get worldBox(): CubeBoxBound {

            var mat: Matrix4_4 = new Matrix4_4();
            mat.identity();
            mat.rawData[12] = this.modelMatrix.rawData[12];
            mat.rawData[13] = this.modelMatrix.rawData[13];
            mat.rawData[14] = this.modelMatrix.rawData[14];

            mat.rawData[0] = this._sca.x;
            mat.rawData[5] = this._sca.y;
            mat.rawData[10] = this._sca.z;

            this._worldBox.copyFrom(this.box.Transform(mat));

            return this._worldBox;
        }

        /**
          * Moves the 3d object forwards along it's local z axis
          *
          * @param    distance    The length of the movement
          */
        public moveForward(distance: number) {
            this.translateLocal(Vector3D.Z_AXIS, distance);
        }
		
        /**
         * Moves the 3d object backwards along it's local z axis
         *
         * @param    distance    The length of the movement
         */
        public moveBackward(distance: number) {
            this.translateLocal(Vector3D.Z_AXIS, -distance);
        }
		
        /**
         * Moves the 3d object backwards along it's local x axis
         *
         * @param    distance    The length of the movement
         */
        public moveLeft(distance: number) {
            this.translateLocal(Vector3D.X_AXIS, -distance);
        }
		
        /**
         * Moves the 3d object forwards along it's local x axis
         *
         * @param    distance    The length of the movement
         */
        public moveRight(distance: number) {
            this.translateLocal(Vector3D.X_AXIS, distance);
        }
		
        /**
         * Moves the 3d object forwards along it's local y axis
         *
         * @param    distance    The length of the movement
         */
        public moveUp(distance: number) {
            this.translateLocal(Vector3D.Y_AXIS, distance);
        }
		
        /**
         * Moves the 3d object backwards along it's local y axis
         *
         * @param    distance    The length of the movement
         */
        public moveDown(distance: number) {
            this.translateLocal(Vector3D.Y_AXIS, -distance);
        }
		
        /**
         * Moves the 3d object along a vector by a defined length
         *
         * @param    axis        The vector defining the axis of movement
         * @param    distance    The length of the movement
         */
        public translateLocal(axis: Vector3D, distance: number) {
            var x: number = axis.x, y: number = axis.y, z: number = axis.z;
            var len: number = distance / Math.sqrt(x * x + y * y + z * z);

            this._modeMatrix3D.prependTranslation(x * len, y * len, z * len);
            this._modeMatrix3D.copyColumnTo(3, this._pos);
        }










        public addChild(child: Object3D): Object3D {

            Object3D.renderListChange = true;

            this.childs.push(child);

            child.parent = this;

            Octree.getInstance().addObject3D(child);

            return child;
        }

        public addChildAt(child: Object3D, index: number): Object3D {

            if (index < 0) {
                this.childs.splice(0, 0, child);
            }
            else if (index >= this.childs.length) {
                this.childs.push(child);
            }
            else {
                this.childs.splice(index, 0, child);
            }

            child.parent = this;

            Octree.getInstance().addObject3D(child);

            return child;
        }

        public getChildAt(index: number): Object3D {

            if (index < 0 || index >= this.childs.length)
                return null;

            return this.childs[index];
        }

        public getChildIndex(child: Object3D): number {

            for (var index = 0; index < this.childs.length; ++index) {

                if (this.childs[index] != child) {
                    continue;
                }

                return index;
            }

            return -1;
        }

        public removeChild(child: Object3D): Object3D {

            for (var index = 0; index < this.childs.length; ++index) {

                if (this.childs[index] != child) {
                    continue;
                }

                child.parent = null;

                Octree.getInstance().delObject3D(child);
                this.childs.splice(index, 1);

                return child;
            }

            return null;
        }

        public removeChildAt(index: number): Object3D {

            if (index < 0 || index >= this.childs.length)
                return null;

            var object3D: Object3D = this.childs[index];

            Octree.getInstance().delObject3D(object3D);
            object3D.parent = null;

            this.childs.splice(index, 1);

            return object3D;
        }

        public setChildIndex(child: Object3D, index: number) {

            for (var i = 0; i < this.childs.length; ++i) {

                if (this.childs[i] != child) {
                    continue;
                }

                if (i == index) {
                    return;
                }
                else if (index > i) {

                    for (var m = i; m > index; --m) {
                        this.childs[m] = this.childs[m - 1];
                    }
                }
                else if (index < i) {

                    for (var m = i; m < index; ++m) {
                        this.childs[m] = this.childs[m + 1];
                    }
                }

                this.childs[index] = child;

                return;
            }
        }

        public swapChildren(child1: Object3D, child2: Object3D) {

            var index1 = 0, index2 = 0;

            for (; index1 < this.childs.length; ++index1) {

                if (this.childs[index1] != child1) {
                    continue;
                }

                for (; index2 < this.childs.length; ++index2) {

                    if (this.childs[index2] != child2) {
                        continue;
                    }

                    var tmp: Object3D = this.childs[index1];

                    this.childs[index1] = this.childs[index2];

                    this.childs[index2] = tmp;

                    break;
                }

                return;
            }
        }

        public swapChildrenAt(index1: number, index2: number) {

            if (index1 < 0 || index1 >= this.childs.length)
                return;

            if (index2 < 0 || index2 >= this.childs.length)
                return;

            var tmp: Object3D = this.childs[index1];

            this.childs[index1] = this.childs[index2];

            this.childs[index2] = tmp;
        }

        public listenerMouseEvent(e: MouseEventType, func: Function) {
            this._mouse_func_list[e] = func;
        }

        public isMouseEvent(e: MouseEventType): boolean {
            return (this._mouse_func_list[e] != null)
        }

        public onMouseEvent(e: MouseEventType) {
            if (this._mouse_func_list[e] != null) {
                this._mouse_func_list[e](this);
            }
        }

        public lookAt(pos: Vector3D, target: Vector3D, up: Vector3D = Vector3D.Y_AXIS) {

        }

        public get lookAtPosition(): Vector3D {
            return new Vector3D();
        }

        protected updateModleMatrix() {
            this._globalTransform[0].setTo(0, 0, 0);
            this._globalTransform[1].setTo(0, 0, 0);
            this._globalTransform[2].setTo(1, 1, 1);
            this._modeMatrix3D.identity();

            this.computeModleMatrix(this, this._modeMatrix3D);

            ///this._modeMatrix3D.recompose(this._globalTransform);
            ///this._modeMatrix3D.copyFrom(this._globalMatrix);
        }

        protected computeModleMatrix(obj: Object3D, mat: Matrix4_4) {
            if (obj == null) {
                return;
            }
            ///transform[0].copyFrom(obj.position.add(transform[0]));
            ///transform[1].copyFrom(obj.rotation.add(transform[1]));
            ///transform[2].copyFrom(obj.scale.multiply(transform[2]));

            obj._localMatrix.recompose(obj._transformComponents);

            ///tmp.makeTransform(this._pos, this._sca, this._qut);

            mat.append(obj._localMatrix);

            this.computeModleMatrix(obj.parent, mat);
        }

        protected set transformChange(change: boolean) {
            this._transformChange = change;
        }

        protected updateTransformChange(obj: Object3D, change: boolean) {
            obj.transformChange = change;
            ///Octree.getInstance().checkObject3D(obj);
            for (var i: number = 0; i < obj.childs.length; ++i) {
                this.updateTransformChange(obj.childs[i], change);
            }
        }

        public update(time: number, delay: number) {

        }

        public dispose() {
        }




        ///---------------------------------------
        ///------mouse event ---------------------
        ///------提醒各位用回调函数，作用于问题，一般直接用 ()=> callfun()  的形式去写回调
        ///---------------------------------------
        public addEventListener(type: string, eventFunction: Function) {
            this.eventlist[type] = this.eventlist[type] || new Array<Function>();
            (<Array<Function>>this.eventlist[type]).push(eventFunction);
        }

        private list: Array<Function>;
        private i: number = 0;
        public dispatchEvent(event3D: Event3D) {
            this.list = <Array<Function>>this.eventlist[event3D.eventType];
            if (this.list) {
                for (this.i = 0; this.i < this.list.length; this.i++) {
                    event3D.data = this.pickerData;
                    event3D.currentTarget = this;
                    ///this.list[this.i].apply(event3D);
                    this.list[this.i](event3D);
                }
            }
        }
    }
} 