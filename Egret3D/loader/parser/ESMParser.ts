module Egret3D {

    export class ESMParser {

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

            geomtry.buildBoundBox(geomtry.vertexAttLength);

            geomtry.textureFile = textureDiffuse;
            geomtry.textureSpecular = textureSpecular;
            geomtry.textureBump = textureNormal;

            return geomtry;
        }

        public static readMeshInfo(bytes: ByteArray, geomtryData: GeometryData, formatDescription: number, version: number): void {

            if (formatDescription & E3DDataFormat.DATA_FORMAT_EXIST_VERTEX_POS) {
                ESMParser.readVertexInfo(bytes, geomtryData, version);
            }

            if (formatDescription & E3DDataFormat.DATA_FORMAT_EXIST_VERTEX_NORMAL) {
                ESMParser.readVertexNormalsInfo(bytes, geomtryData, version);
            }

            if (formatDescription & E3DDataFormat.DATA_FORMAT_EXIST_VERTEX_COLOR) {
                ESMParser.readVertexColorsInfo(bytes, geomtryData, version);
            }

            if (formatDescription & E3DDataFormat.DATA_FORMAT_EXIST_VERTEX_UV1) {
                ESMParser.readVertexUVInfo(bytes, geomtryData.source_uvData, version);
            }

            if (formatDescription & E3DDataFormat.DATA_FORMAT_EXIST_VERTEX_UV2) {
                ESMParser.readVertexUVInfo(bytes, geomtryData.source_uv2Data, version);
            }

            ESMParser.readVertexIndexInfo(bytes, geomtryData, formatDescription, version);
        }

        public static readVertexInfo(bytes: ByteArray, geomtryData: GeometryData, version: number): void {

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

        public static readVertexNormalsInfo(bytes: ByteArray, geomtryData: GeometryData, version: number): void {

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

        public static readVertexColorsInfo(bytes: ByteArray, geomtryData: GeometryData, version: number): void {

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

        public static readVertexUVInfo(bytes: ByteArray, source_uvData: Array<UV>, version: number): void {

            var uvCount: number = bytes.readInt();

            for (var i: number = 0; i < uvCount; i++) {

                source_uvData.push(
                    new UV(bytes.readFloat(), bytes.readFloat())
                    );
            }
        }

        public static readVertexIndexInfo(bytes: ByteArray, geomtryData: GeometryData, formatDescription: number, version: number): void {

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

                if (formatDescription & E3DDataFormat.DATA_FORMAT_EXIST_VERTEX_NORMAL) {

                    faceData.normalIndices.push(
                        bytes.readUnsignedInt() + 1,
                        bytes.readUnsignedInt() + 1,
                        bytes.readUnsignedInt() + 1
                        );
                }

                if (formatDescription & E3DDataFormat.DATA_FORMAT_EXIST_VERTEX_COLOR) {

                    faceData.colorIndices.push(
                        bytes.readUnsignedInt() + 1,
                        bytes.readUnsignedInt() + 1,
                        bytes.readUnsignedInt() + 1 
                    );
                }

                if (formatDescription & E3DDataFormat.DATA_FORMAT_EXIST_VERTEX_UV1) {

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

                if (formatDescription & E3DDataFormat.DATA_FORMAT_EXIST_VERTEX_UV2) {

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

        public static readBoneSkinInfo(bytes: ByteArray, geomtryData: GeometryData, skeleton: Skeleton, version: number): void {

            ESMParser.readBoneInfo(bytes, skeleton, version);

            ESMParser.readSkinInfo(bytes, geomtryData, version);
        }

        public static readBoneInfo(bytes: ByteArray, skeleton: Skeleton, version: number): void {

            var nBoneCount: number = bytes.readUnsignedByte();

            var orientation: Quaternion = new Quaternion();
            var rotation: Vector3D = new Vector3D();
            var scaling: Vector3D = new Vector3D();
            var translation: Vector3D = new Vector3D();

            for (var i: number = 0; i < nBoneCount; i++) {

                var joint: Joint = new Joint();

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

                /*joint.inverseBindPose = orientation.toMatrix3D();
                joint.inverseBindPose.appendScale(scaling.x, scaling.y, scaling.z);
                joint.inverseBindPose.appendTranslation(translation.x, translation.y, translation.z);*/
                joint.inverseBindPose = new Matrix4_4();
                joint.inverseBindPose.recompose([translation, rotation, scaling]);
                skeleton.joints.push(joint);
            }
        }

        public static readSkinInfo(bytes: ByteArray, geomtryData: GeometryData, version: number): void {

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