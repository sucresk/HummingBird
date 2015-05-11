#include "Base.h"
#include "PhysicsFixedConstraint.h"

namespace egret
{

	PhysicsFixedConstraint::PhysicsFixedConstraint(PhysicsRigidBody* a, PhysicsRigidBody* b)
		: PhysicsGenericConstraint(a, b)
	{
		PhysicsGenericConstraint::setAngularLowerLimit({ 0.0f, 0.0f, 0.0f });
		PhysicsGenericConstraint::setAngularUpperLimit({0.0f, 0.0f, 0.0f	});
		PhysicsGenericConstraint::setLinearLowerLimit({ 0.0f, 0.0f, 0.0f });
		PhysicsGenericConstraint::setLinearUpperLimit({ 0.0f, 0.0f, 0.0f });
}

PhysicsFixedConstraint::~PhysicsFixedConstraint()
{
    // Not used.
}

}
