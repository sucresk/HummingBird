var BlackSwan;
(function (BlackSwan) {
    ///**
    //**/
    //export class Contex3D extends contex3DChildBase{
    //    constructor(canvas: HTMLCanvasElement) {
    //        super(canvas);
    //    }
    //}
    //class contex3DChild_D_O_A extends contex3DChildBase{
    //    constructor() {
    //        super();
    //    }
    //}
    var Context3DChild_OpenGLES_2_0 = (function () {
        function Context3DChild_OpenGLES_2_0(context3D) {
            this.gl = context3D;
            BlackSwan.ContextSamplerType.LINEAR = this.gl.LINEAR;
            BlackSwan.ContextSamplerType.NEAREST = this.gl.NEAREST;
            BlackSwan.ContextSamplerType.REPEAT = this.gl.REPEAT;
        }
        Object.defineProperty(Context3DChild_OpenGLES_2_0.prototype, "version", {
            get: function () {
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context3DChild_OpenGLES_2_0.prototype, "isLost", {
            get: function () {
                // need to add instance 
                return false;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * 视口设置定义
        * x position X
        * y position Y
        * width  3D canvas width
        * height  3D canvas  height
        **/
        Context3DChild_OpenGLES_2_0.prototype.viewPort = function (x, y, width, height) {
            this.gl.viewport(x, y, width, height);
        };
        /**
        * 创建 显卡程序
        **/
        Context3DChild_OpenGLES_2_0.prototype.creatProgram = function (vsShader, fsShader) {
            var shaderProgram = this.gl.createProgram();
            this.gl.attachShader(shaderProgram, vsShader.shader);
            this.gl.attachShader(shaderProgram, fsShader.shader);
            this.gl.linkProgram(shaderProgram);
            if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
                alert("Could not initialise shaders");
            }
            var program = new BlackSwan.openGLES.Program3D(shaderProgram);
            return program;
        };
        /**
        * 创建 顶点索引流
        **/
        Context3DChild_OpenGLES_2_0.prototype.creatIndexBuffer = function (indexData) {
            var indexDataArray = new Uint16Array(indexData);
            var indexBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexDataArray, this.gl.STATIC_DRAW);
            return new BlackSwan.openGLES.IndexBuffer3D(indexBuffer);
        };
        /**
        * 创建 顶点数据流
        **/
        Context3DChild_OpenGLES_2_0.prototype.creatVertexBuffer = function (vertexData) {
            var vertexDataArray = new Float32Array(vertexData);
            var vertexBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexDataArray, this.gl.STATIC_DRAW);
            return new BlackSwan.openGLES.VertexBuffer3D(vertexBuffer);
        };
        // public upLoadTextureData(mipLevel: number, texture: Texture2D , data:any ) {
        //     // 启用二维纹理
        //     //this.gl.enable( this.gl.TEXTURE );
        //     this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture2D);
        //     //if (typeof (data) == HTMLImageElement) {
        //     // this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        //     //}
        //     this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, this.gl.RGBA, 128, 128, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data ) ;
        //
        //     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        //     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        //     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        //     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        // }
        /**
        * 设置2D纹理状态
        */
        Context3DChild_OpenGLES_2_0.prototype.setTexture2DSamplerState = function (min_filter, mag_filter, wrap_u_filter, wrap_v_filter) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, min_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, mag_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap_u_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap_v_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        };
        /**
        * 提交2D纹理
        */
        Context3DChild_OpenGLES_2_0.prototype.upLoadTextureData = function (mipLevel, texture) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture2D);
            if (texture.internalformat == BlackSwan.InternalFormat.ImageData) {
                this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, texture.colorformat, texture.colorformat, this.gl.UNSIGNED_BYTE, texture.imageData);
            }
            else if (texture.internalformat == BlackSwan.InternalFormat.CompressData) {
                this.upLoadCompressedTexture2D(mipLevel, texture);
            }
            else if (texture.internalformat == BlackSwan.InternalFormat.PixelArray) {
                this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, texture.colorformat, texture.width, texture.height, texture.border, texture.colorformat, this.gl.UNSIGNED_BYTE, texture.pixelArray);
            }
        };
        /**
        * 提交2D压缩纹理
        */
        Context3DChild_OpenGLES_2_0.prototype.upLoadCompressedTexture2D = function (mipLevel, texture) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture2D);
            var ext = this.gl.getExtension('WEBGL_compressed_texture_s3tc');
            this.gl.compressedTexImage2D(this.gl.TEXTURE_2D, mipLevel, texture.colorformat, texture.width, texture.height, texture.border, texture.pixelArray);
        };
        /**
        * 创建 2维贴图
        **/
        Context3DChild_OpenGLES_2_0.prototype.creatTexture2D = function () {
            var texture = new BlackSwan.openGLES.Texture2D(this.gl.createTexture(), this);
            return texture;
        };
        /**
        * 创建 Cube贴图
        **/
        Context3DChild_OpenGLES_2_0.prototype.creatTexture3D = function () {
            return new BlackSwan.openGLES.Texture3D(this.gl.createTexture());
        };
        Context3DChild_OpenGLES_2_0.prototype.creatVertexShader = function (source) {
            var shader = this.gl.createShader(this.gl.VERTEX_SHADER);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);
            var tmpShader = new BlackSwan.openGLES.Shader(shader);
            tmpShader.id = BlackSwan.openGLES.Shader.ID_COUNT++;
            return tmpShader;
        };
        Context3DChild_OpenGLES_2_0.prototype.creatFragmentShader = function (source) {
            var shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);
            var tmpShader = new BlackSwan.openGLES.Shader(shader);
            tmpShader.id = BlackSwan.openGLES.Shader.ID_COUNT++;
            return tmpShader;
        };
        /**
        * 清除渲染区域的颜色 深度
        **/
        Context3DChild_OpenGLES_2_0.prototype.clear = function (r, g, b, a) {
            this.gl.clearColor(r, g, b, a);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            //console.log( "clean" , r , g, b, a );
        };
        Context3DChild_OpenGLES_2_0.prototype.clearDepth = function (depth) {
            this.gl.clearDepth(depth);
        };
        Context3DChild_OpenGLES_2_0.prototype.clearStencil = function (stencil) {
            this.gl.clearStencil(stencil);
        };
        /**
        * 使用显卡着色器
        **/
        Context3DChild_OpenGLES_2_0.prototype.setProgram = function (program) {
            this.gl.useProgram(program.program);
        };
        /**
        * 获取矩阵变量ID
        **/
        Context3DChild_OpenGLES_2_0.prototype.getUniformLocation = function (programe3D, name) {
            return this.gl.getUniformLocation(programe3D.program, name);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform1f = function (location, x) {
            this.gl.uniform1f(location, x);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform1fv = function (location, v) {
            this.gl.uniform1fv(location, v);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform1i = function (location, x) {
            this.gl.uniform1i(location, x);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform1iv = function (location, v) {
            this.gl.uniform1iv(location, v);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform2f = function (location, x, y) {
            this.gl.uniform2f(location, x, y);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform2fv = function (location, v) {
            this.gl.uniform2fv(location, v);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform2i = function (location, x, y) {
            this.gl.uniform2i(location, x, y);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform2iv = function (location, v) {
            this.gl.uniform2iv(location, v);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform3f = function (location, x, y, z) {
            this.gl.uniform3f(location, x, y, z);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform3fv = function (location, v) {
            this.gl.uniform3fv(location, v);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform3i = function (location, x, y, z) {
            this.gl.uniform3i(location, x, y, z);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform3iv = function (location, v) {
            this.gl.uniform3iv(location, v);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform4f = function (location, x, y, z, w) {
            this.gl.uniform4f(location, x, y, z, w);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform4fv = function (location, v) {
            this.gl.uniform4fv(location, v);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform4i = function (location, x, y, z, w) {
            this.gl.uniform4i(location, x, y, z, w);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniform4iv = function (location, v) {
            this.gl.uniform4iv(location, v);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniformMatrix2fv = function (location, transpose, value) {
            this.gl.uniformMatrix2fv(location, transpose, value);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniformMatrix3fv = function (location, transpose, value) {
            this.gl.uniformMatrix3fv(location, transpose, value);
        };
        Context3DChild_OpenGLES_2_0.prototype.uniformMatrix4fv = function (location, transpose, value) {
            this.gl.uniformMatrix4fv(location, transpose, value);
        };
        /**
        * 设置 绘制混合模式
        **/
        Context3DChild_OpenGLES_2_0.prototype.setBlendFactors = function (src, dst) {
            this.gl.blendFunc(src, dst);
        };
        /**
        * 设置 绘制剔除模式
        **/
        Context3DChild_OpenGLES_2_0.prototype.setCulling = function (mode) {
            this.gl.cullFace(mode);
        };
        /**
        * 开启 绘制模式
        * this.contex3D.DEPTH_TEST);
        **/
        Context3DChild_OpenGLES_2_0.prototype.enbable = function (cap) {
            this.gl.enable(cap);
        };
        /**
        * 开启 深度模式 及 深度测试比较模式
        **/
        Context3DChild_OpenGLES_2_0.prototype.enableDepthTest = function (flag, compareMode) {
            if (compareMode === void 0) { compareMode = 0; }
            if (flag)
                this.gl.enable(this.gl.DEPTH_TEST);
        };
        /**
        * 获取顶点着色器变量 索引
        **/
        Context3DChild_OpenGLES_2_0.prototype.getShaderAttribLocation = function (programe, attribName) {
            programe.vertextAttrib[attribName] = this.gl.getAttribLocation(programe.program, attribName);
            return programe.vertextAttrib[attribName];
        };
        /**
        * 指定顶点着色器变量索引 及机构
        **/
        Context3DChild_OpenGLES_2_0.prototype.vertexAttribPointer = function (programe3D, index, size, dataType, normalized, stride, offset) {
            this.gl.vertexAttribPointer(index, size, dataType, normalized, stride, offset);
            this.gl.enableVertexAttribArray(index);
        };
        /**
        * 实时传入显卡顶点着色器变量数组数据
        **/
        Context3DChild_OpenGLES_2_0.prototype.setVertexShaderConstData = function (floats, offest, numLen) {
            this.gl.vertexAttrib4fv(offest, floats.subarray(offest, numLen));
        };
        /**
        * 实时传入显卡片段着色器变量数组数据
        **/
        Context3DChild_OpenGLES_2_0.prototype.setFragmentShaderConstData = function (floats, offest, numLen) {
        };
        /**
        * 设置贴图采样
        **/
        Context3DChild_OpenGLES_2_0.prototype.setTextureAt = function (index, texture) {
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture2D);
            this.gl.uniform1i(index, 0);
        };
        /**
        * 设置贴图采样模式
        **/
        Context3DChild_OpenGLES_2_0.prototype.samplerState = function (sampler, wrap, filter, mipfilter) {
        };
        /**
        * 设置矩形裁切区域
        **/
        Context3DChild_OpenGLES_2_0.prototype.setScissorRectangle = function (rectangle) {
        };
        /**
        * 设置模板测试
        **/
        Context3DChild_OpenGLES_2_0.prototype.setStencilReferenceValue = function () {
        };
        //drawInBackBuffer(type:number, indexBuffer);
        Context3DChild_OpenGLES_2_0.prototype.bindVertexBuffer = function (vertexBuffer) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer.buffer);
        };
        /**
        * 绘制模型元素
        **/
        Context3DChild_OpenGLES_2_0.prototype.drawElement = function (type, indexBuffer, offset, length) {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
            this.gl.drawElements(type, length, this.gl.UNSIGNED_SHORT, offset);
        };
        /**
        * 绘制提交
        **/
        Context3DChild_OpenGLES_2_0.prototype.flush = function () {
            this.gl.flush();
        };
        return Context3DChild_OpenGLES_2_0;
    })();
    BlackSwan.Context3DChild_OpenGLES_2_0 = Context3DChild_OpenGLES_2_0;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Context3D.js.map