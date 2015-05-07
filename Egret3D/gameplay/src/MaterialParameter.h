#ifndef MATERIALPARAMETER_H_
#define MATERIALPARAMETER_H_

#include "AnimationTarget.h"
#include "vec2.h"
#include "vec3.h"
#include "vec4.h"
#include "mat4.h"
#include "Texture.h"
#include "Effect.h"

namespace egret
{
    class Node;

/**
 * Defines a material parameter.
 *
 * This class represents a parameter that can be set for a material.
 * The methods in this class provide a mechanism to set parameters
 * of all supported types. Some types support setting by value,
 * while others only support setting by reference/pointer.
 *
 * Setting a parameter by reference/pointer provides the ability to
 * pass an array of values as well as a convenient way to support
 * auto-binding of values to a material parameter. For example, by
 * setting the parameter value to a pointer to a Matrix, any changes
 * to the kmMat4 will automatically be reflected in the technique the
 * next time the parameter is applied to the render state.
 *
 * Note that for parameter values to arrays or pointers, the 
 * MaterialParameter will keep a long-lived reference to the passed
 * in array/pointer. Therefore, you must ensure that the pointers
 * you pass in are valid for the lifetime of the MaterialParameter
 * object.
 */
class MaterialParameter : public AnimationTarget, public Ref
{
    friend class RenderState;

public:

    /**
     * Animates the uniform.
     */
    static const int ANIMATE_UNIFORM = 1;

    /**
     * Returns the name of this material parameter.
     */
    const char* getName() const;

    /**
     * Returns the texture sampler or NULL if this MaterialParameter is not a sampler type.
     * 
     * @param index Index of the sampler (if the parameter is a sampler array),
     *      or zero if it is a single sampler value.
     *
     * @return The texture sampler or NULL if this MaterialParameter is not a sampler type.
     */
    Texture::Sampler* getSampler(unsigned int index = 0) const;

    /**
     * Sets the value of this parameter to a float value.
     */
    void setValue(float value);

    /**
     * Sets the value of this parameter to an integer value.
     */
    void setValue(int value);

    /**
     * Stores a pointer/array of float values in this parameter.
     */
    void setValue(const float* values, unsigned int count = 1);

    /**
     * Stores a pointer/array of integer values in this parameter.
     */
    void setValue(const int* values, unsigned int count = 1);

    /**
     * Stores a copy of the specified kmVec2 value in this parameter.
     */
    void setValue(const kmVec2& value);

    /**
     * Stores a pointer/array of kmVec2 values in this parameter.
     */
    void setValue(const kmVec2* values, unsigned int count = 1);

    /**
     * Stores a copy of the specified kmVec3 value in this parameter.
     */
    void setValue(const kmVec3& value);

    /**
     * Stores a pointer/array of kmVec3 values in this parameter.
     */
    void setValue(const kmVec3* values, unsigned int count = 1);

    /**
     * Stores a copy of the specified kmVec4 value in this parameter.
     */
    void setValue(const kmVec4& value);

    /**
     * Stores a pointer/array of kmVec4 values in this parameter.
     */
    void setValue(const kmVec4* values, unsigned int count = 1);

    /**
     * Stores a copy of the specified kmMat4 value in this parameter.
     */
    void setValue(const kmMat4& value);

    /**
     * Stores a pointer/array of kmMat4 values in this parameter.
     */
    void setValue(const kmMat4* values, unsigned int count = 1);

    /**
     * Sets the value of this parameter to the specified texture sampler.
     */
    void setValue(const Texture::Sampler* sampler);

    /**
     * Sets the value of this parameter to the specified texture sampler array.
     *
     * @script{ignore}
     */
    void setValue(const Texture::Sampler** samplers, unsigned int count);

    /**
     * Loads a texture sampler from the specified path and sets it as the value of this parameter.
     *
     * @param texturePath The path to the texture to set.
     * @param generateMipmaps True to generate a full mipmap chain for the texture, false otherwise.
     *
     * @return The texture sampler that was set for this material parameter.
     */
    Texture::Sampler* setValue(const char* texturePath, bool generateMipmaps);

