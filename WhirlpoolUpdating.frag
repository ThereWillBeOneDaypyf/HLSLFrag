#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_resolution;
uniform float u_time;
const float PI = 3.14159265359;
const float R = .5;
const float THETA = .2 * PI;
const vec2 center = vec2(.5, .5);
const float coef = 3.;

mat2 rotate(float angle){
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    float dis = distance(st, center);
    st -= center;
    float ang = atan(st.y, st.x);
    float t = smoothstep(0., 1., fract(u_time / 5.));
    float r = R / (t * t * 40.);
    if(dis <= r) {
        st = rotate(THETA * coef * (1. - (dis / r) * (dis / r))) * st;
    }
    st += center;
    gl_FragColor = texture2D(u_tex0, st);
    // gl_FragColor = vec4(vec3(dis), 1.);
}