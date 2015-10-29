module Egret3D.Gui {
    export class GuiData {
        public static LIGHT: Object = {
            "intensity": 0.1,
            "constantAttenuation": 0.1,
            "linearAttenuation": 0.1,
            "quadraticAttenuation": 0.1,
            "x": 0.1,
            "y": 0.1,
            "z": 0.1,
            "color":"#00ffee",
        }

    }



    export class GuiPanel{

        private _listeners: Array<Function> = new Array<Function>();

        private _gui: dat.GUI;
        private _data: Object = {};

        constructor(gui: dat.GUI) {
            this._gui = gui;
        }


        public addComponent(data: Object, onChangeHandler: Function, onFinishChangeHandler: Function, minValue: number, maxValue: number, stepValue: number) {

            for (var i in data) {

                this._data[i] = data[i];

                if ((this._data[i].toString()).indexOf('#') >= 0) {
                    this.addColor(i, this._data[i], onChangeHandler, onFinishChangeHandler);
                }
                else {
                    this.addGUI(i, minValue, maxValue, stepValue, onChangeHandler, onFinishChangeHandler);
                }

            }
        }

        public init(data: Object, onChangeHandler: Function, onFinishChangeHandler:Function, minValue: number, maxValue: number, stepValue: number) {
            this._data = data;

            for (var i in this._data) {
                if ((this._data[i].toString()).indexOf('#') >= 0) {
                    this.addColor(i, this._data[i], onChangeHandler, onFinishChangeHandler);
                }
                else {
                    this.addGUI(i, minValue, maxValue, stepValue, onChangeHandler, onFinishChangeHandler);
                }
               
            } 
        }

        public addColor(key: string, defaultColor: string, onChangeHandler: Function, onFinishChangeHandler:Function=null,folderGui?: dat.GUI): void {
            this._data[key] = defaultColor;
            var gui: dat.GUI;
            if (folderGui == null)
                gui = this._gui;
            else
                gui = folderGui;

            var controller = gui.addColor(this._data, key, defaultColor);

            controller.onChange(function (value) {
                if (onChangeHandler != null) {
                    var sRgbColor = StringUtil.colorRgb(value);
                    onChangeHandler(key, sRgbColor);
                }

            });

            controller.onFinishChange(function (value) {
                if (onFinishChangeHandler != null) {
                    value = value.replace('#', '0x');
                    value.colrRgb();
                    onFinishChangeHandler(key, value);
                }
                else if (onChangeHandler != null) {
                    value = value.replace('#', '0x');
                    value.colrRgb();
                    onChangeHandler(key,value);
                }

            });

        }

        public addList(key: string, items: string[], onChangeHandler: Function, folderGui?: dat.GUI): void {
            this._data[key] = items;
            var gui: dat.GUI;
            if (folderGui == null)
                gui = this._gui;
            else
                gui = folderGui;

            var controller = gui.add(this._data, key, items);

            controller.onChange(function (value) {
                if (onChangeHandler != null) {
                    onChangeHandler(key, value);
                }

            });

        }


        public addCheckBox(key: string, status:boolean,onChangeHandler: Function, folderGui?: dat.GUI): void {
            this._data[key] = status;
            var gui: dat.GUI;
            if (folderGui == null)
                gui = this._gui;
            else
                gui = folderGui;

            var controller = gui.add(this._data, key, status);

            controller.onChange(function (value) {
                if (onChangeHandler != null) {
                    onChangeHandler(key, value);
                }

            });

        }

        public addGUI(key: string, minValue: number, maxValue: number, stepValue: number, onChangeHandler: Function, onFinishChangeHandler:Function=null,folderGui?: dat.GUI): void {
            this._data[key] = minValue;
            var gui: dat.GUI;
            if (folderGui == null)
                gui = this._gui;
            else
                gui = folderGui;

            var controller = gui.add(this._data, key, minValue, maxValue).step(stepValue);

            controller.onChange(function (value) {
                if (onChangeHandler != null) {
                    onChangeHandler(key,value);
                }

            });

            controller.onFinishChange(function (value) {

                if (onFinishChangeHandler != null){
                    onFinishChangeHandler(key, value);
                }
                else if (onChangeHandler != null) {
                    onChangeHandler(key,value);
                }

            });
        }


        public createFolder(folderName: string): dat.GUI {
            return this._gui.addFolder(folderName);
        }


    }


    export class StatsDisplay {

        private _stats: Stats;

        constructor() {
            this._stats = new Stats();
            this._stats.domElement.style.position = 'absolute';
            this._stats.domElement.style.left = '0px';
            this._stats.domElement.style.top = '0px';
            this._stats.domElement.style.zIndex = '100';
            document.body.appendChild(this._stats.domElement);
        }

        public update(): void {
            this._stats.update();
        }

        private static _instance: StatsDisplay = null;

        public static get instance(): StatsDisplay {
            if (this._instance == null) {
                this._instance = new StatsDisplay();
            }
            return this._instance;
        }
    }

}