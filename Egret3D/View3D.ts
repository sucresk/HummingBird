module Egret3D {
                        
    /**
     * @class Egret3D.View3D
     * @classdesc
     * 渲染视图
     */   
    export class View3D {

        protected _root: Object3D = new Object3D();
        protected _context3D: Context3D;
        protected _camera: Camera3D;
        protected _collect: EntityCollect;

        protected _render: RenderBase;
        protected _shadowRender: ShadowRender;

        protected _width: number = 0;
        protected _height: number = 0;
        protected _x: number = 0;
        protected _y: number = 0;

        protected _localPos: Point = new Point();
        protected _globalPos: Point = new Point();
        protected _globalPosDirty: Boolean;

        protected _aspectRatio: number = 1;
        protected _scissorRect: Rectangle;
        protected _viewPort: Rectangle;
        protected _scissorRectDirty: Boolean = true;
        protected _viewportDirty: Boolean = true;

        protected _viewPortMatrix: Matrix4_4 = new Matrix4_4();

        protected _useShadow: boolean = false ;
        protected _backImg: HUD;
        protected _postCanvas: PostCanvas;
        protected _sky: Sky;
        protected _sphereSky: SphereSky;

        protected _postList: Array<PostEffectBase>;

        protected _isDeferred: boolean = false;
        protected _sourceFrameBuffer: FrameBuffer;

        protected _resizeFuncs: Array<Function> = new Array<Function>();

        private _mouseEventManager: Mouse3DManager;

        /**
        * @language zh_CN
        * @readOnly
        * 返回渲染根节点
        * @returns 根节点
        */
        public get root(): Object3D {
            return this._root;
        }

        protected _wireframeList: Array<WireframeBase> = new Array<WireframeBase>();
        protected _hudList: Array<HUD> = new Array<HUD>();
        
        /**
        * @language zh_CN
        * constructor
        * @param viewPort
        * @param camera
        * @param deferredShading
        */
        constructor(viewPort: Rectangle, camera: Camera3D = null, deferredShading: boolean = false) {

            this._context3D = Egret3DDrive.context3D;
            this._camera = camera || new Camera3D(CameraType.perspective);
            this._scissorRect = new Rectangle();
            this._viewPort = viewPort;

            this._collect = new EntityCollect(this._root);

            this._render = RenderManager.getRender(RenderType.defaultRender);
            this._isDeferred = deferredShading;

            //this.requestFrameBuffer();

            this.x = viewPort.x;
            this.y = viewPort.y;
            this.width = viewPort.width;
            this.height = viewPort.height;

            window.addEventListener("resize", () => this.resize());

            this._mouseEventManager = new Mouse3DManager(this._camera, this._collect);

        }

        private resize() {
            this.x = this.viewPort.x = 0 ;
            this.y = this.viewPort.y = 0 ;
            this.width = this.viewPort.width = window.innerWidth ;
            this.height = this.viewPort.height = window.innerHeight ;
            Egret3DDrive.canvas.width = this.viewPort.width;
            Egret3DDrive.canvas.height = this.viewPort.height;
            Egret3DDrive.canvasRectangle.x = this.x;
            Egret3DDrive.canvasRectangle.y = this.y;
            Egret3DDrive.canvasRectangle.width = this.width;
            Egret3DDrive.canvasRectangle.height = this.height;
            this.updateViewSizeData();

            for (var i: number = 0; i < this._resizeFuncs.length; ++i) {
                this._resizeFuncs[i]();
            }
        }

        /**
        * @language zh_CN
        * @writeOnly
        * 是否使用影子
        * @param flag
        */
        public set useShadow(flag: boolean) {

            this._useShadow = flag; 
            if (flag) {
                this._shadowRender = new ShadowRender();
            }
        }

        /**
        * @language zh_CN
        * @readOnly
        */
        public get useShadow(): boolean {
            return this._useShadow; 
        }

        protected requestFrameBuffer() {
            if (this._isDeferred) {
            }
            else {
                this._postCanvas = new PostCanvas();
                //this._defaultFrameBuffer = RttManager.getInstance().creatFrameBuffer(FrameBuffer.defaultFrameBuffer, this._context3D, 1024, 1024);
            }
        }

        /**
        * @language zh_CN
        * 监听设备重置回调
        * @event func  
        */
        public addListenerResize(func: Function) {
            this._resizeFuncs.push(func);
        }

        /**
        * @language zh_CN
        * 得到视口
        * @returns Rectangle
        */
        public get viewPort(): Rectangle {
            return this._viewPort;
        }

        /**
        * @language zh_CN
        * 设置天空盒子
        * @writeOnly
        */
        public set sky(value: Sky) {

            this._sky = value;
        }

        /**
        * @language zh_CN
        * 设置天空球
        * @writeOnly
        */
        public set sphereSky(value: SphereSky) {
            this._sphereSky = value;
        }

        /**
        * @language zh_CN
        * 得到天空盒子
        * @readOnly
        */
        public get sky(): Sky {
            return this._sky;
        }

        /**
        * @language zh_CN
        * 增加HUD进渲染列表
        * @param hud 
        */
        public addHUD(hud: HUD) {
            this._hudList.push(hud);
        }

        /**
        * @language zh_CN
        * 在渲染列表中删除一个HUD
        * @param hud 
        */
        public delHUN(hud: HUD) {

            var index: number = this._hudList.indexOf(hud);
            this._hudList.splice(index, 1);
        }

        /**
        * @language zh_CN
        * 增加wireframe进渲染列表
        * @param wireframe 
        */
        public addWireframe(wireframe: WireframeBase) {
            this._wireframeList.push(wireframe);
        }

        /**
        * @language zh_CN
        * 在渲染列表中删除一个HUD
        * @param hud 
        */
        public delWireframe(wireframe: WireframeBase) {
            var index: number = this._wireframeList.indexOf(wireframe);
            this._wireframeList.splice(index, 1);
        }

        /**
        * @language zh_CN
        * 设置背景渲染贴图
        * @param texture 贴图
        */
        public set backImageTexture(texture: TextureBase) {

            if (!this._backImg) {
                this._backImg = new HUD();
                this._backImg.x = 0;// viewPort.width * 0.5  ;
                this._backImg.y = 0;// * 0.5  ;
                this._backImg.width = this.width;
                this._backImg.height = this.height;
            }
            texture.upload( this._context3D );
            this._backImg.texture = texture ;
        }

        /**
        * @language zh_CN
        * xxxxxxxx
        * @param postEffects xxx
        * @returns xxx
        */
        public set postEffect( postEffects: Array<PostEffectBase> ) {

            if (postEffects) {
                this._postCanvas = this._postCanvas || new PostCanvas();
                this._postList = postEffects;
                for (var i: number = 0; i < this._postList.length;i++){
                    this._postList[i].init(this._context3D, 512, 512 );
                }
                this._sourceFrameBuffer = this._sourceFrameBuffer || RttManager.creatFrameBuffer(FrameBufferType.defaultFrameBuffer, this._context3D, 512, 512, FrameBufferFormat.UNSIGNED_BYTE_RGB);
            }
        }

        /**
        * @language zh_CN
        * xxxxxxxx
        * @returns xxx
        */
        public get collect(): CollectBase {

            return this._collect;
        }

        /**
        * @language zh_CN
        * xxxxxxxx
        * @returns xxx
        */
        public get camera3D(): Camera3D {

            return this._camera;
        }

        /**
        * @language zh_CN
        * @readOnly
        * @returns Context3D
        */
        public get context3D(): Context3D {

            return this._context3D;
        }

        /**
        * @language zh_CN
        * The width of the viewport. When software rendering is used, this is limited by the
        * platform to 2048 pixels.
        * @returns width
        */
        public get width(): number {

            return this._width;
        }

        /**
        * @language zh_CN
        * 
        * @param value width
        */
        public set width(value: number) {

            this._width = value;
            this._aspectRatio = this._width / this._height;
            this._camera.aspectRatio = this._aspectRatio;
            this._scissorRect.width = value;
            this._scissorRectDirty = true;
        }
		
        /**
        * @language zh_CN
        * The height of the viewport. When software rendering is used, this is limited by the
        * platform to 2048 pixels.
        * @returns height
        */
        public get height(): number {

            return this._height;
        }

        /**
        * @language zh_CN
        * 
        * @param value height
        */
        public set height(value: number) {

            this._height = value;
            this._aspectRatio = this._width / this._height;
            this._camera.aspectRatio = this._aspectRatio;
            this._scissorRect.height = value;
            this._scissorRectDirty = true;
        }

        /**
        * @language zh_CN
        * @writeOnly
        * @param value x
        */
        public set x(value: number) {

            if (this._x == value)
                return;

            this._localPos.x = this._x = value;

            this._globalPos.x = value;
            this._globalPosDirty = true;
        }

        /**
        * @language zh_CN
        * @writeOnly
        * @param value y
        */
        public set y(value: number) {

            if (this._y == value)
                return;

            this._localPos.y = value;

            this._globalPos.y = value;
            this._globalPosDirty = true;
        }
        /**
        * @language zh_CN
        * 
        * @returns x
        */
        public get x(): number {

            return this._x;
        }

        /**
        * @language zh_CN
        * 
        * @returns y
        */
        public get y(): number {

            return this._y;
        }

        /**
        * @language zh_CN
        * 
        * @param child3D xxx
        */
        public addChild3D(child3D: Object3D) {

            this._root.addChild(child3D);
        }

        /**
        * @language zh_CN
        * 渲染
        * @param time 当前时间
        * @param delay 时间间隔
        */
        public renden(time: number, delay: number) {


            this.updateViewSizeData();
            this._context3D.gl.enable(Egret3DDrive.BLEND);
            this._context3D.gl.enable(Egret3DDrive.CULL_FACE)

            this._context3D.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);

            this._context3D.clear(0.3, 0.3, 0.3, 1);

            if (this._backImg)
                this._backImg.draw(this._context3D);

            this._context3D.clearDepth(1);

            this._context3D.clearStencil(0);

            this._collect.update(this._camera);

            //----------即时渲染部分-------------------
            if (!this._isDeferred) {
                
                if (this._postList) {

                    if (this._useShadow) {
                        RttManager.drawToTexture(time, delay, ShadowRender.frameBuffer.texture.texture, this._context3D, this._shadowRender, this.collect, this._camera, this.viewPort);
                    }

                    if (this._sky) {
                        this._sky.draw(this._context3D, this.camera3D);
                    }
                    else if (this._sphereSky) {
                        this._sphereSky.draw(this._context3D, this.camera3D);
                    }

                    RttManager.drawToTexture(time, delay, this._sourceFrameBuffer.texture.texture, this._context3D, this._render , this.collect, this._camera, this.viewPort);
                    
                    this._context3D.clearDepth(1);

                    var next: FrameBuffer = this._sourceFrameBuffer; 

                    for (var i: number = 0; i < this._postList.length; i++) {
                        this._postList[i].drawToTarget(this._sourceFrameBuffer, next, this._context3D,this._viewPort);
                        next = this._postList[i].nextFrameBuffer;
                    }

                    this._postCanvas.width = this._viewPort.width;
                    this._postCanvas.height = this._viewPort.height;
                    this._postCanvas.texture = next.texture;
                    this._postCanvas.draw(this._context3D , this._viewPort);
                }
                else {
                    if (this._sky) {
                        this._sky.draw(this._context3D, this.camera3D);
                    }
                    else if (this._sphereSky) {
                        this._sphereSky.draw(this._context3D, this.camera3D);
                    }

                    if (this._useShadow) {
                       RttManager.drawToTexture(time, delay, ShadowRender.frameBuffer.texture.texture, this._context3D, this._shadowRender , this.collect, this._camera, this.viewPort);
                    }

                    this._context3D.clearDepth(1);
                    this._context3D.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
                    this._render.draw(time, delay, this._context3D, this.collect, this._camera);
                }
            }
            //----------延迟渲染部分-------------------
      
            for (var i: number = 0; i < this._wireframeList.length; i++) {
                this._wireframeList[i].draw(this._context3D,this.camera3D);
            }

            for (var i: number = 0; i < this._hudList.length; i++) {
                this._hudList[i].draw(this._context3D);
            }

            this._context3D.gl.finish();

        }

        protected updateViewSizeData() {

            this._camera.aspectRatio = this._aspectRatio;

            if (this._scissorRectDirty) {
                this._scissorRectDirty = false;
                this._camera.updateScissorRect(this._scissorRect.x, this._scissorRect.y, this._scissorRect.width, this._scissorRect.height);
            }

            if (this._viewportDirty) {
                this._viewportDirty = false;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
            }

        }
                
        /**
        * @language zh_CN
        * 设置tag名和name的下标为index 没有的话会新加tag
        * @param name tag名
        * @param index 下标
        */
        public setTags(name: string, index: number) {

            this._collect.setTags(name, index);
        }

        /**
        * @language zh_CN
        * 设置layer名和name的下标为index
        * @param layer layer名
        * @param index 下标
        */
        public setTagsItem(layer: string, index: number) {

            this._collect.setTagsItem(layer, index);
        }
                                
        /**
        * @language zh_CN
        * 得到layer的值
        * @param name tag名
        * @param layer layer名
        * @returns 返回layer的值
        */
        public getTagLayer(name: string = "default", layer: string = "layer_0"): number {

            return this._collect.getTagLayer(name, layer);
        }
                                        
        /**
        * @language zh_CN
        * 得到tag
        * @param name tag名
        * @returns tag
        */
        public getTag(name: string = "default"): Tag {
            return this._collect.getTag(name);
        }
    }
}