module BlackSwan {
    export class Camera3DManager {
        static  instance: Camera3DManager = new Camera3DManager();
        constructor() {

        }

        public static getInstance(): Camera3DManager {
            if (!Camera3DManager.instance)
                return Camera3DManager.instance = new Camera3DManager();
            
            return Camera3DManager.instance;
        }

        public tabCamera3D( mode:number , pre:number ) {
        }
      
    }
} 