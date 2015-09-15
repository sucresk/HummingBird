module BlackSwan {
    export class MaterialPassBase {

        protected useageData: MethodUsageData;
        protected program3D: IProgram3D;
        protected context3D: Context3D;
        protected vs_shader: Shader;
        protected fs_shader: Shader;

        protected geomtryBase: GeomtryBase;
        protected animation: IAnimation;


        protected mainVsMethod: StaticVertexMethod;
        protected mainFsMethod: DiffuseMethod;

        protected otherVsMethods: Array<MethodBase> = new Array<MethodBase>(0);
        protected otherFsMethods: Array<MethodBase> = new Array<MethodBase>(0);

        private count: number = 0;
        private context3DChange: boolean = false;
        constructor() {
            //this.mainVsMethod = new StaticVertexMethod();
            //this.mainFsMethod = new DiffuseMethod();
        }

        public addVertexMethod(index: number, method: MethodBase) {
            this.otherVsMethods[index] = method;
        }

        public addMaterialMethod(index: number, method: MethodBase) {
            this.otherFsMethods[index] = method;
        }

        public initShader(context3D: Context3D, geomtry: GeomtryBase, animation: IAnimation) {

            this.context3D = context3D;
            this.useageData = new MethodUsageData();

            this.geomtryBase = geomtry;
            //this.mainVsMethod += otherVsMethods;
            //this.mainFsMethod += otherFsMethods;

            this.mainVsMethod.setData(this.useageData, this.geomtryBase, this.animation);
            this.mainFsMethod.setData(this.useageData, this.geomtryBase, this.animation);

            var vs: string = this.mainVsMethod.getShaderSource();
            var fs: string = this.mainFsMethod.getShaderSource();
          
            this.vs_shader = this.context3D.creatVertexShader(vs);
            this.fs_shader = this.context3D.creatFragmentShader(fs);

            this.program3D = this.context3D.creatProgram(this.vs_shader, this.fs_shader);
            this.context3DChange = true;
        }

        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {

            this.mainVsMethod.activate(context3D, this.program3D, modeltransform, camera3D);
            this.mainFsMethod.activate(context3D, this.program3D, modeltransform, camera3D);

            this.count = 0;
            while (this.count < this.otherVsMethods.length) {
                this.otherVsMethods[this.count++].activate(context3D, this.program3D, modeltransform, camera3D);
            }

            this.count = 0;
            while (this.count < this.otherFsMethods.length) {
                this.otherFsMethods[this.count++].activate(context3D, this.program3D, modeltransform, camera3D);
            }
        }

        public updata(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D) {

            if (this.context3DChange) {
                this.activate(context3D, modeltransform, camera3D);
                this.context3DChange = false;
            }

            this.context3D.setProgram(this.program3D);
            this.context3D.enableDepthTest(true, 0);
            this.context3D.enbable(Egret3D.BLEND);

            this.mainVsMethod.updata(context3D, this.program3D, modeltransform, camera3D);
            this.mainFsMethod.updata(context3D, this.program3D, modeltransform, camera3D);

            this.context3D.drawElement(Egret3D.TRIANGLES,this.geomtryBase.sharedIndexBuffer,0,this.geomtryBase.numItems);
            return;
            //active geomtry
            //active material
            //this.count = 0;
            //while (this.count < this.otherVsMethods.length) {
            //    this.otherVsMethods[this.count++].updata(context3D, this.program3D, modeltransform, camera3D);
            //}

            //this.count = 0;
            //while (this.count < this.otherFsMethods.length) {
            //    this.otherFsMethods[this.count++].updata(context3D, this.program3D, modeltransform, camera3D);
            //}

            //if (this.useageData.uniformEyeMatrix)
            //    this.context3D.uniform4fv(this.useageData.uniformEyeMatrix.index, this.useageData.uniformEyeMatrix);

            //this.context3D.uniform4fv(this.useageData.uniformProjectionMatrix.index, this.useageData.uniformProjectionMatrix);
            //this.context3D.uniform4fv(this.useageData.uniformModelMatrix.index, this.useageData.uniformModelMatrix);

            //this.count = 0;
            //while (this.count < this.useageData.textures2Ds.length) {
            //    this.context3D.setTextureAt(this.useageData.textures2Ds[this.count].index, this.useageData.textures2Ds[this.count].data);
            //}

            //this.count = 0;
            //while (this.count < this.useageData.uniform_1fvs.length) {
            //    this.context3D.uniform1fv(this.useageData.uniform_1fvs[this.count++].index, this.useageData.uniform_1fvs[this.count].data);
            //}

            //this.count = 0;
            //while (this.count < this.useageData.uniform_1ivs.length) {
            //    this.context3D.uniform1fv(this.useageData.uniform_1ivs[this.count++].index, this.useageData.uniform_1ivs[this.count].data);
            //}

            //this.count = 0;
            //while (this.count < this.useageData.uniform_2fvs.length) {
            //    this.context3D.uniform1fv(this.useageData.uniform_2fvs[this.count++].index, this.useageData.uniform_2fvs[this.count].data);
            //}

            //this.count = 0;
            //while (this.count < this.useageData.uniform_2ivs.length) {
            //    this.context3D.uniform1fv(this.useageData.uniform_2ivs[this.count++].index, this.useageData.uniform_2ivs[this.count].data);
            //}

            //this.count = 0;
            //while (this.count < this.useageData.uniform_3fvs.length) {
            //    this.context3D.uniform1fv(this.useageData.uniform_3fvs[this.count++].index, this.useageData.uniform_3fvs[this.count].data);
            //}

            //this.count = 0;
            //while (this.count < this.useageData.uniform_3ivs.length) {
            //    this.context3D.uniform1fv(this.useageData.uniform_3ivs[this.count++].index, this.useageData.uniform_3ivs[this.count].data);
            //}

            //this.count = 0;
            //while (this.count < this.useageData.uniform_4fvs.length) {
            //    this.context3D.uniform1fv(this.useageData.uniform_4fvs[this.count++].index, this.useageData.uniform_4fvs[this.count].data);
            //}

            //this.count = 0;
            //while (this.count < this.useageData.uniform_4ivs.length) {
            //    this.context3D.uniform1fv(this.useageData.uniform_4ivs[this.count++].index, this.useageData.uniform_4ivs[this.count].data);
            //}
        }

        public unActive(context3D: Context3D, camera3D: Camera3D) {

        }

    }
} 











