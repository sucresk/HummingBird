var BlackSwan;
(function (BlackSwan) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.readLines = function (str) {
            var tempStrArray = new Array();
            var index = 0;
            var lineStr = "";
            while (str.length > index) {
                var code = StringUtil.readNext(index++, str);
                if (code != "\n")
                    lineStr += code;
                else if (code == "\n") {
                    tempStrArray.push(lineStr.concat());
                    lineStr = "";
                }
            }
            return tempStrArray;
        };
        StringUtil.readNext = function (index, str) {
            return str.charAt(index);
        };
        return StringUtil;
    })();
    BlackSwan.StringUtil = StringUtil;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=StringUtil.js.map