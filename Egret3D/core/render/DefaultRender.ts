module BlackSwan {

    export class DefaultRender extends RenderBase {

        private _renderIndex: number = 0;
        private _numEntity: number = 0; 
        private _renderList: Array<Object3D>;

        protected _layerSystem: LayerFilterSystem = new LayerFilterSystem();

        constructor(camera3D: Camera3D) {
            super(camera3D);
            this._layerSystem.createLayer(1);
            this._layerSystem.createLayer(2);
        }

        public draw(time: number, delay: number,context3D: Context3D,collect: CollectBase ) {

            this._layerSystem.clear();

            for (var i: number = 0; i < collect.renderList.length; ++i) {
                if (collect.renderList[i].material != null) {
                    collect.renderList[i].renderLayer = collect.renderList[i].material.alpha > 0 ? 1 : 2;
                }
                this._layerSystem.addObject3D(collect.renderList[i]);
            }

            this._layerSystem.update();

            this._renderList = this._layerSystem.getRenderList();

            this._numEntity = this._renderList.length;

            //context3D.gl.clear(context3D.gl.COLOR_BUFFER_BIT | context3D.gl.DEPTH_BUFFER_BIT);

            for (this._renderIndex = 0; this._renderIndex < this._numEntity ; this._renderIndex++){
                this._renderList[this._renderIndex].update(time, delay);
                if (this._renderList[this._renderIndex].material != null) {
                    if (this._renderList[this._renderIndex].material.alpha != 0) {
                        this._renderList[this._renderIndex].material.rendenDiffusePass(context3D, this.camera3D, this._renderList[this._renderIndex].modelMatrix, this._renderList[this._renderIndex].geomtry, this._renderList[this._renderIndex].animation);
                    }
                }
            }

        }

    }
} 