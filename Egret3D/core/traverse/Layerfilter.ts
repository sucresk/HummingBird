module BlackSwan {
    export class LayerFilter {
        public numEntity: number = 0;
        public layerType: number = 0;
        public renderList: Array<Object3D>;
        public sortFunc: Function = null;
        public isSort; boolean = false;
        constructor(t:number = 1) {
            this.renderList = new Array<Object3D>();
            this.layerType = t;
            this.sortFunc = this.sort;
            this.isSort = false;
        }

        public update() {
            if (this.isSort) {
                this.sortFunc();
            }
        }

        public addObject3D(obj: Object3D ) {
            this.renderList.push(obj);
            this.numEntity = this.renderList.length;
            this.isSort = true;
        }

        public delObject3D(obj: Object3D) {
            var index: number = this.findObject3D(obj);
            if (index >= 0) {
                this.renderList.splice(index, 1);
                this.numEntity = this.renderList.length;
            }
        }

        public findObject3D(obj: Object3D): number {
            for (var i: number = 0; i < this.renderList.length; ++i) {
                if (this.renderList[i] === obj) {
                    return i;
                }
            }
            return -1;
        }

        public clear() {
            this.renderList.length = 0;
            this.numEntity = this.renderList.length;
        }

        private sort() {
            for (var i: number = 0; i < this.renderList.length; ++i) {
                for (var j: number = i + 1; j < this.renderList.length; ++j) {
                    if (this.renderList[j].z < this.renderList[j - 1].z) {
                        var tmp: Object3D = this.renderList[j];
                        this.renderList[j] = this.renderList[j - 1];
                        this.renderList[j - 1] = tmp;
                    }
                }
            }
        }
    }
}