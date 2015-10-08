module BlackSwan {
    export class Mesh extends RenderableItem {

        protected _geomtry: GeomtryBase;
        protected _material: MaterialBase;

        
        constructor(geomtry: GeomtryBase, material: MaterialBase) {
            super();

            this._geomtry = geomtry;
            this._material = material;
            this.box.fillBox(this._geomtry.minPos, this._geomtry.maxPos);
        }

        public set material(mat: MaterialBase) {
            this._material = mat;
        }

        public get material(): MaterialBase {
            return this._material;
        }

        public get geomtry() {
            return this._geomtry;
        }

        public activateDiffusePass(context3D: Context3D, camera3D: Camera3D) {
            this._material.initShader(context3D, this._geomtry, this._animation);
            this._geomtry.activate(context3D, this.modelMatrix , camera3D);
            this._material.activateDiffusePass(context3D, this.modelMatrix , camera3D);
        }

        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D) {
            if (this._active) {
                context3D.enableDepthTest(true, 0);
                context3D.enbable(Egret3D.BLEND);

                this._geomtry.updata(context3D, this.modelMatrix, camera3D);
                this._material.renderDiffusePass(context3D, this.modelMatrix, camera3D);

                context3D.drawElement(Egret3D.TRIANGLES, this._geomtry.sharedIndexBuffer, 0, this._geomtry.numItems);
            } else {
                this._active = true;
                this.activateDiffusePass(context3D, camera3D);
            }
        }

        //public activePositionRenderDraw(context3D: Context3D, camera3D: Camera3D) {

        //}

        //public activeNormalRenderDraw(context3D: Context3D, camera3D: Camera3D) {

        //}

        //public activeDepthRenderDraw(context3D: Context3D, camera3D: Camera3D) {

        //}
    }
} 