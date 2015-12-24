module Egret3D {
            
    /**
    * @class Egret3D.Object3D
    * @classdesc
    * 3d空间中的实体对象
    */
    export class Object3D extends EventDispatcher {
        public static renderListChange: boolean = true;
        static s_id: number = 0;

        protected _modeMatrix3D: Matrix4_4 = new Matrix4_4();

        protected _transformChange: boolean = true;

        protected _pos: Vector3D = new Vector3D();
        protected _rot: Vector3D = new Vector3D();
        protected _sca: Vector3D = new Vector3D(1, 1, 1);
        protected _orientation = new Quaternion();

        protected _globalPos: Vector3D = new Vector3D();
        protected _globalRot: Vector3D = new Vector3D();
        protected _globalSca: Vector3D = new Vector3D(1, 1, 1);
        protected _globalOrientation = new Quaternion();

        protected _qut: Quaternion = new Quaternion();
        protected _active: boolean = false;
        protected _mat: Matrix4_4 = new Matrix4_4();

        /**
        * @language zh_CN
        * 当前对象名
        */
        public name: string;

        /**
        * @language zh_CN
        * 当前对象id
        */
        public id: number;

        /**
        * @language zh_CN
        * 渲染层级
        */
        public layer: number = 0x00000000;

        /**
        * @language zh_CN
        * 渲染层级分类标签
        */
        public tag: Tag; 

        /**
        * @language zh_CN
        * 是否开启鼠标事件
        */
        public mouseEnable: boolean = false;

        /**
        * @language zh_CN
        * 是否需要视锥体裁剪
        */
        public isCut: boolean = true;
        
        /**
        * @language zh_CN
        * 父亲节点
        */
        public parent: Object3D = null;
        
        /**
        * @language zh_CN
        * 子对象列表
        */
        public childs: Array<Object3D> = new Array<Object3D>();

        /**
        * @language zh_CN
        * 动作对象
        */
        public animation: IAnimation = null;

        
        /**
        * @language zh_CN
        * 几何对象
        */
        public geometry: GeometryBase = null;

        /**
        * @language zh_CN
        * 材质
        */
        public material: MaterialBase = null;

        /**
        * @language zh_CN
        * 碰撞盒子
        */
        public box: CubeBoxBound = new CubeBoxBound();

        /**
        * @language zh_CN
        * 是否开启盒子检测
        */
        public isCheckBox = true;

        /**
        * @language zh_CN
        * 鼠标检测数据
        */
        public pickerData: PickResult = new PickResult();

        /**
        * @language zh_CN
        * 是否控制
        */
        public isController: boolean = true;

        /**
        * @language zh_CN
        * 是否可见
        */
        public isVisible: boolean = true;

        /**
        * @language zh_CN
        * 是否关闭
        */
        public isDisable: boolean = false;

        private _worldBox: CubeBoxBound = new CubeBoxBound();
        
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            super();
            this.id = ++Object3D.s_id;
        }

        /**
        * @language zh_CN
        * 返回位移
        * @readOnly
        * @returns 位移
        */
        public get position(): Vector3D {
            return this._pos;
        }

        /**
        * @language zh_CN
        * 设置位移
        * @writeOnly
        * @param vec 位移
        */
        public set position(vec: Vector3D) {
            this.updateTransformChange(true);
            this._pos.copyFrom(vec);
        }
        
        /**
        * @language zh_CN
        * 返回旋转
        * @readOnly
        * @returns 旋转
        */
        public get rotation(): Vector3D {
            return this._rot;
        }

        /**
        * @language zh_CN
        * 设置旋转
        * @writeOnly
        * @param vec 旋转
        */
        public set rotation(value: Vector3D) {
            this._rot.x = value.x;
            this._rot.y = value.y;
            this._rot.z = value.z;

            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);

            this.updateTransformChange(true);
        }
        
        /**
        * @language zh_CN
        * 返回缩放
        * @readOnly
        * @returns 缩放
        */
        public get scale(): Vector3D {
            return this._sca;
        }

        /**
        * @language zh_CN
        * 设置缩放
        * @writeOnly
        * @param vec 缩放
        */
        public set scale(val: Vector3D) {
            this.updateTransformChange(true);
            this._sca = val;
        }

        /**
        * @language zh_CN
        * 设置x坐标
        * @writeOnly
        * @param value x坐标
        */
        public set x(value: number) {
            this.updateTransformChange(true);

            if (this._pos.x == value)
                return;

            this._pos.x = value;
        }
        
        /**
        * @language zh_CN
        * 设置y坐标
        * @writeOnly
        * @param value y坐标
        */
        public set y(value: number) {
            this.updateTransformChange(true);

            if (this._pos.y == value)
                return;

            this._pos.y = value;
        }
        
        /**
        * @language zh_CN
        * 设置z坐标
        * @writeOnly
        * @param value z坐标
        */
        public set z(value: number) {
            this.updateTransformChange(true);

            if (this._pos.z == value)
                return;

            this._pos.z = value;
        }
                
        /**
        * @language zh_CN
        * 设置x轴旋转
        * @writeOnly
        * @param value x轴旋转
        */
        public set rotationX(value: number) {
            this.updateTransformChange(true);

            if (this._rot.x == value)
                return;

            this._rot.x = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
        }
                        
        /**
        * @language zh_CN
        * 设置y轴旋转
        * @writeOnly
        * @param value y轴旋转
        */
        public set rotationY(value: number) {
            this.updateTransformChange(true);

            if (this._rot.y == value)
                return;

            this._rot.y = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);

        }
                        
        /**
        * @language zh_CN
        * 设置z轴旋转
        * @writeOnly
        * @param value z轴旋转
        */
        public set rotationZ(value: number) {
            this.updateTransformChange(true);

            if (this._rot.z == value)
                return;

            this._rot.z = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);

        }
                                
        /**
        * @language zh_CN
        * 设置x轴缩放
        * @writeOnly
        * @param value x轴缩放
        */
        public set scaleX(value: number) {
            this.updateTransformChange(true);

            if (this._sca.x == value)
                return;

            this._sca.x = value;
        }
                                        
        /**
        * @language zh_CN
        * 设置y轴缩放
        * @writeOnly
        * @param value y轴缩放
        */
        public set scaleY(value: number) {
            this.updateTransformChange(true);

            if (this._sca.y == value)
                return;

            this._sca.y = value;
            this._transformChange = true; 

        }
                                        
        /**
        * @language zh_CN
        * 设置z轴缩放
        * @writeOnly
        * @param value z轴缩放
        */
        public set scaleZ(value: number) {
            this.updateTransformChange(true);

            if (this._sca.z == value)
                return;

            this._sca.z = value;
            this._transformChange = true; 

        }

        /**
        * @language zh_CN
        * 返回x坐标
        * @readOnly
        * @returns x坐标
        */
        public get x(): number {
            return this._pos.x;
        }
        
        /**
        * @language zh_CN
        * 返回y坐标
        * @readOnly
        * @returns y坐标
        */
        public get y(): number {
            return this._pos.y;
        }
        
        /**
        * @language zh_CN
        * 返回z坐标
        * @readOnly
        * @returns z坐标
        */
        public get z(): number {
            return this._pos.z
        }
        
        /**
        * @language zh_CN
        * 返回x旋转
        * @readOnly
        * @returns x旋转
        */
        public get rotationX(): number {
            return this._rot.x;
        }
        
        /**
        * @language zh_CN
        * 返回y旋转
        * @readOnly
        * @returns y旋转
        */
        public get rotationY(): number {
            return this._rot.y;
        }
                
        /**
        * @language zh_CN
        * 返回z旋转
        * @readOnly
        * @returns z旋转
        */
        public get rotationZ(): number {
            return this._rot.z;
        }
                        
        /**
        * @language zh_CN
        * 返回x缩放
        * @readOnly
        * @returns x缩放
        */
        public get scaleX(): number {
            return this._sca.x;
        }
                                
        /**
        * @language zh_CN
        * 返回y缩放
        * @readOnly
        * @returns y缩放
        */
        public get scaleY(): number {
            return this._sca.y;
        }
                                
        /**
        * @language zh_CN
        * 返回z缩放
        * @readOnly
        * @returns z缩放
        */
        public get scaleZ(): number {
            return this._sca.z;
        }
                                        
        /**
        * @language zh_CN
        * 返回 object 世界渲染矩阵
        * @readOnly
        * @returns object 世界渲染矩阵
        */
        public get modelMatrix(): Matrix4_4 {
            if (this._transformChange) {
                this._transformChange = false;
                this.updateModleMatrix();
            }
            return this._modeMatrix3D;
        }

        protected updateModleMatrix() {
            
            if (this.parent != null) {
                var parentOrientation: Quaternion = this.parent.globalOrientation;

                this._globalOrientation.multiply(parentOrientation, this._orientation);
                this._globalOrientation.toEulerAngles(this._globalRot);

                var parentScale: Vector3D = this.parent.globalScale;

                this._globalSca.copyFrom(parentScale.multiply(this._sca));

                parentOrientation.rotatePoint(parentScale.multiply(this._pos), this._globalPos);
                this._globalPos.copyFrom(this._globalPos.add(this.globalPosition));
            }
            else {
                this._globalOrientation = this._orientation;
                this._globalPos = this._pos;
                this._globalSca = this._sca;
                this._globalRot = this._rot;
            }
            //this._modeMatrix3D.recompose([this._globalPos, this._globalRot, this._globalSca]);
            this._modeMatrix3D.makeTransform(this._globalPos, this._globalSca, this._globalOrientation);
            this.onUpdateTransform();
        }

        protected onUpdateTransform() {
        }
                                                
        /**
        * @language zh_CN
        * 返回 object 世界位置
        * @readOnly
        * @returns object 世界位置
        */
        public get globalPosition(): Vector3D {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._globalPos;
        }
                                                        
        /**
        * @language zh_CN
        * 返回 object 世界旋转
        * @readOnly
        * @returns object 世界旋转
        */
        public get globalRotation(): Vector3D {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._globalRot;
        }
                                                        
        /**
        * @language zh_CN
        * 返回 object 世界缩放
        * @readOnly
        * @returns object 世界缩放
        */
        public get globalScale(): Vector3D {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._globalSca;
        }
                                                        
        /**
        * @language zh_CN
        * 返回 object 世界旋转
        * @readOnly
        * @returns object 世界旋转
        */
        public get globalOrientation(): Quaternion {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._globalOrientation;
        }
        
        /**
        * @language zh_CN
        * 返回 object 世界变换后的碰撞盒子
        * @readOnly
        * @returns object 世界变换后的碰撞盒子
        */
        public get worldBox(): CubeBoxBound {

            if (this._transformChange) {

                var mat: Matrix4_4 = new Matrix4_4();
                mat.identity();
                mat.rawData[12] = this.modelMatrix.rawData[12];
                mat.rawData[13] = this.modelMatrix.rawData[13];
                mat.rawData[14] = this.modelMatrix.rawData[14];

                mat.rawData[0] = this._globalSca.x;
                mat.rawData[5] = this._globalSca.y;
                mat.rawData[10] = this._globalSca.z;

                this._worldBox.copyFrom(this.box.Transform(mat));
            }

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

            this._modeMatrix3D.appendTranslation(x * len, y * len, z * len);
            this._modeMatrix3D.copyRowTo(3, this._pos);
        }

        /**
        * @language zh_CN
        * 增加一个子对象,并返回当前子对象
        * @param child 增加的子对象
        * @returns 子对象
        */
        public addChild(child: Object3D): Object3D {
            child.updateTransformChange(true);

            Object3D.renderListChange = true;

            this.childs.push(child);

            child.parent = this;

            return child;
        }
        
        /**
        * @language zh_CN
        * 增加一个子对象,并返回当前子对象
        * @param child 增加的子对象
        * @param index 子对象的下标
        * @returns 子对象
        */
        public addChildAt(child: Object3D, index: number): Object3D {
            child.updateTransformChange(true);

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

            return child;
        }
                
        /**
        * @language zh_CN
        * 返回下标为index的子对象
        * @param index 子对象下标
        * @returns 如果有就返回子对象,否则就返回null.
        */
        public getChildAt(index: number): Object3D {

            if (index < 0 || index >= this.childs.length)
                return null;

            return this.childs[index];
        }
                        
        /**
        * @language zh_CN
        * 返回子对角child的下标
        * @param child 子对象
        * @returns 如果有就返回子对象的下标,否则就返回-1.
        */
        public getChildIndex(child: Object3D): number {

            for (var index = 0; index < this.childs.length; ++index) {

                if (this.childs[index] != child) {
                    continue;
                }

                return index;
            }

            return -1;
        }
                                
        /**
        * @language zh_CN
        * 移除child子对象 并返回
        * @param child 子对象
        * @returns 如果成功就返回child,否则返回null
        */
        public removeChild(child: Object3D): Object3D {

            for (var index = 0; index < this.childs.length; ++index) {

                if (this.childs[index] != child) {
                    continue;
                }

                child.parent = null;

                this.childs.splice(index, 1);

                return child;
            }

            return null;
        }
                                        
        /**
        * @language zh_CN
        * 移除下标为index的子对象 并返回
        * @param index 子对象的下标
        * @returns 如果成功就返回child,否则返回null
        */
        public removeChildAt(index: number): Object3D {

            if (index < 0 || index >= this.childs.length)
                return null;

            var object3D: Object3D = this.childs[index];

            object3D.parent = null;

            this.childs.splice(index, 1);

            return object3D;
        }
                                                
        /**
        * @language zh_CN
        * 设置子对象的下标
        * @param child 子对象
        * @param index 子对象的下标
        */
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
                                                        
        /**
        * @language zh_CN
        * 交换子对象的位置
        * @param child1 子对象1
        * @param child2 子对象2
        */
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
                                                                
        /**
        * @language zh_CN
        * 交换子对象的位置
        * @param index1 子对象1下标
        * @param index2 子对象2下标
        */
        public swapChildrenAt(index1: number, index2: number) {

            if (index1 < 0 || index1 >= this.childs.length)
                return;

            if (index2 < 0 || index2 >= this.childs.length)
                return;

            var tmp: Object3D = this.childs[index1];

            this.childs[index1] = this.childs[index2];

            this.childs[index2] = tmp;
        }

        public bindWireframe(wireframe: WireframeBase) {
            wireframe.modleMatrix = this._modeMatrix3D; 
        }
                                                                        
        /**
        * @language zh_CN
        * 当前对象对视位置
        * @param pos 对象的位置
        * @param target 目标的位置
        * @param up 向上的方向
        */
        public lookAt(pos: Vector3D, target: Vector3D, up: Vector3D = Vector3D.Y_AXIS) {

        }

        /**
        * @language zh_CN
        * 返回目标的位置
        * @readOnly
        * @returns 目标的位置
        */
        public get lookAtPosition(): Vector3D {
            return new Vector3D();
        }

        protected updateTransformChange(change: boolean) {
            this._transformChange = change;
            ///Octree.getInstance().checkObject3D(obj);
            for (var i: number = 0; i < this.childs.length; ++i) {
                this.childs[i].updateTransformChange(change);
            }
        }
        
        /**
        * @language zh_CN
        * 当前对象数据更新
        * @param time 当前时间
        * @param delay 每帧时间间隔
        */
        public update(time: number, delay: number) {

        }

        /**
        * @language zh_CN
        * 返回对象的屏幕坐标
        * @param camera 对象渲染的摄像机
        * @returns 对象的屏幕坐标 
        */
        public getScreenPosition(camera: Camera3D): Vector3D {
            this._mat.copyFrom(camera.viewProjectionMatrix);
            this._mat.append(this.modelMatrix);
            return this._mat.transformVector(this.globalPosition);
        }
    }
} 