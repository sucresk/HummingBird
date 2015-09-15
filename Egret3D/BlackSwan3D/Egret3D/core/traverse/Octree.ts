module BlackSwan {
    export enum NodeEnum
    {
        top_left_front,
        top_left_back,
        top_right_front,
        top_right_back,
        bottom_left_front,
        bottom_left_back,
        bottom_right_front,
        bottom_right_back,
        node_max,
    }

    export class OctreeNode {

        public box: CubeBoxBound;
        public center: Vector3D;
        public radius: number;

        public depth: number;

        public parent: OctreeNode = null;
        public childNode: Array<OctreeNode> = null;

        public objList: Array<Object3D> = null;

        public name: string = "";
        constructor() {
            this.box = new CubeBoxBound();
            this.center = new Vector3D();
            this.radius = 0;
            this.depth = 0;

            this.parent = null;
            this.childNode = null;

            this.objList = new Array<Object3D>();
        }

        public addObject3D(obj: Object3D) {
            this.objList.push(obj);
        }

        public delObject3D(obj: Object3D) {
            var index: number = this.findObject3D(obj);
            if (index >= 0) {
                this.objList.splice(index, 1);
            }
        }

        public findObject3D(obj: Object3D): number {
            for (var i: number = 0; i < this.objList.length; ++i) {
                if (this.objList[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }

    export class Octree {
        public root: OctreeNode = null;
        public count: number = 0;

        constructor() {
            this.root = new OctreeNode();
            this.count = 0;
        }
        /**
        *   create octree
        */
        public InitOctree(maxdepth: number, box: CubeBoxBound) {
            this.createOctree(this.root, null, maxdepth, box);
        }

        private createOctree(node: OctreeNode, parent: OctreeNode, maxdepth: number, box: CubeBoxBound) {

            node.name = this.count.toString();

            this.count++;
            node.box.copyFrom(box);
            node.parent = parent;

            var xm: number = (box.max.x - box.min.x) / 2;     // 计算节点个维度上的半边长;
            var ym: number = (box.max.y - box.min.y) / 2;
            var zm: number = (box.max.z - box.min.z) / 2;

            node.depth = maxdepth;
            maxdepth--;
            if (maxdepth >= 0) {
                node.childNode = new Array<OctreeNode>();

                for (var i: number = 0; i < NodeEnum.node_max; ++i) {
                    var oct: OctreeNode = new OctreeNode();
                    node.childNode.push(oct);
                }

                var newBox: CubeBoxBound = new CubeBoxBound(new Vector3D(box.min.x, box.min.y + ym, box.min.z), new Vector3D(box.max.x - xm, box.max.y, box.max.z - zm));
                this.createOctree(node.childNode[NodeEnum.top_left_front], node, maxdepth, newBox);

                newBox = new CubeBoxBound(new Vector3D(box.min.x, box.min.y + ym, box.min.z + zm), new Vector3D(box.max.x - xm, box.max.y, box.max.z));
                this.createOctree(node.childNode[NodeEnum.top_left_back], node, maxdepth, newBox);

                newBox = new CubeBoxBound(new Vector3D(box.min.x + xm, box.min.y + ym, box.min.z), new Vector3D(box.max.x, box.max.y, box.max.z - zm));
                this.createOctree(node.childNode[NodeEnum.top_right_front], node, maxdepth, newBox);

                newBox = new CubeBoxBound(new Vector3D(box.min.x + xm, box.min.y + ym, box.min.z + zm), new Vector3D(box.max.x, box.max.y, box.max.z));
                this.createOctree(node.childNode[NodeEnum.top_right_back], node, maxdepth, newBox);

                newBox = new CubeBoxBound(new Vector3D(box.min.x, box.min.y, box.min.z), new Vector3D(box.max.x - xm, box.max.y - ym, box.max.z - zm));
                this.createOctree(node.childNode[NodeEnum.bottom_left_front], node, maxdepth, newBox);

                newBox = new CubeBoxBound(new Vector3D(box.min.x, box.min.y, box.min.z + zm), new Vector3D(box.max.x - xm, box.max.y - ym, box.max.z));
                this.createOctree(node.childNode[NodeEnum.bottom_left_back], node, maxdepth, newBox);

                newBox = new CubeBoxBound(new Vector3D(box.min.x + xm, box.min.y, box.min.z), new Vector3D(box.max.x, box.max.y - ym, box.max.z - zm));
                this.createOctree(node.childNode[NodeEnum.bottom_right_front], node, maxdepth, newBox);

                newBox = new CubeBoxBound(new Vector3D(box.min.x + xm, box.min.y, box.min.z + zm), new Vector3D(box.max.x, box.max.y - ym, box.max.z));
                this.createOctree(node.childNode[NodeEnum.bottom_right_back], node, maxdepth, newBox);
            }
        }

        public addObject3D(obj: Object3D): boolean {

            var node: OctreeNode = this.findObject3DToNode(this.root, obj);
            if (node == null) {
                return false;
            }

            this.delObject3D(obj);
            obj.octreeNode = node;
            obj.octree = this;
            node.addObject3D(obj);
            return true;
        }

        public delObject3D(obj: Object3D) {
            if (obj.octreeNode != null) {
                obj.octreeNode.delObject3D(obj);
                obj.octreeNode = null;
            }
        }

        public checkObject3D(obj: Object3D) {
            if (obj.octreeNode != null) {
                if (!obj.octreeNode.box.inBox(obj.position)) {
                    obj.octreeNode.delObject3D(obj);
                    this.addObject3D(obj);
                }
            }
        }

        public findObject3DToNode(node: OctreeNode, obj: Object3D): OctreeNode {
            return this.find(node, obj);
        }
        
        private find(node: OctreeNode, obj: Object3D): OctreeNode {
            if (node.box.inBox(obj.position)) {
                if (node.childNode == null) {
                    return node;
                }
                else {
                    for (var i: number = 0; i < node.childNode.length; ++i) {
                        var result: OctreeNode = this.find(node.childNode[i], obj);
                        if (result != null) {
                            return result;
                        }
                    }
                }
            }
            return null;
        }

        public getFrustumNodes(frustum: Frustum): Array<OctreeNode> {
            var nodes: Array<OctreeNode> = new Array<OctreeNode>();
            this.checkFrustumNodes(this.root, frustum, nodes);
            return nodes;
        }

        private checkFrustumNodes(node: OctreeNode, frustum: Frustum, nodes: Array<OctreeNode>) {
            if (frustum.inBox(node.box)) {
                if (node.childNode != null) {
                    for (var i: number = 0; i < node.childNode.length; ++i) {
                        this.checkFrustumNodes(node.childNode[i], frustum, nodes);
                    }
                }
                else {
                    nodes.push(node);
                }
            }
        }

        public getBoxNodes(box: CubeBoxBound): Array<OctreeNode> {
            var nodes: Array<OctreeNode> = new Array<OctreeNode>();
            this.checkNodes(this.root, box, nodes);
            return nodes;
        }

        private checkNodes(node: OctreeNode, box: CubeBoxBound, nodes: Array<OctreeNode>) {
            if (node.box.intersectAABBs(box, new CubeBoxBound())) {
                if (node.childNode != null) {
                    for (var i: number = 0; i < node.childNode.length; ++i) {
                        this.checkNodes(node.childNode[i], box, nodes);
                    }
                }
                else {
                    nodes.push(node);
                } 
            }
        }

        public getBoxPointNodes(pos: Vector3D): Array<OctreeNode> {
            var nodes: Array<OctreeNode> = new Array<OctreeNode>();
            this.checkBoxPointNodes(this.root, pos, nodes);
            return nodes;
        }

        private checkBoxPointNodes(node: OctreeNode, pos: Vector3D, nodes: Array<OctreeNode>) {
            if (node.childNode != null) {
                for (var i: number = 0; i < node.childNode.length; ++i) {
                    this.checkBoxPointNodes(node.childNode[i], pos, nodes);
                }
            }
            else {
                if (node.box.inBox(pos)) {
                    nodes.push(node);
                }
            }
        }
    }
} 