    /**
     * Stores a float value in this parameter.
     *
     * @param value The value to set.
     */
    void setFloat(float value);

    /**
     * Stores an array of float values in this parameter.
     *
     * @param values The array of values.
     * @param count The number of values in the array.
     * @param copy True to make a copy of the array in the material parameter, or false
     *      to point to the passed in array/pointer (which must be valid for the lifetime
     *      of the MaterialParameter).
     */
    void setFloatArray(const float* values, unsigned int count, bool copy = false);

    /**
     * Stores an integer value in this parameter.
     *
     * @param value The value to set.
     */
    void setInt(int value);

    /**
     * Stores an array of integer values in this parameter.
     */
    void setIntArray(const int* values, unsigned int count, bool copy = false);

    /**
     * Stores a kmVec2 value in this parameter.
     *
     * @param value The value to set.
     */
    void setVector2(const kmVec2& value);

    /**
     * Stores an array of kmVec2 values in this parameter.
     *
     * @param values The array of values.
     * @param count The number of values in the array.
     * @param copy True to make a copy of the array in the material parameter, or false
     *      to point to the passed in array/pointer (which must be valid for the lifetime
     *      of the MaterialParameter).
     */
    void setVector2Array(const kmVec2* values, unsigned int count, bool copy = false);

    /**
     * Stores a kmVec3 value in this parameter.
     *
     * @param value The value to set.
     */
    void setVector3(const kmVec3& value);

    /**
     * Stores an array of kmVec3 values in this parameter.
     */
    void setVector3Array(const kmVec3* values, unsigned int count, bool copy = false);

    /**
     * Stores a kmVec4 value in this parameter.
     *
     * @param value The value to set.
     */
    void setVector4(const kmVec4& value);

    /**
     * Stores an array of kmVec4 values in this parameter.
     *
     * @param values The array of values.
     * @param count The number of values in the array.
     * @param copy True to make a copy of the array in the material parameter, or false
     *      to point to the passed in array/pointer (which must be valid for the lifetime
     *      of the MaterialParameter).
     */
    void setVector4Array(const kmVec4* values, unsigned int count, bool copy = false);

    /**
     * Stores a kmMat4 value in this parameter.
     *
     * @param value The value to set.
     */
    void setMatrix(const kmMat4& value);

    /**
     * Stores an array of kmMat4 values in this parameter.
     *
     * @param values The array of values.
     * @param count The number of values in the array.
     * @param copy True to make a copy of the array in the material parameter, or false
     *      to point to the passed in array/pointer (which must be valid for the lifetime
     *      of the MaterialParameter).
     */
    void setMatrixArray(const kmMat4* values, unsigned int count, bool copy = false);

    /**
     * Loads a texture sampler from the specified path and sets it as the value of this parameter.
     *
     * @param texturePath The path to the texture to set.
     * @param generateMipmaps True to generate a full mipmap chain for the texture, false otherwise.
     *
     * @return The texture sampler that was set for this material parameter.
     */
    Texture::Sampler* setSampler(const char* texturePath, bool generateMipmaps);

    /**
     * Stores a Sampler value in this parameter.
     *
     * @param value The value to set.
     */
    void setSampler(const Texture::Sampler* value);

    /**
     * Stores an array of Sampler values in this parameter.
     *
     * @param values The array of values.
     * @param count The number of values in the array.
     * @param copy True to make a copy of the array in the material parameter, or false
     *      to point to the passed in array/pointer (which must be valid for the lifetime
     *      of the MaterialParameter).
     * @script{ignore}
     */
    void setSamplerArray(const Texture::Sampler** values, unsigned int count, bool copy = false);

