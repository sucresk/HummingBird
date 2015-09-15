module BlackSwan {
    export class CollectBase {

        public numObject3D: number = 0;

        protected _renderList: Array<Object3D>;
        protected _nodes: Array<Object3D>;

        protected _nocutList: Array<Object3D>;

        protected _frustum: Frustum;
        protected _octree: Octree;
        protected _layerSystem: LayerFilterSystem;

        constructor(t:number = 1) {
            this._renderList = new Array<Object3D>();
            this._nodes = new Array<Object3D>();
            this._nocutList = new Array<Object3D>();

            this._frustum = new Frustum();
            this._octree = new Octree();
            this._octree.InitOctree(3, new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(-3000.0, -3000.0, -3000.0), new BlackSwan.Vector3D(3000.0, 3000.0, 3000.0)));

            this._layerSystem = new LayerFilterSystem();
            this._layerSystem.createLayer(1);
        }
        
        public update(camera: Camera3D) {

            this._renderList = this._nodes;
            var t1: number = Date.now();
            this._frustum.make(camera);

            this._layerSystem.clear();

            for (var i: number = 0; i < this._nocutList.length; ++i) {
                this._layerSystem.addObject3D(this._nocutList[i]);
            }

            var octreeNodes: Array<OctreeNode> = this._octree.getFrustumNodes(this._frustum);

            for (var i: number = 0; i < octreeNodes.length; ++i) {
                for (var j: number = 0; j < octreeNodes[i].objList.length; ++j) {
                    var box: CubeBoxBound = octreeNodes[i].objList[j].box.Transform(octreeNodes[i].objList[j].transform);

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

            var t2: number = Date.now();
            var t3: number = t2 - t1;
        }

        public addObject3D(obj: Object3D ) {
            this._nodes.push(obj);
            this.numObject3D = this._nodes.length;
            obj.renderLayer = 1;
            if (obj.isCut) {
                this._octree.addObject3D(obj);
            }
            else {
                this._nocutList.push(obj);
            }
        }

        public delObject3D(obj: Object3D) {
            if (obj.isCut == false) {
                var idx: number = this.findNocutObject3D(obj);
                if (idx >= 0) {
                    this._nocutList.splice(idx, 1);
                }
            }
            var index: number = this.findObject3D(obj);
            if (index >= 0) {
                this._nodes.splice(index, 1);
                this.numObject3D = this._nodes.length;
            }
        }

        public findObject3D(obj: Object3D): number {
            for (var i: number = 0; i < this._nodes.length; ++i) {
                if (this._nodes[i] === obj) {
                    return i;
                }
            }
            return -1;
        }

        public get renderList(): Array<Object3D> {
            return this._renderList;
        }

        private findNocutObject3D(obj: Object3D): number {
            for (var i: number = 0; i < this._nocutList.length; ++i) {
                if (this._nocutList[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }
}