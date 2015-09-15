var BlackSwan;
(function (BlackSwan) {
    var CollectBase = (function () {
        function CollectBase(t) {
            if (t === void 0) { t = 1; }
            this.numObject3D = 0;
            this._renderList = new Array();
            this._nodes = new Array();
            this._nocutList = new Array();
            this._frustum = new BlackSwan.Frustum();
            this._octree = new BlackSwan.Octree();
            this._octree.InitOctree(3, new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(-3000.0, -3000.0, -3000.0), new BlackSwan.Vector3D(3000.0, 3000.0, 3000.0)));
            this._layerSystem = new BlackSwan.LayerFilterSystem();
            this._layerSystem.createLayer(1);
        }
        CollectBase.prototype.update = function (camera) {
            this._renderList = this._nodes;
            var t1 = Date.now();
            this._frustum.make(camera);
            this._layerSystem.clear();
            for (var i = 0; i < this._nocutList.length; ++i) {
                this._layerSystem.addObject3D(this._nocutList[i]);
            }
            var octreeNodes = this._octree.getFrustumNodes(this._frustum);
            for (var i = 0; i < octreeNodes.length; ++i) {
                for (var j = 0; j < octreeNodes[i].objList.length; ++j) {
                    var box = octreeNodes[i].objList[j].box.Transform(octreeNodes[i].objList[j].transform);
                    if (this._frustum.inBox(box)) {
                        this._layerSystem.addObject3D(octreeNodes[i].objList[j]);
                    }
                }
            }
            this._layerSystem.update();
            this._renderList = this._layerSystem.getRenderList();
            //var pickList: Array<PickResult> = null;
            //pickList = Picker.pickObject3DList(camera, this._renderList);
            //for (var i: number = 0; i < pickList.length; ++i) {
            //    pickList[i].target.rotationY++;
            //}
            var t2 = Date.now();
            var t3 = t2 - t1;
        };
        CollectBase.prototype.addObject3D = function (obj) {
            this._nodes.push(obj);
            this.numObject3D = this._nodes.length;
            obj.renderLayer = 1;
            if (obj.isCut) {
                this._octree.addObject3D(obj);
            }
            else {
                this._nocutList.push(obj);
            }
        };
        CollectBase.prototype.delObject3D = function (obj) {
            if (obj.isCut == false) {
                var idx = this.findNocutObject3D(obj);
                if (idx >= 0) {
                    this._nocutList.splice(idx, 1);
                }
            }
            var index = this.findObject3D(obj);
            if (index >= 0) {
                this._nodes.splice(index, 1);
                this.numObject3D = this._nodes.length;
            }
        };
        CollectBase.prototype.findObject3D = function (obj) {
            for (var i = 0; i < this._nodes.length; ++i) {
                if (this._nodes[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
        Object.defineProperty(CollectBase.prototype, "renderList", {
            get: function () {
                return this._renderList;
            },
            enumerable: true,
            configurable: true
        });
        CollectBase.prototype.findNocutObject3D = function (obj) {
            for (var i = 0; i < this._nocutList.length; ++i) {
                if (this._nocutList[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
        return CollectBase;
    })();
    BlackSwan.CollectBase = CollectBase;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=CollectBase.js.map