    /**
     * Binds the return value of a class method to this material parameter.
     *
     * This method enables binding of arbitrary class methods to a material
     * parameter. This is useful when you want to set a material parameter
     * to a variable that is frequently changing (such as a world matrix).
     *
     * By binding a method pointer, the method will be called automatically
     * to retrieve the updated parameter value each time the material is bound
     * for rendering.
     *
     * @param classInstance The instance of the class containing the member method to bind.
     * @param valueMethod A pointer to the class method to bind (in the format '&class::method').
     */
    template <class ClassType, class ParameterType>
    void bindValue(ClassType* classInstance, ParameterType (ClassType::*valueMethod)() const);

    /**
     * Binds the return value of a class method to this material parameter.
     *
     * This overloads the setBinding method to provide support for array parameters.
     * The valueMethod parameter should return an array (pointer) of a supported
     * material parameter type, such as kmMat4* for an array of matrices. The
     * countMethod should point to a method that returns the number of entries in
     * the value returned from valueMethod.
     *
     * @param classInstance The instance of the class containing the member method to bind.
     * @param valueMethod A pointer to the class method to bind (in the format '&class::method').
     * @param countMethod A pointer to a method that returns the number of entries in the array returned by valueMethod.
     */
    template <class ClassType, class ParameterType>
    void bindValue(ClassType* classInstance, ParameterType (ClassType::*valueMethod)() const, unsigned int (ClassType::*countMethod)() const);

    /**
     * Binds the return value of the supported class method for the given node to this material parameter.
     * 
     * Note: intended for use from Lua scripts.
     * 
     * @param node The node containing the the member method to bind.
     * @param binding The name of the class method to bind (in the format '&class::method').
     *      Note: this name must be one of the following supported methods:
     *      - "&Node::getBackVector"
     *      - "&Node::getDownVector"
     *      - "&Node::getTranslationWorld"
     *      - "&Node::getTranslationView"
     *      - "&Node::getForwardVector"
     *      - "&Node::getForwardVectorWorld"
     *      - "&Node::getForwardVectorView"
     *      - "&Node::getLeftVector"
     *      - "&Node::getRightVector"
     *      - "&Node::getRightVectorWorld"
     *      - "&Node::getUpVector"
     *      - "&Node::getUpVectorWorld"
     *      - "&Node::getActiveCameraTranslationWorld"
     *      - "&Node::getActiveCameraTranslationView"
     *      - "&Node::getScaleX"
     *      - "&Node::getScaleY"
     *      - "&Node::getScaleZ"
     *      - "&Node::getTranslationX"
     *      - "&Node::getTranslationY"
     *      - "&Node::getTranslationZ"
     */
    void bindValue(Node* node, const char* binding);

    /**
     * @see AnimationTarget::getAnimationPropertyComponentCount
     */
    unsigned int getAnimationPropertyComponentCount(int propertyId) const;

    /**
     * @see AnimationTarget::getAnimationProperty
     */
    void getAnimationPropertyValue(int propertyId, AnimationValue* value);

    /**
     * @see AnimationTarget::setAnimationProperty
     */
    void setAnimationPropertyValue(int propertyId, AnimationValue* value, float blendWeight = 1.0f);

private:
   
    /**
     * Constructor.
     */
    MaterialParameter(const char* name);
    
    /**
     * Destructor.
     */
    ~MaterialParameter();

    /**
     * Hidden copy assignment operator.
     */
    MaterialParameter& operator=(const MaterialParameter&);
    
    /**
     * Interface implemented by templated method bindings for simple storage and iteration.
     */
    class MethodBinding : public Ref
    {
        friend class RenderState;

    public:

        virtual void setValue(Effect* effect) = 0;

    protected:

        /**
         * Constructor.
         */
        MethodBinding(MaterialParameter* param);

        /**
         * Destructor.
         */
        virtual ~MethodBinding() { }

        /**
         * Hidden copy assignment operator.
         */
        MethodBinding& operator=(const MethodBinding&);

        MaterialParameter* _parameter;
        bool _autoBinding;
    };

    /**
     * Defines a method parameter binding for a single value.
     */
    template <class ClassType, class ParameterType>
    class MethodValueBinding : public MethodBinding
    {
        typedef ParameterType (ClassType::*ValueMethod)() const;
    public:
        MethodValueBinding(MaterialParameter* param, ClassType* instance, ValueMethod valueMethod);
        void setValue(Effect* effect);
    private:
        ClassType* _instance;
        ValueMethod _valueMethod;

    };

