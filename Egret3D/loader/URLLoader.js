var xxq;
(function (xxq) {
    var URLLoader = (function () {
        function URLLoader(url, dataformat) {
            if (url === void 0) { url = null; }
            if (dataformat === void 0) { dataformat = "text"; }
            this._url = "";
            this._data = null;
            this._dataformat = "text";
            this.onLoadComplete = null;
            this.onLoadError = null;
            this.onLoadProgress = null;
            if (url) {
                this.dataformat = dataformat;
                this.load(url);
            }
        }
        URLLoader.prototype.load = function (url) {
            var _this = this;
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
            this._xhr.addEventListener("progress", function (e) { return _this.onProgress(e); }, false);
            this._xhr.addEventListener("readystatechange", function (e) { return _this.onReadyStateChange(e); }, false);
            this._xhr.addEventListener("error", function (e) { return _this.onError(e); }, false);
            if (this.dataformat == xxq.URLLoader.DATAFORMAT_BITMAP) {
                this._xhr.responseType = "blob";
            }
            else if (this.dataformat != xxq.URLLoader.DATAFORMAT_TEXT) {
                this._xhr.responseType = "arraybuffer";
            }
            this._xhr.send();
        };
        Object.defineProperty(URLLoader.prototype, "dataformat", {
            get: function () {
                return this._dataformat;
            },
            set: function (value) {
                this._dataformat = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(URLLoader.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(URLLoader.prototype, "url", {
            get: function () {
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
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
        URLLoader.prototype.onReadyStateChange = function (event) {
            console.log("xhr.readyState: ", this._xhr.readyState);
            if (this._xhr.readyState == 4) {
                if (this._xhr.status >= 400 || this._xhr.status == 0) {
                    console.log(this._url, "load fail");
                }
                else {
                    this.loadComplete();
                }
            }
        };
        URLLoader.prototype.loadComplete = function () {
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
                    var dds = BlackSwan.DDSParser.parse(this._xhr.response);
                    this._data = dds;
                    break;
                case URLLoader.DATAFORMAT_TGA:
                    var tga = BlackSwan.TGAParser.parse(this._xhr.response);
                    this._data = tga;
                    break;
                case URLLoader.DATAFORMAT_E3D:
                    var e3dModel = BlackSwan.E3DParser.parse(this._xhr.response);
                    this._data = e3dModel;
                    break;
                default:
                    this._data = this._xhr.responseText;
            }
            if (this.onLoadComplete) {
                this.onLoadComplete(this);
            }
            console.log(this._data);
        };
        URLLoader.prototype.onProgress = function (event) {
            console.log("progress event```");
        };
        URLLoader.prototype.onError = function (event) {
            if (this.onLoadError) {
                this.onLoadError();
            }
            console.log("load error", event);
        };
        URLLoader.prototype.getXHR = function () {
            var xhr = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            }
            else {
                xhr = new ActiveXObject("MSXML2.XMLHTTP");
            }
            return xhr;
        };
        URLLoader.DATAFORMAT_BINARY = "binary";
        URLLoader.DATAFORMAT_TEXT = "text";
        URLLoader.DATAFORMAT_SOUND = "sound";
        URLLoader.DATAFORMAT_BITMAP = "bitmap";
        URLLoader.DATAFORMAT_DDS = "dds";
        URLLoader.DATAFORMAT_TGA = "tga";
        URLLoader.DATAFORMAT_E3D = "e3d";
        return URLLoader;
    })();
    xxq.URLLoader = URLLoader;
})(xxq || (xxq = {}));
//# sourceMappingURL=URLLoader.js.map