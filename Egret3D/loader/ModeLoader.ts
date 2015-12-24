module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.ModeLoader
     * @classdesc
     * ModeLoader类
     */
    export class ModeLoader extends BaseLoader {

        private _mesh: Egret3D.Mesh;
        private _geomtry: Egret3D.GeometryBase;
        private _esmFile: string;
        private _eamFiles: string[];

        /**
         * @language zh_CN
         * constructor
         * @param rootURL 
         * @param ESMFile 
         * @param EAMFiles 
         */
        constructor(rootURL: string = null, ESMFile: string = null, EAMFiles: string[] = null) {
            super(LoaderType.LOADER_MODEL_TYPE, rootURL);
            this.url = rootURL;
            this._esmFile = ESMFile;
            this._eamFiles = EAMFiles;
        }

        /**
         * @language zh_CN
         * @returns string
         */
        public get esmFile(): string {
            return this._esmFile;
        }

        /**
		 * 模型Mesh对象;
		 */
        /**
         * @language zh_CN
         * 模型Mesh对象;
         * @returns Mesh
         */
        public get mesh(): Egret3D.Mesh {
            return this._mesh;
        }

        /**
		 * 模型GeometryBase对象;
		 */
        /**
         * @language zh_CN
         * 模型GeometryBase对象; 
         * @returns GeometryBase
         */
        public get geomtry(): Egret3D.GeometryBase {
            return this._geomtry;
        }

        /**
         * @language zh_CN
         */
        protected onLoad(): void {

            this._mesh = null;

            this._geomtry = null;

            var esmLoader: Egret3D.URLLoader = new Egret3D.URLLoader();

            esmLoader.onLoadComplete = (loader: Egret3D.URLLoader) => this.onESMLoadComplete(this.url, loader, this._eamFiles);

            esmLoader.load(this.url + this._esmFile);
        }

        private onESMLoadComplete(rootURL: string, esmLoader: Egret3D.URLLoader, EAMFiles: string[]): void {

            this._geomtry = esmLoader.data;
            var useDiffuse: boolean = (this._geomtry.textureFile && this._geomtry.textureFile.length > 0) ;
            var useNormal: boolean = (this._geomtry.textureBump && this._geomtry.textureBump.length > 0) ;
            var useSpecular: boolean = (this._geomtry.textureSpecular && this._geomtry.textureSpecular.length > 0) ;
            var material: Egret3D.TextureMaterial = new Egret3D.TextureMaterial(null);

            if (this._geomtry.textureFile.length > 0) {

                var asynLoadingMaterial: AsyncLoadingTexturematerial = new AsyncLoadingTexturematerial(material);

                asynLoadingMaterial.loadTexture(
                    useDiffuse ? (rootURL + this._geomtry.textureFile) : null,
                    useNormal ? (rootURL + this._geomtry.textureBump) : null,
                    useSpecular ? (rootURL + this._geomtry.textureSpecular) : null
                );
            }

            if (this._geomtry.geomtryType == Egret3D.GeometryType.Skin) {

                var skinGeomtry: Egret3D.SkinGeometry = <Egret3D.SkinGeometry>this._geomtry;

                this._mesh = new Egret3D.Mesh(this._geomtry, material, new Egret3D.SkeletonAnimation(skinGeomtry.initialSkeleton));
            }
            else {
                this._mesh = new Egret3D.Mesh(this._geomtry, material);
            }

            if (EAMFiles && EAMFiles.length > 0) {
                this.loadEAMFile(rootURL, 0, EAMFiles);
            }
            else {
                var e: Event3D = new Event3D(Event3D.EVENT_LOAD_COMPLETE);
                e.data = this;
                this.dispatchEvent(e);
            }
        }

        private loadEAMFile(rootURL: string, index: number, EAMFiles: string[]): void {

            if (index >= EAMFiles.length) {

                var e: Event3D = new Event3D(Event3D.EVENT_LOAD_COMPLETE);
                e.data = this;
                this.dispatchEvent(e);

                return;
            }

            var urlLoader: Egret3D.URLLoader = new Egret3D.URLLoader();

            urlLoader.onLoadComplete = (loader: Egret3D.URLLoader) => this.onEAMLoadComplete(rootURL, loader.data, index, EAMFiles);

            urlLoader.load(rootURL + EAMFiles[index]);
        }

        private onEAMLoadComplete(rootURL: string, animation: Egret3D.SkeletonAnimationClip, index: number, EAMFiles: string[]): void {

            (<Egret3D.SkeletonAnimation>this._mesh.animation).addSkeletonAnimationClip(animation);

            this.loadEAMFile(rootURL, index + 1, EAMFiles);
        }

    }
}