var BlackSwan;
(function (BlackSwan) {
    var FaceData = (function () {
        function FaceData() {
            this.vertexIndices = new Array();
            this.uvIndices = new Array();
            this.uv2Indices = new Array();
            this.normalIndices = new Array();
            this.indexIds = new Array(); // used for real index lookups
        }
        return FaceData;
    })();
    BlackSwan.FaceData = FaceData;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=FaceData.js.map