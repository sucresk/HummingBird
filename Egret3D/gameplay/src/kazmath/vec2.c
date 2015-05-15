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

#include <assert.h>
#include <stdlib.h>

#include "kazmath/mat3.h"
#include "kazmath/vec2.h"
#include "kazmath/utility.h"

kmVec2 vec2Zero = { 0.0f, 0.0f };
kmVec2 vec2One = { 1.0f, 1.0f };
kmVec2 vec2uintX = { 1.0f, 0.0f };
kmVec2 vec2uintY = { 0.0f, 1.0f };

kmVec2* kmVec2Fill(kmVec2* pOut, kmScalar x, kmScalar y)
{
    pOut->x = x;
    pOut->y = y;
    return pOut;
}

kmScalar kmVec2Length(const kmVec2* pIn)
{
    return sqrtf(kmSQR(pIn->x) + kmSQR(pIn->y));
}

kmScalar kmVec2LengthSquared(const kmVec2* pIn)
{
	return kmSQR(pIn->x) + kmSQR(pIn->y);
}

kmScalar kmVec2DistanceSquared(const kmVec2* pV1, const kmVec2* pV2)
{
	float dx = pV1->x - pV2->x;
	float dy = pV1->y - pV2->y;
	return (dx * dx + dy * dy);
}

kmScalar kmVec2Distance(const kmVec2* pV1, const kmVec2* pV2 )
{
	float dx = pV1->x - pV2->x;
	float dy = pV1->y - pV2->y;
	return sqrt(dx * dx + dy * dy);
}

kmVec2* kmVec2Normalize(kmVec2* pOut, const kmVec2* pIn)
{
	float n = pIn->x * pIn->x + pIn->y * pIn->y;
	if (n == 1.0f)
	{
		pOut->x = pIn->x;
		pOut->y = pIn->y;
		return pOut;
	}
	n = sqrt(n);
	if (n < 2e-37f)
	{
		pOut->x = pIn->x;
		pOut->y = pIn->y;
		return pOut;
	}

    kmScalar lnor = 1.0f / n;

    kmScalar fx = pIn->x * lnor;
    kmScalar fy = pIn->y * lnor;

    pOut->x = fx;
    pOut->y = fy;

    return pOut;
}

kmVec2* kmVec2Add(kmVec2* pOut, const kmVec2* pV1, const kmVec2* pV2)
{
    pOut->x = pV1->x + pV2->x;
    pOut->y = pV1->y + pV2->y;

    return pOut;
}

kmScalar kmVec2Dot(const kmVec2* pV1, const kmVec2* pV2)
{
    return pV1->x * pV2->x + pV1->y * pV2->y;
}

kmVec2* kmVec2Subtract(kmVec2* pOut, const kmVec2* pV1, const kmVec2* pV2)
{
    pOut->x = pV1->x - pV2->x;
    pOut->y = pV1->y - pV2->y;

    return pOut;
}

kmVec2* kmVec2Transform(kmVec2* pOut, const kmVec2* pV, const kmMat3* pM)
{
    kmScalar fx = pV->x * pM->mat[0] + pV->y * pM->mat[3] + pM->mat[6];
    kmScalar fy = pV->x * pM->mat[1] + pV->y * pM->mat[4] + pM->mat[7];

    pOut->x = fx;
    pOut->y = fy;

    return pOut;
}

kmVec2* kmVec2TransformCoord(kmVec2* pOut, const kmVec2* pV, const kmMat3* pM)
{
    assert(0);
    return NULL;
}

kmVec2* kmVec2Scale(kmVec2* pOut, const kmVec2* pIn, const kmScalar s)
{
    pOut->x = pIn->x * s;
    pOut->y = pIn->y * s;

    return pOut;
}

kmVec2* kmVec2ScaleVec2(kmVec2* pOut, const kmVec2* pV1, const kmVec2* pV2)
{
	pOut->x = pV1->x * pV2->x;
	pOut->y = pV1->x * pV2->y;
	return pOut;
}

int kmVec2AreEqual(const kmVec2* p1, const kmVec2* p2)
{
    return (
                (p1->x < p2->x + kmEpsilon && p1->x > p2->x - kmEpsilon) &&
                (p1->y < p2->y + kmEpsilon && p1->y > p2->y - kmEpsilon)
            );
}

int kmVec2IsZero(const kmVec2* pIn)
{
	return pIn->x == 0.0f && pIn->y == 0.0f;
}

kmVec2* kmVec2Rotate(kmVec2*pOut, const kmVec2* point, float angle)
{
	double sinAngle = sin(angle);
	double cosAngle = cos(angle);

	if ( kmVec2IsZero( point) )
	{
		float tempX = pOut->x * cosAngle - pOut->y * sinAngle;
		pOut->y = pOut->y * cosAngle + pOut->x * sinAngle;
		pOut->x = tempX;
	}
	else
	{
		float tempX = pOut->x - point->x;
		float tempY = pOut->y - point->y;

		pOut->x = tempX * cosAngle - tempY * sinAngle + point->x;
		pOut->y = tempY * cosAngle + tempX * sinAngle + point->y;
	}
	return pOut;
}

kmVec2* kmVec2Clamp(kmVec2* pOut, const kmVec2* pIn, const kmVec2* min, const kmVec2* max)
{
	// Clamp the x value.
	pOut->x = pIn->x;
	pOut->y = pIn->y;
	if (pOut->x < min->x)
		pOut->x = min->x;
	if (pOut->x > max->x)
		pOut->x = max->x;

	// Clamp the y value.
	if (pOut->y < min->y)
		pOut->y = min->y;
	if (pOut->y > max->y)
		pOut->y = max->y;
	return pOut;
}

int kmVec2IsOne(const kmVec2* pIn)
{
	return pIn->x == 1.0f && pIn->y == 1.0f;
}

void kmVec2Negate(kmVec2* pOut, const kmVec2* pIn)
{
	pOut->x = -pIn->x;
	pOut->y = -pIn->y;
	return pOut;
}

kmVec2* kmVec2Smooth(kmVec2* pOut, const kmVec2* pIn, const kmVec2* target, float elapsedTime, float responseTime)
{
	if (elapsedTime > 0)
	{
		float scale = elapsedTime / (elapsedTime + responseTime);
		kmVec2 temp = vec2Zero;
		kmVec2Subtract(&temp, target, pIn);
		kmVec2Scale(&temp, &temp, scale);
		kmVec2Add(pOut, pIn, &temp);
		//*this += (target - *this) * (elapsedTime / (elapsedTime + responseTime));
	}
	else
	{
		pOut->x = pIn->x;
		pOut->y = pIn->y;
	}
	return pOut;
}

kmScalar kmVec2Angle(const kmVec2* pV1, const kmVec2* pV2)
{
	float dz = pV1->x * pV2->y - pV1->y * pV2->x;
	return atan2f(fabsf(dz) + 1.0e-37f, kmVec2Dot(pV1, pV2));
}