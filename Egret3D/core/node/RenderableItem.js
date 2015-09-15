var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var RenderableItem = (function (_super) {
        __extends(RenderableItem, _super);
        function RenderableItem() {
            _super.call(this);
        }
        /**
        * View3D render detection through to render
        */
        /**
        * Activate the render target attribute
        */
        RenderableItem.prototype.activateDiffusePass = function (context3D, camera3D) {
        };
        /**
        * updata the render target state
        */
        RenderableItem.prototype.rendenDiffusePass = function (context3D, camera3D) {
        };
        return RenderableItem;
    })(BlackSwan.Entity);
    BlackSwan.RenderableItem = RenderableItem;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=RenderableItem.js.map