module Egret3D {

    // data format describe;
    export enum ESMDataFormat {
        DATA_FORMAT_STATIC_MODEL = 0x00000001,
        DATA_FORMAT_SKELETAL_ANIM_MODEL = 0x00000002,
        DATA_FORMAT_EXPORT_MESH = 0x00000004,
        DATA_FORMAT_EXIST_VERTEX_POS = 0x00000008,
        DATA_FORMAT_EXIST_VERTEX_NORMAL = 0x00000010,
        DATA_FORMAT_EXIST_VERTEX_TANGENT = 0x00000020,
        DATA_FORMAT_EXIST_VERTEX_COLOR = 0x00000040,
        DATA_FORMAT_EXIST_VERTEX_UV1 = 0x00000080,
        DATA_FORMAT_EXIST_VERTEX_UV2 = 0x00000100,
        DATA_FORMAT_EXIST_SKELETAL_DATA = 0x00000200,
        DATA_FORMAT_EXIST_WEIGHTS_DATA = 0x00000400
    }
    /**
     * @language zh_CN
     * @class Egret3D.ESMParser
     * @classdesc
     * 用 ESMParser 类 解析.esm 文件
     */
    export class ESMParser {

        /**
          * @language zh_CN
          * @param datas 加载的二进制流
          * @returns GeometryBase
          */
        public static parse(datas: ArrayBuffer): GeometryBase {

            var bytes: ByteArray = new ByteArray(datas);

            var geomtryData: GeometryData = new GeometryData();

            var formatDescription: number = bytes.readUnsignedInt();

            var version: number = (formatDescription >> 28) & 0x0F;

            var textureDiffuse: string = bytes.readUTF();

            var textureSpecular: string = "";

            var textureNormal: string = "";

            if (version > 0) {

                textureSpecular = bytes.readUTF();

                textureNormal = bytes.readUTF();
            }

            ESMParser.readMeshInfo(bytes, geomtryData, formatDescription, version);

            var skeleton: Skeleton = new Skeleton();

            ESMParser.readBoneSkinInfo(bytes, geomtryData, skeleton, version);

            var geomtry: GeometryBase;

            if (geomtryData.source_skinData.length > 0) {

                var skinGeomtry: SkinGeometry = new SkinGeometry();

                skinGeomtry.vertexAttLength = geomtryData.vertexAttLength = 17 + 8;

                geomtryData = GeometryData.build(geomtryData);

                skinGeomtry.setGeomtryData(geomtryData.indices, geomtryData.vertexDatas, skeleton);

                geomtry = skinGeomtry;
            }
            else {
                geomtryData = GeometryData.build(geomtryData);

                var staticGeomtry: SubGeometry = new SubGeometry();

                staticGeomtry.setGeomtryData(geomtryData.indices, geomtryData.vertexDatas);

                geomtry = staticGeomtry;
            }

            geomtry.buildBoundBox();

            geomtry.textureFile = textureDiffuse;
            geomtry.textureSpecular = textureSpecular;
            geomtry.textureBump = textureNormal;

            return geomtry;
        }

        /**
         * @language zh_CN
         * 读取mesh信息到传入的geomtryData中
         * @param bytes 二进制流
         * @param geomtryData 网格实例
         * @param formatDescription 数据格式
         * @param version 版本
         */
        private static readMeshInfo(bytes: ByteArray, geomtryData: GeometryData, formatDescription: number, version: number): void {

            if (formatDescription & ESMDataFormat.DATA_FORMAT_EXIST_VERTEX_POS) {
                ESMParser.readVertexInfo(bytes, geomtryData, version);
            }

            if (formatDescription & ESMDataFormat.DATA_FORMAT_EXIST_VERTEX_NORMAL) {
                ESMParser.readVertexNormalsInfo(bytes, geomtryData, version);
            }

            if (formatDescription & ESMDataFormat.DATA_FORMAT_EXIST_VERTEX_COLOR) {
                ESMParser.readVertexColorsInfo(bytes, geomtryData, version);
            }

            if (formatDescription & ESMDataFormat.DATA_FORMAT_EXIST_VERTEX_UV1) {
                ESMParser.readVertexUVInfo(bytes, geomtryData.source_uvData, version);
            }

            if (formatDescription & ESMDataFormat.DATA_FORMAT_EXIST_VERTEX_UV2) {
                ESMParser.readVertexUVInfo(bytes, geomtryData.source_uv2Data, version);
            }

            ESMParser.readVertexIndexInfo(bytes, geomtryData, formatDescription, version);
        }

