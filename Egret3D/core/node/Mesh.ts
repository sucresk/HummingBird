module Egret3D {
    export class Mesh extends Object3D {

        constructor(geometry: GeometryBase, material: MaterialBase, animation: IAnimation = null) {
            super();

            this.geometry = geometry;
            this.material = material;
            this.animation = animation;
            this.box.fillBox(this.geometry.minPos, this.geometry.maxPos);
        }

        public clone(): Mesh {
            return new Mesh(this.geometry, this.material, this.animation ? this.animation.clone() : null );
        }

        public update(time: number, delay: number) {

            if (this.isDisable)
                return;

            if (this.animation) {
                this.animation.updata(time, delay);
            }
        }
    }
} 