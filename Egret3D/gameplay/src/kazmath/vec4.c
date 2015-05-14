/*
Copyright (c) 2008, Luke Benstead.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


#include <memory.h>
#include <assert.h>
#include <string.h>

#include "kazmath/utility.h"
#include "kazmath/vec4.h"
#include "kazmath/mat4.h"

kmVec4 vec4Zero = { 0.0f, 0.0f, 0.0f, 0.0f };
kmVec4 vec4One = { 1.0f, 1.0f, 1.0f, 1.0f };
kmVec4 vec4uintX = { 1.0f, 0.0f, 0.0f, 0.0f };
kmVec4 vec4uintY = { 0.0f, 1.0f, 0.0f, 0.0f };
kmVec4 vec4uintZ = { 0.0f, 0.0f, 1.0f, 0.0f };
kmVec4 vec4uintW = { 0.0f, 0.0f, 1.0f, 1.0f };

kmVec4* kmVec4Fill(kmVec4* pOut, kmScalar x, kmScalar y, kmScalar z, kmScalar w)
{
    pOut->x = x;
    pOut->y = y;
    pOut->z = z;
    pOut->w = w;
    return pOut;
}

kmVec4* kmVec4Set(kmVec4* pOut, const kmVec4*pV1, const kmVec4* pV2)
{
	pOut->x = pV2->x - pV1->x;
	pOut->y = pV2->y - pV1->y;
	pOut->z = pV2->z - pV1->z;
	pOut->w = pV2->w - pV1->w;
	return pOut;
}


/// Adds 2 4D vectors together. The result is store in pOut, the function returns
/// pOut so that it can be nested in another function.
kmVec4* kmVec4Add(kmVec4* pOut, const kmVec4* pV1, const kmVec4* pV2) {
    pOut->x = pV1->x + pV2->x;
    pOut->y = pV1->y + pV2->y;
    pOut->z = pV1->z + pV2->z;
    pOut->w = pV1->w + pV2->w;

    return pOut;
}

/// Returns the dot product of 2 4D vectors
kmScalar kmVec4Dot(const kmVec4* pV1, const kmVec4* pV2) {
    return (  pV1->x * pV2->x
            + pV1->y * pV2->y
            + pV1->z * pV2->z
            + pV1->w * pV2->w );
}

/// Returns the length of a 4D vector, this uses a sqrt so if the squared length will do use
/// kmVec4LengthSq
kmScalar kmVec4Length(const kmVec4* pIn) {
    return sqrtf(kmSQR(pIn->x) + kmSQR(pIn->y) + kmSQR(pIn->z) + kmSQR(pIn->w));
}

/// Returns the length of the 4D vector squared.
kmScalar kmVec4LengthSquared(const kmVec4* pIn) {
    return kmSQR(pIn->x) + kmSQR(pIn->y) + kmSQR(pIn->z) + kmSQR(pIn->w);
}

kmScalar kmVec4Distance(const kmVec4* pV1, const kmVec4* pV2)
{
	float dx = pV1->x - pV2->x;
	float dy = pV1->y - pV2->y;
	float dz = pV1->z - pV2->z;
	float dw = pV1->w - pV2->w;

	return sqrt(dx * dx + dy * dy + dz * dz + dw * dw );
}
kmScalar kmVec4DistanceSquared(const kmVec4* pV1, const kmVec4* pV2)
{
	float dx = pV1->x - pV2->x;
	float dy = pV1->y - pV2->y;
	float dz = pV1->z - pV2->z;
	float dw = pV1->w - pV2->w;

	return (dx * dx + dy * dy + dz * dz + dw * dw);
}

/// Returns the interpolation of 2 4D vectors based on t. Currently not implemented!
kmVec4* kmVec4Lerp(kmVec4* pOut, const kmVec4* pV1, const kmVec4* pV2, kmScalar t) {
    assert(0);
    return pOut;
}

/// Normalizes a 4D vector. The result is stored in pOut. pOut is returned
kmVec4* kmVec4Normalize(kmVec4* pOut, const kmVec4* pIn) {
    kmScalar l = 1.0f / kmVec4Length(pIn);

    pOut->x *= l;
    pOut->y *= l;
    pOut->z *= l;
    pOut->w *= l;

    return pOut;
}

/// Scales a vector to the required length. This performs a Normalize before multiplying by S.
kmVec4* kmVec4Scale(kmVec4* pOut, const kmVec4* pIn, const kmScalar s) {
    kmVec4Normalize(pOut, pIn);

    pOut->x *= s;
    pOut->y *= s;
    pOut->z *= s;
    pOut->w *= s;
    return pOut;
}

/// Subtracts one 4D pV2 from pV1. The result is stored in pOut. pOut is returned
kmVec4* kmVec4Subtract(kmVec4* pOut, const kmVec4* pV1, const kmVec4* pV2) {
    pOut->x = pV1->x - pV2->x;
    pOut->y = pV1->y - pV2->y;
    pOut->z = pV1->z - pV2->z;
    pOut->w = pV1->w - pV2->w;

    return pOut;
}

/// Transforms a 4D vector by a matrix, the result is stored in pOut, and pOut is returned.
kmVec4* kmVec4Transform(kmVec4* pOut, const kmVec4* pV, const kmMat4* pM) {
    pOut->x = pV->x * pM->mat[0] + pV->y * pM->mat[4] + pV->z * pM->mat[8] + pV->w * pM->mat[12];
    pOut->y = pV->x * pM->mat[1] + pV->y * pM->mat[5] + pV->z * pM->mat[9] + pV->w * pM->mat[13];
    pOut->z = pV->x * pM->mat[2] + pV->y * pM->mat[6] + pV->z * pM->mat[10] + pV->w * pM->mat[14];
    pOut->w = pV->x * pM->mat[3] + pV->y * pM->mat[7] + pV->z * pM->mat[11] + pV->w * pM->mat[15];
    return pOut;
}

/// Loops through an input array transforming each vec4 by the matrix.
kmVec4* kmVec4TransformArray(kmVec4* pOut, unsigned int outStride,
            const kmVec4* pV, unsigned int vStride, const kmMat4* pM, unsigned int count) {
    unsigned int i = 0;
    //Go through all of the vectors
    while (i < count) {
        const kmVec4* in = pV + (i * vStride); //Get a pointer to the current input
        kmVec4* out = pOut + (i * outStride); //and the current output
        kmVec4Transform(out, in, pM); //Perform transform on it
        ++i;
    }

    return pOut;
}

int kmVec4AreEqual(const kmVec4* p1, const kmVec4* p2) {
    return (
        (p1->x < p2->x + kmEpsilon && p1->x > p2->x - kmEpsilon) &&
        (p1->y < p2->y + kmEpsilon && p1->y > p2->y - kmEpsilon) &&
        (p1->z < p2->z + kmEpsilon && p1->z > p2->z - kmEpsilon) &&
        (p1->w < p2->w + kmEpsilon && p1->w > p2->w - kmEpsilon)
    );
}

kmVec4* kmVec4Assign(kmVec4* pOut, const kmVec4* pIn) {
    assert(pOut != pIn);

    memcpy(pOut, pIn, sizeof(float) * 4);

    return pOut;
}

kmVec4* kmVec4FromColor(kmVec4* pOut, unsigned int color)
{
	float components[4];
	int componentIndex = 0;
	for (int i = 3; i >= 0; --i)
	{
		int component = (color >> i * 8) & 0x000000ff;

		components[componentIndex++] = (float)((component) / 255.0f);
	}
	//Vector4 value(components);
	kmVec4Fill(pOut, components[0], components[1], components[2], components[3]);
	return pOut;
}

kmVec4* kmVec4Clamp(kmVec4* pOut, const kmVec4* pIn, const kmVec4* min, const kmVec4* max)
{
	pOut->x = pIn->x;
	pOut->y = pIn->y;
	pOut->z = pIn->z;
	pOut->w = pIn->w;
	// Clamp the x value.
	if (pOut->x < min->x)
		pOut->x = min->x;
	if (pOut->x > max->x)
		pOut->x = max->x;

	// Clamp the y value.
	if (pOut->y < min->y)
		pOut->y = min->y;
	if (pOut->y > max->y)
		pOut->y = max->y;

	// Clamp the z value.
	if (pOut->z < min->z)
		pOut->z = min->z;
	if (pOut->z > max->z)
		pOut->z = max->z;

	// Clamp the z value.
	if (pOut->w < min->w)
		pOut->w = min->w;
	if (pOut->w > max->w)
		pOut->w = max->w;
	return pOut;
}

int kmVec4IsOne(const kmVec4* pIn)
{
	return pIn->x == 1.0f && pIn->y == 1.0f && 
		   pIn->z == 1.0f && pIn->w == 1.0f;
}

int kmVec4IsZero(const kmVec4* pIn)
{
	return pIn->x == 0.0f && pIn->y == 0.0f &&
		pIn->z == 0.0f && pIn->w == 0.0f;
}

kmVec4* kmVec4Negate(kmVec4* pOut, const kmVec4* pIn)
{
	pOut->x = -pIn->x;
	pOut->y = -pIn->y;
	pOut->z = -pIn->z;
	pOut->w = -pIn->w;
	return pOut;
}

kmScalar kmVec4Angle(const kmVec4* pV1, const kmVec4* pV2)
{
	float dx = pV1->w * pV2->x - pV1->x * pV2->w - pV1->y * pV2->z + pV1->z * pV2->y;
	float dy = pV1->w * pV2->y - pV1->y * pV2->w - pV1->z * pV2->x + pV1->x * pV2->z;
	float dz = pV1->w * pV2->z - pV1->z * pV2->w - pV1->x * pV2->y + pV1->y * pV2->x;
	float fdot = kmVec4Dot(pV1, pV2);
	return atan2f(sqrt(dx * dx + dy * dy + dz * dz) + 1.0e-37f, fdot );
}
