attribute vec3 attribute_position ;
attribute vec3 attribute_normal ;
attribute vec3 attribute_tangent ;
attribute vec4 attribute_color ;
attribute vec2 attribute_uv0 ;
attribute vec2 attribute_uv1 ;

uniform mat4 uniform_ModelMatrix ;
uniform mat4 uniform_ProjectionMatrix ;
uniform mat4 uniform_normalEyeSpaceMatrix ;

varying vec4 varying_pos        ;
varying vec3 varying_normal     ;
varying vec2 varying_uv0        ;
varying vec3 varying_eyeNormal  ;
varying vec4 varying_color  ;

void main(void){
   vec4 temp_p ;
   temp_p =  uniform_ModelMatrix * vec4(attribute_position,1.0) ;
   varying_pos =  temp_p ;
   temp_p = uniform_ProjectionMatrix * temp_p ;
  gl_Position = temp_p ;
   //gl_Position = uniform_normalEyeSpaceMatrix * vec4(attribute_position,1.0) ;
   varying_pos.w = -temp_p.z / 128.0 + 0.5 ;
   varying_normal = normalize(attribute_normal) ;
   varying_eyeNormal =  (uniform_normalEyeSpaceMatrix * vec4(attribute_normal,0.0) ).xyz ;
   varying_uv0 = attribute_uv0;
   varying_color = vec4(1.0,1.0,1.0,1.0) ;
}