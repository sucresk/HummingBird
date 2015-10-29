module BlackSwan {
    export class Mesh extends Object3D {

        constructor(geomtry: GeomtryBase, material: MaterialBase, animation: IAnimation = null) {
            super();

            this.geomtry = geomtry;
            this.material = material;
            this.animation = animation;
            this.box.fillBox(this.geomtry.minPos, this.geomtry.maxPos);
        }

        public clone(): Mesh {
            return new Mesh(this.geomtry, this.material, this.animation ? this.animation.clone() : null );
        }

        public update(time: number, delay: number) {
            if (this.animation) {
                this.animation.updata(time, delay);
            }
        }
    }
} 