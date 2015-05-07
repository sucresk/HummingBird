#ifndef MESHBATCHSAMPLE_H_
#define MESHBATCHSAMPLE_H_

#include "gameplay.h"
#include "Sample.h"

using namespace egret;

/**
 * Sample drawing static mesh geometry using MeshBatch.
 */
class MeshBatchSample : public Sample
{
public:

    MeshBatchSample();

    void touchEvent(Touch::TouchEvent evt, int x, int y, unsigned int contactIndex);

protected:

    void initialize();

    void finalize();

    void update(float elapsedTime);

    void render(float elapsedTime);

private:

    void addTriangle(int x, int y);

    struct Vertex
    {
        kmVec3 position;
        kmVec3 color;

        Vertex() { }

        Vertex(const kmVec3& position, const kmVec3& color) : position(position), color(color) { }
    };

    Font* _font;
    MeshBatch* _meshBatch;
    Matrix _worldViewProjectionMatrix;
    std::vector<Vertex> _vertices;
    double _lastTriangleAdded;
};

#endif
