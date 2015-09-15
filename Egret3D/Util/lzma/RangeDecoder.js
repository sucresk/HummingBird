///<reference path="LZMA.ts" />
var nid;
(function (nid) {
    /**
     * LZMA Decoder
     * @author Nidin Vinayakan | nidinthb@gmail.com
     */
    //import MEMORY = nid.MEMORY;
    var RangeDecoder = (function () {
        function RangeDecoder() {
            this.rangeI = 0;
            this.codeI = 1;
            this.loc1 = 2;
            this.loc2 = 3;
            this.in_pos = 13;
        }
        RangeDecoder.prototype.isFinishedOK = function () {
            return this.U32[this.codeI] == 0;
        };
        RangeDecoder.prototype.init = function () {
            this.U32 = new Uint32Array(4);
            this.U16 = new Uint16Array(4);
            this.corrupted = false;
            if (this.inStream[this.in_pos++] != 0) {
                this.corrupted = true;
            }
            this.U32[this.rangeI] = 0xFFFFFFFF;
            this.U32[this.codeI] = 0;
            for (var i = 0; i < 4; i++) {
                this.U32[this.codeI] = (this.U32[this.codeI] << 8) | this.inStream[this.in_pos++];
            }
            if (this.U32[this.codeI] == this.U32[this.rangeI]) {
                this.corrupted = true;
            }
        };
        RangeDecoder.prototype.normalize = function () {
            if (this.U32[this.rangeI] < RangeDecoder.kTopValue) {
                this.U32[this.rangeI] <<= 8;
                this.U32[this.codeI] = (this.U32[this.codeI] << 8) | this.inStream[this.in_pos++];
            }
        };
        RangeDecoder.prototype.decodeDirectBits = function (numBits) {
            this.U32[this.loc1] = 0; //UInt32
            do {
                this.U32[this.rangeI] >>>= 1;
                this.U32[this.codeI] -= this.U32[this.rangeI];
                this.U32[this.loc2] = 0 - (this.U32[this.codeI] >>> 31);
                this.U32[this.codeI] += this.U32[this.rangeI] & this.U32[this.loc2];
                if (this.U32[this.codeI] == this.U32[this.rangeI]) {
                    this.corrupted = true;
                }
                this.normalize();
                this.U32[this.loc1] <<= 1;
                this.U32[this.loc1] += this.U32[this.loc2] + 1;
            } while (--numBits);
            return this.U32[this.loc1];
        };
        RangeDecoder.prototype.decodeBit = function (prob, index) {
            this.U16[0] = prob[index];
            //bound
            this.U32[2] = (this.U32[0] >>> 11) * this.U16[0];
            //var symbol:number;
            if (this.U32[1] < this.U32[2]) {
                this.U16[0] += ((1 << 11) - this.U16[0]) >>> 5;
                this.U32[0] = this.U32[2];
                this.U16[1] = 0;
            }
            else {
                //v -= v >>> LZMA.kNumMoveBits;
                this.U16[0] -= this.U16[0] >>> 5;
                this.U32[1] -= this.U32[2];
                this.U32[0] -= this.U32[2];
                this.U16[1] = 1;
            }
            prob[index] = this.U16[0];
            //this.normalize();
            if (this.U32[0] < 16777216) {
                this.U32[0] <<= 8;
                this.U32[1] = (this.U32[1] << 8) | this.inStream[this.in_pos++];
            }
            return this.U16[1];
        };
        RangeDecoder.kTopValue = (1 << 24);
        return RangeDecoder;
    })();
    nid.RangeDecoder = RangeDecoder;
})(nid || (nid = {}));
//# sourceMappingURL=RangeDecoder.js.map