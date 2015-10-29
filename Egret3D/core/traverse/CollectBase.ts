module BlackSwan {
    export class CollectBase {

        public numObject3D: number = 0;

        public renderList: Array<Object3D>;
        protected _nodes: Array<Object3D>;

        protected _num: number = 0;

        private _rootNode: Object3D;
        private _tempRootNode: Object3D;
        private _objDict: { [id: number]: number; } = {};
        constructor(root:Object3D){
            this.renderList = new Array<Object3D>();
            this._nodes = new Array<Object3D>();
            this._rootNode = root;

            Octree.getInstance().InitOctree(3, new BlackSwan.CubeBoxBound(new BlackSwan.Vector3D(-3000.0, -3000.0, -3000.0), new BlackSwan.Vector3D(3000.0, 3000.0, 3000.0)));
        }
        
        private applyRender(child: Object3D, camera: Camera3D ) {
            for (var i: number = 0; i < child.childs.length; i++){
                if (!child.childs[i].isCut) {
                    this.renderList.push(child.childs[i]);
                }
                else {
                    if (camera.isVisible(child.childs[i])) {
                        this.renderList.push(child.childs[i]);
                    }
                }
                this.applyRender(child.childs[i], camera);
            }
        }

        public update(camera: Camera3D) {
            this.renderList = this._nodes;
            this.renderList.length = 0;
            camera._frustum.make(camera);

            //this.applyRender(this._rootNode, camera);
            for (var i: number = 0; i < Octree.getInstance().renderList.length; ++i) {
                this.renderList.push(Octree.getInstance().renderList[i]);
            }

            this._objDict = {};
            var octreeNodes: Array<OctreeNode> = Octree.getInstance().getFrustumNodes(camera._frustum);
            for (var i: number = 0; i < octreeNodes.length; ++i) {
                for (var j: number = 0; j < octreeNodes[i].objList.length; ++j) {
                    //if (this.findRenderObject(octreeNodes[i].objList[j]) != -1) {
                    //    continue;
                    //}

                    if (this._objDict[octreeNodes[i].objList[j].id] != undefined) {
                        continue;
                    }

                    if (camera.isVisible(octreeNodes[i].objList[j])){
                        this.renderList.push(octreeNodes[i].objList[j]);
                        this._objDict[octreeNodes[i].objList[j].id] = octreeNodes[i].objList[j].id;
                    }
                }
            }
        }

        public findRenderObject(obj: Object3D): number {
            for (var i: number = 0; i < this.renderList.length; ++i) {
                if (this.renderList[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }
}