    /**
     * Defines a method parameter binding for an array of values.
     */
    template <class ClassType, class ParameterType>
    class MethodArrayBinding : public MethodBinding
    {
        typedef ParameterType (ClassType::*ValueMethod)() const;
        typedef unsigned int (ClassType::*CountMethod)() const;
    public:
        MethodArrayBinding(MaterialParameter* param, ClassType* instance, ValueMethod valueMethod, CountMethod countMethod);
        void setValue(Effect* effect);
    private:
        ClassType* _instance;
        ValueMethod _valueMethod;
        CountMethod _countMethod;
    };

    void clearValue();

    void bind(Effect* effect);

    void applyAnimationValue(AnimationValue* value, float blendWeight, int components);

    void cloneInto(MaterialParameter* materialParameter) const;

    enum LOGGER_DIRTYBITS
    {
        UNIFORM_NOT_FOUND = 0x01,
        PARAMETER_VALUE_NOT_SET = 0x02
    };
    
    union
    {
        /** @script{ignore} */
        float floatValue;
        /** @script{ignore} */
        int intValue;
        /** @script{ignore} */
        float* floatPtrValue;
        /** @script{ignore} */
        int* intPtrValue;
        /** @script{ignore} */
        const Texture::Sampler* samplerValue;
        /** @script{ignore} */
        const Texture::Sampler** samplerArrayValue;
        /** @script{ignore} */
        MethodBinding* method;
    } _value;
    
    enum
    {
        NONE,
        FLOAT,
        FLOAT_ARRAY,
        INT,
        INT_ARRAY,
        VECTOR2,
        VECTOR3,
        VECTOR4,
        MATRIX,
        SAMPLER,
        SAMPLER_ARRAY,
        METHOD
    } _type;
    
    unsigned int _count;
    bool _dynamic;
    std::string _name;
    Uniform* _uniform;
    char _loggerDirtyBits;
};

template <class ClassType, class ParameterType>
void MaterialParameter::bindValue(ClassType* classInstance, ParameterType (ClassType::*valueMethod)() const)
{
    clearValue();

    _value.method = new MethodValueBinding<ClassType, ParameterType>(this, classInstance, valueMethod);
    _dynamic = true;
    _type = MaterialParameter::METHOD;
}

template <class ClassType, class ParameterType>
void MaterialParameter::bindValue(ClassType* classInstance, ParameterType (ClassType::*valueMethod)() const, unsigned int (ClassType::*countMethod)() const)
{
    clearValue();

    _value.method = new MethodArrayBinding<ClassType, ParameterType>(this, classInstance, valueMethod, countMethod);
    _dynamic = true;
    _type = MaterialParameter::METHOD;
}

template <class ClassType, class ParameterType>
MaterialParameter::MethodValueBinding<ClassType, ParameterType>::MethodValueBinding(MaterialParameter* param, ClassType* instance, ValueMethod valueMethod) :
    MethodBinding(param), _instance(instance), _valueMethod(valueMethod)
{
}

template <class ClassType, class ParameterType>
void MaterialParameter::MethodValueBinding<ClassType, ParameterType>::setValue(Effect* effect)
{
    effect->setValue(_parameter->_uniform, (_instance->*_valueMethod)());
}

template <class ClassType, class ParameterType>
MaterialParameter::MethodArrayBinding<ClassType, ParameterType>::MethodArrayBinding(MaterialParameter* param, ClassType* instance, ValueMethod valueMethod, CountMethod countMethod) :
    MethodBinding(param), _instance(instance), _valueMethod(valueMethod), _countMethod(countMethod)
{
}

template <class ClassType, class ParameterType>
void MaterialParameter::MethodArrayBinding<ClassType, ParameterType>::setValue(Effect* effect)
{
    effect->setValue(_parameter->_uniform, (_instance->*_valueMethod)(), (_instance->*_countMethod)());
}

}

#endif
