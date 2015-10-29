module Egret3D {

    export enum LoaderType {
        LOADER_MODEL_TYPE,
        LOADER_SCENE_TYPE,
        LOADER_TEXTURE_TYPE,
    }

    export class BaseLoader extends EventDispatch{

        public url: string;
        public type: LoaderType;

        constructor(type: LoaderType, url: string = null) {
            super();
            this.type = type;
            this.url = url;
        }

        /**
		 * 加载场景;
		 *
		 * @param sceneURL   场景URL路径目录;
		 */
        public load(url: string = null): void {

            if (url != null) {
                this.url = url;
            }
            
            if (null == this.url)
                return;

            this.onLoad();
        }

        protected onLoad(): void {
        }
    }
}