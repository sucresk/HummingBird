module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.Sound
     * @classdesc
     * 音频数据
     */
    export class Sound {

        private isLoaded: boolean;
        /**
        * @language zh_CN
        * HTML音频数据
        */
        public audio: HTMLAudioElement = null;


        private _buffer: AudioBuffer;

        /**
        * @language zh_CN
        * Web音频数据
        * @returns {AudioBuffer}   
        */
        public get buffer(): AudioBuffer {
            return this._buffer;
        }

        private _success: Function;
        private _error: Function;


        /**
        * @language zh_CN
        * constructor
        * @param {String}   音频文件路径
        * @param {Function} 音频文件加载成功的事件处理函数
        * @param {Function} 音频文件加载失败的事件处理函数
        */
        constructor(url: string, success: Function, error: Function) {

            this._success = success;
            this._error = error;

            this.isLoaded = false;

            if (AudioManager.instance.hasAudioContext()) {
                if (AudioManager.instance.isSupported(url, this.audio)) {
                    console.warn('Audio format not supported');
                    error(this);
                }
                else {
                    if (AudioManager.instance.context)
                    {
                        this.loadAudioFile(url);
                    }
                }
            }
            else if (AudioManager.instance.hasAudio())
            {
                try {
                    this.audio = new Audio();
                }
                catch (e) {
                    console.warn("No support for Audio element");
                    if (error)
                        error(this);
                    return;
                }

                if (AudioManager.instance.isSupported(url, this.audio)) {
                    console.warn('Audio format not supported');
                    if (error)
                        error(this);
                }
                else {
                    this.audio.src = url;
                    this.audio.addEventListener("canplaythrough", (ev: Event) => this.oncanplaythrough(ev));
                    this.audio.addEventListener("ended", (ev: Event) => this.onended(ev));

                    this.audio.load();
                }
            }
        }

        private xhr: XMLHttpRequest;

        private loadAudioFile(url) {
            if (this.xhr == null)
                this.xhr = new XMLHttpRequest(); //通过XHR下载音频文件
            this.xhr.open('GET', url, true);
            this.xhr.responseType = 'arraybuffer';


            this.xhr.onload = (e: Event) => this.audioLoadend(e);

            this.xhr.send();
        }

        private audioLoadend(e: Event) {
            AudioManager.instance.context.decodeAudioData(this.xhr.response, (buffer) => this.decodeSuccessCallback(buffer));
        }

        private decodeSuccessCallback(buffer: AudioBuffer) {

            this._buffer = buffer;

            if (this._success)
                this._success(this);
        }

        private onended(ev: Event): void {

        }

        private oncanplaythrough(ev: Event): void {

            if (!this.isLoaded) {
                this.isLoaded = true;

                if (this._success)
                    this._success(this);
            }
        }
    }
} 