module BlackSwan {
    export class Egret3D {
        static Direct3D_Opengl_Auto: string = "Direct3D_Opengl_Auto";
        static Direct3D_9_0: string = "Direct3D_9_0";
        static Direct3D_10_0: string = "Direct3D_10_0";
        static Direct3D_11_0: string = "Direct3D_11_0";

        static OpenGLES_2_0: string = "OpenGLES_2_0";
        static OpenGLES_3_0: string = "OpenGLES_3_0";
        static OpenGL: string = "OpenGL";

        static context3D: Context3D ;

        static VERTEX_SHADER: number;
        static FRAGMENT_SHADER: number;

        static BLEND: number;
        static FLOAT: number;

        static TRIANGLES: number;
        static POINTS: number;
        static LINES: number;
        

        static canvasRectangle: Rectangle
        static clientRect: ClientRect;

        static mouseX: number;
        static mouseY: number;
        /**
        * get GPU Context3D 
        * 获取GPU交换链表程序
        **/
        static requstContext3D(GPU_CONFIG: string, canvasRec: Rectangle) {
            console.log("requst GPU Config", GPU_CONFIG );
            if (!this.context3D || (this.context3D && !this.context3D.isLost)) {
                switch (GPU_CONFIG) {
                    case Egret3D.OpenGLES_2_0:
                        var tapContext3D: WebGLRenderingContext = Egret3D.requstWEBGL(canvasRec)
                        Egret3D.context3D = new Context3DChild_OpenGLES_2_0(tapContext3D);

                     

                        Egret3D.BLEND = tapContext3D.BLEND;

                        Egret3D.TRIANGLES = tapContext3D.TRIANGLES;
                        Egret3D.POINTS = tapContext3D.POINTS;
                        Egret3D.LINES = tapContext3D.LINES;

                        Egret3D.FLOAT = tapContext3D.FLOAT
                        Egret3D.VERTEX_SHADER = tapContext3D.VERTEX_SHADER;
                        Egret3D.FRAGMENT_SHADER = tapContext3D.FRAGMENT_SHADER;

                        Egret3D.canvasRectangle = canvasRec;
                        break;
                }
            }
            console.log("requst GPU Config", Egret3D.context3D );
        }

        private static requstWEBGL(viewPort: Rectangle): WebGLRenderingContext {
            var gl: WebGLRenderingContext;
            var canvas: HTMLCanvasElement = document.createElement('canvas');
            canvas.setAttribute("id", "blackswan3D");
            canvas.setAttribute("x", viewPort.x.toString() );
            canvas.setAttribute("y", viewPort.y.toString() );
            canvas.setAttribute("width", viewPort.width.toString() );
            canvas.setAttribute("height", viewPort.height.toString());

            document.body.appendChild(canvas);
            canvas.getContext("experimental-webgl");
            Egret3D.clientRect = canvas.getBoundingClientRect();

            try {
                gl = canvas.getContext("experimental-webgl");
            } catch (e) {
            }
            if (!gl) {
                alert("抱歉，不能初始化webGL！");
            }
            return gl;
        }
    }
}