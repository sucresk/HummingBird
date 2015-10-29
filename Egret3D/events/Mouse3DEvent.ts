module Egret3D {
    export class Mouse3DEvent {
        public static left_mouse_over: string = "left_mouse_over" ;
        public static left_mouse_down: string = "left_mouse_down";
        public static left_mouse_up: string = "left_mouse_up";
        public static left_mouse_click: string = "left_mouse_click";

        public static right_mouse_over: string = "right_mouse_over";
        public static right_mouse_down: string = "right_mouse_down";
        public static right_mouse_up: string = "right_mouse_up";
        public static right_mouse_click: string = "right_mouse_click";

        public static middle_mouse_over: string = "middle_mouse_over";
        public static middle_mouse_down: string = "middle_mouse_down";
        public static middle_mouse_up: string = "middle_mouse_up";
        public static middle_mouse_click: string = "middle_mouse_click";

        public static mouse_move: string = "mouse_move";

        public type: string;
        public data: PickResult;
        constructor() {
        }
    }
} 