#define usenormal 0  
#define useTangent 0  
#define useVertexColor 0  
#define useFirstUV 0  
#define useSecendUV 0  
#define useEye 0  

attribute vec3 attribute_position ;

#if usenormal == 1
attribute vec3 attribute_normal;  
#endif

#if useTangent == 1
attribute vec3 attribute_tangent;   
#endif

#if useVertexColor == 1
attribute vec4 attribute_vertexColor;   
#endif

#if useFirstUV == 1
attribute vec2 attribute_uv0;   
#endif

#if useSecendUV == 1
attribute vec2 attribute_uv1;   
#endif

#if usenormal == 1
varying vec3 vNormal;  
#endif

#if useTangent == 1
varying vec3 vTangent;   
#endif

#if useVertexColor == 1
varying vec4 vColor;   
#endif

#if useFirstUV == 1
varying vec2 vUv0;   
#endif

#if useSecendUV == 1
varying vec2 vUv0;   
#endif
 
#if useEye == 1
uniform vec3 eye_pos;   
#endif
uniform mat4 modelMatrix;            
uniform mat4 projectionMatrix;   

void main(void){
	gl_Position = projectionMatrix * modelMatrix * vec4(attribute_position, 1.0);
   
    #if usenormal == 1
        vNormal     = attribute_normal ; 
    #endif

    #if useTangent == 1
        vTangent    = attribute_tangent; 
    #endif

    #if useVertexColor == 1
        vColor    = attribute_vertexColor; 
    #endif

    #if useFirstUV == 1
        vUv    = attribute_uv0; 
    #endif

    #if useSecendUV == 1
        vUv2    = attribute_uv1; 
    #endif
}