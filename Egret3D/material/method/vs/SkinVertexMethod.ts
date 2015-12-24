module Egret3D {

     /**
     * @class Egret3D.SkinVertexMethod
     * @classdesc
     * 蒙皮顶点方法
     */
    export class SkinVertexMethod extends MethodBase {

        /**
         * @language zh_CN
         */
        constructor() {
            super();
            this.vsMethodName = "skeleton_vertex";
        }

        /**
        -pos 3 12 0
        -normal 3 12 12
        -tangent 3 12 24
        -color 4 16 36
        -uv0 2  8 52
        -uv1 8 60
        -boneIndex  4 16 68
        -boneWeight 4 16 84
        */

        /**
         * @language zh_CN
         * 激活
         * @param context3D 
         * @param program3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            geometry.sharedVertexBuffer = context3D.creatVertexBuffer(geometry.verticesData);
            geometry.numberOfVertices = geometry.verticesData.length / geometry.vertexAttLength;
            geometry.vertexSizeInBytes = geometry.positionSize * Float32Array.BYTES_PER_ELEMENT + //pos 0
            3 * Float32Array.BYTES_PER_ELEMENT + //normal 12
            3 * Float32Array.BYTES_PER_ELEMENT + //tangent 24
            4 * Float32Array.BYTES_PER_ELEMENT + //color 36 
            2 * Float32Array.BYTES_PER_ELEMENT + //uv 52
            2 * Float32Array.BYTES_PER_ELEMENT + //uv2 60
            4 * Float32Array.BYTES_PER_ELEMENT + //boneIndex 68
            4 * Float32Array.BYTES_PER_ELEMENT; //boneWeight 84


            geometry.sharedIndexBuffer = context3D.creatIndexBuffer(geometry.indexData);

            context3D.bindVertexBuffer(geometry.sharedVertexBuffer);
            this.usage.attribute_position.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_position.varName);
            this.usage.attribute_normal.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_normal.varName);
            this.usage.attribute_tangent.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_tangent.varName);
            this.usage.attribute_color.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_color.varName);
            this.usage.attribute_uv0.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_uv0.varName);
            this.usage.attribute_uv1.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_uv1.varName);
            this.usage.attribute_boneIndex.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_boneIndex.varName);
            this.usage.attribute_boneWeight.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_boneWeight.varName);

            this.usage.uniform_ModelMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_ModelMatrix.varName);
            this.usage.uniform_ProjectionMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_ProjectionMatrix.varName);
            this.usage.uniform_normalMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_normalMatrix.varName);
            this.usage.uniform_eyepos.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_eyepos.varName);

            this.usage.uniform_PoseMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_PoseMatrix.varName);
        }

        private normalMatrix: Matrix4_4 = new Matrix4_4();
        /**
         * @language zh_CN
         * 更新
         * @param context3D 
         * @param program3D 
         * @param modeltransform 
         * @param camera3D 
         * @param geometry 
         * @param animation 
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            context3D.bindVertexBuffer(geometry.sharedVertexBuffer);

            //if (!program3D.vertextAttribActive){
            //  context3D.vertexAttribPointer(program3D, this.usage.attribute_position.index, 3, Egret3D.FLOAT, false, this.materialData.geomtryBase.vertexSizeInBytes, 0);
            //  context3D.vertexAttribPointer(program3D, this.usage.attribute_normal.index, 3, Egret3D.FLOAT, false, this.materialData.geomtryBase.vertexSizeInBytes, 12);
            //  context3D.vertexAttribPointer(program3D, this.usage.attribute_tangent.index, 3, Egret3D.FLOAT, false, this.materialData.geomtryBase.vertexSizeInBytes, 24);
            //  context3D.vertexAttribPointer(program3D, this.usage.attribute_uv0.index, 2, Egret3D.FLOAT, false, this.materialData.geomtryBase.vertexSizeInBytes, 52);
            //  context3D.vertexAttribPointer(program3D, this.usage.attribute_boneIndex.index, 4, Egret3D.FLOAT, false, this.materialData.geomtryBase.vertexSizeInBytes, 68);
            //  context3D.vertexAttribPointer(program3D, this.usage.attribute_boneWeight.index, 4, Egret3D.FLOAT, false, this.materialData.geomtryBase.vertexSizeInBytes, 84);
            // }

            context3D.gl.vertexAttribPointer(this.usage.attribute_position.uniformIndex, 3, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 0);
            context3D.gl.enableVertexAttribArray(this.usage.attribute_position.uniformIndex);
            context3D.gl.vertexAttribPointer(this.usage.attribute_normal.uniformIndex, 3, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 12);
            context3D.gl.enableVertexAttribArray(this.usage.attribute_normal.uniformIndex);
            context3D.gl.vertexAttribPointer(this.usage.attribute_tangent.uniformIndex, 3, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 24);
            context3D.gl.enableVertexAttribArray(this.usage.attribute_tangent.uniformIndex);
            context3D.gl.vertexAttribPointer(this.usage.attribute_uv0.uniformIndex, 2, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 52);
            context3D.gl.enableVertexAttribArray(this.usage.attribute_uv0.uniformIndex);
            context3D.gl.vertexAttribPointer(this.usage.attribute_boneIndex.uniformIndex, 4, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 68);
            context3D.gl.enableVertexAttribArray(this.usage.attribute_boneIndex.uniformIndex);
            context3D.gl.vertexAttribPointer(this.usage.attribute_boneWeight.uniformIndex, 4, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 84);
            context3D.gl.enableVertexAttribArray(this.usage.attribute_boneWeight.uniformIndex);





            this.normalMatrix.copyFrom(modeltransform);
            this.normalMatrix.invert();
            this.normalMatrix.transpose();

            context3D.uniformMatrix4fv(this.usage.uniform_ModelMatrix.uniformIndex, false, modeltransform.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.uniformIndex, false, camera3D.viewProjectionMatrix.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_normalMatrix.uniformIndex, false, this.normalMatrix.rawData);
            context3D.uniform3f(this.usage.uniform_eyepos.uniformIndex, camera3D.x, camera3D.y, camera3D.z);

            context3D.uniform4fv(this.usage.uniform_PoseMatrix.uniformIndex, (<SkeletonAnimation>animation).currentSkeletonMatrixData);
        }
    }
}  

