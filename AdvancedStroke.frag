// glslViewer Stroke.frag partner_picture_53007.png
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform sampler2D u_tex0;
const float PI = 3.14159265359;
const float circle_divide_count = 12.;
const float radians_divide_count = 7.;
const float blur_dis = .02;
const vec3 stroke_color = vec3(1., 0., 0.);

float random2d(vec2 coord){
    return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    float ang = random2d(st) * 2. - 1.; 
    float per_ang = 2. * PI / (circle_divide_count);
    float alpha_sum = 0.;
    float weigh_sum = 0.;
    for(float i = 0.; i < circle_divide_count; i ++) {
        float cur_ang = ang + i * per_ang;
        float delta_x = cos(cur_ang) * blur_dis;
        float delta_y = sin(cur_ang) * blur_dis;
        for(float j = 1.; j < radians_divide_count; j ++) {
            vec2 cur = st + vec2((j + 1.) * delta_x, (j + 1.) * delta_y);
            float weigh = (1. - blur_dis * (j + 1.));
            alpha_sum += texture2D(u_tex0, cur).a;
            weigh_sum += weigh;
        }
    }
    float alpha = alpha_sum / weigh_sum;
    vec4 origin_color = texture2D(u_tex0, st);
    origin_color.a = max(origin_color.a, 0.001);

    float outer_alpha = (alpha_sum / weigh_sum) * (1. - origin_color.a) * 1.;
    float inner_alpha = ((weigh_sum - alpha_sum) / weigh_sum) * origin_color.a;
    vec3 mix_color = mix(origin_color.rgb, stroke_color, outer_alpha / (outer_alpha + origin_color.a));
    float mix_alpha = min(origin_color.a + outer_alpha, 1.);
    gl_FragColor = vec4(mix_color, mix_alpha);
}