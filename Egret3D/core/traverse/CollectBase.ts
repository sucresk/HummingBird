module Egret3D {
        
    /**
    * @class Egret3D.CollectBase
    * @classdesc
    * Object3D 渲染对象收集器基类
    */
    export class CollectBase {
        
        /**
        * @language zh_CN
        * 可渲染对象列表
        */
        public renderList: Array<Object3D>;
        protected _nodes: Array<Object3D>;

        protected _num: number = 0;

        protected _rootNode: Object3D;
        private _tempRootNode: Object3D;
        private _objDict: { [id: number]: number; } = {};

        /**
        * @language zh_CN
        * constructor
        * @param root 渲染根节点
        */
        constructor(root:Object3D){
            this.renderList = new Array<Object3D>();
            this._nodes = new Array<Object3D>();
            this._rootNode = root;
        }
                
        /**
        * @language zh_CN
        * 数据更新
        * @param camera 当前摄像机
        */
        public update(camera: Camera3D) {
            this.renderList = this._nodes;
            this.renderList.length = 0;
            camera.frustum.update(camera);
        }
                        
        /**
        * @language zh_CN
        * 查找一个对象在渲染列表的下标
        * @param obj 要查找的对象
        * @returns 返回对象在渲染列表的下标
        */
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