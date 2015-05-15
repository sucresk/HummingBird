#include "Base.h"
#include "PhysicsConstraint.h"
#include "Game.h"
#include "Node.h"
#include "PhysicsRigidBody.h"

namespace egret
{

PhysicsConstraint::PhysicsConstraint(PhysicsRigidBody* a, PhysicsRigidBody* b)
    : _a(a), _b(b), _constraint(NULL)
{
}

PhysicsConstraint::~PhysicsConstraint()
{
    // Remove the physics rigid bodies' references to this constraint.
    if (_a)
        _a->removeConstraint(this);
    if (_b)
        _b->removeConstraint(this);

    // Remove the constraint from the physics world and delete the Bullet object.
    GP_ASSERT(Game::getInstance()->getPhysicsController());
    Game::getInstance()->getPhysicsController()->removeConstraint(this);
    SAFE_DELETE(_constraint);
}

kmVec3 PhysicsConstraint::centerOfMassMidpoint(const Node* a, const Node* b)
{
    GP_ASSERT(a);
    GP_ASSERT(b);

	kmVec3 tA = vec3Zero;
	kmVec3 tB = vec3Zero;
    //a->getWorldMatrix().getTranslation(&tA);
    //b->getWorldMatrix().getTranslation(&tB);
	kmMat4Decompose(&a->getWorldMatrix(), NULL, NULL, &tA);
	kmMat4Decompose(&b->getWorldMatrix(), NULL, NULL, &tB);

    tA = getWorldCenterOfMass(a);
    tB = getWorldCenterOfMass(b);
    
    //kmVec3 d (tA, tB);
    //d.scale(0.5f);
    //kmVec3 c(tA);
    //c.add(d);

	kmVec3 d = vec3Zero;
	kmVec3Subtract(&d, &tA, &tB);
	kmVec3Scale(&d, &d, 0.5f);
	kmVec3 c = tA;
	kmVec3Add(&c, &c, &d);

    return c;
}

kmQuaternion PhysicsConstraint::getRotationOffset(const Node* node, const kmVec3& point)
{
    GP_ASSERT(node);

    // Create a translation kmMat4 that translates to the given origin.
    kmMat4 m = mat4Identity;
    //Matrix::createTranslation(point, &m);
	kmMat4CreateTranslation(&m, point.x, point.y, point.z);
    // Calculate the rotation offset to the rigid body by transforming 
    // the translation kmMat4 above into the rigid body's local space 
    // (multiply by the inverse world matrix) and extracting the rotation.
    kmMat4 mi = mat4Identity;
    //node->getWorldMatrix().invert(&mi);
    //mi.multiply(m);
	kmMat4Invert(&mi, &node->getWorldMatrix());
	kmMat4Multiply(&mi, &mi, &m);
    
    kmQuaternion r;
    //mi.getRotation(&r);
	kmMat4Decompose(&mi, NULL, &r, NULL);

    return r;
}

kmVec3 PhysicsConstraint::getTranslationOffset(const Node* node, const kmVec3& point)
{
    GP_ASSERT(node);

    // Create a translation kmMat4 that translates to the given origin.
    kmMat4 m = mat4Identity;
    //Matrix::createTranslation(point, &m);
	kmMat4CreateTranslation(&m, point.x, point.y, point.z);

    // Calculate the translation offset to the rigid body by transforming 
    // the translation kmMat4 above into the rigid body's local space 
    // (multiply by the inverse world matrix) and extracting the translation.
    kmMat4 mi = mat4Identity;
    //node->getWorldMatrix().invert(&mi);
    //mi.multiply(m);
	kmMat4Inverse(&mi, &node->getWorldMatrix());
	kmMat4Multiply( &mi, &mi, &m );
    
    kmVec3 t = vec3Zero;
    //mi.getTranslation(&t);
	kmMat4Decompose(&mi, NULL, NULL, &t);

    kmVec3 s = vec3Zero;
    //node->getWorldMatrix().getScale(&s);
	kmMat4Decompose(&node->getWorldMatrix(), &s, NULL, NULL);

    t.x *= s.x;
    t.y *= s.y;
    t.z *= s.z;
    
    t = offsetByCenterOfMass(node, t);

    return t;
}

btTransform PhysicsConstraint::getTransformOffset(const Node* node, const kmVec3& origin)
{
    GP_ASSERT(node);

    // Create a translation kmMat4 that translates to the given origin.
    kmMat4 m = mat4Identity;
    //Matrix::createTranslation(origin, &m);
	kmMat4CreateTranslation(&m, origin.x, origin.y, origin.z);

    // Calculate the translation and rotation offset to the rigid body
    // by transforming the translation kmMat4 above into the rigid body's
    // local space (multiply by the inverse world kmMat4 and extract components).
    kmMat4 mi = mat4Identity;
    //node->getWorldMatrix().invert(&mi);
    //mi.multiply(m);
	kmMat4Invert(&mi, &node->getWorldMatrix());

    kmQuaternion r;
    //mi.getRotation(&r);
	kmMat4Decompose(&mi, NULL, &r, NULL);
    
    kmVec3 t = vec3Zero;
    //mi.getTranslation(&t);
	kmMat4Decompose(&mi, NULL, NULL, &t);

    kmVec3 s = vec3Zero;
    //node->getWorldMatrix().getScale(&s);
	kmMat4Decompose(&node->getWorldMatrix(), &s, NULL, NULL);

    t.x *= s.x;
    t.y *= s.y;
    t.z *= s.z;
    
    t = offsetByCenterOfMass(node, t);

    return btTransform(BQ(r), BV(t));
}

kmVec3 PhysicsConstraint::getWorldCenterOfMass(const Node* node)
{
    GP_ASSERT(node);

    const BoundingSphere& sphere = node->getBoundingSphere();
    if (!( kmVec3IsZero( &sphere.center) && sphere.radius == 0))
    {
        // The world-space center of mass is the sphere's center.
        return sphere.center;
    }

    // Warn the user that the node has no bounding volume.
    GP_WARN("Node %s' has no bounding volume - center of mass is defaulting to local coordinate origin.", node->getId());

    kmVec3 center = vec3Zero;
    //node->getWorldMatrix().transformPoint(&center);
	kmMat3Transform(&center, &node->getWorldMatrix(), 0.0f, 0.0f, 0.0, 1.0f);
    return center;
}

kmVec3 PhysicsConstraint::offsetByCenterOfMass(const Node* node, const kmVec3& v)
{
    GP_ASSERT(node && node->getCollisionObject() && node->getCollisionObject()->_motionState);
    btVector3 centerOfMassOffset = node->getCollisionObject()->_motionState->_centerOfMassOffset.getOrigin();
	return{ v.x + centerOfMassOffset.x(), v.y + centerOfMassOffset.y(), v.z + centerOfMassOffset.z() };
}

}
