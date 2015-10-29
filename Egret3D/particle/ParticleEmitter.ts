module Egret3D {
   
    export class ParticleEmitter extends Object3D {

        private _particleNodes: { [key: string]: AnimNodeBase } = {};
        private particleData: ParticleData = new ParticleData() ; 

        public animNodeCollection: AnimaNodeCollection = new AnimaNodeCollection();
        private particleGeometry: ParticleGeometry;

        private timeNode: ParticleTimeNode;
        private billboardNode: ParticleBulletinBoardNode;

        private isPlay: boolean = false;
        private particleChange: boolean = true;

        private _timeOutID: number = -1 ; 
        constructor(material:MaterialBase ,num:number=10,width:number=100,height:number=100) {
            super();

            this.particleData.geometry = new PlaneGeometry(width, height, 1, 1, 1, 1);
            this.particleData.geometry.rotationGeomtry(new Vector3D(-90,0,0));
            //this.particleData.geometry = new CubeGeomtry(width, height, height );
            this.particleData.sum = num; 

            if (!material) {
                this.material = new TextureMaterial();
                this.material.diffuseTexture = CheckerboardTexture.texture;
                this.material.ambientColor = 0xffffffff;
                this.material.ambientPower = 0.5;
                this.material.blendMode = BlendMode.ALPHA;
                this.material.depthTest = true ;
            } else {
                this.material = material;
            }

            this.billboardNode = new ParticleBulletinBoardNode();
            this.animNodeCollection.addNode(this.billboardNode);

            this.timeNode = new ParticleTimeNode();
            this.animNodeCollection.addNode(this.timeNode);

            this.animation = new ParticleAnimation(this.animNodeCollection);
        }

        //particle number
        //time start
        //time space 
        //time life
        public set particleNumber(value: number) {
            this.particleData.sum = value;
            this.particleChange = true;
        }
        
        public setStartTime(valueType: ValueType, data:any ) {
            this.timeNode.setStartTime(valueType, data );
            this.particleChange = true;
        }
        
        public setSpaceTime(valueType: ValueType, data: any) {
            this.timeNode.setSpaceTime(valueType, data);
            this.particleChange = true;
        }
        
        public setLifeTime(valueType: ValueType, data: any) {
            this.timeNode.setLifeTime(valueType, data);
            this.particleChange = true;
        }

        public set loop(value: boolean) {
            this.timeNode.isLoop = value;
            this.particleChange = true;
        }

        public setData(particleData: ParticleData) {
            this.particleData = particleData; 
            this.particleChange = true;
        }

        public clone(): ParticleEmitter {
            //var mat: TextureMaterial = new TextureMaterial(this.material.diffuseTexture);
            //var emit: ParticleEmitter = new ParticleEmitter( mat , this.particleData.sum );
            //emit.animation = this.animation.clone() ; 
            return null ;
        }

        public play(): void {
            this.animation.time = 0; 
            this.animation.play();
            this.isPlay = true;

            if (!this.timeNode.isLoop) {
                var numTime: number = this.timeNode.startTime + this.timeNode.spaceTime * this.particleData.sum + this.timeNode.lifeTime; 
                this._timeOutID = window.setTimeout( () => this.complete(), numTime * 2.0 );
            }
        }

        public resetEmit() {
            this.animNodeCollection.calculateNode();
            this.geometry = GeometryUtil.packageGeometry(this.particleData.sum, this.animNodeCollection.numberOfVertices, this.particleData.geometry);
            this.geometry.geomtryType = GeometryType.Particle;
            for (var i: number = 0; i < this.animNodeCollection.nodes.length; i++) {
                this.animNodeCollection.nodes[i].fillGeomtryData(this.geometry);
            }
        }

        public stop(): void {
            this.isPlay = false ;
        }

        public build(): void {

        }

        public complete() {
            window.clearTimeout(this._timeOutID);
            var emit_complete: Event3D = new Event3D("emit_complete", false);
            emit_complete.target = this; 
            this.dispatchEvent(emit_complete);
        }

        public update(time: number, delay: number) {
            if (this.particleChange) {
                this.resetEmit();
                this.particleChange = false;
            }
            if (this.animation && this.isPlay) {
                this.animation.updata(time, delay);

            
            }
        }
    }
}