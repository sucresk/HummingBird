varying vec4 shadowPosition ;
uniform sampler2D shadowMapTex ;
uniform vec4 shadowParameter  ;
float unpack(sampler2D ShadowMapS, vec2 texcood)
{
   vec4 vec = texture2D(ShadowMapS, texcood);
   vec4 bitShifts = vec4(1.0/(256.0*256.0), 1.0/256.0, 1.0, 1.0/(256.0*256.0*256.0));
   return dot(vec,bitShifts)  ;
}

void main(void){
	vec3 shadowMapPosition = shadowPosition.xyz / shadowPosition.w;  
    shadowMapPosition = shadowMapPosition.xyz * 0.5 + 0.5 ;  

	float depth = unpack(shadowMapTex,shadowMapPosition.xy);

	//if(shadowCoord.x>=1.0||shadowCoord.y>=1.0||shadowCoord.x<=0.0||shadowCoord.y<=0.0)
	//	depth = 0.0 ;

	if( depth < (shadowMapPosition.z - shadowParameter.w ) )
		shadow.xyz = shadowParameter.xyz ; 
}
