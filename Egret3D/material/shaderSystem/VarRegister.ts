module BlackSwan.GLSL {
    export class VarRegister {
        public usages: number[];
        public name: string;
        public varType: string = "";
        public valueType: string = "";
        public level: string;

        public index: any;
        public data: any;

        public var(compoments: string): string {
            return this.level + " " + this.valueType + " " + name + "." + compoments;
        }

        public use(compoments: string = ""): string {
            if (compoments != "")
                return this.name + "." + compoments;
            return this.name;
        }
    }
} 