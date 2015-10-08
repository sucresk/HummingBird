module BlackSwan {
    export class StaticVertexMethod extends MethodBase {


        constructor() {
            super();
            this.methodName = "default_vertex";
        }

        /**
        -pos 3 12 0
        -normal 3 12 12
        -tangent 3 12 24
        -color 4 16 36
        -uv0 2  8 52
        -uv1 8 60
        */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            this.usage.geomtryBase.sharedVertexBuffer = context3D.creatVertexBuffer(this.usage.geomtryBase.verticesData);

            this.usage.geomtryBase.numberOfVertices = this.usage.geomtryBase.verticesData.length / GeomtryData.vertexAttLength;
            this.usage.geomtryBase.vertexSizeInBytes = this.usage.geomtryBase.positionSize * Float32Array.BYTES_PER_ELEMENT + //pos 0
            3 * Float32Array.BYTES_PER_ELEMENT + //normal 12
            3 * Float32Array.BYTES_PER_ELEMENT + //tangent 24
            4 * Float32Array.BYTES_PER_ELEMENT + //color 36 
            2 * Float32Array.BYTES_PER_ELEMENT + //uv 52
            2 * Float32Array.BYTES_PER_ELEMENT; //uv2 60


            this.usage.geomtryBase.sharedIndexBuffer = context3D.creatIndexBuffer(this.usage.geomtryBase.indexData);

            context3D.bindVertexBuffer(this.usage.geomtryBase.sharedVertexBuffer);
            this.usage.attribute_position.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_position.name);
            this.usage.attribute_normal.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_normal.name);
            this.usage.attribute_tangent.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_tangent.name);
            this.usage.attribute_color.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_color.name);
            this.usage.attribute_uv0.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_uv0.name);
            this.usage.attribute_uv1.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_uv1.name);
            
            this.usage.uniform_ModelMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniform_ModelMatrix.name);
            this.usage.uniform_ProjectionMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniform_ProjectionMatrix.name);
            this.usage.uniform_normalEyeSpaceMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniform_normalEyeSpaceMatrix.name);
        }


        private normalMatrix: Matrix4_4 = new Matrix4_4();
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            context3D.bindVertexBuffer(this.usage.geomtryBase.sharedVertexBuffer);
            
            context3D.vertexAttribPointer(program3D, this.usage.attribute_position.index, 3, Egret3D.FLOAT, false, this.usage.geomtryBase.vertexSizeInBytes, 0);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_normal.index, 3, Egret3D.FLOAT, false, this.usage.geomtryBase.vertexSizeInBytes, 12);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_tangent.index, 3, Egret3D.FLOAT, false, this.usage.geomtryBase.vertexSizeInBytes, 24);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_color.index, 4, Egret3D.FLOAT, false, this.usage.geomtryBase.vertexSizeInBytes, 36);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_uv0.index, 2, Egret3D.FLOAT, false, this.usage.geomtryBase.vertexSizeInBytes, 52);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_uv1.index, 2, Egret3D.FLOAT, false, this.usage.geomtryBase.vertexSizeInBytes, 60);

            this.normalMatrix.copyFrom(modeltransform);
            this.normalMatrix.invert();
            this.normalMatrix.transpose();

            context3D.uniformMatrix4fv(this.usage.uniform_ModelMatrix.index, false, modeltransform.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.index, false, camera3D.viewProjectionMatrix.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_normalEyeSpaceMatrix.index, false, this.normalMatrix.rawData);
        }
    }
}  

