module BlackSwan {

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

    export class Input {

        public mouseX: number = 0;
        public mouseY: number = 0;


        public wheelDelta: number = 0;

        public mouseOffsetX: number = 0;
        public mouseOffsetY: number = 0;


        public mouseLastX: number = 0;
        public mouseLastY: number = 0;

        private _time: number = 0;

        private _keyStatus: { [key: number]: boolean; } = {};

        private _listenerKey: Array<Function> = new Array<Function>();
        private _listenerKeyUp: Array<Function> = new Array<Function>();
        private _listenerKeyDown: Array<Function> = new Array<Function>();

        private _listenerSwipe: Array<Function> = new Array<Function>();

        private _mouseMoveFunc: Array<Function> = new Array<Function>();
        private _mouseWheelFunc: Array<Function> = new Array<Function>();

        private _ondeviceorientation: Array<Function> = new Array<Function>();
        private _ondevicemotion: Array<Function> = new Array<Function>();



        private static _instance: Input = null;

        public static get instance(): Input {
            if (this._instance == null) {
                this._instance = new Input();
            }
            return this._instance;
        }

        constructor() {
            window.onmousewheel = (e: MouseWheelEvent) => this.mouseWheel(e);
            window.onmousedown = (e: MouseEvent) => this.mouseStart(e);
            window.onmouseup = (e: MouseEvent) => this.mouseEnd(e);
            window.onmousemove = (e: MouseEvent) => this.mouseMove(e);
            window.onkeydown = (e: KeyboardEvent) => this.keyDown(e);
            window.onkeyup = (e: KeyboardEvent) => this.keyUp(e);



            window.ontouchstart = (e: TouchEvent) => this.touchStart(e);
            window.ontouchend = (e: TouchEvent) => this.touchEnd(e);
            window.ontouchmove = (e: TouchEvent) => this.touchMove(e);
            window.ontouchcancel = (e: TouchEvent) => this.touchEnd(e);


            // window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.ondeviceorientation(e) );
            // window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.detectShake(e));

        }

