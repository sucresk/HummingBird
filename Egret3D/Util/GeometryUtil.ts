module Egret3D {
    export class GeometryUtil {
        public static packageGeometry(num: number, vertexLen: number, source: GeometryBase): GeometryBase {
            source.numberOfVertices = source.verticesData.length / source.vertexAttLength;
            var geometry: SubGeometry = new SubGeometry(); 
            var vertexAttLength: number = source.vertexAttLength;
            var newGeometryNumberOfVertices: number =  source.numberOfVertices * vertexLen ; 
            var vertexData: Array<number> = new Array<number>(newGeometryNumberOfVertices * num );
            var indexData: Array<number> = new Array<number>(num * source.indexData.length );

            for (var i: number = 0; i < num; i++){
                for (var j: number = 0; j < source.numberOfVertices ; j++){
                    vertexData[(j * vertexLen + 0) + i * newGeometryNumberOfVertices ] = source.verticesData[j * vertexAttLength + 0];
                    vertexData[(j * vertexLen + 1) + i * newGeometryNumberOfVertices ] = source.verticesData[j * vertexAttLength + 1];
                    vertexData[(j * vertexLen + 2) + i * newGeometryNumberOfVertices] = source.verticesData[j * vertexAttLength + 2];
                    vertexData[(j * vertexLen + 3) + i * newGeometryNumberOfVertices ] = i ;
                    vertexData[(j * vertexLen + 4) + i * newGeometryNumberOfVertices] = 0;
                    vertexData[(j * vertexLen + 5) + i * newGeometryNumberOfVertices] = 0;
                    vertexData[(j * vertexLen + 6) + i * newGeometryNumberOfVertices] = 0;
                    vertexData[(j * vertexLen + 7) + i * newGeometryNumberOfVertices ] = source.verticesData[j * vertexAttLength + 13];
                    vertexData[(j * vertexLen + 8) + i * newGeometryNumberOfVertices ] = source.verticesData[j * vertexAttLength + 14];
                }
            }

            for (var i: number = 0; i < num; i++) {
                for (var j: number = 0; j < source.indexData.length; j++) {
                    indexData[j + i * source.indexData.length ] = source.indexData[j] + i * source.numberOfVertices ;
                }
            }

            geometry.setGeomtryData(indexData, vertexData);
            geometry.geometryNum = num;
            geometry.vertexAttLength = vertexLen;
            geometry.numberOfVertices = geometry.verticesData.length / geometry.vertexAttLength;
            return geometry; 
        }
    }
}