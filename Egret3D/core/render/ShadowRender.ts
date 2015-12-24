module Egret3D {

    /**
    * @class Egret3D.ShadowRender
    * @classdesc
    * 阴影渲染器
    */
    export class ShadowRender extends RenderBase {
        public static frameBuffer: FrameBuffer; 
        public static castShadowLight: LightBase;
        public static shadowCamera3D: Camera3D;

        public shadowTexture_width: number = 1024;
        public shadowTexture_height: number = 1024;
                        
        /**
        * @language zh_CN
        * constructor
        */
        constructor( ) {
            super();
            ShadowRender.shadowCamera3D = new Camera3D(CameraType.orthogonal);//temp
            ShadowRender.frameBuffer = RttManager.creatFrameBuffer(FrameBufferType.shadowFrameBufrfer,Egret3DDrive.context3D,this.shadowTexture_width,this.shadowTexture_height,FrameBufferFormat.UNSIGNED_BYTE_RGBA);
        }
                                                
        /**
        * @language zh_CN
        * 渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public draw(time: number, delay: number, context3D: Context3D, collect: CollectBase, camera: Camera3D) {
            if (ShadowRender.castShadowLight) {
                this.offsetPos( new Vector3D() );
                this._renderList = collect.renderList;
                this._numEntity = this._renderList.length;
                for (this._renderIndex = 0; this._renderIndex < this._numEntity; this._renderIndex++) {
                    if (this._renderList[this._renderIndex].material.castShadow) {
                        this._renderList[this._renderIndex].update(time, delay);
                        if (!this._renderList[this._renderIndex].isVisible) {
                            continue;
                        }
                        this._renderList[this._renderIndex].material.rendenShadowPass(context3D, ShadowRender.shadowCamera3D , this._renderList[this._renderIndex].modelMatrix, this._renderList[this._renderIndex].geometry, this._renderList[this._renderIndex].animation);
                    }
                }
            }
        }

        private cameraTarget: Vector3D = new Vector3D();
        private cameraPos: Vector3D = new Vector3D();
        private distance: number = 0;
        public offsetPos( offset:Vector3D ) {
            this.cameraPos.x = ShadowRender.castShadowLight.rotationX;
            this.cameraPos.y = ShadowRender.castShadowLight.rotationY;
            this.cameraPos.z = ShadowRender.castShadowLight.rotationZ;
            this.cameraPos.normalize();
            this.cameraPos.scaleBy(1.0 * 500);

            this.cameraPos.x = this.cameraPos.x + offset.x;
            this.cameraPos.y = this.cameraPos.y + offset.y;
            this.cameraPos.z = this.cameraPos.z + offset.z;

            ShadowRender.shadowCamera3D.lookAt(this.cameraPos, offset );
        }
    }
} 