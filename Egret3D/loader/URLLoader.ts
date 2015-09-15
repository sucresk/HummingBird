module xxq {
    export class URLLoader {
        private _url: string = "";
        private _data: any = null;
        private _xhr: XMLHttpRequest;
        public _dataformat: string = "text";
        public onLoadComplete: Function = null;
        public onLoadError: Function = null;
        public onLoadProgress: Function = null;

        public static DATAFORMAT_BINARY: string = "binary";
        public static DATAFORMAT_TEXT: string = "text";
        public static DATAFORMAT_SOUND: string = "sound";
        public static DATAFORMAT_BITMAP: string = "bitmap";
        public static DATAFORMAT_DDS: string = "dds";
        public static DATAFORMAT_TGA: string = "tga";
        public static DATAFORMAT_E3D: string = "e3d";

        constructor(url: string = null, dataformat:string = "text") {
            if (url) {
                this.dataformat = dataformat;
                this.load(url);
            }
        }

        public load(url: string) {
            this._data = null;
            this._url = url;
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
           
            this._xhr.open("GET", this._url, true);
            this._xhr.addEventListener("progress", (e) => this.onProgress(e), false);
            this._xhr.addEventListener("readystatechange", (e) => this.onReadyStateChange(e), false);
            this._xhr.addEventListener("error", (e) => this.onError(e), false);
            if (this.dataformat == xxq.URLLoader.DATAFORMAT_BITMAP) {
                this._xhr.responseType = "blob";
            } else if (this.dataformat != xxq.URLLoader.DATAFORMAT_TEXT) {
                this._xhr.responseType = "arraybuffer";
            }
            this._xhr.send();
        }

        public get dataformat(): string {
            return this._dataformat;
        }

        public set dataformat(value: string) {
            this._dataformat = value;
           
        }

        public get data(): any {
            return this._data;
        }

        public get url(): string {
            return this._url;
        }

        //0 //Uninitialized
        //初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
        //1 //Open
        //open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
        //2 //Send
        //Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
        //3 //Receiving
        //所有响应头部都已经接收到。响应体开始接收但未完成。
        //4 //Loaded
        //HTTP 响应已经完全接收。
        private onReadyStateChange(event: Event): void {
            console.log("xhr.readyState: ", this._xhr.readyState);
            if (this._xhr.readyState == 4) {
                if (this._xhr.status >= 400 || this._xhr.status == 0) {
                    console.log(this._url, "load fail");
                } else {
                    this.loadComplete();
                }
            }
        }

        private loadComplete(): void {
            switch (this.dataformat) {
                case URLLoader.DATAFORMAT_BINARY:
                    this._data = new BlackSwan.ByteArray(this._xhr.response);
                    break;
                case URLLoader.DATAFORMAT_SOUND:
                    this._data = this._xhr.responseBody;
                    break;
                case URLLoader.DATAFORMAT_TEXT:
                    this._data = this._xhr.responseText;
                    break;
                case URLLoader.DATAFORMAT_BITMAP:
                    var img = document.createElement("img");
                    img.src = window["URL"].createObjectURL(this._xhr.response);
                    this._data = img;
                    break;
                case URLLoader.DATAFORMAT_DDS:
                    var dds: BlackSwan.DDS = BlackSwan.DDSParser.parse(this._xhr.response);

                    this._data = new BlackSwan.BitmapTexture(dds.width, dds.height, dds.mipmaps[0]);

                    //this._data = dds;
                    break;
                case URLLoader.DATAFORMAT_TGA:
                    var tga: BlackSwan.TGA = BlackSwan.TGAParser.parse(this._xhr.response);
                    this._data = tga;
                    break;
                case URLLoader.DATAFORMAT_E3D:
                    var e3dModel: BlackSwan.GeomtryBase = BlackSwan.E3DParser.parse(this._xhr.response);

                    this._data = e3dModel;
                    break;
                default:
                    this._data = this._xhr.responseText;
            }

            if (this.onLoadComplete) {
                this.onLoadComplete(this);
            }
            console.log(this._data);
        }

        private onProgress(event: ProgressEvent): void {
            console.log("progress event```");
        }

        private onError(event: ErrorEvent): void {
            if (this.onLoadError) {
                this.onLoadError();
            }
            console.log("load error", event);
        }


        private getXHR(): any {
            var xhr: any = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            } else {
                xhr = new ActiveXObject("MSXML2.XMLHTTP");
            }
            return xhr;
        }
    }
}
