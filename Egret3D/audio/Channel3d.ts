module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.Channel3d
     * @classdesc
     * 控制音频的 播放，暂停，三维空间中的位置
     */
    export class Channel3d extends Channel {


        private _panner: PannerNode;

        /**
        * @language zh_CN
        * constructor
        * @param sound {Sound}
        * @param {Object} options
        * @param {Number} [options.volume] 回放音量, 0 到 1.
        * @param {Boolean} [options.loop] 是否循环播放.
        */
        constructor(sound: Sound, options: any) {

            super(sound, options);

            this._position = new Vector3D();
            this._velocity = new Vector3D();
            this._panner = this.context.createPanner();

        }

        private _position: Vector3D;

        /**
        * @language zh_CN
        * 三维空间中的位置
        * @returns {Vector3D}   
        */
        public get position() {
            return this.position;
        }
        /**
        * @language zh_CN
        * 三维空间中的位置
        * @param opsition {Vector3D}   
        */
        public set position(position:Vector3D) {
            this._position.copyFrom(position);
            this._panner.setPosition(position.x, position.y, position.z);
        }
        private _velocity: Vector3D;

        /**
        * @language zh_CN
        * 传播方向
        * @returns {Vector3D}   
        */

        public get velocity() {
            return this._velocity;
        }
        /**
        * @language zh_CN
        * 传播方向
        * @param velocity {Vector3D}   
        */
        public set velocity(velocity:Vector3D) {
            this._velocity.copyFrom(velocity);
            this._panner.setVelocity(velocity.x, velocity.y, velocity.z);
        }
        /**
        * @language zh_CN
        * 最大距离
        * @returns {Vector3D}   
        */
        public get maxDistance(){
            return this._panner.maxDistance;
        }
        /**
        * @language zh_CN
        * 最大距离
        * @param max{Number}   
        */
        public set maxDistance(max:number) {
            this._panner.maxDistance = max;
        }
        /**
        * @language zh_CN
        * 最小距离
        * @returns {Vector3D}   
        */
        public get minDistance() {
            return this._panner.refDistance;
        }
        /**
        * @language zh_CN
        * 最小距离
        * @param min{Number}   
        */
        public set minDistance(min: number) {
            this._panner.refDistance = min;
        }

        /**
        * @language zh_CN
        * rollOff 系数
        * @returns {Number}   
        */
        public get rollOffFactor() {
            return this._panner.rolloffFactor;
        }
        /**
        * @language zh_CN
        * rollOff 系数
        * @param factor {Number}   
        */
        public set rollOffFactor(factor:number) {
            this._panner.rolloffFactor = factor;
        }

        protected createSource(){

            this.source = this.context.createBufferSource();
            this.source.buffer = this.sound.buffer;
            // Connect up the nodes
            this.source.connect(this._panner);
            this._panner.connect(this.gain);
            this.gain.connect(this.context.destination);
        }
    }
} 