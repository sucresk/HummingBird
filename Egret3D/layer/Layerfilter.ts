module BlackSwan {
    export class LayerFilter {
        public numEntity: number = 0;
        public layerType: number = 0;
        public renderList: Array<Entity>;
        public sortFunc: Function = null;
        public isSort; boolean = false;
        constructor(t:number = 1) {
            this.renderList = new Array<Entity>();
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
            this.renderList.push(entity);
            this.numEntity = this.renderList.length;
            this.isSort = true;
        }

        public delEntity(entity: Entity) {
            var index: number = this.findEntity(entity);
            if (index >= 0) {
                this.renderList.splice(index, 1);
                this.numEntity = this.renderList.length;
            }
        }

        public findEntity(entity: Entity): number {
            for (var i: number = 0; i < this.renderList.length; ++i) {
                if (this.renderList[i] === entity) {
                    return i;
                }
            }
            return -1;
        }

        // 基数排序;
        private sort() {
            var max: number = 0;
            var maxEntity: Entity = null;
            var i: number = 0;
            var exp: number = 1;

            var tempList: Array<Entity> = new Array<Entity>();
            for (i = 0; i < this.renderList.length; ++i) {
                if (this.renderList[i].zBuffer > max) {
                    max = this.renderList[i].zBuffer;
                    maxEntity = this.renderList[i];
                }
            }

            if (maxEntity == null) {
                // 没有找到最大的值;
                return;
            }

            while (max / exp > 0) {
                var bucket: Array<number> = new Array<number>(10);
                for (i = 0; i < this.renderList.length; i++) {
                    bucket[this.renderList[i].zBuffer / exp % 10]++;
                }

                for (i = 1; i < 10; i++) {
                    bucket[i] += bucket[i - 1];
                }

                for (i = this.renderList.length - 1; i >= 0; i--) {
                    tempList[--bucket[this.renderList[i].zBuffer / exp % 10]] = this.renderList[i];
                }

                for (i = 0; i < this.renderList.length; i++) {
                    this.renderList[i] = tempList[i];
                }

                exp *= 10;
            }
        }
    }
}