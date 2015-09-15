module BlackSwan.GLSL {
    export class ShaderBase {

        protected source: string = "precision mediump float;            \t\n";

        protected initShaderSource() {

        }

        public getShaderSource(): string {
            this.initShaderSource();
            return this.source;
        }

        public mainFun() {
            this.source += "void main(void){; \r\n";
        }

        public mainFunEnd() {
            this.source += "} \r\n";
        }

        public varTemp(tempName: string, valueType: string): GLSL.Attribute {
            this.source += valueType + " " + tempName + "; \r\n";
            var tmp: GLSL.Attribute = new GLSL.Attribute(tempName, valueType);
            return tmp;
        }

        public varAttribute(attributeName: string, valueType: string): GLSL.Attribute {
            this.source += "attribute " + valueType + " " + attributeName + "; \r\n";
            var tmp: GLSL.Attribute = new GLSL.Attribute(attributeName, valueType);
            return tmp;
        }

        public varVarying(varyingName: string, valueType: string): GLSL.Varying {
            this.source += "varying " + valueType + " " + varyingName + "; \r\n";
            var tmp: GLSL.Varying = new GLSL.Varying(varyingName, valueType);
            return tmp;
        }

        public varUnifrom(unifromName: string, valueType: string): GLSL.Unifrom {
            this.source += "uniform " + valueType + " " + unifromName +  "; \r\n";
            var tmp: GLSL.Unifrom = new GLSL.Unifrom(unifromName, valueType);
            return tmp;
        }
        //uniform sampler2D depthSampler
        public connectSampler(sampler: GLSL.Sampler2D) {
            this.source += "uniform sampler2D " + sampler.name + "; \r\n";
        }

        public connectVarying(varying: GLSL.Varying) {
            this.source += "varying " + varying.valueType + " " + varying.name + "; \r\n";
        }

        public connectUniform(unifrom: GLSL.Unifrom) {
            this.source += "uniform " + unifrom.valueType + " " + unifrom.name + "; \r\n";
        }

        public if(conditions: string) {
            this.source += "if(" + conditions + "){ ; \r\n";
        }

        public endif() {
            this.source += "} ; \r\n";
        }

        public discard() {
            this.source += "discard ; \r\n";
        }

        public mov(target: string, source: string) {
            this.source += target + " = " + source + "; \r\n";
        }

        public add(target: string, source1: string, source2: string) {
            this.source += target + " = " + source1 + " + " + source2 + "; \r\n";
        }

        public sub(target: string, source1: string, source2: string) {
            this.source += target + " = " + source1 + " - " + source2 + "; \r\n";
        }

        public mul(target: string, source1: string, source2: string) {
            this.source += target + " = " + source1 + " * " + source2 + "; \r\n";
        }

        public div(target: string, source1: string, source2: string) {
            this.source += target + " = " + source1 + " / " + source2 + "; \r\n";
        }

        public dot(target: string, source1: string, source2: string) {
            this.source += target + " = dot(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public normalize(target: string, source: string) {
            this.source += target + " = normalize(" + source + ") ; \r\n";
        }

        public reflect(target: string, source1: string, source2: string) {
            this.source += target + " = reflect(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public min(target: string, source1: string, source2: string) {
            this.source += target + " = min(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public max(target: string, source1: string, source2: string) {
            this.source += target + " = max(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public pow(target: string, source1: string, source2: string) {
            this.source += target + " = pow(" + source1 + " , " + source2 + ") ; \r\n";
        }

        public tex2D(target: string, tex: string, uv: string) {
            this.source += target + " = texture2D(" + tex + " , " + uv + ") ; \r\n";
        }

        public tex3D(target: string, tex: string, uv: string) {
            this.source += target + " = texture3D(" + tex + " , " + uv + ") ; \r\n";
        }

        public outColor(target: string) {
            this.source += "gl_FragColor = " + target + "  ; \r\n";
        }

        public outPos(target: string) {
            this.source += "gl_Position = " + target + "  ; \r\n";
        }

    }
} 