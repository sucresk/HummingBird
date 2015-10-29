module Egret3D {

    export class DepthRender extends RenderBase {

        constructor() {
              super();
        }

        public draw(time: number, delay: number, context3D: Context3D, collect: CollectBase, camera: Camera3D) {

            this._renderList = collect.renderList;

            this._numEntity = this._renderList.length;

            for (this._renderIndex = 0; this._renderIndex < this._numEntity; this._renderIndex++) {
                this._renderList[this._renderIndex].update(time, delay);

                if (!this._renderList[this._renderIndex].isVisible) {
                    continue;
                }

                if (this._renderList[this._renderIndex].material != null) {
                    this._renderList[this._renderIndex].material.rendenDepthPass(context3D, camera, this._renderList[this._renderIndex].modelMatrix, this._renderList[this._renderIndex].geometry, this._renderList[this._renderIndex].animation);
                }
            }
        }

    }
} 