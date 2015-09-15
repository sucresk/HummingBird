module BlackSwan {
    export class RenderBase {

        protected _context3D: Context3D;

        public set context3D(context3D: Context3D) {
            this._context3D = context3D;
        }

        public get context3D(): Context3D {
            return this._context3D;
        }

        public renden(collect: CollectBase, camera3D: Camera3D) {


        }
    }
} 