module Egret3D {
    export class MethodUsageData {

        public passNeedReset: boolean = false; 

        public uniform_1ivs: Array<GLSL.Uniform>;
        public uniform_1fvs: Array<GLSL.Uniform>;

        public uniform_2ivs: Array<GLSL.Uniform>;
        public uniform_2fvs: Array<GLSL.Uniform>;

        public uniform_3ivs: Array<GLSL.Uniform>;
        public uniform_3fvs: Array<GLSL.Uniform>;

        public uniform_4ivs: Array<GLSL.Uniform>;
        public uniform_4fvs: Array<GLSL.Uniform>;
        //---------------------------------------------
        //---------------------------------------------
        public attribute_position: GLSL.Attribute;
        public attribute_offset: GLSL.Attribute;
        public attribute_normal: GLSL.Attribute;
        public attribute_tangent: GLSL.Attribute;
        public attribute_color: GLSL.Attribute;
        public attribute_uv0: GLSL.Attribute;
        public attribute_uv1: GLSL.Attribute;
        public attribute_boneIndex: GLSL.Attribute;
        public attribute_boneWeight: GLSL.Attribute;

        //---------------------------------------------
        //---------------[particle]--------------------
        public attribute_rotate: GLSL.Attribute;
        public attribute_acceleRotate: GLSL.Attribute;
        public attribute_scale: GLSL.Attribute;
        public attribute_acceleScale: GLSL.Attribute;
        public attribute_speed: GLSL.Attribute;
        public attribute_acceleSpeed: GLSL.Attribute;
        public attribute_startSpaceLifeTime: GLSL.Attribute;
        //---------------------------------------------
        //---------------------------------------------

        public uniform_time: GLSL.Uniform;
        public uniform_cameraMatrix: GLSL.Uniform;

        public varying_pos: GLSL.Attribute;
        public varying_normal: GLSL.Attribute;
        public varying_tangent: GLSL.Attribute;
        public varying_color: GLSL.Attribute;
        public varying_uv0: GLSL.Attribute;
        public varying_uv1: GLSL.Attribute;
        public varying_eyeNormal: GLSL.Attribute;
        public varying_eyedir: GLSL.Attribute;
        public TBN: GLSL.Attribute;
        
        
        public uniform_ModelMatrix: GLSL.Uniform;
        public uniform_ProjectionMatrix: GLSL.Uniform;
        public uniform_normalMatrix: GLSL.Uniform;
        public uniform_shadowMatrix: GLSL.Uniform;
        public uniform_eyepos: GLSL.Uniform;
        
        public uniform_PoseMatrix: GLSL.Uniform;

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

        public sampler2DList: Array<GLSL.Sampler2D> = new Array<GLSL.Sampler2D>(); 
        public sampler3DList: Array<GLSL.Sampler3D> = new Array<GLSL.Sampler3D>(); 

        public uniform_materialSource: GLSL.Uniform;
        public uniform_LightSource: GLSL.Uniform;
        public uniform_lightModelSource: GLSL.Uniform;

        public uniform_directLightSource:GLSL.Uniform;
        public uniform_sportLightSource: GLSL.Uniform;
        public uniform_pointLightSource:GLSL.Uniform ;
        public uniform_skyLightSource: GLSL.Uniform;

        //----------------------------------------------
        //----------------------------------------------
        public program3D: IProgram3D;
        public vs_shader: Shader;
        public fs_shader: Shader;
        //----------------------------------------------
      
        public vsMethodList: Array<MethodBase> = new Array<MethodBase>() ;
        public fsMethodList: Array<MethodBase> = new Array<MethodBase>();
        public effectMethodList: Array<EffectMethod> = new Array<EffectMethod>();

        //data
        public materialSourceData: Float32Array;//12
        public directLightData  : Float32Array; 
        public sportLightData   : Float32Array;
        public pointLightData: Float32Array;

        public dispose() {
        }

    }
}