varying vec4 varying_pos        ;
varying vec3 varying_normal     ;
varying vec2 varying_uv0        ;
varying vec3 varying_eyeNormal  ;
varying vec4 varying_color  ;

uniform vec4 uniform_materialSource[4] ;
vec4 lightColor  ;
vec4 diffuseColor  ;
void main(void){
   lightColor = vec4( 0.0,0.0,0.0,1.0);
   diffuseColor = vec4( 1.0,1.0,1.0,1.0);

   // this can move to last
   gl_FragColor = diffuseColor * lightColor ;//uniform_materialSource[0].xyzw + diffuseColor * uniform_materialSource[1] * varying_color * lightColor ;
}
