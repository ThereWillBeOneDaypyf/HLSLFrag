#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform float u_time;
uniform vec2 u_resolution;
const float center_coef = .2;
// const float around_coef = 0.125; // (1 - center_coef) / 4
const float around_coef = (1. - center_coef) / 4.;
const float rad = .003;

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec4 c1 = texture2D(u_tex0, vec2(st.x + rad, st.y + rad));
    vec4 c2 = texture2D(u_tex0, vec2(st.x - rad, st.y + rad));
    vec4 c3 = texture2D(u_tex0, vec2(st.x + rad, st.y - rad));
    vec4 c4 = texture2D(u_tex0, vec2(st.x - rad, st.y - rad));
    vec4 c = texture2D(u_tex0, st);    

    gl_FragColor = c * center_coef + c1 * around_coef + c2 * around_coef + c3 * around_coef + c4 * around_coef;
}