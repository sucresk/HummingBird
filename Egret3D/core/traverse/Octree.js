var BlackSwan;
(function (BlackSwan) {
    (function (NodeEnum) {
        NodeEnum[NodeEnum["top_left_front"] = 0] = "top_left_front";
        NodeEnum[NodeEnum["top_left_back"] = 1] = "top_left_back";
        NodeEnum[NodeEnum["top_right_front"] = 2] = "top_right_front";
        NodeEnum[NodeEnum["top_right_back"] = 3] = "top_right_back";
        NodeEnum[NodeEnum["bottom_left_front"] = 4] = "bottom_left_front";
        NodeEnum[NodeEnum["bottom_left_back"] = 5] = "bottom_left_back";
        NodeEnum[NodeEnum["bottom_right_front"] = 6] = "bottom_right_front";
        NodeEnum[NodeEnum["bottom_right_back"] = 7] = "bottom_right_back";
        NodeEnum[NodeEnum["node_max"] = 8] = "node_max";
    })(BlackSwan.NodeEnum || (BlackSwan.NodeEnum = {}));
    var NodeEnum = BlackSwan.NodeEnum;
    var OctreeNode = (function () {
        function OctreeNode() {
            this.parent = null;
            this.childNode = null;
            this.objList = null;
            this.name = "";
            this.box = new BlackSwan.CubeBoxBound();
            this.center = new BlackSwan.Vector3D();
            this.radius = 0;
            this.depth = 0;
            this.parent = null;
            this.childNode = null;
            this.objList = new Array();
        }
        OctreeNode.prototype.addObject3D = function (obj) {
            this.objList.push(obj);
        };
        OctreeNode.prototype.delObject3D = function (obj) {
            var index = this.findObject3D(obj);
            if (index >= 0) {
                this.objList.splice(index, 1);
            }
        };
        OctreeNode.prototype.findObject3D = function (obj) {
            for (var i = 0; i < this.objList.length; ++i) {
                if (this.objList[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
        return OctreeNode;
    })();
    BlackSwan.OctreeNode = OctreeNode;
    var Octree = (function () {
        function Octree() {
            this.root = null;
            this.count = 0;
            this.root = new OctreeNode();
            this.count = 0;
        }
        /**
        *   create octree
        */
        Octree.prototype.InitOctree = function (maxdepth, box) {
            this.createOctree(this.root, null, maxdepth, box);
        };
        Octree.prototype.createOctree = function (node, parent, maxdepth, box) {
            node.name = this.count.toString();
            this.count++;
            node.box.copyFrom(box);
            node.parent = parent;
            var xm = (box.max.x - box.min.x) / 2; // 计算节点个维度上的半边长;
            var ym = (box.max.y - box.min.y) / 2;
            var zm = (box.max.z - box.min.z) / 2;
            node.depth = maxdepth;
            maxdepth--;
            if (maxdepth >= 0) {
                node.childNode = new Array();
                for (var i = 0; i < NodeEnum.node_max; ++i) {
                    var oct = new OctreeNode();
                    node.childNode.push(oct);
                }
                var newBox = new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(box.min.x, box.min.y + ym, box.min.z), new BlackSwan.Vector3D(box.max.x - xm, box.max.y, box.max.z - zm));
                this.createOctree(node.childNode[NodeEnum.top_left_front], node, maxdepth, newBox);
                newBox = new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(box.min.x, box.min.y + ym, box.min.z + zm), new BlackSwan.Vector3D(box.max.x - xm, box.max.y, box.max.z));
                this.createOctree(node.childNode[NodeEnum.top_left_back], node, maxdepth, newBox);
                newBox = new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(box.min.x + xm, box.min.y + ym, box.min.z), new BlackSwan.Vector3D(box.max.x, box.max.y, box.max.z - zm));
                this.createOctree(node.childNode[NodeEnum.top_right_front], node, maxdepth, newBox);
                newBox = new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(box.min.x + xm, box.min.y + ym, box.min.z + zm), new BlackSwan.Vector3D(box.max.x, box.max.y, box.max.z));
                this.createOctree(node.childNode[NodeEnum.top_right_back], node, maxdepth, newBox);
                newBox = new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(box.min.x, box.min.y, box.min.z), new BlackSwan.Vector3D(box.max.x - xm, box.max.y - ym, box.max.z - zm));
                this.createOctree(node.childNode[NodeEnum.bottom_left_front], node, maxdepth, newBox);
                newBox = new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(box.min.x, box.min.y, box.min.z + zm), new BlackSwan.Vector3D(box.max.x - xm, box.max.y - ym, box.max.z));
                this.createOctree(node.childNode[NodeEnum.bottom_left_back], node, maxdepth, newBox);
                newBox = new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(box.min.x + xm, box.min.y, box.min.z), new BlackSwan.Vector3D(box.max.x, box.max.y - ym, box.max.z - zm));
                this.createOctree(node.childNode[NodeEnum.bottom_right_front], node, maxdepth, newBox);
                newBox = new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(box.min.x + xm, box.min.y, box.min.z + zm), new BlackSwan.Vector3D(box.max.x, box.max.y - ym, box.max.z));
                this.createOctree(node.childNode[NodeEnum.bottom_right_back], node, maxdepth, newBox);
            }
        };
        Octree.prototype.addObject3D = function (obj) {
            var node = this.findObject3DToNode(this.root, obj);
            if (node == null) {
                return false;
            }
            this.delObject3D(obj);
            obj.octreeNode = node;
            obj.octree = this;
            node.addObject3D(obj);
            return true;
        };
        Octree.prototype.delObject3D = function (obj) {
            if (obj.octreeNode != null) {
                obj.octreeNode.delObject3D(obj);
                obj.octreeNode = null;
            }
        };
        Octree.prototype.checkObject3D = function (obj) {
            if (obj.octreeNode != null) {
                if (!obj.octreeNode.box.inBox(obj.position)) {
                    obj.octreeNode.delObject3D(obj);
                    this.addObject3D(obj);
                }
            }
        };
        Octree.prototype.findObject3DToNode = function (node, obj) {
            return this.find(node, obj);
        };
        Octree.prototype.find = function (node, obj) {
            if (node.box.inBox(obj.position)) {
                if (node.childNode == null) {
                    return node;
                }
                else {
                    for (var i = 0; i < node.childNode.length; ++i) {
                        var result = this.find(node.childNode[i], obj);
                        if (result != null) {
                            return result;
                        }
                    }
                }
            }
            return null;
        };
        Octree.prototype.getFrustumNodes = function (frustum) {
            var nodes = new Array();
            this.checkFrustumNodes(this.root, frustum, nodes);
            return nodes;
        };
        Octree.prototype.checkFrustumNodes = function (node, frustum, nodes) {
            if (frustum.inBox(node.box)) {
                if (node.childNode != null) {
                    for (var i = 0; i < node.childNode.length; ++i) {
                        this.checkFrustumNodes(node.childNode[i], frustum, nodes);
                    }
                }
                else {
                    nodes.push(node);
                }
            }
        };
        Octree.prototype.getBoxNodes = function (box) {
            var nodes = new Array();
            this.checkNodes(this.root, box, nodes);
            return nodes;
        };
        Octree.prototype.checkNodes = function (node, box, nodes) {
            if (node.box.intersectAABBs(box, new BlackSwan.CubeBoxBound())) {
                if (node.childNode != null) {
                    for (var i = 0; i < node.childNode.length; ++i) {
                        this.checkNodes(node.childNode[i], box, nodes);
                    }
                }
                else {
                    nodes.push(node);
                }
            }
        };
        Octree.prototype.getBoxPointNodes = function (pos) {
            var nodes = new Array();
            this.checkBoxPointNodes(this.root, pos, nodes);
            return nodes;
        };
        Octree.prototype.checkBoxPointNodes = function (node, pos, nodes) {
            if (node.childNode != null) {
                for (var i = 0; i < node.childNode.length; ++i) {
                    this.checkBoxPointNodes(node.childNode[i], pos, nodes);
                }
            }
            else {
                if (node.box.inBox(pos)) {
                    nodes.push(node);
                }
            }
        };
        return Octree;
    })();
    BlackSwan.Octree = Octree;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Octree.js.map