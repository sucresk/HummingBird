module Egret3D {

     /**
     * @class Egret3D.Debug
     * @classdesc
     * 调试面板
     */
    export class Debug {

        private _console: HTMLElement;
        private _isDebug: boolean = false;


        /**
         * @language zh_CN
         */
        constructor() {
            this._console = document.getElementById('console');
            this._console.style.color = "red";
        }


        /**
         * @language zh_CN
         * 输出调试信息
         * @param parameters 
         */
        public trace(...parameters: string[]): void {
            if (this._isDebug) {      
                this.reset();
                var len: number = parameters.length;
                for (var i: number = 0; i < len; i++) {
                    this._console.innerHTML += parameters[i] + "</br>";

                }
            }
        }

        /**
         * @language zh_CN
         * 重置
         */
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