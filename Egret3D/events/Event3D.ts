module Egret3D {
    
    export class Event3D {
        public eventType: string;
        public target: any;
        public currentTarget: any;
        public data: any;

        private bubble: boolean;
        constructor(eventType: string, bubble: boolean=false ) {
            this.eventType = eventType;
            this.bubble = bubble;
        }
    }
}