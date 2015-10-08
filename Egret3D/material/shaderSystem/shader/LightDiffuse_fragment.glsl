
struct MaterialSource{
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    vec3 emission;
    float shininess;
};

struct LightModelSource{
    vec4 ambient;
};

struct LightSource{
    int lightType;//0 dir 1 point 2 sport
    vec3 position;
    float spotExponent;
    vec3 spotDirection;
    float spotCutoff; // (range: [0.0,90.0], 180.0)
    vec3 halfVector;
    float spotCosCutoff; // (range: [1.0,a0.0],-1.0)
    vec3 ambient;
    float constantAttenuation;
    vec3 diffuse;
    float linearAttenuation;
    vec3 specular;
    float quadraticAttenuation;
};

const int maxLight = 1 ;
uniform vec4 uniform_lightModelSource ;
uniform float uniform_LightSource[200];

void main() {
        vec3 normal, lightDir , finalColor ;
        vec4 diffuse, ambient, globalAmbient ;
        float NdotL;
        finalColor = vec3(0.0,0.0,0.0);
        normal = normalize(varying_eyeNormal);

        MaterialSource frontMaterial = MaterialSource( uniform_materialSource[0] , uniform_materialSource[1] , uniform_materialSource[2] , uniform_materialSource[3].xyz , uniform_materialSource[3].w  ) ;
        LightModelSource lightModel = LightModelSource( uniform_lightModelSource );

        for(int i = 0 ; i < maxLight ; i++){
                    LightSource light = LightSource(
                        int(uniform_LightSource[i*25]),
                        vec3(uniform_LightSource[i*25+1],uniform_LightSource[i*25+2],uniform_LightSource[i*25+3]),
                         uniform_LightSource[i*25+4],
                         vec3( uniform_LightSource[i*25+5],uniform_LightSource[i*25+6],uniform_LightSource[i*25+7]),
                         uniform_LightSource[i*25+8],
                         vec3( uniform_LightSource[i*25+9],uniform_LightSource[i*25+10],uniform_LightSource[i*25+11]),
                         uniform_LightSource[i*25+12],
                         vec3( uniform_LightSource[i*25+13],uniform_LightSource[i*25+14],uniform_LightSource[i*25+15]),
                         uniform_LightSource[i*25+16],
                         vec3( uniform_LightSource[i*25+17],uniform_LightSource[i*25+18],uniform_LightSource[i*25+19]),
                         uniform_LightSource[i*25+20],
                         vec3( uniform_LightSource[i*25+21],uniform_LightSource[i*25+22],uniform_LightSource[i*25+23]),
                         uniform_LightSource[i*25+24]
                    );

                     ambient = vec4( frontMaterial.ambient.xyz * light.ambient , frontMaterial.ambient.w );
                     diffuse = vec4( frontMaterial.diffuse.xyz * light.diffuse , frontMaterial.diffuse.w );
                     globalAmbient = lightModel.ambient ;// frontMaterial.ambient ;//*
                    //directlight
                    if( light.lightType == 0 ){

                        lightDir = normalize(light.spotDirection);
                        NdotL = max(dot(normal, lightDir), 0.0);
                        //* Compute the ambient and globalAmbient terms */
                        finalColor += NdotL * diffuse.xyz + globalAmbient.xyz + ambient.xyz ;//globalAmbient.xyz * 0.3 + (1.0-NdotL) * globalAmbient.xyz * 0.5 + ambient.xyz
                    }

                    //point light
                    if( light.lightType == 1 ){
                           vec3 halfV,viewV,ldir;
                           float NdotL,NdotHV,dist,att;
                           vec3 color = globalAmbient.xyz ;

                          ldir = normalize( light.position.xyz - varying_pos.xyz );
                          dist = length(ldir);
                           //* a fragment shader can't write a varying variable, hence we need
                           //a new variable to store the normalized interpolated normal */
                           //* compute the dot product between normal and normalized lightdir */
                          NdotL = max(dot(normal,ldir),0.0);
                       //if (NdotL > 0.0)
                       //{
                          att = 1.0/(light.constantAttenuation + light.linearAttenuation * dist + light.quadraticAttenuation * dist * dist);
                          color += att * (diffuse.xyz * NdotL );//+ ambient.xyz);
                          halfV = normalize(normal - ldir) ;
                          halfV = normalize(light.halfVector.xyz);//
                          NdotHV = max(dot(normal,halfV),0.0);
                          color += att * frontMaterial.specular.xyz * light.specular.xyz *  pow(NdotL,frontMaterial.shininess);
                          finalColor += color ;
                      // }

                    }

                    //spot light
                    if( light.lightType == 2 ){
                        vec3 halfV,viewV,ldir;
                        float NdotL,NdotHV,dist,att,spotEffect;
                        vec3 color = globalAmbient.xyz ;

                        ldir = normalize( light.position.xyz - varying_pos.xyz );
                        NdotL = max(dot(normal,ldir),0.0);

                        spotEffect = dot(normalize(light.spotDirection), normalize(ldir));
                        if (spotEffect > light.spotCosCutoff )
                        {
                            spotEffect = pow(spotEffect, light.spotExponent);
                            att = spotEffect / (light.constantAttenuation +
                                    light.linearAttenuation * dist +
                                    light.quadraticAttenuation * dist * dist);

                            color += att * (diffuse.xyz * NdotL + ambient.xyz);

                           halfV = normalize(light.halfVector.xyz);
                           NdotHV = max(dot(normal,halfV),0.0);
                           color += att * frontMaterial.specular.xyz * light.specular.xyz * pow(NdotHV,frontMaterial.shininess);

                        }
                         finalColor += color ;
                    }
        }

        lightColor =  vec4(finalColor.xyz,1.0) ;
}