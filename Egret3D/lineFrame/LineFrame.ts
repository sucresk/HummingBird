module Egret3D {
    export class LineFrame extends Object3D {

        protected _geometry: GeometryBase;
        protected _material: MaterialBase;

        constructor(geometry: GeometryBase, material: MaterialBase) {
            super();

            this._geometry = geometry;
            this._material = material;
            this.box.fillBox(this._geometry.minPos, this._geometry.maxPos);
        }

        public get geomtry() {
            return this._geometry;
        }

        public activateDiffusePass(context3D: Context3D, camera3D: Camera3D) {
            //this._material.ini(context3D, this._geomtry, this._animation);
            //this._geomtry.activate(context3D, this.transform, camera3D);
            //this._material.activateDiffusePass(context3D, this.transform, camera3D);
        }

        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D) {
            context3D.enableDepthTest(true, 0);
            context3D.enbable(Egret3DDrive.BLEND);

            //this._geomtry.updata(context3D, this.transform, camera3D);
            //this._material.renderDiffusePass(context3D, this.transform, camera3D);
            context3D.drawElement(DrawMode.LINES, this._geometry.sharedIndexBuffer, 0, this._geometry.numItems);
        }
    }
} 