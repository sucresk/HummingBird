var BlackSwan;
(function (BlackSwan) {
    var PlaneClassification = (function () {
        function PlaneClassification() {
        }
        PlaneClassification.BACK = 0;
        PlaneClassification.FRONT = 1;
        PlaneClassification.IN = 0;
        PlaneClassification.OUT = 1;
        PlaneClassification.INTERSECT = 2;
        return PlaneClassification;
    })();
    BlackSwan.PlaneClassification = PlaneClassification;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=PlaneClassification.js.map