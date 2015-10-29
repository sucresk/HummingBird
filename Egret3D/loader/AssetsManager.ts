module Egret3D {
    export class AssetsManager extends EventDispatch{

        static _instance: AssetsManager = new AssetsManager();

        private loadList: Array<BaseLoader> = [];
        private completeCount: number = 0; 
        private assets: Object = {}; 
        private assetsModel: Object = {}; 
        private assetsScene: Object = {}; 
        private assetsTexture: Object = {}; 
        private rootURL: string = "";

        public static getInstance(): AssetsManager {
            return AssetsManager._instance;
        }

        constructor() {
            super();
        }

        public setRootURL(rootURL:string): void {
            this.rootURL = rootURL;
        }

        public findAssets(url: string): any {
            return this.assets[this.rootURL + url];
        }

        public findModel(url: string): Mesh {
            return this.assetsModel[this.rootURL + url];
        }

        public findAnimModel(url: string): Mesh {
            return this.assetsModel[this.rootURL + url];
        }

        public findScene(url: string): Array<Mesh> {
            return this.assetsScene[this.rootURL + url];
        }

        public findTexture(url: string):TextureBase {
            return this.assetsTexture[this.rootURL + url];
        }

        public startLoad() {

            for (var i: number = 0; i < this.loadList.length; i++){

                var loader: BaseLoader = this.loadList[i]; 

                loader.addEventListener(EventDispatch.EVENT_LOAD_COMPLETE, (e:Event3D) => this.checkComplete(e));

                loader.load();
            }
        }

        public addLoadModel(url: string, ESMFile: string) {

            var modelLoad: ModeLoader = new ModeLoader(this.rootURL + url, ESMFile);

            this.loadList.push(modelLoad);
        }

        public addLoadAnimModel(url: string, ESMFile: string, EAMFiles: string[]) {

            var modelLoad: ModeLoader = new ModeLoader(this.rootURL + url, ESMFile, EAMFiles);

            this.loadList.push(modelLoad);
        }

        public addLoadScene(url: string) {

            var sceneLoader: SceneLoader = new SceneLoader(this.rootURL + url);

            this.loadList.push(sceneLoader);
        }

        public addLoadTexture(url: string) {

            var textureLoader: TextureLoader = new TextureLoader(this.rootURL + url);

            this.loadList.push(textureLoader);
        }

        private checkComplete(e:Event3D) {

            var loader: BaseLoader = <BaseLoader>e.data; 

            switch (loader.type) {
                case LoaderType.LOADER_MODEL_TYPE:
                    var modeLoader: ModeLoader = <ModeLoader>loader;
                    this.assets[modeLoader.url + modeLoader.esmFile] = modeLoader.mesh;
                    this.assetsModel[modeLoader.url + modeLoader.esmFile] = modeLoader.mesh;
                    break;
                case LoaderType.LOADER_SCENE_TYPE:
                    this.assets[loader.url] = (<SceneLoader>loader).meshList;
                    this.assetsScene[loader.url] = (<SceneLoader>loader).meshList;
                    break;
                case LoaderType.LOADER_TEXTURE_TYPE:
                    this.assets[loader.url] = (<TextureLoader>loader).texture;
                    this.assetsTexture[loader.url] = (<TextureLoader>loader).texture;
                    break;
            }

            this.completeCount++;

            if (this.completeCount >= this.loadList.length) {
                var e: Event3D = new Event3D(ModeLoader.EVENT_LOAD_COMPLETE);
                e.data = this;
                this.dispatchEvent(e);
            }

        }

    }
}