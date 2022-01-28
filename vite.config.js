import glslify from 'vite-plugin-glslify';

export default {
  base: "/vite-shader/",
  plugins: [
    glslify()
  ],
}