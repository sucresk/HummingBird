module Egret3D {

     /**
     * @class Egret3D.MethodUsageData
     * @classdesc
     * 方法中需要用到的数据
     */
    export class MethodUsageData {

        /**
         * @language zh_CN
         */
        public passNeedReset: boolean = false; 

        /**
         * @language zh_CN
         */
        public uniform_1ivs: Array<GLSL.Uniform>;
        /**
         * @language zh_CN
         */
        public uniform_1fvs: Array<GLSL.Uniform>;

        /**
         * @language zh_CN
         */
        public uniform_2ivs: Array<GLSL.Uniform>;
        /**
         * @language zh_CN
         */
        public uniform_2fvs: Array<GLSL.Uniform>;

        /**
         * @language zh_CN
         */
        public uniform_3ivs: Array<GLSL.Uniform>;
        /**
         * @language zh_CN
         */
        public uniform_3fvs: Array<GLSL.Uniform>;

        /**
         * @language zh_CN
         */
        public uniform_4ivs: Array<GLSL.Uniform>;
        /**
         * @language zh_CN
         */
        public uniform_4fvs: Array<GLSL.Uniform>;
        //---------------------------------------------
        //---------------------------------------------
        /**
         * @language zh_CN
         */
        public attribute_position: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_offset: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_normal: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_tangent: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_color: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_uv0: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_uv1: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_boneIndex: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_boneWeight: GLSL.Attribute;

        //---------------------------------------------
        //---------------[particle]--------------------
        public attribute_rotate: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_acceleRotate: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_scale: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_acceleScale: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_speed: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_acceleSpeed: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_startSpaceLifeTime: GLSL.Attribute;
        //---------------------------------------------
        //---------------------------------------------

        /**
         * @language zh_CN
         */
        public uniform_time: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_cameraMatrix: GLSL.Uniform;

        /**
         * @language zh_CN
         */
        public varying_pos: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_normal: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_tangent: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_color: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_uv0: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_uv1: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_eyeNormal: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_eyedir: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public TBN: GLSL.Attribute;
        
        /**
         * @language zh_CN
         */
        public uniform_ModelMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_ProjectionMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_normalMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_shadowMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_eyepos: GLSL.Uniform;
        
        /**
         * @language zh_CN
         */
        public uniform_PoseMatrix: GLSL.Uniform;

        /**
         * @language zh_CN
         */
        public uniform_sceneWidth: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_sceneHeight: GLSL.Uniform;

        //public diffuseTex: GLSL.Sampler2D;
        //public normalTex: GLSL.Sampler2D;
        //public specularTex: GLSL.Sampler2D;
        //public texture2D_1: GLSL.Sampler2D;
        //public texture2D_4: GLSL.Sampler2D;
        //public texture2D_5: GLSL.Sampler2D;
        //public sky_texture: GLSL.Sampler2D;
        //public shadowMapTex: GLSL.Sampler2D;

        //public lightMapTex: GLSL.Sampler2D;
        //public maskTex: GLSL.Sampler2D;
        //public splat_0Tex: GLSL.Sampler2D;
        //public splat_1Tex: GLSL.Sampler2D;
        //public splat_2Tex: GLSL.Sampler2D;
        //public splat_3Tex: GLSL.Sampler2D;

        /**
         * @language zh_CN
         */
        public sampler2DList: Array<GLSL.Sampler2D> = new Array<GLSL.Sampler2D>(); 
        /**
         * @language zh_CN
         */
        public sampler3DList: Array<GLSL.Sampler3D> = new Array<GLSL.Sampler3D>(); 

        /**
         * @language zh_CN
         */
        public uniform_materialSource: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_LightSource: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_lightModelSource: GLSL.Uniform;

        /**
         * @language zh_CN
         */
        public uniform_directLightSource:GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_sportLightSource: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_pointLightSource:GLSL.Uniform ;
        /**
         * @language zh_CN
         */
        public uniform_skyLightSource: GLSL.Uniform;

        //----------------------------------------------
        //----------------------------------------------
        /**
         * @language zh_CN
         */
        public program3D: IProgram3D;
        /**
         * @language zh_CN
         */
        public vs_shader: Shader;
        /**
         * @language zh_CN
         */
        public fs_shader: Shader;
        //----------------------------------------------
      
        /**
         * @language zh_CN
         */
        public vsMethodList: Array<MethodBase> = new Array<MethodBase>() ;
        /**
         * @language zh_CN
         */
        public fsMethodList: Array<MethodBase> = new Array<MethodBase>();
        /**
         * @language zh_CN
         */
        public effectMethodList: Array<EffectMethod> = new Array<EffectMethod>();

        //data
        /**
         * @language zh_CN
         */
        public materialSourceData: Float32Array;//12
        /**
         * @language zh_CN
         */
        public directLightData  : Float32Array; 
        /**
         * @language zh_CN
         */
        public sportLightData   : Float32Array;
        /**
         * @language zh_CN
         */
        public pointLightData: Float32Array;

        /**
         * @language zh_CN
         */
        public dispose() {
        }

    }
}