module Egret3D {
    export class OrientationControler {
        private acc: DeviceAcceleration;
        private accGravity: DeviceAcceleration;
        private rotationRate: DeviceRotationRate;
        private orientation: Vector3D = new Vector3D();
        private screenOrientation: number = 0; 

        private openDebug: boolean = false; 
        private accDiv: HTMLElement;
        private accGravityDiv: HTMLElement;
        private rotationRateDiv: HTMLElement;
        private orientationRateDiv: HTMLElement;
        private stateDiv: HTMLElement;

        public offsetRotation: Vector3D = new Vector3D();
        constructor() {
            if (this.openDebug) {
                this.accDiv = document.createElement("div");
                this.accGravityDiv = document.createElement("div");
                this.rotationRateDiv = document.createElement("div");
                this.orientationRateDiv = document.createElement("div");
                this.stateDiv = document.createElement("div");

                this.accDiv.style.color = "red";
                this.accGravityDiv.style.color = "red";
                this.rotationRateDiv.style.color = "red";
                this.orientationRateDiv.style.color = "red";
                this.stateDiv.style.color = "red";
                this.stateDiv.style.fontSize = "52";

                document.body.appendChild(this.accDiv);
                document.body.appendChild(this.accGravityDiv);
                document.body.appendChild(this.rotationRateDiv);
                document.body.appendChild(this.orientationRateDiv);
                document.body.appendChild(this.stateDiv);
            }
        }

        public start() {
            this.orientationchangeHandler();
            window.addEventListener("orientationchange", () => this.orientationchangeHandler());
            window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.motionHandler(e));
            window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.orientationHandler(e));
        }

        public stop() {
            window.removeEventListener("orientationchange", () => this.orientationchangeHandler());
            window.removeEventListener("devicemotion", (e: DeviceMotionEvent) => this.motionHandler(e));
            window.removeEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.orientationHandler(e));
        }

        public orientationchangeHandler() {
            if (window.orientation != undefined)
                this.screenOrientation = <number>window.orientation ;
            //.this.state = window.orientation;
        }

        public motionHandler(event: DeviceMotionEvent) {
            this.acc = event.acceleration;
            this.accGravity = event.accelerationIncludingGravity;
            this.rotationRate = event.rotationRate;
        }

        public orientationHandler(event: DeviceOrientationEvent) {
            this.orientation.x = event.alpha;
            this.orientation.y = event.beta;
            this.orientation.z = event.gamma;

         
            if (this.openDebug)
                this.debug();
        }


        public fixOritation: Vector3D = new Vector3D();
        private state: number = -1;
        private debug() {
            //this.accDiv.innerHTML = "<br><br><br> acc-x:" + this.acc.x + "<br>acc-y:" + this.acc.y + "<br>acc-z:" + this.acc.z ;
            this.accGravityDiv.innerHTML = "<br><br> Gravity-x:" + this.orientation.x* Matrix3DUtils.RADIANS_TO_DEGREES + "<br>Gravity-y:" + this.orientation.y + "<br>Gravity-z:" + this.orientation.z;
            //this.rotationRateDiv.innerHTML = "<br> Rate-x:" + this.rotationRate.alpha + "<br>Rate-y:" + this.rotationRate.gamma + "<br>Rate-z:" + this.rotationRate.beta;
            this.orientationRateDiv.innerHTML = "<br> orientation-x:" + this.fixOritation.x  + "<br>orientation-y:" + this.fixOritation.y + "<br>orientation-z:" + this.fixOritation.z;
            //this.orientationRateDiv.innerHTML = "<br> orientation-x:" + this.fixOritation.x * Matrix3DUtils.RADIANS_TO_DEGREES + "<br>orientation-y:" + this.fixOritation.y * Matrix3DUtils.RADIANS_TO_DEGREES + "<br>orientation-z:" + this.fixOritation.z * Matrix3DUtils.RADIANS_TO_DEGREES;
            this.stateDiv.innerHTML = "<br> state: " + this.state; 
        } 

        public getOrientation(): number {
            switch ( window.screen.msOrientation ) {
                case 'landscape-primary':
                    return -90;
                case 'landscape-secondary':
                    return 90;
                case 'portrait-secondary':
                    return 180;
                case 'portrait-primary':
                    return 0;
            }
            // this returns 90 if width is greater then height 
            // and window orientation is undefined OR 0
            // if (!window.orientation && window.innerWidth > window.innerHeight)
            //   return 90;
            return <number>window.orientation || 0;
        };

        private degtorad = Math.PI / 180; // Degree-to-Radian conversion
        private q: Quaternion = new Quaternion();
        private q1: Quaternion = new Quaternion();
        private outQ: Quaternion = new Quaternion();
        public getQuaternion(alpha: number, beta: number, gamma: number): Quaternion {

            var _x = beta ? beta * this.degtorad : 0; // beta value
            var _y = gamma ? gamma * this.degtorad : 0; // gamma value
            var _z = alpha ? alpha * this.degtorad : 0; // alpha value
            var orient = -this.getOrientation() * this.degtorad ;// this.getOrientation()) * this.degtorad ; // O
            this.state = this.getOrientation(); 

            var cX = Math.cos(_x / 2);
            var cY = Math.cos(_y / 2);
            var cZ = Math.cos(_z / 2);
            var sX = Math.sin(_x / 2);
            var sY = Math.sin(_y / 2);
            var sZ = Math.sin(_z / 2);

            //this.q1.fromAxisAngle(Vector3D.Y_AXIS, alpha * this.degtorad);
            //
            // ZXY quaternion construction.
            //
            this.q.w = cX * cY * cZ - sX * sY * sZ;
            this.q.x = sX * cY * cZ - cX * sY * sZ;
            this.q.y = cX * sY * cZ + sX * cY * sZ;
            this.q.z = cX * cY * sZ + sX * sY * cZ;

            var zee: Vector3D = new Vector3D(0, 0, 1);
            var q0: Quaternion = new Quaternion();
            q0.fromAxisAngle(zee, orient );
            this.q.multiply(this.q, q0);                                      // camera looks out the back of the device, not the top

            zee.setTo(-1, 0, 0);
            q0.fromAxisAngle(zee, 90 * this.degtorad  );
            this.q.multiply(this.q, q0);   
            return this.q ;
        }

        private front: Vector3D = new Vector3D(0, 0, 200);
        private test: Vector3D = new Vector3D();
        public update(camera3D: Camera3D) {
            this.getQuaternion(this.orientation.x, this.orientation.y, this.orientation.z);
            this.q.toEulerAngles(this.fixOritation);

            camera3D.rotationX = -this.fixOritation.x * Matrix3DUtils.RADIANS_TO_DEGREES + this.offsetRotation.x; 
            camera3D.rotationZ = -this.fixOritation.y * Matrix3DUtils.RADIANS_TO_DEGREES + this.offsetRotation.z; 
            camera3D.rotationY = -this.fixOritation.z * Matrix3DUtils.RADIANS_TO_DEGREES + this.offsetRotation.y; 
        }
    }
} 