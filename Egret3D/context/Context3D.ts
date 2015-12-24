module Egret3D {
    export interface Context3D {

        gl: WebGLRenderingContext;

        version: string;

        isLost: boolean;
        /**
        * @language zh_CN
        * 视口设置定义
        * @param x position X
        * @param y position Y
        * @param width  3D canvas width
        * @param height  3D canvas  height
        */
        viewPort(x: number, y: number, width: number, height: number);

        /**
        * @language zh_CN
        * 创建 显卡程序
        * @param vsShader
        * @param fsShader
        */
        creatProgram(vsShader: Shader, fsShader: Shader): IProgram3D;

        /**
        * @language zh_CN
        * 创建 顶点索引流
        * @param vertexData
        */
        creatIndexBuffer(indexData: Array<number>): IndexBuffer3D;

        /**
        * @language zh_CN
        * 创建 顶点数据流
        * @param vertexData
        */
        creatVertexBuffer(vertexData: Array<number>): VertexBuffer3D;

        /**
        * @language zh_CN
        * 创建 2维贴图
        */
        creatTexture2D(): Texture2D;

        /**
        * @language zh_CN
        * 上传贴图信息给GPU 显存
        * @param mipLevel load 贴图层级
        * @param textureMipmap 上传mipmap
        */
        upLoadTextureData(mipLevel: number, textureMipmap: Texture2D);
        
        /**
        * @language zh_CN
        * 上传压缩贴图信息给GPU 显存
        * @param mipLevel load 贴图层级
        * @param textureMipmap 上传mipmap
        */
        upLoadCompressedTexture2D(mipLevel: number, textureMipmap: Texture2D);

        /**
        * @language zh_CN
        * 调协贴图采样的状态
        * @param min_filter
        * @param mag_filter
        * @param wrap_u_filter
        * @param wrap_v_filter
        */
        setTexture2DSamplerState(min_filter: number, mag_filter: number, wrap_u_filter: number, wrap_v_filter: number);

        /**
        * @language zh_CN
        * 创建 Cube贴图
        */
        creatCubeTexture(): ICubeTexture;
        
        /**
        * @language zh_CN
        * 上传cube贴图
        * @param tex
        */
        uploadCubetexture(tex: ICubeTexture);

        /**
        * @language zh_CN
        * 创建 离屏渲染缓冲
        * @param width 
        * @param height
        * @param format 渲染的buffer
        */
        createFramebuffer(width: number, height: number, format: FrameBufferFormat): Texture2D;

        /**
        * @language zh_CN
        * 渲染到纹理
        * @param texture 
        * @param enableDepthAndStencil
        * @param surfaceSelector
        */
        setRenderToTexture(texture: Texture2D, enableDepthAndStencil: Boolean, surfaceSelector: number);

        /**
        * @language zh_CN
        * 恢复渲染
        */
        setRenderToBackBuffer();

        /**
        * @language zh_CN
        * 创建图形渲染着色器程序
        * @param source 
        */
        creatVertexShader(source: string): Shader;
        
        /**
        * @language zh_CN
        * 
        * @param source 
        */
        creatFragmentShader(source: string): Shader;

        /**
        * @language zh_CN
        * 清除渲染区域的颜色 深度
        * @param r 
        * @param g 
        * @param b
        * @param a 
        */
        clear(r: number, g: number, b: number, a: number);

        /**
        * @language zh_CN
        * 清除渲染区域 深度
        * @param depth 深度值 
        */
        clearDepth(depth: number);

        /**
        * @language zh_CN
        * 清除渲染区域 模板
        * @param stencil 模板值 
        */
        clearStencil(stencil: number);

        /**
        * @language zh_CN
        * 使用显卡着色器
        * @param programe 
        */
        setProgram(programe: IProgram3D);

        /**
        * @language zh_CN
        * 获取矩阵变量ID
        * @param programe  着色器
        * @param name  变量名
        */
        getUniformLocation(programe3D: IProgram3D, name: string): number;
        
        /**
        * @language zh_CN
        * 设置shader float 变量的值
        * @param location  变量
        * @param x  值
        */
        uniform1f(location: any, x: number): void;
                
        /**
        * @language zh_CN
        * 设置shader float 数组的值
        * @param location  变量
        * @param v  值
        */
        uniform1fv(location: any, v: any): void;
                        
        /**
        * @language zh_CN
        * 设置shader int 变量的值
        * @param location  变量
        * @param x  值
        */
        uniform1i(location: any, x: number): void;
                        
        /**
        * @language zh_CN
        * 设置shader int 数组的值
        * @param location  变量
        * @param v  值
        */
        uniform1iv(location: any, v: Int32Array): void;
                                
        /**
        * @language zh_CN
        * 设置shader vec2 变量的值
        * @param location  变量
        * @param x  vec2.x值
        * @param y  vec2.y值
        */
        uniform2f(location: any, x: number, y: number): void;
                                
        /**
        * @language zh_CN
        * 设置shader vec2 数组的值
        * @param location  变量
        * @param v  值
        */
        uniform2fv(location: any, v: any): void;
                                        
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param x
        * @param y
        */
        uniform2i(location: any, x: number, y: number): void;
                                                
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param v
        */
        uniform2iv(location: any, v: Int32Array): void;
                                                        
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param x
        * @param y
        * @param z
        */
        uniform3f(location: any, x: number, y: number, z: number): void;
                                                                
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param v
        */
        uniform3fv(location: any, v: any): void;
                                                                
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param x
        * @param y
        * @param z
        */
        uniform3i(location: any, x: number, y: number, z: number): void;
                                                                        
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param v
        */
        uniform3iv(location: any, v: Int32Array): void;
                                                                                
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param x
        * @param y
        * @param z
        * @param w
        */
        uniform4f(location: any, x: number, y: number, z: number, w: number): void;
                                                                                        
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param v
        */
        uniform4fv(location: any, v: any): void;
                                                                                        
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param x
        * @param y
        * @param z
        * @param w
        */
        uniform4i(location: any, x: number, y: number, z: number, w: number): void;
                                                                                                
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param v
        */
        uniform4iv(location: any, v: Int32Array): void;
                                                                                                
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param transpose
        * @param value
        */
        uniformMatrix2fv(location: any, transpose: boolean, value: any): void;
                                                                                                        
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param transpose
        * @param value
        */
        uniformMatrix3fv(location: any, transpose: boolean, value: any): void;
                                                                                                        
        /**
        * @language zh_CN
        * 
        * @param location  变量
        * @param transpose
        * @param value
        */
        uniformMatrix4fv(location: any, transpose: boolean, value: any): void;


        /**
        * @language zh_CN
        * 设置 绘制混合模式
        * @param src 源颜色
        * @param dst 目标颜色
        */
        setBlendFactors(src: number, dst: number);

        /**
        * @language zh_CN
        * 设置 绘制剔除模式
        * @param mode 模式
        */
        setCulling(mode: number);

        /**
        * @language zh_CN
        * 开启 绘制模式
        * @param cap
        */
        enbable(cap: number);
        
        /**
        * @language zh_CN
        * 关闭 绘制模式
        * @param cap
        */
        disable(cap: number);

        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag
        * @param compareMode
        */
        enableDepthTest(flag: boolean, compareMode: number);

        /**
        * @language zh_CN
        * 获取顶点着色器变量 索引
        * @param programe
        * @param attribName
        */
        getShaderAttribLocation(programe: IProgram3D, attribName: string);

        /**
        * @language zh_CN
        * 指定顶点着色器变量索引 及机构
        * @param programe3D
        * @param index
        * @param size
        * @param dataType
        * @param normalized
        * @param stride
        * @param offset
        */
        vertexAttribPointer(programe3D: IProgram3D, index: number, size: number, dataType: number, normalized: boolean, stride: number, offset: number);

        /**
        * @language zh_CN
        * 实时传入显卡顶点着色器变量数组数据
        * @param floats
        * @param offest
        * @param numLen
        */
        setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number);

        /**
        * @language zh_CN
        * 实时传入显卡片段着色器变量数组数据
        * @param floats
        * @param offest
        * @param numLen
        */
        setFragmentShaderConstData(floats: Float32Array, offest: number, numLen: number);

        /**
        * @language zh_CN
        * 设置贴图采样
        * @param samplerIndex
        * @param uniLocation
        * @param index
        * @param texture
        */
        setTexture2DAt(samplerIndex: number, uniLocation: number, index: number, texture: Texture2D);
        
        /**
        * @language zh_CN
        * 
        * @param samplerIndex
        * @param uniLocation
        * @param index
        * @param texture
        */
        setCubeTextureAt(samplerIndex: number, uniLocation: number, index: number, texture: ICubeTexture);

        /**
        * @language zh_CN
        * 设置矩形裁切区域
        * @param rectangle
        */
        setScissorRectangle(rectangle: Rectangle);

        /**
        * @language zh_CN
        * 设置模板测试
        */
        setStencilReferenceValue();
        
        /**
        * @language zh_CN
        * 绑定顶点buffer
        * @param vertexBuffer
        */
        bindVertexBuffer(vertexBuffer: VertexBuffer3D);

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param first 第一个顶点索引
        * @param length 顶点个数
        */
        drawArrays(type: number, first: number, length: number);

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param indexBuffer 索引数据
        * @param offset 顶点偏移
        * @param length 顶点个数
        */
        drawElement(type: number, indexBuffer: IndexBuffer3D, offset: number, length: number);

        /**
        * @language zh_CN
        * 绘制提交
        */
        flush();
    }

    /**
    * @class Egret3D.Context3DChild_OpenGLES_2_0
    * @classdesc
    * Context3DChild_OpenGLES_2_0  implements Egret3D.Context3D
    * 3d设备数据
    */
    export class Context3DChild_OpenGLES_2_0 implements Egret3D.Context3D {

        private programes: Array<IProgram3D>;
        public gl: WebGLRenderingContext;

        /**
        * @language zh_CN
        * constructor
        * @param context3D
        */
        constructor(context3D: WebGLRenderingContext) {
            this.gl = context3D;

            ContextSamplerType.LINEAR = this.gl.LINEAR;
            ContextSamplerType.NEAREST = this.gl.NEAREST;
            ContextSamplerType.REPEAT = this.gl.REPEAT;
            
            ///enable necessry extensions.
            ///var OES_texture_float_linear = this.gl.getExtension("OES_texture_float_linear");
            var OES_texture_float = this.gl.getExtension("OES_texture_float");
            ///var OES_texture_half_float = this.gl.getExtension("OES_texture_half_float");
            ///var OES_texture_half_float_linear = this.gl.getExtension("OES_texture_half_float_linear");
            ///var OES_standard_derivatives = this.gl.getExtension("OES_standard_derivatives");
            ///var WEBGL_draw_buffers = this.gl.getExtension("WEBGL_draw_buffers");
            ///var WEBGL_depth_texture = this.gl.getExtension("WEBGL_depth_texture");
            if (!OES_texture_float) {
                alert("OES_texture_float Texture is not available");
            }
        }

        /**
        * @language zh_CN
        * 版本号
        * @readOnly
        * @param context3D
        */
        public get version(): string {
            return "";
        }

        public get isLost(): boolean {
            /// need to add instance 
            return false;
        }

        /**
        * @language zh_CN
        * 版本号
        * 视口设置定义
        * @param x position X
        * @param y position Y
        * @param width  3D canvas width
        * @param height  3D canvas  height
        */
        public viewPort(x: number, y: number, width: number, height: number) {
            this.gl.viewport(x, y, width, height);
        }

        /**
        * @language zh_CN
        * 创建 显卡程序
        * @param vsShader
        * @param fsShader
        */
        public creatProgram(vsShader: Shader, fsShader: Shader): IProgram3D {
            var shaderProgram = this.gl.createProgram();
            this.gl.attachShader(shaderProgram, vsShader.shader);
            this.gl.attachShader(shaderProgram, fsShader.shader);
            this.gl.linkProgram(shaderProgram);
            var p = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
            if (!p) {
                alert("vsShader error" + this.gl.getShaderInfoLog(vsShader.shader));
                alert("fsShader error" + this.gl.getShaderInfoLog(fsShader.shader));
            }
            var program: Egret3D.openGLES.Program3D = new Egret3D.openGLES.Program3D(shaderProgram);
            return program;
        }

        /**
        * @language zh_CN
        * 创建 顶点索引流
        * @param indexData
        */
        public creatIndexBuffer(indexData: Array<number>): IndexBuffer3D {
            var indexDataArray = new Uint16Array(indexData);

            var indexBuffer: WebGLBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexDataArray, this.gl.STATIC_DRAW);

            return new Egret3D.openGLES.IndexBuffer3D(indexBuffer);
        }

        /**
        * @language zh_CN
        * 创建 顶点数据流
        * @param vertexData
        */
        public creatVertexBuffer(vertexData: Array<number>): VertexBuffer3D {
            var vertexDataArray: Float32Array = new Float32Array(vertexData);

            var vertexBuffer: WebGLBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexDataArray, this.gl.STATIC_DRAW);

            return new Egret3D.openGLES.VertexBuffer3D(vertexBuffer);
        }

        /// public upLoadTextureData(mipLevel: number, texture: Texture2D , data:any ) {
        ///     /// 启用二维纹理
        ///     ///this.gl.enable( this.gl.TEXTURE );
        ///     this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture2D);
        ///     ///if (typeof (data) == HTMLImageElement) {
        ///     /// this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        ///     ///}
        ///     this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, this.gl.RGBA, 128, 128, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data ) ;
        ///
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        /// }

        /**
        * @language zh_CN
        * 设置2D纹理状态
        * @param min_filter
        * @param mag_filter
        * @param wrap_u_filter
        * @param wrap_v_filter
        */
        public setTexture2DSamplerState(min_filter: number, mag_filter: number, wrap_u_filter: number, wrap_v_filter: number) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, min_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, mag_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap_u_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }

        /**
        * @language zh_CN
        * 提交2D纹理
        * @param mipLevel
        * @param texture
        */
        public upLoadTextureData(mipLevel: number, texture: Texture2D) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.gpu_texture);

            if (texture.gpu_internalformat == InternalFormat.ImageData) {
                this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

                ///var tmp = TextureUtil.getTextureData(texture.image);
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.image);
                this.gl.generateMipmap(this.gl.TEXTURE_2D);
            }
            else if (texture.gpu_internalformat == InternalFormat.CompressData) {
                this.upLoadCompressedTexture2D(mipLevel, texture);
            }
            else if (texture.gpu_internalformat == InternalFormat.PixelArray) {
                this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, texture.gpu_colorformat, texture.mipmapDatas[mipLevel].width, texture.mipmapDatas[mipLevel].height, texture.gpu_border, texture.gpu_colorformat, this.gl.UNSIGNED_BYTE, texture.mipmapDatas[mipLevel].data);
                this.gl.generateMipmap(this.gl.TEXTURE_2D);
            }

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        }

        /**
        * @language zh_CN
        * 提交2D压缩纹理
        * @param mipLevel
        * @param texture
        */
        public upLoadCompressedTexture2D(mipLevel: number, texture: Texture2D) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.gpu_texture);
            this.gl.compressedTexImage2D(this.gl.TEXTURE_2D, mipLevel, texture.gpu_colorformat, texture.mipmapDatas[mipLevel].width, texture.mipmapDatas[mipLevel].height, texture.gpu_border, texture.mipmapDatas[mipLevel].data);
        }

        /**
        * @language zh_CN
        * 创建 2维贴图
        */
        public creatTexture2D(): Texture2D {
            var texture: Egret3D.openGLES.Texture2D = new Egret3D.openGLES.Texture2D(this.gl.createTexture(), this);
            return texture;
        }

        /**
        * @language zh_CN
        * 创建 Cube贴图
        */
        public creatCubeTexture(): ICubeTexture {
            return new Egret3D.openGLES.CubeTexture(this.gl.createTexture());
        }

        /**
        * @language zh_CN
        *
        * @param tex
        */
        public uploadCubetexture(tex: ICubeTexture) {
            /// 创建纹理并绑定纹理数据
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, tex.gpu_texture);

            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_right);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_left);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_up);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_down);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_back);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_front); 
            ///this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
            ///gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, min_filter);
            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, mag_filter);
            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap_u_filter);
            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }
        
        /**
        * @language zh_CN
        *
        * @param width
        * @param height
        * @param format
        */
        public createFramebuffer(width: number, height: number, format: FrameBufferFormat): Texture2D {
            var rttframeBuffer = this.gl.createFramebuffer();
            var texture2D: Texture2D = this.creatTexture2D();
            var depthRenderbuffer = this.gl.createRenderbuffer();
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, rttframeBuffer);

            this.gl.bindTexture(this.gl.TEXTURE_2D, texture2D.gpu_texture);

            var float: Float32Array = new Float32Array(32 * 32 * 4);
            for (var i: number = 0; i < 32 * 32; i++) {
                float[i] = 1.0;
                float[i + 1] = 1.0;
                float[i + 2] = 1.0;
                float[i + 3] = 1.0;
            }

            switch (format) {
                case FrameBufferFormat.UNSIGNED_BYTE_RGB:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, width, height, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.FLOAT_RGB:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, width, height, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.FLOAT_RGBA:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
                    break;
            }

            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture2D.gpu_texture, 0);

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            ///this.gl.generateMipmap(this.gl.TEXTURE_2D);  
            ///配置渲染缓冲 
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthRenderbuffer);
            this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);

            texture2D.width = width;
            texture2D.height = height;
            texture2D.frameBuffer = rttframeBuffer;
            texture2D.renderbuffer = depthRenderbuffer;

            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
            return texture2D;
        }
                
        /**
        * @language zh_CN
        *
        * @param texture
        * @param enableDepthAndStencil
        * @param surfaceSelector
        */
        public setRenderToTexture(texture: Texture2D, enableDepthAndStencil: Boolean = false, surfaceSelector: number = 0) {
            if (enableDepthAndStencil) {
                //this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, texture.renderbuffer);
                //this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, texture.width, texture.height);
            }

            this.gl.viewport(0, 0, texture.width, texture.height);
           
            //if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) != this.gl.FRAMEBUFFER_COMPLETE)
            //{
            //    alert("缓冲失败");
            //}

            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, texture.frameBuffer);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture.gpu_texture, 0);
            this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, texture.renderbuffer);
        }
                        
        /**
        * @language zh_CN
        *
        */
        public setRenderToBackBuffer() {

            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);

        }
                                
        /**
        * @language zh_CN
        *
        * @param source
        */
        public creatVertexShader(source: string): Shader {
            var shader: WebGLShader = this.gl.createShader(this.gl.VERTEX_SHADER);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            var tmpShader: Egret3D.openGLES.Shader = new Egret3D.openGLES.Shader(shader);
            tmpShader.id = Egret3D.openGLES.Shader.ID_COUNT++;
            return tmpShader;
        }
                                        
        /**
        * @language zh_CN
        *
        * @param source
        */
        public creatFragmentShader(source: string): Shader {
            var shader: WebGLShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            var tmpShader: Egret3D.openGLES.Shader = new Egret3D.openGLES.Shader(shader);
            tmpShader.id = Egret3D.openGLES.Shader.ID_COUNT++;
            return tmpShader;
        }

        /**
        * @language zh_CN
        * 清除渲染区域的颜色 深度
        * @param r
        * @param g
        * @param b
        * @param a
        */
        public clear(r: number, g: number, b: number, a: number) {
            this.gl.clearColor(r, g, b, a);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            ///console.log( "clean" , r , g, b, a );
        }
        
        /**
        * @language zh_CN
        * 清除渲染区域的 深度
        * @param depth
        */
        public clearDepth(depth: number) {
            this.gl.clearDepth(depth);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }

                
        /**
        * @language zh_CN
        * 清除渲染区域的 模板
        * @param stencil
        */
        public clearStencil(stencil: number) {
            this.gl.clearStencil(stencil);
        }

        /**
        * @language zh_CN
        * 使用显卡着色器
        * @param program
        */
        public setProgram(program: IProgram3D) {
            this.gl.useProgram(program.program);
        }

        /**
        * @language zh_CN
        * 获取矩阵变量ID
        * @param program
        * @param name
        */
        public getUniformLocation(programe3D: IProgram3D, name: string): any {
            return this.gl.getUniformLocation(programe3D.program, name);
        }

        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        */
        public uniform1f(location: any, x: number): void {
            this.gl.uniform1f(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform1fv(location: any, v: any): void {
            this.gl.uniform1fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        */
        public uniform1i(location: any, x: number): void {
            this.gl.uniform1i(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform1iv(location: any, v: Int32Array): void {
            this.gl.uniform1iv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        */
        public uniform2f(location: any, x: number, y: number): void {
            this.gl.uniform2f(location, x, y);
        }
                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform2fv(location: any, v: any): void {
            this.gl.uniform2fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        */
        public uniform2i(location: any, x: number, y: number): void {
            this.gl.uniform2i(location, x, y);
        }
                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform2iv(location: any, v: Int32Array): void {
            this.gl.uniform2iv(location, v);
        }
                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        */
        public uniform3f(location: any, x: number, y: number, z: number): void {
            this.gl.uniform3f(location, x, y, z);
        }
                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform3fv(location: any, v: any): void {
            this.gl.uniform3fv(location, v);
        }
                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        */
        public uniform3i(location: any, x: number, y: number, z: number): void {
            this.gl.uniform3i(location, x, y, z);
        }
                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform3iv(location: any, v: Int32Array): void {
            this.gl.uniform3iv(location, v);
        }
                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        * @param w
        */
        public uniform4f(location: any, x: number, y: number, z: number, w: number): void {
            this.gl.uniform4f(location, x, y, z, w);
        }
                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform4fv(location: any, v: any): void {
            this.gl.uniform4fv(location, v);
        }
                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        * @param w
        */
        public uniform4i(location: any, x: number, y: number, z: number, w: number): void {
            this.gl.uniform4i(location, x, y, z, w);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform4iv(location: any, v: Int32Array): void {
            this.gl.uniform4iv(location, v);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix2fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix2fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix3fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix3fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix4fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix4fv(location, transpose, value);
        }

        /**
        * @language zh_CN
        * 设置 绘制混合模式
        * @param src 
        * @param dst 
        */
        public setBlendFactors(src: number, dst: number) {
            this.gl.blendFunc(src, dst);
        }

        /**
        * @language zh_CN
        * 设置 绘制剔除模式
        * @param mode 
        */
        public setCulling(mode: number) {
            this.gl.cullFace(mode);
        }

        /**
        * @language zh_CN
        * 开启 绘制模式
        * @param cap 
        */
        public enbable(cap: number) {
            this.gl.enable(cap);
        }

        /**
        * @language zh_CN
        * 关闭 绘制模式
        * @param cap 
        */
        public disable(cap: number) {
            this.gl.disable(cap);
        }

        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag 
        * @param compareMode 
        */
        public enableDepthTest(flag: boolean, compareMode: number = 0) {
            if (flag)
                this.gl.enable(this.gl.DEPTH_TEST);
        }

        /**
        * @language zh_CN
        * 获取顶点着色器变量 索引
        * @param programe 
        * @param attribName
        * @returns 着色器变量
        */
        public getShaderAttribLocation(programe: IProgram3D, attribName: string): any {
            programe.vertextAttrib[attribName] = this.gl.getAttribLocation(programe.program, attribName);
            return programe.vertextAttrib[attribName];
        }

        /**
        * @language zh_CN
        * 指定顶点着色器变量索引 及机构
        * @param programe3D 
        * @param index 
        * @param size 
        * @param dataType 
        * @param normalized 
        * @param stride 
        * @param offset 
        */
        public vertexAttribPointer(programe3D: IProgram3D, index: number, size: number, dataType: number, normalized: boolean, stride: number, offset: number) {
            this.gl.vertexAttribPointer(index, size, dataType, normalized, stride, offset);
            this.gl.enableVertexAttribArray(index);
        }

        /**
        * @language zh_CN
        * 实时传入显卡顶点着色器变量数组数据
        * @param floats 
        * @param offest 
        * @param numLen 
        */
        public setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number) {
            this.gl.vertexAttrib4fv(offest, floats.subarray(offest, numLen));
        }

        /**
        * @language zh_CN
        * 实时传入显卡片段着色器变量数组数据
        * @param floats 
        * @param offest 
        * @param numLen 
        */
        public setFragmentShaderConstData(floats: Float32Array, offest: number, numLen: number) {
        }

        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex 
        * @param uniLocation 
        * @param index 
        * @param texture 
        */
        public setTexture2DAt(samplerIndex: number, uniLocation: number, index: number, texture: Texture2D) {
            this.gl.activeTexture(samplerIndex);
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.gpu_texture);
            this.gl.uniform1i(uniLocation, index);
        }
        
        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex 
        * @param uniLocation 
        * @param index 
        * @param texture 
        */
        public setCubeTextureAt(samplerIndex: number, uniLocation: number, index: number, texture: ICubeTexture) {
            this.gl.activeTexture(samplerIndex);
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture.gpu_texture);
            this.gl.uniform1i(uniLocation, index);
        } 

        /**
        * @language zh_CN
        * 设置矩形裁切区域
        * @param rectangle 
        */
        public setScissorRectangle(rectangle: Rectangle) {
        }

        /**
        * @language zh_CN
        * 设置模板测试
        */
        public setStencilReferenceValue() {
        }

        /**
        * @language zh_CN
        * 绑定顶点Buffer
        * @param vertexBuffer 
        */
        public bindVertexBuffer(vertexBuffer: VertexBuffer3D) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer.buffer);
        }

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param first 第一个顶点索引
        * @param length 顶点个数
        */
        public drawArrays(type: number, first: number, length: number) {
            this.gl.drawArrays(type, first, length);
        }

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param indexBuffer 索引数据
        * @param offset 顶点偏移
        * @param length 顶点个数
        */
        public drawElement(type: number, indexBuffer: IndexBuffer3D, offset: number, length: number) {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
            this.gl.drawElements(type, length, this.gl.UNSIGNED_SHORT, offset);
        }

        /**
        * @language zh_CN
        * 绘制提交
        */
        public flush() {
            this.gl.flush();
        }
    }
}




