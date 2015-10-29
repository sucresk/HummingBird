module BlackSwan {
    export class LightGroup {

        public lightNum: number = 0;
        public directLightList: Array<DirectLight>;
        public spotLightList: Array<SpotLight>;
        public pointLightList: Array<PointLight>;

        constructor() {
            this.directLightList = new Array<DirectLight>();
            this.spotLightList = new Array<SpotLight>();
            this.pointLightList = new Array<PointLight>();
        }

        public addDirectLight(light: DirectLight) {
            this.directLightList.push(light);
            this.lightNum++;
        }

        public addSpotLight(light: SpotLight) {
            this.spotLightList.push(light);
            this.lightNum++;
        } 

        public addPointLight(light: PointLight) {
            this.pointLightList.push(light);
            this.lightNum++;
        }

    }
} 