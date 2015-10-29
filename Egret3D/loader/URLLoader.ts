module Egret3D {
    export class URLLoader {
        private _url: string = "";
        private _data: any = null;
        private _xhr: XMLHttpRequest;
        public _dataformat: string = null;
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
        public static DATAFORMAT_ESM: string = "esm";
        public static DATAFORMAT_EAM: string = "eam";
        public static DATAFORMAT_ECA: string = "eca";
        public static DATAFORMAT_PVR:string = "pvr";

        constructor(url: string = null, dataformat:string = null) {
            if (url) {
                if (dataformat) {
                    this.dataformat = dataformat;
                }
                this.load(url);
            }
        }

        public load(url: string) {
            this._data = null;
            this._url = url;

            if (null == this._dataformat) {

                this._dataformat = URLLoader.DATAFORMAT_TEXT;

                if (this._url.length >= 4) switch (this._url.substr(this._url.length - 4, 4).toLowerCase()) {
                    case ".dds": this._dataformat = URLLoader.DATAFORMAT_DDS; break;
                    case ".tga": this._dataformat = URLLoader.DATAFORMAT_TGA; break;
                    //case ".e3d": this._dataformat = URLLoader.DATAFORMAT_E3D; break;
                    case ".bmp": this._dataformat = URLLoader.DATAFORMAT_BITMAP; break;
                    case ".png": this._dataformat = URLLoader.DATAFORMAT_BITMAP; break;
                    case ".jpg": this._dataformat = URLLoader.DATAFORMAT_BITMAP; break;
                    case "glsl": this._dataformat = URLLoader.DATAFORMAT_TEXT; break;
                    case ".pvr": this._dataformat = URLLoader.DATAFORMAT_PVR; break;
                    case ".esm": this._dataformat = URLLoader.DATAFORMAT_ESM; break;
                    case ".eam": this._dataformat = URLLoader.DATAFORMAT_EAM; break;
                    case ".eca": this._dataformat = URLLoader.DATAFORMAT_ECA; break;
                }
            }

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
            if (this.dataformat == URLLoader.DATAFORMAT_BITMAP) {
                this._xhr.responseType = "blob";
            } else if (this.dataformat != URLLoader.DATAFORMAT_TEXT) {
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
                    this._data = new ByteArray(this._xhr.response);
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
                    var that = this;
                    img.onload = () => {
                        that._data = new ImageTexture(img);
                        if (that.onLoadComplete) {
                            that.onLoadComplete(that);
                        }
                    };
                    return;
                case URLLoader.DATAFORMAT_DDS:
                    this._data = DDSParser.parse(this._xhr.response);
                    break;
                case URLLoader.DATAFORMAT_TGA:
                    this._data = TGAParser.parse(this._xhr.response);
                    break;
                /*case URLLoader.DATAFORMAT_E3D:
                    var e3dModel: BlackSwan.GeomtryBase = BlackSwan.E3DParser.parse(this._xhr.response);

                    this._data = e3dModel;
                    break;*/
                case URLLoader.DATAFORMAT_ESM:
                    var geomtry: GeometryBase = ESMParser.parse(this._xhr.response);

                    this._data = geomtry;
                    break;
                case URLLoader.DATAFORMAT_EAM:
                    var animation: AnimationState = EAMParser.parse(this._xhr.response);

                    this._data = animation;
                    break;
                case URLLoader.DATAFORMAT_ECA:

                    var cameraAnimationController: CameraAnimationController = ECAParser.parse(this._xhr.response);

                    this._data = cameraAnimationController;
                    break;
                case URLLoader.DATAFORMAT_PVR:
                    var pvr:PVR = PVRParser.parse(this._xhr.response);
                    this._data = pvr;
                    break;

                default:
                    this._data = this._xhr.responseText;
            }

            if (this.onLoadComplete) {
                this.onLoadComplete(this);
            }
        }

        private onProgress(event: ProgressEvent): void {
            //console.log("progress event```");
        }

        private onError(event: ErrorEvent): void {
            if (this.onLoadError) {
                this.onLoadError();
            }
            Debug.instance.trace("loaderror, url: ", this._url);
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