        private detectShake(evt: DeviceMotionEvent) {
            var status = document.getElementById("console");
            var accl = evt.acceleration; //acceleration 排除重力影响的加速度  accelerationIncludingGravity(含重力的加速度)
            //x、y 和 z 轴方向加速
            if (accl.x > 1.5 || accl.y > 1.5 || accl.z > 1.5) {
                status.innerHTML = "EARTHQUAKE!!!";
            } else {
                status.innerHTML = "All systems go!";
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
                //
                // if (this._first) {
                //     this._initAngle["x"] = alpha;
                //     this._initAngle["y"] = beta;
                //     this._initAngle["z"] = gamma;
                // }
                //
                // this._delayX = alpha - this._caheX;
                // this._delayY = beta - this._caheY;
                // this._delayZ = gamma - this._caheZ;
                //
                // this._caheX = alpha;
                // this._caheY = beta;
                // this._caheZ = gamma;

                //this._initAngle.x += this._delayX;
                //this._initAngle.y += this._delayY;
                //this._initAngle.z += this._delayZ;

                this._initAngle.x = alpha;
                this._initAngle.y = beta;
                this._initAngle.z = gamma;

                this._ondeviceorientation[0](this._initAngle);

                directions.innerHTML = e.absolute + "<br>" + alpha + "<br>" + beta + " <br>" + gamma;
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

            var console = document.getElementById('console');
            console.innerHTML = "touchStart: " + e.touches.length + "\n";

            var x1: number = e.targetTouches[0].clientX - BlackSwan.Egret3D.clientRect.left;
            var y1: number = e.targetTouches[0].clientY - BlackSwan.Egret3D.clientRect.top;

            if (e.targetTouches.length == 2) {

                var x2: number = e.targetTouches[1].clientX - BlackSwan.Egret3D.clientRect.left;
                var y2: number = e.targetTouches[1].clientY - BlackSwan.Egret3D.clientRect.top;

                this.onPinch(x1, y1, x2, y2);
            }
            else if (e.targetTouches.length == 1) {
                this.onSwipe(x1, y1);
            }

        }

        private _oldPosition1: Point = null;
        private _oldPosition2: Point = null;

        private touchEnd(e: TouchEvent) {

            var console = document.getElementById('console');

            console.innerHTML = "touchEnd : " + e.touches.length;

            if (e.targetTouches.length > 1) {

                var x: number = e.targetTouches[0].clientX - BlackSwan.Egret3D.clientRect.left;
                var y: number = e.targetTouches[0].clientY - BlackSwan.Egret3D.clientRect.top;
                var x1: number = e.targetTouches[1].clientX - BlackSwan.Egret3D.clientRect.left;
                var y1: number = e.targetTouches[1].clientY - BlackSwan.Egret3D.clientRect.top;

                this.onPinch(x, y, x1, y1);
            }
            else if (e.targetTouches.length == 1) {

                this.onSwipe(e.targetTouches[0].clientX - BlackSwan.Egret3D.clientRect.left, e.targetTouches[0].clientY - BlackSwan.Egret3D.clientRect.top);
            }
            else {

                this._oldPosition1 = null;
                this._oldPosition2 = null;
                this._time = 0;

                for (var i: number = 0; i < this._listenerKeyUp.length; ++i) {
                    this._listenerKeyUp[i](KeyCode.Key_Mouse_Left);
                }
            }


        }


        private touchMove(e: TouchEvent) {

            this.mouseLastX = this.mouseX;
            this.mouseLastY = this.mouseY;

            this.mouseX = e.targetTouches[0].clientX - BlackSwan.Egret3D.clientRect.left;
            this.mouseY = e.targetTouches[0].clientY - BlackSwan.Egret3D.clientRect.top;

            this.mouseOffsetX = this.mouseX - this.mouseLastX;
            this.mouseOffsetY = this.mouseY - this.mouseLastY;

            e.preventDefault();

            var console = document.getElementById('console');


            if (e.targetTouches.length > 1) {

                var newPosition1: Point = new Point(this.mouseX, this.mouseY);
                var newPosition2: Point = new Point(e.targetTouches[1].clientX - BlackSwan.Egret3D.clientRect.left, e.targetTouches[1].clientY - BlackSwan.Egret3D.clientRect.top);

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


                console.innerHTML = "this.wheelDelta:" + this.wheelDelta;

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


        }

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

        public addListenerMouseMove(func: Function) {
            this._mouseMoveFunc.push(func);
        }

        public addListenerMouseWheel(func: Function) {
            this._mouseWheelFunc.push(func);
        }

        public addListenerKey(func: Function) {
            this._listenerKey.push(func);
        }

        public addListenerKeyUp(func: Function) {
            this._listenerKeyUp.push(func);
        }

        public addListenerKeyDown(func: Function) {
            this._listenerKeyDown.push(func);
        }


        public addListenerSwipeUp(func: Function) {
            this._listenerSwipe.push(func);
        }

        public addListenerSwipeDown(func: Function) {
            this._listenerSwipe.push(func);
        }

        public addListenerSwipeLeft(func: Function) {
            this._listenerSwipe.push(func);
        }

        public addListenerSwipeRight(func: Function) {
            this._listenerSwipe.push(func);
        }

        public addListenerDeviceorientation(func: Function) {
            this._ondeviceorientation.push(func);
        }

        public addListenerDevicemotion(func: Function) {
            this._ondevicemotion.push(func);
        }

        private mouseEnd(e: MouseEvent) {
            this.mouseX = e.clientX - BlackSwan.Egret3D.clientRect.left;
            this.mouseY = e.clientY - BlackSwan.Egret3D.clientRect.top;

            var k: number = 0;
            switch (e.button) {
                case 0:
                    this._keyStatus[KeyCode.Key_Mouse_Left] = false;
                    k = KeyCode.Key_Mouse_Left;
                    break;
                case 2:
                    this._keyStatus[KeyCode.Key_Mouse_Right] = false;
                    k = KeyCode.Key_Mouse_Right;
                    break;
                case 1:
                    this._keyStatus[KeyCode.Key_Mouse_Mid] = false;
                    k = KeyCode.Key_Mouse_Mid;
                    break;
            }

            if (k != 0) {
                for (var i: number = 0; i < this._listenerKeyUp.length; ++i) {
                    this._listenerKeyUp[i](k);
                }
            }
        }

        private mouseStart(e: MouseEvent) {
            this.mouseX = e.clientX - BlackSwan.Egret3D.clientRect.left;
            this.mouseY = e.clientY - BlackSwan.Egret3D.clientRect.top;

            var k: number = 0;
            switch (e.button) {
                case 0:
                    this._keyStatus[KeyCode.Key_Mouse_Left] = true;
                    k = KeyCode.Key_Mouse_Left;
                    break;
                case 2:
                    this._keyStatus[KeyCode.Key_Mouse_Right] = true;
                    k = KeyCode.Key_Mouse_Right;
                    break;
                case 1:
                    this._keyStatus[KeyCode.Key_Mouse_Mid] = true;
                    k = KeyCode.Key_Mouse_Mid;
                    break;
            }

            if (k != 0) {
                for (var i: number = 0; i < this._listenerKeyDown.length; ++i) {
                    this._listenerKeyDown[i](k);
                }
            }
        }

        private mouseMove(e: MouseEvent) {
            this.mouseLastX = this.mouseX;
            this.mouseLastY = this.mouseY;

            this.mouseX = e.clientX - BlackSwan.Egret3D.clientRect.left;
            this.mouseY = e.clientY - BlackSwan.Egret3D.clientRect.top;

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
            this._keyStatus[e.keyCode] = false;

            for (var i: number = 0; i < this._listenerKeyUp.length; ++i) {
                this._listenerKeyUp[i](e.keyCode);
            }
        }

        //返回角度
        private GetSlideAngle(dx, dy) {
            return Math.atan2(dy, dx) * 180 / Math.PI;
        }

        //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
        public GetSlideDirection(startX, startY, endX, endY) {
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

    export class OrientationControls {

        private enabled: boolean = false;
        private q: Quaternion = new Quaternion();
        private deviceOrientation: DeviceOrientationEvent;
        private screenOrientation: number;
        private g: DeviceAcceleration;

        private alpha: number = 0;
        private beta: number = 0;
        private gamma: number = 0;

        private logGHelp: HTMLElement;
        private logRHelp: HTMLElement;
        private logHelp: HTMLElement;
        constructor() {
            this.logGHelp = document.createElement("div");
            this.logGHelp.style.color = "red";
            this.logGHelp.style.bottom = "300px";
            document.body.appendChild(this.logGHelp);

            this.logRHelp = document.createElement("div");
            this.logRHelp.style.color = "red";
            this.logRHelp.style.top = "300px";

            document.body.appendChild(this.logRHelp);

            this.logHelp = document.createElement("div");
            this.logHelp.style.color = "red";
            this.logHelp.style.top = "300px";
            document.body.appendChild(this.logHelp);
        }

        private onDeviceOrientationChangeEvent(event) {
            this.deviceOrientation = event;
            //this.enabled = true;
        }

        private onScreenOrientationChangeEvent() {
            this.screenOrientation = 0;
        }

        private onGChangeEvent(e: DeviceMotionEvent) {
            this.g = e.accelerationIncludingGravity;
            this.enabled = true;
            this.logGHelp.innerHTML = "<br><br>g: <br>gx:" + this.g.x + "<br> gy:" + this.g.y + "<br> gz:" + this.g.z + "<br>"  ;
        }

        public start() {
            this.onScreenOrientationChangeEvent(); // run once on load
            window.addEventListener('orientationchange', (e) => this.onScreenOrientationChangeEvent(), false);
            window.addEventListener('deviceorientation', (e) => this.onDeviceOrientationChangeEvent(e), false);
            window.addEventListener('devicemotion', (e) => this.onGChangeEvent(e), false);
        }

        public stop() {
            window.removeEventListener('orientationchange', (e) => this.onScreenOrientationChangeEvent(), false);
            window.removeEventListener('deviceorientation', (e) => this.onDeviceOrientationChangeEvent(e), false);
            window.removeEventListener('devicemotion', (e: DeviceMotionEvent) => this.onGChangeEvent(e), false);
            this.enabled = false;
        }

        //f32 angle = acos(dot(v1, v2));
        //vector v3 = cross(v1, v2);
        //v3.normalize();  
        ////use angle&angle to make rotate matrix  
        //CreateRotateMatrix(angle, v3);  
        private state: number = -1;
        private gv: Vector3D = new Vector3D();
        private yUp: Vector3D = new Vector3D(0, 1, 0);
        private angle: number;
        private axis: Vector3D = new Vector3D();
        private qqq: Quaternion = new Quaternion();
        public updata(camera: Camera3D) {

            this.alpha = this.deviceOrientation.alpha;
            this.beta = this.deviceOrientation.beta;
            this.gamma = this.deviceOrientation.gamma;

            if (this.g.x < 0 && this.g.y > 0 && this.g.z < 0) {
                this.state = 0;
                this.gamma = (270 - this.gamma);
                this.beta = -this.beta;
            }
            else if (this.g.x < 0 && this.g.y < 0 && this.g.z < 0) {
                this.state = 1;
                this.gamma = (270 - this.gamma);
                this.beta = 360-this.beta;
            }
            else if (this.g.x < 0 && this.g.y > 0 && this.g.z > 0) {
                this.state = 2;
                this.alpha = this.alpha + 180;
               this.gamma = 90 - this.gamma;
               this.beta = 180+this.beta;
            }
            else if (this.g.x < 0 && this.g.y < 0 && this.g.z > 0) {
                this.state = 3;
                this.alpha = this.alpha + 180; 
                this.gamma = 90 - this.gamma;
                this.beta = 360 - (180 - this.beta);
            }
            else if (this.g.x > 0 && this.g.y > 0 && this.g.z > 0) {
                this.state = 4;
                this.gamma = (90 - this.gamma);
                this.beta = 180 + this.beta;
            }
            else if (this.g.x > 0 && this.g.y < 0 && this.g.z > 0) {
                this.state = 5;
                this.gamma = (90 - this.gamma);
            }
            else if (this.g.x > 0 && this.g.y > 0 && this.g.z < 0) {
                this.state = 6;
                this.gamma = (270 - this.gamma);
            }
            else if (this.g.x > 0 && this.g.y < 0 && this.g.z < 0) {
                this.state = 7;
                this.gamma = (270 - this.gamma);
            }

            this.axis.x += 0.1; 
            this.axis.y += 0.1; 


            camera.rotationX = 45 ; 
            camera.rotationY = this.axis.y % 360 ; 
            //camera.rotationZ++; 
            this.logRHelp.innerHTML = "<br> alpha:" + this.alpha + "<br> beta:" + this.beta + "<br> gamma:" + this.gamma + "<br>";
            this.logHelp.innerHTML = "state -->" + this.state;
        }

        private degreeToRadiansFactor = Math.PI / 180;
        private degToRad(degrees) {
            return degrees * this.degreeToRadiansFactor;
        }

        private V1AndV2() {
            if (!this.enabled) return;
            this.gv.x = this.g.x;
            this.gv.y = this.g.y;
            this.gv.z = this.g.z;

            this.gv.normalize();
            this.yUp.normalize();

            this.angle = Math.acos(this.gv.dotProduct(this.yUp));
            this.axis = this.gv.crossProduct(this.yUp);

            this.qqq.fromAxisAngle(this.axis, this.angle);

            //Matrix3DUtils.quaternion2matrix(this.qqq, camera.modelMatrix);
        }
    }
} 