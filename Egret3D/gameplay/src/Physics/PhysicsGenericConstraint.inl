#include "PhysicsGenericConstraint.h"

namespace egret
{

inline const kmQuaternion& PhysicsGenericConstraint::getRotationOffsetA() const
{
    if (!_rotationOffsetA)
        _rotationOffsetA = new kmQuaternion();

    GP_ASSERT(_constraint);
    btQuaternion ro = static_cast<btGeneric6DofConstraint*>(_constraint)->getFrameOffsetA().getRotation();
	_rotationOffsetA = kmQuaternionSet(_rotationOffsetA, ro.x(), ro.y(), ro.z(), ro.w());
    return *_rotationOffsetA;
}

inline const kmQuaternion& PhysicsGenericConstraint::getRotationOffsetB() const
{
    if (!_rotationOffsetB)
        _rotationOffsetB = new kmQuaternion();

    GP_ASSERT(_constraint);
    btQuaternion ro = static_cast<btGeneric6DofConstraint*>(_constraint)->getFrameOffsetB().getRotation();
    _rotationOffsetB->set(ro.x(), ro.y(), ro.z(), ro.w());
    return *_rotationOffsetB;
}

inline const kmVec3& PhysicsGenericConstraint::getTranslationOffsetA() const
{
    if (!_translationOffsetA)
        _translationOffsetA = new Vector3();

    GP_ASSERT(_constraint);
    btkmVec3 to = static_cast<btGeneric6DofConstraint*>(_constraint)->getFrameOffsetA().getOrigin();
    _translationOffsetA->set(to.x(), to.y(), to.z());
    return *_translationOffsetA;
}

inline const kmVec3& PhysicsGenericConstraint::getTranslationOffsetB() const
{
    if (!_translationOffsetB)
        _translationOffsetB = new Vector3();

    GP_ASSERT(_constraint);
    btkmVec3 to = static_cast<btGeneric6DofConstraint*>(_constraint)->getFrameOffsetB().getOrigin();
    _translationOffsetB->set(to.x(), to.y(), to.z());
    return *_translationOffsetB;
}

inline void PhysicsGenericConstraint::setAngularLowerLimit(const kmVec3& limits)
{
    GP_ASSERT(_constraint);
    ((btGeneric6DofConstraint*)_constraint)->setAngularLowerLimit(BV(limits));
}

inline void PhysicsGenericConstraint::setAngularUpperLimit(const kmVec3& limits)
{
    GP_ASSERT(_constraint);
    ((btGeneric6DofConstraint*)_constraint)->setAngularUpperLimit(BV(limits));
}

inline void PhysicsGenericConstraint::setLinearLowerLimit(const kmVec3& limits)
{
    GP_ASSERT(_constraint);
    ((btGeneric6DofConstraint*)_constraint)->setLinearLowerLimit(BV(limits));
}
    
inline void PhysicsGenericConstraint::setLinearUpperLimit(const kmVec3& limits)
{
    GP_ASSERT(_constraint);
    ((btGeneric6DofConstraint*)_constraint)->setLinearUpperLimit(BV(limits));
}

inline void PhysicsGenericConstraint::setRotationOffsetA(const kmQuaternion& rotationOffset)
{
    GP_ASSERT(_constraint);
    static_cast<btGeneric6DofConstraint*>(_constraint)->getFrameOffsetA().setRotation(BQ(rotationOffset));
}

inline void PhysicsGenericConstraint::setRotationOffsetB(const kmQuaternion& rotationOffset)
{
    GP_ASSERT(_constraint);
    static_cast<btGeneric6DofConstraint*>(_constraint)->getFrameOffsetB().setRotation(BQ(rotationOffset));
}

inline void PhysicsGenericConstraint::setTranslationOffsetA(const kmVec3& translationOffset)
{
    GP_ASSERT(_constraint);
    static_cast<btGeneric6DofConstraint*>(_constraint)->getFrameOffsetA().setOrigin(BV(translationOffset));
}

inline void PhysicsGenericConstraint::setTranslationOffsetB(const kmVec3& translationOffset)
{
    GP_ASSERT(_constraint);
    static_cast<btGeneric6DofConstraint*>(_constraint)->getFrameOffsetB().setOrigin(BV(translationOffset));
}

}
