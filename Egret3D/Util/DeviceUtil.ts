class DeviceUtil {
    static getDeviceInfo(): any {
        return null;
    }

    static get getGPUMode(): string {
        if (true) {
            return Egret3D.Egret3DDrive.OpenGLES_2_0;    
        }
        return "";
    }
} 