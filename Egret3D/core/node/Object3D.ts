module BlackSwan {
    export enum MouseEventType {
        mouse_Move,             // 鼠标移动;
        mouse_LStart,           // 鼠标左键点击;
        mouse_LEnd,             // 鼠标左键弹起;
        mouse_RStart,           // 鼠标右键按下;
        mouse_REnd,             // 鼠标右键弹起;
        mouse_DClick,           // 鼠标双击;
        mouse_Max,
    }

    export class Object3D {

        public _modeMatrix3D: Matrix4_4 = new Matrix4_4() ;
        private _transformChange: boolean = false;

        protected _parent: Object3D;
        protected _childs: Array<Object3D> = new Array<Object3D>();

        protected _pivotPoint: Vector3D = new Vector3D();
        protected _pivotZero: Boolean = true;
        protected _pos: Vector3D = new Vector3D();
        protected _rot: Vector3D = new Vector3D();
        protected _sca: Vector3D = new Vector3D(1, 1, 1);
        protected _pivot: Vector3D = new Vector3D();
        
        protected _offsetRotion: Vector3D = new Vector3D();
        protected _transformComponents: Array<Vector3D>;
        protected _octreeNode:OctreeNode = null;

        public name: string;
        public id: number;
        public octree:Octree = null;
        public renderLayer: number;
        public isCut: boolean = true; // 是否需要视锥体裁剪;

        public box: CubeBoxBound = new CubeBoxBound();
        public isCheckBox = true;
        
        private _mouse_func_list: Array<Function> = new Array<Function>();

        constructor() {
            this._transformComponents = new Array<Vector3D>();
            this._transformComponents[0] = this._pos;
            this._transformComponents[1] = this._rot;
            this._transformComponents[2] = this._sca;
            for (var i: number = 0; i < MouseEventType.mouse_Max; ++i) {
                this._mouse_func_list.push(null);
            }
        }

        public set parent(p: Object3D) {
            this._parent = p;
        }

        public get position(): Vector3D {
            return this._pos;
        }

        public set position(vec: Vector3D) {
            this._pos.copyFrom(vec);
            if (this.octree != null) {
                this.octree.checkObject3D(this);
            }
        }

        public set x(value: number) {
            if (this._pos.x == value)
                return;
            this._pos.x = value;
            this._transformChange = true;

            if (this.octree != null) {
                this.octree.checkObject3D(this);
            }
        }

        public set y(value: number) {
            if (this._pos.y == value)
                return;
            this._pos.y = value;
            this._transformChange = true;

            if (this.octree != null) {
                this.octree.checkObject3D(this);
            }
        }

        public set z(value: number) {
            if (this._pos.z == value)
                return;
            this._pos.z = value;
            this._transformChange = true;

            if (this.octree != null) {
                this.octree.checkObject3D(this);
            }
            //if (this.layerFilter != null) {
            //    this.layerFilter.isSort = true;
            //}
        }

        public set rotationX(value: number) {
            if (this._rot.x == value)
                return;
            this._rot.x = value;
            this._transformChange = true;
        }

        public set rotationY(value: number) {
            if (this._rot.y == value)
                return;
            this._rot.y = value;
            this._transformChange = true;
        }

        public set rotationZ(value: number) {
            if (this._rot.z == value)
                return;
            this._rot.z = value;
            this._transformChange = true;
        }

        public set scaleX(value: number) {
            if (this._sca.x == value)
                return;
            this._sca.x = value;
            this._transformChange = true;
        }

        public set scaleY(value: number) {
            if (this._sca.y == value)
                return;
            this._sca.y = value;
            this._transformChange = true;
        }

        public set scaleZ(value: number) {
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
            this._modeMatrix3D.recompose(this._transformComponents);
            return this._modeMatrix3D;
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

            this._childs.push(child);

            //child.parent = this;

            return child;
        }

        public addChildAt(child: Object3D, index: number): Object3D {

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
        }

        public getChildAt(index: number): Object3D {

            if (index < 0 || index >= this._childs.length)
                return null;

            return this._childs[index];
        }

        public getChildIndex(child: Object3D): number {

            for (var index = 0; index < this._childs.length; ++index) {

                if (this._childs[index] != child) {
                    continue;
                }

                return index;
            }

            return -1;
        }

        public removeChild(child: Object3D): Object3D {

            for (var index = 0; index < this._childs.length; ++index) {

                if (this._childs[index] != child) {
                    continue;
                }

                //child.parent = null;

                this._childs.splice(index);

                return child;
            }

            return null;
        }

        public removeChildAt(index: number): Object3D {

            if (index < 0 || index >= this._childs.length)
                return null;

            var object3D: Object3D = this._childs[index];

            //object3D.parent = null;

            this._childs.splice(index);

            return object3D;
        }

        public setChildIndex(child: Object3D, index: number) {

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
        }

        public swapChildren(child1: Object3D, child2: Object3D) {

            var index1 = 0, index2 = 0;

            for (; index1 < this._childs.length; ++index1) {

                if (this._childs[index1] != child1) {
                    continue;
                }

                for (; index2 < this._childs.length; ++index2) {

                    if (this._childs[index2] != child2) {
                        continue;
                    }

                    var tmp: Object3D = this._childs[index1];

                    this._childs[index1] = this._childs[index2];

                    this._childs[index2] = tmp;

                    break;
                }

                return;
            }
        }

        public swapChildrenAt(index1: number, index2: number) {

            if (index1 < 0 || index1 >= this._childs.length)
                return;

            if (index2 < 0 || index2 >= this._childs.length)
                return;

            var tmp: Object3D = this._childs[index1];

            this._childs[index1] = this._childs[index2];

            this._childs[index2] = tmp;
        }

        public set octreeNode(node: OctreeNode) {
            this._octreeNode = node;
        }

        public get octreeNode(): OctreeNode {
            return this._octreeNode;
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
    }
} 