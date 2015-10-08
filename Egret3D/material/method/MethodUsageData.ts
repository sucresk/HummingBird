module BlackSwan {
    export class MethodUsageData {
        public textures2Ds: Array<GLSL.Sampler2D> = new Array<GLSL.Sampler2D>(0);

        //public attributes: Array<GLSL.Attribute>    ;
        //public varings: Array<GLSL.Varying>         ;

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
        public attribute_normal: GLSL.Attribute;
        public attribute_tangent: GLSL.Attribute;
        public attribute_color: GLSL.Attribute;
        public attribute_uv0: GLSL.Attribute;
        public attribute_uv1: GLSL.Attribute;

        public varying_pos: GLSL.Attribute;
        public varying_normal: GLSL.Attribute;
        public varying_tangent: GLSL.Attribute;
        public varying_color: GLSL.Attribute;
        public varying_uv0: GLSL.Attribute;
        public varying_uv1: GLSL.Attribute;
        public varying_eyeNormal: GLSL.Attribute;

        public uniform_ModelMatrix: GLSL.Uniform;
        public uniform_ProjectionMatrix: GLSL.Uniform;
        public uniform_EyeMatrix: GLSL.Uniform;
        public uniform_normalEyeSpaceMatrix: GLSL.Uniform;
         

        public texture2D_0: GLSL.Sampler2D;
        public texture2D_1: GLSL.Sampler2D;
        public texture2D_2: GLSL.Sampler2D;
        public texture2D_3: GLSL.Sampler2D;
        public texture2D_4: GLSL.Sampler2D;
        public texture2D_5: GLSL.Sampler2D;
        public texture2D_6: GLSL.Sampler2D;
        public texture2D_7: GLSL.Sampler2D;

        public uniform_materialSource: GLSL.Uniform;
        public uniform_LightSource: GLSL.Uniform;
        public uniform_lightModelSource: GLSL.Uniform;

        public uniform_pointLightSource:GLSL.Uniform ;
        public uniform_directLightSource:GLSL.Uniform;
        public uniform_skyLightSource: GLSL.Uniform;


        //----------------------------------------------
        //----------------------------------------------
        //----------------------------------------------
        public program3D: IProgram3D;
        public context3D: Context3D;
        public vs_shader: Shader;
        public fs_shader: Shader;

        public lights: Array<LightBase> = new Array<LightBase>();
        public shadowMaper: any;

        public geomtryBase: GeomtryBase;
        public animation: IAnimation;

        public vsMethodList: Array<MethodBase> = new Array<MethodBase>() ;
        public fsMethodList: Array<MethodBase> = new Array<MethodBase>();

        public lightData: Float32Array = new Float32Array(0) ; 
    }
}