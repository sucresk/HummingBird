module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.ECAParser
     * @classdesc
     * 用 ECAParser 类 解析.eca 文件
     */
    export class ECAParser {

        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns CameraAnimationController
         */
        public static parse(datas: ArrayBuffer): CameraAnimationController {

            var bytes: ByteArray = new ByteArray(datas);

            var cameraAnimationController: CameraAnimationController = new CameraAnimationController();

            var nFrame: number = bytes.readUnsignedInt();

            var cameraAnimationFrame: CameraAnimationFrame = null;

            var scaling: Vector3D = new Vector3D(1, 1, 1, 1);

            while (nFrame--) {

                cameraAnimationFrame = new CameraAnimationFrame();

                cameraAnimationFrame.time = bytes.readInt();

                cameraAnimationFrame.fov = bytes.readFloat();

                cameraAnimationFrame.rotation = new Vector3D(
                    bytes.readFloat(),
                    bytes.readFloat(),
                    bytes.readFloat());

                cameraAnimationFrame.translation = new Vector3D(
                    bytes.readFloat(),
                    bytes.readFloat(),
                    bytes.readFloat());

                cameraAnimationFrame.matrix = new Matrix4_4();
                cameraAnimationFrame.matrix.recompose([cameraAnimationFrame.translation, cameraAnimationFrame.rotation, scaling]);

                cameraAnimationController.cameraAnimationFrames.push(cameraAnimationFrame);
            }

            return cameraAnimationController;
        }
    }
}