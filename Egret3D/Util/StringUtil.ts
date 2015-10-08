﻿module BlackSwan {
    export class StringUtil {
        static readLines( str:string ): Array<string> {
            var tempStrArray: Array<string> = new Array<string>();

            var index: number = 0;

            var lineStr: string = "";

            while (str.length > index) {
                var code: string = StringUtil.readNext(index++, str);
                if (code != "\n")
                    lineStr += code;
                else if (code == "\n") {
                    tempStrArray.push( lineStr.concat() );
                    lineStr = "";
                }
            }

            return tempStrArray;
        }

        static readNext( index:number , str:string ): string {
            return str.charAt( index );
        }

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

        public static parseLines(line: string): Array<string> {
            var list: Array<string> = new Array<string>();
            var value: string = "";
            for (var i: number = 0; i < line.length; ++i) {
                if (line.charAt(i) != " " && line.charAt(i) != "\t" && line.charAt(i) != ",") {
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

        public static  hasString(fields: Array<string>, str: string): boolean {
            for (var i: number = 0; i < fields.length; ++i) {
                if (fields[i] == str) {
                    return true;
                }
            }

            return false;
        }

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

        public static  getVarValue(fields: Array<string>): string {
            var equal: boolean = this.hasString(fields, "=");
            if (equal) {
                if (fields.length - 2 >= 0 && fields.length - 2 < fields.length) {
                    return fields[fields.length - 2];
                }
            }
            return "";
        }

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

        public static  processShaderFile(file: string): string {
            var filterChar: string[] = ["\n", "\r"];
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

    }
}