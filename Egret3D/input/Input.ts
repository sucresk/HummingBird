module Egret3D {

    export enum KeyCode {
        Key_BackSpace = 8,
        Key_Tab,
        Key_Clear,
        Key_Enter,
        Key_Shift_L,
        Key_Control_L,
        Key_Alt_L,
        Key_Pause,
        Key_CapsLock,
        Key_Escape,
        Key_Space,
        Key_Prior,
        Key_Next,
        Key_End,
        Key_Home,
        Key_Left,
        Key_Up,
        Key_Right,
        Key_Down,
        Key_Select,
        Key_Print,
        Key_Execute,
        Key_Insert,
        Key_Delete,
        Key_Help,
        Key_0 = 48,
        Key_1,
        Key_2,
        Key_3,
        Key_4,
        Key_5,
        Key_6,
        Key_7,
        Key_8,
        Key_9,

        Key_A = 65,
        Key_B,
        Key_C,
        Key_D,
        Key_E,
        Key_F,
        Key_G,
        Key_H,
        Key_I,
        Key_J,
        Key_K,
        Key_L,
        Key_M,
        Key_N,
        Key_O,
        Key_P,
        Key_Q,
        Key_R,
        Key_S,
        Key_T,
        Key_U,
        Key_V,
        Key_W,
        Key_X,
        Key_Y,
        Key_Z,
        Key_KP_0 = 96,
        Key_KP_1,
        Key_KP_2,
        Key_KP_3,
        Key_KP_4,
        Key_KP_5,
        Key_KP_6,
        Key_KP_7,
        Key_KP_8,
        Key_KP_9,
        Key_Multiply,
        Key_Add,
        Key_Separator,
        Key_Subtract,
        Key_Decimal,
        Key_Divide,
        Key_F1,
        Key_F2,
        Key_F3,
        Key_F4,
        Key_F5,
        Key_F6,
        Key_F7,
        Key_F8,
        Key_F9,
        Key_F10,
        Key_F11,
        Key_F12,
        Key_F13,
        Key_F14,
        Key_F15,
        Key_F16,
        Key_F17,
        Key_F18,
        Key_F19,
        Key_F20,
        Key_F21,
        Key_F22,
        Key_F23,
        Key_F24,

        Key_Num_Lock,
        Key_Scroll_Lock,

        Key_Mouse_Left = 256,
        Key_Mouse_Right,
        Key_Mouse_Mid,
    }

    /**
     * @language zh_CN
     * @class Egret3D.Input
     * @classdesc
     * 处理输入设备,鼠标.键盘.触摸
     */
    export class Input {

        /**
        * @language zh_CN
        * 鼠标X坐标
        */
        public mouseX: number = 0;
        /**
        * @language zh_CN
        * 鼠标Y坐标
        */
        public mouseY: number = 0;


        /**
        * @language zh_CN
        * 鼠标滚轮增量值
        */
        public wheelDelta: number = 0;

        /**
        * @language zh_CN
        * 鼠标X坐标的偏移值
        */
        public mouseOffsetX: number = 0;
        /**
        * @language zh_CN
        * 鼠标Y坐标的偏移值
        */
        public mouseOffsetY: number = 0;


        /**
        * @language zh_CN
        * 鼠标X坐标
        */
        public mouseLastX: number = 0; 
        /**
        * @language zh_CN
        * 鼠标Y坐标
        */
        public mouseLastY: number = 0;

        private _time: number = 0;

        private _keyStatus: { [key: number]: boolean; } = {};

        private _listenerKeyClick: Array<Function> = new Array<Function>();
        private _listenerKey: Array<Function> = new Array<Function>();
        private _listenerKeyUp: Array<Function> = new Array<Function>();
        private _listenerKeyDown: Array<Function> = new Array<Function>();

        private _listenerSwipe: Array<Function> = new Array<Function>();

        private _mouseMoveFunc: Array<Function> = new Array<Function>();
        private _mouseWheelFunc: Array<Function> = new Array<Function>();

        private _ondeviceorientation: Array<Function> = new Array<Function>();
        private _ondevicemotion: Array<Function> = new Array<Function>();

        private _listenerGamepadButtons: Array<Function> = new Array<Function>();

        private _touchStartCallback: Array<Function> = new Array<Function>();
        private _touchEndCallback: Array<Function> = new Array<Function>();
        private _touchMoveCallback: Array<Function> = new Array<Function>();

        /**
        * @language zh_CN
        * 游戏手柄Stick1事件侦听函数
        */
        public onGamepadStick1: Function = null;
        /**
        * @language zh_CN
        * 游戏手柄Stick2事件侦听函数
        */
        public onGamepadStick2: Function = null;


        /**
        * @language zh_CN
        * 旋转
        */
        public rotation: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 加速度
        */
        public _acceleration: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 重力
        */
        public gravity: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 象限
        */
        public quadrant: number = 0;

        private static _instance: Input = null;

        /**
        * @language zh_CN
        * 获取Input类对象的单例
        * @returns {Input}
        */
        public static get instance(): Input {
            if (this._instance == null) {
                this._instance = new Input();
            }
            return this._instance;
        }
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            window.onmousewheel = (e: MouseWheelEvent) => this.mouseWheel(e);
            window.onmousedown = (e: MouseEvent) => this.mouseStart(e);
            window.onmouseup = (e: MouseEvent) => this.mouseEnd(e);
            window.onmousemove = (e: MouseEvent) => this.mouseMove(e);
            window.onkeydown = (e: KeyboardEvent) => this.keyDown(e);
            window.onkeyup = (e: KeyboardEvent) => this.keyUp(e);

            if (this.canGame()) {
                window.addEventListener("gamepadconnected", (e: GamepadEvent) => this.ongamepadconnected(e));
                window.addEventListener("gamepaddisconnected", (e: GamepadEvent) => this.ongamepaddisconnected(e));
            }


            window.ontouchstart = (e: TouchEvent) => this.touchStart(e);
            window.ontouchend = (e: TouchEvent) => this.touchEnd(e);
            window.ontouchmove = (e: TouchEvent) => this.touchMove(e);
            window.ontouchcancel = (e: TouchEvent) => this.touchEnd(e);


            window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.ondeviceorientation(e));
            window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.detectShake(e));

        }

        /**
        * @language zh_CN
        * 添加手指按下事件
        * @param callback {Function} 手指按下事件的侦听函数
        */
        public addTouchStartCallback(callback: Function): void {
            this._touchStartCallback.push(callback);
        }

        /**
        * @language zh_CN
        * 添加手指弹起事件
        * @param callback {Function} 手指弹起事件的侦听函数
        */
        public addTouchEndCallback(callback: Function): void {
            this._touchEndCallback.push(callback);
        }

        /**
        * @language zh_CN
        * 添加手指移动事件
        * @param callback {Function} 手指移动事件的侦听函数
        */
        public addTouchMoveCallback(callback: Function): void {
            this._touchMoveCallback.push(callback);
        }

        private _gp: boolean = false;
        private ongamepaddisconnected(e: GamepadEvent) {
            Debug.instance.trace("Gamepad disconnected!");
            this._gp = false;
        }
        private ongamepadconnected(e: GamepadEvent) {
            Debug.instance.trace("Gamepad connected!");
            this._gp = true;
        }

        /**
        * @language zh_CN
        * 游戏手柄按钮是否按下
        * @param index {number}
        * @returns {boolean}
        */
        public getGamepadButtonState(index: number): boolean {
            return navigator.getGamepads()[0].buttons[index].pressed;
        }

        /**
        * @language zh_CN
        * 游戏手柄摇杆方向 Stick1 
        * @returns {Vector3D}
        */
        public getGamepadStick1(): Vector3D {
            return new Vector3D(navigator.getGamepads()[0].axes[0], navigator.getGamepads()[0].axes[1], 0);
        }

        /**
        * @language zh_CN
        * 游戏手柄摇杆方向 Stick2 
        * @returns {Vector3D}
        */
        public getGamepadStick2(): Vector3D {
            return new Vector3D(navigator.getGamepads()[0].axes[2], navigator.getGamepads()[0].axes[3], 0);
        }



        private canGame(): boolean {
            return "getGamepads" in navigator;
        }


        /**
        * @language zh_CN
        * 更新游戏手柄信息
        */
        public reportOnGamepad() {
            if (this.canGame() && this._gp) {

                if (this.onGamepadStick1 != null) {
                    this.onGamepadStick1(this.getGamepadStick1());
                }

                if (this.onGamepadStick2 != null) {
                    this.onGamepadStick2(this.getGamepadStick2());
                }


                for (var i: number = 0; i < this._listenerGamepadButtons.length; ++i) {
                    this._listenerGamepadButtons[i](this.getGamepadButtonState(i));
                }

            }
        }

        private printout(): void {

            var html = "";
            html += "id: " + navigator.getGamepads()[0].id + "<br/>";
            var len: number = navigator.getGamepads()[0].buttons.length;
            for (var i: number = 0; i < len; i++) {
                html += "Button " + (i + 1) + ": ";
                if (this.getGamepadButtonState(i)) html += " pressed";
                html += "<br/>";
            }

            var v: Vector3D = this.getGamepadStick1();

            html += "Stick 1" + ": " + v.x + "," + v.y + "<br/>";

            v = this.getGamepadStick2();
            html += "Stick 2" + ": " + v.x + "," + v.y + "<br/>";

            Debug.instance.trace(html);
        }

        private detectShake(evt: DeviceMotionEvent) {
            var status = document.getElementById("console");
            var accl = evt.acceleration; //acceleration 排除重力影响的加速度  accelerationIncludingGravity(含重力的加速度)
            //x、y 和 z 轴方向加速
            if (accl.x > 1.5 || accl.y > 1.5 || accl.z > 1.5) {

            } else {

            }

            if (this._ondevicemotion && this._ondevicemotion.length > 0) {

                var x: number = Math.ceil(accl.x * 1000) / 1000;
                var y: number = Math.ceil(accl.y * 1000) / 1000;
                var z: number = Math.ceil(accl.z * 1000) / 1000;
                status.innerHTML = "x :" + x + "y :" + y + "z :" + z;
                this._ondevicemotion[0](x, y, z);
            }
        }

        private _caheX: number;
        private _caheY: number;
        private _caheZ: number;

        private _delayX: number;
        private _delayY: number;
        private _delayZ: number;
        private _first: boolean = true;
        private _initAngle: Vector3D = new Vector3D();
        private ondeviceorientation(e: DeviceOrientationEvent) {
            //alpha rotation around the z-axis  between 0 and 360 degrees 
            //在围绕 z 轴旋转时（即左右旋转时），y 轴的度数差 0 到 360度 。
            //beta Rotation around the x-axis cause the beta angle to change. The range of beta is between -180 and 180 degrees 
            //在围绕 x 轴旋转时（即前后旋转时），z 轴的度数差 -180到180度。  
            //gamma The gamma angle is associated with the y-axis between -90 and 90 degrees 
            //在围绕 y 轴旋转时（即扭转设备时），z 轴的度数差 -90到90度。  
            var directions = document.getElementById("console");
            directions.style.color = 'red';

            if (this._ondeviceorientation && this._ondeviceorientation.length > 0) {

                var alpha: number = Math.round(e.alpha * 100) * 0.01;
                var beta: number = Math.round(e.beta * 100) * 0.01;
                var gamma: number = Math.round(e.gamma * 100) * 0.01;

                if (this._first) {
                    this._initAngle["x"] = alpha;
                    this._initAngle["y"] = beta;
                    this._initAngle["z"] = gamma;
                }

                this._delayX = alpha - this._caheX;
                this._delayY = beta - this._caheY;
                this._delayZ = gamma - this._caheZ;

                this._caheX = alpha;
                this._caheY = beta;
                this._caheZ = gamma;

                this._initAngle.x += this._delayX;
                this._initAngle.y += this._delayY;
                this._initAngle.z += this._delayZ;

                this._ondeviceorientation[0](this._initAngle);

                directions.innerHTML = e.absolute + "<br>" + this._delayX + "<br>" + this._delayY + " <br>" + this._delayZ;
                directions.innerHTML += "<br>" + this._initAngle["x"] + "<br>" + this._initAngle["y"] + "<br>" + this._initAngle["z"];
            }
        }

        //屏幕翻转
        private onorientationchange(e) {

        }

        private onPinch(x: number, y: number, x1: number, y1: number) {
            this._oldPosition1 = new Point(x, y);
            this._oldPosition2 = new Point(x1, y1);

        }

        private onSwipe(x: number, y: number) {

            this.mouseX = x;
            this.mouseY = y;

            this._oldPosition1 = null;
            this._oldPosition2 = null;

            this._time = new Date().getTime();

            for (var i: number = 0; i < this._listenerKeyDown.length; ++i) {
                this._listenerKeyDown[i](KeyCode.Key_Mouse_Left);
            }
        }

        private touchStart(e: TouchEvent) {

            e.preventDefault();

            Debug.instance.trace("touchStart: " + e.touches.length);

            var x1: number = e.targetTouches[0].clientX - Egret3D.Egret3DDrive.clientRect.left;
            var y1: number = e.targetTouches[0].clientY - Egret3D.Egret3DDrive.clientRect.top;

            if (e.targetTouches.length == 2) {

                var x2: number = e.targetTouches[1].clientX - Egret3D.Egret3DDrive.clientRect.left;
                var y2: number = e.targetTouches[1].clientY - Egret3D.Egret3DDrive.clientRect.top;

                this.onPinch(x1, y1, x2, y2);
            }
            else if (e.targetTouches.length == 1) {
                this.onSwipe(x1, y1);
            }

            for (var i: number = 0; i < this._touchStartCallback.length; i++) {
                this._touchStartCallback[i](e);
            }
        }

        private _oldPosition1: Point = null;
        private _oldPosition2: Point = null;

        private touchEnd(e: TouchEvent) {

            Debug.instance.trace("touchEnd : " + e.touches.length);

            if (e.targetTouches.length > 1) {

                var x: number = e.targetTouches[0].clientX - Egret3D.Egret3DDrive.clientRect.left;
                var y: number = e.targetTouches[0].clientY - Egret3D.Egret3DDrive.clientRect.top;
                var x1: number = e.targetTouches[1].clientX - Egret3D.Egret3DDrive.clientRect.left;
                var y1: number = e.targetTouches[1].clientY - Egret3D.Egret3DDrive.clientRect.top;

                this.onPinch(x, y, x1, y1);
            }
            else if (e.targetTouches.length == 1) {

                this.onSwipe(e.targetTouches[0].clientX - Egret3D.Egret3DDrive.clientRect.left, e.targetTouches[0].clientY - Egret3D.Egret3DDrive.clientRect.top);
            }
            else {

                this._oldPosition1 = null;
                this._oldPosition2 = null;
                this._time = 0;

                for (var i: number = 0; i < this._listenerKeyUp.length; ++i) {
                    this._listenerKeyUp[i](KeyCode.Key_Mouse_Left);
                }
            }

            for (var i: number = 0; i < this._touchEndCallback.length; i++) {
                this._touchEndCallback[i](e);
            }
        }


        private touchMove(e: TouchEvent) {

            this.mouseLastX = this.mouseX;
            this.mouseLastY = this.mouseY;

            this.mouseX = e.targetTouches[0].clientX - Egret3D.Egret3DDrive.clientRect.left;
            this.mouseY = e.targetTouches[0].clientY - Egret3D.Egret3DDrive.clientRect.top;

            this.mouseOffsetX = this.mouseX - this.mouseLastX;
            this.mouseOffsetY = this.mouseY - this.mouseLastY;

            e.preventDefault();

            if (e.targetTouches.length > 1) {

                var newPosition1: Point = new Point(this.mouseX, this.mouseY);
                var newPosition2: Point = new Point(e.targetTouches[1].clientX - Egret3D.Egret3DDrive.clientRect.left, e.targetTouches[1].clientY - Egret3D.Egret3DDrive.clientRect.top);

                if (this._oldPosition1 == null)
                    this._oldPosition1 = newPosition1;
                if (this._oldPosition2 == null)
                    this._oldPosition2 = newPosition2;

                if (this.isEnlarge(this._oldPosition1, this._oldPosition2, newPosition1, newPosition2))
                    this.wheelDelta = 120;
                else
                    this.wheelDelta = -120;


                this._oldPosition1 = newPosition1;
                this._oldPosition2 = newPosition2;



                for (var i: number = 0; i < this._mouseWheelFunc.length; ++i) {
                    this._mouseWheelFunc[i]();
                }

                //Debug.instance.trace("touchMove: " + e.touches.length, "this.wheelDelta:" + this.wheelDelta);
            }
            else {
                if (new Date().getTime() - this._time > 500) {

                    for (var i: number = 0; i < this._mouseMoveFunc.length; ++i) {
                        this._mouseMoveFunc[i]();
                    }
                }
                else {


                    var direction: number = this.GetSlideDirection(this.mouseLastX, this.mouseLastY, this.mouseX, this.mouseY);

                    if (direction > 0) {
                        this._listenerSwipe[direction - 1]();
                    }
                }
            }

            for (var i: number = 0; i < this._touchMoveCallback.length; i++) {
                this._touchMoveCallback[i](e);
            }
        }

        /**
        * @language zh_CN
        * 更新游戏手柄信息
        */
        public update() {
            for (var key in this._keyStatus) {
                if (this._keyStatus[key]) {
                    if (this._listenerKey[key] != undefined) {
                        for (var i: number = 0; i < this._listenerKey.length; ++i) {
                            this._listenerKey[i](key);
                        }
                    }
                }
            }
        }

        /**
        * @language zh_CN
        * 添加鼠标移动事件的侦听器函数
        * @param func {Function} 处理鼠标移事件的侦听器函数
        */
        public addListenerMouseMove(func: Function) {
            this._mouseMoveFunc.push(func);
        }

        /**
        * @language zh_CN
        * 添加鼠标滚轮事件的侦听器函数
        * @param func {Function} 处理鼠标滚轮事件的侦听器函数
        */
        public addListenerMouseWheel(func: Function) {
            this._mouseWheelFunc.push(func);
        }

        /**
        * @language zh_CN
        * 添加键盘鼠标点击事件的侦听器函数
        * @param func {Function} 处理键盘鼠标点击事件的侦听器函数
        */
        public addListenerKeyClick(func: Function) {
            this._listenerKeyClick.push(func);
        }

        /**
        * xxxxxxxx
        * @param func xxx
        * @returns xxx
        */
        public addListenerKey(func: Function) {
            this._listenerKey.push(func);
        }

        /**
        * @language zh_CN
        * 添加键盘鼠标弹起事件的侦听器函数
        * @param func {Function} 处理键盘鼠标弹起事件的侦听器函数
        */
        public addListenerKeyUp(func: Function) {
            this._listenerKeyUp.push(func);
        }

        /**
        * @language zh_CN
        * 添加键盘鼠标按下事件的侦听器函数
        * @param func {Function} 处理键盘鼠标按下事件的侦听器函数
        */
        public addListenerKeyDown(func: Function) {
            this._listenerKeyDown.push(func);
        }


        /**
        * @language zh_CN
        * 添加向上划动的手势事件
        * @param func {Function} 处理向上划动的手势事件的侦听器函数
        */
        public addListenerSwipeUp(func: Function) {
            this._listenerSwipe.push(func);
        }

        /**
        * @language zh_CN
        * 添加向下划动的手势事件
        * @param func {Function} 处理向下划动的手势事件的侦听器函数
        */
        public addListenerSwipeDown(func: Function) {
            this._listenerSwipe.push(func);
        }
        /**
        * @language zh_CN
        * 添加向左划动的手势事件
        * @param func {Function} 处理向下划动的手势事件的侦听器函数
        */
        public addListenerSwipeLeft(func: Function) {
            this._listenerSwipe.push(func);
        }

        /**
        * @language zh_CN
        * 添加向右划动的手势事件
        * @param func {Function} 处理向下划动的手势事件的侦听器函数
        */
        public addListenerSwipeRight(func: Function) {
            this._listenerSwipe.push(func);
        }

        /**
        * @language zh_CN
        * 添加设备旋转事件
        * @param func {Function} 设备旋转事件的侦听器函数
        */
        public addListenerDeviceorientation(func: Function) {
            this._ondeviceorientation.push(func);
        }

        /**
        * @language zh_CN
        * 添加设备移动事件
        * @param func {Function} 设备移动事件的侦听器函数
        */
        public addListenerDevicemotion(func: Function) {
            this._ondevicemotion.push(func);
        }

        /**
        * @language zh_CN
        * 添加游戏手柄按钮点击事件
        * @param func {Function} 游戏手柄点击事件的侦听器函数
        */
        public addListenerGamePadButtons(func: Function) {
            this._listenerGamepadButtons.push(func);
        }

        private mouseEnd(e: MouseEvent) {
            this.mouseX = e.clientX - Egret3D.Egret3DDrive.clientRect.left;
            this.mouseY = e.clientY - Egret3D.Egret3DDrive.clientRect.top;

            var k: number = 0;
            switch (e.button) {
                case 0:
                    k = KeyCode.Key_Mouse_Left;
                    break;
                case 2:
                    k = KeyCode.Key_Mouse_Right;
                    break;
                case 1:
                    k = KeyCode.Key_Mouse_Mid;
                    break;
            }

            if (k != 0) {
                if (this._keyStatus[k]) {
                    for (var i: number = 0; i < this._listenerKeyClick.length; ++i) {
                        this._listenerKeyClick[i](k);
                    }
                }

                this._keyStatus[k] = false;

                for (var i: number = 0; i < this._listenerKeyUp.length; ++i) {
                    this._listenerKeyUp[i](k);
                }
            }
        }

        private mouseStart(e: MouseEvent) {
            this.mouseX = e.clientX - Egret3D.Egret3DDrive.clientRect.left;
            this.mouseY = e.clientY - Egret3D.Egret3DDrive.clientRect.top;

            var k: number = 0;
            switch (e.button) {
                case 0:
                    k = KeyCode.Key_Mouse_Left;
                    break;
                case 2:
                    k = KeyCode.Key_Mouse_Right;
                    break;
                case 1:
                    k = KeyCode.Key_Mouse_Mid;
                    break;
            }

            if (k != 0) {
                this._keyStatus[k] = true;

                for (var i: number = 0; i < this._listenerKeyDown.length; ++i) {
                    this._listenerKeyDown[i](k);
                }
            }
        }

        private mouseMove(e: MouseEvent) {
            this.mouseLastX = this.mouseX;
            this.mouseLastY = this.mouseY;

            this.mouseX = e.clientX - Egret3D.Egret3DDrive.clientRect.left;
            this.mouseY = e.clientY - Egret3D.Egret3DDrive.clientRect.top;

            this.mouseOffsetX = this.mouseX - this.mouseLastX;
            this.mouseOffsetY = this.mouseY - this.mouseLastY;

            for (var i: number = 0; i < this._mouseMoveFunc.length; ++i) {
                this._mouseMoveFunc[i]();
            }
        }

        private mouseWheel(e: MouseWheelEvent) {
            this.wheelDelta = e.wheelDelta;

            for (var i: number = 0; i < this._mouseWheelFunc.length; ++i) {
                this._mouseWheelFunc[i]();
            }
        }

        private keyDown(e: KeyboardEvent) {
            this._keyStatus[e.keyCode] = true;

            for (var i: number = 0; i < this._listenerKeyDown.length; ++i) {
                this._listenerKeyDown[i](e.keyCode);
            }
        }

        private keyUp(e: KeyboardEvent) {
            if (this._keyStatus[e.keyCode]) {
                for (var i: number = 0; i < this._listenerKeyClick.length; ++i) {
                    this._listenerKeyClick[i](e.keyCode);
                }
            }

            this._keyStatus[e.keyCode] = false;

            for (var i: number = 0; i < this._listenerKeyUp.length; ++i) {
                this._listenerKeyUp[i](e.keyCode);
            }
        }

        //返回角度
        private GetSlideAngle(dx, dy) {
            return Math.atan2(dy, dx) * 180 / Math.PI;
        }

        /**
        * @language zh_CN
        * 根据起点和终点返回方向
        * @param  startX 起点X坐标
        * @param  startY 起点Y坐标
        * @param  endX   终点X坐标
        * @param  endY   终点Y坐标
        * @returns result {number} 1：向上，2：向下，3：向左，4：向右,0：未滑动
        */
        public GetSlideDirection(startX, startY, endX, endY): number {
            var dy = startY - endY;
            var dx = endX - startX;
            var result = 0;
 
            //如果滑动距离太短
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return result;
            }

            var angle = this.GetSlideAngle(dx, dy);
            if (angle >= -45 && angle < 45) {
                result = 4;
            } else if (angle >= 45 && angle < 135) {
                result = 1;
            } else if (angle >= -135 && angle < -45) {
                result = 2;
            }
            else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            }

            return result;
        }

        private isEnlarge(op1: Point, op2: Point, np1: Point, np2: Point): boolean {
            //函数传入上一次触摸两点的位置与本次触摸两点的位置计算出用户的手势
            var leng1 = Math.sqrt((op1.x - op2.x) * (op1.x - op2.x) + (op1.y - op2.y) * (op1.y - op2.y));
            var leng2 = Math.sqrt((np1.x - np2.x) * (np1.x - np2.x) + (np1.y - np2.y) * (np1.y - np2.y));

            if (leng1 < leng2) {
                //放大手势
                return true;
            } else {
                //缩小手势
                return false;
            }
        }
    }
}
