module Egret3D {
    export enum RenderType {
        defaultRender,
        positionRender,
        normalRender,
        specularRender,
        shadowRender
    }
                                
    /**
    * @class Egret3D.RenderManager
    * @classdesc
    * 渲染器管理,管理所有的渲染器对象
    */
    export class RenderManager {

        private static renders: Object = new Object();
                        
        /**
        * @language zh_CN
        * 以渲染类型拿到渲染器
        * @param renderType 渲染类型
        */
        public static getRender(renderType: RenderType): RenderBase {

            if (this.renders[renderType]) 
                return this.renders[renderType];

            return this.creatSystemRender(renderType);

        }

        private static creatSystemRender(renderType: RenderType): RenderBase {

            var render: RenderBase;

            switch (renderType) {

                case RenderType.defaultRender:
                    render = new DefaultRender();
                    break; 

                case RenderType.positionRender:
                    render = new PositionRender();
                    break; 

                case RenderType.normalRender:
                    render = new NormalRender();
                    break; 

                case RenderType.specularRender:
                  ///  render = new NormalRender();
                    break; 

                case RenderType.shadowRender:
                    render = new ShadowRender();
                    break; 

            }

            this.renders[renderType] = render;
            return render; 
        }
    }
} 