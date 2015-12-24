module Egret3D {

     /**
     * @class Egret3D.TerrainMethod
     * @classdesc
     * 地形图方法
     */
    export class TerrainMethod extends MethodBase {

        private uvData: Float32Array = new Float32Array(8);
        private uvIndex: any; 
        /**
         * @language zh_CN
         */
        constructor() {
            super();
            this.fsMethodName = "diffuseMethod_fragment";  
            this.uvData[0] = 1.0;
            this.uvData[1] = 1.0;
            this.uvData[2] = 1.0;
            this.uvData[3] = 1.0;
            this.uvData[4] = 1.0;
            this.uvData[5] = 1.0;
            this.uvData[6] = 1.0;
            this.uvData[7] = 1.0;
        }

        /**
         * @language zh_CN
         * 设置UVTitling
         * @param index 
         * @param x 
         * @param y 
         */
        public setUVTitling(index: number, x: number, y: number) {
            this.uvData[index * 2] = x ;
            this.uvData[index * 2 + 1] = y;
        }

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
            super.activate(context3D, program3D, modeltransform, camera3D, geometry, animation);
            this.usage.uniform_materialSource.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_materialSource.varName);

            this.uvIndex = context3D.getUniformLocation(program3D,"uvs");

            if (this.materialData.directLightList.length > 0) {
                this.usage.uniform_directLightSource.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_directLightSource.varName);
            }
            if (this.materialData.sportLightList.length > 0) {
                this.usage.uniform_sportLightSource.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_sportLightSource.varName);
            }
            if (this.materialData.pointLightList.length > 0) {
                this.usage.uniform_pointLightSource.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_pointLightSource.varName);
            }
        }

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

            if (this.materialData.materialDataNeedChange) {
                this.materialData.materialDataNeedChange = false;
                this.materialData.diffusePassUsageData.materialSourceData[0] = this.materialData.diffuseColor >> 24 & 0xff / 255;
                this.materialData.diffusePassUsageData.materialSourceData[1] = this.materialData.diffuseColor >> 16 & 0xff / 255;
                this.materialData.diffusePassUsageData.materialSourceData[2] = this.materialData.diffuseColor >> 8 & 0xff / 255;

                this.materialData.diffusePassUsageData.materialSourceData[3] = this.materialData.ambientColor >> 24 & 0xff / 255;
                this.materialData.diffusePassUsageData.materialSourceData[4] = this.materialData.ambientColor >> 16 & 0xff / 255;
                this.materialData.diffusePassUsageData.materialSourceData[5] = this.materialData.ambientColor >> 8 & 0xff / 255;

                this.materialData.diffusePassUsageData.materialSourceData[6] = this.materialData.specularColor >> 24 & 0xff / 255;
                this.materialData.diffusePassUsageData.materialSourceData[7] = this.materialData.specularColor >> 16 & 0xff / 255;
                this.materialData.diffusePassUsageData.materialSourceData[8] = this.materialData.specularColor >> 8 & 0xff / 255;

                this.materialData.diffusePassUsageData.materialSourceData[9] = this.materialData.alpha;
                this.materialData.diffusePassUsageData.materialSourceData[10] = this.materialData.cutAlpha;
                this.materialData.diffusePassUsageData.materialSourceData[11] = this.materialData.shininess;
            }

            context3D.gl.uniform1fv(this.usage.uniform_materialSource.uniformIndex, this.materialData.diffusePassUsageData.materialSourceData);
            context3D.gl.uniform1fv(this.uvIndex, this.uvData );

            if (this.materialData.directLightList.length > 0) {
                context3D.gl.uniform1fv(this.usage.uniform_directLightSource.uniformIndex, this.usage.directLightData);
            }
            if (this.materialData.sportLightList.length > 0) {
                context3D.gl.uniform1fv(this.usage.uniform_sportLightSource.uniformIndex, this.usage.sportLightData);
            }
            if (this.materialData.pointLightList.length > 0) {
                context3D.gl.uniform1fv(this.usage.uniform_pointLightSource.uniformIndex, this.usage.pointLightData);
            }
        }

        /**
         * @language zh_CN
         * 销毁
         */
        public dispose() {
        }
    }
} 