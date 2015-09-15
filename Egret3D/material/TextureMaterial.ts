module BlackSwan {
    export class TextureMaterial extends MaterialBase {
        constructor(texture: ImageTexture ) {
            super();
            this.diffuseTexture = texture;
        }
    }
} 