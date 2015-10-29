module Egret3D {
    export class ECAParser {

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