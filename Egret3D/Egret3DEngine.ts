module Egret3D {
    export class Egret3DEngine {
        private static djs: string = "" ;
        private static scriptSource: Array<string>;
        private static importList: Array<string> ;
        private static _xhr: XMLHttpRequest ;
        private static _libUrl: string = "/js/Egret3D/Egret3D.lib.js";
        private static _complete:Function ; 
        private static getXHR(): any {
            var xhr: any = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            } else {
                xhr = new ActiveXObject("MSXML2.XMLHTTP");
            }
            return xhr;
        }

        public static preload(complete: Function) {
            this._complete = complete;
            if (this._xhr == null) {
                this._xhr = this.getXHR();
            }
            if (this._xhr == null) {
                alert("Your browser does not support XMLHTTP.");
                return;
            }
            if (this._xhr.readyState > 0) {
                this._xhr.abort();
            }

            this._xhr.open("GET", this._libUrl, true);
            this._xhr.addEventListener("progress", (e) => Egret3DEngine.onProgress(e), false);
            this._xhr.addEventListener("readystatechange", (e) => Egret3DEngine.onReadyStateChange(e), false);
            this._xhr.addEventListener("error", (e) => Egret3DEngine.onError(e), false);
            this._xhr.responseType = "text";
            this._xhr.send();
        }

        private static onReadyStateChange(event: Event): void {
            if (this._xhr.readyState == 4) {
                if (this._xhr.status >= 400 || this._xhr.status == 0) {
                    console.log(this._libUrl, "load fail");
                } else {
                    this.loadComplete();
                }
            }
        }

        private static loadComplete(): void {
            var libTex: string = this._xhr.responseText;
            this.applyClass(libTex);
        }

        private static onProgress(event: ProgressEvent): void {
            var e: string = event.loaded.toString() + event.total ; 
            console.log("progress event```" + e );
        }

        private static onError(event: ErrorEvent): void {
            console.log("load error", event);
        }

        private static applyClass(source: string) {
            this.importList = source.split("///");
            this.importList.shift();

            for (var i: number = 0; i < this.importList.length; i++){
                this.importList[i] = this.importList[i].replace("\r\n", "");
                this.importList[i] = this.importList[i].replace("import ", "/js/");
            }
            this.importList.pop();
            this.startLoadScript(null);
        }

        private static startLoadScript(e) {
            if (this.importList.length > 0) {
                var egret3DScript: HTMLScriptElement = document.createElement("script");
                egret3DScript.src = this.importList.shift();
                egret3DScript.onload = (e) => this.startLoadScript(e);
                egret3DScript.onerror = (e) => this.loadScriptError(e);
                document.head.appendChild(egret3DScript);
            }
            else {
                console.log("all complete");
                this._complete();
            }
        }

        private static loadScriptError(e) {
            var error: string = "load Script Error \r\n no file:" + e.srcElement.src ; 
            alert(error);
            this.startLoadScript(null);
        }
       
    }
}