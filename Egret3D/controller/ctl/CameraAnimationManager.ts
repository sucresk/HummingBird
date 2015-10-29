module Egret3D {
    export class CameraAnimationManager {

        private _animation: { [name: string]: CameraAnimationController} = {};

        constructor() {
        }

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