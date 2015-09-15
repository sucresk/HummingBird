var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var DefaultRender = (function (_super) {
        __extends(DefaultRender, _super);
        function DefaultRender() {
            _super.call(this);
            this._renderIndex = 0;
            this._numEntity = 0;
        }
        DefaultRender.prototype.renden = function (context3D, collect, camera3D) {
            this._renderList = collect.renderList;
            this._numEntity = this._renderList.length;
            for (this._renderIndex = 0; this._renderIndex < this._numEntity; this._renderIndex++) {
                this._renderList[this._renderIndex].rendenDiffusePass(context3D, camera3D);
            }
        };
        return DefaultRender;
    })(BlackSwan.RenderBase);
    BlackSwan.DefaultRender = DefaultRender;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=DefaultRender.js.map