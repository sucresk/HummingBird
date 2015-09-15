var BlackSwan;
(function (BlackSwan) {
    var LayerFilter = (function () {
        function LayerFilter(t) {
            if (t === void 0) { t = 1; }
            this.numEntity = 0;
            this.layerType = 0;
            this.sortFunc = null;
            this.boolean = false;
            this.renderList = new Array();
            this.layerType = t;
            this.sortFunc = this.sort;
            this.isSort = false;
        }
        LayerFilter.prototype.update = function () {
            if (this.isSort) {
                this.sortFunc();
            }
        };
        LayerFilter.prototype.addObject3D = function (obj) {
            this.renderList.push(obj);
            this.numEntity = this.renderList.length;
            this.isSort = true;
        };
        LayerFilter.prototype.delObject3D = function (obj) {
            var index = this.findObject3D(obj);
            if (index >= 0) {
                this.renderList.splice(index, 1);
                this.numEntity = this.renderList.length;
            }
        };
        LayerFilter.prototype.findObject3D = function (obj) {
            for (var i = 0; i < this.renderList.length; ++i) {
                if (this.renderList[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
        LayerFilter.prototype.clear = function () {
            this.renderList.length = 0;
            this.numEntity = this.renderList.length;
        };
        LayerFilter.prototype.sort = function () {
            for (var i = 0; i < this.renderList.length; ++i) {
                for (var j = i + 1; j < this.renderList.length; ++j) {
                    if (this.renderList[j].z < this.renderList[j - 1].z) {
                        var tmp = this.renderList[j];
                        this.renderList[j] = this.renderList[j - 1];
                        this.renderList[j - 1] = tmp;
                    }
                }
            }
        };
        return LayerFilter;
    })();
    BlackSwan.LayerFilter = LayerFilter;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Layerfilter.js.map