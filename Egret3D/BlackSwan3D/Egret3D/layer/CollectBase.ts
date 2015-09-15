module BlackSwan {
    export class CollectBase {

        public numEntity: number = 0;
        public layerType: number = 0;
        public sortFunc: Function = null;
        public isSort; boolean = false;

        protected _renderList: Array<Entity>;
        protected _nodes: Array<Entity>;

        constructor(t:number = 1) {
            this._renderList = new Array<Entity>();
            this._nodes = new Array<Entity>();
            this.layerType = t;
            this.sortFunc = this.sort;
            this.isSort = false;
        }

        public update() {
            if (this.isSort) {
                this.sortFunc();
            }
        }

        public addEntity( entity:Entity ) {
            this._nodes.push(entity);
            this.numEntity = this.renderList.length;
            this.isSort = true;
        }

        public delEntity(entity: Entity) {
            var index: number = this.findEntity(entity);
            if (index >= 0) {
                this._nodes.splice(index, 1);
                this.numEntity = this.renderList.length;
            }
        }

        public findEntity(entity: Entity): number {
            for (var i: number = 0; i < this.renderList.length; ++i) {
                if (this._nodes[i] === entity) {
                    return i;
                }
            }
            return -1;
        }
        public get renderList(): Array<Entity> {
            return this._renderList ;
        }

        private sort() {
            var j: number = 0;
            var temp: number = 0;
            var entity: Entity = null;
            for (var i: number = 0; i < this._nodes.length; ++i) {
                j = i + 1;
                entity = this._nodes[j];
                temp = entity.z;
                while (j > 0 && temp < this._nodes[j - 1].z) {
                    this._nodes[j] = this._nodes[j - 1];
                    j--;
                }

                this._nodes[j] = entity;
            }
        }
    }
}