module BlackSwan {
    export class StaticVertexMethod extends MethodBase {

   

        protected initShaderSource() {
            //--var---------------------------------------------------------------------------
            //---------------------------------------------------------------------------------
            this.usage.attribute_pos = this.shader.varAttribute(GLSL.VarConstName.attribute_position, GLSL.AttributeType.vec3);
            this.usage.attribute_normal = this.shader.varAttribute(GLSL.VarConstName.attribute_normal, GLSL.AttributeType.vec3);
            this.usage.attribute_uv0 = this.shader.varAttribute(GLSL.VarConstName.attribute_uv0, GLSL.AttributeType.vec2);

            this.usage.varying_pos = this.shader.varVarying(GLSL.VarConstName.varying_pos, GLSL.VaryingType.vec3);
            this.usage.varying_normal = this.shader.varVarying(GLSL.VarConstName.varying_normal, GLSL.VaryingType.vec3);
            this.usage.varying_uv0 = this.shader.varVarying(GLSL.VarConstName.varying_uv0, GLSL.VaryingType.vec2);

            this.usage.uniformModelMatrix = this.shader.varUnifrom(GLSL.VarConstName.uniform_modelMatrix, GLSL.UniformType.mat4);
            this.usage.uniformProjectionMatrix = this.shader.varUnifrom(GLSL.VarConstName.uniform_projectionMatrix, GLSL.UniformType.mat4);

            var temp: GLSL.TmpVar = this.shader.varTemp("temp", GLSL.AttributeType.vec4);
            //---------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------

            this.shader.mainFun();

            this.shader.mul(temp.use(), this.usage.uniformModelMatrix.use(), "vec4(" + this.usage.attribute_pos.use() + ",1.0 )");
            this.shader.mov(this.usage.varying_pos.use("xyz"), temp.use("xyz"));

            this.shader.mul(temp.use(), this.usage.uniformProjectionMatrix.use(), temp.use());

            this.shader.mov(this.usage.varying_normal.use(), this.usage.attribute_normal.use());
            this.shader.mov(this.usage.varying_uv0.use(), this.usage.attribute_uv0.use());

            this.shader.outPos(temp.use());
            this.shader.mainFunEnd();
        }

        protected initConstData() {
        }

        /**
        -pos 3 12 0
        -normal 3 12 12
        -tangent 3 12 24
        -color 4 16 36
        -uv0 2  8 52
        -uv1 8 60
        */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            this.geomtry.sharedVertexBuffer = context3D.creatVertexBuffer(this.geomtry.verticesData);

            this.geomtry.numberOfVertices = this.geomtry.verticesData.length / GeomtryData.vertexAttLength;
            this.geomtry.vertexSizeInBytes = this.geomtry.positionSize * Float32Array.BYTES_PER_ELEMENT + //pos
            3 * Float32Array.BYTES_PER_ELEMENT + //normal
            3 * Float32Array.BYTES_PER_ELEMENT + //tangent
            4 * Float32Array.BYTES_PER_ELEMENT + //color
            2 * Float32Array.BYTES_PER_ELEMENT + //uv
            2 * Float32Array.BYTES_PER_ELEMENT; //uv2

            this.geomtry.sharedIndexBuffer = context3D.creatIndexBuffer(this.geomtry.indexData);

            context3D.bindVertexBuffer(this.geomtry.sharedVertexBuffer);
            this.usage.attribute_pos.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_pos.name);
            this.usage.attribute_normal.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_normal.name);
            this.usage.attribute_uv0.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_uv0.name);
            
            this.usage.uniformModelMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniformModelMatrix.name);
            this.usage.uniformProjectionMatrix.index = context3D.getUniformLocation(program3D, this.usage.uniformProjectionMatrix.name);
        }

        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            context3D.bindVertexBuffer(this.geomtry.sharedVertexBuffer);
            
            context3D.vertexAttribPointer(program3D, this.usage.attribute_pos.index, 3, Egret3D.FLOAT, false, this.geomtry.vertexSizeInBytes, 0);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_normal.index, 3, Egret3D.FLOAT, false, this.geomtry.vertexSizeInBytes, 12);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_uv0.index, 2, Egret3D.FLOAT, false, this.geomtry.vertexSizeInBytes, 52);

            context3D.uniformMatrix4fv(this.usage.uniformModelMatrix.index, false, modeltransform.rawData);
            context3D.uniformMatrix4fv(this.usage.uniformProjectionMatrix.index, false, camera3D.viewProjection.rawData);
        }
    }
}  