module Egret3D {
    export class MaterialPassBase {
        
        protected shaderChange: boolean = false;
        protected context3DChange: boolean = false;

        protected materialData: MaterialData;

        protected vertexShader: VertexShader;
        protected pixelShader: PixelShader;

        protected methodList: Array<MethodBase>;
        protected effectMethodList: Array<EffectMethod>;

        public diffuseMethod: MethodBase;

        protected animation: IAnimation;
        constructor(data: MaterialData = null) {
            this.materialData = data; 
        }

        public addMethod(method: MethodBase) {
            this.methodList = this.methodList || new Array<MethodBase>();
            this.methodList.push(method);
            this.shaderChange = true;
        }

        public removeMethod(method: MethodBase) {
            var index: number = this.methodList.indexOf(method);
            this.methodList.splice(index, 1);
            method.dispose();
        }

        public addEffectMethod(method: EffectMethod) {
            this.effectMethodList = this.effectMethodList || new Array<EffectMethod>();
            this.effectMethodList.push(method);
            this.shaderChange = true;
        }

        public removeEffectMethod(method: EffectMethod) {
            var index: number = this.effectMethodList.indexOf(method);
            this.effectMethodList.splice(index, 1);
            method.dispose();
        }

        public set cullMode(value: number) {
            this.materialData.cullFrontOrBack = value;
        }

        public get cullMode( ): number {
            return this.materialData.cullFrontOrBack ;
        }

        public set bothSides(flag: boolean) {
            this.materialData.cullFrontOrBack = -1; 
        }

        public get bothSides( ): boolean {
            if (this.materialData.cullFrontOrBack == -1)
                return true
            return false ;
        }

        public set lightGroup(lights: Array<LightBase> ) {
      
        }

        /**
        * 初始化 shader 的地方
        **/
        public initShader(context3D: Context3D, geomtry: GeometryBase, animation: IAnimation) {
            this.animation = animation; 
        }

        protected resetTexture() {

        }

        private buildShader(context3D: Context3D) {
          
        }
         
        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation ) {
        }

        public draw(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            var i: number = 0;
           
            if (this.materialData.depthTest) {
                context3D.gl.enable(context3D.gl.DEPTH_TEST);
                context3D.gl.depthFunc(context3D.gl.LEQUAL);
            }
            else {
                context3D.gl.disable(context3D.gl.DEPTH_TEST);
                context3D.gl.depthFunc(context3D.gl.LEQUAL);
            }
            //context3D.gl.enable(context3D.gl.POLYGON_OFFSET_FILL);
            //context3D.gl.polygonOffset(1.0,1.0);

            context3D.gl.cullFace(this.materialData.cullFrontOrBack);
            context3D.setBlendFactors(this.materialData.blend_src, this.materialData.blend_dest);

            if (this.materialData.alphaBlending)
                context3D.gl.depthMask(false);
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