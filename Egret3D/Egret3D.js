var BlackSwan;
(function (BlackSwan) {
    var Egret3D = (function () {
        function Egret3D() {
        }
        /**
        * get GPU Context3D
        * 获取GPU交换链表程序
        **/
        Egret3D.requstContext3D = function (GPU_CONFIG, canvasRec) {
            console.log("requst GPU Config", GPU_CONFIG);
            if (!this.context3D || (this.context3D && !this.context3D.isLost)) {
                switch (GPU_CONFIG) {
                    case Egret3D.OpenGLES_2_0:
                        var tapContext3D = Egret3D.requstWEBGL(canvasRec);
                        Egret3D.context3D = new BlackSwan.Context3DChild_OpenGLES_2_0(tapContext3D);
                        Egret3D.BLEND = tapContext3D.BLEND;
                        Egret3D.TRIANGLES = tapContext3D.TRIANGLES;
                        Egret3D.POINTS = tapContext3D.POINTS;
                        Egret3D.LINES = tapContext3D.LINES;
                        Egret3D.FLOAT = tapContext3D.FLOAT;
                        Egret3D.VERTEX_SHADER = tapContext3D.VERTEX_SHADER;
                        Egret3D.FRAGMENT_SHADER = tapContext3D.FRAGMENT_SHADER;
                        Egret3D.canvasRectangle = canvasRec;
                        break;
                }
            }
            console.log("requst GPU Config", Egret3D.context3D);
        };
        Egret3D.requstWEBGL = function (viewPort) {
            var gl;
            var canvas = document.createElement('canvas');
            canvas.setAttribute("id", "blackswan3D");
            canvas.setAttribute("x", viewPort.x.toString());
            canvas.setAttribute("y", viewPort.y.toString());
            canvas.setAttribute("width", viewPort.width.toString());
            canvas.setAttribute("height", viewPort.height.toString());
            document.body.appendChild(canvas);
            canvas.getContext("experimental-webgl");
            Egret3D.clientRect = canvas.getBoundingClientRect();
            try {
                gl = canvas.getContext("experimental-webgl");
            }
            catch (e) {
            }
            if (!gl) {
                alert("抱歉，不能初始化webGL！");
            }
            return gl;
        };
        Egret3D.Direct3D_Opengl_Auto = "Direct3D_Opengl_Auto";
        Egret3D.Direct3D_9_0 = "Direct3D_9_0";
        Egret3D.Direct3D_10_0 = "Direct3D_10_0";
        Egret3D.Direct3D_11_0 = "Direct3D_11_0";
        Egret3D.OpenGLES_2_0 = "OpenGLES_2_0";
        Egret3D.OpenGLES_3_0 = "OpenGLES_3_0";
        Egret3D.OpenGL = "OpenGL";
        return Egret3D;
    })();
    BlackSwan.Egret3D = Egret3D;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Egret3D.js.map