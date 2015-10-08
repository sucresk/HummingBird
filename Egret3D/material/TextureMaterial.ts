module BlackSwan {
    export class TextureMaterial extends MaterialBase {
        constructor(texture: TextureBase ) {
            super();
            this.diffusePass = new DiffuseMapPass();
            this.diffuseTexture = texture;
        }
    }
} 