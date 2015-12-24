module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.Channel
     * @classdesc
     * 控制音频的 播放，暂停等
     */
    export class Channel {
        /**
        * @language zh_CN
        * 设置音量 从0到1
        */
        public volume: number = 1.0;
        /**
        * @language zh_CN
        * 开始/关闭 循环属性 使声音播放结束时重新开始播放
        */
        public loop: boolean = false;
        /**
        * @language zh_CN
        * 开始/关闭 循环属性 使声音播放结束时重新开始播放
        */

        
        /**
        * @language zh_CN
        * 设置音频 playbackRate
        */
        public pitch: number = 1.0;

        protected context: AudioContext;
        protected sound: Sound;
        private paused: boolean;
        private startTime: number;
        private startOffset: number;
        protected gain: GainNode;
        protected source: any;

        /**
        * @language zh_CN
        * constructor
        * @param sound {Sound}
        * @param {Object} options
        * @param {Number} [options.volume] 回放音量, 0 到 1.
        * @param {Boolean} [options.loop] 是否循环播放.
        */
        constructor(sound: Sound, options: any) {

            options = options || {};
            if (options.volume)
                this.volume = options.volume;
            if (options.loop)
                this.loop = options.loop;
            if (options.pitch)
                this.pitch = options.pitch;

            this.sound = sound;

            this.paused = false;


            if (AudioManager.instance.hasAudioContext()) {
                this.context = AudioManager.instance.context;
                this.startTime = 0;
                this.startOffset = 0;
                this.source = null;
                this.gain = this.context.createGain();
            }
            else if (AudioManager.instance.hasAudio())
            {
                if (this.sound.audio)
                {
                    this.source = this.sound.audio.cloneNode(false);
                    this.source.pause();
                }
            }
        }

        /**
        * @language zh_CN
        * 开始播放声音
        */
        public play() {

            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    throw new Error("Call stop() before calling play()");
                }

                this.createSource();
                if (!this.source) {
                    return;
                }

                this.startTime = this.context.currentTime;
                this.source.start(0, this.startOffset % this.source.buffer.duration);
            }
            else if (AudioManager.instance.hasAudio) {
                this.paused = false;
                this.source.play();
            }

            this.setVolume(this.volume);
            this.setLoop(this.loop);
            this.setPitch(this.pitch);
        }

        /**
        * @language zh_CN
        * 暂停播放声音 
        */
        public pause() {
            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    this.startOffset += this.context.currentTime - this.startTime;
                    this.source.stop(0);
                    this.source = null;
                }
            }
            else if (AudioManager.instance.hasAudio()) {
                if (this.source) {
                    this.source.pause();
                }
            }

            this.paused = true;

        }

        /**
        * @language zh_CN
        * 继续播放声音  从暂停的位置继续播放声音
        */
        public unpause() {

            if (AudioManager.instance.hasAudioContext()) {
                if (this.source || !this.paused) {
                    throw new Error('Call pause() before unpausing.');
                }

                this.createSource();

                if (!this.source) {
                    return;
                }

                this.startTime = this.context.currentTime;
                this.source.start(0, this.startOffset % this.source.buffer.duration);

                // Initialize volume and loop
                this.setVolume(this.volume);
                this.setLoop(this.loop);
                this.setPitch(this.pitch);
            }
            else if (AudioManager.instance.hasAudio())
            {
                this.source.play();
            }




            this.paused = false;
        }

        /**
        * @language zh_CN
        * 停止播放声音  执行 play() 从初始位置开始播放声音
        */
        public stop() {

            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    this.source.stop(0);
                    this.startOffset = 0;
                    this.source = null;
                }
            }
            else if (AudioManager.instance.hasAudio())
            {
                if (this.source) {
                    this.source.pause();
                    this.source.currentTime = 0;
                }
            }


        }


        public setLoop(value:boolean) {
            this.loop = value;
            if (this.source) {
                this.source.loop = value;
            }
        }

        public setVolume(value:number) {
            this.volume = value;

            if (this.gain) {
                this.gain.gain.value = value * AudioManager.instance.volume;
            }
            else if (this.source) {
                this.source.volume = value * AudioManager.instance.volume;
            }

        }

        public setPitch(value:number) {
            this.pitch = value;


            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    this.source.playbackRate.value = value;
                }
            }
            else if (AudioManager.instance.hasAudio()) {
                if (this.source) {
                    this.source.playbackRate = value;
                }
            }

        }

        /**
        * @language zh_CN
        * 音频是否正在播放
        * @returns {boolean}   
        */
        public isPlaying():boolean {
            if (AudioManager.instance.hasAudioContext()) {
                return (!this.paused);
            }
            else if (AudioManager.instance.hasAudio())
            {
                return (!this.source.paused)
            }


        }

        /**
        * @language zh_CN
        * 音频持续时间
        * @returns {number}   
        */
        public getDuration():number {

            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    return this.source.buffer.duration;
                }
            }
            else if (AudioManager.instance.hasAudio()) {
                if (this.source) {
                    var d = this.source.duration;
                    if (d === d) {
                        return d;
                    }
                }
            }


            return 0;
        }


        protected createSource() {

            if (this.sound.buffer) {
                this.source = this.context.createBufferSource();
                this.source.buffer = this.sound.buffer;

                this.source.connect(this.gain);
                this.gain.connect(this.context.destination);


                if (this.loop) {
                    this.source.onended = () => this.play();
                }
            }
        }
    }

} 