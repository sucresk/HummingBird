#include "Context3D.h"
//#include "GL/glew.h"

namespace Egret3D
{

	Context3D gContext3D;

	Context3D::Context3D()
	{
	}

	Context3D::~Context3D()
	{
	}

	GLenum Context3D::init()
	{
		return glewInit();
	}

	void Context3D::EgActiveTexture(GLenum texture)
	{
		glActiveTexture(texture);
	}
	void Context3D::EgAttachShader(GLuint program, GLuint shader)
	{
		glAttachShader(program, shader);
	}

	void Context3D::EgBindAttribLocation(GLuint program, GLuint index, const GLchar* name)
	{
		glBindAttribLocation(program, index, name);
	}
	void Context3D::EgBindBuffer(GLenum target, GLuint buffer)
	{
		glBindBuffer(target, buffer);
	}

	void Context3D::EgBindFramebuffer(GLenum target, GLuint framebuffer)
	{
		return glBindFramebuffer(target, framebuffer);
	}

	void Context3D::EgBindRenderbuffer(GLenum target, GLuint renderbuffer)
	{
		return glBindRenderbuffer(target, renderbuffer);
	}
	void Context3D::EgBindTexture(GLenum target, GLuint texture)
	{
		return glBindTexture(target, texture);
	}

	void Context3D::EgBlendColor(GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha)
	{
		return glBlendColor(red, green, blue, alpha);
	}

	void Context3D::EgBlendEquation(GLenum mode)
	{
		return glBlendEquation(mode);
	}

	void Context3D::EgBlendEquationSeparate(GLenum modeRGB, GLenum modeAlpha)
	{
		return glBlendEquationSeparate(modeRGB, modeAlpha);
	}

	void Context3D::EgBlendFunc(GLenum sfactor, GLenum dfactor)
	{
		return glBlendFunc(sfactor, dfactor);
	}

	void Context3D::EgBlendFuncSeparate(GLenum srcRGB, GLenum dstRGB, GLenum srcAlpha, GLenum dstAlpha)
	{
		return glBlendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
	}

	void Context3D::EgBufferData(GLenum target, GLsizeiptr size, const GLvoid* data, GLenum usage)
	{
		return glBufferData(target, size, data, usage);
	}

	void Context3D::EgBufferSubData(GLenum target, GLintptr offset, GLsizeiptr size, const GLvoid* data)
	{
		return glBufferSubData(target, offset, size, data);
	}

	GLenum Context3D::EgCheckFramebufferStatus(GLenum target)
	{
		return glCheckFramebufferStatus(target);
	}

	void Context3D::EgClear(GLbitfield mask)
	{
		return glClear(mask);
	}

	void Context3D::EgClearColor(GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha)
	{
		return glClearColor(red, green, blue, alpha);
	}

	void Context3D::EgClearDepth(GLclampf depth)
	{
		return glClearDepth(depth);
	}
	void Context3D::EgClearStencil(GLint s)
	{
		return glClearStencil(s);
	}
	void Context3D::EgColorMask(GLboolean red, GLboolean green, GLboolean blue, GLboolean alpha)
	{
		return glColorMask(red, green, blue, alpha);
	}
	void Context3D::EgCompileShader(GLuint shader)
	{
		return glCompileShader(shader);
	}

