module Egret3D {
    /**
    * @class Egret3D.CameraAnimationManager
    * @classdesc
    * 摄像机动画控制器管理
    */
    export class CameraAnimationManager {
        private _animation: { [name: string]: CameraAnimationController} = {};
                /**
        * @language zh_CN
        * constructor
        */        constructor() {
        }
        /**
        * @language zh_CN
        * 播放某个动画
        * @param name 动画名
        * @param camera 相机
        * @param isLoop 是否循环
        */
        public play(name: string, camera: Camera3D, isLoop:boolean) {
            if (this._animation[name] != undefined) {
                this._animation[name].bindCamera(camera);
                this._animation[name].play(isLoop);
            }
            else {
                var loader: Egret3D.URLLoader = new Egret3D.URLLoader();
                loader.onLoadComplete = (loader: Egret3D.URLLoader) => this.onCallback(loader, name, camera, isLoop);
                loader.load(name);
            }
        }
        /**
        * @language zh_CN
        * 更新数据
        * @param time 当前时间
        * @param delay 每帧间隔时间
        */
        public update(time:number, delay:number) {

            for (var key in this._animation) {
                this._animation[key].update(time, delay);
            }
        }
        private onCallback(loader: Egret3D.URLLoader, name: string, camera: Camera3D, isLoop: boolean) {
            this._animation[name] = loader.data;
            this._animation[name].bindCamera(camera);
            this._animation[name].play(isLoop);
        }
    }
} 