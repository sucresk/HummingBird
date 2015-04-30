#ifndef __STAGE_H__
#define __STAGE_H__

#include "SkWGL.h"
#include "GrContext.h"
#include "gl/GrGLInterface.h"
#include "GrRenderTarget.h"

extern GrContext*        gfCurContext;
extern GrGLInterface*    gfCurIntf;
extern GrRenderTarget*   gfCurRenderTarget;
extern SkWGLExtensions	 wglExten;

#endif

