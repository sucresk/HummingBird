var BlackSwan;
(function (BlackSwan) {
    var LayerFilterSystem = (function () {
        function LayerFilterSystem() {
            this._mLayer_dict = {};
        }
        LayerFilterSystem.prototype.init = function () {
        };
        LayerFilterSystem.prototype.update = function () {
            for (var key in this._mLayer_dict) {
                this._mLayer_dict[key].update();
            }
        };
        LayerFilterSystem.prototype.setObject3DLayer = function (layerType, obj) {
            var layer = this.findLayer(layerType);
            if (layer == null) {
                alert(layerType + ":Layer 不存在!");
                return false;
            }
            obj.renderLayer = layerType;
            return true;
        };
        LayerFilterSystem.prototype.createLayer = function (layerType) {
            var layer = null;
            layer = this.findLayer(layerType);
            if (layer != null) {
                alert(layerType + ":Layer 已经存在!");
                return null;
            }
            layer = new BlackSwan.LayerFilter(layerType);
            this._mLayer_dict[layerType] = layer;
            return layer;
        };
        LayerFilterSystem.prototype.addObject3D = function (obj) {
            var layer = this.findLayer(obj.renderLayer);
            if (layer != null) {
                layer.addObject3D(obj);
            }
        };
        LayerFilterSystem.prototype.findLayer = function (layerType) {
            if (this._mLayer_dict[layerType] != undefined)
                return this._mLayer_dict[layerType];
            return null;
        };
        LayerFilterSystem.prototype.clear = function () {
            for (var key in this._mLayer_dict) {
                var layer = this._mLayer_dict[key];
                layer.clear();
            }
        };
        LayerFilterSystem.prototype.getRenderList = function () {
            var renderList = new Array();
            for (var key in this._mLayer_dict) {
                var layer = this._mLayer_dict[key];
                renderList = renderList.concat(layer.renderList);
            }
            return renderList;
        };
        return LayerFilterSystem;
    })();
    BlackSwan.LayerFilterSystem = LayerFilterSystem;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=LayerfilterSystem.js.map