Egret3D 结构设置
引擎层--------------Stage----gpu  
    |-粒子系统        |-opengl  
    |-碰撞检测        |-matel  
    |-etc  

Egret3D 
需要实现类定义
display
------------------
*Stage3D;  

display3D
------------------------
*Context3D;  
*Context3DBlendFactor;  
*Context3DBufferUsage;  
*Context3DClearMask;  
*Context3DCompareMode;  
*Context3DFillMode;  
*Context3DMipFilter;  
*Context3DProfile;  
*Context3DProgramType;  
*Context3DRenderMode;  
*Context3DStencilAction;  
*Context3DTextureFilter;  
*Context3DTextureFormat;  
*Context3DTriangleFace;  
*Context3DVertexBufferformat;  
*Context3DWrapMode;  
*IndexBuffer3D;  
*Program3D;  
*VertexBuffer3D;  

display3D.textures
-------------------------------------
*CubeTextrue;  
*RectangleTextrue;  
*Textrue;  
*TextureBase;  
*VideoTextrue;  

==============================================

Jason Egret
===========

BUILD:
---------------------
* 用eclipse ADT直接打开 .project文件来build debug。
* 用build.bat直接build release。
  
* 需要的环境变量：
	* C:\Program Files (x86)\apache-ant-1.9.4\bin;
	* C:\Program Files (x86)\Java\jdk1.8.0_25\bin;
	* C:\Program Files (x86)\Android\android-sdk\tools;
	* C:\Program Files (x86)\Android\android-sdk\platform-tools;
	* C:\Program Files (x86)\Android\android-sdk\build-tools\21.1.2。
	* 以上第三方版本不限。

* 更改 MainActivity.blenderFile 来调试 APK打包过的blender文件或者 web上的 blender文件。
	
FEATURES:
---------------------
* 使用完整的blender文件作为runtime的工程文件，支持blender中目前几乎所有的游戏逻辑编辑功能，logic bricks，物理，渲染材质，文件打包。
* Android Multi-Touch支持。
* 支持在blender中写gles2 shader。参考assets/jason_demo.blend文件。
* 支持GPU渲染加速的简单GUI系统。
* 支持在blender中写lua脚本，控制整个runtime。


	
	