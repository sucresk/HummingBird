module Egret3D {
    export class CollectBase {

        public numObject3D: number = 0;

        public renderList: Array<Object3D>;
        protected _nodes: Array<Object3D>;

        protected _num: number = 0;

        protected _rootNode: Object3D;
        private _tempRootNode: Object3D;
        private _objDict: { [id: number]: number; } = {};
        constructor(root:Object3D){
            this.renderList = new Array<Object3D>();
            this._nodes = new Array<Object3D>();
            this._rootNode = root;

            Octree.getInstance().InitOctree(3, new Egret3D.CubeBoxBound(new Egret3D.Vector3D(-30000.0, -30000.0, -30000.0), new Egret3D.Vector3D(30000.0, 30000.0, 30000.0)));
        }
        


        public update(camera: Camera3D) {
            this.renderList = this._nodes;
            this.renderList.length = 0;
            camera._frustum.make(camera);

            ///for (var i: number = 0; i < Octree.getInstance().renderList.length; ++i) {
            ///    this.renderList.push(Octree.getInstance().renderList[i]);
            ///}

            ///this._objDict = {};
            ///var octreeNodes: Array<OctreeNode> = Octree.getInstance().getFrustumNodes(camera._frustum);
            ///for (var i: number = 0; i < octreeNodes.length; ++i) {
            ///    for (var j: number = 0; j < octreeNodes[i].objList.length; ++j) {
            ///        ///if (this.findRenderObject(octreeNodes[i].objList[j]) != -1) {
            ///        ///    continue;
            ///        ///}

            ///        if (this._objDict[octreeNodes[i].objList[j].id] != undefined) {
            ///            continue;
            ///        }

            ///        if (camera.isVisible(octreeNodes[i].objList[j])){
            ///            this.renderList.push(octreeNodes[i].objList[j]);
            ///            this._objDict[octreeNodes[i].objList[j].id] = octreeNodes[i].objList[j].id;
            ///        }
            ///    }
            ///}
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