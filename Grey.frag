#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_resolution;
const vec3 grey_coef = vec3(0.2125, 0.7154, 0.0721);

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec4 color = texture2D(u_tex0, st);
    float grey = dot(color.rgb, grey_coef);
    gl_FragColor = vec4(vec3(grey), color.a);
}