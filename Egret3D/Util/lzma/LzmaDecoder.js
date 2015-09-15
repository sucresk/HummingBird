///<reference path="LZMA.d.ts" />
var nid;
(function (nid) {
    /**
     * LZMA Decoder
     * @author Nidin Vinayakan | nidinthb@gmail.com
     */
    //import MEMORY = nid.MEMORY;
    var LzmaDecoder = (function () {
        function LzmaDecoder() {
            this.posSlotDecoder = nid.BitTreeDecoder.constructArray(6, nid.LZMA.kNumLenToPosStates); //6
            this.alignDecoder = new nid.BitTreeDecoder(nid.LZMA.kNumAlignBits);
            this.posDecoders = new Uint16Array(1 + nid.LZMA.kNumFullDistances - nid.LZMA.kEndPosModelIndex);
            this.isMatch = new Uint16Array(nid.LZMA.kNumStates << nid.LZMA.kNumPosBitsMax);
            this.isRep = new Uint16Array(nid.LZMA.kNumStates);
            this.isRepG0 = new Uint16Array(nid.LZMA.kNumStates);
            this.isRepG1 = new Uint16Array(nid.LZMA.kNumStates);
            this.isRepG2 = new Uint16Array(nid.LZMA.kNumStates);
            this.isRep0Long = new Uint16Array(nid.LZMA.kNumStates << nid.LZMA.kNumPosBitsMax);
            this.lenDecoder = new nid.LenDecoder();
            this.repLenDecoder = new nid.LenDecoder();
            this.rangeDec = new nid.RangeDecoder();
            this.outWindow = new nid.OutWindow();
        }
        LzmaDecoder.prototype.init = function () {
            this.loc1 = nid.MEMORY.getUint32() | 0;
            this.loc2 = nid.MEMORY.getUint32() | 0;
            this.matchBitI = nid.MEMORY.getUint16() | 0;
            this.matchByteI = nid.MEMORY.getUint16() | 0;
            this.bitI = nid.MEMORY.getUint16() | 0;
            this.symbolI = nid.MEMORY.getUint16() | 0;
            this.prevByteI = nid.MEMORY.getUint16() | 0;
            this.litStateI = nid.MEMORY.getUint16() | 0;
            this.initLiterals();
            this.initDist();
            nid.LZMA.INIT_PROBS(this.isMatch);
            nid.LZMA.INIT_PROBS(this.isRep);
            nid.LZMA.INIT_PROBS(this.isRepG0);
            nid.LZMA.INIT_PROBS(this.isRepG1);
            nid.LZMA.INIT_PROBS(this.isRepG2);
            nid.LZMA.INIT_PROBS(this.isRep0Long);
            this.lenDecoder.init();
            this.repLenDecoder.init();
        };
        LzmaDecoder.prototype.create = function () {
            this.outWindow.create(this.dictSize);
            this.createLiterals();
        };
        //Private
        LzmaDecoder.prototype.createLiterals = function () {
            this.litProbs = new Uint16Array(0x300 << (this.lc + this.lp));
        };
        LzmaDecoder.prototype.initLiterals = function () {
            var num = 0x300 << (this.lc + this.lp); //UInt32
            for (var i = 0; i < num; i++) {
                this.litProbs[i] = nid.LZMA.PROB_INIT_VAL;
            }
        };
        LzmaDecoder.prototype.decodeLiteral = function (state, rep0) {
            nid.MEMORY.u16[this.prevByteI] = 0; //unsigned byte
            if (!this.outWindow.isEmpty())
                nid.MEMORY.u16[this.prevByteI] = this.outWindow.getByte(1);
            nid.MEMORY.u16[this.symbolI] = 1;
            nid.MEMORY.u16[this.litStateI] = ((this.outWindow.totalPos & ((1 << this.lp) - 1)) << this.lc) + (nid.MEMORY.u16[this.prevByteI] >>> (8 - this.lc));
            var probsOffset = (0x300 * nid.MEMORY.u16[this.litStateI]) | 0;
            if (state >= 7) {
                nid.MEMORY.u16[this.matchByteI] = this.outWindow.getByte(rep0 + 1);
                do {
                    nid.MEMORY.u16[this.matchBitI] = (nid.MEMORY.u16[this.matchByteI] >>> 7) & 1;
                    nid.MEMORY.u16[this.matchByteI] <<= 1;
                    nid.MEMORY.u16[this.bitI] = this.rangeDec.decodeBit(this.litProbs, probsOffset + ((1 + nid.MEMORY.u16[this.matchBitI]) << 8) + nid.MEMORY.u16[this.symbolI]);
                    nid.MEMORY.u16[this.symbolI] = (nid.MEMORY.u16[this.symbolI] << 1) | nid.MEMORY.u16[this.bitI];
                    if (nid.MEMORY.u16[this.matchBitI] != nid.MEMORY.u16[this.bitI])
                        break;
                } while (nid.MEMORY.u16[this.symbolI] < 0x100);
            }
            while (nid.MEMORY.u16[this.symbolI] < 0x100) {
                nid.MEMORY.u16[this.symbolI] = (nid.MEMORY.u16[this.symbolI] << 1) | this.rangeDec.decodeBit(this.litProbs, probsOffset + nid.MEMORY.u16[this.symbolI]);
            }
            this.outWindow.putByte(nid.MEMORY.u16[this.symbolI] - 0x100);
        };
        LzmaDecoder.prototype.decodeDistance = function (len) {
            var lenState = len; //unsigned byte
            if (lenState > nid.LZMA.kNumLenToPosStates - 1)
                lenState = nid.LZMA.kNumLenToPosStates - 1;
            var posSlot = this.posSlotDecoder[lenState].decode(this.rangeDec); //unsigned byte
            if (posSlot < 4)
                return posSlot;
            var numDirectBits = ((posSlot >>> 1) - 1); //unsigned byte
            nid.MEMORY.u32[this.loc1] = ((2 | (posSlot & 1)) << numDirectBits); //UInt32
            if (posSlot < nid.LZMA.kEndPosModelIndex) {
                nid.MEMORY.u32[this.loc1] += nid.LZMA.BitTreeReverseDecode(this.posDecoders, numDirectBits, this.rangeDec, nid.MEMORY.u32[this.loc1] - posSlot);
            }
            else {
                nid.MEMORY.u32[this.loc1] += this.rangeDec.decodeDirectBits(numDirectBits - nid.LZMA.kNumAlignBits) << nid.LZMA.kNumAlignBits;
                nid.MEMORY.u32[this.loc1] += this.alignDecoder.reverseDecode(this.rangeDec);
            }
            return nid.MEMORY.u32[this.loc1];
        };
        LzmaDecoder.prototype.initDist = function () {
            for (var i = 0; i < nid.LZMA.kNumLenToPosStates; i++) {
                this.posSlotDecoder[i].init();
            }
            this.alignDecoder.init();
            nid.LZMA.INIT_PROBS(this.posDecoders);
        };
        LzmaDecoder.prototype.decodeProperties = function (properties) {
            var prop = new Uint8Array(4);
            prop[0] = properties[0];
            if (prop[0] >= (9 * 5 * 5)) {
                throw "Incorrect LZMA properties";
            }
            prop[1] = prop[0] % 9;
            prop[0] /= 9;
            prop[2] = prop[0] / 5;
            prop[3] = prop[0] % 5;
            this.lc = prop[1];
            this.pb = prop[2];
            this.lp = prop[3];
            this.dictSizeInProperties = 0;
            for (var i = 0; i < 4; i++) {
                this.dictSizeInProperties |= properties[i + 1] << (8 * i);
            }
            this.dictSize = this.dictSizeInProperties;
            if (this.dictSize < nid.LZMA.LZMA_DIC_MIN) {
                this.dictSize = nid.LZMA.LZMA_DIC_MIN;
            }
        };
        LzmaDecoder.prototype.updateState_Literal = function (state) {
            if (state < 4)
                return 0;
            else if (state < 10)
                return state - 3;
            else
                return state - 6;
        };
        LzmaDecoder.prototype.updateState_ShortRep = function (state) { return state < 7 ? 9 : 11; };
        LzmaDecoder.prototype.updateState_Rep = function (state) { return state < 7 ? 8 : 11; };
        LzmaDecoder.prototype.updateState_Match = function (state) { return state < 7 ? 7 : 10; };
        LzmaDecoder.prototype.decode = function (unpackSizeDefined, unpackSize) {
            this.init();
            this.rangeDec.init();
            if (unpackSizeDefined) {
                this.outWindow.outStream = new Uint8Array(new ArrayBuffer(unpackSize));
            }
            var rep0 = 0, rep1 = 0, rep2 = 0, rep3 = 0; //UInt32
            var state = 0; //unsigned byte
            for (;;) {
                if (unpackSizeDefined && unpackSize == 0 && !this.markerIsMandatory) {
                    if (this.rangeDec.isFinishedOK()) {
                        return nid.LZMA.LZMA_RES_FINISHED_WITHOUT_MARKER;
                    }
                }
                var posState = this.outWindow.totalPos & ((1 << this.pb) - 1);
                if (this.rangeDec.decodeBit(this.isMatch, (state << nid.LZMA.kNumPosBitsMax) + posState) == 0) {
                    if (unpackSizeDefined && unpackSize == 0) {
                        return nid.LZMA.LZMA_RES_ERROR;
                    }
                    this.decodeLiteral(state, rep0);
                    state = this.updateState_Literal(state);
                    unpackSize--;
                    continue;
                }
                var len;
                if (this.rangeDec.decodeBit(this.isRep, state) != 0) {
                    if (unpackSizeDefined && unpackSize == 0) {
                        return nid.LZMA.LZMA_RES_ERROR;
                    }
                    if (this.outWindow.isEmpty()) {
                        return nid.LZMA.LZMA_RES_ERROR;
                    }
                    if (this.rangeDec.decodeBit(this.isRepG0, state) == 0) {
                        if (this.rangeDec.decodeBit(this.isRep0Long, (state << nid.LZMA.kNumPosBitsMax) + posState) == 0) {
                            state = this.updateState_ShortRep(state);
                            this.outWindow.putByte(this.outWindow.getByte(rep0 + 1));
                            unpackSize--;
                            continue;
                        }
                    }
                    else {
                        var dist;
                        if (this.rangeDec.decodeBit(this.isRepG1, state) == 0) {
                            dist = rep1;
                        }
                        else {
                            if (this.rangeDec.decodeBit(this.isRepG2, state) == 0) {
                                dist = rep2;
                            }
                            else {
                                dist = rep3;
                                rep3 = rep2;
                            }
                            rep2 = rep1;
                        }
                        rep1 = rep0;
                        rep0 = dist;
                    }
                    len = this.repLenDecoder.decode(this.rangeDec, posState);
                    state = this.updateState_Rep(state);
                }
                else {
                    rep3 = rep2;
                    rep2 = rep1;
                    rep1 = rep0;
                    len = this.lenDecoder.decode(this.rangeDec, posState);
                    state = this.updateState_Match(state);
                    rep0 = this.decodeDistance(len);
                    if (rep0 == 0xFFFFFFFF) {
                        return this.rangeDec.isFinishedOK() ?
                            nid.LZMA.LZMA_RES_FINISHED_WITH_MARKER :
                            nid.LZMA.LZMA_RES_ERROR;
                    }
                    if (unpackSizeDefined && unpackSize == 0) {
                        return nid.LZMA.LZMA_RES_ERROR;
                    }
                    if (rep0 >= this.dictSize || !this.outWindow.checkDistance(rep0)) {
                        return nid.LZMA.LZMA_RES_ERROR;
                    }
                }
                len += nid.LZMA.kMatchMinLen;
                var isError = false;
                if (unpackSizeDefined && unpackSize < len) {
                    len = unpackSize;
                    isError = true;
                }
                this.outWindow.copyMatch(rep0 + 1, len);
                unpackSize -= len;
                if (isError) {
                    return nid.LZMA.LZMA_RES_ERROR;
                }
            }
        };
        return LzmaDecoder;
    })();
    nid.LzmaDecoder = LzmaDecoder;
})(nid || (nid = {}));
//# sourceMappingURL=LzmaDecoder.js.map