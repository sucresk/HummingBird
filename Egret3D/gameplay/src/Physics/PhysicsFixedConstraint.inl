#include "PhysicsFixedConstraint.h"

namespace egret
{

inline void PhysicsFixedConstraint::setAngularLowerLimit(const kmVec3& limit)
{
    PhysicsGenericConstraint::setAngularLowerLimit(limit);
}

inline void PhysicsFixedConstraint::setAngularUpperLimit(const kmVec3& limit)
{
    PhysicsGenericConstraint::setAngularUpperLimit(limit);
}

inline void PhysicsFixedConstraint::setLinearLowerLimit(const kmVec3& limit)
{
    PhysicsGenericConstraint::setLinearLowerLimit(limit);
}

inline void PhysicsFixedConstraint::setLinearUpperLimit(const kmVec3& limit)
{
    PhysicsGenericConstraint::setLinearUpperLimit(limit);
}

}
