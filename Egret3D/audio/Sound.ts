module Egret3D {

    export class Sound {

        public buffer: AudioBuffer;
        public audio: HTMLAudioElement;
        public isLoaded: boolean;

        constructor(manager:AudioManager,url: string, success: Function, error: Function) {
            if (manager.hasAudioContext) {
                this.buffer = null;
                this.isLoaded = false;

                if (!manager.isSupported(url, this.audio)) {
                    setTimeout(function () {
                        console.warn('Audio format not supported');
                        success(this);
                    }, 0);
                }
                else if (manager.context){
                    var request = new XMLHttpRequest(); ///建立一个请求
                    request.open('GET', url, true); ///配置好请求类型，文件路径等
                    request.responseType = 'arraybuffer'; ///配置数据返回类型
                    request.onload = function ()
                    {

                        manager.context.decodeAudioData(request.response, function (buffer) {
                            this.buffer = buffer;
                            this.isLoaded = true;
                            success(this);
                        });

                    }

                    request.send();
                }
            }
            else if (manager.hasAudio) {
                this.isLoaded = false;
                try {
                    this.audio = new Audio();
                } catch (e) {
                    console.warn("Not support for Audio element");
                    success(this);
                    return;
                }

                if (!manager.isSupported(url, this.audio)) {
                    console.warn('Audio format not supported');
                    success(this);
                }
                else {
                    if (this.isIE())
                        document.body.appendChild(this.audio);

                    this.audio.oncanplaythrough = function () {
                        if (this.isIE())
                            document.body.removeChild(this.audio);

                        if (!this.isLoaded) {
                            this.isLoaded = true;
                            success(this);
                        }
                    }.bind(this);


                    this.audio.src = url;
                }
            }


        }

        private isIE():boolean {
            var ua = window.navigator.userAgent;

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                /// IE 10 or older
                return !!parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                /// IE 11 
                var rv = ua.indexOf('rv:');
                return !!parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            return false;
        };
    }
} 