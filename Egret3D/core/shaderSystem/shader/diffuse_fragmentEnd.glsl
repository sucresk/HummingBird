void main() {
	
	specular.xyz = specular.w * (specular.xyz * materialSource.specular);
	diffuse.w = varying_color.w * materialSource.alpha * diffuse.w ;
	diffuse.xyz = diffuse.xyz * materialSource.diffusePower ;

	diffuse.xyz = diffuse.xyz * varying_color.xyz ;
	diffuse.xyz *= shadow.xyz ;
	diffuse.xyz = ttt.xyz * varying_color.xyz * diffuse.xyz;
	//light.xyz = light.xyz  ;
	light.xyz = light.xyz + materialSource.ambient.xyz * materialSource.ambientPower ;
	diffuse.xyz = light.xyz * diffuse.xyz ;
	light.xyz = specular.xyz * materialSource.specularPower ;
	diffuse.xyz = diffuse.xyz + light.xyz ;
	diffuse.xyz = diffuse.xyz / diffuse.w;
}


