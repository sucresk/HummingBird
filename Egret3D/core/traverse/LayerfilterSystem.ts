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

        public setObject3DLayer(layerType: number, obj: Object3D): boolean {
            var layer: LayerFilter = this.findLayer(layerType);
            if (layer == null) {
                alert(layerType + ":Layer 不存在!");
                return false;
            }
            obj.renderLayer = layerType;
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
            this._mLayer_dict[layerType] = layer;
            return layer;
        }

        public addObject3D(obj: Object3D) {
            var layer: LayerFilter = this.findLayer(obj.renderLayer);
            if (layer != null) {
                layer.addObject3D(obj);
            }
        }

        public findLayer(layerType: number): LayerFilter {
            if (this._mLayer_dict[layerType] != undefined)
                return this._mLayer_dict[layerType];
            return null;
        }

        public clear() {
            for (var key in this._mLayer_dict) {
                var layer: LayerFilter = this._mLayer_dict[key];
                layer.clear();
            }
        }

        public getRenderList(): Array<Object3D> {
            var renderList: Array<Object3D> = new Array<Object3D>();
            for (var key in this._mLayer_dict) {
                var layer: LayerFilter = this._mLayer_dict[key];
                renderList = renderList.concat(layer.renderList);
            }

            return renderList;
        }
    }
}