module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.AssetsManager
     * @classdesc
     * AssetsManager 资源管理类
     */
    export class AssetsManager extends EventDispatcher{

        static _instance: AssetsManager = new AssetsManager();

        private loadList: Array<BaseLoader> = [];
        private completeCount: number = 0; 
        private assets: Object = {}; 
        private assetsModel: Object = {}; 
        private assetsScene: Object = {}; 
        private assetsTexture: Object = {}; 
        private rootURL: string = "";

        /**
         * @language zh_CN
         * @returns AssetsManager
         */
        public static getInstance(): AssetsManager {
            return AssetsManager._instance;
        }
        /**
        * @language zh_CN
        * constructor 
        */
        constructor() {
            super();
        }

        /**
         * @language zh_CN
         * 设置根路径
         * @param rootURL 
         */
        public setRootURL(rootURL:string): void {
            this.rootURL = rootURL;
        }

        /**
         * @language zh_CN
         * 查找资源
         * @param url 
         * @returns any
         */
        public findAssets(url: string): any {
            return this.assets[this.rootURL + url];
        }

        /**
         * @language zh_CN
         * @param url 
         * @returns mesh
         */
        public findModel(url: string): Mesh {
            return this.assetsModel[this.rootURL + url];
        }

        /**
         * @language zh_CN
         * @param url 
         * @returns Mesh
         */
        public findAnimModel(url: string): Mesh {
            return this.assetsModel[this.rootURL + url];
        }

        /**
         * @language zh_CN
         * @param url 
         * @returns Array<Mesh>
         */
        public findScene(url: string): Array<Mesh> {
            return this.assetsScene[this.rootURL + url];
        }

        /**
         * @language zh_CN
         * @param url 
         * @returns TexureBase
         */
        public findTexture(url: string):TextureBase {
            return this.assetsTexture[this.rootURL + url];
        }

        /**
         * @language zh_CN
         */
        public startLoad() {

            for (var i: number = 0; i < this.loadList.length; i++){

                var loader: BaseLoader = this.loadList[i]; 

                loader.addEventListener(Event3D.EVENT_LOAD_COMPLETE, (e:Event3D) => this.checkComplete(e));

                loader.load();
            }
        }

        /**
         * @language zh_CN
         * @param url 
         * @param ESMFile 
         */
        public addLoadModel(url: string, ESMFile: string) {

            var modelLoad: ModeLoader = new ModeLoader(this.rootURL + url, ESMFile);

            this.loadList.push(modelLoad);
        }


        /**
         * @language zh_CN
         * @param url 
         * @param ESMFile 
         * @param EAMFiles 
         */
        public addLoadAnimModel(url: string, ESMFile: string, EAMFiles: string[]) {

            var modelLoad: ModeLoader = new ModeLoader(this.rootURL + url, ESMFile, EAMFiles);

            this.loadList.push(modelLoad);
        }


        /**
         * @language zh_CN
         * @param url 
         */
        public addLoadScene(url: string) {

            var sceneLoader: SceneLoader = new SceneLoader(this.rootURL + url);

            this.loadList.push(sceneLoader);
        }

        /**
         * @language zh_CN
         * @param url 
         */
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
                this.dispatchEvent(new Event3D(Event3D.EVENT_LOAD_COMPLETE,this));
            }

        }

    }
}