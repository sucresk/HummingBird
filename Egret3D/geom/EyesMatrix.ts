module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.EyesMatrix
     * @classdesc
     * 可使用 EyesMatrix 类 对左，右眼睛矩阵的操作
     */
    export class EyesMatrix {
                                               
        /**
        * @language zh_CN
        * 左眼睛矩阵
        */
        public leftEyeMatrix: Matrix4_4;
                                                       
        /**
        * @language zh_CN
        * 右眼睛矩阵
        */
        public rightEyeMatrix: Matrix4_4;

        private eyePosition: Vector3D = new Vector3D();
        private eyeRotation: Vector3D = new Vector3D(0,1,0);

        private eyeLookTarget: Vector3D;
        private eyeSpace: number = 1.0 ;
        private eyeFocalLength: number = 180;

        private leftPos: Vector3D = new Vector3D();
        private rightPos: Vector3D = new Vector3D();
        private targetPos: Vector3D = new Vector3D(0.0, 0.0, this.eyeFocalLength);
        private lookAtPos: Vector3D = new Vector3D();
        private quaternion: Quaternion = new Quaternion();
                                                       
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            this.leftEyeMatrix = new Matrix4_4();
            this.rightEyeMatrix = new Matrix4_4();
        }
                                                               
        /**
        * @language zh_CN
        * 数据更新
        * @param matrix 当前相机矩阵
        */
        public updte(matrix: Matrix4_4) {

           /// this.leftEyeMatrix = matrix;
           /// this.rightEyeMatrix = matrix;

           //////this.leftEyeMatrix.copyFrom(matrix);
           //////this.rightEyeMatrix.copyFrom(matrix);
           /// return;

            this.targetPos.z = this.eyeFocalLength;

            this.eyePosition = matrix.position;
            this.quaternion.fromMatrix(matrix);
            ///this.quaternion.toEulerAngles(this.eyeRotation);
            ///this.eyeRotation.normalize();

            this.leftEyeMatrix.copyRawDataFrom(matrix.rawData);
            this.rightEyeMatrix.copyRawDataFrom(matrix.rawData);
            
            this.leftEyeMatrix.appendTranslation(-this.eyeSpace * 0.5, 0.0, 0.0);
            this.rightEyeMatrix.appendTranslation(this.eyeSpace * 0.5, 0.0, 0.0);
          
           /// this.quaternion.rotatePoint(this.targetPos, this.lookAtPos);
           ///this.leftEyeMatrix.lookAt(this.leftEyeMatrix.position, this.lookAtPos, this.eyeRotation);
           /// this.rightEyeMatrix.lookAt(this.rightEyeMatrix.position, this.lookAtPos, this.eyeRotation);


        }


    }
} 