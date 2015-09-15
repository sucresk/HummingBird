module BlackSwan {
    export class MethodUsageData {
        public textures2Ds: Array<GLSL.Sampler2D> = new Array<GLSL.Sampler2D>(0);

        //public attributes: Array<GLSL.Attribute>    ;
        //public varings: Array<GLSL.Varying>         ;

        public uniform_1ivs: Array<GLSL.Unifrom>;
        public uniform_1fvs: Array<GLSL.Unifrom>;

        public uniform_2ivs: Array<GLSL.Unifrom>;
        public uniform_2fvs: Array<GLSL.Unifrom>;

        public uniform_3ivs: Array<GLSL.Unifrom>;
        public uniform_3fvs: Array<GLSL.Unifrom>;

        public uniform_4ivs: Array<GLSL.Unifrom>;
        public uniform_4fvs: Array<GLSL.Unifrom>;
        //---------------------------------------------
        //---------------------------------------------
        public attribute_pos: GLSL.Attribute;
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

        public uniformModelMatrix: GLSL.Unifrom;
        public uniformProjectionMatrix: GLSL.Unifrom;
        public uniformEyeMatrix: GLSL.Unifrom;

        public texture2D_0: GLSL.Sampler2D;
        public texture2D_1: GLSL.Sampler2D;
        public texture2D_2: GLSL.Sampler2D;
        public texture2D_3: GLSL.Sampler2D;
        public texture2D_4: GLSL.Sampler2D;
        public texture2D_5: GLSL.Sampler2D;
        public texture2D_6: GLSL.Sampler2D;
        public texture2D_7: GLSL.Sampler2D;
    }
}