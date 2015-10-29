module Egret3D {

    export class EventDispatch {

        public static EVENT_LOAD_COMPLETE: string = "load_complete";

        private _eventCallbackSet: { [eventId: string]: Array<Function> } = {};

        constructor() {
        }

        /**
		 * 投递事件;
		 *
		 * @param eventId   事件类型;
         *
		 * @param data   附加数据;
		 */
        //public dispatchEvent(eventId: string, data: Object=null): void {

        //    var callbackList: Array<Function> = this._eventCallbackSet[eventId];

        //    if (!callbackList || callbackList.length <= 0)
        //        return;

        //    for (var i: number = 0; i < callbackList.length; i++) {

        //        callbackList[i](eventId, data);
        //    }
        //}

        public dispatchEvent(event3D: Event3D) {
            var callbackList: Array<Function> = this._eventCallbackSet[event3D.eventType];

            if (!callbackList || callbackList.length <= 0)
                return;

            for (var i: number = 0; i < callbackList.length; i++) {

                callbackList[i](event3D);
            }
        }

        /**
		 * 添加事件回调;
		 *
		 * @param eventId   事件类型;
         *
		 * @param callback   回调函数;
		 */
        public addEventListener(eventId: string, callback: Function): void {

            var callbackList: Array<Function>;

            if (this._eventCallbackSet[eventId]) {
                callbackList = this._eventCallbackSet[eventId];
            }
            else {
                callbackList = this._eventCallbackSet[eventId] = [];
            }

            for (var i: number = 0; i < callbackList.length; i++) {
                if (callbackList[i] == callback)
                    return;
            }

            callbackList.push(callback);
        }

        /**
		 * 移除事件回调;
		 *
		 * @param eventId   事件类型;
         *
		 * @param callback   回调函数;
		 */
        public removeEventListener(eventId: string, callback: Function): void {

            var callbackList: Array<Function> = this._eventCallbackSet[eventId];

            if (!callbackList || callbackList.length <= 0)
                return;

            for (var i: number = 0; i < callbackList.length; i++) {

                if (callbackList[i] != callback)
                    continue;

                callbackList.splice(i, 1);

                break;
            }

        }

        /**
		 * 移除所有事件回调;
		 */
        public removeAllEventListener(): void {
            this._eventCallbackSet = {};
        }

    }
}