#ifndef MAT4_H_INCLUDED
#define MAT4_H_INCLUDED

#include "utility.h"

struct kmVec3;
struct kmVec4;
struct kmMat3;
struct kmQuaternion;
struct kmPlane;

/*
A 4x4 matrix

        | 0   4   8  12 |
mat =   | 1   5   9  13 |
        | 2   6  10  14 |
        | 3   7  11  15 |
*/

#ifdef __cplusplus
extern "C" {
#endif

typedef struct kmMat4 {
    kmScalar mat[16];
} kmMat4;

extern kmMat4 gkmMat4;
extern kmMat4 matIdentity;

 kmMat4* const kmMat4Fill(kmMat4* pOut, const kmScalar* pMat);
 kmMat4* const kmMat4Identity(kmMat4* pOut);
 kmMat4* const kmMat4Inverse(kmMat4* pOut, const kmMat4* pM);
 kmMat4* const kmMat4Invert(kmMat4 *pOut, const kmMat4* pM);
 const int kmMat4IsIdentity(const kmMat4* pIn);
 kmMat4* const kmMat4Transpose(kmMat4* pOut, const kmMat4* pIn);
 kmMat4* const kmMat4Multiply(kmMat4* pOut, const kmMat4* pM1, const kmMat4* pM2);
 kmMat4* const kmMat4Assign(kmMat4* pOut, const kmMat4* pIn);
 const int kmMat4AreEqual(const kmMat4* pM1, const kmMat4* pM2);
 kmMat4* const kmMat4CreateRotationX(kmMat4* pOut, const kmScalar radians);
 kmMat4* const kmMat4CreateRotationY(kmMat4* pOut, const kmScalar radians);
 kmMat4* const kmMat4CreateRotationZ(kmMat4* pOut, const kmScalar radians);
 kmMat4* const kmMat4RotateX(kmMat4* pOut, kmMat4* pIn, kmScalar radians);
 kmMat4* const kmMat4RotateY(kmMat4* pOut, kmMat4* pIn, kmScalar radians);
 kmMat4* const kmMat4RotateZ(kmMat4* pOut, kmMat4* pIn, kmScalar radians);
 kmMat4* const kmMat4RotationPitchYawRoll(kmMat4* pOut, const kmScalar pitch, const kmScalar yaw, const kmScalar roll);
 kmMat4* const kmMat4RotationTranslation(kmMat4* pOut, const struct kmMat3* rotation, const struct kmVec3* translation);
 kmMat4* const kmMat4CreateScalNum(kmMat4* pOut, const kmScalar x, const kmScalar y, const kmScalar z);
 kmMat4* const kmMat4CreateScalVec3(kmMat4* pOut, const struct kmVec3* pIn );
 kmMat4* const kmMat4Scal(kmMat4* pOut, kmMat4* pIn, const struct kmVec3 *pV);
 kmMat4* const kmMat4CreateTranslation(kmMat4* pOut, const kmScalar x, const kmScalar y, const kmScalar z);
 kmMat4* const kmMat4Translation(kmMat4* pOut,kmMat4* pIn, const kmScalar x, const kmScalar y, const kmScalar z);

 struct kmVec3* const kmMat4GetUpVec3(struct kmVec3* pOut, const kmMat4* pIn);
 struct kmVec3* const kmMat4GetRightVec3(struct kmVec3* pOut, const kmMat4* pIn);
 struct kmVec3* const kmMat4GetForwardVec3(struct kmVec3* pOut, const kmMat4* pIn);
 struct kmVec3* const kmMat4GetUp(struct kmVec3* pOut, const kmMat4* pIn);
 struct kmVec3* const kmMat4GetDown(struct kmVec3* pOut, const kmMat4* pIn);
 struct kmVec3* const kmMat4GetRight(struct kmVec3* pOut, const kmMat4* pIn);
 struct kmVec3* const kmMat4GetLeft(struct kmVec3* pOut, const kmMat4* pIn);
 struct kmVec3* const kmMat4GetForwrad(struct kmVec3* pOut, const kmMat4* pIn);
 struct kmVec3* const kmMat4GetBack(struct kmVec3* pOut, const kmMat4 *pIn);
 struct kmVec3* const kmMat3Transform(struct kmVec3* pOut, const kmMat4* pIn, float x, float y, float z, float w);
 struct kmVec4* const kmMat4Transform(struct kmVec4* pOut, const kmMat4* pIn, float x, float y, float z, float w);
 const int kmMat4Decompose( const kmMat4* pIn, struct kmVec3* scale, struct kmQuaternion* rotation, struct kmVec3* translation);

 kmMat4* const kmMat4PerspectiveProjection(kmMat4* pOut, kmScalar fovY, kmScalar aspect, kmScalar zNear, kmScalar zFar);
 kmMat4* const kmMat4OrthographicProjection(kmMat4* pOut, kmScalar left, kmScalar right, kmScalar bottom, kmScalar top, kmScalar nearVal, kmScalar farVal);
 kmMat4* const kmMat4LookAt(kmMat4* pOut, const struct kmVec3* pEye, const struct kmVec3* pCenter, const struct kmVec3* pUp);

 kmMat4* const kmMat4RotationAxisAngle(kmMat4* pOut, const struct kmVec3* axis, kmScalar radians);
 struct kmMat3* const kmMat4ExtractRotation(struct kmMat3* pOut, const kmMat4* pIn);
 struct kmPlane* const kmMat4ExtractPlane(struct kmPlane* pOut, const kmMat4* pIn, const kmEnum plane);
 struct kmVec3* const kmMat4RotationToAxisAngle(struct kmVec3* pAxis, kmScalar* radians, const kmMat4* pIn);
 // add by hgl
 kmMat4* const kmMat4RotationQuaternion(kmMat4* pOut, const struct kmQuaternion* pQ);
 kmMat4* const kmMat4CreateRotation(kmMat4* pOut, const struct kmVec3* axis, float angle);
 kmMat4* kmMat4CreateQuaRotation(kmMat4* pOut, const struct kmQuaternion* pIn);
 kmMat4* kmMat4RotateQuaternion(kmMat4* pOut, kmMat4* pIn, const struct kmQuaternion* pQua );
 kmMat4* kmMat4RotateVecScalar(kmMat4* pOut, const kmMat4* pIn, const struct kmVec3 *axis, float angle);
 kmMat4* kmMat4CreateBillboard(kmMat4* pOut, const struct kmVec3* objpos, const struct kmVec3* campos, const struct kmVec3* camUp, const struct kmVec3* camForward);
 kmMat4* kmMat4CreatLookAt(kmMat4* pOut, const struct kmVec3* eyepos, const struct kmVec3* targetpos, const struct kmVec3* up);
 kmMat4* kmMat4AddMat(kmMat4* pOut, const kmMat4* pMat1, const kmMat4* pMat2);
 kmMat4* kmMat4AddScalar(kmMat4* pOut, const kmMat4* pIn, float scalar);
 kmMat4* kmMat4MultiplyScaler(kmMat4* pOut, const kmMat4* pIn, float scalar);
 kmMat4* kmMat4Negate(kmMat4* pOut, const kmMat4* pIn);
 kmScalar kmMat4Determinant(const kmMat4* pIn);
 kmMat4* kmMat4CreateReflection(kmMat4* pOut, const struct kmVec3* nor, kmScalar dis);

#ifdef __cplusplus
}
#endif
#endif /* MAT4_H_INCLUDED */
