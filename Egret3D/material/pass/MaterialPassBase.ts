module Egret3D {

     /**
     * @class Egret3D.MaterialPassBase
     * @classdesc
     * 材质通道渲染器
     */
    export class MaterialPassBase {
        
        /**
         * @language zh_CN
         */
        protected shaderChange: boolean = false;
        /**
         * @language zh_CN
         */
        protected context3DChange: boolean = false;

        /**
         * @language zh_CN
         */
        protected materialData: MaterialData;

        /**
         * @language zh_CN
         */
        protected vertexShader: VertexShader;
        /**
         * @language zh_CN
         */
        protected pixelShader: PixelShader;

        /**
         * @language zh_CN
         */
        protected methodList: Array<MethodBase>;
        /**
         * @language zh_CN
         */
        protected effectMethodList: Array<EffectMethod>;

        /**
         * @language zh_CN
         */
        public diffuseMethod: MethodBase;
        /**
         * @language zh_CN
         */
        public shadowMaping: ShadowMapingMethod;

        /**
         * @language zh_CN
         */
        protected animation: IAnimation;
        /**
         * @language zh_CN
         * @param data 
         */
        constructor(data: MaterialData = null) {
            this.materialData = data; 
        }

        /**
         * @language zh_CN
         * @param method 
         */
        public addMethod(method: MethodBase) {
            this.methodList = this.methodList || new Array<MethodBase>();
            this.methodList.push(method);
            this.shaderChange = true;
        }

        /**
         * @language zh_CN
         * @param method 
         */
        public removeMethod(method: MethodBase) {
            var index: number = this.methodList.indexOf(method);
            this.methodList.splice(index, 1);
            method.dispose();
        }

        /**
         * @language zh_CN
         * @param method 
         */
        public addEffectMethod(method: EffectMethod) {
            this.effectMethodList = this.effectMethodList || new Array<EffectMethod>();
            this.effectMethodList.push(method);
            this.shaderChange = true;
        }

        /**
         * @language zh_CN
         * @param method 
         */
        public removeEffectMethod(method: EffectMethod) {
            var index: number = this.effectMethodList.indexOf(method);
            this.effectMethodList.splice(index, 1);
            method.dispose();
        }


        /**
         * @language zh_CN
         * @param value 
         */
        public set cullMode(value: number) {
            this.materialData.cullFrontOrBack = value;
        }

        /**
         * @language zh_CN
         * @returns number
         */
        public get cullMode( ): number {
            return this.materialData.cullFrontOrBack ;
        }

        /**
         * @language zh_CN
         * @param flag 
         */
        public set bothSides(flag: boolean) {
            this.materialData.cullFrontOrBack = -1; 
        }

        /**
         * @language zh_CN
         * @returns boolean
         */
        public get bothSides( ): boolean {
            if (this.materialData.cullFrontOrBack == -1)
                return true
            return false ;
        }

        /**
         * @language zh_CN
         * @param lights 
         */
        public set lightGroup(lights: Array<LightBase> ) {
      
        }

        /**
        * 初始化 shader 的地方
        */
        /**
         * @language zh_CN
         * 初始化 shader 的地方
         * @param context3D 
         * @param geomtry 
         * @param animation 
         */
        public initShader(context3D: Context3D, geomtry: GeometryBase, animation: IAnimation) {
            this.animation = animation; 
        }

        /**
         * @language zh_CN
         * @returns {} 
         */
        protected resetTexture() {

        }

        private buildShader(context3D: Context3D) {
          
        }
         
        /**
         * @language zh_CN
         * @param context3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation ) {
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public draw(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            var i: number = 0;
           
            if (this.materialData.depthTest) {
                context3D.gl.enable(context3D.gl.DEPTH_TEST);
                context3D.gl.depthFunc(context3D.gl.LEQUAL);
            }
            else {
                context3D.gl.disable(context3D.gl.DEPTH_TEST);
                context3D.gl.depthFunc(context3D.gl.LEQUAL);
            }

            context3D.gl.cullFace(this.materialData.cullFrontOrBack);
            context3D.setBlendFactors(this.materialData.blend_src, this.materialData.blend_dest);

            if (this.materialData.alphaBlending)
                context3D.gl.depthMask(false);
        }

        /**
         * @language zh_CN
         * @param context3D 
         * @param camera3D 
         */
        public unActive(context3D: Context3D, camera3D: Camera3D) {
        }

    }
} 
