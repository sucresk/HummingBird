var BlackSwan;
(function (BlackSwan) {
    var MaterialBase = (function () {
        function MaterialBase() {
            this.diffusePass = new BlackSwan.DiffuseMapPass();
        }
        MaterialBase.prototype.initShader = function (context3D, geomtry, animation) {
            this.diffusePass.initShader(context3D, geomtry, animation);
        };
        Object.defineProperty(MaterialBase.prototype, "diffuseTexture", {
            set: function (texture) {
                this.diffusePass.diffuseTexture = texture;
            },
            enumerable: true,
            configurable: true
        });
        //public set normalTexture(texture: Texture2D) {
        //    (<DiffuseMapPass>this.diffusePass).normalTexture = texture;
        //}
        //public set specularTexture(texture: Texture2D) {
        //    (<DiffuseMapPass>this.diffusePass).specularTexture = texture;
        //}
        //public set lightTexture(texture: Texture2D) {
        //    (<DiffuseMapPass>this.diffusePass).lightTexture = texture;
        //}
        MaterialBase.prototype.activateDiffusePass = function (context3D, modeltransform, camera3D) {
            this.diffusePass.activate(context3D, modeltransform, camera3D);
        };
        MaterialBase.prototype.activateNormalPass = function (context3D, modeltransform, camera3D) {
            this.normalPass.activate(context3D, modeltransform, camera3D);
        };
        MaterialBase.prototype.activatePositionPass = function (context3D, modeltransform, camera3D) {
            this.positionPass.activate(context3D, modeltransform, camera3D);
        };
        MaterialBase.prototype.activateDepthPass = function (context3D, modeltransform, camera3D) {
            this.depthPass.activate(context3D, modeltransform, camera3D);
        };
        MaterialBase.prototype.renderDiffusePass = function (context3D, modeltransform, camera3D) {
            this.diffusePass.updata(context3D, modeltransform, camera3D);
        };
        MaterialBase.prototype.renderNormalPass = function (context3D, modeltransform, camera3D) {
            this.normalPass.updata(context3D, modeltransform, camera3D);
        };
        MaterialBase.prototype.renderPositionPass = function (context3D, modeltransform, camera3D) {
            this.positionPass.updata(context3D, modeltransform, camera3D);
        };
        MaterialBase.prototype.renderDepthPass = function (context3D, modeltransform, camera3D) {
            this.depthPass.updata(context3D, modeltransform, camera3D);
        };
        return MaterialBase;
    })();
    BlackSwan.MaterialBase = MaterialBase;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=MaterialBase.js.map