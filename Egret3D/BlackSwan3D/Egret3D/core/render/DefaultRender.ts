module BlackSwan {

    export class DefaultRender extends RenderBase {

        private _renderIndex: number = 0;
        private _numEntity: number = 0; 
        private _renderList: Array<Object3D>;

        constructor() {
              super();
        }

        public renden(context3D: Context3D,collect: CollectBase, camera3D: Camera3D) {

            this._renderList = collect.renderList;

            this._numEntity = this._renderList.length;

            for (this._renderIndex = 0; this._renderIndex < this._numEntity ; this._renderIndex++){

                (<Mesh>this._renderList[this._renderIndex]).rendenDiffusePass(context3D, camera3D);
                
            }

        }

    }
} 