//  private loadShaderByUrl(vs: string, fs:string) {
//    var vs_xhrObj: XMLHttpRequest = new XMLHttpRequest();
//    vs_xhrObj.onreadystatechange = function () {
//        if (vs_xhrObj.readyState == 4) {
//            var scriptElem = document.createElement("script");
//            document.getElementsByTagName("head")[0].appendChild(scriptElem);
//            scriptElem.text = vs_xhrObj.responseText;
//            this.actionScript(scriptElem.text);
//        }
//    };
//    vs_xhrObj.open("GET", vs, true);
//    vs_xhrObj.send("");

//    var fs_xhrObj: XMLHttpRequest = new XMLHttpRequest();
//    fs_xhrObj.onreadystatechange = function () {
//        if (fs_xhrObj.readyState == 4) {
//            var scriptElem = document.createElement("script");
//            document.getElementsByTagName("head")[0].appendChild(scriptElem);
//            scriptElem.text = fs_xhrObj.responseText;
//            this.actionScript(scriptElem.text);
//        }
//    };
//    fs_xhrObj.open("GET", fs, true);
//    fs_xhrObj.send("");
//}

//        private actionVSShader(scriptScr:string) {
//    this.vs_shader = this.context3D.creatVertexShader(scriptScr);
//}

//        private actionFSShader(scriptScr: string) {
//    this.fs_shader = this.context3D.creatFragmentShader(scriptScr);
//}