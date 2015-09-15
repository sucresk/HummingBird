var BlackSwan;
(function (BlackSwan) {
    var Camera3DManager = (function () {
        function Camera3DManager() {
        }
        Camera3DManager.getInstance = function () {
            if (!Camera3DManager.instance)
                return Camera3DManager.instance = new Camera3DManager();
            return Camera3DManager.instance;
        };
        Camera3DManager.prototype.tabCamera3D = function (mode, pre) {
        };
        Camera3DManager.instance = new Camera3DManager();
        return Camera3DManager;
    })();
    BlackSwan.Camera3DManager = Camera3DManager;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Camera3DManager.js.map