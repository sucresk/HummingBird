module Egret3D {

    export enum RenderType {
        defaultRender,
        positionRender,
        normalRender,
        specularRender,
        shadowRender
    }

    export class RenderManager {

        private static renders: Object = new Object();

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