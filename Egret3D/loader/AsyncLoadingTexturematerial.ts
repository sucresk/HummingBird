module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.AsyncLoadingTexturematerial
     * @classdesc
     * AsyncLoadingTexturematerial类 用于纹理的加载
     */
    export class AsyncLoadingTexturematerial {

        private _mat: Egret3D.TextureMaterial;
        /**
        * @language zh_CN
        * constructor 
        * @param mat {Egret3D.TextureMaterial}
        */
        constructor(mat: Egret3D.TextureMaterial) {
            this._mat = mat;
        }

        /**
         * 加载纹理
         * @param texture 
         * @param bump 
         * @param spec 
         */
        public loadTexture(texture: string, bump: string = null, spec: string = null): void {
            if (texture) {
                var textureUrlLoader: Egret3D.URLLoader = new Egret3D.URLLoader();
                textureUrlLoader.onLoadComplete = (urlLoader: Egret3D.URLLoader) => this.__textureComplete(urlLoader);
                //textureUrlLoader.dataformat = BlackSwan.URLLoader.DATAFORMAT_DDS;
                textureUrlLoader.load(texture);
            }

            if (bump) {
                var bumpUrlLoader: Egret3D.URLLoader = new Egret3D.URLLoader();
                bumpUrlLoader.onLoadComplete = (urlLoader: Egret3D.URLLoader) => this.__bumpComplete(urlLoader);
                //bumpUrlLoader.dataformat = BlackSwan.URLLoader.DATAFORMAT_DDS;
                bumpUrlLoader.load(bump);
            }

            if (spec) {
                var specUrlLoader: Egret3D.URLLoader = new Egret3D.URLLoader();
                specUrlLoader.onLoadComplete = (urlLoader: Egret3D.URLLoader) => this.__specComplete(urlLoader);
                //bumpUrlLoader.dataformat = BlackSwan.URLLoader.DATAFORMAT_DDS;
                specUrlLoader.load(spec);
            }
        }

        private __specComplete(e: Egret3D.URLLoader) {
            e.data.upload(Egret3DDrive.context3D);
            this._mat.specularTexture = e.data;
        }

        private __textureComplete(e: Egret3D.URLLoader) {
            e.data.upload(Egret3DDrive.context3D);
            this._mat.diffuseTexture = e.data;
        }

        private __bumpComplete(e: Egret3D.URLLoader) {
            e.data.upload(Egret3DDrive.context3D);
            this._mat.normalTexture = e.data;
        }
    } 
}