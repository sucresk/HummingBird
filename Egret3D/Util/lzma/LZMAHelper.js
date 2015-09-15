///<reference path="LZMA.d.ts" />
var nid;
(function (nid) {
    //import LZMA = nid.LZMA;
    var LZMAHelper = (function () {
        function LZMAHelper() {
        }
        LZMAHelper.init = function () {
            var command = 0;
            LZMAHelper.decoderAsync.onmessage = function (e) {
                if (command == 0) {
                    command = e.data;
                }
                else if (command == LZMAHelper.ENCODE) {
                    command = 0; //encode not implemented
                }
                else if (command == LZMAHelper.DECODE) {
                    command = 0;
                    LZMAHelper.callback(e.data);
                    LZMAHelper.callback = null;
                }
            };
        };
        LZMAHelper.encode = function (data) {
            return null;
        };
        LZMAHelper.decode = function (data) {
            return LZMAHelper.decoder.decode(new Uint8Array(data)).buffer;
        };
        LZMAHelper.encodeAsync = function (data, _callback) {
        };
        LZMAHelper.decodeAsync = function (data, _callback) {
            if (LZMAHelper.callback == null) {
                LZMAHelper.callback = _callback;
                LZMAHelper.decoderAsync.postMessage(LZMAHelper.DECODE);
                LZMAHelper.decoderAsync.postMessage(data, [data]);
            }
            else {
                console.log('Warning! Another LZMA decoding is running...');
            }
        };
        LZMAHelper.decoder = new nid.LZMA();
        LZMAHelper.decoderAsync = new Worker('LZMAWorker.min.js');
        LZMAHelper.ENCODE = 1;
        LZMAHelper.DECODE = 2;
        return LZMAHelper;
    })();
    nid.LZMAHelper = LZMAHelper;
})(nid || (nid = {}));
nid.LZMAHelper.init();
//# sourceMappingURL=LZMAHelper.js.map