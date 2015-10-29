module Egret3D {
    export interface IProgram3D {
        program: any;
        ///vertextPositionAttrib: number;
        ///vertextNormalAttrib: number;
        ///vertextColorAttrib: number;
        ///vertextUVAttrib: number;
        ///vertextUV2Attrib: number;  
        vertextAttrib: any;
        vertextAttribActive: boolean;
        pMatrixUniform: any;
        mMatrixUniform: any;
    }
}