#include "Plane.h"

namespace egret
{

inline Plane& Plane::operator*=(const kmMat4& matrix)
{
    transform(matrix);
    return *this;
}

inline const Plane operator*(const kmMat4& matrix, const Plane& plane)
{
    Plane p(plane);
    p.transform(matrix);
    return p;
}

}
