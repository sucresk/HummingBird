module Egret3D {
    export class ParticleUVNode extends AnimNodeBase {

        constructor() {
            super();
            this.vertexShader = "particle_uv";
            this.usageAttribute = "attribute_uv0";
            this.usageAttributeLen = 2;
        }


    }
}  