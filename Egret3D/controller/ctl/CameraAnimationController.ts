module Egret3D {
    export class CameraAnimationController{

        public cameraAnimationFrames: Array<CameraAnimationFrame> = [];

        private _camera: Camera3D;
        private _playing: boolean = false;
        private _playTime: number = 0;
        private _currentFrameIndex: number = 0;
        private _loop: boolean = true;
        private _smooth: boolean = false;
        private _cameraAnimationFrame: CameraAnimationFrame = new CameraAnimationFrame();

        constructor(camera: Camera3D = null) {
            this._camera = camera;

            this._cameraAnimationFrame.fov = 45;
            this._cameraAnimationFrame.rotation = new Vector3D();
            this._cameraAnimationFrame.translation = new Vector3D();
        }

        public bindCamera(camera: Camera3D): void {
            this._camera = camera;
        }

        public play(isLoop: boolean): void {

            if (this.cameraAnimationFrames.length <= 0)
                return;

            this._loop = isLoop;
            this._playTime = 0;
            this._camera.isController = false;
            this._playing = true;
        }

        public update(time: number, delay: number) {

            if (!this._playing)
                return;

            this._playTime += delay * 10;

            var Tnow: number = this._playTime % ((this.cameraAnimationFrames[this.cameraAnimationFrames.length - 1].time - this.cameraAnimationFrames[0].time) + (160));

            var currentFrameIndex: number = Math.floor(Tnow / (160)) % this.cameraAnimationFrames.length;

            if (!this._loop && this._currentFrameIndex > currentFrameIndex) {
                this._playing = false;
                this._camera.isController = true;
            }

            this._currentFrameIndex = currentFrameIndex;

            var currentFrame: CameraAnimationFrame = this.cameraAnimationFrames[currentFrameIndex];

            if (this._smooth) {

                var nextFrameIndex: number = (currentFrameIndex + 1) % this.cameraAnimationFrames.length;

                var nextFrame: CameraAnimationFrame = this.cameraAnimationFrames[nextFrameIndex];

                var t: number = (Tnow - currentFrame.time) / Math.abs(nextFrame.time - currentFrame.time);
                
                ///(v1.x - v0.x) * t + v0.x;
                this._cameraAnimationFrame.fov = (nextFrame.fov - currentFrame.fov) * t + currentFrame.fov;
                this._cameraAnimationFrame.rotation.copyFrom(currentFrame.rotation); ///.lerp(currentFrame.rotation, nextFrame.rotation, t);
                this._cameraAnimationFrame.translation.lerp(currentFrame.translation, nextFrame.translation, t);
            }
            else {
                this._cameraAnimationFrame.fov = currentFrame.fov;
                this._cameraAnimationFrame.rotation.copyFrom(currentFrame.rotation);
                this._cameraAnimationFrame.translation.copyFrom(currentFrame.translation);
            }

            this._camera.fieldOfView = this._cameraAnimationFrame.fov;
            this._camera.rotationX = this._cameraAnimationFrame.rotation.x * Matrix3DUtils.RADIANS_TO_DEGREES + 90;
            this._camera.rotationY = this._cameraAnimationFrame.rotation.y * Matrix3DUtils.RADIANS_TO_DEGREES;
            this._camera.rotationZ = this._cameraAnimationFrame.rotation.z * Matrix3DUtils.RADIANS_TO_DEGREES;
            this._camera.position = this._cameraAnimationFrame.translation;
        }
    }

    export class CameraAnimationFrame {
        public time: number;
        public fov: number;
        public rotation: Vector3D;
        public translation: Vector3D;
        public matrix: Matrix4_4;
    }
}