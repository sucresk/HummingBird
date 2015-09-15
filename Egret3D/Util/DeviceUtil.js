var DeviceUtil = (function () {
    function DeviceUtil() {
    }
    DeviceUtil.getDeviceInfo = function () {
        return null;
    };
    Object.defineProperty(DeviceUtil, "getGPUMode", {
        get: function () {
            if (true) {
                return BlackSwan.Egret3D.OpenGLES_2_0;
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return DeviceUtil;
})();
//# sourceMappingURL=DeviceUtil.js.map