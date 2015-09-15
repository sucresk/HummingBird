var nid;
(function (nid) {
    var MEMORY = (function () {
        function MEMORY() {
        }
        MEMORY.allocateUint8 = function (len) {
            MEMORY.u8 = new Uint8Array(len);
        };
        MEMORY.allocateUint16 = function (len) {
            MEMORY.u16 = new Uint16Array(len);
        };
        MEMORY.allocateUint32 = function (len) {
            MEMORY.u32 = new Uint32Array(len);
        };
        MEMORY.getUint8 = function () {
            if (!MEMORY.u8) {
                MEMORY.allocateUint8(10);
            }
            return MEMORY.u8Index++;
        };
        MEMORY.getUint16 = function () {
            if (!MEMORY.u16) {
                MEMORY.allocateUint16(24);
            }
            return MEMORY.u16Index++;
        };
        MEMORY.getUint32 = function () {
            if (!MEMORY.u32) {
                MEMORY.allocateUint32(10);
            }
            return MEMORY.u32Index++;
        };
        MEMORY.u8Index = 0;
        MEMORY.u16Index = 0;
        MEMORY.u32Index = 0;
        return MEMORY;
    })();
    nid.MEMORY = MEMORY;
})(nid || (nid = {}));
//# sourceMappingURL=MEMORY.js.map