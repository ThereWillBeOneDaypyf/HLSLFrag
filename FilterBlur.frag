#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_resolution;
const mat3 fliter = mat3(1. / 9., 1. / 9., 1. / 9.,
                         1. / 9., 1. / 9., 1. / 9.,
                         1. / 9., 1. / 9., 1. / 9.);
const mat3 guass_fliter = mat3(1. / 16., 2. / 16., 1. / 16.,
                               2. / 16., 4. / 16., 2. / 16.,
                               1. / 16., 2. / 16., 1. / 16.);
const float blur = .005;

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec4 color = vec4(0);
    mat3 filter_in_use = guass_fliter;
    // filter_in_use = fliter;
    for(int i = -1; i <= 1; i ++) {
        for(int j = -1; j <= 1; j ++) {
            float weigh = filter_in_use[j + 1][i + 1];
            vec2 co = vec2(st.x + float(i) * blur, st.y + float(j) * blur);
            color += texture2D(u_tex0, co) * weigh;
        }
    }
    gl_FragColor = color;
}