#include "Ray.h"

namespace egret
{

inline Ray& Ray::operator*=(const kmMat4& matrix)
{
    transform(matrix);
    return *this;
}

inline const Ray operator*(const kmMat4& matrix, const Ray& ray)
{
    Ray r(ray);
    r.transform(matrix);
    return r;
}

}
