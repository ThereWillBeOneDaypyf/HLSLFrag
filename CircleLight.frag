#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform sampler2D u_tex0;
const float constant = 1.;
const float liner = 2.;
const float quadratic = .5;
const float base = 1.5;
const vec2 center = vec2(.3, .7); 

float random2d(vec2 coord){
    return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise1d(float v){
    return cos(v + cos(v * 90.1415) * 100.1415) * 0.5 + 0.5;
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    float dis = distance(st, center) - .5 * noise1d(random2d(st));
    float coef = base / (constant + dis * liner + dis * dis * quadratic);
    vec3 color = coef * texture2D(u_tex0, st).rgb;
    // color = vec3(coef);
    gl_FragColor = vec4(color, 1.);
    // gl_FragColor = texture2D(u_tex0, st);
}