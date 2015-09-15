///<reference path="LZMA.d.ts" />
var nid;
(function (nid) {
    "use strict";
    /**
     * LZMA Decoder
     * @author Nidin Vinayakan | nidinthb@gmail.com
     */
    var LZMA = (function () {
        function LZMA() {
            this.decoder = new nid.LzmaDecoder();
        }
        LZMA.INIT_PROBS = function (p) {
            for (var i = 0; i < p.length; i++) {
                p[i] = this.PROB_INIT_VAL;
            }
        };
        LZMA.BitTreeReverseDecode = function (probs, numBits, rc, offset) {
            if (offset === void 0) { offset = 0; }
            var m = 1;
            var symbol = 0;
            for (var i = 0; i < numBits; i++) {
                var bit = rc.decodeBit(probs, offset + m);
                m <<= 1;
                m += bit;
                symbol |= (bit << i);
            }
            return symbol;
        };
        LZMA.prototype.decode = function (data) {
            this.data = data;
            //var header:Uint8Array = data.readUint8Array(13);
            var header = new Uint8Array(13);
            var i; //int
            for (i = 0; i < 13; i++) {
                header[i] = data[i];
            }
            this.decoder.decodeProperties(header);
            //console.log("lc="+this.decoder.lc+", lp="+this.decoder.lp+", pb="+this.decoder.pb);
            //console.log("Dictionary Size in properties = "+this.decoder.dictSizeInProperties);
            //console.log("Dictionary Size for decoding  = "+this.decoder.dictSize);
            //return this.ucdata;
            var unpackSize = 0; //UInt64
            var unpackSizeDefined = false;
            for (i = 0; i < 8; i++) {
                var b = header[5 + i];
                if (b != 0xFF) {
                    unpackSizeDefined = true;
                }
                unpackSize |= b << (8 * i);
            }
            this.decoder.markerIsMandatory = !unpackSizeDefined;
            /*if (unpackSizeDefined){
                console.log("Uncompressed Size : "+ unpackSize +" bytes");
            }else{
                console.log("End marker is expected");
            }*/
            this.decoder.rangeDec.inStream = data;
            this.decoder.create();
            // we support the streams that have uncompressed size and marker.
            var res = this.decoder.decode(unpackSizeDefined, unpackSize); //int
            //console.log("Read    ", this.decoder.rangeDec.in_pos);
            //console.log("Written ", this.decoder.outWindow.out_pos);
            if (res == LZMA.LZMA_RES_ERROR) {
                throw "LZMA decoding error";
            }
            else if (res == LZMA.LZMA_RES_FINISHED_WITHOUT_MARKER) {
            }
            else if (res == LZMA.LZMA_RES_FINISHED_WITH_MARKER) {
                if (unpackSizeDefined) {
                    if (this.decoder.outWindow.out_pos != unpackSize) {
                        throw "Finished with end marker before than specified size";
                    }
                }
            }
            else {
                throw "Internal Error";
            }
            if (this.decoder.rangeDec.corrupted) {
                console.log("Warning: LZMA stream is corrupted");
            }
            return this.decoder.outWindow.outStream;
        };
        LZMA.LZMA_DIC_MIN = (1 << 12);
        LZMA.LZMA_RES_ERROR = 0;
        LZMA.LZMA_RES_FINISHED_WITH_MARKER = 1;
        LZMA.LZMA_RES_FINISHED_WITHOUT_MARKER = 2;
        LZMA.kNumBitModelTotalBits = 11;
        LZMA.kNumMoveBits = 5;
        LZMA.PROB_INIT_VAL = ((1 << LZMA.kNumBitModelTotalBits) / 2); //1024
        LZMA.kNumPosBitsMax = 4;
        LZMA.kNumStates = 12;
        LZMA.kNumLenToPosStates = 4;
        LZMA.kNumAlignBits = 4;
        LZMA.kStartPosModelIndex = 4;
        LZMA.kEndPosModelIndex = 14;
        LZMA.kNumFullDistances = (1 << (LZMA.kEndPosModelIndex >>> 1));
        LZMA.kMatchMinLen = 2;
        return LZMA;
    })();
    nid.LZMA = LZMA;
})(nid || (nid = {}));
//# sourceMappingURL=LZMA.js.map