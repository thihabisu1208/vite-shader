const fragmentShader = glsl/* glsl */`
#pragma glslify: snoise = require(glsl-noise/simplex/2d)

uniform float u_time;
uniform vec2 u_resolution;

float speed = 3.;
float far = 3.;
float blurness = 80.;

float blob(float x, float y, float fx, float fy, float size){
   float xx = x + sin(u_time * fx / speed) * .7;
   float yy = y + cos(u_time * fy / speed) * .7;

   return size * (sin(u_time) + 2.) / sqrt(xx * xx + yy * yy);
}

void main() {
   vec2 uv = ( gl_FragCoord.xy / u_resolution.xy ) - 0.5;

   vec2 noiseUv = uv + snoise(uv * sin(u_time) * cos(u_time)) * .1;

   float x = noiseUv.x * far;
   float y = noiseUv.y * far;

   // float r = blob(x, y, 3.3, 3.2, 3.);
   // float g = blob(x, y, 3.2, 2.9, 2.3);
   // float b = blob(x, y, 2.4, 3.3, 2.9);
   float r = blob(x, y, 3.3, 3.2, 3.) + blob(x, y, 3.9, 3.0, 5.) + blob(x, y, 4.5, 2.8, 4.);
   float g = blob(x, y, 3.2, 2.9, 2.3) + blob(x, y, 2.7, 2.7, 4.2) + blob(x, y, 2.2, 2.5, 5.2);
   float b = blob(x, y, 2.4, 3.3, 2.9) + blob(x, y, 2.8, 2.3, 5.2) + blob(x, y, 3.2, 1.3, 4.2);
   
   vec3 d = vec3(r, g, b) / blurness;
   // vec3 d = vec3(r, g, b) - blurness;
   
   gl_FragColor = vec4(d.x, d.y, d.z, 1.);
}
`;

export default fragmentShader;