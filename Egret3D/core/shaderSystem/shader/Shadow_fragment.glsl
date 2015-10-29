varying vec4 varying_globalpos ;
varying vec2 varying_uv0        ;

uniform sampler2D diffuseTex ;
void main(void){
	vec4 color = texture2D( diffuseTex , varying_uv0 );
	if( 0.3 > color.w ){
		 discard ;
	}

	vec4 bitShift = vec4( 1.0, 256.0  ,256.0*256.0 , 256.0*256.0*256.0 ) ;
    vec4 bitMask = vec4(1.0/256.0,1.0/256.0,1.0/256.0,0.0) ;
	
	vec3 glFragCoord  = (varying_globalpos.xyz / varying_globalpos.w) / 2.0 + vec3( 0.5,0.5,0.5 ) ;
    vec4 diffuse = fract(glFragCoord.z * bitShift);
    diffuse -= diffuse.gbaa * bitMask ;
}
 