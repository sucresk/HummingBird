#include "BoundingSphere.h"

namespace egret
{

inline BoundingSphere& BoundingSphere::operator*=(const kmMat4& matrix)
{
    transform(matrix);
    return *this;
}

inline const BoundingSphere operator*(const kmMat4& matrix, const BoundingSphere& sphere)
{
    BoundingSphere s(sphere);
    s.transform(matrix);
    return s;
}

}
