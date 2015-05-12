#include "Base.h"
#include "Transform.h"
#include "Game.h"
#include "Node.h"

namespace egret
{

int Transform::_suspendTransformChanged(0);
std::vector<Transform*> Transform::_transformsChanged;

Transform::Transform()
    : _matrixDirtyBits(0), _listeners(NULL)
{
    GP_REGISTER_SCRIPT_EVENTS();

    _targetType = AnimationTarget::TRANSFORM;
    //_scale.set(Vector3::one());	
	init();
	kmVec3Fill(&_scale, 1.0f, 1.0f, 1.0f);
}

Transform::Transform(const kmVec3& scale, const kmQuaternion& rotation, const kmVec3& translation)
    : _matrixDirtyBits(0), _listeners(NULL)
{
    GP_REGISTER_SCRIPT_EVENTS();

    _targetType = AnimationTarget::TRANSFORM;
    set(scale, rotation, translation);
	init();
}

Transform::Transform(const kmVec3& scale, const kmMat4& rotation, const kmVec3& translation)
    : _matrixDirtyBits(0), _listeners(NULL)
{
    GP_REGISTER_SCRIPT_EVENTS();

    _targetType = AnimationTarget::TRANSFORM;
    set(scale, rotation, translation);
	init();
}

Transform::Transform(const Transform& copy)
    : _matrixDirtyBits(0), _listeners(NULL)
{
    GP_REGISTER_SCRIPT_EVENTS();

    _targetType = AnimationTarget::TRANSFORM;
    set(copy);
	init();
}

void Transform::init()
{
	memset(&_scale, 0, sizeof(float) * 3);
	memset(&_rotation, 0, sizeof(float) * 4);
	memset(&_translation, 0, sizeof(float) * 3);
	kmMat4Identity(&_matrix);

}

Transform::~Transform()
{
    SAFE_DELETE(_listeners);
}

void Transform::suspendTransformChanged()
{
    _suspendTransformChanged++;
}

void Transform::resumeTransformChanged()
{
    if (_suspendTransformChanged == 0) // We haven't suspended transformChanged() calls, so do nothing.
        return;
    
    if (_suspendTransformChanged == 1)
    {
        // Call transformChanged() on all transforms in the list
        size_t transformCount = _transformsChanged.size();
        for (size_t i = 0; i < transformCount; i++)
        {
            Transform* t = _transformsChanged.at(i);
            GP_ASSERT(t);
            t->transformChanged();
        }

        // Go through list and reset DIRTY_NOTIFY bit. The list could potentially be larger here if the 
        // transforms we were delaying calls to transformChanged() have any child nodes.
        transformCount = _transformsChanged.size();
        for (size_t i = 0; i < transformCount; i++)
        {
            Transform* t = _transformsChanged.at(i);
            GP_ASSERT(t);
            t->_matrixDirtyBits &= ~DIRTY_NOTIFY;
        }

        // empty list for next frame.
        _transformsChanged.clear();
    }
    _suspendTransformChanged--;
}

bool Transform::isTransformChangedSuspended()
{
    return (_suspendTransformChanged > 0);
}

const char* Transform::getTypeName() const
{
    return "Transform";
}

const kmMat4& Transform::getMatrix() const
{
    if (_matrixDirtyBits)
    {
        if (!isStatic())
        {
			bool hasTranslation = !kmVec3IsZero(&_translation); // _translation.isZero();
			bool hasScale = !kmVec3IsOne( &_scale); // _scale.isOne();
			bool hasRotation = !kmQuaternionIsIdentity(&_rotation);// _rotation.isIdentity();

            // Compose the kmMat4 in TRS order since we use column-major matrices with column vectors and
            // multiply M*v (as opposed to XNA and DirectX that use row-major matrices with row vectors and multiply v*M).
            if (hasTranslation || (_matrixDirtyBits & DIRTY_TRANSLATION) == DIRTY_TRANSLATION)
            {
                //Matrix::createTranslation(_translation, &_matrix);
				kmMat4CreateTranslation(&_matrix, _translation.x, _translation.y, _translation.z);
                if (hasRotation || (_matrixDirtyBits & DIRTY_ROTATION) == DIRTY_ROTATION)
                {
                    //_matrix.rotate(_rotation);
					kmMat4RotationQuaternion(&_matrix, &_rotation);
                }
                if (hasScale || (_matrixDirtyBits & DIRTY_SCALE) == DIRTY_SCALE)
                {
                    //_matrix.scale(_scale);
					kmMat4Scal(&_matrix, &_matrix, &_scale);
                }
            }
            else if (hasRotation || (_matrixDirtyBits & DIRTY_ROTATION) == DIRTY_ROTATION)
            {
                //Matrix::createRotation(_rotation, &_matrix);
				//kmMat4CoreateRotation( &_matrix, )
				kmMat4CreateQuaRotation(&_matrix, &_rotation);
                if (hasScale || (_matrixDirtyBits & DIRTY_SCALE) == DIRTY_SCALE)
                {
                    //_matrix.scale(_scale);
					kmMat4Scal(&_matrix, &_matrix, &_scale);
                }
            }
            else if (hasScale || (_matrixDirtyBits & DIRTY_SCALE) == DIRTY_SCALE)
            {
                //Matrix::createScale(_scale, &_matrix);
				kmMat4Scaling(&_matrix, _scale.x, _scale.y, _scale.z);
            }
        }

        _matrixDirtyBits &= ~DIRTY_TRANSLATION & ~DIRTY_ROTATION & ~DIRTY_SCALE;
    }

    return _matrix;
}

const kmVec3& Transform::getScale() const
{
    return _scale;
}

void Transform::getScale(kmVec3* scale) const
{
    GP_ASSERT(scale);
    *scale = _scale;
}

float Transform::getScaleX() const
{
    return _scale.x;
}

float Transform::getScaleY() const
{
    return _scale.y;
}

float Transform::getScaleZ() const
{
    return _scale.z;
}

const kmQuaternion& Transform::getRotation() const
{
    return _rotation;
}

void Transform::getRotation(kmQuaternion* rotation) const
{
    GP_ASSERT(rotation);
    *rotation = _rotation;
}

void Transform::getRotation(kmMat4* rotation) const
{
    GP_ASSERT(rotation);
    //Matrix::createRotation(_rotation, rotation);
	kmMat4CreateQuaRotation(rotation, &_rotation);
}

float Transform::getRotation(kmVec3* axis) const
{
    GP_ASSERT(axis);
    //return _rotation.toAxisAngle(axis);
	return kmQuatToAxisAngle(axis, &_rotation);
}

const kmVec3& Transform::getTranslation() const
{
    return _translation;
}

void Transform::getTranslation(kmVec3* translation) const
{
    GP_ASSERT(translation);
    *translation = _translation;
}

float Transform::getTranslationX() const
{
    return _translation.x;
}

float Transform::getTranslationY() const
{
    return _translation.y;
}

float Transform::getTranslationZ() const
{
    return _translation.z;
}

kmVec3 Transform::getForwardVector() const
{
    kmVec3 v;
    getForwardVector(&v);
    return v;
}

void Transform::getForwardVector(kmVec3* dst) const
{
    //getMatrix().getForwardVector(dst);
	kmMat4GetForwrad(dst, &getMatrix());
}

kmVec3 Transform::getBackVector() const
{
    kmVec3 v;
    getBackVector(&v);
    return v;
}

void Transform::getBackVector(kmVec3* dst) const
{
    //getMatrix().getBackVector(dst);
	kmMat4GetBack(dst, &getMatrix());
}

kmVec3 Transform::getUpVector() const
{
    kmVec3 v;
    getUpVector(&v);
    return v;
}

void Transform::getUpVector(kmVec3* dst) const
{
    //getMatrix().getUpVector(dst);
	kmMat4GetUp(dst, &getMatrix());
}

kmVec3 Transform::getDownVector() const
{
    kmVec3 v;
    getDownVector(&v);
    return v;
}

void Transform::getDownVector(kmVec3* dst) const
{
    //getMatrix().getDownVector(dst);
	kmMat4GetDown(dst, &getMatrix());
}

kmVec3 Transform::getLeftVector() const
{
    kmVec3 v;
    getLeftVector(&v);
    return v;
}

void Transform::getLeftVector(kmVec3* dst) const
{
    //getMatrix().getLeftVector(dst);
	kmMat4GetLeft(dst, &getMatrix());
}

kmVec3 Transform::getRightVector() const
{
    kmVec3 v;
    getRightVector(&v);
    return v;
}

void Transform::getRightVector(kmVec3* dst) const
{
    //getMatrix().getRightVector(dst);
	kmMat4GetRight(dst, &getMatrix());
}

void Transform::rotate(float qx, float qy, float qz, float qw)
{
    if (isStatic())
        return;

	kmQuaternion q = { qx, qy, qz, qw };
    //_rotation.multiply(q);
	kmQuaternionMultiply(&_rotation, &_rotation, &q);
    dirty(DIRTY_ROTATION);
}

void Transform::rotate(const kmQuaternion& rotation)
{
    if (isStatic())
        return;

    //_rotation.multiply(rotation);
	kmQuaternionMultiply(&_rotation, &_rotation, &rotation);
    dirty(DIRTY_ROTATION);
}

void Transform::rotate(const kmVec3& axis, float angle)
{
    if (isStatic())
        return;

    kmQuaternion rotationQuat;
    //Quaternion::createFromAxisAngle(axis, angle, &rotationQuat);
	kmQuatreateFromAxisAngle(&rotationQuat, &axis, angle);
	kmQuaternionMultiply(&_rotation, &_rotation, &rotationQuat);
	kmQuaternionNormalize(&_rotation, &_rotation);
    //_rotation.multiply(rotationQuat);
    //_rotation.normalize();
    dirty(DIRTY_ROTATION);
}

void Transform::rotate(const kmMat4& rotation)
{
    if (isStatic())
        return;

    kmQuaternion rotationQuat;
    //Quaternion::createFromRotationMatrix(rotation, &rotationQuat);
	kmMat4Decompose(&rotation, NULL, &rotationQuat, NULL);
	kmQuaternionMultiply(&_rotation, &_rotation, &rotationQuat);
    //_rotation.multiply(rotationQuat);
    dirty(DIRTY_ROTATION);
}

void Transform::rotateX(float angle)
{
    if (isStatic())
        return;

	kmVec3 unintx = { 1.0f, 0.0f, 0.0f };
    kmQuaternion rotationQuat;
    //Quaternion::createFromAxisAngle(Vector3::unitX(), angle, &rotationQuat);
    //_rotation.multiply(rotationQuat);
	kmQuatreateFromAxisAngle(&rotationQuat, &unintx, angle);
	kmQuaternionMultiply(&_rotation, &_rotation, &rotationQuat);
    dirty(DIRTY_ROTATION);
}

void Transform::rotateY(float angle)
{
    if (isStatic())
        return;

	kmVec3 unitY = { 0.0f, 1.0f, 0.0f };
    kmQuaternion rotationQuat;
    //Quaternion::createFromAxisAngle(Vector3::unitY(), angle, &rotationQuat);
    //_rotation.multiply(rotationQuat);
	kmQuatreateFromAxisAngle(&rotationQuat, &unitY, angle);
	kmQuaternionMultiply(&_rotation, &_rotation, &rotationQuat);
    dirty(DIRTY_ROTATION);
}

void Transform::rotateZ(float angle)
{
    if (isStatic())
        return;
	kmVec3 unitZ = { 0.0f, 0.0f, 1.0f };
    kmQuaternion rotationQuat;
    //Quaternion::createFromAxisAngle(Vector3::unitZ(), angle, &rotationQuat);
    //_rotation.multiply(rotationQuat);
	kmQuatreateFromAxisAngle(&rotationQuat, &unitZ, angle);
	kmQuaternionMultiply(&_rotation, &_rotation, &rotationQuat);
    dirty(DIRTY_ROTATION);
}

void Transform::scale(float scale)
{
    if (isStatic())
        return;

    //_scale.scale(scale);
	kmVec3Scale(&_scale, &_scale, scale);
    dirty(DIRTY_SCALE);
}

void Transform::scale(float sx, float sy, float sz)
{
    if (isStatic())
        return;

    _scale.x *= sx;
    _scale.y *= sy;
    _scale.z *= sz;
    dirty(DIRTY_SCALE);
}

void Transform::scale(const kmVec3& scale)
{
    if (isStatic())
        return;

    _scale.x *= scale.x;
    _scale.y *= scale.y;
    _scale.z *= scale.z;
    dirty(DIRTY_SCALE);
}

void Transform::scaleX(float sx)
{
    if (isStatic())
        return;

    _scale.x *= sx;
    dirty(DIRTY_SCALE);
}

void Transform::scaleY(float sy)
{
    if (isStatic())
        return;

    _scale.y *= sy;
    dirty(DIRTY_SCALE);
}

void Transform::scaleZ(float sz)
{
    if (isStatic())
        return;

    _scale.z *= sz;
    dirty(DIRTY_SCALE);
}

void Transform::set(const kmVec3& scale, const kmQuaternion& rotation, const kmVec3& translation)
{
    if (isStatic())
        return;

    _scale = scale;
    _rotation = rotation;
    _translation = translation;
    dirty(DIRTY_TRANSLATION | DIRTY_ROTATION | DIRTY_SCALE);
}

void Transform::set(const kmVec3& scale, const kmMat4& rotation, const kmVec3& translation)
{
    if (isStatic())
        return;

    _scale =scale;
    kmQuaternion rotationQuat;
    //Quaternion::createFromRotationMatrix(rotation, &rotationQuat);
	kmMat4Decompose(&rotation, NULL, &rotationQuat, NULL);
    _rotation = rotationQuat;
    _translation = translation;
    dirty(DIRTY_TRANSLATION | DIRTY_ROTATION | DIRTY_SCALE);
}

void Transform::set(const kmVec3& scale, const kmVec3& axis, float angle, const kmVec3& translation)
{
    if (isStatic())
        return;

    _scale = scale;
    //_rotation.set(axis, angle);
	kmQuatreateFromAxisAngle(&_rotation, &axis, angle);
    _translation = translation;
    dirty(DIRTY_TRANSLATION | DIRTY_ROTATION | DIRTY_SCALE);
}

void Transform::set(const Transform& transform)
{
    if (isStatic())
        return;

    _scale = transform._scale;
    _rotation = transform._rotation;
    _translation = transform._translation;
    dirty(DIRTY_TRANSLATION | DIRTY_ROTATION | DIRTY_SCALE);
}

void Transform::setIdentity()
{
	if (isStatic())
		return;

	_scale = { 1.0f, 1.0f, 1.0f };
	//_rotation.setIdentity();
	kmQuaternionIdentity(&_rotation);
	_translation = { 0.0f, 0.0f, 0.0f };
    dirty(DIRTY_TRANSLATION | DIRTY_ROTATION | DIRTY_SCALE);
}

void Transform::setScale(float scale)
{
    if (isStatic())
        return;

	_scale = { scale, scale, scale };
    dirty(DIRTY_SCALE);
}

void Transform::setScale(float sx, float sy, float sz)
{
    if (isStatic())
        return;

	_scale = { sx, sy, sz };
    dirty(DIRTY_SCALE);
}

void Transform::setScale(const kmVec3& scale)
{
    _scale = scale;
    dirty(DIRTY_SCALE);
}

void Transform::setScaleX(float sx)
{
    if (isStatic())
        return;

    _scale.x = sx;
    dirty(DIRTY_SCALE);
}

void Transform::setScaleY(float sy)
{
    if (isStatic())
        return;

    _scale.y = sy;
    dirty(DIRTY_SCALE);
}

void Transform::setScaleZ(float sz)
{
    if (isStatic())
        return;

    _scale.z = sz;
    dirty(DIRTY_SCALE);
}

void Transform::setRotation(const kmQuaternion& rotation)
{
    if (isStatic())
        return;

    _rotation = rotation;
    dirty(DIRTY_ROTATION);
}

void Transform::setRotation(float qx, float qy, float qz, float qw)
{
    if (isStatic())
        return;

	_rotation = { qx, qy, qz, qw };
    dirty(DIRTY_ROTATION);
}

void Transform::setRotation(const kmMat4& rotation)
{
    if (isStatic())
        return;

    kmQuaternion rotationQuat;
    //Quaternion::createFromRotationMatrix(rotation, &rotationQuat);
	kmMat4Decompose(&rotation, NULL, &rotationQuat, NULL);
    _rotation = rotationQuat;
    dirty(DIRTY_ROTATION);
}

void Transform::setRotation(const kmVec3& axis, float angle)
{
    if (isStatic())
        return;

    //_rotation.set(axis, angle);
	kmQuatreateFromAxisAngle(&_rotation, &axis, angle);
    dirty(DIRTY_ROTATION);
}

void Transform::setTranslation(const kmVec3& translation)
{
    if (isStatic())
        return;

    _translation = translation;
    dirty(DIRTY_TRANSLATION);
}

void Transform::setTranslation(float tx, float ty, float tz)
{
    if (isStatic())
        return;

	_translation = { tx, ty, tz };
    dirty(DIRTY_TRANSLATION);
}

void Transform::setTranslationX(float tx)
{
    if (isStatic())
        return;

    _translation.x = tx;
    dirty(DIRTY_TRANSLATION);
}

void Transform::setTranslationY(float ty)
{
    if (isStatic())
        return;

    _translation.y = ty;
    dirty(DIRTY_TRANSLATION);
}

void Transform::setTranslationZ(float tz)
{
    if (isStatic())
        return;

    _translation.z = tz;
    dirty(DIRTY_TRANSLATION);
}

void Transform::translate(float tx, float ty, float tz)
{
    if (isStatic())
        return;

    _translation.x += tx;
    _translation.y += ty;
    _translation.z += tz;
    dirty(DIRTY_TRANSLATION);
}

void Transform::translate(const kmVec3& translation)
{
    if (isStatic())
        return;

    _translation.x += translation.x;
    _translation.y += translation.y;
    _translation.z += translation.z;
    dirty(DIRTY_TRANSLATION);
}

void Transform::translateX(float tx)
{
    if (isStatic())
        return;

    _translation.x += tx;
    dirty(DIRTY_TRANSLATION);
}

void Transform::translateY(float ty)
{
    if (isStatic())
        return;

    _translation.y += ty;
    dirty(DIRTY_TRANSLATION);
}

void Transform::translateZ(float tz)
{
    if (isStatic())
        return;

    _translation.z += tz;
    dirty(DIRTY_TRANSLATION);
}

void Transform::translateLeft(float amount)
{
    if (isStatic())
        return;

    // Force the current transform kmMat4 to be updated.
    getMatrix();

    kmVec3 left;
    //_matrix.getLeftVector(&left);
	kmMat4GetLeft(&left, &_matrix);
	kmVec3Normalize(&left, &left);
	kmVec3Scale(&left, &left, amount);
    //left.normalize();
    //left.scale(amount);

    translate(left);
}

void Transform::translateUp(float amount)
{
    if (isStatic())
        return;

    // Force the current transform kmMat4 to be updated.
    getMatrix();

    kmVec3 up;
    //_matrix.getUpVector(&up);
	kmMat4GetUp(&up, &_matrix);
	kmVec3Normalize(&up, &up );
	kmVec3Scale(&up, &up, amount);
    //up.normalize();
    //up.scale(amount);

    translate(up);
}

void Transform::translateForward(float amount)
{
    if (isStatic())
        return;

    // Force the current transform kmMat4 to be updated.
    getMatrix();

    kmVec3 forward;
    //_matrix.getForwardVector(&forward);
    //forward.normalize();
    //forward.scale(amount);
	kmMat4GetForwrad(&forward, &_matrix);
	kmVec3Normalize(&forward, &forward);
	kmVec3Scale(&forward, &forward, amount);

    translate(forward);
}

void Transform::translateSmooth(const kmVec3& target, float elapsedTime, float responseTime)
{
    if (isStatic())
        return;

    if (elapsedTime > 0)
    {
		kmVec3 temp;
		kmVec3Subtract(&temp, &target, &_translation);
		kmVec3Scale(&temp, &temp, elapsedTime / (elapsedTime + responseTime));
		kmVec3Add(&_translation, &_translation, &temp);
        //_translation += (target - _translation) * (elapsedTime / (elapsedTime + responseTime));
        dirty(DIRTY_TRANSLATION);
    }
}

void Transform::transformPoint(kmVec3* point)
{
    getMatrix();
    //_matrix.transformPoint(point);
	kmMat3Transform(point, &_matrix, point->x, point->y, point->z, 1.0f);
}

void Transform::transformPoint(const kmVec3& point, kmVec3* dst)
{
    getMatrix();
    //_matrix.transformPoint(point, dst);
	kmMat3Transform(dst, &_matrix, point.x, point.y, point.z, 1.0f);
}

void Transform::transformVector(kmVec3* normal)
{
    getMatrix();
    //_matrix.transformVector(normal);
	kmMat3Transform(normal, &_matrix, normal->x, normal->y, normal->z, 1.0f);
}

void Transform::transformVector(const kmVec3& normal, kmVec3* dst)
{
    getMatrix();
    //_matrix.transformVector(normal, dst);
	kmMat3Transform(dst, &_matrix, normal.x, normal.y, normal.z, 1.0f);
}

void Transform::transformVector(float x, float y, float z, float w, kmVec3* dst)
{
    getMatrix();
    //_matrix.transformVector(x, y, z, w, dst);
	kmMat3Transform(dst, &_matrix, x, y, z, w);
}

bool Transform::isStatic() const
{
    return false;
}

unsigned int Transform::getAnimationPropertyComponentCount(int propertyId) const
{
    switch (propertyId)
    {
        case ANIMATE_SCALE_UNIT:
        case ANIMATE_SCALE_X:
        case ANIMATE_SCALE_Y:
        case ANIMATE_SCALE_Z:
        case ANIMATE_TRANSLATE_X:
        case ANIMATE_TRANSLATE_Y:
        case ANIMATE_TRANSLATE_Z:
            return 1;
        case ANIMATE_SCALE:
        case ANIMATE_TRANSLATE:
            return 3;
        case ANIMATE_ROTATE:
            return 4;
        case ANIMATE_SCALE_TRANSLATE:
            return 6;
        case ANIMATE_ROTATE_TRANSLATE:
        case ANIMATE_SCALE_ROTATE:
            return 7;
        case ANIMATE_SCALE_ROTATE_TRANSLATE:
            return 10;
        default:
            return -1;
    }
}

void Transform::getAnimationPropertyValue(int propertyId, AnimationValue* value)
{
    GP_ASSERT(value);

    switch (propertyId)
    {
        case ANIMATE_SCALE_UNIT:
            value->setFloat(0, _scale.x);
            break;
        case ANIMATE_SCALE:
            value->setFloats(0, &_scale.x, 3);
            break;
        case ANIMATE_SCALE_X:
            value->setFloat(0, _scale.x);
            break;
        case ANIMATE_SCALE_Y:
            value->setFloat(0, _scale.y);
            break;
        case ANIMATE_SCALE_Z:
            value->setFloat(0, _scale.z);
            break;
        case ANIMATE_ROTATE:
            value->setFloats(0, &_rotation.x, 4);
            break;
        case ANIMATE_TRANSLATE:
            value->setFloats(0, &_translation.x, 3);
            break;
        case ANIMATE_TRANSLATE_X:
            value->setFloat(0, _translation.x);
            break;
        case ANIMATE_TRANSLATE_Y:
            value->setFloat(0, _translation.y);
            break;
        case ANIMATE_TRANSLATE_Z:
            value->setFloat(0, _translation.z);
            break;
        case ANIMATE_ROTATE_TRANSLATE:
            value->setFloats(0, &_rotation.x, 4);
            value->setFloats(4, &_translation.x, 3);
            break;
        case ANIMATE_SCALE_ROTATE:
            value->setFloats(0, &_scale.x, 3);
            value->setFloats(3, &_rotation.x, 4);
            break;
        case ANIMATE_SCALE_TRANSLATE:
            value->setFloats(0, &_scale.x, 3);
            value->setFloats(3, &_translation.x, 3);
            break;
        case ANIMATE_SCALE_ROTATE_TRANSLATE:
            value->setFloats(0, &_scale.x, 3);
            value->setFloats(3, &_rotation.x, 4);
            value->setFloats(7, &_translation.x, 3);
            break;
        default:
            break;
    }
}

void Transform::setAnimationPropertyValue(int propertyId, AnimationValue* value, float blendWeight)
{
    GP_ASSERT(value);
    GP_ASSERT(blendWeight >= 0.0f && blendWeight <= 1.0f);

    switch (propertyId)
    {
        case ANIMATE_SCALE_UNIT:
        {
            float scale = Curve::lerp(blendWeight, _scale.x, value->getFloat(0));
            setScale(scale);
            break;
        }   
        case ANIMATE_SCALE:
        {
            setScale(Curve::lerp(blendWeight, _scale.x, value->getFloat(0)), Curve::lerp(blendWeight, _scale.y, value->getFloat(1)), Curve::lerp(blendWeight, _scale.z, value->getFloat(2)));
            break;
        }
        case ANIMATE_SCALE_X:
        {
            setScaleX(Curve::lerp(blendWeight, _scale.x, value->getFloat(0)));
            break;
        }
        case ANIMATE_SCALE_Y:
        {
            setScaleY(Curve::lerp(blendWeight, _scale.y, value->getFloat(0)));
            break;
        }
        case ANIMATE_SCALE_Z:
        {
            setScaleZ(Curve::lerp(blendWeight, _scale.z, value->getFloat(0)));
            break;
        }
        case ANIMATE_ROTATE:
        {
            applyAnimationValueRotation(value, 0, blendWeight);
            break;
        }
        case ANIMATE_TRANSLATE:
        {
            setTranslation(Curve::lerp(blendWeight, _translation.x, value->getFloat(0)), Curve::lerp(blendWeight, _translation.y, value->getFloat(1)), Curve::lerp(blendWeight, _translation.z, value->getFloat(2)));
            break;
        }
        case ANIMATE_TRANSLATE_X:
        {
            setTranslationX(Curve::lerp(blendWeight, _translation.x, value->getFloat(0)));
            break;
        }
        case ANIMATE_TRANSLATE_Y:
        {
            setTranslationY(Curve::lerp(blendWeight, _translation.y, value->getFloat(0)));
            break;
        }
        case ANIMATE_TRANSLATE_Z:
        {
            setTranslationZ(Curve::lerp(blendWeight, _translation.z, value->getFloat(0)));
            break;
        }
        case ANIMATE_ROTATE_TRANSLATE:
        {
            applyAnimationValueRotation(value, 0, blendWeight);
            setTranslation(Curve::lerp(blendWeight, _translation.x, value->getFloat(4)), Curve::lerp(blendWeight, _translation.y, value->getFloat(5)), Curve::lerp(blendWeight, _translation.z, value->getFloat(6)));
            break;
        }
        case ANIMATE_SCALE_ROTATE:
        {
            setScale(Curve::lerp(blendWeight, _scale.x, value->getFloat(0)), Curve::lerp(blendWeight, _scale.y, value->getFloat(1)), Curve::lerp(blendWeight, _scale.z, value->getFloat(2)));
            applyAnimationValueRotation(value, 3, blendWeight);
            break;
        }
        case ANIMATE_SCALE_TRANSLATE:
        {
            setScale(Curve::lerp(blendWeight, _scale.x, value->getFloat(0)), Curve::lerp(blendWeight, _scale.y, value->getFloat(1)), Curve::lerp(blendWeight, _scale.z, value->getFloat(2)));
            setTranslation(Curve::lerp(blendWeight, _translation.x, value->getFloat(3)), Curve::lerp(blendWeight, _translation.y, value->getFloat(4)), Curve::lerp(blendWeight, _translation.z, value->getFloat(5)));
            break;
        }
        case ANIMATE_SCALE_ROTATE_TRANSLATE:
        {
            setScale(Curve::lerp(blendWeight, _scale.x, value->getFloat(0)), Curve::lerp(blendWeight, _scale.y, value->getFloat(1)), Curve::lerp(blendWeight, _scale.z, value->getFloat(2)));
            applyAnimationValueRotation(value, 3, blendWeight);
            setTranslation(Curve::lerp(blendWeight, _translation.x, value->getFloat(7)), Curve::lerp(blendWeight, _translation.y, value->getFloat(8)), Curve::lerp(blendWeight, _translation.z, value->getFloat(9)));
            break;
        }
        default:
            break;
    }
}

void Transform::dirty(char matrixDirtyBits)
{
    _matrixDirtyBits |= matrixDirtyBits;
    if (isTransformChangedSuspended())
    {
        if (!isDirty(DIRTY_NOTIFY))
        {
            suspendTransformChange(this);
        }
    }
    else
    {
        transformChanged();
    }
}

bool Transform::isDirty(char matrixDirtyBits) const
{
    return (_matrixDirtyBits & matrixDirtyBits) == matrixDirtyBits;
}

void Transform::suspendTransformChange(Transform* transform)
{
    GP_ASSERT(transform);
    transform->_matrixDirtyBits |= DIRTY_NOTIFY;
    _transformsChanged.push_back(transform);
}

void Transform::addListener(Transform::Listener* listener, long cookie)
{
    GP_ASSERT(listener);

    if (_listeners == NULL)
        _listeners = new std::list<TransformListener>();

    TransformListener l;
    l.listener = listener;
    l.cookie = cookie;
    _listeners->push_back(l);
}

void Transform::removeListener(Transform::Listener* listener)
{
    GP_ASSERT(listener);

    if (_listeners)
    {
        for (std::list<TransformListener>::iterator itr = _listeners->begin(); itr != _listeners->end(); ++itr)
        {
            if ((*itr).listener == listener)
            {
                _listeners->erase(itr);
                break;
            }
        }
    }
}

void Transform::transformChanged()
{
    if (_listeners)
    {
        for (std::list<TransformListener>::iterator itr = _listeners->begin(); itr != _listeners->end(); ++itr)
        {
            TransformListener& l = *itr;
            GP_ASSERT(l.listener);
            l.listener->transformChanged(this, l.cookie);
        }
    }
    fireScriptEvent<void>(GP_GET_SCRIPT_EVENT(Transform, transformChanged), dynamic_cast<void*>(this));
}

void Transform::cloneInto(Transform* transform, NodeCloneContext &context) const
{
    GP_ASSERT(transform);

    AnimationTarget::cloneInto(transform, context);
    transform->_scale = _scale;
    transform->_rotation = _rotation;
    transform->_translation = _translation;
    transform->dirty(DIRTY_TRANSLATION | DIRTY_ROTATION | DIRTY_SCALE);
}

void Transform::applyAnimationValueRotation(AnimationValue* value, unsigned int index, float blendWeight)
{
    if (isStatic())
        return;

    GP_ASSERT(value);
	kmQuaternionSlerpNum(_rotation.x, _rotation.y, _rotation.z, _rotation.w, value->getFloat(index), value->getFloat(index + 1), value->getFloat(index + 2), value->getFloat(index + 3), blendWeight,
        &_rotation.x, &_rotation.y, &_rotation.z, &_rotation.w);
    dirty(DIRTY_ROTATION);
}

}
