void main() {
	
	specular.xyz = specular.w * (specular.xyz * materialSource.specular);
	//diffuse.w = varying_color.w * materialSource.alpha * diffuse.w ;
	//diffuse.xyz = diffuse.xyz * materialSource.diffusePower ;
	////ambientColor.xyz = materialSource.ambient.xyz * materialSource.ambientPower ;
	//
	//diffuse.xyz = diffuse.xyz * varying_color.xyz ;
	////diffuse.xyz = ttt.xyz * diffuse.xyz;
	////light.xyz += ambientColor.xyz ;
	//diffuse.xyz = light.xyz * diffuse.xyz + specular.xyz * materialSource.specularPower;
	////diffuse.xyz *= (shadow.xyz ) ;
	//diffuse.xyz = diffuse.xyz ;
	//diffuse.xyz = diffuse.xyz / diffuse.w;

    ttt.xyz = materialSource.ambient.xyz * materialSource.ambientPower;
	light.xyz = light.xyz + ttt.xyz;
	specular.xyz = specular.w * (specular.xyz * materialSource.specular * materialSource.specularPower);
	diffuse.w = varying_color.w * materialSource.alpha * diffuse.w ;
	diffuse.xyz = diffuse.xyz * materialSource.diffusePower ;
	
	diffuse.xyz = ( (light.xyz+specular.xyz) * shadow.xyz + ttt.xyz ) * diffuse.xyz  ;
	diffuse.xyz = diffuse.xyz / diffuse.w;
}


