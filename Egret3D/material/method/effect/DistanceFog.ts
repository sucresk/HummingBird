module Egret3D {
    export class DistanceFog extends EffectMethod {

        private _fogColor: number = 0xffffffff ;
        private _globalDensity: number = 1 ;
        //private _startDistance: Point = new Point(200, 1000);
        //private _height: Point = new Point(200,3000) ;
        private _startDistance:number = 500;
        private _distanceScale:number = 0.1;
        private _height: number = 500;
        private _heightScale: number = 0.1;
        private _data: Float32Array;
        constructor() {
            super();
            this.fsMethodName = "distanceFog_fragment";
            this._data = new Float32Array(8);

            this.fogColor = this._fogColor;
            this.globalDensity = this._globalDensity;
        }

        public set fogColor(value: number) {
            this._fogColor = value;
            this._data[0] = (value >> 16 & 0xff) / 255;
            this._data[1] = (value >> 8 & 0xff) / 255;
            this._data[2] = (value & 0xff) / 255;
        }

        public get fogColor(): number {
            return this._fogColor; 
        }

        public set globalDensity(value: number) {
            this._globalDensity = value; 
            this._data[3] = value;
        }

        public get globalDensity(): number {
            return this._globalDensity;
        }

        public set startDistance(value: number) {
            this._startDistance = value; 
            this._data[4] = value;
        }

        public get startDistance(): number {
            return this._startDistance;
        }

        public set distanceScale(value: number) {
            this._distanceScale = value;
            this._data[5] = value;
        }

        public get distanceScale(): number {
            return this._distanceScale;
        }

        //public set heightDistance(value: Point) {
        //    this._height = value; 
        //    this._data[6] = value.x;
        //    this._data[7] = value.y;
        //}

        //public get heightDistance(): Point {
        //    return this._height;
        //}

        public activateEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            this.context3D = context3D;
            usage["uniform_globalFog"] = context3D.getUniformLocation(usage.program3D, "uniform_globalFog");
        }

        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            context3D.gl.uniform1fv(usage["uniform_globalFog"], this._data);
        }

        public dispose() {
        }
    }
} 