#include "Base.h"
#include "Frustum.h"
#include "BoundingSphere.h"
#include "BoundingBox.h"

namespace egret
{

Frustum::Frustum()
{
	kmMat4 indent;
	kmMat4Identity(&indent);
    set( indent );
}

Frustum::Frustum(const kmMat4& matrix)
{
    set(matrix);
}

Frustum::Frustum(const Frustum& frustum)
{
    set(frustum);
}

Frustum::~Frustum()
{
}

const Plane& Frustum::getNear() const
{
    return _near;
}

const Plane& Frustum::getFar() const
{
    return _far;
}

const Plane& Frustum::getLeft() const
{
    return _left;
}

const Plane& Frustum::getRight() const
{
    return _right;
}

const Plane& Frustum::getBottom() const
{
    return _bottom;
}

const Plane& Frustum::getTop() const
{
    return _top;
}

void Frustum::getMatrix(kmMat4* dst) const
{
    GP_ASSERT(dst);
    *dst = _matrix;
}

void Frustum::getCorners(kmVec3* corners) const
{
    getNearCorners(corners);
    getFarCorners(corners + 4);
}

void Frustum::getNearCorners(kmVec3* corners) const
{
    GP_ASSERT(corners);

    Plane::intersection(_near, _left, _top, &corners[0]);
    Plane::intersection(_near, _left, _bottom, &corners[1]);
    Plane::intersection(_near, _right, _bottom, &corners[2]);
    Plane::intersection(_near, _right, _top, &corners[3]);
}

void Frustum::getFarCorners(kmVec3* corners) const
{
    GP_ASSERT(corners);

    Plane::intersection(_far, _right, _top, &corners[0]);
    Plane::intersection(_far, _right, _bottom, &corners[1]);
    Plane::intersection(_far, _left, _bottom, &corners[2]);
    Plane::intersection(_far, _left, _top, &corners[3]);
}

bool Frustum::intersects(const kmVec3& point) const
{
    if (_near.distance(point) <= 0)
        return false;
    if (_far.distance(point) <= 0)
        return false;
    if (_left.distance(point) <= 0)
        return false;
    if (_right.distance(point) <= 0)
        return false;
    if (_top.distance(point) <= 0)
        return false;
    if (_bottom.distance(point) <= 0)
        return false;

    return true;
}

bool Frustum::intersects(float x, float y, float z) const
{
	return intersects({ x, y, z });
}

bool Frustum::intersects(const BoundingSphere& sphere) const
{
    return sphere.intersects(*this);
}

bool Frustum::intersects(const BoundingBox& box) const
{
    return box.intersects(*this);
}

float Frustum::intersects(const Plane& plane) const
{
    return plane.intersects(*this);
}

float Frustum::intersects(const Ray& ray) const
{
    return ray.intersects(*this);
}

void Frustum::set(const Frustum& frustum)
{
    _near = frustum._near;
    _far = frustum._far;
    _bottom = frustum._bottom;
    _top = frustum._top;
    _left = frustum._left;
    _right = frustum._right;
    _matrix = frustum._matrix;
}

void Frustum::updatePlanes()
{
	_near.set({ _matrix.mat[3] + _matrix.mat[2], _matrix.mat[7] + _matrix.mat[6], _matrix.mat[11] + _matrix.mat[10] }, _matrix.mat[15] + _matrix.mat[14]);
	_far.set({ _matrix.mat[3] - _matrix.mat[2], _matrix.mat[7] - _matrix.mat[6], _matrix.mat[11] - _matrix.mat[10] }, _matrix.mat[15] - _matrix.mat[14]);
	_bottom.set({ _matrix.mat[3] + _matrix.mat[1], _matrix.mat[7] + _matrix.mat[5], _matrix.mat[11] + _matrix.mat[9] }, _matrix.mat[15] + _matrix.mat[13]);
	_top.set({ _matrix.mat[3] - _matrix.mat[1], _matrix.mat[7] - _matrix.mat[5], _matrix.mat[11] - _matrix.mat[9] }, _matrix.mat[15] - _matrix.mat[13]);
	_left.set({ _matrix.mat[3] + _matrix.mat[0], _matrix.mat[7] + _matrix.mat[4], _matrix.mat[11] + _matrix.mat[8] }, _matrix.mat[15] + _matrix.mat[12]);
	_right.set({ _matrix.mat[3] - _matrix.mat[0], _matrix.mat[7] - _matrix.mat[4], _matrix.mat[11] - _matrix.mat[8] }, _matrix.mat[15] - _matrix.mat[12]);
}

void Frustum::set(const kmMat4& matrix)
{
    _matrix = matrix;

    // Update the planes.
    updatePlanes();
}

}
