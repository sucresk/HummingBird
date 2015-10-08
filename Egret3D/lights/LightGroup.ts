module BlackSwan {
    export class LightGroup {

        public lightNum: number = 0;
        public lights: Array<LightBase>;
        constructor() {
            this.lights = new Array<LightBase>();
        }

        public addLight(light: LightBase) {
            this.lights.push(light);
            this.lightNum = this.lights.length;
        }
    }
} 