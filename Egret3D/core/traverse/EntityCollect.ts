module Egret3D {

    export class Layer {
        public objects: Array<Object3D> = new Array<Object3D>();
        public alphtObjects: Array<Object3D> = new Array<Object3D>();
    }

    export class Tag {
        public layers: Array<Layer> = new Array<Layer>();
    }

    export class EntityCollect extends CollectBase {

        protected _tags: Array<Tag> = new Array<Tag>();
        protected _layers: Array<string> = new Array<string>();
        protected _tagsName: Array<string> = new Array<string>();

        constructor(root:Object3D) {
            super(root);
            this.addTag("default");
            this.addTag("terrain");
            this.addTag("terrain_texture");
            this.addTag("shadow");
            this.addTag("character");
            this.addTag("modle_effect");
            this.addTag("particle");
            this.addTag("transparent");

            this.addLayer("layer_0");
            this.addLayer("layer_1");
            this.addLayer("layer_2");
            this.addLayer("layer_3");
            this.addLayer("layer_4");
        }

        public addTag(name: string) {
            if (this._tagsName.indexOf(name) != -1) {
                return;
            }

            this._tagsName.push(name);

            var tag: Tag = new Tag();
            this._tags.push(tag);

            for (var i: number = 0; i < this._layers.length; ++i) {
                var layer: Layer = new Layer();
                tag.layers.push(layer);
            }
        }

        public insertTag(name: string, index: number) {
            if (this._tagsName.indexOf(name) != -1) {
                return;
            }

            this._tagsName.splice(index, 0, name);

            var tag: Tag = new Tag();
            this._tags.splice(index, 0, tag);

            for (var i: number = 0; i < this._layers.length; ++i) {
                var layer: Layer = new Layer();
                tag.layers.push(layer);
            }
        }

        public removeTag(name: string) {
            var index: number = this._tagsName.indexOf(name);
            if (index == -1) {
                return;
            }

            this._tagsName.splice(index, 1);
            this._tags.splice(index, 1);
        }

        public addLayer(name: string) {
            if (this._layers.indexOf(name) != -1) {
                return;
            }

            this._layers.push(name);
            for (var i: number = 0; i < this._tags.length; ++i) {
                var layer: Layer = new Layer();
                this._tags[i].layers.push(layer);
            }
        }

        public insetLayer(name: string, index: number) {
            if (this._layers.indexOf(name) != -1) {
                return;
            }
            this._layers.splice(index, 0, name);

            for (var i: number = 0; i < this._tags.length; ++i) {
                var layer: Layer = new Layer();
                this._tags[i].layers.splice(index, 0, layer);
            }
        }

        public removeLayer(name: string) {
            var index: number = this._layers.indexOf(name);
            if (index == -1) {
                return;
            }

            this._layers.splice(index, 1);
            for (var i: number = 0; i < this._tags.length; ++i) {
                this._tags[i].layers.splice(index, 1);
            }
        }

        private applyRender(child: Object3D, camera:Camera3D) {
            this.addRenderList(child, camera);

            for (var i: number = 0; i < child.childs.length; i++) {
                this.applyRender(child.childs[i], camera);
            }
        }

        private addRenderList(object3d: Object3D, camera: Camera3D) {
            if (!object3d.material) return;

            if (object3d.isCut) {
                if (!camera.isVisibleToCamera(object3d)) {
                    return;
                }
            }

            var layer: Layer = this.findLayer(object3d);
            if (object3d.material != null && object3d.material.materialData.alphaBlending) {
                layer.alphtObjects.push(object3d);
            }
            else {
                layer.objects.push(object3d);
            }
        }

        public update(camera: Camera3D) {
            super.update(camera);

            this.clearLayerList();
            this.applyRender(this._rootNode, camera);

            this.renderList.length = 0;
            for (var i: number = 0; i < this._tags.length; ++i) {
                for (var j: number = 0; j < this._tags[i].layers.length; ++j) {
                    for (var k: number = 0; k < this._tags[i].layers[j].objects.length; ++k) {
                        this.renderList.push(this._tags[i].layers[j].objects[k]);
                    }

                    this._tags[i].layers[j].alphtObjects.sort((a: Object3D, b: Object3D) => this.sort(a, b, camera));
                    for (var k: number = 0; k < this._tags[i].layers[j].alphtObjects.length; ++k) {
                        this.renderList.push(this._tags[i].layers[j].alphtObjects[k]);
                    }
                }
            }
        }

        protected findLayer(object3d: Object3D): Layer {
            var typeIndex: number = object3d.layer >> 24;
            var layerIndex: number = object3d.layer & 0x00FFFFFF;
            if (typeIndex < this._tags.length && typeIndex >= 0) {
                if (layerIndex < this._tags[typeIndex].layers.length && layerIndex >= 0) {
                    return this._tags[typeIndex].layers[layerIndex];
                }
            }
            return this._tags[0].layers[0];
        }

        protected clearLayerList() {
            for (var i: number = 0; i < this._tags.length; ++i) {
                for (var j: number = 0; j < this._tags[i].layers.length; ++j) {
                    this._tags[i].layers[j].objects.length = 0;
                    this._tags[i].layers[j].alphtObjects.length = 0;
                }
            }
        }

        protected sort(a: Object3D, b: Object3D, camera: Camera3D) {
            var dis_0: number = Vector3D.distance(a.globalPosition, camera.position);
            var dis_1: number = Vector3D.distance(b.globalPosition, camera.position);
            if (dis_0 > dis_1) {
                return -1;
            }
            else if (dis_0 < dis_1) {
                return 1;
            }

            return 0;
        }
    }
}