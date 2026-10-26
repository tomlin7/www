// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
window.Nature = (() => {
  const C = Math.PI * 2;
  function N(g) {
    let u = g >>> 0 || 1;
    return () => (u = (u * 1664525 + 1013904223) >>> 0) / 4294967296;
  }
  const Y = (g, u) => {
      const M = document.createElement("canvas");
      return ((M.width = Math.round(g)), (M.height = Math.round(u)), M);
    },
    k = (g, u, M, d = 1) => `hsla(${g},${u}%,${M}%,${d})`,
    $ = (g, u = 0, M = 1) => Math.min(M, Math.max(u, g)),
    H = (g) => 1 - Math.pow(1 - g, 3),
    U = {
      fig: {
        aspect: 0.4,
        stalk: 0.13,
        veins: 9,
        angle: 0.95,
        reach: 0.15,
        shape: (g) => Math.pow(Math.sin(Math.PI * Math.pow(g, 0.72)), 0.85),
        top: [
          [98, 44, 24],
          [104, 46, 22],
          [92, 42, 29],
        ],
        under: [88, 22, 47],
        vein: [78, 42, 44],
        stalkCol: [80, 38, 34],
      },
      mango: {
        aspect: 0.25,
        stalk: 0.1,
        veins: 15,
        angle: 1.2,
        reach: 0.08,
        shape: (g) => Math.pow(Math.sin(Math.PI * Math.pow(g, 0.85)), 1.05),
        top: [
          [112, 38, 20],
          [118, 40, 18],
          [104, 36, 24],
        ],
        under: [96, 18, 44],
        vein: [70, 40, 46],
        stalkCol: [20, 40, 34],
      },
      young: {
        aspect: 0.37,
        stalk: 0.12,
        veins: 8,
        angle: 0.9,
        reach: 0.16,
        shape: (g) => Math.pow(Math.sin(Math.PI * Math.pow(g, 0.7)), 0.8),
        top: [
          [86, 50, 38],
          [90, 52, 35],
          [80, 50, 42],
        ],
        under: [80, 30, 58],
        vein: [76, 46, 50],
        stalkCol: [76, 40, 46],
      },
      dry: {
        aspect: 0.4,
        stalk: 0.13,
        veins: 9,
        angle: 0.95,
        reach: 0.15,
        dry: !0,
        shape: (g) => Math.pow(Math.sin(Math.PI * Math.pow(g, 0.72)), 0.85),
        top: [
          [40, 72, 44],
          [32, 70, 40],
          [26, 62, 36],
        ],
        under: [36, 40, 58],
        vein: [42, 70, 60],
        stalkCol: [24, 45, 28],
      },
    };
  function O(g, u) {
    const M = U[g],
      d = N(u),
      q = 512,
      b = 6,
      x = (q - b * 2) / (1 + M.stalk),
      j = x * M.aspect * 0.5,
      L = Math.ceil(j * 2 * 1.08 + b * 2),
      m = b + M.stalk * x,
      A = L / 2,
      z = (d() - 0.5) * 0.05 * x,
      R = 1 + (d() - 0.5) * 0.14,
      r = (a) => A + z * Math.sin(Math.PI * a),
      T = 90,
      E = [];
    for (let a = 0; a <= T; a++)
      E.push(1 + (d() - 0.5) * (M.dry ? 0.05 : 0.02));
    const w = (a, c) => {
        const t = Math.round(a * T);
        return r(a) + c * j * M.shape(a) * E[t] * (c > 0 ? R : 1 / R);
      },
      B = (a) => {
        a.beginPath();
        for (let c = 0; c <= T; c++) {
          const t = c / T;
          a.lineTo(m + t * x, w(t, -1));
        }
        for (let c = T; c >= 0; c--) {
          const t = c / T;
          a.lineTo(m + t * x, w(t, 1));
        }
        a.closePath();
      },
      W = [];
    for (let a = 0; a < M.veins * 2; a++)
      W.push([(d() - 0.5) * 0.5, (d() - 0.5) * 0.25, d()]);
    const I = (a, c, t) => {
      const l = W[c * 2 + (t > 0 ? 1 : 0)],
        h = 0.05 + (c + 0.5 + l[0]) * (0.88 / M.veins),
        f = Math.min(0.97, h + M.reach + 0.05 * l[2]),
        y = m + h * x,
        e = m + f * x,
        n = r(f) + (w(f, t) - r(f)) * (0.84 + 0.1 * l[2]),
        i = M.angle + l[1],
        s = y + Math.cos(i) * j * 0.5,
        p = r(h) + t * Math.sin(i) * j * 0.55;
      (a.beginPath(), a.moveTo(y, r(h)), a.quadraticCurveTo(s, p, e, n));
    };
    function _(a) {
      const c = Y(q, L),
        t = c.getContext("2d"),
        l = M.stalkCol;
      t.lineCap = "round";
      const h = t.createLinearGradient(b, 0, m, 0);
      (h.addColorStop(0, k(l[0], l[1], l[2] - 6)),
        h.addColorStop(1, k(l[0], l[1], l[2] + 8)),
        (t.strokeStyle = h));
      for (let n = 7; n >= 3; n -= 2)
        ((t.lineWidth = n * (x / 420)),
          t.beginPath(),
          t.moveTo(b + 2, A + z * 0.4 + 3),
          t.quadraticCurveTo((b + m) / 2, A + 2, m + 4, r(0.01)),
          t.stroke());
      (t.save(), B(t), t.clip());
      const f = M.top,
        y = t.createLinearGradient(m, 0, m + x, 0);
      if (a) {
        const n = M.under;
        (y.addColorStop(0, k(n[0], n[1], n[2] + 4)),
          y.addColorStop(1, k(n[0] - 4, n[1], n[2] - 2)));
      } else
        f.forEach((n, i) =>
          y.addColorStop(
            i / (f.length - 1),
            k(n[0] + (d() - 0.5) * 6, n[1], n[2]),
          ),
        );
      ((t.fillStyle = y), t.fillRect(0, 0, q, L));
      for (let n = 0; n < 2; n++)
        (t.save(),
          B(t),
          (t.lineWidth = M.dry ? 26 + n * 18 : 14 + n * 10),
          (t.strokeStyle = M.dry
            ? k(20, 55, 22, a ? 0.18 : 0.38)
            : k(f[0][0] + 10, 50, 14, a ? 0.06 : 0.16)),
          (t.filter = `blur(${6 + n * 6}px)`),
          t.stroke(),
          t.restore());
      t.filter = "none";
      for (let n = 0; n < 70; n++) {
        const i = m + d() * x,
          s = A + (d() - 0.5) * j * 2,
          p = 6 + d() * 26,
          v = d() < 0.5,
          S = t.createRadialGradient(i, s, 0, i, s, p);
        (S.addColorStop(
          0,
          M.dry
            ? v
              ? k(46, 80, 60, 0.18)
              : k(22, 60, 26, 0.16)
            : v
              ? k(70, 60, 55, a ? 0.03 : 0.05)
              : k(120, 40, 12, a ? 0.03 : 0.07),
        ),
          S.addColorStop(1, "rgba(0,0,0,0)"),
          (t.fillStyle = S),
          t.fillRect(i - p, s - p, p * 2, p * 2));
      }
      if (M.dry) {
        for (let n = 0; n < 4; n++) {
          const i = 0.15 + d() * 0.75,
            s = d() < 0.5 ? -1 : 1,
            p = m + i * x,
            v = w(i, s),
            S = 14 + d() * 26;
          ((t.filter = "blur(5px)"),
            (t.fillStyle = k(22, 55, 24, a ? 0.25 : 0.5)),
            t.beginPath(),
            t.ellipse(p, v, S * 1.3, S, d() * 3, 0, C),
            t.fill());
        }
        for (let n = 0; n < 9; n++) {
          const i = m + (0.1 + d() * 0.85) * x,
            s = A + (d() - 0.5) * j * 1.3,
            p = 3 + d() * 7;
          ((t.filter = "blur(4px)"),
            (t.fillStyle = k(46, 70, 60, a ? 0.15 : 0.3)),
            t.beginPath(),
            t.arc(i, s, p * 2.2, 0, C),
            t.fill(),
            (t.filter = "blur(0.8px)"));
          for (let v = 0; v < 7; v++)
            ((t.fillStyle = k(
              18,
              50,
              16 + d() * 12,
              a ? 0.35 : 0.55 + d() * 0.3,
            )),
              t.beginPath(),
              t.ellipse(
                i + (d() - 0.5) * p * 1.6,
                s + (d() - 0.5) * p * 1.6,
                p * (0.25 + d() * 0.5),
                p * (0.2 + d() * 0.4),
                d() * 3,
                0,
                C,
              ),
              t.fill());
        }
        t.filter = "none";
      }
      const e = M.vein;
      t.lineWidth = 0.6;
      for (let n = 0; n < 260; n++) {
        const i = m + d() * x,
          s = A + (d() - 0.5) * j * 2;
        ((t.strokeStyle = k(e[0], e[1], e[2] + 10, a ? 0.16 : 0.07)),
          t.beginPath(),
          t.moveTo(i, s),
          t.lineTo(i + (d() - 0.5) * 22, s + (d() - 0.5) * 22),
          t.stroke());
      }
      for (let n = 0; n < M.veins; n++)
        for (const i of [-1, 1]) {
          const s = (a ? 2.4 : 1.5) * (1 - (n / M.veins) * 0.5) * (x / 420);
          (a ||
            (t.save(),
            t.translate(0, 1.2),
            I(t, n, i),
            (t.lineWidth = s * 1.8),
            (t.strokeStyle = k(f[1][0] + 10, 45, 10, 0.12)),
            t.stroke(),
            t.restore()),
            I(t, n, i),
            (t.lineWidth = s),
            (t.strokeStyle = a
              ? k(e[0], e[1] - 10, e[2] + 18, 0.5)
              : k(e[0], e[1], e[2], M.dry ? 0.32 : 0.3)),
            t.stroke());
        }
      for (let n = 0; n < 40; n++) {
        const i = n / 40,
          s = (n + 1) / 40,
          p = ((a ? 7 : 4.5) * (1 - i) + 0.8) * (x / 420);
        ((t.lineWidth = p),
          (t.strokeStyle = a
            ? k(e[0], e[1] - 6, e[2] + 22, 0.9)
            : k(e[0], e[1], e[2] + 2, 0.7)),
          t.beginPath(),
          t.moveTo(m + i * x, r(i)),
          t.lineTo(m + s * x + 0.5, r(s)),
          t.stroke());
      }
      for (let n = 0; n < 2600; n++)
        ((t.fillStyle =
          d() < 0.5 ? "rgba(255,255,230,.05)" : "rgba(0,20,0,.06)"),
          t.fillRect(m + d() * x, A + (d() - 0.5) * j * 2, 1.2, 1.2));
      return (
        t.restore(),
        B(t),
        (t.lineWidth = 1.1),
        (t.strokeStyle = M.dry ? k(20, 50, 20, 0.6) : k(f[1][0], 40, 14, 0.45)),
        t.stroke(),
        c
      );
    }
    const F = _(!1),
      o = _(!0);
    if (g !== "young" && d() < 0.55)
      for (const a of [F, o]) {
        const c = a.getContext("2d");
        c.globalCompositeOperation = "destination-out";
        const t = 0.3 + d() * 0.5,
          l = d() < 0.5 ? -1 : 1,
          h = m + t * x,
          f = w(t, l),
          y = 6 + d() * 9;
        (c.beginPath(),
          c.arc(h, f, y, 0, C),
          c.arc(h + y * 0.9, f + l * y * 0.1, y * 0.7, 0, C),
          c.fill(),
          (c.globalCompositeOperation = "source-over"));
      }
    return { front: F, back: o, aspect: L / q };
  }
  const D = {
    white: {
      stops: [
        [0, "#e99a14"],
        [0.2, "#f6c33c"],
        [0.36, "#fbe49a"],
        [0.52, "#fff6dc"],
        [0.75, "#fffaf0"],
        [1, "#fffdf7"],
      ],
      under: [
        [0, "#d9cf86"],
        [0.3, "#f4eccd"],
        [1, "#fffaf0"],
      ],
      rim: "rgba(190,150,90,.25)",
    },
    pink: {
      stops: [
        [0, "#ec8f16"],
        [0.18, "#f7b53a"],
        [0.3, "#f6a0a4"],
        [0.5, "#ec5d8c"],
        [0.8, "#d93a74"],
        [1, "#c92a68"],
      ],
      under: [
        [0, "#e8b46a"],
        [0.3, "#f2a3b8"],
        [1, "#e2709a"],
      ],
      rim: "rgba(140,20,60,.3)",
    },
  };
  function K(g, u) {
    const M = D[g],
      d = N(u),
      q = 384,
      b = q / 2,
      x = q * 0.47,
      j = d() * C,
      L = [];
    for (let z = 0; z < 5; z++)
      L.push({
        a: j + (z / 5) * C + (d() - 0.5) * 0.12,
        l: x * (0.93 + d() * 0.08),
        w: 0.95 + d() * 0.12,
      });
    const m = (z, R) => {
      (z.save(), z.translate(b, b), z.rotate(R.a));
      const r = R.l,
        T = R.w;
      (z.beginPath(),
        z.moveTo(0, 0),
        z.bezierCurveTo(
          r * 0.12,
          -r * 0.26 * T,
          r * 0.38,
          -r * 0.58 * T,
          r * 0.74,
          -r * 0.47 * T,
        ),
        z.bezierCurveTo(
          r * 1.02,
          -r * 0.38 * T,
          r * 1.07,
          -r * 0.04,
          r * 0.92,
          r * 0.14 * T,
        ),
        z.bezierCurveTo(r * 0.74, r * 0.3 * T, r * 0.28, r * 0.14 * T, 0, 0),
        z.restore());
    };
    function A(z) {
      const R = Y(q, q),
        r = R.getContext("2d"),
        T = () => {
          const w = r.createRadialGradient(b, b, 0, b, b, x);
          return (
            (z ? M.under : M.stops).forEach(([B, W]) => w.addColorStop(B, W)),
            w
          );
        },
        E = (w, B) => {
          (r.save(),
            B &&
              ((r.shadowColor = "rgba(110,70,20,.34)"),
              (r.shadowBlur = q * 0.035)),
            m(r, w),
            (r.fillStyle = T()),
            r.fill(),
            r.restore(),
            r.save(),
            m(r, w),
            r.clip(),
            r.translate(b, b),
            r.rotate(w.a));
          const W = r.createLinearGradient(0, -w.l * 0.2, 0, w.l * 0.2);
          (W.addColorStop(0, "rgba(0,0,0,0)"),
            W.addColorStop(0.55, "rgba(150,110,60,.09)"),
            W.addColorStop(1, "rgba(255,255,255,.12)"),
            (r.fillStyle = W),
            r.fillRect(0, -w.l * 0.6, w.l * 1.1, w.l * 1.2),
            (r.lineWidth = 0.8));
          for (let I = 0; I < 9; I++) {
            const _ = -0.42 + (I / 8) * 0.6;
            ((r.strokeStyle =
              I % 2 ? "rgba(255,255,255,.12)" : "rgba(160,120,70,.06)"),
              r.beginPath(),
              r.moveTo(w.l * 0.1, 0),
              r.quadraticCurveTo(
                w.l * 0.5,
                Math.sin(_) * w.l * 0.3,
                w.l * 0.95,
                Math.sin(_) * w.l * 0.55,
              ),
              r.stroke());
          }
          (r.restore(),
            r.save(),
            m(r, w),
            (r.lineWidth = 1),
            (r.strokeStyle = M.rim),
            r.stroke(),
            r.restore());
        };
      if (
        (L.forEach((w) => E(w, !0)),
        r.save(),
        r.beginPath(),
        r.moveTo(b, b),
        r.arc(b, b, q, L[0].a - 1.45, L[0].a + 0.05),
        r.closePath(),
        r.clip(),
        E(L[0], !0),
        r.restore(),
        !z)
      ) {
        const w = r.createRadialGradient(b, b, 0, b, b, q * 0.05);
        (w.addColorStop(0, "rgba(150,90,10,.9)"),
          w.addColorStop(1, "rgba(230,150,30,0)"),
          (r.fillStyle = w),
          r.beginPath(),
          r.arc(b, b, q * 0.05, 0, C),
          r.fill());
      }
      return R;
    }
    return { front: A(!1), back: A(!0), aspect: 1 };
  }
  function J(g) {
    const u = N(7 + Math.floor(Math.random() * 1e6)),
      M = (o) => ({
        front: g.texture(o.front),
        back: g.texture(o.back),
        aspect: o.aspect,
      }),
      d = [
        M(O("fig", 11)),
        M(O("fig", 23)),
        M(O("mango", 5)),
        M(O("young", 8)),
        M(O("dry", 31)),
        M(O("dry", 44)),
      ],
      q = 4,
      b = [M(K("white", 3)), M(K("white", 9)), M(K("pink", 4))],
      x = [];
    let j = 3.8;
    const L = (o) => o * o * (3 - 2 * o),
      m = (o) => o - C * Math.round(o / C);
    function A(o, a) {
      const c = o.w * a + o.ph,
        t = Math.sin(c),
        l = o.yaw0 + o.yawR * a + 0.25 * Math.sin(a * 0.7 + o.ph2),
        h = o.flower ? o.ph2 : l + o.across,
        f = o.vx * a + Math.cos(h) * o.amp * t,
        y = o.vy * a + Math.sin(h) * o.amp * t,
        e = o.z0 - o.vz * a + o.amp * 0.32 * t * t,
        n = o.tilt * (o.flower ? 1 : t),
        s = (o.flower ? l * 0.9 + o.ph2 : h) - l,
        p = Math.cos(s),
        v = Math.sin(s),
        S = Math.sin(n);
      let P = Math.asin($(S * v, -1, 1));
      const G = Math.asin($((-S * p) / Math.cos(P), -1, 1));
      o.rollAt && (P += C * L($((a - o.rollAt) / 0.9)));
      const V = o.flower
        ? [
            o.cup + o.flex * Math.sin(c * 2),
            o.cup + o.flex * Math.cos(c * 2),
            0,
          ]
        : [
            o.curl + o.flex * Math.sin(2 * c + 0.5),
            o.cup + o.flex * 1.4 * Math.cos(c),
            o.twist * Math.sin(c + 1),
          ];
      return {
        x: f,
        y,
        z: e,
        yaw: l,
        ax: P,
        ay: G,
        q: V,
        vx: o.vx + Math.cos(h) * o.amp * o.w * Math.cos(c),
        vy: o.vy + Math.sin(h) * o.amp * o.w * Math.cos(c),
      };
    }
    const z = (o) => (o.flower ? [o.cup, o.cup, 0] : [o.curl, o.cup, 0]);
    function R(o, a, c) {
      const t = a - o.pos[0],
        l = c - o.pos[1],
        h = Math.cos(-o.rot[0]),
        f = Math.sin(-o.rot[0]);
      return [t * h - l * f, t * f + l * h];
    }
    function r(o, a, c) {
      const t = g.point(o, a, c),
        l = g.point(o, a + 2, c),
        h = g.point(o, a, c + 2),
        f = [l[0] - t[0], l[1] - t[1], l[2] - t[2]],
        y = [h[0] - t[0], h[1] - t[1], h[2] - t[2]];
      let e = [
        f[1] * y[2] - f[2] * y[1],
        f[2] * y[0] - f[0] * y[2],
        f[0] * y[1] - f[1] * y[0],
      ];
      const n = Math.hypot(...e) || 1;
      return (
        (e = e.map((i) => i / n)),
        e[2] < 0 && (e = e.map((i) => -i)),
        { p: t, n: e }
      );
    }
    function T(o, a) {
      const c = Math.cos(-a),
        t = Math.sin(-a),
        l = o[0] * c - o[1] * t,
        h = o[0] * t + o[1] * c;
      return [Math.asin($(-h, -1, 1)), Math.atan2(l, o[2])];
    }
    function E(o, a, c) {
      let t = null,
        l = 0.05;
      for (const h of o.supports) {
        if (!h.stable || h.obj.alpha === 0) continue;
        const [f, y] = R(h.obj, a, c),
          e = (h.fit || 0.96) / 2;
        if (Math.abs(f) > h.obj.size[0] * e || Math.abs(y) > h.obj.size[1] * e)
          continue;
        const n = g.point(h.obj, f, y)[2];
        n > l && ((l = n), (t = { sp: h, s: f, t: y }));
      }
      return t;
    }
    function w(o, a, c, t) {
      const l = [t.vx * 0.12, t.vy * 0.12],
        h = t.x + l[0],
        f = t.y + l[1],
        y = E(c, h, f);
      if (
        ((o.state = "rest"),
        (o.settle = { t0: a, ax: m(t.ax), ay: t.ay, q0: t.q }),
        y)
      ) {
        const e = y.sp.obj.rot[0],
          n = Math.cos(-e),
          i = Math.sin(-e);
        ((o.on = y.sp.id),
          (o.s = y.s),
          (o.t = y.t),
          (o.yawL = t.yaw - e),
          (o.settle.ds = [l[0] * n - l[1] * i, l[0] * i + l[1] * n]));
      } else
        ((o.on = null),
          (o.s = h),
          (o.t = f),
          (o.yawL = t.yaw),
          (o.settle.ds = l));
    }
    function B(o, a, c, t) {
      const l = $((a - o.settle.t0) / 0.55),
        h = H(l),
        f = (1 - l) * (1 - l) * Math.cos(l * 9),
        y = o.s - o.settle.ds[0] * (1 - h),
        e = o.t - o.settle.ds[1] * (1 - h),
        n = o.settle.q0.map((P, G) => P + (z(o)[G] - P) * h);
      let i,
        s,
        p,
        v,
        S = [0, 0, 1];
      if (o.on) {
        const P = t[o.on];
        if (!P) return o.cur ? { ...o.cur, q: n } : null;
        if (!P.stable) return "detach";
        const G = r(P.obj, y, e);
        ((s = P.obj.rot[0] + o.yawL),
          ([p, v] = T(G.n, s)),
          (i = G.p.map((V, Q) => V + G.n[Q] * o.clear)),
          (S = G.n));
      } else ((i = [y, e, o.clear]), (s = o.yawL), (p = 0), (v = 0));
      return {
        pos: i,
        yaw: s,
        ax: p + o.settle.ax * f,
        ay: v + o.settle.ay * f,
        q: n,
        n: S,
      };
    }
    function W(o, a) {
      const c = u() < 0.3,
        t = Math.min(a.vw, a.vh * 1.2);
      let l;
      if (c) {
        const n = b[Math.floor(u() * b.length)],
          i = t * (0.07 + u() * 0.02),
          s = (u() < 0.5 ? -1 : 1) * (3.5 + u() * 3);
        l = {
          flower: !0,
          k: n,
          w_: i,
          h: i,
          amp: 6 + u() * 8,
          tilt: 0.16 + u() * 0.14,
          z0: 380 + u() * 200,
          vz: 140 + u() * 40,
          yaw0: u() * C,
          yawR: s,
          w: Math.abs(s),
          ph: u() * C,
          ph2: u() * C,
          across: 0,
          cup: 1.1 / i,
          flex: 0.25 / i,
          gloss: 0.18,
          glossBack: 0.08,
        };
      } else {
        const n = Math.floor(u() * d.length),
          i = d[n],
          s = n >= q,
          p = t * (0.12 + u() * 0.05),
          v = p * i.aspect;
        l = {
          k: i,
          w_: p,
          h: v,
          w: C / (1.5 + u() * 0.9),
          amp: p * (0.3 + u() * 0.3),
          tilt: (s ? 0.75 : 0.55) + u() * 0.3,
          z0: 380 + u() * 220,
          vz: 70 + u() * 35,
          yaw0: u() * C,
          yawR: (u() - 0.5) * 0.9,
          ph: u() * C,
          ph2: u() * C,
          across: Math.PI / 2 + (u() - 0.5) * 0.8,
          curl: (s ? 0.5 : 0.25) / p,
          cup: (s ? 0.9 : 0.5) / v,
          flex: 0.12 / p,
          twist: (((u() - 0.5) * 1.2) / (p * v)) * 4,
          rollAt: u() < (s ? 0.55 : 0.2) ? 0.8 + u() * 2.5 : 0,
          gloss: s ? 0.05 : 0.32,
          glossBack: 0.04,
        };
      }
      ((l.vx = 18 + u() * 40),
        (l.vy = (u() - 0.35) * 24),
        (l.rest = 0.9),
        (l.clear = 0.6 + u() * 1.4 + (l.flower ? 0.5 : 0)));
      let h = 0;
      for (; h < 20 && A(l, h).z > l.rest; ) h += 0.02;
      ((l.T = h), l.rollAt && l.rollAt + 1.1 > h && (l.rollAt = 0));
      const f = A(l, h),
        y = a.cam + (u() - 0.5) * 0.92 * a.vw,
        e = (a.camY || 0) + (u() - 0.5) * 0.92 * a.vh;
      ((l.ox = y - f.x),
        (l.oy = e - f.y),
        (l.born = o),
        (l.state = "air"),
        x.push(l));
    }
    const I = (o, a, c, t) =>
      Math.abs(a - o.cam) < o.vw / 2 + t &&
      Math.abs(c - (o.camY || 0)) < o.vh / 2 + t;
    function _(o, a, c, t) {
      const l = {};
      for (const y of c.supports) l[y.id] = y;
      const h = c.vw < 700 ? 4 : 6;
      if (o >= j) {
        j = o + 7 + u() * 6;
        const y = x.filter((e) => e.state === "air").length;
        if (x.length >= h) {
          const e = x.filter((i) => i.state === "rest" && i.cur),
            n = e.find((i) => !I(c, i.cur.pos[0], i.cur.pos[1], 200));
          if (n) x.splice(x.indexOf(n), 1);
          else {
            const i = e.find((s) => !s.on);
            i && F(i, o, 260 + u() * 140, (u() - 0.4) * 60, !0);
          }
        }
        y < 1 && x.length < h && W(o, c);
      }
      const f = c.ptr;
      if (f && f.speed > 260)
        for (const y of x) {
          if (
            (y.state !== "rest" && y.state !== "slide") ||
            !y.cur ||
            o - (y.pushAt || 0) < 0.2
          )
            continue;
          if (
            Math.hypot(y.cur.pos[0] - f.x, y.cur.pos[1] - f.y) <
            Math.max(y.w_, y.h) * 0.6
          ) {
            const n = Math.min(1, 900 / f.speed) * 0.65;
            F(y, o, f.vx * n, f.vy * n, !1);
          }
        }
      for (let y = x.length - 1; y >= 0; y--) {
        const e = x[y],
          n = o - e.born;
        let i = null;
        if (e.state === "air") {
          const s = A(e, Math.min(n, e.T)),
            p = { ...s, x: s.x + e.ox, y: s.y + e.oy },
            v = E(c, p.x, p.y),
            S = v ? g.point(v.sp.obj, v.s, v.t)[2] : 0;
          p.z <= S + e.rest || n >= e.T
            ? w(e, o, c, p)
            : (i = {
                pos: [p.x, p.y, p.z],
                yaw: p.yaw,
                ax: p.ax,
                ay: p.ay,
                q: p.q,
                alpha: $(n / 0.7),
              });
        }
        if (e.state === "drop" || e.state === "slide") {
          const s = e.m;
          (e.state === "drop" && ((s.vz -= 1500 * a), (s.z += s.vz * a)),
            s.gust
              ? ((s.vx += 420 * a), (s.vy *= Math.exp(-a * 0.5)))
              : e.state === "slide" &&
                ((s.vx *= Math.exp(-a * 2.4)), (s.vy *= Math.exp(-a * 2.4))),
            (s.x += s.vx * a),
            (s.y += s.vy * a),
            (s.yaw += s.spin * a),
            (s.spin *= Math.exp(-a * 1.8)),
            (s.ax *= Math.exp(-a * 4)),
            (s.ay *= Math.exp(-a * 4)));
          const p = E(c, s.x, s.y),
            v = p ? g.point(p.sp.obj, p.s, p.t)[2] : 0,
            S = Math.hypot(s.vx, s.vy);
          if (e.state === "slide") {
            const P = v + e.clear + Math.min(14, S * 0.025);
            s.z - P > 6 ? ((e.state = "drop"), (s.vz = 0)) : (s.z = P);
          }
          if (s.gust && !I(c, s.x, s.y, Math.max(e.w_, e.h))) {
            x.splice(y, 1);
            continue;
          }
          (e.state === "drop" && s.z <= v + e.clear) ||
          (e.state === "slide" && !s.gust && S < 14)
            ? w(e, o, c, {
                x: s.x,
                y: s.y,
                z: s.z,
                vx: e.state === "drop" ? s.vx : 0,
                vy: e.state === "drop" ? s.vy : 0,
                yaw: s.yaw,
                ax: s.ax,
                ay: s.ay,
                q: s.q,
              })
            : (i = {
                pos: [s.x, s.y, s.z],
                yaw: s.yaw,
                ax: s.ax,
                ay: s.ay,
                q: s.q,
                alpha: 1,
              });
        }
        if (e.state === "rest") {
          const s = B(e, o, c, l);
          if (s === "detach") {
            const p = e.cur,
              v = p.n || [0, 0, 1],
              S = Math.hypot(v[0], v[1]),
              P =
                S > 0.05
                  ? [v[0] / S, v[1] / S]
                  : [Math.cos(u() * C), Math.sin(u() * C)];
            ((e.state = "drop"),
              (e.on = null),
              (e.m = {
                x: p.pos[0],
                y: p.pos[1],
                z: p.pos[2],
                vx: P[0] * 130,
                vy: P[1] * 130,
                vz: 40,
                yaw: p.yaw,
                ax: p.ax,
                ay: p.ay,
                q: p.q,
                spin: (u() - 0.5) * 3,
              }),
              (i = { ...p, alpha: 1 }));
          } else s && (i = { ...s, alpha: 1 });
        }
        i &&
          ((e.cur = i),
          t.push({
            mode: 2,
            quad: i.q,
            pos: i.pos,
            size: [e.w_, e.h],
            rot: [i.yaw, i.ax, i.ay],
            texA: e.k.front,
            texB: e.k.back,
            alpha: i.alpha,
            gloss: e.gloss,
            glossBack: e.glossBack,
          }));
      }
    }
    function F(o, a, c, t, l) {
      const h = o.cur;
      h &&
        ((o.state = "slide"),
        (o.on = null),
        (o.pushAt = a),
        (o.m = {
          x: h.pos[0],
          y: h.pos[1],
          z: h.pos[2],
          vx: c,
          vy: t,
          vz: 0,
          yaw: h.yaw,
          ax: h.ax,
          ay: h.ay,
          q: h.q,
          spin: (u() < 0.5 ? -1 : 1) * Math.min(6, Math.hypot(c, t) * 0.006),
          gust: l,
        }));
    }
    return {
      step: _,
      drop() {
        j = 0;
      },
    };
  }
  return { create: J, leaf: O, flower: K };
})();
