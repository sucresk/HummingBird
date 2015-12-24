module Egret3D {
                
    /**
    * @class Egret3D.Mesh
    * @classdesc
    * 3d模型 生成渲染模型
    */
    export class Mesh extends Object3D {
                
        /**
        * @language zh_CN
        * constructor
        * @param geometry 模型数据
        * @param material 模型材质
        * @param animation 模型动画
        */
        constructor(geometry: GeometryBase, material: MaterialBase, animation: IAnimation = null) {
            super();

            this.geometry = geometry;
            this.material = material;
            this.animation = animation;
            this.box.fillBox(this.geometry.minPos, this.geometry.maxPos);
        }
                        
        /**
        * @language zh_CN
        * 克隆一个模型
        * @returns 克隆后的模型
        */
        public clone(): Mesh {
            return new Mesh(this.geometry, this.material, this.animation ? this.animation.clone() : null );
        }
                                
        /**
        * @language zh_CN
        * 数据更新
        * @param time 当前时间
        * @param delay 间隔时间
        */
        public update(time: number, delay: number) {

            if (this.isDisable)
                return;

            if (this.animation) {
                this.animation.updata(time, delay);
            }
        }
    }
} 