module Egret3D {
    export class TextureLoader extends BaseLoader {

        private _texture: TextureBase;

        constructor(url: string = null) {
            super(LoaderType.LOADER_TEXTURE_TYPE, url);
        }

        public get texture(): TextureBase {
            return this._texture;
        }

        protected onLoad(): void {

            var textureLoader: Egret3D.URLLoader = new Egret3D.URLLoader();

            textureLoader.onLoadComplete = (textureLoader: Egret3D.URLLoader) => this.onEMFileLoadComplete(textureLoader);

            textureLoader.load(this.url);
        }

        private onEMFileLoadComplete(textureLoader: Egret3D.URLLoader) {

            this._texture = textureLoader.data;
            var e: Event3D = new Event3D(EventDispatch.EVENT_LOAD_COMPLETE);
            e.data = this;
            this.dispatchEvent(e);
        }
    }
}