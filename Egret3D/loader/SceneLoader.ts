module Egret3D {

    export class SceneLoader extends BaseLoader {

        private _meshList: Array<Egret3D.Mesh> = [];
        private _totalNumber: number = 0;

        constructor(sceneURL: string = null) {
            super(LoaderType.LOADER_SCENE_TYPE, sceneURL);
        }

        /**
		 * 场景对象列表;
		 */
        public get meshList(): Array<Egret3D.Mesh> {
            return this._meshList;
        }

        protected onLoad(): void {

            this._meshList = [];

            var emLoader: Egret3D.URLLoader = new Egret3D.URLLoader();

            emLoader.onLoadComplete = (emLoader: Egret3D.URLLoader) => this.onEMFileLoadComplete(this.url, emLoader);

            emLoader.load(this.url + "/config.em");
        }

        private onEMFileLoadComplete(sceneURL: string, emLoader: Egret3D.URLLoader) {

            var obj = this.parsingXML(emLoader.data);

            var nodeList: NodeList = obj.getElementsByTagName("mesh");

            this._totalNumber = nodeList.length;

            for (var i: number = 0; i < nodeList.length; i++) {

                var linkURL: string = sceneURL;

                linkURL += "/" + nodeList[i].attributes.getNamedItem("link").value;

                var rotation: Egret3D.Vector3D = new Egret3D.Vector3D();
                rotation.parsing(nodeList[i].attributes.getNamedItem("rotation").value);

                var scaling: Egret3D.Vector3D = new Egret3D.Vector3D();
                scaling.parsing(nodeList[i].attributes.getNamedItem("scaling").value);

                var translation: Egret3D.Vector3D = new Egret3D.Vector3D();
                translation.parsing(nodeList[i].attributes.getNamedItem("translation").value);

                this.loadChild(linkURL, rotation, scaling, translation, sceneURL + "/");
            }
        }

        private loadChild(linkURL: string, rotation: Egret3D.Vector3D, scaling: Egret3D.Vector3D, translation: Egret3D.Vector3D, url: string) {

            var linkLoader: Egret3D.URLLoader = new Egret3D.URLLoader();

            linkLoader.onLoadComplete = (linkLoader: Egret3D.URLLoader) => this.onLoadComplete(linkLoader, rotation, scaling, translation, url);

            linkLoader.load(linkURL);
        }

        private onLoadComplete(linkLoader: Egret3D.URLLoader, rotation: Egret3D.Vector3D, scaling: Egret3D.Vector3D, translation: Egret3D.Vector3D, url: string) {

            var geomtry: Egret3D.GeometryBase = linkLoader.data;

            var material: Egret3D.TextureMaterial = new Egret3D.TextureMaterial();

            var asynLoadingMaterial: AsyncLoadingTexturematerial = new AsyncLoadingTexturematerial(material);

            asynLoadingMaterial.loadTexture(
                geomtry.textureFile.length > 0 ? (url + geomtry.textureFile) : null,
                geomtry.textureBump.length > 0 ? (url + geomtry.textureBump) : null,
                geomtry.textureSpecular.length > 0 ? (url + geomtry.textureSpecular) : null
            );

            var mesh: Egret3D.Mesh = new Egret3D.Mesh(linkLoader.data, material);
            mesh.scaleX = scaling.x;
            mesh.scaleY = scaling.y;
            mesh.scaleZ = scaling.z;
            mesh.rotationX = rotation.x;
            mesh.rotationY = rotation.y;
            mesh.rotationZ = rotation.z;
            mesh.x = translation.x;
            mesh.y = translation.y;
            mesh.z = translation.z;

            this._meshList.push(mesh);

            if (this._meshList.length >= this._totalNumber) {
                var e: Event3D = new Event3D(EventDispatch.EVENT_LOAD_COMPLETE);
                e.data = this;
                this.dispatchEvent(e);
            }
        }

        private parsingXML(xmlString: string): any {

            var xmlDoc = null;

            if (!window["DOMParser"] && window["ActiveXObject"]) {

                var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];

                for (var i = 0; i < xmlDomVersions.length; i++) {

                    try {
                        xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                        xmlDoc.async = false;
                        xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                        break;
                    } catch (e) {
                    }
                }
            }
            else if (window["DOMParser"] && document.implementation && document.implementation.createDocument) {

                    try {
                        var domParser = new DOMParser();
                        xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
                    } catch (e) {
                }
            }
            else {
                return null;
            }

            return xmlDoc;
        }
    }
}