module BlackSwan {
    export interface IProgram3D {
        program: any;
        //vertextPositionAttrib: number;
        //vertextNormalAttrib: number;
        //vertextColorAttrib: number;
        //vertextUVAttrib: number;
        //vertextUV2Attrib: number;  
        vertextAttrib: any;

        pMatrixUniform: any;
        mMatrixUniform: any;
    }
}