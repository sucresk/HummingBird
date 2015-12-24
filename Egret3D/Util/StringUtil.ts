module Egret3D {

     /**
     * @class Egret3D.StringUtil
     * @classdesc
     * 字符串处理工具类
     */
    export class StringUtil {
        
        /**
        * @language zh_CN
        * 解析文件内容(按行解析)
        * @param file
        * @returns 行列表
        */
        public static parseContent(file: string): Array<string> {

            var shaderList: Array<string> = new Array<string>();
            var node: string = "";
            var endChar: string = ";";
            var index: number = -1;

            for (var i: number = 0; i < file.length; ++i) {
                if (file.charAt(i) == "{") {
                    index = node.indexOf("=");
                    if (index < 0) {
                        endChar = "}";
                    }
                }

                if (node == "") {
                    if (file.charAt(i) == " " || file.charAt(i) == "    ") {
                        continue;
                    }
                }
                node += file.charAt(i);

                if (endChar == file.charAt(i)) {
                    if (endChar == "}") {
                        var s_num: number = 0;
                        var e_num: number = 0;
                        for (var j: number = 0; j < node.length; ++j) {
                            if (node.charAt(j) == "{") {
                                s_num++;
                            }
                            else if (node.charAt(j) == "}") {
                                e_num++;
                            }
                        }

                        if (s_num != e_num) {
                            continue;
                        }

                        if (node.indexOf("struct") >= 0) {
                            endChar = ";";
                            continue;
                        }
                    }

                    if (node.length > 0) {
                        shaderList.push(node);
                    }
                    node = "";
                    endChar = ";";
                }
            }

            return shaderList;
        }

        /**
        * @language zh_CN
        * 解析一行的内容 有多少个成员
        * @param line 源内容
        * @returns 成员列表
        */
        public static parseLines(line: string): Array<string> {

            var list: Array<string> = new Array<string>();
            var value: string = "";
            for (var i: number = 0; i < line.length; ++i) {
                if (line.charAt(i) != " " && line.charAt(i) != "\t" && line.charAt(i) != "," &&
                    line.charAt(i) != "\r" && line.charAt(i) != "\n") {
                    if (line.charAt(i) == ";") {
                        if (value.length > 0) {
                            list.push(value);
                            value = "";
                        }
                        list.push(";");
                        break;
                    }
                    else if (line.charAt(i) == "=") {
                        if (value.length > 0) {
                            list.push(value);
                            value = "";
                        }
                        list.push("=");
                        continue;
                    }

                    value += line.charAt(i);
                    if (i == line.length - 1 && line != "") {
                        list.push(value);
                        value = "";
                    }
                }
                else {
                    if (value != "") {
                        list.push(value);
                        value = "";
                    }
                }
            }
            return list;
        }

        /**
        * @language zh_CN
        * 是否存在此字符串
        * @param fields 被检测的列表
        * @param str 比较字符串
        * @returns 成功返回true
        */
        public static  hasString(fields: Array<string>, str: string): boolean {

            for (var i: number = 0; i < fields.length; ++i) {
                if (fields[i] == str) {
                    return true;
                }
            }

            return false;
        }

        /**
        * @language zh_CN
        * 得到值的内容
        * @param fields 成员列表
        * @returns 值
        */
        public static  getVarName(fields: Array<string>): string {

            var equal: boolean = this.hasString(fields, "=");
            if (equal) {
                if (fields.length - 4 >= 0 && fields.length - 4 < fields.length) {
                    return fields[fields.length - 4];
                }
                return ""
            }
            if (fields.length - 2 >= 0 && fields.length - 2 < fields.length) {
                return fields[fields.length - 2];
            }
            return "";
        }

        /**
        * @language zh_CN
        * 返回变量的值
        * @param fields 变量数据列表
        * @returns 变量的值
        */
        public static  getVarValue(fields: Array<string>): string {

            var equal: boolean = this.hasString(fields, "=");
            if (equal) {
                if (fields.length - 2 >= 0 && fields.length - 2 < fields.length) {
                    return fields[fields.length - 2];
                }
            }
            return "";
        }

        /**
        * @language zh_CN
        * 返回变量类型
        * @param fields 变量数据列表
        * @returns 变量类型
        */
        public static getVarType(fields: Array<string>): string {

            var equal: boolean = this.hasString(fields, "=");
            if (equal) {
                if (fields.length - 5 >= 0 && fields.length - 5 < fields.length) {
                    return fields[fields.length - 5];
                }
                return "";
            }

            if (fields.length - 3 >= 0 && fields.length - 3 < fields.length) {
                return fields[fields.length - 3];
            }
            return "";
        }

        /**
        * @language zh_CN
        * 返回变量属性
        * @param fields 变量数据列表
        * @returns 变量属性
        */
        public static getVarKey(fields: Array<string>): string {

            var equal: boolean = this.hasString(fields, "=");
            if (equal) {
                if (fields.length > 5) {
                    return fields[0];
                }
                else {
                    return "";
                }
            }

            if (fields.length > 3) {
                return fields[0];
            }
            return "";
        }

        /**
        * @language zh_CN
        * 筛选文件中的指定字符去掉
        * @param file xxx
        * @returns 筛选后的字符
        */
        public static  processShaderFile(file: string): string {

            var filterChar: string[] = ["\n", "\r"];
            filterChar = [];
            var src: string = file;
            var dest: string = src;

            while (true) {
                var pos: number = src.indexOf("//");
                if (pos < 0) {
                    break;
                }
                var end: number = src.indexOf("\r\n", pos);

                var slice_s: string = src.slice(pos, end);
                src = src.replace(slice_s, "");
                if (src == dest) {
                    break;
                }
                dest = src;
            }

            for (var i: number = 0; i < filterChar.length; ++i) {
                while (true) {
                    dest = src.replace(filterChar[i], "");
                    if (src == dest) {
                        break;
                    }
                    src = dest;
                }
            }

            return src;
        }


        /**
        * @language zh_CN
        * 解析字符颜色值
        * @param color
        * @returns
        */
        public static colorRgb(color: string): string {

            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = color.toLowerCase();
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }  
                //处理六位的颜色值  
                var sColorChange = [];
                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                return "RGB(" + sColorChange.join(",") + ")";
            }
            else {
                return sColor; 
            }
        }

    }
}