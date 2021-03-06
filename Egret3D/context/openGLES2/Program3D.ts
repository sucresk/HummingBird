﻿module Egret3D.openGLES {
    export class Program3D implements Egret3D.IProgram3D {

        public pMatrixUniform: number = -1;
        public mMatrixUniform: number = -1;

        public vertextAttrib: any = {};
        public vertextAttribActive: boolean = false ;
        public program: WebGLProgram;

        constructor( pg3D:WebGLProgram ) {
            this.program = pg3D; 
        }
    }
}