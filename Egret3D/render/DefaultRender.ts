module BlackSwan {

    export class DefaultRender extends RenderBase {

        private _renderIndex: number = 0;
        private _numEntity: number = 0; 
        private _renderList: Array<Entity>;

        public renden(collect: CollectBase, camera3D: Camera3D) {

            this._renderList = collect.renderList;

            this._numEntity = this._renderList.length;

            for (this._renderIndex = 0; this._renderIndex < this._numEntity ; this._renderIndex++){

                this._renderList[this._renderIndex].active(camera3D);
                
            }

        }

    }
} 