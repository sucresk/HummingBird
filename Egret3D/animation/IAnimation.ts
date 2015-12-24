module Egret3D {

    /**
     * @language zh_CN
     * @class Egret3D.IAnimation
     * @classdesc
     * 动画接口
     */
    export interface IAnimation {

        /**
        * @language zh_CN
        * 骨骼动画控制器对象
        */
        skeletonAnimationController?: SkeletonAnimation;

        /**
        * @language zh_CN
        * 总时间
        */
        time: number;

        /**
        * @language zh_CN
        * 帧间隔时间
        */
        delay: number;

        /**
        * @language zh_CN
        * 动画播放速度
        */
        speed: number;

        /**
        * @language zh_CN
        * 动画节点容器
        */
        animaNodeCollection?: AnimaNodeCollection;

        /**
        * @language zh_CN
        * 初始化Shader
        * @param vertexShader 顶点Shader
        * @param pixelShader 片元Shader
        */
        initShader(vertexShader: VertexShader, pixelShader: PixelShader);

        /**
        * @language zh_CN
        * 更新调度
        * @param time 总时间
        * @param delay 帧间隔时间
        */
        updata(time: number, delay: number): void;

        /**
        * @language zh_CN
        * 播放动画
        * @param animName 动画名称
        * @param speed 播放速度（默认为1）
        */
        play(animName?: string, speed?: number): void;

        /**
        * @language zh_CN
        * 停止动画播放
        */
        stop(): void;

        /**
        * @language zh_CN
        * 是否正在播放
        */
        isPlay(): boolean;

        /**
        * @language zh_CN
        * 获取动画列表
        * @return 动画名称数组
        */
        getAnimList(): string[];

        /**
        * @language zh_CN
        * 获取动画节点
        * @return 动画节点数组
        */
        getAnimNode(): Array<AnimNodeBase>;

        /**
        * @language zh_CN
        * 克隆新的IAnimation对象
        * @return 新的IAnimation对象
        */
        clone(): IAnimation;
    }
}
