﻿module Egret3D {
    export class VertexShader extends GLSL.ShaderBase {

        constructor( materialData: MaterialData, usage: MethodUsageData) {
            super(materialData, usage );
   
        }

        public setVertexShader(geometry: GeometryBase) {
            var baseMethod: MethodBase;
           
            //根据 geomtry 类型 确定用什么 基本的 顶点着色器
            //拿到 顶点method list
            switch (geometry.geomtryType) {
                case GeometryType.Static:
                    baseMethod = new StaticVertexMethod();
                    this.useage.vsMethodList.push(baseMethod);
                    this.addShader(baseMethod.vertexMethodName);
                    break;
                case GeometryType.Skin:
                    baseMethod = new SkinVertexMethod();
                    this.useage.vsMethodList.push(baseMethod);
                    this.addShader(baseMethod.vertexMethodName);
                    baseMethod.acceptShadow = this.materialData.acceptShadow;
                    break;
                case GeometryType.Particle:
                    baseMethod = new ParticleVertexMethod();
                    this.useage.vsMethodList.push(baseMethod);
                    this.addShader(baseMethod.vertexMethodName);
                    this.addEnd("particle_vertexEnd");
                    break;
                default: break;
            }

            baseMethod.acceptShadow = this.materialData.acceptShadow;
            if (this.materialData.acceptShadow) {
                this.addShader("Shadow_vertex_static");
            }
        }

        public getShaderSource(): string {
            var shaderSource: string = super.getShaderSource();
            var index: number = shaderSource.lastIndexOf("}");
            var endS: string = shaderSource.substr(index, shaderSource.length - index);
         

            shaderSource = shaderSource.substr(0, index);
            shaderSource += "   gl_Position = temp_p; \r\n";
            shaderSource += endS;
            return shaderSource;
        }

        public build( ) {
                     for (this.index = 0; this.index < this.useage.vsMethodList.length; this.index++){
                this.useage.vsMethodList[this.index].setMaterialData(this.materialData, this.useage);
            }
        }

        public addMethod(method: MethodBase) {
            this.stateChange = true;
            this.useage.vsMethodList.push(method);
        }

    }


} 