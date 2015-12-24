module Egret3D {
            
    /**
    * @language zh_CN
    * @class Egret3D.EventDispatcher
    * @classdesc
    * 事件触发器
    */
    export class EventDispatcher {
        listeners: any = {};

        /**
         * @language zh_CN
         * 派发一个 Event3D 事件到所有注册了特定类型侦听器的对象中。 
         * @param event {any} 事件类型
         */
        public dispatchEvent(event: any): void {
            var e: Event3D;
            var type: string;
            if (event instanceof Event3D) {
                type = event.type;
                e = event;
            } else {
                type = event;
                e = new Event3D(type);
            }

            if (this.listeners[type] != null) {
                e.currentTarget = this;
                for (var i: number = 0; i < this.listeners[type].length; i++) {
                    var listener: EventListener = this.listeners[type][i];
                    try {
                        listener.handler(e);
                    } catch (error) {
                        if (window.console) {
                            console.error(error.stack);
                        }
                    }
                }
            }
        }

        /**
        * @language zh_CN
        * 添加事件侦听器
        * @param type {string} 事件的类型。
        * @param callback {Function} 处理事件的侦听器函数。此函数必须接受 Event3D 对象作为其唯一的参数，并且不能返回任何结果，
        * 如下面的示例所示： function(evt:Event3D):void 函数可以有任何名称。
        * @param  priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
        * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
        */
        public addEventListener(type: string, callback: Function, priolity: number = 0): void {
            if (this.listeners[type] == null) {
                this.listeners[type] = [];
            }


            this.listeners[type].push(new EventListener(type, callback, priolity));
            this.listeners[type].sort(function (listener1: EventListener, listener2: EventListener) {
                return listener2.priolity - listener1.priolity;
            });
        }
        /**
         * @language zh_CN
         * 移除事件侦听器
         * @param type {string} 事件名
         * @param callback {Function} 侦听函数
         */
        public removeEventListener(type: string, callback: Function): void {
            if (this.hasEventListener(type, callback)) {
                for (var i: number = 0; i < this.listeners[type].length; i++) {
                    var listener: EventListener = this.listeners[type][i];
                    if (listener.equalCurrentListener(type, callback)) {
                        listener.handler = null;
                        this.listeners[type].splice(i, 1);
                        return;
                    }
                }
            }
        }
        /**
         * @language zh_CN
         * 移除所有事件侦听器
         */
        public clearEventListener(): void {
            this.listeners = {};
        }

        /**
        * @language zh_CN
        * 检测是否存在监听器
        * @param type {string} 
        * @returns {boolean}
        */
        public containEventListener(type: string): boolean {
            if (this.listeners[type] == null) return false;
            return this.listeners[type].length > 0;
        }

        /**
        * @language zh_CN
        * 检测是否存在监听器
        * @param type {string} 事件名
        * @param callback {Function} 处理事件的侦听器函数
        * @returns {boolean}
        */
        public hasEventListener(type: string, callback: Function): boolean {
            if (this.listeners[type] == null) return false;
            for (var i: number = 0; i < this.listeners[type].length; i++) {
                var listener: EventListener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    return true;
                }
            }
            return false;
        }
    }

    /**
    * @language zh_CN
    * @class Egret3D.EventListener
    * @classdesc
    * EventListener 类
    */
    class EventListener {
        /**
        * @language zh_CN
        * constructor
        * @param type {string} 事件的类型。
        * @param handler {Function} 处理事件的侦听器函数
        * @param  priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
        * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
        */
        constructor(public type: string = null, public handler: Function = null, public priolity: number = 0) {
        }

        /**
        * @language zh_CN
        * 比较两个事件是否相等
        * @param type {string} 事件的类型。
        * @param handler {Function} 处理事件的侦听器函数
        */
        public equalCurrentListener(type: string, handler: Function): boolean {
            if (this.type == type && this.handler == handler) {
                return true;
            }
            return false;
        }
    }

    export class Event3D {

        static EVENT_LOAD_COMPLETE: string = "load_complete";

        static MOUSE_CLICK = "onClick";
        static MOUSE_DOWN = "onMouseDown";
        static MOUSE_UP = "onMouseUp";
        static MOUSE_OVER = "onMouseOver";
        static MOUSE_OUT = "onMouseOut";
        static MOUSE_MOVE = "onMouseMove";

  
        static COMPLETE: string = "complete";
        static CHANGE_PROPERTY: string = "changeProperty";


        private _currentTarget: any;
        /**
        * @language zh_CN
        * 事件当前对象
        * @returns {any}
        */
        public get currentTarget():any {
            return this._currentTarget;
        }
        /**
        * @language zh_CN
        * 事件当前对象
        * @param value {any} 
        */
        public set currentTarget(value:any) {
            this._currentTarget = value;
        }


        private _type: string;
        /**
        * @language zh_CN
        * 事件类型
        * @returns {string}
        */
        public get type(): string {
            return this._type;
        }
        /**
        * @language zh_CN
        * 事件类型
        * @param value {string} 
        */
        public set type(value: string) {
            this._type = value
        }

        private _data: string;
        /**
        * @language zh_CN
        * 附加数据
        * @returns {any}
        */
        public get data(): any {
            return this._data;
        }
        /**
        * @language zh_CN
        * 附加数据
        * @param value {any} 
        */
        public set data(value: any) {
            this._data = value;
        }
        /**
        * @language zh_CN
        * Event3D
        * @param typeName {string} 事件类型
        * @param data {any}附加数据(可选)
        */
        constructor(type: string = null,data: any = null) {
            this._type = type;
            this._data = data;
        }
    }
}