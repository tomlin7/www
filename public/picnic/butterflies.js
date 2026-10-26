// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
window.Butterflies = (() => {
  const M = Math.PI * 2,
    b = (n, y) => {
      const v = document.createElement("canvas");
      return ((v.width = n), (v.height = y), v);
    },
    $ = (n, y = 0, v = 1) => Math.min(v, Math.max(y, n)),
    r = (n, y) => n + Math.random() * (y - n),
    W = [
      {
        fill: "#f08a1c",
        fill2: "#f5a640",
        edge: "#1a1310",
        vein: "#1a1310",
        dots: "#fff8e8",
      },
      {
        fill: "#f6dc48",
        fill2: "#fbe982",
        edge: "#6b5a14",
        vein: "#a8902a",
        dots: null,
        spot: "#e8721c",
      },
      {
        fill: "#4f86d9",
        fill2: "#8fb6ee",
        edge: "#141a2e",
        vein: "#2a4a8a",
        dots: "#e8f0ff",
      },
      {
        fill: "#f6f2e6",
        fill2: "#ffffff",
        edge: "#2a2622",
        vein: "#c9c2b0",
        dots: null,
        spot: "#2a2622",
      },
    ],
    Y = 64,
    I = 96,
    z = 3;
  function k(n, y) {
    const v = b(Y * z, I * z),
      o = v.getContext("2d");
    (o.scale(z, z), y && (o.translate(Y, 0), o.scale(-1, 1)));
    const s = new Path2D(),
      x = new Path2D();
    (s.moveTo(1, 44),
      s.bezierCurveTo(8, 18, 34, 2, 58, 6),
      s.bezierCurveTo(64, 20, 56, 40, 40, 50),
      s.bezierCurveTo(26, 54, 10, 52, 1, 48),
      s.closePath(),
      x.moveTo(1, 48),
      x.bezierCurveTo(22, 50, 46, 56, 44, 72),
      x.bezierCurveTo(42, 86, 22, 94, 10, 88),
      x.bezierCurveTo(2, 80, 0, 64, 1, 48),
      x.closePath());
    for (const [c, g, m] of [
      [x, 6, 56],
      [s, 6, 44],
    ]) {
      const S = o.createRadialGradient(g, m, 2, g, m, 60);
      (S.addColorStop(0, n.fill2),
        S.addColorStop(1, n.fill),
        (o.fillStyle = S),
        o.fill(c),
        o.save(),
        o.clip(c),
        (o.strokeStyle = n.vein),
        (o.lineWidth = 1.1),
        (o.globalAlpha = 0.8));
      for (let t = 0; t < 6; t++) {
        const a = (c === s ? -0.95 : 0.1) + t * 0.24;
        (o.beginPath(),
          o.moveTo(g - 4, m),
          o.quadraticCurveTo(
            g + Math.cos(a) * 24,
            m + Math.sin(a) * 24 + 4,
            g + Math.cos(a) * 70,
            m + Math.sin(a) * 70,
          ),
          o.stroke());
      }
      ((o.globalAlpha = 1),
        (o.lineWidth = n.dots ? 9 : 3.5),
        (o.strokeStyle = n.edge),
        o.stroke(c),
        o.restore());
    }
    if (n.dots) {
      o.fillStyle = n.dots;
      for (const [c, g, m] of [
        [54, 10, 1.4],
        [58, 18, 1.2],
        [56, 28, 1.3],
        [50, 40, 1.1],
        [42, 48, 1],
        [42, 66, 1.3],
        [40, 78, 1.2],
        [30, 87, 1.2],
        [18, 89, 1.1],
      ])
        (o.beginPath(), o.arc(c, g, m, 0, M), o.fill());
    }
    return (
      n.spot &&
        ((o.fillStyle = n.spot),
        o.beginPath(),
        o.arc(34, 30, 3, 0, M),
        o.fill()),
      v
    );
  }
  function R() {
    const v = b(24 * z, 52 * z),
      o = v.getContext("2d");
    (o.scale(z, z),
      (o.strokeStyle = "#1a1310"),
      (o.lineWidth = 1.1),
      (o.lineCap = "round"));
    for (const s of [-1, 1])
      (o.beginPath(),
        o.moveTo(12, 14),
        o.quadraticCurveTo(12 + s * 3, 6, 12 + s * 8, 1.5),
        o.stroke(),
        o.beginPath(),
        o.arc(12 + s * 8, 1.8, 1.3, 0, M),
        (o.fillStyle = "#1a1310"),
        o.fill());
    return (
      (o.fillStyle = "#231a14"),
      o.beginPath(),
      o.ellipse(12, 15, 3.2, 3, 0, 0, M),
      o.fill(),
      o.beginPath(),
      o.ellipse(12, 23, 3.4, 6, 0, 0, M),
      o.fill(),
      o.beginPath(),
      o.ellipse(12, 38, 2.6, 11, 0, 0, M),
      o.fill(),
      v
    );
  }
  function K(n) {
    const y = W.map((t) => ({
        R: n.texture(k(t, !1)),
        L: n.texture(k(t, !0)),
      })),
      v = n.texture(R()),
      o = [];
    let s = 1;
    function x(t, a, f) {
      if (((t.kind = Math.floor(Math.random() * W.length)), f)) {
        const i = Math.floor(Math.random() * 4),
          e = a.vw * 0.5 * a.zv + 60,
          h = a.vh * 0.5 * a.zv + 60;
        ((t.x = a.cam + (i === 0 ? -e : i === 1 ? e : r(-e, e))),
          (t.y = a.camY + (i === 2 ? -h : i === 3 ? h : r(-h, h))));
      } else
        ((t.x = a.cam + r(-0.4, 0.4) * a.vw),
          (t.y = a.camY + r(-0.4, 0.4) * a.vh));
      ((t.z = r(90, 170)),
        (t.vx = 0),
        (t.vy = 0),
        (t.h = r(0, M)),
        (t.state = "fly"),
        (t.phase = r(0, M)),
        (t.until = 0),
        (t.land = null),
        (t.flap = 0.6),
        c(t, a));
    }
    function c(t, a) {
      if (((t.land = null), Math.random() < 0.45)) {
        const f = a.supports.filter(
          (i) =>
            i.stable &&
            i.obj.size &&
            /^(p\d+$|q\d+$|cover$|card$|sheet$|foot$|tt$|c\d+$)/.test(i.id) &&
            Math.abs(i.obj.pos[0] - a.cam) < a.vw * 0.42 &&
            Math.abs(i.obj.pos[1] - a.camY) < a.vh * 0.42,
        );
        if (f.length) {
          const i = f[Math.floor(Math.random() * f.length)];
          t.land = { id: i.id, s: r(-0.32, 0.32), t: r(-0.32, 0.32) };
        }
      }
      ((t.tx = a.cam + r(-0.42, 0.42) * a.vw),
        (t.ty = a.camY + r(-0.38, 0.38) * a.vh),
        (t.until = a.t + r(3, 7)));
    }
    function g(t, a, f) {
      ((t.state = "fly"),
        (t.land = null),
        f && ((t.vx = f[0] * 300), (t.vy = f[1] * 300), (t.z += 10)),
        c(t, a),
        (t.land = null));
    }
    function m(t, a) {
      const f = t.on ? 1 : 0;
      for (s = t.vw < 700 ? 0.85 : 1; o.length < f; ) {
        const e = {};
        (x(e, t, o.length > 0), o.push(e));
      }
      if (!f) return;
      const i = {};
      for (const e of t.supports) i[e.id] = e;
      for (const e of o) {
        (Math.abs(e.x - t.cam) > t.vw * 0.5 * t.zv + 500 ||
          Math.abs(e.y - t.camY) > t.vh * 0.5 * t.zv + 500) &&
          x(e, t, !0);
        const h = t.ptr ? t.toScreen([e.x, e.y, e.z]) : null,
          T = h && Math.hypot(h[0] - t.ptr.x, h[1] - t.ptr.y) < 110 * s;
        if (e.state === "sit") {
          const d = i[e.land.id];
          if (!d || !d.stable || t.t > e.until || (T && t.ptr.moving)) {
            const l =
                h && t.ptr
                  ? [h[0] - t.ptr.x, h[1] - t.ptr.y]
                  : [r(-1, 1), r(-1, 1)],
              p = Math.hypot(...l) || 1;
            g(e, t, [l[0] / p, l[1] / p]);
          } else {
            const l = t.surfaceAt(
              d.obj,
              e.land.s * d.obj.size[0],
              e.land.t * d.obj.size[1],
            );
            ((e.x = l.p[0]), (e.y = l.p[1]), (e.z = l.p[2] + 2));
            const p = Math.sin(t.t * 1.1 + e.phase);
            e.flap = 0.12 + 1.05 * Math.pow(Math.max(0, p), 3);
          }
        }
        if (e.state === "fly") {
          if (T && t.ptr.moving && h) {
            const w = [h[0] - t.ptr.x, h[1] - t.ptr.y],
              j = Math.hypot(...w) || 1;
            ((e.vx += (w[0] / j) * 900 * t.dt),
              (e.vy += (w[1] / j) * 900 * t.dt),
              (e.land = null));
          }
          let d = e.tx,
            l = e.ty,
            p = 120;
          const u = e.land && i[e.land.id];
          if ((e.land && !u && (e.land = null), u)) {
            const w = t.surfaceAt(
              u.obj,
              e.land.s * u.obj.size[0],
              e.land.t * u.obj.size[1],
            );
            ((d = w.p[0]), (l = w.p[1]));
            const j = Math.hypot(d - e.x, l - e.y);
            ((p = w.p[2] + 2 + Math.min(120, j * 0.5)),
              j < 6 &&
                e.z - (w.p[2] + 2) < 8 &&
                ((e.state = "sit"),
                (e.until = t.t + r(4, 10)),
                (e.vx = e.vy = 0)));
          } else
            (Math.hypot(d - e.x, l - e.y) < 40 || t.t > e.until) && c(e, t);
          const C = d - e.x,
            A = l - e.y,
            P = Math.hypot(C, A) || 1,
            q = u ? Math.min(150, 40 + P) : 150,
            D =
              Math.sin(t.t * 2.3 + e.phase) * 0.7 +
              Math.sin(t.t * 3.7 + e.phase * 2) * 0.4,
            L = (C / P) * q - (A / P) * D * 70,
            B = (A / P) * q + (C / P) * D * 70;
          ((e.vx += (L - e.vx) * $(t.dt * 2.2)),
            (e.vy += (B - e.vy) * $(t.dt * 2.2)),
            (e.x += e.vx * t.dt),
            (e.y += e.vy * t.dt),
            (e.phase += t.dt * M * 5.5),
            (e.z += (p + Math.sin(e.phase) * 6 - e.z) * $(t.dt * 3)));
          const E = Math.sin(t.t * 0.9 + e.phase * 0.02) > 0.75;
          e.flap = E ? 0.35 : 0.2 + 0.6 * (1 + Math.sin(e.phase));
        }
        if (Math.hypot(e.vx, e.vy) > 8) {
          let l = Math.atan2(e.vx, -e.vy) - e.h;
          ((l = Math.atan2(Math.sin(l), Math.cos(l))),
            (e.h += l * $(t.dt * 6)));
        }
        S(e, a);
      }
    }
    function S(t, a) {
      const f = 25 * s,
        i = 37.5 * s,
        e = t.flap,
        h = Math.cos(t.h),
        T = Math.sin(t.h),
        d = y[t.kind],
        l = (p, u) => [p * h - u * T, p * T + u * h];
      for (const p of [1, -1]) {
        const [u, C] = l(p * (f / 2) * Math.cos(e), 0);
        a.push({
          pos: [t.x + u, t.y + C, t.z + (f / 2) * Math.sin(e)],
          size: [f, i],
          rot: [t.h, 0, p > 0 ? -e : e],
          texA: p > 0 ? d.R : d.L,
          gloss: 0.12,
          sheen: 0.18,
        });
      }
      a.push({
        pos: [t.x, t.y, t.z + 1.5],
        size: [9 * s, 19.5 * s],
        rot: [t.h, 0, 0],
        texA: v,
        gloss: 0.2,
      });
    }
    return { step: m, flock: o };
  }
  return { create: K };
})();
