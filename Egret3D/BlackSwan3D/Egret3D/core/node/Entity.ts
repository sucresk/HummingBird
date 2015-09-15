module BlackSwan {
    export class Entity extends Object3D{
        public bound: any;
        public canPick: boolean;
        public renderLayer: number;

        constructor() {
            super();
        }

    }
} 