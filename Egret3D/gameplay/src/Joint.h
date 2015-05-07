#ifndef JOINT_H_
#define JOINT_H_

#include "Node.h"

namespace egret
{

class MeshSkin;
class Bundle;

/**
 * Defines a joint node.
 *
 * This represent a joint in a skeleton that is hierarchially part of
 * a MeshSkin. This allows the vertices in the mesh to be blended and 
 * animated using the sum of the blend weight that must add up to 1.0.
 */
class Joint : public Node
{
    friend class Node;
    friend class MeshSkin;
    friend class Bundle;

public:

    /**
     * @see Node::getType()
     */
    Node::Type getType() const;

    /**
     * @see Node::getScene()
     */
    Scene* getScene() const;

    /**
     * Returns the inverse bind pose kmMat4 for this joint.
     * 
     * @return Inverse bind pose matrix.
     */
    const kmMat4& getInverseBindPose() const;

protected:

    /**
     * Constructor.
     */
    Joint(const char* id);

    /**
     * Destructor.
     */
    virtual ~Joint();

    /**
     * Creates a new joint with the given id.
     * 
     * @param id ID string.
     * 
     * @return Newly created joint.
     */
    static Joint* create(const char* id);

    /**
     * Clones a single node and its data but not its children.
     * This method returns a node pointer but actually creates a Joint.
     * 
     * @param context The clone context.
     * 
     * @return Pointer to the newly created joint.
     */
    virtual Node* cloneSingleNode(NodeCloneContext &context) const;

    /**
     * Sets the inverse bind pose matrix.
     * 
     * @param m kmMat4 representing the inverse bind pose for this Joint.
     */
    void setInverseBindPose(const kmMat4& m);

    /**
     * Updates the joint matrix.
     * 
     * @param bindShape The bind shape matrix.
     * @param matrixPalette The kmMat4 palette to update.
     */
    void updateJointMatrix(const kmMat4& bindShape, kmVec4* matrixPalette);

    /**
     * Called when this Joint's transform changes.
     */
    void transformChanged();

private:

    /**
     * Internal structure to track mesh skins referencing a joint.
     */
    struct SkinReference
    {
        MeshSkin* skin;
        SkinReference* next;

        SkinReference();
        ~SkinReference();
    };

    /**
     * Constructor.
     */
    Joint(const Joint& copy);

    /**
     * Hidden copy assignment operator.
     */
    Joint& operator=(const Joint&);

    void addSkin(MeshSkin* skin);

    void removeSkin(MeshSkin* skin);

    /** 
     * The kmMat4 representation of the Joint's bind pose.
     */
    kmMat4 _bindPose;

    /**
     * Flag used to mark if the Joint's kmMat4 is dirty.
     */
    bool _jointMatrixDirty;

    /**
     * Linked list of mesh skins that are referenced by this joint.
     */
    SkinReference _skin;
};

}

#endif
