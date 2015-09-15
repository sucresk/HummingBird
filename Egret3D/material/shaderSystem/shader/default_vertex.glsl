#defined USE_VERTEXCOLOR false ; 
#defined USE_SECOND_UV false ;

attribute vec3 attribute_position ;
attribute vec3 attribute_normal ;

#if USE_VERTEXCOLOR
attribute vec4 attribute_vertexColor ;
#endif

attribute vec2 attribute_uv0 ;

uniform mat4 uniform_modelMatrix ;
uniform mat4 uniform_projectionMatrix ;
vec4 temp_p ;    

#if USE_SECOND_UV
attribute vec2 attribute_uv1 ;
#endif

void outPosition(vec4 target ){
	gl_Position = target ;
}

void main(void){
	p = uniform_modelMatrix * attribute_position ;
	p = uniform_projectionMatrix * p ;
	outPosition( p );
}


