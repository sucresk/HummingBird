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
        public depth: number;

        public parent: OctreeNode = null;
        public childNode: Array<OctreeNode> = null;

        public objList: Array<Object3D> = null;

        public name: string = "";
        constructor() {
            this.box = new CubeBoxBound();
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
        public renderList: Array<Object3D> = new Array<Object3D>();

        private static _instance: Octree = new Octree();

        public static getInstance(): Octree {
            return this._instance;
        }

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
            if (obj.isCut == false) {
                this.renderList.push(obj);
                return true;
            }

            this.delObject3D(obj);

            var nodes: Array<OctreeNode> = this.findObject3DToNodes(this.root, obj);
            if (nodes.length <= 0) {
                return false;
            }

            obj.octreeNodes = nodes;

            for (var i: number = 0; i < obj.octreeNodes.length; ++i) {
                obj.octreeNodes[i].addObject3D(obj);
            }

            return true;
        }

        public delObject3D(obj: Object3D) {
            if (obj.isCut == false) {
                var index: number = this.getRenderIndex(obj);

                if (index != -1) {
                    this.renderList.splice(index);
                }
            }

            if (obj.octreeNodes != null) {
                for (var i: number = 0; i < obj.octreeNodes.length; ++i) {
                    obj.octreeNodes[i].delObject3D(obj);
                }
                obj.octreeNodes = null;
            }
        }

        public checkObject3D(obj: Object3D) {
            if (obj.octreeNodes == null) {
                return;
            }
            this.addObject3D(obj);
        }

        public findObject3DToNodes(node: OctreeNode, obj: Object3D): Array<OctreeNode> {
            var nodes: Array<OctreeNode> = new Array<OctreeNode>();
            this.find(node, obj.worldBox, nodes);
            return nodes;
        }
        
        private find(node: OctreeNode, box:CubeBoxBound, result: Array<OctreeNode>) {

            if (node.box.intersectAABBs(box, null)) {
                if (node.childNode == null) {
                    result.push(node);
                }
                else {
                    for (var i: number = 0; i < node.childNode.length; ++i) {
                        this.find(node.childNode[i], box, result);
                    }
                }
            }
        }

        public getFrustumNodes(frustum: Frustum): Array<OctreeNode> {
            var nodes: Array<OctreeNode> = new Array<OctreeNode>();
            this.checkFrustumNodes(this.root, frustum, nodes);
            return nodes;
        }

        private checkFrustumNodes(node: OctreeNode, frustum: Frustum, nodes: Array<OctreeNode>) {
            if (frustum.inSphere(node.box.center, node.box.radius)) {
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

        public getRenderIndex(obj: Object3D): number {

            for (var index = 0; index < this.renderList.length; ++index) {

                if (this.renderList[index] != obj) {
                    continue;
                }

                return index;
            }

            return -1;
        }
    }
} 