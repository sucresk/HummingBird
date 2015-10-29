varying vec4 shadowPosition ;
uniform sampler2D shadowMapTex ;
float unpackDepth(vec4 rgbaDepth){
	vec4 bitShift = vec4( 1.0 , 1.0/256.0 , 1.0/(256.0*256.0) , 1.0/(256.0*256.0*256.0) );
	float depth = dot(rgbaDepth,bitShift);
	return depth ;
}

void main(void){
	vec3 shadowCoord = (shadowPosition.xyz/shadowPosition.w) / 2.0 + vec3( 0.5,0.5,0.5 ) ; 
	vec4 shadowMap = texture2D( shadowMapTex , shadowCoord.xy ) ;
	float depth = unpackDepth(shadowMap);

	if(shadowCoord.x>=1.0||shadowCoord.y>=1.0||shadowCoord.x<=0.0||shadowCoord.y<=0.0)
		depth = 0.0 ;

	depth = (( shadowCoord.z > (depth +0.00195) ) ? 1.0:0.1) ;//* shadowMap.w ;
	shadow = vec4(depth,depth,depth,1.0) ;
}
