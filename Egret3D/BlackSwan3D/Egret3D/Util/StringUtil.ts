module BlackSwan {
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
    }
}