// glslViewer Stroke.frag partner_picture_53007.png
#ifdef GL_ES
precision mediump float;
#endif

// uniform vec2 u_resolution;
// uniform sampler2D u_tex0;
// const float alpha_limit = .99;
// const float origin_limit = .23;
// const vec3 stroke_color = vec3(1., 1., 1.);
// const float alpha_rate = 0.9;
// const float dis = 7.;
// 
// void main() {
//     vec2 st = gl_FragCoord.xy / u_resolution;
//     vec4 origin_pixel = texture2D(u_tex0, st);
//     float alpha_sum = 0.;
//     vec2 per_pix = dis / u_resolution;
//     for(float i = -1.; i <= 1.; i ++) {
//         for(float j = -1.; j <= 1.; j ++) {
//             vec2 p = vec2(st.x + i * per_pix.x, st.y + j * per_pix.y);
//             alpha_sum += texture2D(u_tex0, p).a;
//         }
//     }
// 	float is_need_show = step(alpha_limit, alpha_sum);
// 	// float damp = saturate((alphaSum - _EdgeAlphaThreshold) * _Edge;DampRate);
//     // float damp = clamp(2. * (alpha_sum - alpha_limit), 0., 1.);
//     float damp = smoothstep(0., 1., alpha_rate * (alpha_sum - alpha_limit));
// 	vec4 orign = texture2D(u_tex0, st);
// 	float is_origon = step(origin_limit, orign.a);
// 	vec3 final_color = mix(stroke_color.rgb, orign.rgb, is_origon);
//     gl_FragColor = vec4(final_color.rgb, is_need_show * damp);
//     // gl_FragColor = vec4(vec3(is_need_show * damp), 1.);
// }

uniform vec2 u_resolution;
uniform sampler2D u_tex0;

const vec3 stroke_color = vec3(1., 1., 1.);
const float radius = 5.;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 per_r = radius / u_resolution;
    vec4 origin = texture2D(u_tex0, st);   
    float alpha_weight = 0.;
    alpha_weight += texture2D(u_tex0, vec2(st.x + per_r.x, st.y + per_r.y)).a;
    alpha_weight += texture2D(u_tex0, vec2(st.x + per_r.x, st.y - per_r.y)).a;
    alpha_weight += texture2D(u_tex0, vec2(st.x - per_r.x, st.y + per_r.y)).a;
    alpha_weight += texture2D(u_tex0, vec2(st.x - per_r.x, st.y - per_r.y)).a;
    alpha_weight += texture2D(u_tex0, vec2(st.x, st.y - per_r.y)).a;
    alpha_weight += texture2D(u_tex0, vec2(st.x, st.y + per_r.y)).a;
    alpha_weight += texture2D(u_tex0, vec2(st.x + per_r.x, st.y)).a;
    alpha_weight += texture2D(u_tex0, vec2(st.x - per_r.x, st.y)).a;
    // alpha_weight /= 8.;
    if(alpha_weight / 8. > origin.a * 2.5) {
        // gl_FragColor = vec4(stroke_color, .9);
        gl_FragColor = vec4(stroke_color, smoothstep(.0, 3.5, alpha_weight));
    }
    else {
        gl_FragColor = origin;
    }
    // gl_FragColor = vec4(vec3(smoothstep(.0, 5., alpha_weight)), 1.);
}