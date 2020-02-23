#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_resolution;
uniform float u_time;

const vec3 grey_coef = vec3(0.2125, 0.7154, 0.0721);
const vec3 back_color = vec3(.5);

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 sampler_point = vec2(st.x - 1. / u_resolution.x, st.y - 1. / u_resolution.y);
    vec4 color = texture2D(u_tex0, st);
    vec4 sampler_color = texture2D(u_tex0, sampler_point);
    vec3 dif_color = color.rgb - sampler_color.rgb;
    float grey = dot(dif_color, grey_coef);
    gl_FragColor = vec4(vec3(grey) + back_color, color.a);
    // gl_FragColor = vec4(dif_color, 1.);
}