import{S as u,O as m,W as d,P as f,a as v,M as y,C as p}from"./vendor.3ce67f09.js";const h=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function c(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(e){if(e.ep)return;e.ep=!0;const i=c(e);fetch(e.href,i)}};h();const g=`

varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}`,b=`#define GLSLIFY 1
//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

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
   
   float r = blob(x, y, 3.3, 3.2, 3.) + blob(x, y, 3.9, 3.0, 5.) + blob(x, y, 4.5, 2.8, 4.);
   float g = blob(x, y, 3.2, 2.9, 2.3) + blob(x, y, 2.7, 2.7, 4.2) + blob(x, y, 2.2, 2.5, 5.2);
   float b = blob(x, y, 2.4, 3.3, 2.9) + blob(x, y, 2.8, 2.3, 5.2) + blob(x, y, 3.2, 1.3, 4.2);
   
   vec3 d = vec3(r, g, b) / blurness;
   // vec3 d = vec3(r, g, b) - blurness;
   
   gl_FragColor = vec4(d.x, d.y, d.z, 1.);
}
`,w=document.querySelector("canvas"),s=new u,C=new p,o=new m(-1,1,1,-1,0,1e3),t=new d({canvas:w,alpha:!0,antialias:!0}),z={u_time:{value:0},u_resolution:{value:{x:window.innerWidth,y:window.innerHeight}}},_=new f(2,2),L=new v({uniforms:z,vertexShader:g,fragmentShader:b}),r=new y(_,L);s.add(r);o.position.z=.1;t.setSize(window.innerWidth,window.innerHeight);t.render(s,o);function x(){r.material.uniforms.u_time.value+=C.getDelta(),t.render(s,o),requestAnimationFrame(x)}window.addEventListener("resize",function(){t.setSize(window.innerWidth,window.innerHeight),r.material.uniforms.u_resolution.value.x=window.innerWidth,r.material.uniforms.u_resolution.value.y=window.innerHeight,o.aspect=1,o.updateProjectionMatrix()});x();
