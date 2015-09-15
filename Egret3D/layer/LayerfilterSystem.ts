module BlackSwan {
    export class LayerFilterSystem {

        private _mLayer_dict: { [layerType: number]: LayerFilter; } = {}

        constructor() {

        }

        public init(): void {
        }

        public update(): void {
            for (var key in this._mLayer_dict) {
                this._mLayer_dict[key].update();
            }
        }

        public setEntityLayer(layerType: number, entity: Entity): boolean {
            var layer: LayerFilter = this.findLayer(layerType);
            if (layer == null) {
                alert(layerType + ":Layer 不存在!");
                return false;
            }
            entity.layerFilter = layer;
            return true;
        }

        public createLayer(layerType: number): LayerFilter {
            var layer: LayerFilter = null;
            layer = this.findLayer(layerType);
            if (layer != null) {
                alert(layerType + ":Layer 已经存在!");
                return null;
            }

            layer = new LayerFilter(layerType);
            this._mLayer_dict[name] = layer;
            return layer;
        }

        public findLayer(layerType: number): LayerFilter {
            if (this._mLayer_dict[layerType] != undefined)
                return this._mLayer_dict[layerType];
            return null;
        }
    }
}