///<reference path="LZMA.d.ts" />
var nid;
(function (nid) {
    /**
     * LZMA Decoder
     * @author Nidin Vinayakan | nidinthb@gmail.com
     */
    var BitTreeDecoder = (function () {
        function BitTreeDecoder(numBits) {
            this.numBits = numBits;
            this.probs = new Uint16Array(1 << this.numBits);
        }
        BitTreeDecoder.prototype.init = function () {
            nid.LZMA.INIT_PROBS(this.probs);
        };
        BitTreeDecoder.prototype.decode = function (rc) {
            var m = 1; //Uint16
            for (var i = 0; i < this.numBits; i++)
                m = (m << 1) + rc.decodeBit(this.probs, m);
            return m - (1 << this.numBits);
        };
        BitTreeDecoder.prototype.reverseDecode = function (rc) {
            return nid.LZMA.BitTreeReverseDecode(this.probs, this.numBits, rc);
        };
        BitTreeDecoder.constructArray = function (numBits, len) {
            var vec = [];
            for (var i = 0; i < len; i++) {
                vec[i] = new BitTreeDecoder(numBits);
            }
            return vec;
        };
        return BitTreeDecoder;
    })();
    nid.BitTreeDecoder = BitTreeDecoder;
})(nid || (nid = {}));
//# sourceMappingURL=BitTreeDecoder.js.map