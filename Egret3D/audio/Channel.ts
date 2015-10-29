module Egret3D {

    export class Channel {

        private _volume: number;
        private _loop: boolean;
        private _pitch: number;
        
        private sound: Sound;
        private paused: boolean;
        private suspended: boolean;

        private startTime: number;
        private startOffset: number;

        private manager: AudioManager;
        private gain: GainNode;

        private source: HTMLAudioElement;

        constructor(manager: AudioManager, sound: Sound, options: any) {
            options = options || {};

            if (manager.hasAudioContext) {
                this._volume = (options.volume === undefined) ? 1 : options.volume;
                this._loop = (options.loop === undefined) ? false : options.loop;
                this._pitch = (options.pitch === undefined ? 1 : options.pitch);

                this.sound = sound;

                this.paused = false;
                this.suspended = false;

                this.startTime = 0;
                this.startOffset = 0;

                this.manager = manager;

                this.source = null;

                var context = manager.context;
                this.gain = context.createGain();
            }
            else if (manager.hasAudio) {
                this._volume = options.volume || 1;
                this._loop = options.loop || false;
                this.sound = sound;
                this._pitch = options.pitch !== undefined ? options.pitch : 1;

                this.paused = false;
                this.suspended = false;

                this.manager = manager;

                if (sound.audio) {
                    this.source = sound.audio;
                    this.source.pause(); 
                }
            }
        }

        public play(): void {
            if (this.source) {
                this.paused = false;
                this.setVolume(this._volume);
                this.setLoop(this._loop);
                this.setPitch(this._pitch);
                this.source.play();
                this.source.load();
            }
        }

        public setLoop(loop:boolean) {
            this._loop = loop;
            if (this.source) {
                this.source.loop = loop;
            }
        }


        public setVolume(volume:number) {
            this._volume = volume;
            if (this.gain) {
                this.gain.gain.value = volume * this.manager.volume;
            }
        }

        public isPlaying():boolean {
            return (!this.paused);
        }



        public setPitch (pitch:number) {
            this._pitch = pitch;
            if (this.source) {
                this.source.playbackRate = pitch;
            }
        }


        private createSource () {
            var context = this.manager.context;

        }


        private pause() {
            if (this.source) {
                this.paused = true;
                ///this.source.pause();
            }
        }

    }
}  