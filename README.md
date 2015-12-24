# HummingBird
#Egret3D v3.0 #

####Egret3D 是白鹭引擎全新打造的基于Html5 标准研发的 3D引擎，内容包含了3D硬件渲染引擎，和未来计划中的游戏功能模块引擎。也就是说，只要浏览器支持webgl的地方，就能运行Egret3D ，在跨平台方面也是极其不错的。

##Egret3D v3.0 新功能##


- 模型系统)  模型系统  Egret3D封装了自己的引擎静态模型，及动画模型。并提供了3Dmax 导出插件，也就是说支持任意3D模型格式。

- 材质系统) 根据自己的渲染风格可编辑材质球参数或者加入对应的材质特效。

- 灯光系统) 支持TBN 直接光照系统，在未来，还会支持间接光照，提高光影效果。

- 动画系统) 支持了3Dmax中高级骨骼动画，及相机动画。满足绝大部分游戏需要。

- 粒子系统) 丰富高效的粒子系统是一个引擎的一大标准，同样Egret3D粒子引擎拥有强大的可编辑功能，更高级的粒子功能拓展

- shadow系统) 阴影系统,提高渲染效果，增强渲染视觉真实感。

- shader系统) 原生webgl shader ，基于OpenGL ES2.0 标准，并与引擎功能紧密结合及拓展。并与未来shader编辑器做好了铺垫。

###3DMax export ###
![1]
###lightmap ###
![3]
![4]
###particle###
![5]
###sample###

    #!javascript
    var mesh:Egret3D.Mesh = new Egret3D.Mesh( new Egret3D.CubeGeometry(50, 50, 50) ,new Egret3D.TextureMaterial() )



 [1]: http://sedn.egret.com/asset/20151224/567b9e15dffc1.png
 [2]: http://sedn.egret.com/asset/20151224/567b9a655abec.png
 [3]: http://sedn.egret.com/asset/20151224/567b9a64e27b5.png
 [4]: http://sedn.egret.com/asset/20151224/567b9a65123e0.png
 [5]: http://sedn.egret.com/asset/20151224/567b9a65439fa.png

 
