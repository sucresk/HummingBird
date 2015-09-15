module BlackSwan {
    export class BinModelLoader {

        private _callback_complete: Function;
        private _loader: xxq.URLLoader;
        private _data: ByteArray;
        private _geomtry: SubGeomtry;
        private _geomtryData: GeomtryData = new GeomtryData();

        public minPos: Vector3D = new Vector3D();
        public maxPos: Vector3D = new Vector3D();

        constructor() {
        }

        public get geomtryBase(): SubGeomtry {
            return this._geomtry;
        }

        public get geomtryData():GeomtryData {
            return this._geomtryData;
        }

        public loadBinModelFromFile(file_url: string, callback_complete: Function): void {
            this._callback_complete = callback_complete;
            this._loader = new xxq.URLLoader();
            this._loader.dataformat = xxq.URLLoader.DATAFORMAT_BINARY;
            this._loader.onLoadComplete = (loader: xxq.URLLoader) => this.onLoadComplete(loader);
            this._loader.load(file_url);
        }

        private onLoadComplete(loader: xxq.URLLoader) {
            this._data = loader.data;
            this.parserModelData();
            this._callback_complete(this);
        }

        private parserModelData() {
            //this._geomtry = new SubGeomtry();
            this._data.position = 0;
            this._data.endian = BlackSwan.Endian.BIG_ENDIAN;

            var version: number = this._data.readInt();

            switch (version) {
                case 0x067014:
                    this.parserModelVersion0x067014(this._data);
                    break;
                default:
                    new Error("version is not");
                    break;
            }
        }

        private parserModelVersion0x067014(data: ByteArray) {

            var isCompress: Boolean = data.readBoolean();

            var fileData: ByteArray = new ByteArray();
            data.readBytes(fileData);

            if (isCompress == true) {
                fileData.uncompress("lzma");
            }

            fileData.position = 0;
            fileData.endian = Endian.BIG_ENDIAN;

            var i: number;
            var uv: UV;
			
            //读取模型名称;
            var modelName: String = fileData.readUTFBytes(fileData.readInt());
			
            //0,0偏移值;
            var vOffset: Vector3D = new Vector3D();
            vOffset.x = fileData.readFloat();
            vOffset.z = fileData.readFloat();
            vOffset.y = fileData.readFloat();
			
            //缩放比;
            var vScale: Vector3D = new Vector3D();
            vScale.x = fileData.readFloat();
            vScale.z = fileData.readFloat();
            vScale.y = fileData.readFloat();
			
            //读取模型最小点;
            this.minPos.x = fileData.readFloat();
            this.minPos.z = fileData.readFloat();
            this.minPos.y = fileData.readFloat();
			
            //读取模型最大点;
            this.maxPos.x = fileData.readFloat();
            this.maxPos.z = fileData.readFloat();
            this.maxPos.y = fileData.readFloat();
			
            //读取三角面总数;
            var triangleCount: number = fileData.readInt();
			
            //读取顶点总数;     
            var vertexCount: number = fileData.readInt();
			
            //读取纹理文件名;
            //			var textureFileName:String = fileData.readUTFBytes(fileData.readInt());
            //			//			if( textureFileName == "" )
            //			//				mesh.complete = true ;

            var sourceVertexData: Array<number> = new Array<number>();
            var sourceNormalData: Array<number> = new Array<number>();
            var sourceVertexColorData: Array<number> = new Array<number>();
            var sourceUVData1: Array<number> = new Array<number>();
            var sourceUVData2: Array<number> = new Array<number>();
			
            var uTemp: number = 0;

            //读取顶点数组;
            for (i = 0; i < vertexCount; i++) {

                var vertex: Vector3D = new Vector3D();
                uTemp = fileData.readUnsignedShort();
                vertex.x = uTemp / vScale.x - vOffset.x;
                uTemp = fileData.readUnsignedShort();
                vertex.z = uTemp / vScale.z - vOffset.z;
                uTemp = fileData.readUnsignedShort();
                vertex.y = uTemp / vScale.y - vOffset.y;
                vertex.w = i;
                this._geomtryData.source_vertexData.push(vertex);


                var normal: Vector3D = new Vector3D();  
                normal.x = fileData.readShort() / 10000;
                normal.z = fileData.readShort() / 10000;
                normal.y = fileData.readShort() / 10000;
                this._geomtryData.source_normalData.push(normal);
				

                var vertexColor: Vector3D = new Vector3D();
                vertexColor.a = fileData.readUnsignedByte() / 255;
                vertexColor.r = fileData.readUnsignedByte() / 255;
                vertexColor.g = fileData.readUnsignedByte() / 255;
                vertexColor.b = fileData.readUnsignedByte() / 255;
                this._geomtryData.source_vertexColorData.push(vertexColor);
            }     
			
            //读取第一套UV总数;
            var UV1Count: number = fileData.readInt();

            //读取第一套UV数组;
            for (i = 0; i < UV1Count; i++) {
                uv = new UV();
                uv.u = Number(fileData.readShort()) / 10000.0;
                uv.v = 1.0 - Number(fileData.readShort()) / 10000.0;
                this._geomtryData.source_uvData.push(uv);
            }
			  
            //读取第二套UV总数;
            var UV2Count: number = fileData.readInt();

            //读取第二套UV数组;
            for (i = 0; i < UV2Count; i++) {
                uv = new UV();
                uv.u = Number(fileData.readShort()) / 10000.0;
                uv.v = 1.0 - Number(fileData.readShort()) / 10000.0; 
                this._geomtryData.source_uv2Data.push(uv);
            }
			
            //读取FaceData数组;
            var PosIndex1: number, PosIndex2: number, PosIndex3: number;
            var uv1_1: number, uv1_2: number, uv1_3: number;
            for (i = 0; i < triangleCount; i++) {
                fileData.readInt();

                PosIndex1 = fileData.readInt();
                PosIndex2 = fileData.readInt();
                PosIndex3 = fileData.readInt();

                var tmpFace: FaceData = new FaceData();
                tmpFace.vertexIndices.push(PosIndex1 + 1);
                tmpFace.vertexIndices.push(PosIndex2 + 1);
                tmpFace.vertexIndices.push(PosIndex3 + 1);

                tmpFace.normalIndices.push(PosIndex1 + 1);
                tmpFace.normalIndices.push(PosIndex2 + 1);
                tmpFace.normalIndices.push(PosIndex3 + 1);

                uv1_1 = fileData.readInt();
                uv1_2 = fileData.readInt();
                uv1_3 = fileData.readInt();

                tmpFace.uvIndices.push(uv1_1 + 1);
                tmpFace.uvIndices.push(uv1_2 + 1);
                tmpFace.uvIndices.push(uv1_3 + 1);

                if (UV2Count > 0) {
                    tmpFace.uv2Indices.push(fileData.readInt() + 1);
                    tmpFace.uv2Indices.push(fileData.readInt() + 1);
                    tmpFace.uv2Indices.push(fileData.readInt() + 1);
                }

                tmpFace.indexIds.push(String(PosIndex1 + 1) + "/" + String(uv1_1 + 1) + "/" + String(PosIndex1 + 1));
                tmpFace.indexIds.push(String(PosIndex2 + 1) + "/" + String(uv1_2 + 1) + "/" + String(PosIndex2 + 1));
                tmpFace.indexIds.push(String(PosIndex3 + 1) + "/" + String(uv1_3 + 1) + "/" + String(PosIndex3 + 1));

                this._geomtryData.source_faceData.push(tmpFace);
            }

            this._geomtryData = GeomtryData.translateMaterialGroup(this._geomtryData);
            //this._geomtryData = GeomtryData.translateMaterialGroup(this._geomtryData);
            this._geomtry = new SubGeomtry();
            this._geomtry.minPos.copyFrom(this.minPos);
            this._geomtry.minPos.copyFrom(this.minPos);

            this._geomtry.setGeomtryData(this._geomtryData.indices, this._geomtryData.vertexDatas)

            //this._geomtry.indexData = this._geomtryData.indices;
            //this._geomtry.verticesData = this._geomtryData.vertices;
            //this._geomtry.numItems = this._geomtryData.indices.length;
        }
    }
}