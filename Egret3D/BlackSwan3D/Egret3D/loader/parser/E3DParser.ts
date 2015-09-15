module BlackSwan {
    export class E3DParser {

        private static FILE_FLAG: number = 0x4D443345;
        // data format describe;
        private static DATA_FORMAT_STATIC_MODEL:            number = 0x00000001;
        private static DATA_FORMAT_SKELETAL_ANIM_MODEL:     number = 0x00000002;
        private static DATA_FORMAT_EXPORT_MESH:             number = 0x00000004;
        private static DATA_FORMAT_EXIST_VERTEX_POS:        number = 0x00000008;
        private static DATA_FORMAT_EXIST_VERTEX_NORMAL:     number = 0x00000010;
        private static DATA_FORMAT_EXIST_VERTEX_TANGENT:    number = 0x00000020;
        private static DATA_FORMAT_EXIST_VERTEX_COLOR:      number = 0x00000040;
        private static DATA_FORMAT_EXIST_VERTEX_UV1:        number = 0x00000080;
        private static DATA_FORMAT_EXIST_VERTEX_UV2:        number = 0x00000100;
        private static DATA_FORMAT_EXIST_SKELETAL_DATA:     number = 0x00000200;
        private static DATA_FORMAT_EXIST_WEIGHTS_DATA:      number = 0x00000400;

        constructor() {
        }

        public static parse(buffer: ArrayBuffer): GeomtryBase {

            var datas: ByteArray = new ByteArray(buffer);
            datas.position = 0;
            datas.endian = BlackSwan.Endian.LITTLE_ENDIAN;

            // read file flag;
            if (datas.readUnsignedInt() != E3DParser.FILE_FLAG)
                return null;

            // read data count;
            var modelCount: number = datas.readUnsignedInt();

            while (modelCount--)
            {
                return E3DParser.readDataBlockFromBinary(datas);
            }

            return null;
        }

        private static readDataBlockFromBinary(datas: ByteArray): GeomtryBase {

            var nFormatDescribe: number = E3DParser.readDataFormatDescribeToBinary(datas);

            return E3DParser.readMeshBaseDataToBinary(nFormatDescribe, datas);

            //E3DParser.readSkeletonAnimToBinary(nFormatDescribe, datas);

            //return null;
        }

        private static readDataFormatDescribeToBinary(datas: ByteArray): number {
            // read data format describe;
            return datas.readUnsignedInt();
        }

        private static readMeshBaseDataToBinary(nFormatDescribe: number, datas: ByteArray): SubGeomtry {

            //var vertexArray: Array<number>;
            //var normalArray: Array<number>;
            //var colorArray: Array<number>;
            //var uv1Array: Array<number>;
            //var uv2Array: Array<number>;

            var geomtryData: GeomtryData = new GeomtryData();

            var uintValue: number = 0;

            // read vertex position;
            if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_POS) {

                // read vertex array length;
                uintValue = datas.readUnsignedInt();

                while (uintValue--) {
                    var vertex: Vector3D = new Vector3D();
                    vertex.x = datas.readFloat();
                    vertex.y = datas.readFloat();
                    vertex.z = datas.readFloat();
                    geomtryData.source_vertexData.push(vertex);
                }
            }

            // read vertex normal;
            if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_NORMAL) {

                // read normal array length;
                uintValue = datas.readUnsignedInt();

                while (uintValue--) {
                    var vertex: Vector3D = new Vector3D();
                    vertex.x = datas.readFloat();
                    vertex.y = datas.readFloat();
                    vertex.z = datas.readFloat();
                    geomtryData.source_normalData.push(vertex);
                }
            }

            // read vertex color;
            if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_COLOR) {

                // read color array length;
                uintValue = datas.readUnsignedInt();

                while (uintValue--) {
                    var vertex: Vector3D = new Vector3D();
                    vertex.r = datas.readFloat();
                    vertex.g = datas.readFloat();
                    vertex.b = datas.readFloat();
                    vertex.a = datas.readFloat();
                    geomtryData.source_vertexColorData.push(vertex);
                }
            }

            // read vertex uv1;
            if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_UV1) {

                // read uv1 array length;
                uintValue = datas.readUnsignedInt();

                while (uintValue--) {
                    var uv: UV = new UV();
                    uv.u = datas.readFloat();
                    uv.v = datas.readFloat();
                    geomtryData.source_uvData.push(uv);
                }
            }

            // read vertex uv2;
            if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_UV2) {

                // read uv2 array length;
                uintValue = datas.readUnsignedInt();

                while (uintValue--) {
                    var uv: UV = new UV();
                    uv.u = datas.readFloat();
                    uv.v = datas.readFloat();
                    geomtryData.source_uv2Data.push(uv);
                }
            }


            // read face;
            if (nFormatDescribe & E3DParser.DATA_FORMAT_EXPORT_MESH) {

                var PosIndex1: number, PosIndex2: number, PosIndex3: number;
                var uv1_1: number, uv1_2: number, uv1_3: number;

                // read face array length;
                uintValue = datas.readUnsignedInt();

                while (uintValue--) {

                    var faceData: FaceData = new FaceData();

                    // read vertex index;
                    if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_POS) {

                        PosIndex1 = datas.readUnsignedInt();
                        PosIndex2 = datas.readUnsignedInt();
                        PosIndex3 = datas.readUnsignedInt();

                        faceData.vertexIndices.push(
                            PosIndex1 + 1,
                            PosIndex2 + 1,
                            PosIndex3 + 1);
                    }

                    // read normal index;
                    if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_NORMAL) {

                        faceData.normalIndices.push(
                            datas.readUnsignedInt() + 1,
                            datas.readUnsignedInt() + 1,
                            datas.readUnsignedInt() + 1
                            );
                    }

                    // read color index;
                    if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_COLOR) {
                        datas.readUnsignedInt();
                        datas.readUnsignedInt();
                        datas.readUnsignedInt();
                    }

                    // read uv1 index;
                    if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_UV1) {

                        uv1_1 = datas.readUnsignedInt();
                        uv1_2 = datas.readUnsignedInt();
                        uv1_3 = datas.readUnsignedInt();

                        faceData.uvIndices.push(
                            uv1_1 + 1,
                            uv1_2 + 1,
                            uv1_3 + 1
                            );
                    }

                    // read uv2 index;
                    if (nFormatDescribe & E3DParser.DATA_FORMAT_EXIST_VERTEX_UV2) {

                        faceData.uv2Indices.push(
                            datas.readUnsignedInt() + 1,
                            datas.readUnsignedInt() + 1,
                            datas.readUnsignedInt() + 1
                            );
                    }

                    faceData.indexIds.push(String(PosIndex1 + 1) + "/" + String(uv1_1 + 1) + "/" + String(PosIndex1 + 1));
                    faceData.indexIds.push(String(PosIndex2 + 1) + "/" + String(uv1_2 + 1) + "/" + String(PosIndex2 + 1));
                    faceData.indexIds.push(String(PosIndex3 + 1) + "/" + String(uv1_3 + 1) + "/" + String(PosIndex3 + 1));

                    geomtryData.source_faceData.push(faceData);
                }
            }

            geomtryData = GeomtryData.translateMaterialGroup(geomtryData);
            var model: SubGeomtry = new SubGeomtry();

            model.setGeomtryData(geomtryData.indices, geomtryData.vertexDatas);
            model.buildBoundBox(model.positionSize + model.normalSize + model.colorSize + model.uvSize + model.uv2Size);
            return model;
        }

        private static readSkeletonAnimToBinary(nFormatDescribe: number, datas: ByteArray) {
        }
    }
}