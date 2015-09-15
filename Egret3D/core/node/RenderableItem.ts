module BlackSwan {
    export class RenderableItem extends Entity{

        protected _animation: IAnimation ;
        protected _geomtry: GeomtryBase;
        protected _material: MaterialBase;

        constructor() {
            super();
        }

        /**
        * View3D render detection through to render
        */

        /**
        * Activate the render target attribute
        */
        public activateDiffusePass(context3D: Context3D, camera3D: Camera3D) {
        }
        
        /**
        * updata the render target state
        */
        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D) {
        }

         
    }
}