#include "BoundingBox.h"

namespace egret
{

inline BoundingBox& BoundingBox::operator*=(const kmMat4& matrix)
{
    transform(matrix);
    return *this;
}

inline const BoundingBox operator*(const kmMat4& matrix, const BoundingBox& box)
{
    BoundingBox b(box);
    b.transform(matrix);
    return b;
}

}
