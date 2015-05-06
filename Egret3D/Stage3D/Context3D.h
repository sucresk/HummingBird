#ifndef __CONTEXT3D_H__
#define __CONTEXT3D_H__

#include "Stage3D.h"
#include "gldef.h"

class STAGE3D_API Context3D
{
public:
	Context3D();
	~Context3D();

	void EgActiveTexture(GLenum texture);
	void EgAttachShader(GLuint program, GLuint shader);
	void EgBindAttribLocation(GLuint program, GLuint index, const GLchar* name);
	void EgBindBuffer(GLenum target, GLuint buffer);
	void EgBindFramebuffer(GLenum target, GLuint framebuffer);
	void EgBindRenderbuffer(GLenum target, GLuint renderbuffer);
	void EgBindTexture(GLenum target, GLuint texture);
	void EgBlendColor(GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha);
	void EgBlendEquation(GLenum mode);
	void EgBlendEquationSeparate(GLenum modeRGB, GLenum modeAlpha);
	void EgBlendFunc(GLenum sfactor, GLenum dfactor);
	void EgBlendFuncSeparate(GLenum srcRGB, GLenum dstRGB, GLenum srcAlpha, GLenum dstAlpha);
	void EgBufferData(GLenum target, GLsizeiptr size, const GLvoid* data, GLenum usage);
	void EgBufferSubData(GLenum target, GLintptr offset, GLsizeiptr size, const GLvoid* data);
	GLenum EgCheckFramebufferStatus(GLenum target);
	void EgClear(GLbitfield mask);
	void EgClearColor(GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha);
	void EgClearDepthf(GLclampf depth);
	void EgClearStencil(GLint s);
	void EgColorMask(GLboolean red, GLboolean green, GLboolean blue, GLboolean alpha);
	void EgCompileShader(GLuint shader);
	void EgCompressedTexImage2D(GLenum target, GLint level, GLenum internalformat, GLsizei width, GLsizei height, GLint border, GLsizei imageSize, const GLvoid* data);
	void EgCompressedTexSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLsizei width, GLsizei height, GLenum format, GLsizei imageSize, const GLvoid* data);
	void EgCopyTexImage2D(GLenum target, GLint level, GLenum internalformat, GLint x, GLint y, GLsizei width, GLsizei height, GLint border);
	void EgCopyTexSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLint x, GLint y, GLsizei width, GLsizei height);
	GLuint EgCreateProgram(void);
	GLuint EgCreateShader(GLenum type);
	void EgCullFace(GLenum mode);
	void EgDeleteBuffers(GLsizei n, const GLuint* buffers);
	void EgDeleteFramebuffers(GLsizei n, const GLuint* framebuffers);
	void EgDeleteProgram(GLuint program);
	void EgDeleteRenderbuffers(GLsizei n, const GLuint* renderbuffers);
	void EgDeleteShader(GLuint shader);
	void EgDeleteTextures(GLsizei n, const GLuint* textures);
	void EgDepthFunc(GLenum func);
	void EgDepthMask(GLboolean flag);
	void EgDepthRangef(GLclampf zNear, GLclampf zFar);
	void EgDetachShader(GLuint program, GLuint shader);
	void EgDisable(GLenum cap);
	void EgDisableVertexAttribArray(GLuint index);
	void EgDrawArrays(GLenum mode, GLint first, GLsizei count);
	void EgDrawElements(GLenum mode, GLsizei count, GLenum type, const GLvoid* indices);
	void EgEnable(GLenum cap);
	void EgEnableVertexAttribArray(GLuint index);
	void EgFinish(void);
	void EgFlush(void);
	void EgFramebufferRenderbuffer(GLenum target, GLenum attachment, GLenum renderbuffertarget, GLuint renderbuffer);
	void EgFramebufferTexture2D(GLenum target, GLenum attachment, GLenum textarget, GLuint texture, GLint level);
	void EgFrontFace(GLenum mode);
	void EgGenBuffers(GLsizei n, GLuint* buffers);
	void EgGenerateMipmap(GLenum target);
	void EgGenFramebuffers(GLsizei n, GLuint* framebuffers);
	void EgGenRenderbuffers(GLsizei n, GLuint* renderbuffers);
	void EgGenTextures(GLsizei n, GLuint* textures);
	void EgGetActiveAttrib(GLuint program, GLuint index, GLsizei bufsize, GLsizei* length, GLint* size, GLenum* type, GLchar* name);
	void EgGetActiveUniform(GLuint program, GLuint index, GLsizei bufsize, GLsizei* length, GLint* size, GLenum* type, GLchar* name);
	void EgGetAttachedShaders(GLuint program, GLsizei maxcount, GLsizei* count, GLuint* shaders);
	int  EgGetAttribLocation(GLuint program, const GLchar* name);
	void EgGetBooleanv(GLenum pname, GLboolean* params);
	void EgGetBufferParameteriv(GLenum target, GLenum pname, GLint* params);
	GLenum EgGetError(void);
	void EgGetFloatv(GLenum pname, GLfloat* params);
	void EgGetFramebufferAttachmentParameteriv(GLenum target, GLenum attachment, GLenum pname, GLint* params);
	void EgGetIntegerv(GLenum pname, GLint* params);
	void EgGetProgramiv(GLuint program, GLenum pname, GLint* params);
	void EgGetProgramInfoLog(GLuint program, GLsizei bufsize, GLsizei* length, GLchar* infolog);
	void EgGetRenderbufferParameteriv(GLenum target, GLenum pname, GLint* params);
	void EgGetShaderiv(GLuint shader, GLenum pname, GLint* params);
	void EgGetShaderInfoLog(GLuint shader, GLsizei bufsize, GLsizei* length, GLchar* infolog);
	void EgGetShaderPrecisionFormat(GLenum shadertype, GLenum precisiontype, GLint* range, GLint* precision);
	void EgGetShaderSource(GLuint shader, GLsizei bufsize, GLsizei* length, GLchar* source);
	const GLubyte* EgGetString(GLenum name);
	void EgGetTexParameterfv(GLenum target, GLenum pname, GLfloat* params);
	void EgGetTexParameteriv(GLenum target, GLenum pname, GLint* params);
	void EgGetUniformfv(GLuint program, GLint location, GLfloat* params);
	void EgGetUniformiv(GLuint program, GLint location, GLint* params);
	int  EgGetUniformLocation(GLuint program, const GLchar* name);
	void EgGetVertexAttribfv(GLuint index, GLenum pname, GLfloat* params);
	void EgGetVertexAttribiv(GLuint index, GLenum pname, GLint* params);
	void EgGetVertexAttribPointerv(GLuint index, GLenum pname, GLvoid** pointer);
	void EgHint(GLenum target, GLenum mode);
	GLboolean EgIsBuffer(GLuint buffer);
	GLboolean EgIsEnabled(GLenum cap);
	GLboolean EgIsFramebuffer(GLuint framebuffer);
	GLboolean EgIsProgram(GLuint program);
	GLboolean EgIsRenderbuffer(GLuint renderbuffer);
	GLboolean EgIsShader(GLuint shader);
	GLboolean EgIsTexture(GLuint texture);
	void EgLineWidth(GLfloat width);
	void EgLinkProgram(GLuint program);
	void EgPixelStorei(GLenum pname, GLint param);
	void EgPolygonOffset(GLfloat factor, GLfloat units);
	void EgReadPixels(GLint x, GLint y, GLsizei width, GLsizei height, GLenum format, GLenum type, GLvoid* pixels);
	void EgReleaseShaderCompiler(void);
	void EgRenderbufferStorage(GLenum target, GLenum internalformat, GLsizei width, GLsizei height);
	void EgSampleCoverage(GLclampf value, GLboolean invert);
	void EgScissor(GLint x, GLint y, GLsizei width, GLsizei height);
	void EgShaderBinary(GLsizei n, const GLuint* shaders, GLenum binaryformat, const GLvoid* binary, GLsizei length);
	void EgShaderSource(GLuint shader, GLsizei count, const GLchar** string, const GLint* length);
	void EgStencilFunc(GLenum func, GLint ref, GLuint mask);
	void EgStencilFuncSeparate(GLenum face, GLenum func, GLint ref, GLuint mask);
	void EgStencilMask(GLuint mask);
	void EgStencilMaskSeparate(GLenum face, GLuint mask);
	void EgStencilOp(GLenum fail, GLenum zfail, GLenum zpass);
	void EgStencilOpSeparate(GLenum face, GLenum fail, GLenum zfail, GLenum zpass);
	void EgTexImage2D(GLenum target, GLint level, GLint internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, const GLvoid* pixels);
	void EgTexParameterf(GLenum target, GLenum pname, GLfloat param);
	void EgTexParameterfv(GLenum target, GLenum pname, const GLfloat* params);
	void EgTexParameteri(GLenum target, GLenum pname, GLint param);
	void EgTexParameteriv(GLenum target, GLenum pname, const GLint* params);
	void EgTexSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLsizei width, GLsizei height, GLenum format, GLenum type, const GLvoid* pixels);
	void EgUniform1f(GLint location, GLfloat x);
	void EgUniform1fv(GLint location, GLsizei count, const GLfloat* v);
	void EgUniform1i(GLint location, GLint x);
	void EgUniform1iv(GLint location, GLsizei count, const GLint* v);
	void EgUniform2f(GLint location, GLfloat x, GLfloat y);
	void EgUniform2fv(GLint location, GLsizei count, const GLfloat* v);
	void EgUniform2i(GLint location, GLint x, GLint y);
	void EgUniform2iv(GLint location, GLsizei count, const GLint* v);
	void EgUniform3f(GLint location, GLfloat x, GLfloat y, GLfloat z);
	void EgUniform3fv(GLint location, GLsizei count, const GLfloat* v);
	void EgUniform3i(GLint location, GLint x, GLint y, GLint z);
	void EgUniform3iv(GLint location, GLsizei count, const GLint* v);
	void EgUniform4f(GLint location, GLfloat x, GLfloat y, GLfloat z, GLfloat w);
	void EgUniform4fv(GLint location, GLsizei count, const GLfloat* v);
	void EgUniform4i(GLint location, GLint x, GLint y, GLint z, GLint w);
	void EgUniform4iv(GLint location, GLsizei count, const GLint* v);
	void EgUniformMatrix2fv(GLint location, GLsizei count, GLboolean transpose, const GLfloat* value);
	void EgUniformMatrix3fv(GLint location, GLsizei count, GLboolean transpose, const GLfloat* value);
	void EgUniformMatrix4fv(GLint location, GLsizei count, GLboolean transpose, const GLfloat* value);
	void EgUseProgram(GLuint program);
	void EgValidateProgram(GLuint program);
	void EgVertexAttrib1f(GLuint indx, GLfloat x);
	void EgVertexAttrib1fv(GLuint indx, const GLfloat* values);
	void EgVertexAttrib2f(GLuint indx, GLfloat x, GLfloat y);
	void EgVertexAttrib2fv(GLuint indx, const GLfloat* values);
	void EgVertexAttrib3f(GLuint indx, GLfloat x, GLfloat y, GLfloat z);
	void EgVertexAttrib3fv(GLuint indx, const GLfloat* values);
	void EgVertexAttrib4f(GLuint indx, GLfloat x, GLfloat y, GLfloat z, GLfloat w);
	void EgVertexAttrib4fv(GLuint indx, const GLfloat* values);
	void EgVertexAttribPointer(GLuint indx, GLint size, GLenum type, GLboolean normalized, GLsizei stride, const GLvoid* ptr);
	void EgViewport(GLint x, GLint y, GLsizei width, GLsizei height);

	void EgGenVertexArrays(GLsizei n, GLuint *arrays);
	void EgBindVertexArray(GLuint array);
	void EgDeleteVertexArrays(GLsizei n, const GLuint *arrays);


};

extern Context3D gContext3D;

#endif