	void Context3D::EgCompressedTexImage2D(GLenum target, GLint level, GLenum internalformat, GLsizei width, GLsizei height, GLint border, GLsizei imageSize, const GLvoid* data)
	{
		return glCompressedTexImage2D(target, level, internalformat, width, height, border, imageSize, data);
	}
	void Context3D::EgCompressedTexSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLsizei width, GLsizei height, GLenum format, GLsizei imageSize, const GLvoid* data)
	{
		return glCompressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
	}

	void Context3D::EgCopyTexImage2D(GLenum target, GLint level, GLenum internalformat, GLint x, GLint y, GLsizei width, GLsizei height, GLint border)
	{
		return glCopyTexImage2D(target, level, internalformat, x, y, width, height, border);
	}

	void Context3D::EgCopyTexSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLint x, GLint y, GLsizei width, GLsizei height)
	{
		return glCopyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
	}

	GLuint Context3D::EgCreateProgram(void)
	{
		return glCreateProgram();
	}

	GLuint Context3D::EgCreateShader(GLenum type)
	{
		return glCreateShader(type);
	}

	void Context3D::EgCullFace(GLenum mode)
	{
		return glCullFace(mode);
	}

	void Context3D::EgDeleteBuffers(GLsizei n, const GLuint* buffers)
	{
		return glDeleteBuffers(n, buffers);
	}

	void Context3D::EgDeleteFramebuffers(GLsizei n, const GLuint* framebuffers)
	{
		return glDeleteFramebuffers(n, framebuffers);
	}

	void Context3D::EgDeleteProgram(GLuint program)
	{
		return glDeleteProgram(program);
	}

	void Context3D::EgDeleteRenderbuffers(GLsizei n, const GLuint* renderbuffers)
	{
		return glDeleteRenderbuffers(n, renderbuffers);
	}

	void Context3D::EgDeleteShader(GLuint shader)
	{
		return glDeleteShader(shader);
	}
	void Context3D::EgDeleteTextures(GLsizei n, const GLuint* textures)
	{
		return glDeleteTextures(n, textures);
	}

	void Context3D::EgDepthFunc(GLenum func)
	{
		return glDepthFunc(func);
	}

	void Context3D::EgDepthMask(GLboolean flag)
	{
		return glDepthMask(flag);
	}

	void Context3D::EgDepthRangef(GLclampf zNear, GLclampf zFar)
	{
		return glDepthRangef(zNear, zFar);
	}
	void Context3D::EgDetachShader(GLuint program, GLuint shader)
	{
		return glDetachShader(program, shader);
	}

	void Context3D::EgDisable(GLenum cap)
	{
		return glDisable(cap);
	}

	void Context3D::EgDisableVertexAttribArray(GLuint index)
	{
		return glDisableVertexAttribArray(index);
	}

	void Context3D::EgDrawArrays(GLenum mode, GLint first, GLsizei count)
	{
		return glDrawArrays(mode, first, count);
	}

	void Context3D::EgDrawElements(GLenum mode, GLsizei count, GLenum type, const GLvoid* indices)
	{
		return glDrawElements(mode, count, type, indices);
	}

	void Context3D::EgEnable(GLenum cap)
	{
		return glEnable(cap);
	}
	void Context3D::EgEnableVertexAttribArray(GLuint index)
	{
		return glEnableVertexAttribArray(index);
	}

	void Context3D::EgFinish(void)
	{
		return glFinish();
	}

	void Context3D::EgFlush(void)
	{
		return glFlush();
	}

	void Context3D::EgFramebufferRenderbuffer(GLenum target, GLenum attachment, GLenum renderbuffertarget, GLuint renderbuffer)
	{
		return glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer);
	}

	void Context3D::EgFramebufferTexture2D(GLenum target, GLenum attachment, GLenum textarget, GLuint texture, GLint level)
	{
		return glFramebufferTexture2D(target, attachment, textarget, texture, level);
	}

	void Context3D::EgFrontFace(GLenum mode)
	{
		return glFrontFace(mode);
	}

	void Context3D::EgGenBuffers(GLsizei n, GLuint* buffers)
	{
		return glGenBuffers(n, buffers);
	}

	void Context3D::EgGenerateMipmap(GLenum target)
	{
		return glGenerateMipmap(target);
	}
	void Context3D::EgGenFramebuffers(GLsizei n, GLuint* framebuffers)
	{
		return glGenFramebuffers(n, framebuffers);
	}

	void Context3D::EgGenRenderbuffers(GLsizei n, GLuint* renderbuffers)
	{
		return glGenRenderbuffers(n, renderbuffers);
	}

	void Context3D::EgGenTextures(GLsizei n, GLuint* textures)
	{
		return glGenTextures(n, textures);
	}
	void Context3D::EgGetActiveAttrib(GLuint program, GLuint index, GLsizei bufsize, GLsizei* length, GLint* size, GLenum* type, GLchar* name)
	{
		return glGetActiveAttrib(program, index, bufsize, length, size, type, name);
	}

	void Context3D::EgGetActiveUniform(GLuint program, GLuint index, GLsizei bufsize, GLsizei* length, GLint* size, GLenum* type, GLchar* name)
	{
		return glGetActiveUniform(program, index, bufsize, length, size, type, name);
	}

	void Context3D::EgGetAttachedShaders(GLuint program, GLsizei maxcount, GLsizei* count, GLuint* shaders)
	{
		return glGetAttachedShaders(program, maxcount, count, shaders);
	}

	int  Context3D::EgGetAttribLocation(GLuint program, const GLchar* name)
	{
		return glGetAttribLocation(program, name);
	}

	void Context3D::EgGetBooleanv(GLenum pname, GLboolean* params)
	{
		return glGetBooleanv(pname, params);
	}

	void Context3D::EgGetBufferParameteriv(GLenum target, GLenum pname, GLint* params)
	{
		return glGetBufferParameteriv(target, pname, params);
	}

	GLenum Context3D::EgGetError(void)
	{
		return glGetError();
	}

	void Context3D::EgGetFloatv(GLenum pname, GLfloat* params)
	{
		return glGetFloatv(pname, params);
	}

	void Context3D::EgGetFramebufferAttachmentParameteriv(GLenum target, GLenum attachment, GLenum pname, GLint* params)
	{
		return glGetFramebufferAttachmentParameteriv(target, attachment, pname, params);
	}

	void Context3D::EgGetIntegerv(GLenum pname, GLint* params)
	{
		return glGetIntegerv(pname, params);
	}

	void Context3D::EgGetProgramiv(GLuint program, GLenum pname, GLint* params)
	{
		return glGetProgramiv(program, pname, params);
	}

	void Context3D::EgGetProgramInfoLog(GLuint program, GLsizei bufsize, GLsizei* length, GLchar* infolog)
	{
		return glGetProgramPipelineInfoLog(program, bufsize, length, infolog);
	}

	void Context3D::EgGetRenderbufferParameteriv(GLenum target, GLenum pname, GLint* params)
	{
		return glGetRenderbufferParameteriv(target, pname, params);
	}

	void Context3D::EgGetShaderiv(GLuint shader, GLenum pname, GLint* params)
	{
		return glGetShaderiv(shader, pname, params);
	}

	void Context3D::EgGetShaderInfoLog(GLuint shader, GLsizei bufsize, GLsizei* length, GLchar* infolog)
	{
		return glGetShaderInfoLog(shader, bufsize, length, infolog);
	}
	void Context3D::EgGetShaderPrecisionFormat(GLenum shadertype, GLenum precisiontype, GLint* range, GLint* precision)
	{
		return glGetShaderPrecisionFormat(shadertype, precisiontype, range, precision);
	}
	void Context3D::EgGetShaderSource(GLuint shader, GLsizei bufsize, GLsizei* length, GLchar* source)
	{
		return glGetShaderSource(shader, bufsize, length, source);
	}

	const GLubyte* Context3D::EgGetString(GLenum name)
	{
		return glGetString(name);
	}

	void Context3D::EgGetTexParameterfv(GLenum target, GLenum pname, GLfloat* params)
	{
		return glGetTexParameterfv(target, pname, params);
	}

	void Context3D::EgGetTexParameteriv(GLenum target, GLenum pname, GLint* params)
	{
		return glGetTexParameteriv(target, pname, params);
	}

	void Context3D::EgGetUniformfv(GLuint program, GLint location, GLfloat* params)
	{
		return glGetUniformfv(program, location, params);
	}

	void Context3D::EgGetUniformiv(GLuint program, GLint location, GLint* params)
	{
		return glGetUniformiv(program, location, params);
	}

	int  Context3D::EgGetUniformLocation(GLuint program, const GLchar* name)
	{
		return glGetUniformLocation(program, name);
	}

	void Context3D::EgGetVertexAttribfv(GLuint index, GLenum pname, GLfloat* params)
	{
		return glGetVertexAttribfv(index, pname, params);
	}

	void Context3D::EgGetVertexAttribiv(GLuint index, GLenum pname, GLint* params)
	{
		return glGetVertexAttribiv(index, pname, params);
	}

	void Context3D::EgGetVertexAttribPointerv(GLuint index, GLenum pname, GLvoid** pointer)
	{
		return glGetVertexAttribPointerv(index, pname, pointer);
	}

	void Context3D::EgHint(GLenum target, GLenum mode)
	{
		return glHint(target, mode);
	}

	GLboolean Context3D::EgIsBuffer(GLuint buffer)
	{
		return glIsBuffer(buffer);
	}

	GLboolean Context3D::EgIsEnabled(GLenum cap)
	{
		return glIsEnabled(cap);
	}

	GLboolean Context3D::EgIsFramebuffer(GLuint framebuffer)
	{
		return glIsFramebuffer(framebuffer);
	}
	GLboolean Context3D::EgIsProgram(GLuint program)
	{
		return glIsProgram(program);
	}
	GLboolean Context3D::EgIsRenderbuffer(GLuint renderbuffer)
	{
		return glIsRenderbuffer(renderbuffer);
	}

	GLboolean Context3D::EgIsShader(GLuint shader)
	{
		return glIsShader(shader);
	}

	GLboolean Context3D::EgIsTexture(GLuint texture)
	{
		return glIsTexture(texture);
	}

	void Context3D::EgLineWidth(GLfloat width)
	{
		return glLineWidth(width);
	}

	void Context3D::EgLinkProgram(GLuint program)
	{
		return glLinkProgram(program);
	}

	void Context3D::EgPixelStorei(GLenum pname, GLint param)
	{
		return glPixelStorei(pname, param);
	}

	void Context3D::EgPolygonOffset(GLfloat factor, GLfloat units)
	{
		return glPolygonOffset(factor, units);
	}

	void Context3D::EgReadPixels(GLint x, GLint y, GLsizei width, GLsizei height, GLenum format, GLenum type, GLvoid* pixels)
	{
		return glReadPixels(x, y, width, height, format, type, pixels);
	}

	void Context3D::EgReleaseShaderCompiler(void)
	{
		return glReleaseShaderCompiler();
	}

	void Context3D::EgRenderbufferStorage(GLenum target, GLenum internalformat, GLsizei width, GLsizei height)
	{
		return glRenderbufferStorage(target, internalformat, width, height);
	}

	void Context3D::EgSampleCoverage(GLclampf value, GLboolean invert)
	{
		return glSampleCoverage(value, invert);
	}

	void Context3D::EgScissor(GLint x, GLint y, GLsizei width, GLsizei height)
	{
		return glScissor(x, y, width, height);
	}

	void Context3D::EgShaderBinary(GLsizei n, const GLuint* shaders, GLenum binaryformat, const GLvoid* binary, GLsizei length)
	{
		return glShaderBinary(n, shaders, binaryformat, binary, length);
	}

	void Context3D::EgShaderSource(GLuint shader, GLsizei count, const GLchar** string, const GLint* length)
	{
		return glShaderSource(shader, count, string, length);
	}

	void Context3D::EgStencilFunc(GLenum func, GLint ref, GLuint mask)
	{
		return glStencilFunc(func, ref, mask);
	}

	void Context3D::EgStencilFuncSeparate(GLenum face, GLenum func, GLint ref, GLuint mask)
	{
		return glStencilFuncSeparate(face, func, ref, mask);
	}

	void Context3D::EgStencilMask(GLuint mask)
	{
		return glStencilMask(mask);
	}

	void Context3D::EgStencilMaskSeparate(GLenum face, GLuint mask)
	{
		return glStencilMaskSeparate(face, mask);
	}

	void Context3D::EgStencilOp(GLenum fail, GLenum zfail, GLenum zpass)
	{
		return glStencilOp(fail, zfail, zpass);
	}

	void Context3D::EgStencilOpSeparate(GLenum face, GLenum fail, GLenum zfail, GLenum zpass)
	{
		return glStencilOpSeparate(face, fail, zfail, zpass);
	}

	void Context3D::EgTexImage2D(GLenum target, GLint level, GLint internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, const GLvoid* pixels)
	{
		return glTexImage2D(target, level, internalformat, width, height, border, format, type, pixels);
	}
	void Context3D::EgTexParameterf(GLenum target, GLenum pname, GLfloat param)
	{
		return glTexParameterf(target, pname, param);
	}

	void Context3D::EgTexParameterfv(GLenum target, GLenum pname, const GLfloat* params)
	{
		return glTexParameterfv(target, pname, params);
	}

	void Context3D::EgTexParameteri(GLenum target, GLenum pname, GLint param)
	{
		return glTexParameteri(target, pname, param);
	}

	void Context3D::EgTexParameteriv(GLenum target, GLenum pname, const GLint* params)
	{
		return glTexParameteriv(target, pname, params);
	}

	void Context3D::EgTexSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, GLsizei width, GLsizei height, GLenum format, GLenum type, const GLvoid* pixels)
	{
		return glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
	}

	void Context3D::EgUniform1f(GLint location, GLfloat x)
	{
		return glUniform1f(location, x);
	}

	void Context3D::EgUniform1fv(GLint location, GLsizei count, const GLfloat* v)
	{
		return glUniform1fv(location, count, v);
	}

	void Context3D::EgUniform1i(GLint location, GLint x)
	{
		return glUniform1i(location, x);
	}

	void Context3D::EgUniform1iv(GLint location, GLsizei count, const GLint* v)
	{
		return glUniform1iv(location, count, v);
	}

	void Context3D::EgUniform2f(GLint location, GLfloat x, GLfloat y)
	{
		return glUniform2f(location, x, y);
	}
	void Context3D::EgUniform2fv(GLint location, GLsizei count, const GLfloat* v)
	{
		return glUniform2fv(location, count, v);
	}

	void Context3D::EgUniform2i(GLint location, GLint x, GLint y)
	{
		return glUniform2i(location, x, y);
	}

	void Context3D::EgUniform2iv(GLint location, GLsizei count, const GLint* v)
	{
		return glUniform2iv(location, count, v);
	}
	void Context3D::EgUniform3f(GLint location, GLfloat x, GLfloat y, GLfloat z)
	{
		return glUniform3f(location, x, y, z);
	}

	void Context3D::EgUniform3fv(GLint location, GLsizei count, const GLfloat* v)
	{
		return glUniform3fv(location, count, v);
	}

	void Context3D::EgUniform3i(GLint location, GLint x, GLint y, GLint z)
	{
		return glUniform3i(location, x, y, z);
	}

	void Context3D::EgUniform3iv(GLint location, GLsizei count, const GLint* v)
	{
		return glUniform3iv(location, count, v);
	}

	void Context3D::EgUniform4f(GLint location, GLfloat x, GLfloat y, GLfloat z, GLfloat w)
	{
		return glUniform4f(location, x, y, z, w);
	}

	void Context3D::EgUniform4fv(GLint location, GLsizei count, const GLfloat* v)
	{
		return glUniform4fv(location, count, v);
	}

	void Context3D::EgUniform4i(GLint location, GLint x, GLint y, GLint z, GLint w)
	{
		return glUniform4i(location, x, y, z, w);
	}

	void Context3D::EgUniform4iv(GLint location, GLsizei count, const GLint* v)
	{
		return glUniform4iv(location, count, v);
	}

	void Context3D::EgUniformMatrix2fv(GLint location, GLsizei count, GLboolean transpose, const GLfloat* value)
	{
		return glUniformMatrix2fv(location, count, transpose, value);
	}
	void Context3D::EgUniformMatrix3fv(GLint location, GLsizei count, GLboolean transpose, const GLfloat* value)
	{
		return glUniformMatrix3fv(location, count, transpose, value);
	}

	void Context3D::EgUniformMatrix4fv(GLint location, GLsizei count, GLboolean transpose, const GLfloat* value)
	{
		return glUniformMatrix4fv(location, count, transpose, value);
	}

	void Context3D::EgUseProgram(GLuint program)
	{
		return glUseProgram(program);
	}

	void Context3D::EgValidateProgram(GLuint program)
	{
		return glValidateProgram(program);
	}

	void Context3D::EgVertexAttrib1f(GLuint indx, GLfloat x)
	{
		return glVertexAttrib1f(indx, x);
	}

	void Context3D::EgVertexAttrib1fv(GLuint indx, const GLfloat* values)
	{
		return glVertexAttrib1fv(indx, values);
	}

	void Context3D::EgVertexAttrib2f(GLuint indx, GLfloat x, GLfloat y)
	{
		return glVertexAttrib2f(indx, x, y);
	}
	void Context3D::EgVertexAttrib2fv(GLuint indx, const GLfloat* values)
	{
		return glVertexAttrib2fv(indx, values);
	}
	void Context3D::EgVertexAttrib3f(GLuint indx, GLfloat x, GLfloat y, GLfloat z)
	{
		return glVertexAttrib3f(indx, x, y, z);
	}

	void Context3D::EgVertexAttrib3fv(GLuint indx, const GLfloat* values)
	{
		return glVertexAttrib3fv(indx, values);
	}

	void Context3D::EgVertexAttrib4f(GLuint indx, GLfloat x, GLfloat y, GLfloat z, GLfloat w)
	{
		return glVertexAttrib4f(indx, x, y, z, w);
	}
	void Context3D::EgVertexAttrib4fv(GLuint indx, const GLfloat* values)
	{
		return glVertexAttrib4fv(indx, values);
	}

	void Context3D::EgVertexAttribPointer(GLuint indx, GLint size, GLenum type, GLboolean normalized, GLsizei stride, const GLvoid* ptr)
	{
		return glVertexAttribPointer(indx, size, type, normalized, stride, ptr);
	}
	void Context3D::EgViewport(GLint x, GLint y, GLsizei width, GLsizei height)
	{
		return glViewport(x, y, width, height);
	}

	void Context3D::EgGenVertexArrays(GLsizei n, GLuint *arrays)
	{
		return glGenVertexArrays(n, arrays);
	}

	void Context3D::EgBindVertexArray(GLuint array)
	{
		return glBindVertexArray(array);
	}

	void Context3D::EgDeleteVertexArrays(GLsizei n, const GLuint *arrays)
	{
		return glDeleteVertexArrays(n, arrays);
	}

}
