module Egret3D {
    export class TouchInput {

        public onPanstar: Function = null;
        public onPanmove: Function = null;//平移
        public onPanend: Function = null;
        public onPancancel: Function = null;


        public onPinchin: Function = null;// 捏放
        public onPress: Function = null;//按住
        public onPressup: Function = null;
        public onRotate: Function = null;
        public onSwipeleft: Function = null; //快速滑动
        public onSwiperight: Function = null;
        public onTap: Function = null;//点击

        constructor() {

        }

        //创建一个新的hammer对象并且在初始化时指定要处理的dom元素
        public init(element: HTMLElement, options?: any) {
            var hammer = new Hammer(element);

            hammer.on('panmove', (e: HammerInput) => this.onPanHandler(e));
            hammer.on('panend', (e: HammerInput) => this.onPanHandler(e));
            hammer.on('pancancel', (e: HammerInput) => this.onPanHandler(e));

            hammer.add(new Hammer.Pinch());
            hammer.on('pinchin', (e: HammerInput) => this.onPinchinHandler(e));

            hammer.on('press', (e: HammerInput) => this.onPressHandler(e));
            hammer.on('pressup', (e: HammerInput) => this.onPressUpHandler(e));

            hammer.add(new Hammer.Rotate());
            hammer.on("rotate", (e: HammerInput) => this.onRotateHandler(e));


            hammer.on("swipeleft", (e: HammerInput) => this.onSwipeLeftHandler(e));
            hammer.on("swiperight", (e: HammerInput) => this.onSwipeRightHandler(e));

            hammer.on("tap", (e: HammerInput) => this.onTapHandler(e));
        }

        private onTapHandler(e: HammerInput) {
            if (this.onTap != null) {
                this.onTap(e);
            }
        }
        private onSwipeRightHandler(e: HammerInput) {
            if (this.onSwiperight != null) {
                this.onSwiperight(e);
            }
        }

        private onSwipeLeftHandler(e: HammerInput) {
            if (this.onSwipeleft != null) {
                this.onSwipeleft(e);
            }
        }

        private onRotateHandler(e: HammerInput) {
            if (this.onRotate != null) {
                this.onRotate(e);
            }
        }

        private onPressHandler(e: HammerInput) {
            if (this.onPress != null) {
                this.onPress(e);
            }
        }

        private onPressUpHandler(e: HammerInput) {
            if (this.onPressup != null) {
                this.onPressup(e);
            }
        }


        private onPinchinHandler(e: HammerInput) {
            if (this.onPinchin != null) {
                this.onPinchin(e);
            }
            
        }

        private onPanHandler(e: HammerInput) {

            if (e.type == 'panmove' && this.onPanmove) {
                this.onPanstar(e);
            }
            else if (e.type == 'panend' && this.onPanend) {
                this.onPanstar(e);
            }
            else if (e.type == 'pancancel' && this.onPancancel) {
                this.onPanstar(e);
            }
        }

        private static _instance: TouchInput = null;

        public static get instance(): TouchInput {
            if (this._instance == null) {
                this._instance = new TouchInput();
            }
            return this._instance;
        }

    }
} 