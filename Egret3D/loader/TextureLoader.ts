module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.TextureLoader
     * @classdesc
     * TextureLoader类 用于Texture文件加载
     */
    export class TextureLoader extends BaseLoader {

        private _texture: TextureBase;

        /**
         * @language zh_CN
         * constructor
         * @param url 
         */
        constructor(url: string = null) {
            super(LoaderType.LOADER_TEXTURE_TYPE, url);
        }

        /**
         * @language zh_CN
         * @returns TextureBase 
         */
        public get texture(): TextureBase {
            return this._texture;
        }

        /**
         * @language zh_CN
         * @returns {} 
         */
        protected onLoad(): void {

            var textureLoader: URLLoader = new URLLoader();

            textureLoader.onLoadComplete = (textureLoader: URLLoader) => this.onEMFileLoadComplete(textureLoader);

            textureLoader.load(this.url);
        }

        private onEMFileLoadComplete(textureLoader: URLLoader) {

            this._texture = textureLoader.data;
            this.dispatchEvent(new Event3D(Event3D.EVENT_LOAD_COMPLETE,this));
        }
    }
}