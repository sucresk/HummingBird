module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.URLLoader
     * @classdesc
     * URLLoader类
     */
    export class URLLoader {
        /**
      * @language en_US
      */
        /**
        * @language zh_CN
        * 加载的地址
        */
        private _url: string = "";

        /**
      * @language en_US
      */
        /**
        * @language zh_CN
        * 加载的数据.
        */
        private _data: any = null;
        private _xhr: XMLHttpRequest;
        /**
        * @language en_US
        */
        /**
        * @language zh_CN
        * 控制以哪种方式接收加载的数据.
         * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
         * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
        */
        private _dataformat: string = null;
        /**
        * @language en_US
        */
        /**
        * @language zh_CN
        * 加载完成的回调函数.
         * 回调函数参数为该UrlLoader实例
        */
        public onLoadComplete: Function = null;

        
        /**
        * @language en_US
        */
        /**
        * @language zh_CN
        * 加载失败的回调函数
        */
        public onLoadError: Function = null;
        /**
        * @language en_US
        */
        /**
        * @language zh_CN
         * 加载过程调用的函数
        */
        public onLoadProgress: Function = null;

        /**
        * @language en_US
        */
        /**
        * @language zh_CN
        * 以二进制方式接收加载的数据
        */
        public static DATAFORMAT_BINARY: string = "binary";
        /**
        * @language en_US
        */
        /**
        * @language zh_CN
        * 以文本的方式接收加载的数据
         * 默认方式
        */
        public static DATAFORMAT_TEXT: string = "text";
        /**
        * @language en_US
        */
        /**
        * @language zh_CN
         * 以音频的方式接收加载的数据
        */
        public static DATAFORMAT_SOUND: string = "sound";

        /**
      * @language en_US
      */
        /**
        * @language zh_CN
        * 以图像的方式接收加载的数据
         * 支持jpg.png.等格式
        */
        public static DATAFORMAT_BITMAP: string = "bitmap";
        /**
      * @language en_US
      */
        /**
        * @language zh_CN
        * 以DDS的方式接收加载的数据
        */
        public static DATAFORMAT_DDS: string = "dds";
        /**
      * @language en_US
      */
        /**
        * @language zh_CN
        * 以TGA的方式接收加载的数据
        */
        public static DATAFORMAT_TGA: string = "tga";
        /**
          * @language en_US
          */
        /**
        * @language zh_CN
        * 以ESM格式接收加载的数据
         * Egret3D独有的格式 模型+蒙皮
        */
        public static DATAFORMAT_ESM: string = "esm";
        /**
      * @language en_US
      */
        /**
        * @language zh_CN
        * 以EAM格式接收加载的数据
         * Egret3D独有的格式 动作文件
        */
        public static DATAFORMAT_EAM: string = "eam";
        /**
      * @language en_US
      */
        /**
        * @language zh_CN
        * 以ECA格式接收加载的数据
         * Egret3D独有的格式 相机动画文件
        */
        public static DATAFORMAT_ECA: string = "eca";
        /**
      * @language en_US

      */
        /**
        * @language zh_CN
        * 以pvr格式接收加载的数据
        */
        public static DATAFORMAT_PVR: string = "pvr";
        /**
      * @language en_US
      */
        /**
        * @language zh_CN
        * @param url 加载数据的地址.如果参数不为空的话.将直接开始加载
         * @param dataformat 以什么方式进行加载.如果为空的话.将通过目标文件的后缀名判断,
         * 如果为空且文件后缀不为内置支持的集中文件类型的话.将以文本格式进行加载解析
        */
        constructor(url: string = null, dataformat: string = null) {
            if (url) {
                if (dataformat) {
                    this.dataformat = dataformat;
                }
                this.load(url);
            }
        }

        /**
       * @language en_US
       */
        /**
        * @language zh_CN
        * 加载目标地址的数据
        * @param url 数据地址
        */
        public load(url: string) {
            this._data = null;
            this._url = url;

            if (null == this._dataformat) {

                this._dataformat = URLLoader.DATAFORMAT_TEXT;

                if (this._url.length >= 4) switch (this._url.substr(this._url.length - 4, 4).toLowerCase()) {
                    case ".dds": this._dataformat = URLLoader.DATAFORMAT_DDS; break;
                    case ".tga": this._dataformat = URLLoader.DATAFORMAT_TGA; break;
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

        /**
         * @language zh_CN
         * @returns string
         */
        public get dataformat(): string {
            return this._dataformat;
        }

        /**
         * @language zh_CN
         * @param value 
         */
        public set dataformat(value: string) {
            this._dataformat = value;

        }

        /**
         * @language zh_CN
         * @returns any
         */
        public get data(): any {
            return this._data;
        }

        /**
         * @language zh_CN
         * @returns string 
         */
        public get url(): string {
            return this._url;
        }

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
                case URLLoader.DATAFORMAT_ESM:
                    var geomtry: GeometryBase = ESMParser.parse(this._xhr.response);

                    this._data = geomtry;
                    break;
                case URLLoader.DATAFORMAT_EAM:
                    var skeletonAnimationClip: SkeletonAnimationClip = EAMParser.parse(this._xhr.response);

                    this._data = skeletonAnimationClip;
                    break;
                case URLLoader.DATAFORMAT_ECA:

                    var cameraAnimationController: CameraAnimationController = ECAParser.parse(this._xhr.response);

                    this._data = cameraAnimationController;
                    break;
                case URLLoader.DATAFORMAT_PVR:
                    var pvr: PVR = PVRParser.parse(this._xhr.response);
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
