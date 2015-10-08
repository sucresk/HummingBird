module BlackSwan {
    export class LineFrame extends RenderableItem {

        protected _geomtry: GeomtryBase;
        protected _material: MaterialBase;

        constructor(geomtry: GeomtryBase, material: MaterialBase) {
            super();

            this._geomtry = geomtry;
            this._material = material;
            this.box.fillBox(this._geomtry.minPos, this._geomtry.maxPos);
        }

        public get geomtry() {
            return this._geomtry;
        }

        public activateDiffusePass(context3D: Context3D, camera3D: Camera3D) {
            this._material.initShader(context3D, this._geomtry, this._animation);
            //this._geomtry.activate(context3D, this.transform, camera3D);
            //this._material.activateDiffusePass(context3D, this.transform, camera3D);
        }

        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D) {
            context3D.enableDepthTest(true, 0);
            context3D.enbable(Egret3D.BLEND);

            //this._geomtry.updata(context3D, this.transform, camera3D);
            //this._material.renderDiffusePass(context3D, this.transform, camera3D);
            context3D.drawElement(Egret3D.TRIANGLES, this._geomtry.sharedIndexBuffer, 0, this._geomtry.numItems);
        }
    }
} 