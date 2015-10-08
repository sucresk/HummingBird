uniform vec4 uniform_directLightSource[8] ;
const int max_directLight = 4 ;

struct DirectLight{
    vec4 diffuseColor;
    vec3 dir;
    float intensity;
};

void main() {
    for( int i = 0 ; i < max_directLight ; i++ ) {
            DirectLight l = DirectLight( uniform_directLightSource[i*2].xyzw , uniform_directLightSource[i*2+1].xyz , uniform_directLightSource[i*2+1].w ) ;
            vec3 N = normalize(varying_normal);
            vec3 L = l.dir ;
            float lambertTerm = max(0.0,dot(N,L)) ;
            //lightColor.xyz +=  vec3( l.intensity,l.intensity,l.intensity) ;
            lightColor.xyz += lambertTerm * l.intensity ;
    }
}
