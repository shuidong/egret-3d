module egret3d {
	/**
	* @private
	*/
	export class ShaderLib {
		static lib: { [key:string]: string } = 
		{
 			"alphaMask_fs":
			"uniform sampler2D maskTexture ; \n" +
			"void main(void){ \n" +
			"float maskAlpha = texture2D( maskTexture , uv_0 ).x; \n" +
			"if(maskAlpha * diffuseColor.w < 0.001){ \n" +
			"discard; \n" +
			"} \n" +
			"materialSource.alpha *= maskAlpha; \n" +
			"} \n",

			"AOMap_fs":
			"uniform sampler2D aoTexture ; \n" +
			"uniform float aoPower ; \n" +
			"void main(void){ \n" +
			"float ao = texture2D( aoTexture , varying_uv1 ).x ; \n" +
			"diffuseColor.xyz *= (ao * aoPower) ; \n" +
			"} \n",

			"baseShadowPass_fs":
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_ViewPose; \n" +
			"varying vec4 varying_color; \n" +
			"vec4 outColor ; \n" +
			"vec2 uv_0; \n" +
			"void main() { \n" +
			"uv_0 = varying_uv0; \n" +
			"} \n",

			"baseShadowPass_vs":
			"attribute vec3 attribute_position; \n" +
			"attribute vec2 attribute_uv0; \n" +
			"attribute vec4 attribute_color; \n" +
			"uniform mat4 uniform_ModelViewMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"varying vec4 varying_ViewPose; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_color; \n" +
			"vec3 e_position = vec3(0.0, 0.0, 0.0); \n" +
			"vec4 outPosition ; \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"varying_color = attribute_color; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"base_fs":
			"#extension GL_OES_standard_derivatives : enable \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_ViewPose; \n" +
			"varying vec4 varying_color; \n" +
			"varying vec3 varying_ViewDir ; \n" +
			"uniform mat4 uniform_ViewMatrix ; \n" +
			"vec4 outColor ; \n" +
			"vec4 diffuseColor ; \n" +
			"vec4 specularColor ; \n" +
			"vec4 ambientColor; \n" +
			"vec4 light ; \n" +
			"vec3 normal; \n" +
			"vec2 uv_0; \n" +
			"vec3 flatNormals(vec3 pos) { \n" +
			"vec3 fdx = dFdx(pos); \n" +
			"vec3 fdy = dFdy(pos); \n" +
			"return normalize(cross(fdx, fdy)); \n" +
			"} \n" +
			"void main() { \n" +
			"diffuseColor  = vec4(1.0,1.0,1.0,1.0); \n" +
			"specularColor = vec4(0.0,0.0,0.0,0.0); \n" +
			"ambientColor  = vec4(0.0,0.0,0.0,0.0); \n" +
			"light         = vec4(0.0,0.0,0.0,0.0); \n" +
			"normal = normalize(varying_eyeNormal) ; \n" +
			"uv_0 = varying_uv0; \n" +
			"} \n",

			"base_vs":
			"attribute vec3 attribute_position; \n" +
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"attribute vec2 attribute_uv0; \n" +
			"vec3 e_position = vec3(0.0, 0.0, 0.0); \n" +
			"uniform mat4 uniform_ModelViewMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"uniform vec3 uniform_eyepos ; \n" +
			"varying vec4 varying_ViewPose; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_color; \n" +
			"varying vec3 varying_ViewDir ; \n" +
			"vec4 outPosition ; \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"varying_color = attribute_color; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"bezier":
			"vec2 quadratic_bezier(vec2 A, vec2 B, vec2 C, float t) \n" +
			"{ \n" +
			"vec2 D = mix(A, B, t); \n" +
			"vec2 E = mix(B, C, t); \n" +
			"return mix(D, E, t); \n" +
			"} \n" +
			"vec2 cubic_bezier(vec2 A, vec2 B, vec2 C, vec2 D, float t) \n" +
			"{ \n" +
			"vec2 E = mix(A, B, t); \n" +
			"vec2 F = mix(B, C, t); \n" +
			"vec2 G = mix(C, D, t); \n" +
			"return quadratic_bezier(E, F, G, t); \n" +
			"} \n",

			"colorGradients_fs":
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_colorGradientsSource[10] ; \n" +
			"void main(void){ \n" +
			"vec3 posStart = vec3(uniform_colorGradientsSource[0], uniform_colorGradientsSource[1], uniform_colorGradientsSource[2]); \n" +
			"vec3 posEnd = vec3(uniform_colorGradientsSource[3], uniform_colorGradientsSource[4], uniform_colorGradientsSource[5]); \n" +
			"vec4 color = vec4(uniform_colorGradientsSource[6], uniform_colorGradientsSource[7], uniform_colorGradientsSource[8], uniform_colorGradientsSource[9]); \n" +
			"color.w = color.w * clamp((varying_pos.y - posStart.y) / (posEnd.y - posStart.y), 0.0, 1.0); \n" +
			"diffuseColor.xyz = clamp(diffuseColor.xyz / diffuseColor.w,0.0,1.0); \n" +
			"diffuseColor.xyz = diffuseColor.xyz * (1.0 - color.w) + color.xyz * color.w; \n" +
			"} \n" +
			"  \n",

			"colorTransform_fs":
			"uniform vec4 uniform_colorTransformVec4 ; \n" +
			"uniform mat4 uniform_colorTransformM44 ; \n" +
			"void main(){ \n" +
			"diffuseColor = uniform_colorTransformM44 * diffuseColor; \n" +
			"diffuseColor = diffuseColor + uniform_colorTransformVec4; \n" +
			"} \n",

			"cube_fragment":
			"uniform samplerCube diffuseTexture ; \n" +
			"varying vec3 varying_pos; \n" +
			"void main(void){ \n" +
			"vec3 uvw = normalize(varying_pos.xyz); \n" +
			"vec4 ref = vec4(textureCube(diffuseTexture, uvw.xyz)); \n" +
			"gl_FragColor = ref ; \n" +
			"} \n",

			"cube_vertex":
			"attribute vec3 attribute_position; \n" +
			"uniform mat4 uniform_ModelMatrix ; \n" +
			"uniform mat4 uniform_ViewProjectionMatrix ; \n" +
			"uniform mat4 uniform_NormalMatrix ; \n" +
			"varying vec3 varying_pos; \n" +
			"void main(void){ \n" +
			"varying_pos =  attribute_position; \n" +
			"gl_Position = uniform_ViewProjectionMatrix * uniform_ModelMatrix * vec4(attribute_position, 1.0) ; \n" +
			"} \n",

			"detail_Bending_vs":
			"uniform float uniformTime[4] ; \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"varying_color = attribute_color; \n" +
			"vec4 curve = SmoothTriangleWave(vec4(sin(uniformTime[0]*0.001),1.0,1.0,1.0)); \n" +
			"e_position.xyz += curve.x * vec3(1.0,0.5,0.0) * ( attribute_color.xyz) ; \n" +
			"} \n",

			"diffuseShadowPass_fs":
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"diffuseColor = varying_color ; \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"if( diffuseColor.w <= 0.3 ){ \n" +
			"discard; \n" +
			"} \n" +
			"} \n",

			"diffuse_fragment":
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"if( diffuseColor.w <= materialSource.cutAlpha ){ \n" +
			"discard; \n" +
			"}else \n" +
			"diffuseColor.xyz *= diffuseColor.w ; \n" +
			"} \n",

			"diffuse_vertex":
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"varying vec3 varying_ViewDir ; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"void main(void){ \n" +
			"mat3 normalMatrix = mat3(uniform_NormalMatrix); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -attribute_normal); \n" +
			"varying_ViewPose = vec4(normalMatrix*e_position, 1.0) ; \n" +
			"varying_ViewDir = normalize(normalMatrix * (uniform_eyepos.xyz - e_position)) ; \n" +
			"outPosition = uniform_ModelViewMatrix * vec4(e_position, 1.0) ; \n" +
			"varying_color = attribute_color; \n" +
			"} \n",

			"directLight_fragment":
			"const int max_directLight = 0 ; \n" +
			"uniform float uniform_directLightSource[11*max_directLight] ; \n" +
			"varying vec3 varying_ViewDir; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"struct DirectLight{ \n" +
			"vec3 direction; \n" +
			"vec3 diffuse; \n" +
			"vec3 ambient; \n" +
			"float intensity; \n" +
			"float halfIntensity; \n" +
			"}; \n" +
			"void calculateDirectLight( MaterialSource materialSource ){ \n" +
			"float lambertTerm , specular ; \n" +
			"vec3 N = normal; \n" +
			"for(int i = 0 ; i < max_directLight ; i++){ \n" +
			"DirectLight directLight ; \n" +
			"directLight.direction = vec3(uniform_directLightSource[i*11+0],uniform_directLightSource[i*11+1],uniform_directLightSource[i*11+2]); \n" +
			"directLight.diffuse = vec3(uniform_directLightSource[i*11+3],uniform_directLightSource[i*11+4],uniform_directLightSource[i*11+5]); \n" +
			"directLight.ambient = vec3(uniform_directLightSource[i*11+6],uniform_directLightSource[i*11+7],uniform_directLightSource[i*11+8]); \n" +
			"directLight.intensity = uniform_directLightSource[i*11+9]; \n" +
			"directLight.halfIntensity = uniform_directLightSource[i*11+10]; \n" +
			"ambientColor.xyz += directLight.ambient.xyz * directLight.diffuse ; \n" +
			"vec3 lightDir = normalize(mat3(uniform_NormalMatrix) * directLight.direction); \n" +
			"lambertTerm = max(dot(-lightDir,N), 0.0); \n" +
			"light.xyz += directLight.diffuse * lambertTerm * directLight.intensity ; \n" +
			"if( lambertTerm> 0.0){ \n" +
			"vec3 H = normalize( normalize(lightDir) + varying_ViewDir ); \n" +
			"float NdotH = dot( normal, -H ); \n" +
			"float lambertTerm = pow( clamp( NdotH ,0.0,1.0),materialSource.shininess ); \n" +
			"specularColor.xyz += directLight.diffuse * materialSource.specular * lambertTerm; \n" +
			"} \n" +
			"} \n" +
			"} \n" +
			"void main() { \n" +
			"calculateDirectLight( materialSource ); \n" +
			"} \n",

			"endShadowPass_fs":
			"void main() { \n" +
			"if(varying_color.w<=0.0){ \n" +
			"discard; \n" +
			"} \n" +
			"outColor.x =  outColor.y = outColor.z = varying_ViewPose.z/varying_ViewPose.w  ; \n" +
			"outColor.w = 1.0 ; \n" +
			"gl_FragColor = outColor ; \n" +
			"} \n",

			"endShadowPass_vs":
			"void main() { \n" +
			"outPosition = uniform_ProjectionMatrix * outPosition ; \n" +
			"varying_ViewPose = outPosition ; \n" +
			"gl_Position = outPosition ; \n" +
			"} \n" +
			"                       \n",

			"end_fs":
			"vec4 diffuseColor ; \n" +
			"vec4 specularColor ; \n" +
			"vec4 ambientColor; \n" +
			"vec4 light ; \n" +
			"void main() { \n" +
			"diffuseColor.xyz = materialSource.diffuse.xyz * diffuseColor.xyz ; \n" +
			"outColor.xyz = (ambientColor.xyz + materialSource.ambient.xyz + light.xyz) * diffuseColor.xyz + specularColor.xyz * materialSource.specularScale; \n" +
			"outColor.w = materialSource.alpha * diffuseColor.w ; \n" +
			"gl_FragColor = outColor * varying_color; \n" +
			"} \n",

			"end_vs":
			"vec4 endPosition ; \n" +
			"uniform float uniform_materialSource[20]; \n" +
			"void main() { \n" +
			"gl_PointSize = 50.0; \n" +
			"gl_PointSize = uniform_materialSource[18]; \n" +
			"gl_Position = uniform_ProjectionMatrix * outPosition ; \n" +
			"} \n" +
			"                       \n",

			"expFog_fs":
			"struct Fog{ \n" +
			"vec3 fogColor  ; \n" +
			"float globalDensity ; \n" +
			"vec3 distance ; \n" +
			"}; \n" +
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_globalFog[7]; \n" +
			"void main(void){ \n" +
			"Fog fog; \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3]; \n" +
			"fog.distance = vec2(uniform_globalFog[4], uniform_globalFog[5]); \n" +
			"float d = distance(uniform_eyepos,varying_pos.xyz); \n" +
			"float distFog = max( 0.0 , d - fog.distance.x )* fog.distance.y; \n" +
			"float fogFactor = (1.0-exp( -distFog * 0.000001 * fog.globalDensity )) ; \n" +
			"diffuseColor.xyz = mix( diffuseColor.xyz  , fog.fogColor , min(fogFactor,1.0) ); \n" +
			"} \n" +
			"  \n",

			"expHeightFog_fs":
			"struct Fog{ \n" +
			"vec3 fogColor  ; \n" +
			"float globalDensity ; \n" +
			"float fogStartDistance ; \n" +
			"float fogHeightStart ; \n" +
			"float fogAlpha ; \n" +
			"}; \n" +
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_globalFog[7]; \n" +
			"vec3 applyFog( float yDistance, vec3  vpos , Fog fog ) \n" +
			"{ \n" +
			"float d = distance(uniform_eyepos,varying_pos.xyz); \n" +
			"float distFog = max( 0.0 , d - fog.fogStartDistance ) ; \n" +
			"float yFog = max(0.0, (vpos.y - fog.fogHeightStart - yDistance) )  ; \n" +
			"float fogAmount =  1.0-(exp(-distFog * fog.globalDensity )) + (exp(-yFog * fog.globalDensity )); \n" +
			"return mix( diffuseColor.xyz,fog.fogColor, clamp(fogAmount,0.0,fog.fogAlpha) ); \n" +
			"} \n" +
			"void main(void){ \n" +
			"Fog fog; \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3]; \n" +
			"fog.fogStartDistance = uniform_globalFog[4] ; \n" +
			"fog.fogHeightStart = uniform_globalFog[5] ; \n" +
			"fog.fogAlpha = uniform_globalFog[6] ; \n" +
			"float yd = uniform_eyepos.y - varying_pos.y ; \n" +
			"diffuseColor.xyz = applyFog( yd , varying_pos.xyz , fog ); \n" +
			"} \n" +
			"  \n",

			"flatNormal_fs":
			"#extension GL_OES_standard_derivatives : enable \n" +
			"vec3 flatNormal(vec3 pos){ \n" +
			"vec3 fdx = dFdx(pos); \n" +
			"vec3 fdy = dFdy(pos); \n" +
			"return normalize(cross(fdx, fdy)); \n" +
			"} \n",

			"gamma_fs":
			"const float gamma = 2.2; \n" +
			"float toLinear_float_v1(float v) { \n" +
			"return pow(v, gamma); \n" +
			"} \n" +
			"vec2 toLinear_vec2_v1(vec2 v) { \n" +
			"return pow(v, vec2(gamma)); \n" +
			"} \n" +
			"vec3 toLinear_vec3_v1(vec3 v) { \n" +
			"return pow(v, vec3(gamma)); \n" +
			"} \n" +
			"vec4 toLinear_vec4_v1(vec4 v) { \n" +
			"return vec4(toLinear_vec3_v1(v.rgb), v.a); \n" +
			"} \n" +
			"float toGamma_float_v2(float v) { \n" +
			"return pow(v, 1.0 / gamma); \n" +
			"} \n" +
			"vec2 toGamma_vec2_v2(vec2 v) { \n" +
			"return pow(v, vec2(1.0 / gamma)); \n" +
			"} \n" +
			"vec3 toGamma_vec3_v2(vec3 v) { \n" +
			"return pow(v, vec3(1.0 / gamma)); \n" +
			"} \n" +
			"vec4 toGamma_vec4_v2(vec4 v) { \n" +
			"return vec4(toGamma_vec3_v2(v.rgb), v.a); \n" +
			"} \n" +
			"vec4 textureLinear(sampler2D uTex, vec2 uv) { \n" +
			"return toLinear_vec4_v1(texture2D(uTex, uv)); \n" +
			"} \n",

			"hud_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"void main(void) { \n" +
			"vec4 color = texture2D(diffuseTexture, varying_uv0); \n" +
			"gl_FragColor  = color; \n" +
			"} \n",

			"hud_vs":
			"attribute vec3 attribute_position; \n" +
			"attribute vec2 attribute_uv0; \n" +
			"varying  vec2 varying_uv0; \n" +
			"uniform  mat4 uniform_ViewProjectionMatrix; \n" +
			"void main(void) { \n" +
			"vec4 pos = vec4(attribute_position, 1.0); \n" +
			"gl_Position = uniform_ViewProjectionMatrix * pos; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"lightingBase_fs":
			"",

			"lightMapSpecularPower_fs":
			"uniform sampler2D lightTexture ; \n" +
			"varying vec2 varying_uv1 ; \n" +
			"void main(void){ \n" +
			"vec3 lightmap = texture2D( lightTexture , varying_uv1 ).xyz * 1.5; \n" +
			"diffuseColor.xyz *= lightmap ; \n" +
			"specularColor.xyz *= lightmap; \n" +
			"} \n",

			"lightMap_fs":
			"uniform sampler2D lightTexture ; \n" +
			"varying vec2 varying_uv1 ; \n" +
			"void main(void){ \n" +
			"vec3 lightmap = texture2D( lightTexture , varying_uv1 ).xyz * 1.5; \n" +
			"diffuseColor.xyz *= lightmap ; \n" +
			"} \n",

			"lineFog":
			"struct Fog{ \n" +
			"vec3 fogColor  ; \n" +
			"float globalDensity ; \n" +
			"vec3 distance ; \n" +
			"}; \n" +
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_globalFog[7]; \n" +
			"void main(void){ \n" +
			"Fog fog; \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3]; \n" +
			"fog.distance = vec2(uniform_globalFog[4], uniform_globalFog[5]); \n" +
			"float dist = abs( varying_ViewPose.z ); \n" +
			"float fogFactor = ( fog.distance.y - dist) / (fog.distance.y - fog.distance.x); \n" +
			"fogFactor = clamp( fogFactor, 0.0, 1.0 ); \n" +
			"diffuseColor.xyz = mix( fog.fogColor, diffuseColor.xyz, fogFactor ); \n" +
			"} \n",

			"matCapPass_vs":
			"varying vec2 capCoord ; \n" +
			"void main(void){ \n" +
			"capCoord.x = dot(normalMatrix[0].xyz,normal); \n" +
			"capCoord.y = dot(normalMatrix[1].xyz,normal); \n" +
			"capCoord = capCoord * 0.5 + 0.5; \n" +
			"ambientColor.xyz +=  + capCoord.xyz * 2.0 - 1.0 ; \n" +
			"} \n",

			"matCap_TextureAdd_fs":
			"uniform sampler2D matcapTexture; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"void main() { \n" +
			"vec4 capCoord ; \n" +
			"capCoord.x = -normal.x; \n" +
			"capCoord.y = normal.y; \n" +
			"capCoord.xy = capCoord.xy * 0.5 + 0.5; \n" +
			"capCoord = texture2D(matcapTexture , capCoord.xy ) * 2.0 - 1.0 ; \n" +
			"ambientColor.xyz += capCoord.xyz ; \n" +
			"} \n",

			"matCap_TextureMult_fs":
			"uniform sampler2D matcapTexture; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"void main() { \n" +
			"vec4 capCoord ; \n" +
			"capCoord.x = -normal.x; \n" +
			"capCoord.y = normal.y; \n" +
			"capCoord.xy = capCoord.xy * 0.5 + 0.5; \n" +
			"capCoord = texture2D(matcapTexture , capCoord.xy ) ; \n" +
			"diffuseColor.xyz *= capCoord.xyz * 2.0 ; \n" +
			"} \n",

			"materialSource_fs":
			"struct MaterialSource{ \n" +
			"vec3 diffuse; \n" +
			"vec3 ambient; \n" +
			"vec3 specular; \n" +
			"float alpha; \n" +
			"float cutAlpha; \n" +
			"float shininess; \n" +
			"float roughness; \n" +
			"float albedo; \n" +
			"vec4 uvRectangle; \n" +
			"float specularScale; \n" +
			"float normalScale; \n" +
			"}; \n" +
			"uniform float uniform_materialSource[20] ; \n" +
			"MaterialSource materialSource ; \n" +
			"void main(){ \n" +
			"materialSource.diffuse.x = uniform_materialSource[0]; \n" +
			"materialSource.diffuse.y = uniform_materialSource[1]; \n" +
			"materialSource.diffuse.z = uniform_materialSource[2]; \n" +
			"materialSource.ambient.x = uniform_materialSource[3]; \n" +
			"materialSource.ambient.y = uniform_materialSource[4]; \n" +
			"materialSource.ambient.z = uniform_materialSource[5]; \n" +
			"materialSource.specular.x = uniform_materialSource[6]; \n" +
			"materialSource.specular.y = uniform_materialSource[7]; \n" +
			"materialSource.specular.z = uniform_materialSource[8]; \n" +
			"materialSource.alpha = uniform_materialSource[9]; \n" +
			"materialSource.cutAlpha = uniform_materialSource[10]; \n" +
			"materialSource.shininess = uniform_materialSource[11]; \n" +
			"materialSource.specularScale = uniform_materialSource[12]; \n" +
			"materialSource.albedo = uniform_materialSource[13]; \n" +
			"materialSource.uvRectangle.x = uniform_materialSource[14]; \n" +
			"materialSource.uvRectangle.y = uniform_materialSource[15]; \n" +
			"materialSource.uvRectangle.z = uniform_materialSource[16]; \n" +
			"materialSource.uvRectangle.w = uniform_materialSource[17]; \n" +
			"materialSource.normalScale = uniform_materialSource[19]; \n" +
			"uv_0 = varying_uv0.xy * materialSource.uvRectangle.zw + materialSource.uvRectangle.xy ; \n" +
			"} \n",

			"normalMap_fragment":
			"uniform sampler2D normalTexture; \n" +
			"varying vec2 varying_uv0        ; \n" +
			"mat3 TBN ; \n" +
			"mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) { \n" +
			"vec3 dp1 = dFdx(p); \n" +
			"vec3 dp2 = dFdy(p); \n" +
			"vec2 duv1 = dFdx(uv); \n" +
			"vec2 duv2 = dFdy(uv); \n" +
			"vec3 dp2perp = cross(dp2, N); \n" +
			"vec3 dp1perp = cross(N, dp1); \n" +
			"vec3 T = dp2perp * duv1.x + dp1perp * duv2.x; \n" +
			"vec3 B = dp2perp * duv1.y + dp1perp * duv2.y; \n" +
			"float invmax = 1.0 / sqrt(max(dot(T,T), dot(B,B))); \n" +
			"return mat3(T * invmax, B * invmax, N); \n" +
			"} \n" +
			"vec3 tbn(vec3 map, vec3 N, vec3 V, vec2 texcoord) { \n" +
			"mat3 TBN = cotangentFrame(N, -V, texcoord); \n" +
			"return normalize(TBN * map); \n" +
			"} \n" +
			"void main(){ \n" +
			"vec3 normalTex = texture2D(normalTexture,uv_0).xyz *2.0 - 1.0; \n" +
			"normalTex.y *= -1.0; \n" +
			"normal.xyz = tbn( normalTex.xyz , normal.xyz , normalize(varying_ViewPose.xyz) , uv_0 ) ; \n" +
			"} \n",

			"particle_accelerationSpeed":
			"attribute vec3 attribute_accelerationSpeed ; \n" +
			"float particle(   ParticleData emit ){ \n" +
			"globalPosition.xyz += currentTime * currentTime * attribute_accelerationSpeed  ; \n" +
			"} \n",

			"particle_color_fs":
			"uniform float uniform_colorTransform[16] ; \n" +
			"vec4 pack_depth(float depth) \n" +
			"{ \n" +
			"vec4 res ; \n" +
			"float res1 = depth/256.0; \n" +
			"res.z = fract( res1 ); \n" +
			"res1 -= res.z; \n" +
			"res1 = res1/256.0; \n" +
			"res.y = fract( res1 ); \n" +
			"res1 -= res.y; \n" +
			"res1 = res1/256.0; \n" +
			"res.x = fract( res1 ); \n" +
			"res1 -= res.x; \n" +
			"res1 = res1/256.0; \n" +
			"res.w = res1; \n" +
			"return res; \n" +
			"} \n" +
			"void main() { \n" +
			"float startColor ; \n" +
			"float startSegment ; \n" +
			"float nextColor ; \n" +
			"float nextSegment ; \n" +
			"float w = pt.w/pt.y; \n" +
			"for( int i = 1 ; i < 8 ; i++ ){ \n" +
			"if( w >= uniform_colorTransform[i+8-1] ){ \n" +
			"startColor = uniform_colorTransform[i-1] ; \n" +
			"startSegment = uniform_colorTransform[i+8-1] ; \n" +
			"nextColor = uniform_colorTransform[i]; \n" +
			"nextSegment = uniform_colorTransform[i+8] ; \n" +
			"}else{ \n" +
			"break; \n" +
			"} \n" +
			"} \n" +
			"float len = nextSegment - startSegment ; \n" +
			"float ws = ( w - startSegment ) / len ; \n" +
			"vec4 color = mix(pack_depth(startColor),pack_depth(nextColor),ws) ; \n" +
			"diffuseColor.xyzw *= color.xyzw ; \n" +
			"} \n",

			"particle_color_vs":
			"float particle(  ParticleData emit ){ \n" +
			"} \n",

			"particle_end":
			"float particle( ParticleData emit ){ \n" +
			"return 1.0 ; \n" +
			"} \n" +
			"void main(void) { \n" +
			"outPosition.xyz = localPosition.xyz  ; \n" +
			"outPosition = billboardMatrix * outPosition; \n" +
			"outPosition.xyz += globalPosition.xyz; \n" +
			"outPosition = modeViewMatrix * outPosition; \n" +
			"gl_Position = uniform_ProjectionMatrix * outPosition ; \n" +
			"} \n" +
			"	 \n",

			"particle_follow_vs":
			"attribute vec3 attribute_followPosition ; \n" +
			"float particle(  ParticleData emit ){ \n" +
			"globalPosition.xyz += attribute_followPosition.xyz; \n" +
			"} \n" +
			"	 \n",

			"particle_Rotation":
			"attribute float attribute_Rotation ; \n" +
			"float particle(  ParticleData emit ){ \n" +
			"float rot = currentTime * attribute_Rotation  * (3.1415926 / 180.0); \n" +
			"localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition; \n" +
			"} \n",

			"particle_size_vs":
			"uniform vec2 uniform_size[32] ; \n" +
			"vec2 quadratic_bezier(vec2 A, vec2 B, vec2 C, float t) \n" +
			"{ \n" +
			"vec2 D = mix(A, B, t); \n" +
			"vec2 E = mix(B, C, t); \n" +
			"return mix(D, E, t); \n" +
			"} \n" +
			"vec2 cubic_bezier(vec2 A, vec2 B, vec2 C, vec2 D, float t) \n" +
			"{ \n" +
			"vec2 E = mix(A, B, t); \n" +
			"vec2 F = mix(B, C, t); \n" +
			"vec2 G = mix(C, D, t); \n" +
			"return quadratic_bezier(E, F, G, t); \n" +
			"} \n" +
			"void main() { \n" +
			"float w = currentTime/emit.life; \n" +
			"vec2 startA ; \n" +
			"vec2 startB ; \n" +
			"vec2 nextA ; \n" +
			"vec2 nextB ; \n" +
			"for( int i = 0 ; i < 8 ; i++ ){ \n" +
			"if( w >= uniform_size[i*4].x && w <= uniform_size[i*4+3].x ){ \n" +
			"startA = uniform_size[i*4] ; \n" +
			"startB = uniform_size[i*4+1] ; \n" +
			"nextA = uniform_size[i*4+2] ; \n" +
			"nextB = uniform_size[i*4+3] ; \n" +
			"break; \n" +
			"} \n" +
			"} \n" +
			"float len = nextB.x - startA.x ; \n" +
			"float ws = ( w - startA.x ) / len ; \n" +
			"vec2 p = cubic_bezier( startA , startB , nextA , nextB , ws); \n" +
			"localPosition.xyz *= p.y ; \n" +
			"} \n",

			"particle_time_fs":
			"varying vec4 particleTime; \n" +
			"void main(void) { \n" +
			"vec4 pt = particleTime ; \n" +
			"} \n",

			"particle_time_vs":
			"attribute vec4 attribute_time ; \n" +
			"uniform float uniform_time[5] ; \n" +
			"float currentTime = 0.0; \n" +
			"varying vec4 particleTime; \n" +
			"struct ParticleData{ \n" +
			"float bornTime; \n" +
			"float life; \n" +
			"float unitTotalLife; \n" +
			"float index; \n" +
			"}; \n" +
			"float particle( ParticleData emit ){ \n" +
			"float time = uniform_time[0] ; \n" +
			"float loop = uniform_time[1]; \n" +
			"if(time <= emit.bornTime){ \n" +
			"return currentTime = 0.0; \n" +
			"} \n" +
			"if(loop == 0.0 && time >= emit.unitTotalLife){ \n" +
			"return currentTime = 0.0; \n" +
			"} \n" +
			"currentTime = time - emit.bornTime; \n" +
			"currentTime = mod( currentTime, emit.life); \n" +
			"if( currentTime <= 0.0 ) \n" +
			"return currentTime = 0.0; \n" +
			"} \n" +
			"void e_discard(){ \n" +
			"varying_color.w = 0.0 ; \n" +
			"} \n" +
			"void main(void) { \n" +
			"ParticleData emit ; \n" +
			"emit.bornTime = attribute_time.x ; \n" +
			"emit.life = attribute_time.y ; \n" +
			"emit.unitTotalLife = attribute_time.z ; \n" +
			"emit.index = attribute_time.w ; \n" +
			"float active = particle( emit ) ; \n" +
			"particleTime.x = emit.index ; \n" +
			"particleTime.y = emit.life ; \n" +
			"particleTime.z = emit.unitTotalLife ; \n" +
			"particleTime.w = currentTime ; \n" +
			"if( active == 0.0 ){ \n" +
			"e_discard(); \n" +
			"}else{ \n" +
			"} \n" +
			"} \n",

			"particle_uniformSpeed":
			"attribute vec3 attribute_uniformSpeed ; \n" +
			"float particle(  ParticleData emit ){ \n" +
			"globalPosition.xyz += currentTime * attribute_uniformSpeed ; \n" +
			"} \n",

			"particle_vs":
			"attribute vec3 attribute_offsetPosition; \n" +
			"uniform mat4 uniform_cameraMatrix; \n" +
			"const float PI = 3.1415926 ; \n" +
			"float currentTime = 0.0; \n" +
			"float totalTime = 0.0; \n" +
			"vec4 localPosition; \n" +
			"vec4 globalPosition; \n" +
			"varying vec3 varyingViewDir ; \n" +
			"mat4 buildRotMat4(vec3 rot) \n" +
			"{ \n" +
			"mat4 ret = mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"float s; \n" +
			"float c; \n" +
			"s = sin(rot.x); \n" +
			"c = cos(rot.x); \n" +
			"ret *= mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, c, s, 0.0), \n" +
			"vec4(0.0, -s, c, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"s = sin(rot.y); \n" +
			"c = cos(rot.y); \n" +
			"ret *= mat4( \n" +
			"vec4(c, 0.0, -s, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(s, 0.0, c, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"s = sin(rot.z); \n" +
			"c = cos(rot.z); \n" +
			"ret *= mat4( \n" +
			"vec4(c, s, 0.0, 0.0), \n" +
			"vec4(-s, c, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"return ret; \n" +
			"} \n" +
			"void main(void) { \n" +
			"varying_color = vec4(1.0, 1.0, 1.0, 1.0); \n" +
			"mat4 billboardMatrix = mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)); \n" +
			"billboardMatrix = mat4( \n" +
			"uniform_cameraMatrix[0], \n" +
			"uniform_cameraMatrix[1], \n" +
			"uniform_cameraMatrix[2], \n" +
			"vec4(0.0, 0.0,1.0, 1.0)); \n" +
			"mat4 modeViewMatrix = uniform_ModelViewMatrix ; \n" +
			"localPosition = outPosition = vec4(e_position, 1.0); \n" +
			"globalPosition.xyz = vec3(0.0,0.0,0.0); \n" +
			"globalPosition.xyz += attribute_offsetPosition; \n" +
			"} \n",

			"pointLight_fragment":
			"const int max_pointLight = 0 ; \n" +
			"uniform float uniform_pointLightSource[12*max_pointLight] ; \n" +
			"struct PointLight{ \n" +
			"vec3 position ; \n" +
			"vec3 diffuse ; \n" +
			"vec3 ambient ; \n" +
			"float intensity; \n" +
			"float radius; \n" +
			"float falloff; \n" +
			"}; \n" +
			"void calculatePointLight(MaterialSource materialSource){ \n" +
			"vec3 N = normal; \n" +
			"for(int i = 0 ; i < max_pointLight ; i++){ \n" +
			"PointLight pointLight; \n" +
			"pointLight.position = vec3(uniform_pointLightSource[i*12],uniform_pointLightSource[i*12+1],uniform_pointLightSource[i*12+2]); \n" +
			"pointLight.diffuse = vec3(uniform_pointLightSource[i*12+3],uniform_pointLightSource[i*12+4],uniform_pointLightSource[i*12+5]); \n" +
			"pointLight.ambient = vec3(uniform_pointLightSource[i*12+6],uniform_pointLightSource[i*12+7],uniform_pointLightSource[i*12+8]); \n" +
			"pointLight.intensity = uniform_pointLightSource[i*12+9]; \n" +
			"pointLight.radius = uniform_pointLightSource[i*12+10]; \n" +
			"pointLight.falloff = uniform_pointLightSource[i*12+11]; \n" +
			"ambientColor.xyz += pointLight.diffuse.xyz * pointLight.ambient ; \n" +
			"vec4 lightVirePos = uniform_ViewMatrix * vec4(pointLight.position.xyz,1.0) ; \n" +
			"vec3 lightDir = varying_ViewPose.xyz - lightVirePos.xyz ; \n" +
			"float intensity = max(dot(N,normalize(lightDir)), 0.0); \n" +
			"float lightDist = length( lightDir ); \n" +
			"float attenuation = pointLight.intensity / (3.0 + 0.001 * lightDist +  0.00009 * lightDist * lightDist); \n" +
			"light.xyz += pointLight.diffuse * intensity * attenuation ; \n" +
			"if( attenuation> 0.0){ \n" +
			"vec3 viewDir = normalize(varying_ViewPose.xyz/varying_ViewPose.w); \n" +
			"vec3 H = normalize( normalize(lightDir) + viewDir ); \n" +
			"float NdotH = dot( normal, H ); \n" +
			"float lambertTerm = pow( clamp( NdotH ,0.0,1.0),materialSource.shininess ); \n" +
			"specularColor.xyz += pointLight.diffuse * lambertTerm * materialSource.specular * attenuation ; \n" +
			"} \n" +
			"}; \n" +
			"} \n" +
			"void main() { \n" +
			"calculatePointLight(materialSource); \n" +
			"} \n",

			"secondaryUV_vs":
			"attribute vec2 attribute_uv1; \n" +
			"varying vec2 varying_uv1 ; \n" +
			"void main(void){ \n" +
			"varying_uv1 = attribute_uv1 ; \n" +
			"} \n",

			"shadowMapping_fs":
			"uniform sampler2D shadowMapTexture; \n" +
			"varying vec2 varying_ShadowCoord; \n" +
			"float unpackDepth(vec4 rgbaDepth){ \n" +
			"vec4 bitShift = vec4( 1.0 , 1.0/256.0 , 1.0/(256.0*256.0) , 1.0/(256.0*256.0*256.0) ); \n" +
			"float depth = dot(rgbaDepth,bitShift); \n" +
			"return depth ; \n" +
			"} \n" +
			"void main() { \n" +
			"vec3 shadowColor = vec3(1.0,1.0,1.0); \n" +
			"float shadow = 0.0; \n" +
			"if (varying_ShadowCoord.w > 0.0) { \n" +
			"vec3 shadowDepth = varying_ShadowCoord.xyz / varying_ShadowCoord.w * 0.5 + 0.5; \n" +
			"vec2 sample = clamp(shadowDepth.xy,0.0,1.0); \n" +
			"float sampleDepth = unpackDepth(texture2D(shadowMapTexture, sample)); \n" +
			"if(sampleDepth < shadowDepth.z-0.002) \n" +
			"shadowColor = vec3(0.5,0.5,0.6)  ; \n" +
			"} \n" +
			"diffuseColor.xyz = diffuseColor.xyz * shadowColor; \n" +
			"} \n",

			"shadowMapping_vs":
			"uniform mat4 uniform_ShadowMatrix; \n" +
			"varying vec4 varying_ShadowCoord; \n" +
			"void main() { \n" +
			"varying_ShadowCoord = uniform_ShadowMatrix * vec4(attribute_position, 1.0); \n" +
			"} \n",

			"shadow_fs":
			"uniform sampler2D shadowMapTexture; \n" +
			"varying vec4 varying_ShadowCoord; \n" +
			"void main() { \n" +
			"vec4 shadowCoordinateWdivide = varying_ShadowCoord / varying_ShadowCoord.w; \n" +
			"shadowCoordinateWdivide.z += 0.0005; \n" +
			"float distanceFromLight = texture2D(shadowMapTexture, shadowCoordinateWdivide.st).z; \n" +
			"float shadow = 1.0; \n" +
			"if (varying_ShadowCoord.w > 0.0) \n" +
			"{ \n" +
			"shadow = distanceFromLight < shadowCoordinateWdivide.z ? 0.5 : 1.0; \n" +
			"} \n" +
			"diffuseColor = diffuseColor * shadow; \n" +
			"} \n",

			"shadow_vs":
			"uniform mat4 uniform_ShadowMatrix; \n" +
			"varying vec4 varying_ShadowCoord; \n" +
			"void main() { \n" +
			"varying_ShadowCoord = uniform_ShadowMatrix * vec4(e_position, 1.0); \n" +
			"} \n",

			"skeletonShadowPass_vs":
			"attribute vec4 attribute_boneIndex; \n" +
			"attribute vec4 attribute_boneWeight; \n" +
			"attribute vec4 attribute_color; \n" +
			"vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"const int bonesNumber = 0; \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber]; \n" +
			"mat4 buildMat4(int index){ \n" +
			"vec4 quat = uniform_PoseMatrix[index * 2 + 0]; \n" +
			"vec4 translation = uniform_PoseMatrix[index * 2 + 1]; \n" +
			"float xx = quat.x * quat.x; \n" +
			"float xy = quat.x * quat.y; \n" +
			"float xz = quat.x * quat.z; \n" +
			"float xw = quat.x * quat.w; \n" +
			"float yy = quat.y * quat.y; \n" +
			"float yz = quat.y * quat.z; \n" +
			"float yw = quat.y * quat.w; \n" +
			"float zz = quat.z * quat.z; \n" +
			"float zw = quat.z * quat.w; \n" +
			"return mat4( \n" +
			"1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0, \n" +
			"2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0, \n" +
			"2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0, \n" +
			"translation.x,				translation.y,			translation.z,			1 \n" +
			"); \n" +
			"} \n" +
			"void main(void){ \n" +
			"varying_color = attribute_color; \n" +
			"e_boneIndex = attribute_boneIndex; \n" +
			"e_boneWeight = attribute_boneWeight; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"mat4 m0 = buildMat4(int(e_boneIndex.x)); \n" +
			"mat4 m1 = buildMat4(int(e_boneIndex.y)); \n" +
			"mat4 m2 = buildMat4(int(e_boneIndex.z)); \n" +
			"mat4 m3 = buildMat4(int(e_boneIndex.w)); \n" +
			"outPosition = m0 * temp_position * e_boneWeight.x; \n" +
			"outPosition += m1 * temp_position * e_boneWeight.y; \n" +
			"outPosition += m2 * temp_position * e_boneWeight.z; \n" +
			"outPosition += m3 * temp_position * e_boneWeight.w; \n" +
			"outPosition = uniform_ModelViewMatrix * outPosition; \n" +
			"} \n",

			"skeleton_vs":
			"attribute vec4 attribute_boneIndex; \n" +
			"attribute vec4 attribute_boneWeight; \n" +
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"const int bonesNumber = 0; \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber]; \n" +
			"uniform mat4 uniform_NormalMatrix ; \n" +
			"mat4 buildMat4(int index){ \n" +
			"vec4 quat = uniform_PoseMatrix[index * 2 + 0]; \n" +
			"vec4 translation = uniform_PoseMatrix[index * 2 + 1]; \n" +
			"float xx = quat.x * quat.x; \n" +
			"float xy = quat.x * quat.y; \n" +
			"float xz = quat.x * quat.z; \n" +
			"float xw = quat.x * quat.w; \n" +
			"float yy = quat.y * quat.y; \n" +
			"float yz = quat.y * quat.z; \n" +
			"float yw = quat.y * quat.w; \n" +
			"float zz = quat.z * quat.z; \n" +
			"float zw = quat.z * quat.w; \n" +
			"return mat4( \n" +
			"1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0, \n" +
			"2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0, \n" +
			"2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0, \n" +
			"translation.x,				translation.y,			translation.z,			1 \n" +
			"); \n" +
			"} \n" +
			"void main(void){ \n" +
			"e_boneIndex = attribute_boneIndex; \n" +
			"e_boneWeight = attribute_boneWeight; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"vec4 temp_normal = vec4(attribute_normal, 0.0) ; \n" +
			"mat4 m0 = buildMat4(int(e_boneIndex.x)); \n" +
			"mat4 m1 = buildMat4(int(e_boneIndex.y)); \n" +
			"mat4 m2 = buildMat4(int(e_boneIndex.z)); \n" +
			"mat4 m3 = buildMat4(int(e_boneIndex.w)); \n" +
			"outPosition = m0 * temp_position * e_boneWeight.x; \n" +
			"outPosition += m1 * temp_position * e_boneWeight.y; \n" +
			"outPosition += m2 * temp_position * e_boneWeight.z; \n" +
			"outPosition += m3 * temp_position * e_boneWeight.w; \n" +
			"e_position = outPosition.xyz; \n" +
			"vec4 temp_n ; \n" +
			"temp_n = m0 * temp_normal * e_boneWeight.x; \n" +
			"temp_n += m1 * temp_normal * e_boneWeight.y; \n" +
			"temp_n += m2 * temp_normal * e_boneWeight.z; \n" +
			"temp_n += m3 * temp_normal * e_boneWeight.w; \n" +
			"mat3 normalMatrix = mat3(uniform_NormalMatrix); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -temp_n.xyz); \n" +
			"varying_ViewPose = vec4(normalMatrix*outPosition.xyz, 1.0) ; \n" +
			"outPosition = uniform_ModelViewMatrix * outPosition; \n" +
			"} \n",

			"specularMap_fragment":
			"uniform sampler2D specularTexture; \n" +
			"void main(void){ \n" +
			"specularColor.xyz *= texture2D( specularTexture , uv_0 ).xyz ; \n" +
			"} \n",

			"tangent_vs":
			"attribute vec3 attribute_tangent; \n" +
			"void main(void){ \n" +
			"}  \n",

			"terrainRGBA_fragment":
			"uniform sampler2D blendMaskTexture ; \n" +
			"uniform sampler2D splat_0Tex ; \n" +
			"uniform sampler2D splat_1Tex ; \n" +
			"uniform sampler2D splat_2Tex ; \n" +
			"uniform sampler2D splat_3Tex ; \n" +
			"uniform float uvs[8]; \n" +
			"void main() { \n" +
			"vec4 splat_control = texture2D ( blendMaskTexture , varying_uv0 ); \n" +
			"vec4 cc = vec4(0.0,0.0,0.0,1.0); \n" +
			"vec2 uv = varying_uv0 ; \n" +
			"cc.xyz = splat_control.x * texture2D (splat_0Tex, uv * vec2(uvs[0],uvs[1])).xyz ; \n" +
			"cc.xyz += splat_control.y * texture2D (splat_1Tex, uv * vec2(uvs[2],uvs[3]) ).xyz; \n" +
			"cc.xyz += splat_control.z * vec4(texture2D (splat_2Tex, uv* vec2(uvs[4],uvs[5]))).xyz; \n" +
			"cc.xyz += (1.0-length(splat_control.xyz)) * vec4(texture2D (splat_3Tex, uv* vec2(uvs[6],uvs[7]))).xyz; \n" +
			"diffuseColor.xyz = cc.xyz ; \n" +
			"} \n",

			"uvRoll_fs":
			"uniform float uvRoll[2] ; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"uv_0.xy += vec2(uvRoll[0],uvRoll[1]); \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"diffuseColor.xyz = clamp(diffuseColor.xyz / diffuseColor.w,0.0,1.0); \n" +
			"} \n",

			"uvSpriteSheet_fs":
			"uniform float uvSpriteSheet[4] ; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"uv_0.xy *= vec2(uvSpriteSheet[2],uvSpriteSheet[3]); \n" +
			"uv_0.xy += vec2(uvSpriteSheet[0],uvSpriteSheet[1]); \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"} \n",

			"varyingViewDir_vs":
			"varying vec3 varying_ViewDir; \n" +
			"uniform vec3 uniform_eyepos; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"void main(void){ \n" +
			"varying_ViewDir = normalize(mat3(uniform_NormalMatrix)*(uniform_eyepos.xyz - e_position)) ; \n" +
			"} \n",

			"vertexPos_vs":
			"varying vec4 varying_pos; \n" +
			"void main() { \n" +
			"varying_pos = uniform_ModelViewMatrix * vec4(e_position, 1.0) ; \n" +
			"} \n" +
			"                       \n",


		};
	}
}
