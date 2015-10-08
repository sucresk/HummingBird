module BlackSwan {
    export class ColorPass extends MaterialPassBase {

        private colorMethod: ColorMethod;
        constructor(r: number, g: number, b: number, a: number) {
            super();
            this.colorMethod = new ColorMethod(r,g,b,a);
        }

        /**
         * 初始化 shader 的地方
         **/
        public initShader(context3D: Context3D, geomtry: GeomtryBase, animation: IAnimation) {

            this.vertexShader = new VertexShader();
            this.pixelShader = new PixelShader();

            this.useageData = new MethodUsageData();

            this.useageData.context3D = context3D;
            this.useageData.geomtryBase = geomtry;

            this.addFragmentMethod( this.colorMethod );

            this.vertexShader.setUsage(this.useageData);
            this.pixelShader.setUsage(this.useageData);

            var vs: string = this.vertexShader.getShaderSource();
            var fs: string = this.pixelShader.getShaderSource();

            var vs_shader: Shader = context3D.creatVertexShader(vs);
            var fs_shader: Shader = context3D.creatFragmentShader(fs);

            this.useageData.program3D = context3D.creatProgram(vs_shader, fs_shader);
            this.context3DChange = true;
        }
    }
} 