        /**
         * @language zh_CN
         * 读取顶点信息到geomtryData实例中
         * @param bytes 二进制信息
         * @param geomtryData geomtryData实例
         * @param version 版本
         */
        private static readVertexInfo(bytes: ByteArray, geomtryData: GeometryData, version: number): void {

            var vertexCount: number = bytes.readInt();

            for (var i: number = 0; i < vertexCount; i++) {

                geomtryData.source_vertexData.push(
                    new Vector3D(
                        bytes.readFloat(),
                        bytes.readFloat(),
                        bytes.readFloat())
                    );
            }
        }

        /**
         * @language zh_CN
         * 读取顶点法线信息
         * @param bytes 
         * @param geomtryData 
         * @param version 
         */
        private static readVertexNormalsInfo(bytes: ByteArray, geomtryData: GeometryData, version: number): void {

            var vertexNormalCount: number = bytes.readInt();

            for (var i: number = 0; i < vertexNormalCount; i++) {

                geomtryData.source_normalData.push(
                    new Vector3D(
                        bytes.readFloat(),
                        bytes.readFloat(),
                        bytes.readFloat())
                    );
            }
        }

        /**
         * @language zh_CN
         * 读取顶点颜色
         * @param bytes 
         * @param geomtryData 
         * @param version 
         */
        private static readVertexColorsInfo(bytes: ByteArray, geomtryData: GeometryData, version: number): void {

            var vertexColorCount: number = bytes.readInt();

            for (var i: number = 0; i < vertexColorCount; i++) {

                geomtryData.source_vertexColorData.push(
                    new Vector3D(
                        bytes.readFloat(),
                        bytes.readFloat(),
                        bytes.readFloat(),
                        bytes.readFloat())
                    );
            }
        }

        /**
         * @language zh_CN
         * 读取顶点UV
         * @param bytes 
         * @param source_uvData 
         * @param version 
         */
        private static readVertexUVInfo(bytes: ByteArray, source_uvData: Array<UV>, version: number): void {

            var uvCount: number = bytes.readInt();

            for (var i: number = 0; i < uvCount; i++) {

                source_uvData.push(
                    new UV(bytes.readFloat(), bytes.readFloat())
                    );
            }
        }

