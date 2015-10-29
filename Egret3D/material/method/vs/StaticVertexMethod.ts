module BlackSwan {
    export class StaticVertexMethod extends MethodBase {

      
        constructor() {
            super();
            this.vsMethodName = "default_vertex";
        }

        /**
        -pos 3 12 0
        -normal 3 12 12
        -tangent 3 12 24
        -color 4 16 36
        -uv0 2  8 52
        -uv1 8 60
        */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeomtryBase  ) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            geometry.sharedVertexBuffer = context3D.creatVertexBuffer(geometry.verticesData);

            geometry.numberOfVertices = geometry.verticesData.length / geometry.vertexAttLength;
            geometry.vertexSizeInBytes = geometry.positionSize * Float32Array.BYTES_PER_ELEMENT + //pos 0
            3 * Float32Array.BYTES_PER_ELEMENT + //normal 12
            3 * Float32Array.BYTES_PER_ELEMENT + //tangent 24
            4 * Float32Array.BYTES_PER_ELEMENT + //color 36 
            2 * Float32Array.BYTES_PER_ELEMENT + //uv 52
            2 * Float32Array.BYTES_PER_ELEMENT; //uv2 60


            geometry.sharedIndexBuffer = context3D.creatIndexBuffer(geometry.indexData);

            context3D.bindVertexBuffer(geometry.sharedVertexBuffer);
            this.usage.attribute_position.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_position.name);
            this.usage.attribute_normal.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_normal.name);
            this.usage.attribute_tangent.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_tangent.name);
            this.usage.attribute_color.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_color.name);
            this.usage.attribute_uv0.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_uv0.name);
            this.usage.attribute_uv1.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_uv1.name);
            
            this.usage.uniform_ModelMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniform_ModelMatrix.name);
            this.usage.uniform_ProjectionMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniform_ProjectionMatrix.name);
            this.usage.uniform_normalMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniform_normalMatrix.name);
            this.usage.uniform_eyepos.index = context3D.getUniformLocation(program3D, this.usage.uniform_eyepos.name);

            if (this.acceptShadow)
                this.usage.uniform_shadowMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniform_shadowMatrix.name);
            
        }


        private normalMatrix: Matrix4_4 = new Matrix4_4();
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeomtryBase ) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            context3D.bindVertexBuffer(geometry.sharedVertexBuffer);
            
            context3D.vertexAttribPointer(program3D, this.usage.attribute_position.index, 3, Egret3D.FLOAT, false, geometry.vertexSizeInBytes, 0);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_normal.index, 3, Egret3D.FLOAT, false, geometry.vertexSizeInBytes, 12);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_tangent.index, 3, Egret3D.FLOAT, false, geometry.vertexSizeInBytes, 24);
            //context3D.vertexAttribPointer(program3D, this.usage.attribute_color.index, 4, Egret3D.FLOAT, false, this.materialData.geomtryBase.vertexSizeInBytes, 36);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_uv0.index, 2, Egret3D.FLOAT, false, geometry.vertexSizeInBytes, 52);
            //context3D.vertexAttribPointer(program3D, this.usage.attribute_uv1.index, 2, Egret3D.FLOAT, false, this.materialData.geomtryBase.vertexSizeInBytes, 60);

            this.normalMatrix.copyFrom(modeltransform);
            this.normalMatrix.invert();
            this.normalMatrix.transpose();
            this.normalMatrix.appendScale(1,1,1);

            context3D.uniformMatrix4fv(this.usage.uniform_ModelMatrix.index, false, modeltransform.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.index, false, camera3D.viewProjectionMatrix.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_normalMatrix.index, false, this.normalMatrix.rawData);
            context3D.uniform3f(this.usage.uniform_eyepos.index, camera3D.x, camera3D.y, camera3D.z );

            if (this.acceptShadow)
                context3D.uniformMatrix4fv(this.usage.uniform_shadowMatrix.index, false, RttManager.getInstance().shadowMapRender.camera3D.viewProjectionMatrix.rawData);
        }
    }
}  

