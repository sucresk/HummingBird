module BlackSwan {
    export class RoundControl extends CameraControllerBase {

        private m_firlst: HoverController;
        private m_mouseDown: boolean;
        private lastPanAngle: number;
        private lastTiltAngle: number;
        private lastMouseX: number;
        private lastMouseY: number;
        private m_rec: Rectangle;
        private _far: number = 1000;

        constructor(view3d: View3D) {
            super(view3d);
            this.initView();
        }

        private initView() {
            this.m_rec = new Rectangle(0, 90, this._view3d.width - 300, this._view3d.height - 80);

            this.m_firlst = new HoverController(this._view3d.camera3D);
            this.m_firlst.distance = this._far;
            this.m_firlst.minTiltAngle = 0;
            this.m_firlst.maxTiltAngle = 90;
            this.m_firlst.panAngle = 45;
            this.m_firlst.tiltAngle = 20;
            this.m_firlst.lookAtPosition = new Vector3D(0, 35, 0);
        }

        public start(angle: number, distance: number, wide: number, locked: boolean, lockRect: Rectangle) {
            super.start(angle, distance, wide, locked, lockRect);
            window.onmousewheel = (e: MouseWheelEvent) => this.__WHEELHandler(e);
            window.onmousedown = (e: MouseEvent) => this.__rightDownHandler(e);
            window.onmouseup = (e: MouseEvent) => this.__rightUpHandler(e);
            //window.onmousemove = (e: MouseEvent) => this.__upDataHandler(e);
        }

        public stop() {
            window.onmousewheel =   null ;
            window.onmousedown =    null ;
            window.onmouseup =      null ;
            window.onmousemove = null;
        }

        //private  checkZoon():boolean {
        //    this.m_rec.x = this._view3d.x;
        //    this.m_rec.y = this._view3d.y;
        //    this.m_rec.width = this._view3d.width;
        //    this.m_rec.height = this._view3d.height;
        //    return this.m_rec.contains(_stage.mouseX, _stage.mouseY);
        //}

        protected  __WHEELHandler(event: MouseWheelEvent) {
            //			if( UICanvas.mouse2D ) return ;
			
            this._far -= event.wheelDelta*0.1;
            //			if( _far > 150 )
            //				_far = 150 ;
            //			else if( _far < 35 )
            //				_far = 35 ;
			
            //			TweenMax.to( m_firlst , 0.2 , {distance:_far} );
            this.m_firlst.distance = this._far;
        }

        protected  __rightUpHandler(event: MouseEvent) {
            this.m_mouseDown = false;
        }

        protected  __upDataHandler(event: MouseEvent) {
            //			if( m_mouseDown )
            //				m_firlst.update()
            if (this.m_mouseDown) {
                this.m_firlst.panAngle = 0.3 * (event.screenX - this.lastMouseX) + this.lastPanAngle;
                this.m_firlst.tiltAngle = 0.3 * (event.screenY - this.lastMouseY) + this.lastTiltAngle;
            }
            this.m_firlst.update();
        }


        protected  __rightDownHandler(event: MouseEvent) {
            //if (!checkZoon()) return;
            //			if( !m_rec.contains( _stage.mouseX , _stage.mouseY ) || UICanvas.mouse2D ) return ;
            if (event.button==2){
                this.lastPanAngle = this.m_firlst.panAngle;
                this.lastTiltAngle = this.m_firlst.tiltAngle;
                this.lastMouseX = event.screenX;
                this.lastMouseY = event.screenY;
                this.m_mouseDown = true;
            }

        }

        public update(timer: number, elapsed: number): void {
            this.m_firlst.update();
        }

    }
}