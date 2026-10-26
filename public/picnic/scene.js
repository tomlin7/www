// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
window.Scene = (() => {
  const he = (() => {
      const d = [-0.36, -0.46, 0.81],
        e = Math.hypot(...d);
      return d.map((D) => D / e);
    })(),
    A = `
  float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
  float hash1(float n){ return fract(sin(n * 91.345) * 47453.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p); f = f*f*(3. - 2.*f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }
  float fbm(vec2 p){
    float s = 0., a = .5;
    for (int i = 0; i < 5; i++) { s += a*noise(p); p = mat2(1.6, 1.2, -1.2, 1.6)*p + 7.3; a *= .5; }
    return s;
  }
  const vec3 L = normalize(vec3(-.36, -.46, .81));
  const vec3 AMB = vec3(.56, .56, .62);
  const vec3 SUN = vec3(1., .99, .965);
  const float D = 1800.;`,
    O = `#version 300 es
  in vec2 a; void main(){ gl_Position = vec4(a*2., 0., 1.); }`,
    de = `#version 300 es
  precision highp float;
  out vec4 o;
  uniform vec2 fres;
  uniform vec4 rect;
  const float ANG = -.04;
  ${A}
  float crease(float d, float s){ return s*(1.4*exp(-d*d/50.) + 1.1*exp(-d*d/2600.)); }
  float height(vec2 m){
    float wx = (noise(vec2(m.y/170., 3.)) - .5)*26.;
    float wy = (noise(vec2(m.x/210., 9.)) - .5)*22.;
    float sx = mod(floor((m.x + wx)/660.), 2.)*2. - 1.;
    float sy = mod(floor((m.y + wy)/560.), 2.)*2. - 1.;
    float dx = mod(m.x + wx, 660.) - 330.;
    float dy = mod(m.y + wy, 560.) - 280.;
    float h = crease(dx, sx)*1.3 + crease(dy, sy)*1.0;
    h += (fbm(m/380.) - .5)*16.;
    float wr = fbm(m/240. + 4.);
    h += sin(dot(m, vec2(.55, .83))/21. + wr*7.)*smoothstep(.5, .72, fbm(m/520. + 11.))*1.5;
    return h;
  }
  void main(){
    vec2 w = mix(rect.xy, rect.zw, gl_FragCoord.xy/fres);
    float c = cos(ANG), s = sin(ANG);
    vec2 m = mat2(c, -s, s, c)*w;
    float e = 2.;
    float hx = (height(m + vec2(e, 0)) - height(m - vec2(e, 0)))/(2.*e);
    float hy = (height(m + vec2(0, e)) - height(m - vec2(0, e)))/(2.*e);
    vec3 n = normalize(vec3(-hx, -hy, 1.));
    float shade = 1. + (dot(n, L) - L.z)*1.7;
    shade *= 1. + clamp(height(m)*.01, -.07, .04);
    vec2 slack = vec2(fbm(m/300. + 1.), fbm(m/300. + 5.)) - .5;
    o = vec4(clamp(shade*.5, 0., 1.), slack*.9 + .5, fbm(m/90. + 20.));
  }`,
    me = `#version 300 es
  precision highp float;
  out vec4 o;
  uniform vec2 fres;
  uniform vec4 rect;
  uniform float time, gust, soft;
  uniform vec4 B[12];
  uniform vec4 C[12];
  uniform int nB;
  uniform vec4 K[4];
  uniform int nK;
  ${A}
  vec2 edge(float bl, float d){ return vec2(smoothstep(-bl, bl, d), smoothstep(-bl*.45, bl*.45, d)); }
  float leafSd(vec2 p, vec2 c, float a, float len, float W){
    p -= c;
    float ca = cos(a), sa = sin(a);
    p = vec2(ca*p.x + sa*p.y, -sa*p.x + ca*p.y);
    p.x -= len*.5;
    float t = clamp(p.x/(len*.5), -1., 1.);
    float w = W*sqrt(max(0., 1. - t*t))*(1.1 - .3*t);
    return max(abs(p.x) - len*.5, abs(p.y) - w);
  }
  vec2 branch(vec2 p, vec4 b, vec4 c, float t){
    vec2 base = b.xy;
    float ang = b.z, len = b.w, blur = c.x*soft, seed = c.y, bend = c.z;
    vec2 d0 = vec2(cos(ang), sin(ang));
    if (length(p - (base + d0*len*.5)) > len*.62 + 150. + blur*3.) return vec2(1.);
    float g = gust;
    float sway = (sin(t*.7 + seed)*.035 + sin(t*1.63 + seed*2.)*.016)*g;
    float a = ang + sway;
    vec2 dir = vec2(cos(a), sin(a)), nrm = vec2(-dir.y, dir.x);
    vec2 pa = p - base;
    vec2 s = vec2(1.);
    float al = clamp(dot(pa, dir), 0., len);
    s = min(s, edge(blur, length(pa - dir*al - nrm*bend*al*al/len) - mix(5., 1.4, al/len)));
    for (int i = 0; i < 9; i++) {
      float fi = float(i);
      float u = .18 + fi*.095;
      float side = mod(fi, 2.) < 1. ? 1. : -1.;
      vec2 tb = dir*(u*len) + nrm*bend*u*u*len;
      float tl = len*(.32 - fi*.022);
      float ta = a + side*(.75 + .25*sin(fi*2.7 + seed)) + sway*1.8 + sin(t*1.3 + fi*1.9 + seed)*.05*g;
      vec2 td = vec2(cos(ta), sin(ta)), tn = vec2(-td.y, td.x);
      vec2 pt = pa - tb;
      float tAlong = dot(pt, td);
      float bl = blur*(.55 + 1.*hash1(fi + seed*7.));
      if (abs(dot(pt, tn)) > 80. + bl*2. || tAlong < -70. || tAlong > tl + 80.) continue;
      s = min(s, edge(bl, length(pt - td*clamp(tAlong, 0., tl)) - 1.3));
      for (int j = 0; j < 8; j++) {
        float fj = float(j);
        bool tip = j == 7;
        float v = tip ? 1. : .1 + fj*.13;
        float ls = tip ? 0. : (mod(fj, 2.) < 1. ? 1. : -1.);
        float fl = sin(t*(2.4 + hash1(fi*7. + fj)*2.2) + fi*3. + fj*1.7 + seed)*.22*g;
        float la = ta + ls*(.85 + .2*hash1(fi + fj*3. + seed)) + fl;
        float ll = 40. + 26.*hash1(fi*3.1 + fj + seed);
        float W = ll*(.26 + .08*hash1(fj*5. + fi + seed));
        W *= .6 + .4*abs(cos(fl*2.2));
        // each leaf hangs at its own height, so its edge is its own softness
        float lb = bl*(.75 + .5*hash1(fi*13. + fj*7. + seed));
        s = min(s, edge(lb, leafSd(pt, td*(v*tl), la, ll, W)));
      }
    }
    return s;
  }
  // the far crown: soft masses, with round sun flecks where light gets through
  vec2 canopy(vec2 p, vec4 k, float t){
    float d = length(p - k.xy)/k.z;
    if (d > 1.25) return vec2(1.);
    vec2 drift = vec2(sin(t*.5), cos(t*.37))*6.*gust;
    float n = fbm((p + drift)/80.)*.62 + fbm((p - drift*1.6)/34. + 7.)*.38;
    float dens = n + (1. - d)*.32;
    float fall = smoothstep(1.2, .55, d);
    float m1 = smoothstep(.38, .6, dens), m2 = smoothstep(.43, .53, dens);
    vec2 cell = floor((p + drift*.6)/52.);
    float fleck = 0., fleck2 = 0.;
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec2 c = cell + vec2(x, y);
      float h = hash(c*1.7);
      if (h < .55) continue;
      vec2 q = (c + vec2(hash(c + 3.1), hash(c + 7.7)))*52.;
      float r = 4. + 7.*hash(c + 9.3);
      float dd = length((p + drift*.6) - q);
      fleck = max(fleck, smoothstep(r + 6.*soft, r - 3., dd));
      fleck2 = max(fleck2, smoothstep(r + 2., r - 1., dd));
    }
    return vec2(1.) - vec2(m1*(1. - fleck*.8), m2*(1. - fleck2*.85))*fall;
  }
  void main(){
    vec2 p = mix(rect.xy, rect.zw, gl_FragCoord.xy/fres);
    vec2 s = vec2(1.);
    for (int i = 0; i < 12; i++) { if (i >= nB) break; s = min(s, branch(p, B[i], C[i], time)); }
    for (int i = 0; i < 4; i++) { if (i >= nK) break; s = min(s, canopy(p, K[i], time)); }
    o = vec4(s, 0., 1.);
  }`,
    te = (d) => `#version 300 es
  precision highp float;
  ${d ? "#define OCC" : ""}
  in vec2 a;
  uniform vec3 pos;
  uniform vec2 size;
  uniform vec3 rot;
  uniform vec2 bend;
  uniform vec3 curlA;
  uniform vec2 curlB;
  uniform vec4 crumple;
  uniform vec3 quad;
  uniform float shape;
  uniform vec2 cam;
  uniform float zoom, spin;
  uniform vec2 view;
  uniform vec4 wrect;
  out vec3 vP; out vec3 vN; out vec2 vUV; out vec3 vQ; out vec3 vT; out vec3 vO; out float vC;
  ${A}
  float ch(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)))*43758.5453); }
  const float FSZ = 2.1;
  vec3 h3(vec3 p){ p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6))); return fract(sin(p)*43758.5453); }
  // the facets of a crumpled ball: each patch of paper is a flat plane, tipped a little and set a little in or
  // out; where a lower plane meets a higher one there is a lip, and a shadow tucked under it. p is where this
  // bit of paper sits on the finished ball (a unit sphere), scaled to the facet size.
  // returns (height off the sphere, as a share of its radius; how deep in shadow; distance to the edge), and the plane's tilt
  vec3 warp(vec3 p){ return p + (vec3(sin(p.y*1.7 + 1.3), sin(p.z*1.9 + 4.1), sin(p.x*1.5 + 2.7)) + .5*vec3(sin(p.z*3.1), sin(p.x*2.9 + 1.), sin(p.y*3.3 + 2.)))*.32; }
  vec3 facets(vec3 p, float TL, float OF, float W, out vec3 tilt){
    vec3 P = normalize(p), i = floor(p);
    float d1 = 9., d2 = 9.; vec3 a1, a2;
    for (int z = -1; z <= 1; z++) for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec3 g = i + vec3(x, y, z), fp = g + h3(g);
      // weighted, so some facets grow big and others stay small, and every edge stays straight
      vec3 df = fp - p; float d = dot(df, df) - h3(g + 2.9).y*.55;
      if (d < d1) { d2 = d1; a2 = a1; d1 = d; a1 = g; } else if (d < d2) { d2 = d; a2 = g; }
    }
    vec3 c1 = normalize(a1 + h3(a1)), c2 = normalize(a2 + h3(a2));
    vec3 n1 = normalize(c1 + (h3(a1 + 31.7) - .5)*TL), n2 = normalize(c2 + (h3(a2 + 31.7) - .5)*TL);
    float o1 = (h3(a1 + 7.3).x - .5)*OF, o2 = (h3(a2 + 7.3).x - .5)*OF;
    float k1 = dot(c1*(1. + o1), n1)/max(dot(P, n1), .3) - 1., k2 = dot(c2*(1. + o2), n2)/max(dot(P, n2), .3) - 1.;
    // the step between two planes is eased over a short width, so it reads as a lip, not a stair
    float e = d2 - d1, w = smoothstep(0., W, e);
    tilt = n1 - P*dot(n1, P);
    return vec3(mix((k1 + k2)*.5, k1, w), smoothstep(.02, .07, k2 - k1)*exp(-e*16.), e);
  }
  // the same planes, blended smoothly, for the shape itself: the mesh can't hold a sharp step, the shading can
  float lumps(vec3 p, float TL, float OF){
    vec3 P = normalize(p), i = floor(p);
    float sw = 0., sh = 0.;
    for (int z = -1; z <= 1; z++) for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec3 g = i + vec3(x, y, z), fp = g + h3(g), c1 = normalize(fp);
      vec3 df = fp - p; float w = exp(-(dot(df, df) - h3(g + 2.9).y*.55)*10.);
      vec3 n1 = normalize(c1 + (h3(g + 31.7) - .5)*TL);
      float o1 = (h3(g + 7.3).x - .5)*OF;
      sh += w*(dot(c1*(1. + o1), n1)/max(dot(P, n1), .3) - 1.); sw += w;
    }
    return sh/max(sw, 1e-5);
  }
  void main(){
    float s = a.x*size.x, t = a.y*size.y;
    vec3 lp, ln;
    vQ = vec3(0., 0., 1.); vT = vec3(1., 0., 0.); vO = vec3(1., 0., 0.); vC = 0.;
    if (shape > .5) {
      // a leaf or a flower: curled along its length, cupped across it, and twisted
      lp = vec3(s, t, quad.x*s*s + quad.y*t*t + quad.z*s*t);
      ln = normalize(vec3(-(2.*quad.x*s + quad.z*t), -(2.*quad.y*t + quad.z*s), 1.));
    } else if (crumple.y > 0.) {
      // a sheet crumpled into a ball (crumple: how crumpled, ball radius, roll, half its diagonal). The sheet is
      // drawn round a sphere from its middle, square mapped to a disc so every edge closes at the same point,
      // drawing side in. On it, flat facets between straight creases, lumps where they sit in or out
      float c = crumple.x, R = crumple.y;
      vec2 q = a*2., dk = vec2(q.x*sqrt(1. - q.y*q.y*.5), q.y*sqrt(1. - q.x*q.x*.5));
      float rd = min(length(dk), 1.), th1 = 2.*asin(rd*.999), pd = atan(dk.y*size.y, dk.x*size.x);
      // it doesn't open evenly: some flaps let go before others, the outside before the middle
      float wv = .5 + .22*sin(2.*pd + 1.3) + .18*sin(3.*pd + 4.1) + .1*sin(5.*pd + 2.2);
      float o = clamp(((1. - c) - .25*wv*(1. - .5*rd))/.75, 0., 1.), cl = 1. - smoothstep(0., 1., o);
      float m = smoothstep(0., 1., cl), D = crumple.w;
      float L = length(vec2(s, t)), ph = atan(mix(t, dk.y*size.y, m), mix(s, dk.x*size.x, m));
      float r = R/max(pow(cl, 1.6), 1e-4), th = mix(L, th1*R, m)/r;
      lp = vec3(sin(th)*cos(ph), sin(th)*sin(ph), 1. - cos(th))*r;
      ln = vec3(-sin(th)*cos(ph), -sin(th)*sin(ph), cos(th));
      // where this bit of paper sits on the finished ball: the facets belong to it, so they keep their place as it opens
      vec3 P = vec3(sin(th1)*cos(pd), sin(th1)*sin(pd), -cos(th1));
      float h = clamp(lumps(P*FSZ, .55, .1), -.3, .3) + lumps(P*FSZ*2.4 + 11.3, .5, .05)*.25;
      // half open it is still rumpled: the creases stand big against the sheet
      lp -= ln*h*(R*cl + D*.3*cl*(1. - cl));
      lp.z *= mix(1., .86, m);
      vQ = P; vC = cl;
      // the frame the facets tilt in: on the ball, and here, as it opens (along the sheet from its middle; outward)
      vT = vec3(cos(th)*cos(ph), cos(th)*sin(ph), sin(th));
      vO = vec3(cos(th1)*cos(pd), cos(th1)*sin(pd), sin(th1));
      // rolling, about the ball's own centre
      float ca = cos(crumple.z), sa = sin(crumple.z);
      lp.z -= R; lp = vec3(lp.x*ca + lp.z*sa, lp.y, -lp.x*sa + lp.z*ca); lp.z += R;
      ln = vec3(ln.x*ca + ln.z*sa, ln.y, -ln.x*sa + ln.z*ca);
      vT = vec3(vT.x*ca + vT.z*sa, vT.y, -vT.x*sa + vT.z*ca);
    } else if (curlB.x > 0.) {
      // peeling up: past the fold line (across direction u, at d) the paper rolls round a cylinder of
      // radius R and lies back over itself, face down; the whole of it slid along u to stay in place
      vec2 u = curlA.xy, v = vec2(-u.y, u.x);
      float al = dot(vec2(s, t), u), x = al - curlA.z, R = curlB.x, an = al, z = 0.;
      vec2 nn = vec2(0., 1.);
      if (x > 0.) {
        float ag = min(x/R, 3.14159265);
        an = curlA.z + R*sin(ag) - max(x - 3.14159265*R, 0.);
        z = R*(1. - cos(ag));
        nn = vec2(-sin(ag), cos(ag));
      }
      lp = vec3(u*(an + curlB.y) + v*dot(vec2(s, t), v), z);
      ln = vec3(u*nn.x, nn.y);
    } else {
      float th0 = bend.x, k = bend.y, th = th0 + k*s;
      lp = abs(k) < 1e-6 ? vec3(s*cos(th0), t, s*sin(th0)) : vec3((sin(th) - sin(th0))/k, t, (cos(th0) - cos(th))/k);
      ln = vec3(-sin(th), 0., cos(th));
    }
    float c = cos(rot.y), sn = sin(rot.y);
    lp = vec3(lp.x, lp.y*c - lp.z*sn, lp.y*sn + lp.z*c);
    ln = vec3(ln.x, ln.y*c - ln.z*sn, ln.y*sn + ln.z*c);
    vT = vec3(vT.x, vT.y*c - vT.z*sn, vT.y*sn + vT.z*c);
    c = cos(rot.z); sn = sin(rot.z);
    lp = vec3(lp.x*c + lp.z*sn, lp.y, -lp.x*sn + lp.z*c);
    ln = vec3(ln.x*c + ln.z*sn, ln.y, -ln.x*sn + ln.z*c);
    vT = vec3(vT.x*c + vT.z*sn, vT.y, -vT.x*sn + vT.z*c);
    c = cos(rot.x); sn = sin(rot.x);
    lp = vec3(lp.x*c - lp.y*sn, lp.x*sn + lp.y*c, lp.z);
    ln = vec3(ln.x*c - ln.y*sn, ln.x*sn + ln.y*c, ln.z);
    vT = vec3(vT.x*c - vT.y*sn, vT.x*sn + vT.y*c, vT.z);
    vP = pos + lp; vN = ln; vUV = a + .5;
  #ifdef OCC
    vec2 g = vP.xy - L.xy/L.z*vP.z;
    gl_Position = vec4((g - (wrect.xy + wrect.zw)*.5)/((wrect.zw - wrect.xy)*.5), 0., 1.);
  #else
    // the camera can be higher than usual (zoom < 1) and turned a little, for the welcome
    vec2 q = vP.xy - cam;
    float cr = cos(spin), sr = sin(spin);
    q = vec2(cr*q.x - sr*q.y, sr*q.x + cr*q.y);
    float w = (D/zoom - vP.z)/D;
    gl_Position = vec4(q.x/(view.x*.5), -q.y/(view.y*.5), -vP.z/5000.*w, w);
  #endif
  }`,
    pe = `#version 300 es
  precision highp float;
  in vec3 vP; in vec3 vN; in vec2 vUV;
  out vec4 o;
  uniform sampler2D texA;
  uniform int mode;
  uniform float alphaMul;
  void main(){
    if (mode == 3) discard;
    float a = mode == 1 ? 1. : texture(texA, vUV).a*alphaMul;
    if (a < .5) discard;
    // a leaf high in the air throws a fainter, broader shadow than one about to land
    float f = mode == 2 ? 1. - .6*smoothstep(40., 450., vP.z) : 1.;
    o = vec4(f, f*clamp(vP.z/600., 0., 1.), 0., 1.);
  }`,
    oe = (d) => `#version 300 es
  precision highp float;
  ${d ? "#define OCC" : ""}
  layout(location = 0) in vec3 aP;
  layout(location = 1) in vec3 aN;
  layout(location = 2) in vec2 aT;
  uniform mat3 M, MN;
  uniform vec3 pos;
  uniform vec2 cam;
  uniform float zoom, spin;
  uniform vec2 view;
  uniform vec4 wrect;
  out vec3 vP; out vec3 vN; out vec2 vUV;
  ${A}
  void main(){
    vP = pos + M*aP; vN = normalize(MN*aN); vUV = aT;
  #ifdef OCC
    vec2 g = vP.xy - L.xy/L.z*vP.z;
    gl_Position = vec4((g - (wrect.xy + wrect.zw)*.5)/((wrect.zw - wrect.xy)*.5), 0., 1.);
  #else
    vec2 q = vP.xy - cam;
    float cr = cos(spin), sr = sin(spin);
    q = vec2(cr*q.x - sr*q.y, sr*q.x + cr*q.y);
    float w = (D/zoom - vP.z)/D;
    gl_Position = vec4(q.x/(view.x*.5), -q.y/(view.y*.5), -vP.z/5000.*w, w);
  #endif
  }`,
    xe = `#version 300 es
  precision highp float;
  in vec3 vP; in vec3 vN; in vec2 vUV;
  out vec4 o;
  uniform float shadow;
  void main(){ o = vec4(shadow, shadow*clamp(vP.z/600., 0., 1.), 0., 1.); }`,
    ge = `#version 300 es
  precision highp float;
  in vec3 vP; in vec3 vN; in vec2 vUV;
  out vec4 o;
  uniform sampler2D tex, leafTex, occT, occW;
  uniform vec4 color;
  uniform float useTex, gloss, specPow, sheen, opacity, refl, metal, zoom;
  uniform vec2 cam;
  uniform vec4 wrect;
  ${A}
  vec3 sky(vec3 R){
    // what a shiny surface on a lawn reflects: bright sky above, the tree and grass toward the horizon
    vec3 up = mix(vec3(.74, .82, .9), vec3(.98, .99, 1.), smoothstep(.3, .95, R.z));
    vec3 low = mix(vec3(.2, .24, .14), vec3(.42, .46, .34), smoothstep(-.6, .15, R.z));
    return mix(low, up, smoothstep(.05, .35, R.z));
  }
  void main(){
    vec3 V = normalize(vec3(cam, D/zoom) - vP);
    vec3 N = normalize(vN);
    if (dot(N, V) < 0.) N = -N;
    vec4 t = useTex > .5 ? texture(tex, vUV) : vec4(1.);
    vec3 alb = (t.a > .001 ? t.rgb/t.a : vec3(0.))*color.rgb;
    float a = t.a*color.a*opacity;
    if (a < .004) discard;
    vec2 q = vP.xy - L.xy/L.z*vP.z;
    vec2 lu = (q - wrect.xy)/(wrect.zw - wrect.xy);
    vec2 lr = texture(leafTex, lu).rg;
    float S = mix(lr.r, lr.g, clamp(vP.z/300., 0., 1.));
    vec4 tT = texture(occT, lu), tW = texture(occW, lu);
    float hgt = tW.r > .002 ? tW.g/tW.r*600. : 0.;
    float occ = mix(tT.r, tW.r, clamp((hgt - vP.z)/150., 0., 1.))*smoothstep(vP.z + 3., vP.z + 28., hgt);
    float nl = dot(N, L);
    float sunVis = S*(1. - occ*.96);
    vec3 light = AMB*(.82 + .18*N.z) + (SUN - AMB)*sunVis*max(nl, 0.)/L.z;
    vec3 H = normalize(L + V);
    float nh = max(dot(N, H), 0.), lit = sunVis*step(0., nl);
    float spec = (pow(nh, specPow)*gloss + pow(nh, 26.)*sheen)*lit;
    vec3 R = reflect(-V, N);
    float fres = pow(1. - max(dot(N, V), 0.), 5.);
    vec3 env = sky(R)*(.55 + .45*S);
    vec3 col = alb*light;
    // metal: mostly what it reflects, coloured by the metal
    col = mix(col, env*alb*1.15, metal);
    // a clear coat or glass reflects the sky, most at grazing angles
    vec3 shine = env*refl*(.04 + .96*fres) + vec3(spec)*SUN;
    float ao = a + (1. - a)*min(1., refl*fres*.9 + spec);
    o = vec4(col*a + shine, ao);
  }`,
    we = `#version 300 es
  precision highp float;
  out vec4 o;
  uniform sampler2D src;
  uniform vec2 res, dir;
  void main(){
    vec2 uv = gl_FragCoord.xy/res;
    vec4 acc = vec4(0.); float ws = 0.;
    for (int i = -6; i <= 6; i++) { float f = float(i), w = exp(-f*f/18.); acc += texture(src, uv + dir*f)*w; ws += w; }
    o = acc/ws;
  }`,
    ye = `#version 300 es
  precision highp float;
  out vec4 o;
  uniform sampler2D field, leafTex, occT, occW;
  uniform vec2 res, view;
  uniform vec2 cam;
  uniform float dpr, zoom, spin;
  uniform vec4 rect, wrect;
  uniform vec3 base, dye;
  uniform vec4 drags[12];
  uniform float dragR[12];
  uniform int ss;
  const float ANG = -.04, T = 2.3, N = 20.;
  ${A}
  vec3 weave(vec2 q){
    vec2 id = floor(q/T), f = fract(q/T);
    vec3 cw = mix(base, dye, mod(floor(id.x/N), 2.));
    vec3 cf = mix(base, dye, mod(floor(id.y/N), 2.));
    cw *= .93 + .12*noise(vec2(id.x*1.7, q.y/26.));
    cf *= .93 + .12*noise(vec2(q.x/26., id.y*1.7));
    float pw = sin(3.1416*f.x), pf = sin(3.1416*f.y);
    return mod(id.x + id.y, 2.) < 1.
      ? cw*(.7 + .32*sqrt(pw))*(.92 + .08*pf)
      : cf*(.7 + .32*sqrt(pf))*(.92 + .08*pw);
  }
  void main(){
    vec2 css0 = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y)/dpr;
    vec2 sc = (css0 - view*.5)/zoom;
    float cr = cos(spin), sr = sin(spin);
    vec2 w0 = vec2(cr*sc.x + sr*sc.y, -sr*sc.x + cr*sc.y) + cam;
    // a passing hand carries the cloth along: it bunches up ahead of the hand and stretches behind it,
    // then springs back. disp is how far the weave moved, g the slope of the little rucks it makes.
    vec2 disp = vec2(0.), g = vec2(0.);
    for (int i = 0; i < 12; i++) {
      vec4 k = drags[i];
      if (k.z == 0. && k.w == 0.) continue;
      float r2 = dragR[i]*dragR[i];
      vec2 d = w0 - k.xy;
      float G = exp(-dot(d, d)/r2);
      if (G < .004) continue;
      float ad = dot(k.zw, d);
      disp += k.zw*G;
      // height = -div(disp) = 2 (A.d)/r2 G, and its gradient
      g += 2.*G/r2*(k.zw - 2.*ad*d/r2);
    }
    g *= 26.;
    vec4 F = texture(field, (w0 - rect.xy)/(rect.zw - rect.xy));
    vec2 slack = (F.gb - .5)*16.;
    float c = cos(ANG), s = sin(ANG);
    mat2 R = mat2(c, -s, s, c);
    vec3 col = vec3(0);
    if (ss == 4) {
      for (int i = 0; i < 4; i++) {
        vec2 off = vec2(float(i & 1), float(i >> 1)) - .5;
        col += weave(R*(w0 - disp + off*.5/dpr) + slack);
      }
      col *= .25;
    } else {
      col = (weave(R*(w0 - disp - .25/dpr) + slack) + weave(R*(w0 - disp + .25/dpr) + slack))*.5;
    }
    // only the light catching the rucks changes; nothing presses a dark hollow into the mat
    vec3 n = normalize(vec3(-g, 1.));
    float shade = F.r*2.*(1. + (dot(n, L) - L.z)/L.z*.9);
    col *= 1. - (F.a - .5)*.08;
    col *= .975 + .05*hash(gl_FragCoord.xy);
    vec2 lu = (w0 - wrect.xy)/(wrect.zw - wrect.xy);
    float S = texture(leafTex, lu).r;
    vec4 tT = texture(occT, lu), tW = texture(occW, lu);
    float hgt = tW.r > .002 ? tW.g/tW.r*600. : 0.;
    float occ = mix(tT.r, tW.r, clamp(hgt/150., 0., 1.));
    // a card overhead also blocks some of the open sky, most of all when it is close
    float ao = tW.r*(.22 + .3*exp(-hgt/90.));
    vec3 light = AMB*(1. - ao) + (SUN - AMB)*S*(1. - occ*.96);
    o = vec4(col*shade*light, 1.);
  }`,
    Te = `#version 300 es
  precision highp float;
  in vec3 vP; in vec3 vN; in vec2 vUV; in vec3 vQ; in vec3 vT; in vec3 vO; in float vC;
  out vec4 o;
  uniform sampler2D texA, texB, texS, leafTex, occT, occW;
  uniform int mode;
  uniform float mixB, alphaMul, sigReveal, gloss, glossBack, zoom, sheen, dapple;
  uniform vec2 cam;
  uniform vec4 wrect;
  ${A}
  uniform vec4 crumple;
  float ch(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)))*43758.5453); }
  const float FSZ = 2.1;
  vec3 h3(vec3 p){ p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6))); return fract(sin(p)*43758.5453); }
  // the facets of a crumpled ball: each patch of paper is a flat plane, tipped a little and set a little in or
  // out; where a lower plane meets a higher one there is a lip, and a shadow tucked under it. p is where this
  // bit of paper sits on the finished ball (a unit sphere), scaled to the facet size.
  // returns (height off the sphere, as a share of its radius; how deep in shadow; distance to the edge), and the plane's tilt
  vec3 warp(vec3 p){ return p + (vec3(sin(p.y*1.7 + 1.3), sin(p.z*1.9 + 4.1), sin(p.x*1.5 + 2.7)) + .5*vec3(sin(p.z*3.1), sin(p.x*2.9 + 1.), sin(p.y*3.3 + 2.)))*.32; }
  vec3 facets(vec3 p, float TL, float OF, float W, out vec3 tilt){
    vec3 P = normalize(p), i = floor(p);
    float d1 = 9., d2 = 9.; vec3 a1, a2;
    for (int z = -1; z <= 1; z++) for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec3 g = i + vec3(x, y, z), fp = g + h3(g);
      // weighted, so some facets grow big and others stay small, and every edge stays straight
      vec3 df = fp - p; float d = dot(df, df) - h3(g + 2.9).y*.55;
      if (d < d1) { d2 = d1; a2 = a1; d1 = d; a1 = g; } else if (d < d2) { d2 = d; a2 = g; }
    }
    vec3 c1 = normalize(a1 + h3(a1)), c2 = normalize(a2 + h3(a2));
    vec3 n1 = normalize(c1 + (h3(a1 + 31.7) - .5)*TL), n2 = normalize(c2 + (h3(a2 + 31.7) - .5)*TL);
    float o1 = (h3(a1 + 7.3).x - .5)*OF, o2 = (h3(a2 + 7.3).x - .5)*OF;
    float k1 = dot(c1*(1. + o1), n1)/max(dot(P, n1), .3) - 1., k2 = dot(c2*(1. + o2), n2)/max(dot(P, n2), .3) - 1.;
    // the step between two planes is eased over a short width, so it reads as a lip, not a stair
    float e = d2 - d1, w = smoothstep(0., W, e);
    tilt = n1 - P*dot(n1, P);
    return vec3(mix((k1 + k2)*.5, k1, w), smoothstep(.02, .07, k2 - k1)*exp(-e*16.), e);
  }
  // the same planes, blended smoothly, for the shape itself: the mesh can't hold a sharp step, the shading can
  float lumps(vec3 p, float TL, float OF){
    vec3 P = normalize(p), i = floor(p);
    float sw = 0., sh = 0.;
    for (int z = -1; z <= 1; z++) for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec3 g = i + vec3(x, y, z), fp = g + h3(g), c1 = normalize(fp);
      vec3 df = fp - p; float w = exp(-(dot(df, df) - h3(g + 2.9).y*.55)*10.);
      vec3 n1 = normalize(c1 + (h3(g + 31.7) - .5)*TL);
      float o1 = (h3(g + 7.3).x - .5)*OF;
      sh += w*(dot(c1*(1. + o1), n1)/max(dot(P, n1), .3) - 1.); sw += w;
    }
    return sh/max(sw, 1e-5);
  }
  void main(){
    vec3 V = normalize(vec3(cam, D/zoom) - vP);
    bool front = dot(vN, V) >= 0.;
    vec3 N = front ? vN : -vN;
    // a crumpled sheet: each facet's tilt is worked out here for every pixel so its creases are straight and
    // sharp, carried from the ball's frame into the sheet's as it opens
    float fold = 0.;
    if (crumple.y > 0.) {
      vec3 Q = normalize(vQ), t1, t2, t3;
      vec3 f = facets(Q*FSZ, .55, .1, .02, t1), g = facets(Q*FSZ*2.4 + 11.3, .5, .05, .02, t2), k = facets(Q*FSZ*6. + 5.1, .5, .02, .02, t3);
      vec3 dn = t1 + t2*.6 + t3*.35, E1 = normalize(vO - Q*dot(vO, Q)), E2 = cross(Q, E1);
      vec3 no = -normalize(vN), T = normalize(vT - no*dot(vT, no)), B = cross(no, T);
      vec3 Nout = normalize(no + (T*dot(dn, E1) + B*dot(dn, E2))*pow(vC, .35)*2.6);
      N = front ? -Nout : Nout;
      fold = .75*smoothstep(0., .5, (f.y + g.y*.7 + k.y*.4)*vC*vC);
    }
    vec4 c;
    if (mode == 1) {
      if (front) {
        c = texture(texA, vUV);
        vec4 sg = texture(texS, vUV);
        float m = smoothstep(sigReveal, sigReveal - .05, vUV.x - vUV.y*.18);
        c = c*(1. - sg.a*m) + sg*m;
      } else {
        c = texture(texB, vec2(1. - vUV.x, vUV.y));
      }
    } else if (mode == 2) {
      c = front ? texture(texA, vUV) : texture(texB, vUV);
    } else {
      c = mix(texture(texA, vUV), texture(texB, vUV), mixB);
    }
    c *= alphaMul;
    if (c.a < .01 && mode != 3) discard;
    // sunlight reaching this point: leaves are crisper and shifted on anything lifted toward them
    vec2 q = vP.xy - L.xy/L.z*vP.z;
    vec2 lu = (q - wrect.xy)/(wrect.zw - wrect.xy);
    vec2 lr = texture(leafTex, lu).rg;
    float S = mix(lr.r, lr.g, clamp(vP.z/300., 0., 1.));
    // something held up to read: its leaf shadow is kept faint so the words stay clear
    S = mix(S, 1., dapple);
    // a caustic: sunlight gathered by a glass, added on top of whatever is under it
    if (mode == 3) { o = vec4(c.rgb*S, 0.); return; }
    vec4 tT = texture(occT, lu), tW = texture(occW, lu);
    float hgt = tW.r > .002 ? tW.g/tW.r*600. : 0.;
    // only what stands clearly above this point shades it, fading in rather than switching on
    float occ = mix(tT.r, tW.r, clamp((hgt - vP.z)/150., 0., 1.))*smoothstep(vP.z + 3., vP.z + 28., hgt);
    float nl = dot(N, L);
    float d = max(nl, 0.)/L.z;
    vec3 light = (AMB + (SUN - AMB)*S*d*(1. - occ*.96))*(1. - fold);
    // leaves and petals are thin: sun on the far side still glows through, warmer and greener
    if (mode == 2) light += vec3(.5, .56, .3)*S*max(-nl, 0.)/L.z*(1. - occ)*.75;
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.), 220.)*(front ? gloss : glossBack)*S*(1. - occ)*step(0., dot(N, L));
    // paper's broad sheen: it slides across a stamp as it tilts
    spec += pow(max(dot(N, H), 0.), 26.)*sheen*S*(1. - occ)*step(0., dot(N, L));
    o = vec4(c.rgb*light + spec*c.a, c.a);
  }`;
  function be(d) {
    const e = d.getContext("webgl2", {
      antialias: !0,
      alpha: !1,
      premultipliedAlpha: !0,
      depth: !0,
      powerPreference: "high-performance",
    });
    if (!e) return null;
    const D = e.getExtension("EXT_texture_filter_anisotropic");
    function E(t, o) {
      const a = (c, n) => {
          const u = e.createShader(c);
          if (
            (e.shaderSource(u, n),
            e.compileShader(u),
            !e.getShaderParameter(u, e.COMPILE_STATUS))
          )
            throw new Error(
              e.getShaderInfoLog(u) +
                `
` +
                n.slice(0, 200),
            );
          return u;
        },
        r = e.createProgram();
      if (
        (e.attachShader(r, a(e.VERTEX_SHADER, t)),
        e.attachShader(r, a(e.FRAGMENT_SHADER, o)),
        e.bindAttribLocation(r, 0, "a"),
        e.linkProgram(r),
        !e.getProgramParameter(r, e.LINK_STATUS))
      )
        throw new Error(e.getProgramInfoLog(r));
      const s = {};
      return {
        p: r,
        u: (c) => (c in s ? s[c] : (s[c] = e.getUniformLocation(r, c))),
      };
    }
    const l = {
      field: E(O, de),
      leaf: E(O, me),
      blur: E(O, we),
      mat: E(O, ye),
      occ: E(te(!0), pe),
      obj: E(te(!1), Te),
      mocc: E(oe(!0), xe),
      mesh: E(oe(!1), ge),
    };
    function Ee(t) {
      const o = e.createVertexArray();
      e.bindVertexArray(o);
      const a = (r, s, c) => {
        (e.bindBuffer(e.ARRAY_BUFFER, e.createBuffer()),
          e.bufferData(e.ARRAY_BUFFER, new Float32Array(r), e.STATIC_DRAW),
          e.enableVertexAttribArray(s),
          e.vertexAttribPointer(s, c, e.FLOAT, !1, 0, 0));
      };
      return (
        a(t.p, 0, 3),
        a(t.n, 1, 3),
        a(t.t, 2, 2),
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, e.createBuffer()),
        e.bufferData(
          e.ELEMENT_ARRAY_BUFFER,
          new Uint32Array(t.i),
          e.STATIC_DRAW,
        ),
        e.bindVertexArray(null),
        { vao: o, count: t.i.length }
      );
    }
    function ae(t, o, a, r) {
      (e.uniformMatrix3fv(t.u("M"), !1, o.M),
        e.uniformMatrix3fv(t.u("MN"), !1, o.MN),
        e.uniform3f(t.u("pos"), o.pos[0], o.pos[1], o.pos[2]),
        e.uniform2f(t.u("cam"), a[0], a[1]),
        e.uniform1f(t.u("zoom"), B.zoom),
        e.uniform1f(t.u("spin"), B.spin),
        e.uniform2f(t.u("view"), R, P),
        e.uniform4f(t.u("wrect"), ...r));
    }
    function re(t) {
      (e.bindVertexArray(t.mesh.vao),
        e.drawElements(e.TRIANGLES, t.mesh.count, e.UNSIGNED_INT, 0));
    }
    function ce(t, o, a, r) {
      (e.useProgram(o.p),
        v(o, "leafTex", 3, y.tex),
        v(o, "occT", 4, U.tex),
        v(o, "occW", 5, S.tex));
      for (const s of t) {
        const c = s.mat;
        (ae(o, s, a, r),
          v(o, "tex", 0, c.tex),
          e.uniform1f(o.u("useTex"), c.tex ? 1 : 0),
          e.uniform4fv(o.u("color"), c.color || [1, 1, 1, 1]),
          e.uniform1f(o.u("gloss"), c.gloss || 0),
          e.uniform1f(o.u("specPow"), c.specPow || 80),
          e.uniform1f(o.u("sheen"), c.sheen || 0),
          e.uniform1f(
            o.u("opacity"),
            (c.opacity == null ? 1 : c.opacity) *
              (s.alpha == null ? 1 : s.alpha),
          ),
          e.uniform1f(o.u("refl"), c.refl || 0),
          e.uniform1f(o.u("metal"), c.metal || 0),
          re(s));
      }
    }
    const W = e.createVertexArray();
    e.bindVertexArray(W);
    const ze = e.createBuffer();
    (e.bindBuffer(e.ARRAY_BUFFER, ze),
      e.bufferData(
        e.ARRAY_BUFFER,
        new Float32Array([-0.5, -0.5, 1.5, -0.5, -0.5, 1.5]),
        e.STATIC_DRAW,
      ),
      e.enableVertexAttribArray(0),
      e.vertexAttribPointer(0, 2, e.FLOAT, !1, 0, 0));
    function Q(t, o) {
      const a = [],
        r = [];
      for (let c = 0; c <= o; c++)
        for (let n = 0; n <= t; n++) a.push(n / t - 0.5, c / o - 0.5);
      for (let c = 0; c < o; c++)
        for (let n = 0; n < t; n++) {
          const u = c * (t + 1) + n;
          r.push(u, u + 1, u + t + 1, u + 1, u + t + 2, u + t + 1);
        }
      const s = e.createVertexArray();
      return (
        e.bindVertexArray(s),
        e.bindBuffer(e.ARRAY_BUFFER, e.createBuffer()),
        e.bufferData(e.ARRAY_BUFFER, new Float32Array(a), e.STATIC_DRAW),
        e.enableVertexAttribArray(0),
        e.vertexAttribPointer(0, 2, e.FLOAT, !1, 0, 0),
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, e.createBuffer()),
        e.bufferData(e.ELEMENT_ARRAY_BUFFER, new Uint16Array(r), e.STATIC_DRAW),
        e.bindVertexArray(null),
        { vao: s, count: r.length }
      );
    }
    const Ae = Q(48, 8),
      Re = Q(14, 14),
      Pe = Q(160, 160),
      ne = (t) => {
        const o = t.crumple ? Pe : t.quad ? Re : Ae;
        (e.bindVertexArray(o.vao),
          e.drawElements(e.TRIANGLES, o.count, e.UNSIGNED_SHORT, 0));
      };
    function N(t, o) {
      const a = e.createTexture();
      (e.bindTexture(e.TEXTURE_2D, a),
        e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.RGBA8,
          t,
          o,
          0,
          e.RGBA,
          e.UNSIGNED_BYTE,
          null,
        ),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE));
      const r = e.createFramebuffer();
      return (
        e.bindFramebuffer(e.FRAMEBUFFER, r),
        e.framebufferTexture2D(
          e.FRAMEBUFFER,
          e.COLOR_ATTACHMENT0,
          e.TEXTURE_2D,
          a,
          0,
        ),
        e.bindFramebuffer(e.FRAMEBUFFER, null),
        { tex: a, fb: r, w: t, h: o }
      );
    }
    function ie(t) {
      t && (e.deleteTexture(t.tex), e.deleteFramebuffer(t.fb));
    }
    function se(t) {
      const o = e.createTexture();
      return (le(o, t), o);
    }
    function le(t, o) {
      (e.bindTexture(e.TEXTURE_2D, t),
        e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
        e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, o),
        e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
        e.generateMipmap(e.TEXTURE_2D),
        e.texParameteri(
          e.TEXTURE_2D,
          e.TEXTURE_MIN_FILTER,
          e.LINEAR_MIPMAP_LINEAR,
        ),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
        D &&
          e.texParameterf(
            e.TEXTURE_2D,
            D.TEXTURE_MAX_ANISOTROPY_EXT,
            Math.min(8, e.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),
          ));
    }
    const _e = (() => {
      const t = document.createElement("canvas");
      return ((t.width = t.height = 2), se(t));
    })();
    let R = 1,
      P = 1,
      Y = 1,
      q = 240,
      z = null,
      g = [0, 0, 1, 1],
      y = null,
      _ = null,
      L = null,
      U = null,
      S = null;
    const fe = 0.42,
      I = 0.5;
    let K = new Float32Array(48),
      $ = new Float32Array(48),
      Z = new Float32Array(16),
      J = 0,
      ee = 0;
    function Fe(t, o, a, r, s = 0) {
      ((R = t),
        (P = o),
        (Y = a),
        (d.width = Math.round(t * a)),
        (d.height = Math.round(o * a)),
        (q = Math.round(Math.max(200, Math.min(t, o) * 0.3))),
        ie(z),
        (g = [
          -t * 2 - 300,
          -o * 1.9 - 300,
          r + t / 2 + 300,
          Math.max(o * 1.9, s + o) + 300,
        ]));
      const c = Math.max(4, (g[2] - g[0]) / 4096, (g[3] - g[1]) / 4096);
      ((z = N(Math.ceil((g[2] - g[0]) / c), Math.ceil((g[3] - g[1]) / c))),
        e.bindFramebuffer(e.FRAMEBUFFER, z.fb),
        e.viewport(0, 0, z.w, z.h),
        e.disable(e.DEPTH_TEST),
        e.disable(e.BLEND),
        e.useProgram(l.field.p),
        e.uniform2f(l.field.u("fres"), z.w, z.h),
        e.uniform4f(l.field.u("rect"), ...g),
        e.bindVertexArray(W),
        e.drawArrays(e.TRIANGLES, 0, 3));
      const n = t + 2 * q,
        u = o + 2 * q;
      for (const h of [y, _, L, U, S]) ie(h);
      y = N(Math.ceil(n * fe), Math.ceil(u * fe));
      const T = Math.ceil(n * I),
        w = Math.ceil(u * I);
      ((_ = N(T, w)),
        (L = N(T, w)),
        (U = N(T, w)),
        (S = N(T, w)),
        e.bindFramebuffer(e.FRAMEBUFFER, null));
    }
    function Me(t, o) {
      (K.fill(0), $.fill(0), Z.fill(0), (J = Math.min(12, t.length)));
      for (let a = 0; a < J; a++)
        (K.set(t[a].slice(0, 4), a * 4), $.set(t[a].slice(4, 8), a * 4));
      ee = Math.min(4, o.length);
      for (let a = 0; a < ee; a++) Z.set(o[a], a * 4);
    }
    const B = { zoom: 1, spin: 0 };
    function ue(t, o, a, r) {
      (e.uniform3f(t.u("pos"), o.pos[0], o.pos[1], o.pos[2]),
        e.uniform2f(t.u("size"), o.size[0], o.size[1]),
        e.uniform3f(
          t.u("rot"),
          o.rot ? o.rot[0] : 0,
          o.rot ? o.rot[1] : 0,
          o.rot ? o.rot[2] : 0,
        ),
        e.uniform2f(
          t.u("bend"),
          o.bend ? o.bend[0] : 0,
          o.bend ? o.bend[1] : 0,
        ));
      const s = o.curl || [1, 0, 0, 0, 0];
      (e.uniform3f(t.u("curlA"), s[0], s[1], s[2]),
        e.uniform2f(t.u("curlB"), s[3], s[4]));
      const c = o.crumple || [0, 0, 0, 0];
      (e.uniform4f(t.u("crumple"), c[0], c[1], c[2], c[3]),
        e.uniform1f(t.u("shape"), o.quad ? 1 : 0),
        e.uniform3f(t.u("quad"), ...(o.quad || [0, 0, 0])),
        e.uniform2f(t.u("cam"), a[0], a[1]),
        e.uniform1f(t.u("zoom"), B.zoom),
        e.uniform1f(t.u("spin"), B.spin),
        e.uniform2f(t.u("view"), R, P),
        e.uniform4f(t.u("wrect"), ...r),
        e.uniform1i(t.u("mode"), o.mode || 0),
        e.uniform1f(t.u("alphaMul"), o.alpha == null ? 1 : o.alpha));
    }
    function v(t, o, a, r) {
      (e.activeTexture(e.TEXTURE0 + a),
        e.bindTexture(e.TEXTURE_2D, r || _e),
        e.uniform1i(t.u(o), a));
    }
    function G(t, o, a, r) {
      (e.bindFramebuffer(e.FRAMEBUFFER, o.fb),
        e.viewport(0, 0, o.w, o.h),
        e.useProgram(l.blur.p),
        v(l.blur, "src", 0, t.tex),
        e.uniform2f(l.blur.u("res"), o.w, o.h),
        e.uniform2f(l.blur.u("dir"), a / o.w, r / o.h),
        e.drawArrays(e.TRIANGLES, 0, 3));
    }
    function Ne({
      cam: t,
      camY: o = 0,
      time: a,
      gust: r,
      soft: s,
      drags: c,
      dragR: n,
      colors: u,
      objects: T,
      meshes: w = [],
      zoom: h = 1,
      spin: p = 0,
    }) {
      const x = [t, o],
        F = Math.abs(Math.cos(p)),
        C = Math.abs(Math.sin(p)),
        M = ((R / 2) * F + (P / 2) * C) / h + q,
        X = ((P / 2) * F + (R / 2) * C) / h + q,
        b = [t - M, o - X, t + M, o + X];
      ((B.zoom = h),
        (B.spin = p),
        e.disable(e.DEPTH_TEST),
        e.disable(e.BLEND),
        e.bindVertexArray(W),
        e.bindFramebuffer(e.FRAMEBUFFER, y.fb),
        e.viewport(0, 0, y.w, y.h),
        e.useProgram(l.leaf.p),
        e.uniform2f(l.leaf.u("fres"), y.w, y.h),
        e.uniform4f(l.leaf.u("rect"), ...b),
        e.uniform1f(l.leaf.u("time"), a),
        e.uniform1f(l.leaf.u("gust"), r),
        e.uniform1f(l.leaf.u("soft"), s),
        e.uniform4fv(l.leaf.u("B"), K),
        e.uniform4fv(l.leaf.u("C"), $),
        e.uniform1i(l.leaf.u("nB"), J),
        e.uniform4fv(l.leaf.u("K"), Z),
        e.uniform1i(l.leaf.u("nK"), ee),
        e.drawArrays(e.TRIANGLES, 0, 3),
        e.bindFramebuffer(e.FRAMEBUFFER, _.fb),
        e.viewport(0, 0, _.w, _.h),
        e.clearColor(0, 0, 0, 1),
        e.clear(e.COLOR_BUFFER_BIT),
        e.useProgram(l.occ.p),
        e.enable(e.BLEND),
        e.blendEquation(e.MAX));
      for (const i of T)
        i.alpha !== 0 &&
          (ue(l.occ, i, x, b), v(l.occ, "texA", 0, i.texA), ne(i));
      e.useProgram(l.mocc.p);
      for (const i of w) {
        const ve = i.mat.shadow == null ? 1 : i.mat.shadow;
        !ve ||
          i.alpha === 0 ||
          (ae(l.mocc, i, x, b),
          e.uniform1f(l.mocc.u("shadow"), ve * (i.alpha == null ? 1 : i.alpha)),
          re(i));
      }
      (e.blendEquation(e.FUNC_ADD), e.disable(e.BLEND), e.bindVertexArray(W));
      const V = 4 * I,
        k = 26 * I;
      (G(_, L, V / 6, 0),
        G(L, U, 0, V / 6),
        G(_, L, k / 6, 0),
        G(L, S, 0, k / 6),
        e.bindFramebuffer(e.FRAMEBUFFER, null),
        e.viewport(0, 0, d.width, d.height),
        e.clearDepth(1),
        e.clear(e.DEPTH_BUFFER_BIT));
      const f = l.mat;
      (e.useProgram(f.p),
        v(f, "field", 0, z.tex),
        v(f, "leafTex", 1, y.tex),
        v(f, "occT", 2, U.tex),
        v(f, "occW", 3, S.tex),
        e.uniform2f(f.u("res"), d.width, d.height),
        e.uniform2f(f.u("view"), R, P),
        e.uniform2f(f.u("cam"), x[0], x[1]),
        e.uniform1f(f.u("dpr"), Y),
        e.uniform1f(f.u("zoom"), h),
        e.uniform1f(f.u("spin"), p),
        e.uniform4f(f.u("rect"), ...g),
        e.uniform4f(f.u("wrect"), ...b),
        e.uniform3fv(f.u("base"), u.base),
        e.uniform3fv(f.u("dye"), u.dye),
        e.uniform4fv(f.u("drags"), c),
        e.uniform1fv(f.u("dragR"), n),
        e.uniform1i(f.u("ss"), Y >= 1.5 ? 2 : 4),
        e.drawArrays(e.TRIANGLES, 0, 3),
        e.enable(e.DEPTH_TEST),
        e.depthFunc(e.LEQUAL),
        e.enable(e.BLEND),
        e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA));
      const H = w.filter((i) => !i.mat.clear),
        j = w.filter((i) => i.mat.clear);
      ce(H, l.mesh, x, b);
      const m = l.obj;
      (e.useProgram(m.p),
        v(m, "leafTex", 3, y.tex),
        v(m, "occT", 4, U.tex),
        v(m, "occW", 5, S.tex));
      for (const i of T)
        i.alpha !== 0 &&
          (ue(m, i, x, b),
          v(m, "texA", 0, i.texA),
          v(m, "texB", 1, i.texB || i.texA),
          v(m, "texS", 2, i.texS),
          e.uniform1f(m.u("mixB"), i.mixB || 0),
          e.uniform1f(
            m.u("sigReveal"),
            i.sig == null ? (i.texS ? 2 : -1) : i.sig,
          ),
          e.uniform1f(m.u("gloss"), i.gloss == null ? 0.05 : i.gloss),
          e.uniform1f(
            m.u("glossBack"),
            i.glossBack == null ? 0.05 : i.glossBack,
          ),
          e.uniform1f(m.u("sheen"), i.sheen || 0),
          e.uniform1f(m.u("dapple"), i.dapple || 0),
          ne(i));
      (e.depthMask(!1),
        ce(j, l.mesh, x, b),
        e.depthMask(!0),
        e.disable(e.DEPTH_TEST),
        e.disable(e.BLEND));
    }
    function Le(t, o, a) {
      const [r, s] = t.bend || [0, 0],
        c = r + s * o;
      let n =
        Math.abs(s) < 1e-6
          ? [o * Math.cos(r), a, o * Math.sin(r)]
          : [
              (Math.sin(c) - Math.sin(r)) / s,
              a,
              (Math.cos(r) - Math.cos(c)) / s,
            ];
      if (t.curl && t.curl[3] > 0) {
        const [x, F, C, M, X] = t.curl,
          b = o * x + a * F,
          V = -o * F + a * x,
          k = b - C;
        let f = b,
          H = 0;
        if (k > 0) {
          const j = Math.min(k / M, Math.PI);
          ((f = C + M * Math.sin(j) - Math.max(k - Math.PI * M, 0)),
            (H = M * (1 - Math.cos(j))));
        }
        ((f += X), (n = [x * f - F * V, F * f + x * V, H]));
      }
      const [u, T, w] = t.rot || [0, 0, 0];
      let h = Math.cos(T),
        p = Math.sin(T);
      return (
        (n = [n[0], n[1] * h - n[2] * p, n[1] * p + n[2] * h]),
        (h = Math.cos(w)),
        (p = Math.sin(w)),
        (n = [n[0] * h + n[2] * p, n[1], -n[0] * p + n[2] * h]),
        (h = Math.cos(u)),
        (p = Math.sin(u)),
        (n = [n[0] * h - n[1] * p, n[0] * p + n[1] * h, n[2]]),
        [t.pos[0] + n[0], t.pos[1] + n[1], t.pos[2] + n[2]]
      );
    }
    function Ue(t, o, a = 0) {
      const r = 1800 / (1800 - t[2]);
      return [(t[0] - o) * r + R / 2, (t[1] - a) * r + P / 2];
    }
    return {
      resize: Fe,
      branches: Me,
      texture: se,
      upload: le,
      render: Ne,
      point: Le,
      toScreen: Ue,
      mesh: Ee,
      gl: e,
    };
  }
  return { create: be, D: 1800, L: he };
})();