        private static readVertexIndexInfo(bytes: ByteArray, geomtryData: GeometryData, formatDescription: number, version: number): void {

            var PosIndex1: number, PosIndex2: number, PosIndex3: number;
            var uv1_1: number, uv1_2: number, uv1_3: number;

            var facesCount: number = bytes.readInt();

            var uv1_index: number = 1;

            var uv2_index: number = 1;

            for (var i: number = 0; i < facesCount; i++) {

                var faceData: FaceData = new FaceData();

                PosIndex1 = bytes.readUnsignedInt();
                PosIndex2 = bytes.readUnsignedInt();
                PosIndex3 = bytes.readUnsignedInt();

                faceData.vertexIndices.push(
                    PosIndex1 + 1,
                    PosIndex2 + 1,
                    PosIndex3 + 1
                    );

                if (formatDescription & ESMDataFormat.DATA_FORMAT_EXIST_VERTEX_NORMAL) {

                    faceData.normalIndices.push(
                        bytes.readUnsignedInt() + 1,
                        bytes.readUnsignedInt() + 1,
                        bytes.readUnsignedInt() + 1
                        );
                }

                if (formatDescription & ESMDataFormat.DATA_FORMAT_EXIST_VERTEX_COLOR) {

                    faceData.colorIndices.push(
                        bytes.readUnsignedInt() + 1,
                        bytes.readUnsignedInt() + 1,
                        bytes.readUnsignedInt() + 1 
                    );
                }

                if (formatDescription & ESMDataFormat.DATA_FORMAT_EXIST_VERTEX_UV1) {

                    if (version >= 2) {
                        faceData.uvIndices.push(
                            bytes.readUnsignedInt() + 1,
                            bytes.readUnsignedInt() + 1,
                            bytes.readUnsignedInt() + 1
                        );
                    }
                    else {
                        faceData.uvIndices.push(
                            uv1_index++,
                            uv1_index++,
                            uv1_index++
                        );
                    }
                }

                if (formatDescription & ESMDataFormat.DATA_FORMAT_EXIST_VERTEX_UV2) {

                    if (version >= 2) {
                        faceData.uv2Indices.push(
                            bytes.readUnsignedInt() + 1,
                            bytes.readUnsignedInt() + 1,
                            bytes.readUnsignedInt() + 1
                        );
                    }
                    else {
                        faceData.uv2Indices.push(
                            uv2_index++,
                            uv2_index++,
                            uv2_index++
                        );
                    }

                }

                faceData.indexIds.push(String(PosIndex1 + 1) + "/" + String(uv1_1 + 1) + "/" + String(PosIndex1 + 1));
                faceData.indexIds.push(String(PosIndex2 + 1) + "/" + String(uv1_2 + 1) + "/" + String(PosIndex2 + 1));
                faceData.indexIds.push(String(PosIndex3 + 1) + "/" + String(uv1_3 + 1) + "/" + String(PosIndex3 + 1));

                geomtryData.source_faceData.push(faceData);
            }
        }

        private static readBoneSkinInfo(bytes: ByteArray, geomtryData: GeometryData, skeleton: Skeleton, version: number): void {

            ESMParser.readBoneInfo(bytes, skeleton, version);

            ESMParser.readSkinInfo(bytes, geomtryData, version);
        }

        private static readBoneInfo(bytes: ByteArray, skeleton: Skeleton, version: number): void {

            var nBoneCount: number = bytes.readUnsignedByte();

            var orientation: Quaternion = new Quaternion();
            var rotation: Vector3D = new Vector3D();
            var scaling: Vector3D = new Vector3D();
            var translation: Vector3D = new Vector3D();

            for (var i: number = 0; i < nBoneCount; i++) {

                var joint: Joint = new Joint(null);

                bytes.readInt();

                joint.parentIndex = bytes.readInt();

                joint.name = bytes.readUTF();

                rotation.x = bytes.readFloat() * Matrix3DUtils.RADIANS_TO_DEGREES;
                rotation.y = bytes.readFloat() * Matrix3DUtils.RADIANS_TO_DEGREES;
                rotation.z = bytes.readFloat() * Matrix3DUtils.RADIANS_TO_DEGREES;
                /*orientation.x = bytes.readFloat();
                orientation.y = bytes.readFloat();
                orientation.z = bytes.readFloat();
                orientation.w = bytes.readFloat();*/

                scaling.x = bytes.readFloat();
                scaling.y = bytes.readFloat();
                scaling.z = bytes.readFloat();

                translation.x = bytes.readFloat();
                translation.y = bytes.readFloat();
                translation.z = bytes.readFloat();

                joint.setInverseBindPose(translation, rotation, scaling);
                skeleton.joints.push(joint);
            }
        }

        private static readSkinInfo(bytes: ByteArray, geomtryData: GeometryData, version: number): void {

            var nVertsCount: number = bytes.readInt();

            var nBoneIndex: number = 0;

            var nBoneWeight: number = 0;

            for (var i: number = 0; i < nVertsCount; i++) {

                var nCount: number = bytes.readUnsignedByte();

                for (var j: number = 0; j < nCount; j++) {

                    nBoneIndex = bytes.readUnsignedByte();

                    nBoneWeight = bytes.readFloat();

                    geomtryData.source_skinData.push(
                        nBoneIndex,
                        nBoneWeight
                        );
                }

                for (var j: number = nCount; j < 4; j++) {

                    nBoneIndex = 0;

                    nBoneWeight = 0;

                    geomtryData.source_skinData.push(
                        nBoneIndex,
                        nBoneWeight
                        );
                }
            }
        }

    }
}