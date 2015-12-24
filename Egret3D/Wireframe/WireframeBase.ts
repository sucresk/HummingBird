module Egret3D {
        
    /**
     * @class Egret3D.WireframeBase
     * @classdesc
     * 线框渲染基类 
     */   
    export class WireframeBase {
        
        protected vertexData: Array<number> = [
            0.5, 0.0, 0.0,
            -0.5, 0.0, 0.0
        ];

        protected vertexCount: number = 2;
        protected vertexLength: number = 3;
        protected vertexBytes: number = 12;

        
        /**
        * @language zh_CN
        * 是否以线渲染
        */
        public isDrawLine: boolean = true;
        
        /**
        * @language zh_CN
        * 是否以点渲染
        */
        public isDrawPoint: boolean = true;
                
        /**
        * @language zh_CN
        * 渲染顶点的大小
        */
        public pointSize: number = 1.0;
                        
        /**
        * @language zh_CN
        * 渲染顶点的颜色
        */
        public pointColor: Vector3D = new Vector3D(1, 1, 1, 1);
                        
        /**
        * @language zh_CN
        * 渲染线的颜色
        */
        public lineColor: Vector3D = new Vector3D(1, 1, 1, 1);

        protected vsShaderSource: string;
        protected fsShaderSource: string;

        protected vertexBuffer3D: VertexBuffer3D;

        protected usage: MethodUsageData;
        protected vsShader: GLSL.ShaderBase
        protected fsShader: GLSL.ShaderBase

        public modleMatrix: Matrix4_4 = new Matrix4_4();

        //protected position: Vector3D = new Vector3D();
        //protected rotation: Vector3D = new Vector3D();
        //protected scale: Vector3D = new Vector3D();

        private uniform_color;
        private uniform_pointSize;
                        
        /**
        * @language zh_CN
        * constructor
        * @param vs vs文件名
        * @param fs fs文件名
        */
        constructor(vs: string = "wireframe_vertex", fs: string = "wireframe_fragment") {
            this.usage = new MethodUsageData();
            this.vsShader = new GLSL.ShaderBase(null, this.usage);
            this.fsShader = new GLSL.ShaderBase(null, this.usage);
            this.setShader(vs, fs);
            //this.modleMatrix.identity();
        }

        /**
        * @language zh_CN
        * 根据geometry创建一个线框
        * @param geometry 模型数据
        */
        public createFromGeometry(geometry: GeometryBase) {

        }
        
        /**
        * @language zh_CN
        * 根据两个顶点创建一条线段
        * @param first 线段的起始点
        * @param second 线段的结束点
        */
        public createFromData(first: Vector3D, second: Vector3D) {

        }
                
        /**
        * @language zh_CN
        * 以下标来设置某个顶点的坐标
        * @param index 顶点下标
        * @param pos 设置顶点的坐标
        */
        public setVertexPos(index: number, pos: Vector3D) {
            var i: number = index * this.vertexLength;
            if (i + 2 >= this.vertexData.length) {
                return;
            }

            this.vertexData[i] = pos.x;
            this.vertexData[i + 1] = pos.y;
            this.vertexData[i + 2] = pos.z;
        }
                                
        /**
        * @language zh_CN
        * 设置渲染用的shader文件名字
        * @param vsName vs文件名
        * @param fsName fs文件名
        */
        public setShader(vsName: string, fsName: string) {
            this.vsShader.addShader(vsName);
            this.fsShader.addShader(fsName);

            this.vsShaderSource = this.vsShader.getShaderSource();
            this.fsShaderSource = this.fsShader.getShaderSource();
        }
                                        
        /**
        * @language zh_CN
        * 渲染
        * @param context3D 设备上下文
        * @param camera 渲染时的相机
        */
        public draw(context3D: Context3D, camera: Camera3D) {

            //if (this.transformChange)
            //    this.notifyUpdate();

            context3D.gl.clear(Egret3DDrive.DEPTH_BUFFER_BIT);

            if (!this.usage.program3D)
                this.rebuild(context3D);

            context3D.enbable(context3D.gl.DEPTH_TEST);
            context3D.setBlendFactors(Egret3DDrive.ONE, Egret3DDrive.ZERO);

            context3D.setProgram(this.usage.program3D);
            context3D.bindVertexBuffer(this.vertexBuffer3D);

            context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_position.uniformIndex, 3, Egret3DDrive.FLOAT, false, this.vertexBytes, 0);

            context3D.uniformMatrix4fv(this.usage.uniform_ModelMatrix.uniformIndex, false, this.modleMatrix.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.uniformIndex, false, camera.viewProjectionMatrix.rawData);
            if (this.isDrawLine) {
                context3D.uniform4fv(this.uniform_color, [this.lineColor.x, this.lineColor.y, this.lineColor.z, this.lineColor.w]);
                context3D.drawArrays(DrawMode.LINES, 0, this.vertexCount);
            }

            if (this.isDrawPoint) {
                context3D.uniform4fv(this.uniform_color, [this.pointColor.x, this.pointColor.y, this.pointColor.z, this.pointColor.w]);
                context3D.uniform1f(this.uniform_pointSize, this.pointSize);
                context3D.drawArrays(DrawMode.POINTS, 0, this.vertexCount);
            }
        }

        private rebuild(context3D: Context3D) {
            var vertexShader: Shader = context3D.creatVertexShader(this.vsShaderSource);
            var fragmentShader: Shader = context3D.creatFragmentShader(this.fsShaderSource);

            this.usage.program3D = context3D.creatProgram(vertexShader, fragmentShader);

            if (this.usage.program3D) {
                context3D.setProgram(this.usage.program3D);
            }

            if (!this.vertexBuffer3D) {
                this.vertexBuffer3D = context3D.creatVertexBuffer(this.vertexData);
            }

            this.usage.attribute_position.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_position");

            this.usage.uniform_ModelMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ModelMatrix");
            this.usage.uniform_ProjectionMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ProjectionMatrix");
            this.uniform_color = context3D.getUniformLocation(this.usage.program3D, "uniform_color");
            this.uniform_pointSize = context3D.getUniformLocation(this.usage.program3D, "uniform_pointSize");
        }
    }
}