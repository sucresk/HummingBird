module Egret3D {
            
    /**
     * @language zh_CN 
     * @class Egret3D.LightBase
     * @classdesc
     * 灯光基类
     */
    export class LightBase extends Object3D {
        /**
         * @language en_US
         */
        /**
         *@language zh_CN 
         * 类型
         */
        protected _lightType: number = -1 ;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         * 环境颜色
         */
        protected _ambient: Vector3D = new Vector3D(1.0,1.0,1.0 );
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         * 漫反射  
         */
        protected _diffuse: Vector3D = new Vector3D(1.0, 1.0, 1.0);
        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         * 镜面反射  
         */
        protected _specular: Vector3D = new Vector3D(1.0, 1.0, 1.0);
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        protected _halfVector: Vector3D = new Vector3D(1.0, 1.0, 1.0 );

        /**
        * @language en_US 
        * @param value 
        */
        /**
         * @language zh_CN
         * @param value 强度
         */
        protected _intensity: number = 1;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        protected _spotExponent: number = 1.1;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        protected _spotCutoff: number = 0.7;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        protected _spotCosCutoff: number = 0.1;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        protected _constantAttenuation: number = 0.1;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        protected _linearAttenuation: number = 0.1;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        protected _quadraticAttenuation: number = 0.1;

        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        public _lightIndex: number = -1;

        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        private len: number = 25;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        private _change: boolean = true;
        constructor() {
            super();
        }

        /**
         * @language zh_CN  
         * @writeOnly
         * 设置灯光强度
         */
        public set intensity(value: number) {
            if (this._intensity != value){
                this._intensity = value;
                this._change = false;
            }
        }
        
        /**
         * @language zh_CN  
         * @readOnly
         * 得到灯光强度
         */
        public get intensity(): number {
            return this._intensity;
        }
                
        /**
         * @language zh_CN  
         * @writeOnly
         * 设置灯光环境色
         */
        public set ambient(color: number) {
            this._ambient.w = (color >> 24 & 0xff) / 255;
            this._ambient.x = (color >> 16 & 0xff) / 255;
            this._ambient.y = (color >> 8 & 0xff) / 255;
            this._ambient.z = (color & 0xff) / 255;
            this._change = false;
        }
        
        /**
         * @language zh_CN  
         * @readOnly
         * return ambient
         */
        public get ambient(): number {
            return 0;
        }
                        
        /**
         * @language zh_CN  
         * @writeOnly
         * 设置灯光漫反射颜色
         */
        public set diffuse(color: number) {
            this._diffuse.w = (color >> 24 & 0xff) / 255;
            this._diffuse.x = (color >> 16 & 0xff) / 255;
            this._diffuse.y = (color >> 8 & 0xff) / 255;
            this._diffuse.z = (color & 0xff) / 255;
            this._change = false;
        }
                
        /**
         * @language zh_CN  
         * @readOnly
         * return diffuse
         */
        public get diffuse(): number {
            return 0;
        }
                                
        /**
         * @language zh_CN  
         * @writeOnly
         * 设置灯光镜面反射颜色
         */
        public set specular(color: number) {
            this._specular.w = (color >> 24 & 0xff) / 255;
            this._specular.x = (color >> 16 & 0xff) / 255;
            this._specular.y = (color >> 8 & 0xff) / 255;
            this._specular.z = (color & 0xff) / 255;
            this._change = false;
        }
                        
        /**
         * @language zh_CN  
         * @readOnly
         * return specular
         */
        public get specular(): number {
            return 0;
        }

        private init() {
            
        }

        /**
         * @language en_US
         * @param index 
         * @param lightData 
         */
        /**
         * @language zh_CN
         * 更新灯光数据
         * @param index 灯光ID
         * @param lightData 灯光数据
         */
        public updateLightData(index:number, lightData: Float32Array) {
          
        }
    }
}