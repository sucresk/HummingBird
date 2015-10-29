module Egret3D {

    export class Debug {

        private _console: HTMLElement;
        private _isDebug: boolean = false;

        constructor() {
            this._console = document.getElementById('console');
            this._console.style.color = "red";
        }


        public trace(...parameters: string[]): void {
            if (this._isDebug) {      
                this.reset();
                var len: number = parameters.length;
                for (var i: number = 0; i < len; i++) {
                    this._console.innerHTML += parameters[i] + "</br>";

                }
            }
        }

        public reset(): void {
            this._console.innerHTML = "";
        }

        private static _instance: Debug = null;

        public static get instance(): Debug {
            if (this._instance == null) {
                this._instance = new Debug();
            }
            return this._instance;
        }
    }

} 