module Egret3D {
                
    /**
    * @class Egret3D.Layer
    * @classdesc
    * Object3D 渲染Layer
    */
    export class Layer {
        
        /**
        * @language zh_CN
        * 没有alpht的对象列表
        */
        public objects: Array<Object3D> = new Array<Object3D>();

        /**
        * @language zh_CN
        * 有alpht的对象列表
        */
        public alphaObjects: Array<Object3D> = new Array<Object3D>();
    }
                
    /**
    * @class Egret3D.Tag
    * @classdesc
    * Object3D 渲染tag
    */
    export class Tag {
        
        /**
        * @language zh_CN
        * layer 列表
        */
        public layers: Array<Layer> = new Array<Layer>();

        /**
        * @language zh_CN
        * 是否清理深度
        */
        public clearDepth: boolean = false;

        /**
        * @language zh_CN
        * 层级清理深度状态
        */
        public cleanState: boolean = true; 
    }
            
    /**
    * @class Egret3D.EntityCollect
    * @classdesc
    * Object3D 渲染对象收集器
    */
    export class EntityCollect extends CollectBase {

        protected _tags: Array<Tag> = new Array<Tag>();
        protected _layers: Array<string> = new Array<string>();
        protected _tagsName: Array<string> = new Array<string>();
        
        /**
        * @language zh_CN
        * constructor
        * @param root 渲染根节点
        */
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
            this.addTag("wireframe",true);

            var tag: Object = {typeName:"",cleanDepth:false};

            this.addLayer("layer_0");
            this.addLayer("layer_1");
            this.addLayer("layer_2");
            this.addLayer("layer_3");
            this.addLayer("layer_4");
        }
        
        /**
        * @language zh_CN
        * 返回tags 列表
        * @readOnly
        * @returns tags 列表
        */
        public get tags(): Array<Tag> {
            return this._tags;
        }
                
        /**
        * @language zh_CN
        * 设置tag名和name的下标为index 没有的话会新加tag
        * @param name tag名
        * @param index 下标
        */
        public setTags(name: string, index: number) {
            var curIndex: number = this._tagsName.indexOf(name);
            if (curIndex != -1) {
                var tag: Tag = this._tags[curIndex];
                this.removeTag(name);

                this._tagsName.splice(index, 0, name);
                this._tags.splice(index, 0, tag);
            }
            else {
                this.insertTag(name, index);
            }
        }

        /**
        * @language zh_CN
        * 设置layer名和name的下标为index
        * @param layer layer名
        * @param index 下标
        */
        public setTagsItem(layer: string, index: number) {
            this.removeLayer(layer);
            this.insetLayer(layer, index);
        }
                                
        /**
        * @language zh_CN
        * 得到layer的值
        * @param name tag名
        * @param layer layer名
        * @returns 返回layer的值
        */
        public getTagLayer(name: string = "default", layer: string = "layer_0"): number {
            var typeIndex = this._tagsName.indexOf(name);
            var layerIndex = this._layers.indexOf(layer);
            return (typeIndex << 24) | layerIndex;
        }
                                        
        /**
        * @language zh_CN
        * 得到tag
        * @param name tag名
        * @returns tag
        */
        public getTag(name: string = "default"): Tag {
            var index:number = this._tagsName.indexOf(name);
            if (index != -1) {
                return this.tags[index];
            }
            return null;
        }
                                                
        /**
        * @language zh_CN
        * 增加tag
        * @param name tag名
        * @param clearDapth 是否清理深度
        */
        public addTag(name: string, clearDapth: boolean = false) {
            if (this._tagsName.indexOf(name) != -1) {
                return;
            }

            this._tagsName.push(name);

            var tag: Tag = new Tag();
            tag.clearDepth = clearDapth;
            this._tags.push(tag);

            for (var i: number = 0; i < this._layers.length; ++i) {
                var layer: Layer = new Layer();
                tag.layers.push(layer);
            }
        }
                                                        
        /**
        * @language zh_CN
        * 插入tag
        * @param name tag名
        * @param index 下标
        */
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
                                                                
        /**
        * @language zh_CN
        * 移除tag
        * @param name tag名
        */
        public removeTag(name: string) {
            var index: number = this._tagsName.indexOf(name);
            if (index == -1) {
                return;
            }

            this._tagsName.splice(index, 1);
            this._tags.splice(index, 1);
        }
                                                                        
        /**
        * @language zh_CN
        * 增加layer
        * @param name layer名
        */
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
                                                                                
        /**
        * @language zh_CN
        * 插入layer
        * @param name layer名
        * @param index layer下标
        */
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
                                                                                        
        /**
        * @language zh_CN
        * 移除layer
        * @param name layer名
        */
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
            var tag: Tag = this.findTag(object3d);

            if (object3d.material != null && object3d.material.materialData.alphaBlending) {
                layer.alphaObjects.push(object3d);
            }
            else {
                layer.objects.push(object3d);
            }
        }
                
        /**
        * @language zh_CN
        * 数据更新
        * @param camera 当前摄像机
        */
        public update(camera: Camera3D) {
            super.update(camera);

            this.clearLayerList();
            this.applyRender(this._rootNode, camera);

            this.renderList.length = 0;

            for (var i: number = 0; i < this._tags.length; ++i) {
                this._tags[i].clearDepth = true;
                for (var j: number = 0; j < this._tags[i].layers.length; ++j) {
                    for (var k: number = 0; k < this._tags[i].layers[j].objects.length; ++k) {
                        this.renderList.push(this._tags[i].layers[j].objects[k]);
                    }

                    this._tags[i].layers[j].alphaObjects.sort((a: Object3D, b: Object3D) => this.sort(a, b, camera));
                    for (var k: number = 0; k < this._tags[i].layers[j].alphaObjects.length; ++k) {
                        this.renderList.push(this._tags[i].layers[j].alphaObjects[k]);
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

        protected findTag(object3d: Object3D): Tag {
            var typeIndex: number = object3d.layer >> 24;
            if (typeIndex < this._tags.length && typeIndex >= 0) {
                return this._tags[typeIndex];
            }
            return this._tags[0];
        }

        protected clearLayerList() {
            for (var i: number = 0; i < this._tags.length; ++i) {
                for (var j: number = 0; j < this._tags[i].layers.length; ++j) {
                    this._tags[i].layers[j].objects.length = 0;
                    this._tags[i].layers[j].alphaObjects.length = 0;
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