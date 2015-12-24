﻿module Egret3D {

    /**
    * @class Egret3D.ControllerBase
    * @classdesc
    * 控制器 基类
    */
    export class ControllerBase {
        protected _autoUpdate:boolean = true;
        protected _target: Object3D;

        * @language zh_CN
        * constructor
        * @param targetObject 控制的目标
        */
        constructor(targetObject: Object3D = null) {
            this._target = targetObject;
        }

        * @language zh_CN
        * @readOnly
        * @returns 返回当前的目标
        */
        public get target(): Object3D {

            return this._target;
        }

        * @language zh_CN
        * @writeOnly
        * @param val 当前的目标
        */
        public set target(val: Object3D) {

            if (this._target == val)
                return;

            ///    this._target._controller = null;


            ///    this._target._controller = this;

        }

        /**
        * @language zh_CN
        * @readOnly
        * @returns 是否自动更新
        */
        public get autoUpdate(): boolean {

            return this._autoUpdate;
        }

        * @language zh_CN
        * @writeOnly
        * @param val 是否自动更新
        */
        public set autoUpdate(val: boolean) {

            if (this._autoUpdate == val)
                return;

        }

		{
            ///if (_targetObject && _targetObject.implicitPartition && _autoUpdate)
            ///    _targetObject.implicitPartition.markForUpdate(_targetObject);
        }

        /**
        * @language zh_CN
        * 数据更新
        */
        public  update(){
            ///throw null ;
        }
    }
}