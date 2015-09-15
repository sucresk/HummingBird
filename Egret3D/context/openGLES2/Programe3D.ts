module BlackSwan.openGLES {
    export class Programe3D implements BlackSwan.Programe3D {

        //public vertextPositionAttrib: number = -1 ;
        //public vertextNormalAttrib: number = -1 ;
        //public vertextColorAttrib: number = -1 ;
        //public vertextUVAttrib: number = -1 ;
        //public vertextUV2Attrib: number = -1 ;
        public pMatrixUniform: number = -1;
        public pVMatrixUniform: number = -1;
        public vertextAttrib: any = {};
        public programe: WebGLProgram;
        constructor( pg3D:WebGLProgram ) {
            this.programe = pg3D; 
        }

       
    }
}