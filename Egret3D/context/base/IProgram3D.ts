module Egret3D {
    export interface IProgram3D {
        
        /**
        * @readOnly
        */
        program: any;
        
        /**
        * @readOnly
        */
        vertextAttrib: any;
        
        /**
        * @readOnly
        */
        vertextAttribActive: boolean;
        
        /**
        * @readOnly
        */
        pMatrixUniform: any;
        
        /**
        * @readOnly
        */
        mMatrixUniform: any;
    }
}