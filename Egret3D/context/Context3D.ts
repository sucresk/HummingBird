module BlackSwan {

    export interface Context3D {

        gl: WebGLRenderingContext;

        version: string;

        isLost: boolean ;
        /**
        * 视口设置定义
        * x position X
        * y position Y
        * width  3D canvas width
        * height  3D canvas  height
        **/
        viewPort(x: number, y: number, width: number, height: number);

        /**
        * 创建 显卡程序
        **/
        creatProgram(vsShader: Shader, fsShader: Shader): IProgram3D;

        /**
        * 创建 顶点索引流
        **/
        creatIndexBuffer(vertexData: Array<number>): IndexBuffer3D;

        /**
        * 创建 顶点数据流
        **/
        creatVertexBuffer(vertexData:Array<number>): VertexBuffer3D;

        /**
        * 创建 2维贴图
        **/
        creatTexture2D(): Texture2D;

        upLoadTextureData(mipLevel: number, textureMipmap: Texture2D);

        upLoadCompressedTexture2D(mipLevel: number, textureMipmap: Texture2D);

        setTexture2DSamplerState(min_filter: number, mag_filter: number, wrap_u_filter: number, wrap_v_filter: number);

        /**
        * 创建 Cube贴图
        **/
        creatCubeTexture(): ICubeTexture;

        uploadCubetexture(tex:ICubeTexture);

        /**
       *  创建 离屏渲染缓冲
       **/
        createFramebuffer(width: number, height: number): Texture2D;

        /**
        *  渲染到纹理
        **/
        setRenderToTexture(texture: Texture2D, enableDepthAndStencil: Boolean, surfaceSelector: number);

        /**
        *  恢复渲染
        **/
        setRenderToBackBuffer();

         /**
        * 创建图形渲染着色器程序
        **/
        creatVertexShader(source: string): Shader;

        creatFragmentShader(source: string): Shader;

        /**
        * 清除渲染区域的颜色 深度
        **/
        clear(r: number, g: number, b: number, a: number );

        /**
        * 清除渲染区域 深度
        **/
        clearDepth(depth: number);

        /**
        * 清除渲染区域 深度
        **/
        clearStencil(stencil: number);

        /**
        * 使用显卡着色器
        **/
        setProgram(programe: IProgram3D);

        /**
        * 获取矩阵变量ID
        **/
        getUniformLocation(programe3D: IProgram3D,name: string): number;

        uniform1f(location: any, x: number): void;
        uniform1fv(location: any, v: any): void;
        uniform1i(location: any, x: number): void;
        uniform1iv(location: any, v: Int32Array): void;
        uniform2f(location: any, x: number, y: number): void;
        uniform2fv(location: any, v: any): void;
        uniform2i(location: any, x: number, y: number): void;
        uniform2iv(location: any, v: Int32Array): void;
        uniform3f(location: any, x: number, y: number, z: number): void;
        uniform3fv(location: any, v: any): void;
        uniform3i(location: any, x: number, y: number, z: number): void;
        uniform3iv(location: any, v: Int32Array): void;
        uniform4f(location: any, x: number, y: number, z: number, w: number): void;
        uniform4fv(location: any, v: any): void;
        uniform4i(location: any, x: number, y: number, z: number, w: number): void;
        uniform4iv(location: any, v: Int32Array): void;
        uniformMatrix2fv(location: any, transpose: boolean, value: any): void;
        uniformMatrix3fv(location: any, transpose: boolean, value: any): void;
        uniformMatrix4fv(location: any, transpose: boolean, value: any): void;


        /**
        * 设置 绘制混合模式
        **/
        setBlendFactors(src: number, dst: number);

        /**
        * 设置 绘制剔除模式
        **/
        setCulling(mode:number);

        /**
        * 开启 绘制模式
        **/
        enbable(cap: number);

        disable(cap: number);

        /**
        * 开启 深度模式 及 深度测试比较模式
        **/
        enableDepthTest(flag: boolean, compareMode: number);

        /**
        * 获取顶点着色器变量 索引
        **/
        getShaderAttribLocation(programe: IProgram3D, attribName: string);

        /**
        * 指定顶点着色器变量索引 及机构
        **/
        vertexAttribPointer(programe3D: IProgram3D,index: number, size: number, dataType: number, normalized: boolean, stride: number, offset: number);

        /**
        * 实时传入显卡顶点着色器变量数组数据
        **/
        setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number);

        /**
        * 实时传入显卡片段着色器变量数组数据
        **/
        setFragmentShaderConstData(floats: Float32Array, offest: number, numLen: number);

        /**
        * 设置贴图采样
        **/
        setTexture2DAt(samplerType: any, index: number, uniLocation: number, texture: Texture2D);
        setCubeTextureAt(samplerType: any, index:number , uniLocation: number, texture: ICubeTexture);

        /**
        * 设置贴图采样模式
        **/
        samplerState(sampler: number, wrap: string, filter: string, mipfilter: String);

        /**
        * 设置矩形裁切区域
        **/
        setScissorRectangle(rectangle: Rectangle);

        /**
        * 设置模板测试
        **/
        setStencilReferenceValue();

        //drawInBackBuffer(type:number, indexBuffer);
        bindVertexBuffer(vertexBuffer: VertexBuffer3D);
        /**
        * 绘制模型元素
        **/
        drawElement(type: number, indexBuffer: IndexBuffer3D, offset: number, length: number);

        /**
        * 绘制提交
        **/
        flush();
    }

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
    export class Context3DChild_OpenGLES_2_0 implements BlackSwan.Context3D  {

        private programes: Array<IProgram3D>;
        public gl: WebGLRenderingContext;
        
        constructor(context3D: WebGLRenderingContext) {
            this.gl = context3D;

            ContextSamplerType.LINEAR = this.gl.LINEAR;
            ContextSamplerType.NEAREST = this.gl.NEAREST;
            ContextSamplerType.REPEAT = this.gl.REPEAT;
            
            //enable necessry extensions.
            //var OES_texture_float_linear = this.gl.getExtension("OES_texture_float_linear");
            //var OES_texture_float = this.gl.getExtension("OES_texture_float");
            //var OES_texture_half_float = this.gl.getExtension("OES_texture_half_float");
            //var OES_texture_half_float_linear = this.gl.getExtension("OES_texture_half_float_linear");
            //var OES_standard_derivatives = this.gl.getExtension("OES_standard_derivatives");
            //var WEBGL_draw_buffers = this.gl.getExtension("WEBGL_draw_buffers");
            //var WEBGL_depth_texture = this.gl.getExtension("WEBGL_depth_texture");
            //if (!WEBGL_depth_texture) {
            //    alert("Depth Texture is not available");
            //}
        }

        public get version(): string {
            return "";
        }

        public get isLost(): boolean {
            // need to add instance 
            return false;
        }

        /**
        * 视口设置定义
        * x position X
        * y position Y
        * width  3D canvas width
        * height  3D canvas  height
        **/
        public viewPort(x: number, y: number, width: number, height: number) {
            this.gl.viewport(x,y,width,height);
        }

        /**
        * 创建 显卡程序
        **/
        public creatProgram(vsShader: Shader, fsShader: Shader): IProgram3D {
            var shaderProgram = this.gl.createProgram();
            this.gl.attachShader(shaderProgram, vsShader.shader);
            this.gl.attachShader(shaderProgram, fsShader.shader);
            this.gl.linkProgram(shaderProgram);
            var p = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
            if ( !p ) {
                alert("Could not initialise shaders error" + this.gl.getShaderInfoLog(vsShader.shader) );
                alert("Could not initialise shaders error" + this.gl.getShaderInfoLog(fsShader.shader) );
            }
            var program: BlackSwan.openGLES.Program3D = new BlackSwan.openGLES.Program3D(shaderProgram);
            return program;
        }

        /**
        * 创建 顶点索引流
        **/
        public creatIndexBuffer(indexData:Array<number>): IndexBuffer3D {
            var indexDataArray = new Uint16Array(indexData);

            var indexBuffer: WebGLBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexDataArray, this.gl.STATIC_DRAW);

            return new BlackSwan.openGLES.IndexBuffer3D(indexBuffer) ; 
        }

        /**
        * 创建 顶点数据流
        **/  
        public creatVertexBuffer(vertexData: Array<number>): VertexBuffer3D {
            var vertexDataArray: Float32Array = new Float32Array(vertexData);

            var vertexBuffer: WebGLBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexDataArray, this.gl.STATIC_DRAW);

            return new BlackSwan.openGLES.VertexBuffer3D(vertexBuffer) ;
        }

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
        public setTexture2DSamplerState(min_filter: number, mag_filter: number , wrap_u_filter: number, wrap_v_filter: number ) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, min_filter );
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, mag_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap_u_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }

        /**
        * 提交2D纹理
        */
        public upLoadTextureData( mipLevel: number, texture: Texture2D ) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.gpu_texture );

            if (texture.gpu_internalformat == InternalFormat.ImageData) {

                this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

                //var tmp = TextureUtil.getTextureData(texture.image);
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.image);
                this.gl.generateMipmap(this.gl.TEXTURE_2D);
            }
            else if (texture.gpu_internalformat == InternalFormat.CompressData) {
                this.upLoadCompressedTexture2D(mipLevel, texture);
            }
            else if (texture.gpu_internalformat == InternalFormat.PixelArray) {
                this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, texture.gpu_colorformat, texture.mipmapDatas[mipLevel].width, texture.mipmapDatas[mipLevel].height, texture.gpu_border , texture.gpu_colorformat, this.gl.UNSIGNED_BYTE, texture.mipmapDatas[mipLevel].data );
                this.gl.generateMipmap(this.gl.TEXTURE_2D);
            }
        }

        /**
        * 提交2D压缩纹理
        */
        public upLoadCompressedTexture2D(mipLevel: number, texture: Texture2D ) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.gpu_texture);
            this.gl.compressedTexImage2D(this.gl.TEXTURE_2D, mipLevel, texture.gpu_colorformat, texture.mipmapDatas[mipLevel].width, texture.mipmapDatas[mipLevel].height, texture.gpu_border, texture.mipmapDatas[mipLevel].data );
        }

        /**
        * 创建 2维贴图
        **/
        public creatTexture2D(): Texture2D {
            var texture: BlackSwan.openGLES.Texture2D = new BlackSwan.openGLES.Texture2D(this.gl.createTexture(),this );
            return texture ;
        }

        /**
        * 创建 Cube贴图
        **/
        public creatCubeTexture(): ICubeTexture {
            return new BlackSwan.openGLES.CubeTexture( this.gl.createTexture() ) ;
        }

        public uploadCubetexture(tex: ICubeTexture) {
            // 创建纹理并绑定纹理数据
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, tex.gpu_texture);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_right ); 
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_left ); 
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_up ); 
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_down ); 
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_back ); 
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_front ); 
            //this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            //this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            //this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            //this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            //this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

            //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, min_filter);
            //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, mag_filter);
            //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap_u_filter);
            //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }

        public createFramebuffer(width: number, height: number): Texture2D {
            var rttframeBuffer = this.gl.createFramebuffer();
            var texture2D: Texture2D = this.creatTexture2D();
            var depthRenderbuffer = this.gl.createRenderbuffer();
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, rttframeBuffer);

            this.gl.bindTexture(this.gl.TEXTURE_2D, texture2D.gpu_texture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, width, height, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, null);

            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture2D.gpu_texture, 0);

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            //this.gl.generateMipmap(this.gl.TEXTURE_2D);  
            //配置渲染缓冲 
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

        public setRenderToTexture(texture: Texture2D, enableDepthAndStencil: Boolean = false, surfaceSelector: number = 0) {

            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
           
            if (enableDepthAndStencil) {
                this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, texture.renderbuffer);
                this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, texture.width, texture.height);
                //this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, texture.renderbuffer);
            }

            this.gl.viewport(0, 0, texture.width, texture.height);
           
            if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) != this.gl.FRAMEBUFFER_COMPLETE)
            {
                alert("缓冲失败");
            }

            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, texture.frameBuffer);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture.gpu_texture, 0);
            this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, texture.renderbuffer );
        }

        public setRenderToBackBuffer() {

            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);

        }

        public creatVertexShader(source: string): Shader {
            var shader: WebGLShader = this.gl.createShader(this.gl.VERTEX_SHADER);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            var tmpShader: BlackSwan.openGLES.Shader = new BlackSwan.openGLES.Shader(shader);
            tmpShader.id = BlackSwan.openGLES.Shader.ID_COUNT++;
            return tmpShader;
        }

        public creatFragmentShader(source: string): Shader {
            var shader: WebGLShader = this.gl.createShader(this.gl.FRAGMENT_SHADER) ;
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            var tmpShader: BlackSwan.openGLES.Shader = new BlackSwan.openGLES.Shader(shader );
            tmpShader.id = BlackSwan.openGLES.Shader.ID_COUNT++;
            return tmpShader;
        }

        /**
        * 清除渲染区域的颜色 深度
        **/
        public clear(r: number, g: number, b: number, a: number) {
            this.gl.clearColor(r, g, b, a);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
            //console.log( "clean" , r , g, b, a );
        }

        public clearDepth(depth: number) {
            this.gl.clearDepth(depth);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }

        public clearStencil(stencil: number) {
            this.gl.clearStencil(stencil);
        }

        /**
        * 使用显卡着色器
        **/
        public setProgram(program: IProgram3D) {
            this.gl.useProgram( program.program );
        }

        /**
        * 获取矩阵变量ID
        **/
        public getUniformLocation(programe3D: IProgram3D, name: string): any {

            return this.gl.getUniformLocation(programe3D.program, name);
        }
        public uniform1f(location: any, x: number): void {
            this.gl.uniform1f(location, x);
        }
        public uniform1fv(location: any, v: any): void {
            this.gl.uniform1fv(location, v);
        }
        public uniform1i(location: any, x: number): void {
            this.gl.uniform1i(location, x);
        }
        public uniform1iv(location: any, v: Int32Array): void {
            this.gl.uniform1iv(location, v);
        }
        public uniform2f(location: any, x: number, y: number): void {
            this.gl.uniform2f(location, x, y);
        }
        public uniform2fv(location: any, v: any): void {
            this.gl.uniform2fv(location, v);
        }
        public uniform2i(location: any, x: number, y: number): void {
            this.gl.uniform2i(location, x, y);
        }
        public uniform2iv(location: any, v: Int32Array): void {
            this.gl.uniform2iv(location, v);
        }
        public uniform3f(location: any, x: number, y: number, z: number): void {
            this.gl.uniform3f(location, x, y, z);
        }
        public uniform3fv(location: any, v: any): void {
            this.gl.uniform3fv(location, v);
        }
        public uniform3i(location: any, x: number, y: number, z: number): void {
            this.gl.uniform3i(location, x, y, z);
        }
        public uniform3iv(location: any, v: Int32Array): void {
            this.gl.uniform3iv(location, v);
        }
        public uniform4f(location: any, x: number, y: number, z: number, w: number): void {
            this.gl.uniform4f(location, x, y, z, w);
        }
        public uniform4fv(location: any, v: any): void {
            this.gl.uniform4fv(location, v);
        }
        public uniform4i(location: any, x: number, y: number, z: number, w: number): void {
            this.gl.uniform4i(location, x, y, z, w);
        }
        public uniform4iv(location: any, v: Int32Array): void {
            this.gl.uniform4iv(location, v);
        }
        public uniformMatrix2fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix2fv(location, transpose, value);
        }
        public uniformMatrix3fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix3fv(location, transpose, value);
        }
        public uniformMatrix4fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix4fv(location, transpose, value);

        }

        /**
        * 设置 绘制混合模式
        **/
        public setBlendFactors(src: number, dst: number) {
            this.gl.blendFunc(src, dst);
        }

        /**
        * 设置 绘制剔除模式
        **/
        public setCulling(mode: number) {
            this.gl.cullFace( mode );
        }

        /**
        * 开启 绘制模式
        * this.contex3D.DEPTH_TEST);
        **/
        public enbable(cap: number) {
            this.gl.enable(cap);
        }

        /**
    * 开启 绘制模式
    * this.contex3D.DEPTH_TEST);
    **/
        public disable(cap: number) {
            this.gl.disable(cap);
        }

        /**
        * 开启 深度模式 及 深度测试比较模式
        **/
        public enableDepthTest(flag: boolean, compareMode: number=0) {
            if (flag)
                this.gl.enable(this.gl.DEPTH_TEST);
        }

        /**
        * 获取顶点着色器变量 索引
        **/
        public getShaderAttribLocation(programe: IProgram3D, attribName: string):any {
            programe.vertextAttrib[attribName] = this.gl.getAttribLocation(programe.program, attribName);
            return programe.vertextAttrib[attribName];
        }

        /**
        * 指定顶点着色器变量索引 及机构
        **/
        public vertexAttribPointer(programe3D: IProgram3D,index: number, size: number, dataType: number, normalized: boolean, stride: number, offset: number) {
            this.gl.vertexAttribPointer(index, size, dataType, normalized, stride, offset);
            this.gl.enableVertexAttribArray(index);  
        }

        /**
        * 实时传入显卡顶点着色器变量数组数据
        **/
        public setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number) {
            this.gl.vertexAttrib4fv(offest, floats.subarray(offest, numLen));
        }

        /**
        * 实时传入显卡片段着色器变量数组数据
        **/
        public setFragmentShaderConstData(floats: Float32Array, offest: number, numLen: number) {
        }

        /**
        * 设置贴图采样
        **/
        public setTexture2DAt(samplerType: any, index: number, uniLocation: number, texture: Texture2D) {
            //this.gl.activeTexture(index);
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.gpu_texture);
            this.gl.uniform1i(uniLocation, index);
        } 

        public setCubeTextureAt(samplerType: any, index: number, uniLocation: number, texture: ICubeTexture) {
            //this.gl.activeTexture(index);
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture.gpu_texture);
            this.gl.uniform1i(uniLocation, index);
        } 

        /**
        * 设置贴图采样模式
        **/
        public samplerState(sampler: number, wrap: string, filter: string, mipfilter: String) {
        }

        /**
        * 设置矩形裁切区域
        **/
        public setScissorRectangle(rectangle: Rectangle) {
        }

        /**
        * 设置模板测试
        **/
        public setStencilReferenceValue() {
        }

        //drawInBackBuffer(type:number, indexBuffer);

        public bindVertexBuffer(vertexBuffer: VertexBuffer3D ) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer.buffer);
        }

        /**
        * 绘制模型元素
        **/
        public drawElement(type: number, indexBuffer: IndexBuffer3D, offset: number, length: number) {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer );
            this.gl.drawElements(type, length, this.gl.UNSIGNED_SHORT, offset);
        }

        /**
        * 绘制提交
        **/
        public flush() {
            this.gl.flush();
        }

    }
}




