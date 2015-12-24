module Egret3D {

    export enum LoaderType {
        LOADER_MODEL_TYPE,
        LOADER_SCENE_TYPE,
        LOADER_TEXTURE_TYPE,
    }
    /**
     * @language zh_CN
     * @class Egret3D.BaseLoader
     * @classdesc
     * BaseLoader类
     */
    export class BaseLoader extends EventDispatcher{

        /**
         * @language zh_CN
         */
        public url: string;
        /**
         * @language zh_CN
         */
        public type: LoaderType;

        /**
         * @language zh_CN
         * constructor
         * @param type 
         * @param url 
         */
        constructor(type: LoaderType, url: string = null) {
            super();
            this.type = type;
            this.url = url;
        }

        /**
         * @language zh_CN
         *  加载场景;
         * @param url场景URL路径目录; 
         * @returns {} 
         */
        public load(url: string = null): void {

            if (url != null) {
                this.url = url;
            }
            
            if (null == this.url)
                return;

            this.onLoad();
        }

        /**
         * @language zh_CN
         * @returns {} 
         */
        protected onLoad(): void {
        }
    }
}