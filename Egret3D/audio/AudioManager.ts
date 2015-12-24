module Egret3D {
    /**
    * @language zh_CN
    * @class Egret3D.AudioManager
    * @classdesc
    * Audio管理类 支持HTML5 Audio 和 Web Audio
    */
    export class AudioManager{

        public context: AudioContext;

        /**
        * @language zh_CN
        * 音量 
        */
        public volume: number = 1;

        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            if (this.hasAudioContext()) {
                if (typeof AudioContext !== 'undefined') {
                    this.context = new AudioContext();
                }

            }
        }
        /**
        * @language zh_CN
        * 是否支持 HTML5 Audio tag API
        * @returns {boolean}   
        */
        public hasAudio():boolean {
            return (typeof Audio !== 'undefined');
        }

        /**
        * @language zh_CN
        * 是否支持 Web Audio API
        * @returns {boolean}   
        */
        public hasAudioContext():boolean {
            return !!(typeof AudioContext !== 'undefined');
        }

        private codecs = {};


        /**
        * @language zh_CN
        * 浏览器是否可以播放这种音频类型
        * @param url 音频路径
        * @param audio {HTMLAudioElement}  
        * @returns {boolean}   
        */
        public isSupported(url: string, audio:HTMLAudioElement): boolean {

            if (this.codecs == null) {
                if (audio == null)
                    audio = new Audio();

                this.codecs = {
                    mp3: !!audio.canPlayType('audio/mpeg;').replace(/^no$/, ''),
                    opus: !!audio.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
                    ogg: !!audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
                    wav: !!audio.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
                    aac: !!audio.canPlayType('audio/aac;').replace(/^no$/, ''),
                    m4a: !!(audio.canPlayType('audio/x-m4a;') || audio.canPlayType('audio/m4a;') || audio.canPlayType('audio/aac;')).replace(/^no$/, ''),
                    mp4: !!(audio.canPlayType('audio/x-mp4;') || audio.canPlayType('audio/mp4;') || audio.canPlayType('audio/aac;')).replace(/^no$/, ''),
                    weba: !!audio.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
                };
            }


            var ext: any = url.match(/^data:audio\/([^;,]+);/i);
            if (!ext) {
                ext = url.split('?', 1)[0].match(/\.([^.]+)$/);
            }

            if (ext) {
                ext = ext[1].toLowerCase();

            }

            return this.codecs[ext];
        }

        /**
        * @language zh_CN
        * 创建一个新的Sound对象
        * @param {String}   音频文件路径
        * @param {Function} 音频文件加载成功的事件处理函数
        * @param {Function} 音频文件加载失败的事件处理函数
        * @returns {Sound}   
        */
        public createSound (url, success, error):Sound {
            return new Sound(url, success, error);
        }



        /**
        * @language zh_CN
        * 创建一个新的 Channel 对象 播放声音
        * @param {sound} 要播放的Sound对象.
        * @param {Object} options 
        * @param {Number} [options.volume] 回放音量, 0 到 1.
        * @param {Boolean} [options.loop]  是否循环播放.
        * @returns {Channel}   
        */
        public playSound (sound, options) {
            options = options || {};
            var channel: Channel = new Channel(sound, options);
            channel.play();

            return channel;
        }

        /**
        * @language zh_CN
        * 创建一个新的 Channel3d 对象 在指定的位置播放声音
        * @param {Sound} 要播放的 Sound 对象
        * @param {position} 声音在三维空间中的位置
        * @param {Object} options
        * @param {Number} [options.volume] 回放音量, 0 到 1.
        * @param {Boolean} [options.loop] 是否循环播放.
        * @returns {Channel}   
        */
        public playSound3d(sound: Sound, position: Vector3D, options: any):Channel3d {
            options = options || {};
            var channel: Channel3d = new Channel3d(sound, options);
            channel.position = position;

            if (options.volume) {
                channel.setVolume(options.volume);
            }
            if (options.loop) {
                channel.setLoop(options.loop);
            }
            if (options.maxDistance) {
                channel.maxDistance = options.maxDistance;
            }
            if (options.minDistance) {
                channel.minDistance = options.minDistance;
            }
            if (options.rollOffFactor) {
                channel.rollOffFactor = options.rollOffFactor;
            }
            channel.play();
            return channel;
        }


        private static _instance: AudioManager;

        public static get instance(): AudioManager {
            if (this._instance == null) {
                this._instance = new AudioManager();
            }
            return this._instance;
        }
    }
}