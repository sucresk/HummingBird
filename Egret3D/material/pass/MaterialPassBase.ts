module BlackSwan {
    export enum PassType { Diffuse , Normal , Position , Depth , Shadow } 
    export class MaterialPassBase {
        
        protected shaderChange: boolean = false;
        protected context3DChange: boolean = false;
        protected materialData: MaterialData;

        protected vertexShader: VertexShader;
        protected pixelShader: PixelShader;

        constructor(data: MaterialData = null) {
            this.materialData = data; 
        }

        public set cullMode(value: number) {
            this.materialData.cullFrontOrBack = value;
        }

        public get cullMode( ): number {
            return this.materialData.cullFrontOrBack ;
        }

        public set twosides(flag: boolean) {
            this.materialData.cullFrontOrBack = -1; 
        }

        public get twosides( ): boolean {
            if (this.materialData.cullFrontOrBack == -1)
                return true
            return false ;
        }

        public set lightGroup(lights: Array<LightBase> ) {
          //  if (this.materialData.lights.length < 8) {
          //      this.materialData.lights = lights;
          //
          //      if (this.materialData.lightData) {
          //          delete this.materialData.lightData;
          //      }
          //
          //      this.materialData.lightData = new Float32Array(lights.length * 24);
          //      for (var i: number = 0; i < this.num_light; i++) {
          //          this.materialData.lightData[i] = 0 ;
          //      }
          //
          //      if (this.num_light != this.materialData.lights.length) {
          //          this.shaderChange = true;
          //      }
          //      this.num_light = this.materialData.lights.length; 
          //  } else {
          //      alert( "请检查，同一个材质有了超过3个灯光，上限为3个"　);
          //  }
        }

        //public addVertexMethod(method: MethodBase) {
        //    this.useageData.vsMethodList.push(method);
        //}

        //public addFragmentMethod( method: MethodBase) {
        //    this.useageData.fsMethodList.push(method);
        //}

        /**
        * 初始化 shader 的地方
        **/
        public initShader(context3D: Context3D, geomtry: GeomtryBase, animation: IAnimation) {

            //this.useageData.context3D = context3D;
            //this.useageData.geomtryBase = geomtry;

            //this.buildShader(context3D);

            //this.context3DChange = true;
        }

        private buildShader(context3D: Context3D) {
            //if (this.shaderChange) {
            //    this.shaderChange = false;

            //    this.vertexShader.setUsage(this.useageData);
            //    this.pixelShader.setUsage(this.useageData);

            //    var vs: string = this.vertexShader.getShaderSource();
            //    var fs: string = this.pixelShader.getShaderSource();

            //    var vs_shader: Shader = context3D.creatVertexShader(vs);
            //    var fs_shader: Shader = context3D.creatFragmentShader(fs);

            //    //this.useageData.program3D = context3D.creatProgram(vs_shader, fs_shader);
            //}
        }
         
        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeomtryBase, animation: IAnimation ) {
            //this.vertexShader.activate(context3D, this.useageData.program3D, modeltransform, camera3D );
            //this.pixelShader.activate(context3D, this.useageData.program3D, modeltransform, camera3D);
        }

        public draw(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeomtryBase, animation: IAnimation ) {

            //if (this.num_light > 0) {
            //    for (var i: number = 0; i < this.num_light;i++ ){
            //        this.useageData.lights[i].updata( i , this.useageData.lightData ); 
            //    }
            //}


            //if (this.context3DChange) {
            //    this.activate(context3D, modeltransform, camera3D);
            //    this.context3DChange = false;
            //}

            ////context3D.setProgram(this.useageData.program3D);
            ////context3D.enableDepthTest(true, 0);
            ////context3D.enbable(Egret3D.BLEND);

            ////this.vertexShader.updata(context3D, this.useageData.program3D, modeltransform, camera3D);
            ////this.pixelShader.updata(context3D, this.useageData.program3D, modeltransform, camera3D);

            //context3D.drawElement(Egret3D.TRIANGLES, this.useageData.geomtryBase.sharedIndexBuffer, 0, this.useageData.geomtryBase.numItems);
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