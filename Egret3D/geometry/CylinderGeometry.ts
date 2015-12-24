module Egret3D {
    /**
     * @language zh_CN
     * @class Egret3D.CylinderGeometry
     * @classdesc
     * CylinderGeometry类 表示圆柱体
     */
    export class CylinderGeometry extends SubGeometry {
                
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            super();

            this.buildGeomtry();
        }
                                                
        /**
        * @language zh_CN
        * 生成网格
        */
        public buildGeomtry() {

            var vertices = new Array<number>();

            var vertexIndices = new Array<number>();

            var m_nSegments: number = 10;
            var m_rRadius: number = 10;
            var m_rHeight: number = 60;

            var nCurrentSegment: number = 10;

            var  rDeltaSegAngle: number  = (2.0 * Math.PI / m_nSegments);
            var rSegmentLength: number  = 1.0  / m_nSegments;

            for (nCurrentSegment = 0; nCurrentSegment <= m_nSegments; nCurrentSegment++)
            {
                var x0: number = m_rRadius * Math.sin(nCurrentSegment * rDeltaSegAngle);

                var z0: number  = m_rRadius * Math.cos(nCurrentSegment * rDeltaSegAngle);

                vertices.push(
                    x0, 0.0 + (m_rHeight / 2.0), z0, x0, 0.0, z0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                    x0, 0.0 - (m_rHeight / 2.0), z0, x0, 0.0, z0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            }

            vertices.push(0.0, 0.0  + (m_rHeight / 2.0), 0.0, 0.0, 1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);

            for (nCurrentSegment = 0; nCurrentSegment <= m_nSegments; nCurrentSegment++)
            {
                var  x0: number  = m_rRadius * Math.sin(nCurrentSegment * rDeltaSegAngle);
                var z0: number  = m_rRadius * Math.cos(nCurrentSegment * rDeltaSegAngle);

                //float tu0 = (0.5f * sinf(nCurrentSegment * rDeltaSegAngle)) + 0.5f;
                //float tv0 = (0.5f * cosf(nCurrentSegment * rDeltaSegAngle)) + 0.5f;

                vertices.push(x0, 0.0  + (m_rHeight / 2.0), z0, 0.0, 1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            }

            vertices.push(0.0, 0.0 - (m_rHeight / 2.0), 0.0, 0.0, -1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);

            for (nCurrentSegment = m_nSegments; nCurrentSegment >= 0; nCurrentSegment--)
            {
                var  x0: number  = m_rRadius * Math.sin(nCurrentSegment * rDeltaSegAngle);
                var z0: number  = m_rRadius * Math.cos(nCurrentSegment * rDeltaSegAngle);

                vertices.push(x0, 0.0 - (m_rHeight / 2.0), z0, 0.0, -1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
             }

            this.setGeomtryData(vertexIndices, vertices);
        }
    }
} 