module BlackSwan {
    export class Egret3D {
        static Direct3D_Opengl_Auto: string = "Direct3D_Opengl_Auto";
        static Direct3D_9_0: string = "Direct3D_9_0";
        static Direct3D_10_0: string = "Direct3D_10_0";
        static Direct3D_11_0: string = "Direct3D_11_0";

        static OpenGLES_2_0: string = "OpenGLES_2_0";
        static OpenGLES_3_0: string = "OpenGLES_3_0";
        static OpenGL: string = "OpenGL";

        static context3D: Context3D;
        static canvas: HTMLCanvasElement ;
        
        static VERTEX_SHADER: number;
        static FRAGMENT_SHADER: number;

        static BLEND: number;
        static FLOAT: number;

        static TRIANGLES: number;
        static POINTS: number;
        static LINES: number;
        
        static CULL_FACE: number; 
        static FRONT: number; 
        static BACK: number; 


        static DEPTH_BUFFER_BIT: number; 
        static ELEMENT_ARRAY_BUFFER: number; 
        static UNSIGNED_SHORT: number; 

        static NEAREST: number; 
        static REPEAT: number; 
        static ONE: number; 
        static ZERO: number; 
        static SRC_ALPHA: number; 
        static ONE_MINUS_SRC_ALPHA: number; 
        static SRC_COLOR: number; 
        static ONE_MINUS_SRC_COLOR: number; 
        
        static ColorFormat_RGB565: number;
        static ColorFormat_RGBA5551: number;
        static ColorFormat_RGBA4444: number;
        static ColorFormat_RGBA8888: number;
        static ColorFormat_DXT1_RGB: number = 0;
        static ColorFormat_DXT1_RGBA: number = 0;
        static ColorFormat_DXT3_RGBA: number = 0;
        static ColorFormat_DXT5_RGBA: number = 0;

        
        static canvasRectangle: Rectangle
        static clientRect: ClientRect;

        /**
        * get GPU Context3D 
        * 获取GPU交换链表程序
        **/
        static requstContext3D(GPU_CONFIG: string, canvasRec: Rectangle , call:Function ) {
            console.log("requst GPU Config", GPU_CONFIG );
            if (!this.context3D || (this.context3D && !this.context3D.isLost)) {
                switch (GPU_CONFIG) {
                    case Egret3D.OpenGLES_2_0:
                        var tapContext3D: WebGLRenderingContext = Egret3D.requstWEBGL(canvasRec)
                        Egret3D.context3D = new Context3DChild_OpenGLES_2_0(tapContext3D);

                        var ext: any = tapContext3D.getExtension('WEBGL_compressed_texture_s3tc');

                        Egret3D.BLEND = tapContext3D.BLEND;

                        Egret3D.TRIANGLES = tapContext3D.TRIANGLES;
                        Egret3D.POINTS = tapContext3D.POINTS;
                        Egret3D.LINES = tapContext3D.LINES;

                        Egret3D.FLOAT = tapContext3D.FLOAT
                        Egret3D.VERTEX_SHADER = tapContext3D.VERTEX_SHADER;
                        Egret3D.FRAGMENT_SHADER = tapContext3D.FRAGMENT_SHADER;
                        Egret3D.canvasRectangle = canvasRec;

                        Egret3D.CULL_FACE = tapContext3D.CULL_FACE;
                        Egret3D.FRONT = tapContext3D.FRONT;
                        Egret3D.BACK = tapContext3D.BACK;

                        Egret3D.DEPTH_BUFFER_BIT = tapContext3D.DEPTH_BUFFER_BIT;
                        Egret3D.ELEMENT_ARRAY_BUFFER = tapContext3D.ELEMENT_ARRAY_BUFFER;
                        Egret3D.UNSIGNED_SHORT = tapContext3D.UNSIGNED_SHORT;

                        Egret3D.NEAREST = tapContext3D.NEAREST;
                        Egret3D.REPEAT = tapContext3D.REPEAT;
                        Egret3D.ONE = tapContext3D.ONE;
                        Egret3D.ZERO = tapContext3D.ZERO;
                        Egret3D.SRC_ALPHA = tapContext3D.SRC_ALPHA;
                        Egret3D.ONE_MINUS_SRC_ALPHA = tapContext3D.ONE_MINUS_SRC_ALPHA;
                        Egret3D.SRC_COLOR = tapContext3D.SRC_COLOR;
                        Egret3D.ONE_MINUS_SRC_COLOR = tapContext3D.ONE_MINUS_SRC_COLOR;;

                        Egret3D.ColorFormat_RGB565 = tapContext3D.RGB565;
                        Egret3D.ColorFormat_RGBA5551 = tapContext3D.RGB5_A1;
                        Egret3D.ColorFormat_RGBA4444 = tapContext3D.RGBA4;
                        Egret3D.ColorFormat_RGBA8888 = tapContext3D.RGBA;

                        if (ext) {
                            Egret3D.ColorFormat_DXT1_RGB = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
                            Egret3D.ColorFormat_DXT1_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                            Egret3D.ColorFormat_DXT3_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                            Egret3D.ColorFormat_DXT5_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                        }

                        ContextSamplerType.TEXTURE_0 = tapContext3D.TEXTURE0;
                        ContextSamplerType.TEXTURE_1 = tapContext3D.TEXTURE1;
                        ContextSamplerType.TEXTURE_2 = tapContext3D.TEXTURE2;
                        ContextSamplerType.TEXTURE_3 = tapContext3D.TEXTURE3;
                        ContextSamplerType.TEXTURE_4 = tapContext3D.TEXTURE4;
                        ContextSamplerType.TEXTURE_5 = tapContext3D.TEXTURE5;
                        ContextSamplerType.TEXTURE_6 = tapContext3D.TEXTURE6;
                        ContextSamplerType.TEXTURE_7 = tapContext3D.TEXTURE7;
                        ContextSamplerType.TEXTURE_8 = tapContext3D.TEXTURE8; 

                        break;
                }
            }

            CheckerboardTexture.texture.upload(Egret3D.context3D);

            console.log("requst GPU Config", Egret3D.context3D);
            ShaderSystemTool.regist(call);
        }

        private static requstWEBGL(viewPort: Rectangle): WebGLRenderingContext {
            Egret3D.canvas = document.createElement("canvas");
            document.body.appendChild(this.canvas);
            Egret3D.canvas.id = "egret3D"; 
            Egret3D.canvas["x"] = viewPort.x;
            Egret3D.canvas["y"] = viewPort.y;
            Egret3D.canvas.width = viewPort.width;
            Egret3D.canvas.height = viewPort.height;
            Egret3D.clientRect = Egret3D.canvas.getBoundingClientRect();

            Egret3D.canvas.oncontextmenu = function () {
                return false;
            };

            var gl = <WebGLRenderingContext>this.canvas.getContext("experimental-webgl");
            if (!gl)
                gl = <WebGLRenderingContext>this.canvas.getContext("webgl");

            console.log("this.context3D ==>", this.context3D);
            if (!gl)
                alert("you drivers not suport webgl");
            return gl;
        }
    }
}