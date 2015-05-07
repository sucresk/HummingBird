#include "PhysicsRigidBody.h"
#include "Base.h"

namespace egret
{

inline float PhysicsRigidBody::getMass() const
{
    return _mass;
}

inline float PhysicsRigidBody::getFriction() const
{
    GP_ASSERT(_body);
    return _body->getFriction();
}

inline void PhysicsRigidBody::setFriction(float friction)
{
    GP_ASSERT(_body);
    _body->setFriction(friction);
}

inline float PhysicsRigidBody::getRestitution() const
{
    GP_ASSERT(_body);
    return _body->getRestitution();
}

inline void PhysicsRigidBody::setRestitution(float restitution)
{
    GP_ASSERT(_body);
    _body->setRestitution(restitution);
}

inline float PhysicsRigidBody::getLinearDamping() const
{
    GP_ASSERT(_body);
    return _body->getLinearDamping();
}

inline float PhysicsRigidBody::getAngularDamping() const
{
    GP_ASSERT(_body);
    return _body->getAngularDamping();
}

inline void PhysicsRigidBody::setDamping(float linearDamping, float angularDamping)
{
    GP_ASSERT(_body);
    _body->setDamping(linearDamping, angularDamping);
}

inline kmVec3 PhysicsRigidBody::getLinearVelocity() const
{
    GP_ASSERT(_body);
	const btVector3 v = _body->getLinearVelocity();
	return{ v.x(), v.y(), v.z() };
}

inline void PhysicsRigidBody::setLinearVelocity(const kmVec3& velocity)
{
    GP_ASSERT(_body);
    _body->setLinearVelocity(BV(velocity));
}

inline void PhysicsRigidBody::setLinearVelocity(float x, float y, float z)
{
    GP_ASSERT(_body);
    _body->setLinearVelocity(btVector3(x, y, z));
}

inline kmVec3 PhysicsRigidBody::getAngularVelocity() const
{
    GP_ASSERT(_body);
	const btVector3& v = _body->getAngularVelocity();
	return{ v.x(), v.y(), v.z() };
}

inline void PhysicsRigidBody::setAngularVelocity(const kmVec3& velocity)
{
    GP_ASSERT(_body);
    _body->setAngularVelocity(BV(velocity));
}

inline void PhysicsRigidBody::setAngularVelocity(float x, float y, float z)
{
    GP_ASSERT(_body);
    _body->setAngularVelocity(btVector3(x, y, z));
}

inline kmVec3 PhysicsRigidBody::getAnisotropicFriction() const
{
    GP_ASSERT(_body);
	const btVector3& af = _body->getAnisotropicFriction();
	return{ af.x(), af.y(), af.z() };
}

inline void PhysicsRigidBody::setAnisotropicFriction(const kmVec3& friction)
{
    GP_ASSERT(_body);
    _body->setAnisotropicFriction(BV(friction));
}

inline void PhysicsRigidBody::setAnisotropicFriction(float x, float y, float z)
{
    GP_ASSERT(_body);
    _body->setAnisotropicFriction(btVector3(x, y, z));
}

inline kmVec3 PhysicsRigidBody::getGravity() const
{
    GP_ASSERT(_body);
	const btVector3& g = _body->getGravity();
	return{ g.x(), g.y(), g.z() };
}

inline void PhysicsRigidBody::setGravity(const kmVec3& gravity)
{
    GP_ASSERT(_body);
    _body->setGravity(BV(gravity));
}

inline void PhysicsRigidBody::setGravity(float x, float y, float z)
{
    GP_ASSERT(_body);
    _body->setGravity(btVector3(x, y, z));
}

inline kmVec3 PhysicsRigidBody::getAngularFactor() const
{
    GP_ASSERT(_body);
	const btVector3& f = _body->getAngularFactor();
	return{ f.x(), f.y(), f.z() };
}

inline void PhysicsRigidBody::setAngularFactor(const kmVec3& angularFactor)
{
    GP_ASSERT(_body);
    _body->setAngularFactor(BV(angularFactor));
}

inline void PhysicsRigidBody::setAngularFactor(float x, float y, float z)
{
    GP_ASSERT(_body);
    _body->setAngularFactor(btVector3(x, y, z));
}

inline kmVec3 PhysicsRigidBody::getLinearFactor() const
{
    GP_ASSERT(_body);
	const btVector3& f = _body->getLinearFactor();
	return{ f.x(), f.y(), f.z() };
}

inline void PhysicsRigidBody::setLinearFactor(const kmVec3& angularFactor)
{
    GP_ASSERT(_body);
    _body->setLinearFactor(BV(angularFactor));
}

inline void PhysicsRigidBody::setLinearFactor(float x, float y, float z)
{
    GP_ASSERT(_body);
    _body->setLinearFactor(btVector3(x, y, z));
}

inline bool PhysicsRigidBody::isStatic() const
{
    GP_ASSERT(_body);
    return _body->isStaticObject();
}

}
