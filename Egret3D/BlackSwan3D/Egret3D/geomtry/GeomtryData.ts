module BlackSwan {
    export class GeomtryData {
        public static vertexAttLength: number = 17;

        public length: number;


        public source_indexData: Array<number> = new Array<number>();
        public source_vertexData: Array<Vector3D> = new Array<Vector3D>();
        public source_vertexColorData: Array<Vector3D> = new Array<Vector3D>();
        public source_normalData: Array<Vector3D> = new Array<Vector3D>();
        public source_tangtData: Array<number> = new Array<number>();
        public source_uvData: Array<UV> = new Array<UV>();
        public source_uv2Data: Array<UV> = new Array<UV>();
        public source_faceData: Array<FaceData> = new Array<FaceData>();

        public vertexIndex: number = 0;
        public indices: Array<number> = new Array<number>();
        public vertices: Array<number> = new Array<number>();
        public normals: Array<number> = new Array<number>();
        public tangts: Array<number> = new Array<number>();
        public verticesColor: Array<number> = new Array<number>();
        public uvs: Array<number> = new Array<number>();
        public uv2s: Array<number> = new Array<number>();


        public faceNormals: Array<number> = new Array<number>();
        public faceWeights: Array<number> = new Array<number>();

        public vertexDatas: Array<number>;
        
      



        public static translateMaterialGroup(geomtryData: GeomtryData): GeomtryData {
            var faces: Array<FaceData> = geomtryData.source_faceData;
            var face: FaceData;
            var numFaces: number = faces.length;
            var numVerts: number;

            var targetGeomtryData: GeomtryData = new GeomtryData();

            var j: number;
            for (var i: number = 0; i < numFaces; ++i) {
                face = faces[i];
                numVerts = face.indexIds.length - 1;
                for (j = 1; j < numVerts; ++j) {
                    this.translateVertexData(face, j, geomtryData, targetGeomtryData);
                    this.translateVertexData(face, 0, geomtryData, targetGeomtryData);
                    this.translateVertexData(face, j + 1, geomtryData, targetGeomtryData);
                }
            }
            if (targetGeomtryData.vertices.length > 0) {
                this.combinGeomtryData(targetGeomtryData);
            }

            return targetGeomtryData;
        }

        private static translateVertexData(face: FaceData, vertexIndex: number, sourceGeomtryData: GeomtryData, targetGeomtryData: GeomtryData) {
            var index: number;
            var vertex: Vector3D;
            var color: Vector3D;
            var vertexNormal: Vector3D;
            var uv: UV;

            if (!targetGeomtryData.indices[face.indexIds[vertexIndex]]) {

                index = targetGeomtryData.vertexIndex;
                targetGeomtryData.indices[face.indexIds[vertexIndex]] = ++targetGeomtryData.vertexIndex;

                vertex = sourceGeomtryData.source_vertexData[face.vertexIndices[vertexIndex] - 1];
                targetGeomtryData.vertices.push(vertex.x, vertex.y, vertex.z);

                if (sourceGeomtryData.source_vertexColorData != null && sourceGeomtryData.source_vertexColorData.length > 0) {
                    color = sourceGeomtryData.source_vertexColorData[face.vertexIndices[vertexIndex] - 1]

                    targetGeomtryData.verticesColor.push(color.r, color.g, color.b, color.a);
                }

                if (face.normalIndices.length > 0) {
                    vertexNormal = sourceGeomtryData.source_normalData[face.normalIndices[vertexIndex] - 1];
                    targetGeomtryData.normals.push(vertexNormal.x, vertexNormal.y, vertexNormal.z);
                }

                if (face.uvIndices.length > 0) {

                    try {
                        uv = sourceGeomtryData.source_uvData[face.uvIndices[vertexIndex] - 1];
                        targetGeomtryData.uvs.push(uv.u, uv.v);

                        if (sourceGeomtryData.source_uv2Data.length > 0) {
                            uv = sourceGeomtryData.source_uv2Data[face.uv2Indices[vertexIndex] - 1];
                            targetGeomtryData.uv2s.push(uv.u, uv.v);
                        }
                    } catch (e) {

                        switch (vertexIndex) {
                            case 0:
                                targetGeomtryData.uvs.push(0, 1);
                                break;
                            case 1:
                                targetGeomtryData.uvs.push(.5, 0);
                                break;
                            case 2:
                                targetGeomtryData.uvs.push(1, 1);
                        }
                    }


                }

            } else
                index = targetGeomtryData.indices[face.indexIds[vertexIndex]] - 1;

            targetGeomtryData.indices.push(index);
        }

        /**
        * 4 pos
        * 3 normal
        * 4 color
        * 2 uv
        * 2 uv2s
        * length 15
        **/
        public static combinGeomtryData(geomtrtData: GeomtryData, needTangent:boolean = true ) {

            var vertLen: number = (geomtrtData.vertices.length / 3) * GeomtryData.vertexAttLength;

            var index: number = 0;
            var v: number = 0;
            var n: number = 0;
            var t: number = 0;
            var u1: number = 0;
            var u2: number = 0;
            var c: number = 0;
            var data: Array<number> = geomtrtData.vertexDatas = new Array<number>(vertLen);

            while (index < vertLen) {
                data[index++] = geomtrtData.vertices[v++];
                data[index++] = geomtrtData.vertices[v++];
                data[index++] = geomtrtData.vertices[v++];

                if (geomtrtData.normals && geomtrtData.normals.length) {
                    data[index++] = geomtrtData.normals[n++];
                    data[index++] = geomtrtData.normals[n++];
                    data[index++] = geomtrtData.normals[n++];
                } else {
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                }

                if (geomtrtData.tangts && geomtrtData.source_tangtData.length) {
                    data[index++] = geomtrtData.tangts[t++];
                    data[index++] = geomtrtData.tangts[t++];
                    data[index++] = geomtrtData.tangts[t++];
                } else {
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                }

                if (geomtrtData.source_vertexColorData && geomtrtData.source_vertexColorData.length) {
                    data[index++] = geomtrtData.verticesColor[c++];
                    data[index++] = geomtrtData.verticesColor[c++];
                    data[index++] = geomtrtData.verticesColor[c++];
                    data[index++] = geomtrtData.verticesColor[c++];
                } else {
                    data[index++] = 1;
                    data[index++] = 1;
                    data[index++] = 1;
                    data[index++] = 1;
                }

                if (geomtrtData.uvs && geomtrtData.uvs.length) {
                    data[index++] = geomtrtData.uvs[u1++];
                    data[index++] = geomtrtData.uvs[u1++];

                    if (geomtrtData.uv2s && geomtrtData.uv2s.length) {
                        data[index++] = geomtrtData.uv2s[u2++];
                        data[index++] = geomtrtData.uv2s[u2++];
                    }
                    else {
                        data[index++] = geomtrtData.uvs[u2++];
                        data[index++] = geomtrtData.uvs[u2++];
                    }
                } else {
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                }
            }

            //if (needTangent)
            //    this.updateFaceTangents(geomtrtData
        }


		/**
		 * Updates the normals for each face.
		 */
        protected  static updateFaceNormals(geomtrtData: GeomtryData)
		{
            var i: number = 0, j: number = 0, k: number = 0;
            var index: number;
            var len: number = geomtrtData.indices.length;
            var x1: number, x2: number, x3: number;
            var y1: number, y2: number, y3: number;
            var z1: number, z2: number, z3: number;
            var dx1: number, dy1: number, dz1: number;
            var dx2: number, dy2: number, dz2: number;
            var cx: number, cy: number, cz: number;
            var d: number;
            var vertices: Array<number> = geomtrtData.vertexDatas ;
            var posStride: number = 17;
            var posOffset: number = 3;

      
        //if (_useFaceWeights)
        //    _faceWeights ||= new Vector.<number>(len / 3, true);

            while (i < len) {
            
            index = posOffset + geomtrtData.indices[i++] * posStride;
            x1 = vertices[index];
            y1 = vertices[index + 1];
            z1 = vertices[index + 2];
            index = posOffset + geomtrtData.indices[i++] * posStride;
            x2 = vertices[index];
            y2 = vertices[index + 1];
            z2 = vertices[index + 2];
            index = posOffset + geomtrtData.indices[i++] * posStride;
            x3 = vertices[index];
            y3 = vertices[index + 1];
            z3 = vertices[index + 2];
            dx1 = x3 - x1;
            dy1 = y3 - y1;
            dz1 = z3 - z1;
            dx2 = x2 - x1;
            dy2 = y2 - y1;
            dz2 = z2 - z1;
            cx = dz1 * dy2 - dy1 * dz2;
            cy = dx1 * dz2 - dz1 * dx2;
            cz = dy1 * dx2 - dx1 * dy2;
            d = Math.sqrt(cx * cx + cy * cy + cz * cz);
            // length of cross product = 2*triangle area
            if (true) {
                var w: number = d * 10000;
                if (w < 1)
                    w = 1;
                geomtrtData.faceWeights[k++] = w;
            }
            d = 1 / d;
            geomtrtData.faceNormals[j++] = cx * d;
            geomtrtData.faceNormals[j++] = cy * d;
            geomtrtData.faceNormals[j++] = cz * d;
        }
        //_faceNormalsDirty = false;
    }
		/**
		 * Updates the vertex normals based on the geometry.
		 */
        protected static updateVertexNormals(geomtrtData: GeomtryData)
        {
            this.updateFaceNormals(geomtrtData);
			
			var v1:number;
            var f1: number = 0, f2: number = 1, f3: number = 2;
            var lenV: number = geomtrtData.vertexDatas.length;
            var normalStride: number = 17;
            var normalOffset: number = 3;
			
                //target ||= new Vector.<Number>(lenV, true);
                //v1 = normalOffset;
                //while(v1 < lenV) {
                //    target[v1] = 0.0;
                //    target[v1 + 1] = 0.0;
                //    target[v1 + 2] = 0.0;
                //    v1 += normalStride;
                //}
			
            var i: number = 0, k: number = 0  ;
            var lenI: number = geomtrtData.indices.length;
            var index: number;
            var weight: number;
			
                while(i < lenI) {
                    weight = geomtrtData.faceWeights[k++];
                    index = normalOffset + geomtrtData.indices[i++] * normalStride;
                    geomtrtData.vertexDatas[index] += geomtrtData.faceNormals[f1] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f2] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f3] * weight;
                    index = normalOffset + geomtrtData.indices[i++] * normalStride;
                    geomtrtData.vertexDatas[index] += geomtrtData.faceNormals[f1] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f2] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f3] * weight;
                    index = normalOffset + geomtrtData.indices[i++] * normalStride;
                    geomtrtData.vertexDatas[index] += geomtrtData.faceNormals[f1] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f2] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f3] * weight;
                    f1 += 3;
                    f2 += 3;
                    f3 += 3;
                }
			
			//v1 = normalOffset;
            //    while(v1 < lenV) {
            //        var vx: Number = target[v1];
            //        var vy: Number = target[v1 + 1];
            //        var vz: Number = target[v1 + 2];
            //        var d: Number = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
            //        target[v1] = vx * d;
            //        target[v1 + 1] = vy * d;
            //        target[v1 + 2] = vz * d;
            //        v1 += normalStride;
            //    }
			
			//_vertexNormalsDirty = false;
            }


        /**
        * 4 pos
        * 3 normal
        * 3 tangent
        * 4 color
        * 2 uv
        * 2 uv2s
        * length 15
        **/
        /**
		 * Updates the tangents for each face.
		 */
        protected static updateFaceTangents(geomtrtData: GeomtryData) {
            var i: number = 0;
            var index1: number, index2: number, index3: number;
            var len: number = geomtrtData.indices.length
            var ui: number, vi: number;
            var v0: number;
            var dv1: number, dv2: number;
            var denom: number;
            var x0: number, y0: number, z0: number;
            var dx1: number, dy1: number, dz1: number;
            var dx2: number, dy2: number, dz2: number;
            var cx: number, cy: number, cz: number;
            var vertices: Array<number> = geomtrtData.vertexDatas;
            var uvs: Array<number> = geomtrtData.vertexDatas;

            var posStride: number = 17;
            var posOffset: number = 0;

            var texStride: number = 17;
            var texOffset: number = 15;

            var tangtsStride: number = 17 ;
            var tangtsOffset: number = 6;

            //geomtrtData.tangts = new Array<number>(len);
            //if (geomtrtData.tangts.length < len) {
            //    geomtrtData.tangts.length = len;
            //}

            while (i < len) {
                index1 = geomtrtData.indices[i];
                index2 = geomtrtData.indices[i + 1];
                index3 = geomtrtData.indices[i + 2];

                ui = texOffset + index1 * texStride + 1;
                v0 = uvs[ui];
                ui = texOffset + index2 * texStride + 1;
                dv1 = uvs[ui] - v0;
                ui = texOffset + index3 * texStride + 1;
                dv2 = uvs[ui] - v0;

                vi = posOffset + index1 * posStride;
                x0 = vertices[vi];
                y0 = vertices[vi + 1];
                z0 = vertices[vi + 2];
                vi = posOffset + index2 * posStride;
                dx1 = vertices[vi] - x0;
                dy1 = vertices[vi + 1] - y0;
                dz1 = vertices[vi + 2] - z0;
                vi = posOffset + index3 * posStride;
                dx2 = vertices[vi] - x0;
                dy2 = vertices[vi + 1] - y0;
                dz2 = vertices[vi + 2] - z0;

                cx = dv2 * dx1 - dv1 * dx2;
                cy = dv2 * dy1 - dv1 * dy2;
                cz = dv2 * dz1 - dv1 * dz2;
                denom = 1 / Math.sqrt(cx * cx + cy * cy + cz * cz);

                vi = tangtsOffset + i++ * tangtsStride;
                geomtrtData.vertexDatas[vi] = denom * cx;
                geomtrtData.vertexDatas[vi++] = denom * cy;
                geomtrtData.vertexDatas[vi++] = denom * cz;
                //geomtrtData.tangts[i++] = vi;
                //geomtrtData.tangts[i++] = vi;
                //geomtrtData.tangts[i++] = vi;
            }
        }
    }
} 