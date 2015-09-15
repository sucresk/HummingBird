///<reference path="LZMA.ts" />
var nid;
(function (nid) {
    /**
     * LZMA Decoder
     * @author Nidin Vinayakan | nidinthb@gmail.com
     */
    var OutWindow = (function () {
        function OutWindow() {
            this.out_pos = 0;
        }
        OutWindow.prototype.create = function (dictSize) {
            this.buf = new Uint8Array(dictSize);
            this.pos = 0;
            this.size = dictSize;
            this.isFull = false;
            this.totalPos = 0;
        };
        OutWindow.prototype.putByte = function (b) {
            this.totalPos++;
            this.buf[this.pos++] = b;
            if (this.pos == this.size) {
                this.pos = 0;
                this.isFull = true;
            }
            this.outStream[this.out_pos++] = b;
        };
        OutWindow.prototype.getByte = function (dist) {
            return this.buf[dist <= this.pos ? this.pos - dist : this.size - dist + this.pos];
        };
        OutWindow.prototype.copyMatch = function (dist, len) {
            for (; len > 0; len--) {
                this.putByte(this.getByte(dist));
            }
        };
        OutWindow.prototype.checkDistance = function (dist) {
            return dist <= this.pos || this.isFull;
        };
        OutWindow.prototype.isEmpty = function () {
            return this.pos == 0 && !this.isFull;
        };
        return OutWindow;
    })();
    nid.OutWindow = OutWindow;
})(nid || (nid = {}));
//# sourceMappingURL=OutWindow.js.map