// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
window.Props = (() => {
  const C = Math.PI * 2,
    Q = (n, o = 0, e = 1) => Math.min(e, Math.max(o, n)),
    tt = (n, o, e) => n + (o - n) * e,
    Gt = (n) => 1 - Math.pow(1 - n, 3);
  function et(n) {
    let o = n >>> 0 || 1;
    return () => (o = (o * 1664525 + 1013904223) >>> 0) / 4294967296;
  }
  const K = (n, o) => {
      const e = document.createElement("canvas");
      return ((e.width = Math.round(n)), (e.height = Math.round(o)), e);
    },
    Mt = (n) => {
      const o = Math.hypot(...n) || 1;
      return n.map((e) => e / o);
    },
    kt = (n, o) => [
      n[1] * o[2] - n[2] * o[1],
      n[2] * o[0] - n[0] * o[2],
      n[0] * o[1] - n[1] * o[0],
    ],
    O = () => ({ p: [], n: [], t: [], i: [] });
  function ht(n, o, e, t) {
    const s = n.p.length / 3;
    for (let a = 0; a <= e; a++)
      for (let c = 0; c <= o; c++) {
        const [i, r, u] = t(c / o, a / e);
        (n.p.push(...i), n.n.push(...r), n.t.push(...u));
      }
    for (let a = 0; a < e; a++)
      for (let c = 0; c < o; c++) {
        const i = s + a * (o + 1) + c,
          r = i + o + 1;
        n.i.push(i, i + 1, r, i + 1, r + 1, r);
      }
    return n;
  }
  function st(
    n,
    o,
    e,
    {
      uv: t = "arc",
      zMax: s = 1,
      v0: a = 0,
      v1: c = 1,
      rj: i = null,
      cx: r = 0,
      cy: u = 0,
    } = {},
  ) {
    const g = [0];
    for (let b = 1; b < o.length; b++)
      g.push(
        g[b - 1] + Math.hypot(o[b][0] - o[b - 1][0], o[b][1] - o[b - 1][1]),
      );
    const p = g[g.length - 1] || 1;
    return ht(n, e, o.length - 1, (b, P) => {
      const M = Math.round(P * (o.length - 1)),
        d = b * C,
        W = Math.cos(d),
        H = Math.sin(d),
        x = o[Math.max(0, M - 1)],
        z = o[Math.min(o.length - 1, M + 1)],
        I = z[0] - x[0],
        j = z[1] - x[1],
        D = Math.hypot(I, j) || 1,
        q = i ? i(d, M) : 1,
        _ = o[M][0] * q,
        U = o[M][1],
        ot =
          typeof t == "number"
            ? [(_ * W) / t + 0.5, (_ * H) / t + 0.5]
            : t === "z"
              ? [b, 1 - U / s]
              : [b, tt(a, c, g[M] / p)];
      return [
        [r + _ * W, u + _ * H, U],
        [(-j / D) * W, (-j / D) * H, I / D],
        ot,
      ];
    });
  }
  function St(
    n,
    o,
    e,
    t,
    s,
    { cx: a = 0, cy: c = 0, cz: i = 0, n: r = 10 } = {},
  ) {
    const u = (p, b) =>
        p < 0.3
          ? -b + s * (p / 0.3)
          : p > 0.7
            ? b - s + s * ((p - 0.7) / 0.3)
            : -b + s + (b - s) * 2 * ((p - 0.3) / 0.4),
      g = [o, e, t];
    for (let p = 0; p < 3; p++)
      for (const b of [-1, 1]) {
        const P = (p + 1) % 3,
          M = (p + 2) % 3;
        ht(n, r, r, (d, W) => {
          const H = [0, 0, 0];
          ((H[p] = b * g[p]),
            (H[P] = u(b > 0 ? d : 1 - d, g[P])),
            (H[M] = u(W, g[M])));
          const x = H.map((D, q) => Q(D, -(g[q] - s), g[q] - s));
          let z = H.map((D, q) => D - x[q]);
          Math.hypot(...z) < 1e-6 && ((z = [0, 0, 0]), (z[p] = b));
          const I = Mt(z),
            j = x.map((D, q) => D + I[q] * s);
          return [
            [a + j[0], c + j[1], i + j[2]],
            I,
            [j[0] / (2 * o) + 0.5, j[1] / (2 * e) + 0.5],
          ];
        });
      }
    return n;
  }
  function Ut(n, o = 8, e = !1) {
    const t = [],
      s = n.length,
      a = (i) => n[e ? (i + s) % s : Q(i, 0, s - 1)],
      c = e ? s : s - 1;
    for (let i = 0; i < c; i++) {
      const r = a(i - 1),
        u = a(i),
        g = a(i + 1),
        p = a(i + 2);
      for (let b = 0; b < o; b++) {
        const P = b / o,
          M = P * P,
          d = M * P;
        t.push(
          u.map(
            (W, H) =>
              0.5 *
              (2 * u[H] +
                (-r[H] + g[H]) * P +
                (2 * r[H] - 5 * u[H] + 4 * g[H] - p[H]) * M +
                (-r[H] + 3 * u[H] - 3 * g[H] + p[H]) * d),
          ),
        );
      }
    }
    return (e || t.push(a(s - 1)), t);
  }
  function Pt(
    n,
    o,
    e,
    t,
    { sides: s = 14, closed: a = !1, up: c = [0, 0, 1], uvLen: i = 1 } = {},
  ) {
    const r = o.length,
      u = [],
      g = [0];
    for (let M = 1; M < r; M++)
      g.push(g[M - 1] + Math.hypot(...o[M].map((d, W) => d - o[M - 1][W])));
    for (let M = 0; M < r; M++) {
      const d = o[a ? (M - 1 + r) % r : Math.max(0, M - 1)],
        W = o[a ? (M + 1) % r : Math.min(r - 1, M + 1)],
        H = Mt(W.map((z, I) => z - d[I]));
      let x = kt(H, c);
      (Math.hypot(...x) < 0.001 && (x = kt(H, [1, 0, 0])),
        (x = Mt(x)),
        u.push([H, x, Mt(kt(x, H))]));
    }
    const p = a ? r : r - 1,
      b = a
        ? g[r - 1] + Math.hypot(...o[0].map((M, d) => M - o[r - 1][d]))
        : g[r - 1],
      P = n.p.length / 3;
    for (let M = 0; M <= p; M++) {
      const d = M % r,
        [, W, H] = u[d],
        x = o[d],
        z = typeof e == "function" ? e(d / r, x) : e;
      for (let I = 0; I <= s; I++) {
        const j = (I / s) * C,
          D = Math.cos(j),
          q = Math.sin(j);
        (n.p.push(...x.map((_, U) => _ + W[U] * D * z + H[U] * q * t)),
          n.n.push(...Mt(W.map((_, U) => (_ * D) / z + (H[U] * q) / t))),
          n.t.push((M === r ? 1 : g[d] / b) * i, I / s));
      }
    }
    for (let M = 0; M < p; M++)
      for (let d = 0; d < s; d++) {
        const W = P + M * (s + 1) + d,
          H = W + s + 1;
        n.i.push(W, W + 1, H, W + 1, H + 1, H);
      }
    return n;
  }
  function Nt(n, o) {
    for (let e = 0; e < n.p.length; e += 3) {
      const [t, s] = o(
        [n.p[e], n.p[e + 1], n.p[e + 2]],
        [n.n[e], n.n[e + 1], n.n[e + 2]],
      );
      ((n.p[e] = t[0]),
        (n.p[e + 1] = t[1]),
        (n.p[e + 2] = t[2]),
        (n.n[e] = s[0]),
        (n.n[e + 1] = s[1]),
        (n.n[e + 2] = s[2]));
    }
    return n;
  }
  const Xt = (n) => (o) => [
      o[0] * Math.cos(n) - o[1] * Math.sin(n),
      o[0] * Math.sin(n) + o[1] * Math.cos(n),
      o[2],
    ],
    Yt = (n) => (o) => [
      o[0],
      o[1] * Math.cos(n) - o[2] * Math.sin(n),
      o[1] * Math.sin(n) + o[2] * Math.cos(n),
    ],
    Zt = (n) => (o) => [
      o[0] * Math.cos(n) + o[2] * Math.sin(n),
      o[1],
      -o[0] * Math.sin(n) + o[2] * Math.cos(n),
    ],
    Jt = (n, ...o) =>
      Nt(n, (e, t) => {
        for (const s of o) ((e = s(e)), (t = s(t)));
        return [e, t];
      }),
    Qt = (n, o) => Nt(n, (e, t) => [e.map((s, a) => s + o[a]), t]);
  function Tt(n, o, e, t, s, a) {
    for (let c = 0; c < s; c++)
      ((n.fillStyle =
        t() < 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`),
        n.fillRect(t() * o, t() * e, 1.2, 1.2));
  }
  function pt(n, o, e, t, s) {
    const a = n.createRadialGradient(o, e, 0, o, e, t);
    (a.addColorStop(0, s),
      a.addColorStop(1, "rgba(0,0,0,0)"),
      (n.fillStyle = a),
      n.fillRect(o - t, e - t, t * 2, t * 2));
  }
  const wt = (n, o, e, t, s, a) => {
    (n.beginPath(),
      n.moveTo(o + a, e),
      n.arcTo(o + t, e, o + t, e + s, a),
      n.arcTo(o + t, e + s, o, e + s, a),
      n.arcTo(o, e + s, o, e, a),
      n.arcTo(o, e, o + t, e, a),
      n.closePath());
  };
  function Et(n, o = 512, e = 512, t = 1, s) {
    const a = K(o, e),
      c = a.getContext("2d"),
      i = et(t);
    return (
      (c.fillStyle = n),
      c.fillRect(0, 0, o, e),
      Tt(c, o, e, i, o * e * 0.08, 0.035),
      s && s(c, o, e, i),
      a
    );
  }
  function Vt() {
    const o = K(512, 512),
      e = o.getContext("2d"),
      t = et(9);
    ((e.fillStyle = "#b98a58"), e.fillRect(0, 0, 512, 512));
    for (let s = 0; s < 9e3; s++) {
      const a = t() * 512,
        c = t() * 512,
        i = 1 + t() * 4;
      ((e.fillStyle =
        t() < 0.5
          ? `rgba(90,52,24,${0.15 + t() * 0.35})`
          : `rgba(230,190,140,${0.1 + t() * 0.25})`),
        e.beginPath(),
        e.ellipse(a, c, i, i * (0.5 + t() * 0.5), t() * 3, 0, C),
        e.fill());
    }
    return (
      (e.strokeStyle = "rgba(70,40,18,.28)"),
      (e.lineWidth = 10),
      (e.filter = "blur(3px)"),
      e.beginPath(),
      e.arc(512 / 2 + 6, 512 / 2 - 4, 512 * 0.33, 0, C),
      e.stroke(),
      (e.filter = "none"),
      o
    );
  }
  function t0() {
    const e = K(1024, 512),
      t = e.getContext("2d"),
      s = et(4);
    ((t.fillStyle = "rgba(235,242,245,.07)"), t.fillRect(0, 0, 1024, 512));
    const a = t.createLinearGradient(0, 512 * 0.18, 0, 512);
    (a.addColorStop(0, "rgba(235,242,245,0)"),
      a.addColorStop(0.15, "rgba(235,242,245,.16)"),
      a.addColorStop(1, "rgba(235,242,245,.24)"),
      (t.fillStyle = a),
      t.fillRect(0, 0, 1024, 512));
    for (let c = 0; c < 1300; c++) {
      const i = s() * 1024,
        r = 512 * (0.2 + s() * 0.78),
        u = 1 + Math.pow(s(), 3) * 7;
      ((t.fillStyle = "rgba(250,253,255,.55)"),
        t.beginPath(),
        t.ellipse(i, r, u, u * 1.15, 0, 0, C),
        t.fill(),
        (t.fillStyle = "rgba(255,255,255,.95)"),
        t.beginPath(),
        t.arc(i - u * 0.3, r - u * 0.35, u * 0.3, 0, C),
        t.fill());
    }
    t.globalCompositeOperation = "destination-out";
    for (let c = 0; c < 14; c++) {
      const i = s() * 1024,
        r = 512 * (0.25 + s() * 0.3);
      ((t.lineWidth = 3 + s() * 3),
        (t.strokeStyle = "rgba(0,0,0,.7)"),
        t.beginPath(),
        t.moveTo(i, r),
        t.lineTo(i + (s() - 0.5) * 6, 512),
        t.stroke());
    }
    return ((t.globalCompositeOperation = "source-over"), e);
  }
  function e0() {
    const o = K(512, 512),
      e = o.getContext("2d"),
      t = et(12),
      s = 512 / 2;
    ((e.fillStyle = "#b07a4a"), e.fillRect(0, 0, 512, 512));
    for (let a = 0; a < 70; a++) {
      const c = t() * C,
        i = t() * s * 0.8;
      pt(
        e,
        s + Math.cos(c) * i,
        s + Math.sin(c) * i,
        20 + t() * 70,
        t() < 0.55
          ? `rgba(236,214,186,${0.25 + t() * 0.3})`
          : `rgba(92,52,24,${0.2 + t() * 0.3})`,
      );
    }
    e.lineWidth = 6;
    for (let a = 0; a < 8; a++) {
      ((e.strokeStyle = `rgba(240,222,196,${0.18 + t() * 0.2})`),
        (e.filter = "blur(4px)"),
        e.beginPath());
      for (let c = 0; c < 1; c += 0.02) {
        const i = c * (2 + t() * 0.3) + a * 0.8,
          r = s * (0.1 + c * 0.6) * (0.85 + 0.3 * t());
        e.lineTo(s + Math.cos(i) * r, s + Math.sin(i) * r);
      }
      e.stroke();
    }
    e.filter = "none";
    for (let a = 0; a < 160; a++) {
      const c = t() * C,
        i = s * (0.82 + t() * 0.16),
        r = 1 + t() * 4;
      ((e.strokeStyle = "rgba(255,245,230,.55)"),
        (e.lineWidth = 1),
        e.beginPath(),
        e.arc(s + Math.cos(c) * i, s + Math.sin(c) * i, r, 0, C),
        e.stroke());
    }
    return o;
  }
  function o0() {
    const e = K(512, 512),
      t = e.getContext("2d"),
      s = et(13),
      a = t.createLinearGradient(0, 0, 0, 512);
    (a.addColorStop(0, "#d9b48a"),
      a.addColorStop(0.35, "#b37b4c"),
      a.addColorStop(0.7, "#6e3f1e"),
      a.addColorStop(1, "#4a2812"),
      (t.fillStyle = a),
      t.fillRect(0, 0, 512, 512));
    for (let c = 0; c < 40; c++)
      pt(
        t,
        s() * 512,
        s() * 512 * 0.6,
        20 + s() * 50,
        `rgba(240,220,190,${0.15 + s() * 0.2})`,
      );
    return e;
  }
  function n0(n, o, e = 10, t = 512, s = 64) {
    const a = K(t, s),
      c = a.getContext("2d");
    ((c.fillStyle = n), c.fillRect(0, 0, t, s), (c.fillStyle = o));
    for (let i = -2; i < e + 2; i++) {
      c.beginPath();
      const r = (i / e) * t;
      (c.moveTo(r, 0),
        c.lineTo(r + t / e / 2, 0),
        c.lineTo(r + t / e / 2 + s * 0.6, s),
        c.lineTo(r + s * 0.6, s),
        c.fill());
    }
    return a;
  }
  function s0(n) {
    return Et(n, 512, 600, 3, (o, e, t) => {
      ((o.strokeStyle = "rgba(0,0,0,.12)"),
        (o.lineWidth = 2),
        wt(o, e * 0.05, t * 0.045, e * 0.9, t * 0.91, e * 0.16),
        o.stroke(),
        (o.fillStyle = "rgba(20,20,22,.85)"),
        o.beginPath(),
        o.arc(e * 0.77, t * 0.17, 5, 0, C),
        o.fill(),
        (o.fillStyle = "rgba(255,255,255,.18)"),
        o.beginPath(),
        o.arc(e * 0.83, t * 0.86, 22, 0, C),
        o.fill(),
        (o.strokeStyle = "rgba(0,0,0,.15)"),
        (o.lineWidth = 2),
        o.stroke());
    });
  }
  function l0() {
    const o = K(512, 512),
      e = o.getContext("2d"),
      t = 512 / 2;
    ((e.fillStyle = "#121214"),
      e.fillRect(0, 0, 512, 512),
      (e.fillStyle = "rgba(235,235,235,.85)"),
      (e.font = '600 15px "Geist", sans-serif'),
      (e.textAlign = "center"));
    const s = "LENS 60mm  1:12.7  ·  0.3m – ∞  ·  ",
      a = t * 0.8;
    return (
      [...s].forEach((c, i) => {
        const r = -Math.PI / 2 + (i / s.length) * C;
        (e.save(),
          e.translate(t + Math.cos(r) * a, t + Math.sin(r) * a),
          e.rotate(r + Math.PI / 2),
          e.fillText(c, 0, 0),
          e.restore());
      }),
      o
    );
  }
  function a0() {
    const n = K(256, 128),
      o = n.getContext("2d");
    ((o.fillStyle = "#eef0ee"), o.fillRect(0, 0, 256, 128));
    for (let e = 0; e < 26; e++)
      ((o.fillStyle = e % 2 ? "rgba(255,255,255,.7)" : "rgba(150,160,160,.25)"),
        o.fillRect(0, e * 5, 256, 2.5));
    return n;
  }
  function c0() {
    const n = K(512, 64),
      o = n.getContext("2d");
    ((o.fillStyle = "#e9e4d8"), o.fillRect(0, 0, 512, 64));
    for (let e = 0; e < 512; e += 6)
      ((o.fillStyle = "rgba(0,0,0,.06)"), o.fillRect(e, 0, 3, 64));
    return (
      (o.fillStyle = "rgba(120,150,135,.6)"),
      o.fillRect(0, 26, 512, 12),
      n
    );
  }
  function i0(n, o) {
    const a = K(540, 860),
      c = a.getContext("2d"),
      i = et(o * 7 + 3);
    ((c.fillStyle = "#f7f6f1"),
      c.fillRect(0, 0, 540, 860),
      Tt(c, 540, 860, i, 16e3, 0.03));
    const r = 40,
      u = 60,
      g = 460,
      p = 310 * 2,
      b = K(540, 860),
      P = b.getContext("2d");
    P.drawImage(a, 0, 0);
    const M = P.createLinearGradient(0, u, 0, u + p);
    (M.addColorStop(0, "#3a403f"),
      M.addColorStop(1, "#2b302f"),
      (P.fillStyle = M),
      P.fillRect(r, u, g, p),
      (P.fillStyle = "rgba(255,255,255,.06)"),
      P.fillRect(r, u, g, p * 0.3),
      c.drawImage(b, 0, 0));
    const d = new Promise((W) => {
      const H = new Image();
      ((H.onload = () => {
        const x = Math.max(g / H.naturalWidth, p / H.naturalHeight),
          z = g / x,
          I = p / x;
        (c.drawImage(
          H,
          (H.naturalWidth - z) / 2,
          (H.naturalHeight - I) / 2,
          z,
          I,
          r,
          u,
          g,
          p,
        ),
          (c.fillStyle = "rgba(255,236,205,.12)"),
          c.fillRect(r, u, g, p));
        const j = c.createRadialGradient(
          r + g / 2,
          u + p / 2,
          p * 0.3,
          r + g / 2,
          u + p / 2,
          p * 0.75,
        );
        (j.addColorStop(0, "rgba(0,0,0,0)"),
          j.addColorStop(1, "rgba(40,20,10,.28)"),
          (c.fillStyle = j),
          c.fillRect(r, u, g, p),
          W(!0));
      }),
        (H.onerror = () => W(!1)),
        (H.src = n));
    });
    return { developed: a, undeveloped: b, load: d };
  }
  function r0() {
    return Et("#ece3cf", 1040, 640, 7, (n, o, e) => {
      ((n.fillStyle = "#f6efdc"),
        wt(n, o * 0.66, e * 0.16, o * 0.28, e * 0.42, 14),
        n.fill(),
        (n.strokeStyle = "rgba(80,60,40,.35)"),
        (n.lineWidth = 3),
        n.stroke(),
        (n.fillStyle = "#7a1e22"),
        (n.font = "600 22px 'Geist', sans-serif"),
        (n.textAlign = "center"),
        ["55", "70", "90", "110", "130", "160"].forEach((t, s) => {
          const a = e * 0.21 + s * e * 0.066;
          (n.fillText(t, o * 0.76, a + 8),
            (n.fillStyle = "rgba(60,40,30,.6)"),
            n.fillRect(o * 0.83, a, o * 0.06, 2),
            (n.fillStyle = "#7a1e22"));
        }),
        (n.fillStyle = "rgba(60,40,30,.65)"),
        (n.font = "500 15px 'Geist Mono', monospace"),
        n.fillText("KC", o * 0.86, e * 0.2),
        (n.fillStyle = "#b48a3c"),
        wt(n, o * 0.69, e * 0.68, o * 0.22, e * 0.13, 10),
        n.fill(),
        (n.fillStyle = "#3a2a12"),
        (n.font = "700 21px 'Geist', sans-serif"),
        n.fillText("8 TRANSISTOR", o * 0.8, e * 0.76),
        (n.fillStyle = "rgba(60,40,30,.45)"),
        (n.font = "500 16px 'Geist Mono', monospace"),
        n.fillText("SOLID STATE", o * 0.8, e * 0.88));
    });
  }
  function f0() {
    const e = K(600, 560),
      t = e.getContext("2d");
    ((t.fillStyle = "#c9cbcc"), t.fillRect(0, 0, 600, 560));
    for (let s = 0; s < 560; s += 2)
      ((t.fillStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.05})`),
        t.fillRect(0, s, 600, 1));
    for (let s = 18; s < 560; s += 20)
      for (let a = (s / 20) % 2 ? 18 : 28; a < 600; a += 20)
        ((t.fillStyle = "#232425"),
          t.beginPath(),
          t.arc(a, s, 5.5, 0, C),
          t.fill(),
          (t.strokeStyle = "rgba(255,255,255,.4)"),
          (t.lineWidth = 1),
          t.beginPath(),
          t.arc(a, s + 0.8, 5.5, 0.2, Math.PI - 0.2),
          t.stroke());
    return (
      (t.globalCompositeOperation = "destination-in"),
      (t.fillStyle = "#000"),
      wt(t, 0, 0, 600, 560, 150),
      t.fill(),
      (t.globalCompositeOperation = "source-over"),
      e
    );
  }
  function h0() {
    const n = K(512, 64),
      o = n.getContext("2d");
    ((o.fillStyle = "#c69a45"), o.fillRect(0, 0, 512, 64));
    for (let e = 0; e < 512; e += 4)
      ((o.fillStyle = "rgba(70,45,10,.45)"), o.fillRect(e, 0, 2, 64));
    return n;
  }
  const vt = "#2442c6";
  function zt(n, o, e, t) {
    (n.save(), (n.lineWidth = 1.2));
    const s = new Path2D(),
      a = new Path2D();
    for (let c = 0; c < o * e * 0.05; c++) {
      const i = t() * o,
        r = t() * e,
        u = t() < 0.5 ? s : a;
      (u.moveTo(i, r), u.lineTo(i + 3, r - 3));
    }
    ((n.strokeStyle = "rgba(255,255,255,.06)"),
      n.stroke(s),
      (n.strokeStyle = "rgba(0,0,30,.08)"),
      n.stroke(a));
    for (let c = 0; c < 40; c++)
      pt(
        n,
        t() * o,
        t() * e,
        40 + t() * 160,
        t() < 0.5 ? "rgba(255,255,255,.03)" : "rgba(0,0,40,.045)",
      );
    n.restore();
  }
  function It(n, o, e, t = "rgba(14,30,120,.75)", s = 2.2) {
    (n.save(),
      (n.strokeStyle = t),
      (n.lineWidth = s),
      (n.lineCap = "round"),
      n.setLineDash([e, e * 0.7]),
      n.beginPath(),
      o.forEach(([a, c], i) => (i ? n.lineTo(a, c) : n.moveTo(a, c))),
      n.stroke(),
      n.restore());
  }
  const ut = 20;
  function p0(n) {
    const e = K(1536, 1536),
      t = e.getContext("2d"),
      s = et(71),
      a = 1536 / ut,
      c = (u) => [(u[0] / ut + 0.5) * 1536, (u[1] / ut + 0.5) * 1536];
    ((t.fillStyle = vt), t.fillRect(0, 0, 1536, 1536));
    const i = [];
    for (let u = 0; u < 6; u++) i.push([new Path2D(), new Path2D()]);
    for (let u = 0; u < 1536 * 1536 * 0.07; u++) {
      const g = s() * 1536,
        p = s() * 1536,
        b = Math.atan2(p - 1536 / 2, g - 1536 / 2),
        P = ((Math.floor(((b + C) % C) / (C / 6)) % 6) + 6) % 6,
        M = (P + 0.5) * (C / 6) + Math.PI / 4,
        d = i[P][s() < 0.5 ? 0 : 1];
      (d.moveTo(g, p), d.lineTo(g + Math.cos(M) * 4, p + Math.sin(M) * 4));
    }
    t.lineWidth = 1.3;
    for (const [u, g] of i)
      ((t.strokeStyle = "rgba(255,255,255,.07)"),
        t.stroke(u),
        (t.strokeStyle = "rgba(0,0,30,.1)"),
        t.stroke(g));
    for (let u = 0; u < 30; u++)
      pt(
        t,
        s() * 1536,
        s() * 1536,
        60 + s() * 200,
        s() < 0.5 ? "rgba(255,255,255,.025)" : "rgba(0,0,40,.04)",
      );
    const r = (u, g, p, b) => {
      (t.save(),
        (t.strokeStyle = g),
        (t.lineWidth = p),
        (t.lineCap = "round"),
        b && t.setLineDash(b),
        t.beginPath(),
        u.forEach(([P, M], d) => (d ? t.lineTo(P, M) : t.moveTo(P, M))),
        t.stroke(),
        t.restore());
    };
    for (let u = 0; u < 6; u++) {
      const g = u * (C / 6),
        p = [];
      for (let b = 0; b <= 1.0001; b += 0.02)
        p.push(c(n(g, Math.min(b, 0.985))));
      for (const b of [-1, 1]) {
        const P = p
          .map(([M, d], W) => {
            const H = p[Math.min(W + 1, p.length - 1)],
              x = p[Math.max(W - 1, 0)],
              z = H[0] - x[0],
              I = H[1] - x[1],
              j = Math.hypot(z, I) || 1;
            return [M - (I / j) * b * 0.32 * a, d + (z / j) * b * 0.32 * a];
          })
          .slice(0, -5);
        (r(
          P.map(([M, d], W) => [(M + p[W][0]) / 2, (d + p[W][1]) / 2]),
          "rgba(255,255,255,.07)",
          0.32 * a,
        ),
          r(P, "rgba(0,0,40,.35)", 3),
          r(P, "rgba(150,170,255,.55)", 2.2, [10, 7]));
      }
      r(p, "rgba(0,0,40,.5)", 3.5);
    }
    for (let u = 0; u < 6; u++) {
      const g = (u + 0.5) * (C / 6),
        p = Math.cos(g) > 0.5,
        [b, P] = c(n(g, p ? 0.38 : 0.5)),
        M = 0.3 * a;
      ((t.fillStyle = "rgba(0,0,40,.35)"),
        t.beginPath(),
        t.arc(b + 1, P + 2, M * 1.1, 0, C),
        t.fill(),
        (t.fillStyle = "#2c4bd0"),
        t.beginPath(),
        t.arc(b, P, M, 0, C),
        t.fill(),
        (t.strokeStyle = "rgba(160,180,255,.4)"),
        (t.lineWidth = 1.5),
        t.beginPath(),
        t.arc(b, P, M * 0.75, Math.PI, C * 0.95),
        t.stroke(),
        (t.fillStyle = "#0b1446"),
        t.beginPath(),
        t.arc(b, P, M * 0.38, 0, C),
        t.fill());
    }
    return e;
  }
  function u0() {
    const e = K(1024, 512),
      t = e.getContext("2d"),
      s = et(73);
    ((t.fillStyle = vt), t.fillRect(0, 0, 1024, 512), zt(t, 1024, 512, s));
    for (let a = 1; a <= 7; a++) {
      const c = 512 * (1 - a * 0.072);
      ((t.fillStyle = "rgba(0,0,40,.16)"),
        t.fillRect(0, c - 3, 1024, 6),
        (t.fillStyle = "rgba(255,255,255,.05)"),
        t.fillRect(0, c + 3, 1024, 4),
        It(
          t,
          [
            [0, c],
            [1024, c],
          ],
          7,
          "rgba(150,170,255,.5)",
          2,
        ));
    }
    return (
      (t.fillStyle = "rgba(0,0,40,.18)"),
      t.fillRect(0, 500, 1024, 12),
      e
    );
  }
  function g0() {
    const e = K(900, 500),
      t = e.getContext("2d"),
      s = et(77),
      a = 900 / 2,
      c = 500 / 2,
      i = 900 / 2,
      r = 500 / 2;
    ((t.fillStyle = "#f3f1ea"), t.fillRect(0, 0, 900, 500));
    const u = 44;
    (t.save(),
      t.beginPath(),
      t.ellipse(a, c, i - u, r - u, 0, 0, C),
      t.clip(),
      (t.fillStyle = "#2140c0"),
      t.fillRect(0, 0, 900, 500));
    for (let x = 0; x < 500; x += 3)
      ((t.fillStyle = x % 6 ? "rgba(255,255,255,.05)" : "rgba(0,0,40,.12)"),
        t.fillRect(0, x, 900, 1.4));
    ((t.strokeStyle = "rgba(0,0,30,.4)"),
      (t.lineWidth = 14),
      (t.filter = "blur(5px)"),
      t.beginPath(),
      t.ellipse(a + 2, c + 4, i - u, r - u, 0, 0, C),
      t.stroke(),
      (t.filter = "none"));
    const g = ["NO RISK", "NO STORY"],
      p = 132;
    ((t.font = `700 ${p}px 'Source Serif 4', Georgia, serif`),
      (t.textAlign = "center"),
      (t.textBaseline = "alphabetic"));
    const b = (i - u) * 2 * 0.74,
      P = (x, z, I) =>
        g.forEach((j, D) => {
          const q = t.measureText(j).width,
            _ = Math.min(1, b / q) * 0.94;
          (t.save(),
            t.translate(a + z, c + (D ? 112 : -10) + I),
            t.scale(_, 1),
            (t.fillStyle = x),
            t.fillText(j, 0, 0),
            t.restore());
        });
    ((t.filter = "blur(3px)"), P("rgba(0,0,30,.6)", 3, 6), (t.filter = "none"));
    const M = K(900, 500),
      d = M.getContext("2d");
    ((d.font = t.font),
      (d.textAlign = "center"),
      (d.textBaseline = "alphabetic"),
      g.forEach((x, z) => {
        const I = t.measureText(x).width,
          j = Math.min(1, b / I) * 0.94;
        (d.save(),
          d.translate(a, c + (z ? 112 : -10)),
          d.scale(j, 1),
          (d.fillStyle = "#f6f4ee"),
          d.fillText(x, 0, 0),
          d.restore());
      }),
      (d.globalCompositeOperation = "source-atop"));
    for (let x = -500; x < 900; x += 4)
      ((d.strokeStyle = "rgba(150,150,160,.28)"),
        (d.lineWidth = 1.3),
        d.beginPath(),
        d.moveTo(x, 500),
        d.lineTo(x + 500 * 0.35, 0),
        d.stroke());
    const W = d.createLinearGradient(0, 0, 0, 500);
    for (let x = 0; x < 2; x++) {
      const z = (c + (x ? 112 : -10) - p * 0.72) / 500,
        I = (c + (x ? 112 : -10)) / 500;
      (W.addColorStop(z, "rgba(255,255,255,.25)"),
        W.addColorStop((z + I) / 2, "rgba(255,255,255,0)"),
        W.addColorStop(Math.min(1, I), "rgba(0,0,40,.18)"));
    }
    ((d.fillStyle = W),
      d.fillRect(0, 0, 900, 500),
      t.drawImage(M, 0, 0),
      t.restore());
    const H = (x, z, I, j, D) => {
      for (let q = 0; q < z; q++) {
        const _ = (q / z) * C,
          U = Math.cos(_),
          ot = Math.sin(_),
          gt = a + U * (i - x),
          lt = c + ot * (r - x),
          ct = U / i,
          nt = ot / r,
          it = Math.hypot(ct, nt),
          X = -ot * i,
          rt = U * r,
          $ = Math.hypot(X, rt);
        ((t.strokeStyle = j),
          (t.lineWidth = D),
          t.beginPath(),
          t.moveTo(gt - (ct / it) * I, lt - (nt / it) * I),
          t.lineTo(
            gt + (ct / it) * I + (X / $) * 6,
            lt + (nt / it) * I + (rt / $) * 6,
          ),
          t.stroke());
      }
    };
    return (
      H(22, 420, 21, "#fbfaf5", 4),
      H(22, 420, 21, "rgba(120,120,130,.25)", 1),
      Tt(t, 900, 500, s, 900 * 500 * 0.02, 0.04),
      e
    );
  }
  function m0(n) {
    const e = K(1024, 1024),
      t = e.getContext("2d"),
      s = et(79),
      a = 1024 / ut,
      c = (i) => [(i[0] / ut + 0.5) * 1024, (i[1] / ut + 0.5) * 1024];
    ((t.fillStyle = "#1d36a6"),
      t.fillRect(0, 0, 1024, 1024),
      zt(t, 1024, 1024, s),
      t.save(),
      t.beginPath());
    for (let i = 0; i <= 40; i++) {
      const r = -C / 6 + (i / 40) * (C / 3),
        u = c(n(r, 0));
      i ? t.lineTo(...u) : t.moveTo(...u);
    }
    (t.lineTo(...c(n(0, 1))),
      t.closePath(),
      t.clip(),
      (t.fillStyle = "#e9e6dc"),
      t.fillRect(0, 0, 1024, 1024),
      (t.lineWidth = 1));
    for (let i = 0; i < 1024; i += 5)
      ((t.strokeStyle = "rgba(120,120,110,.22)"),
        t.beginPath(),
        t.moveTo(i, 0),
        t.lineTo(i, 1024),
        t.stroke());
    for (let i = 0; i < 1024; i += 5)
      ((t.strokeStyle = "rgba(120,120,110,.18)"),
        t.beginPath(),
        t.moveTo(0, i),
        t.lineTo(1024, i),
        t.stroke());
    for (let i = 0; i < 14; i++)
      pt(t, s() * 1024, s() * 1024, 40 + s() * 90, "rgba(40,60,160,.05)");
    t.restore();
    for (let i = 0; i < 6; i++) {
      const r = i * (C / 6),
        u = [];
      for (let p = 0; p <= 0.98; p += 0.02) u.push(c(n(r, p)));
      const g = (p, b, P) => {
        (t.save(),
          (t.strokeStyle = b),
          (t.lineWidth = p),
          (t.lineCap = "butt"),
          P && t.setLineDash(P),
          t.beginPath(),
          u.forEach(([M, d], W) => (W ? t.lineTo(M, d) : t.moveTo(M, d))),
          t.stroke(),
          t.restore());
      };
      (g(0.95 * a + 4, "rgba(0,0,30,.35)"),
        g(0.95 * a, "#d9d6cb"),
        g(0.95 * a * 0.72, "rgba(120,118,108,.55)", [7, 5]),
        g(0.95 * a * 0.6, "#d9d6cb"));
    }
    return (Tt(t, 1024, 1024, s, 1024 * 1024 * 0.02, 0.04), e);
  }
  function M0() {
    const e = K(1024, 96),
      t = e.getContext("2d"),
      s = et(83);
    ((t.fillStyle = "#e4dccb"), t.fillRect(0, 0, 1024, 96));
    for (let a = 0; a < 1024; a += 3)
      ((t.fillStyle = a % 6 ? "rgba(255,255,255,.08)" : "rgba(80,60,30,.08)"),
        t.fillRect(a, 0, 1.5, 96));
    for (let a = 0; a < 20; a++)
      pt(
        t,
        s() * 1024,
        96 * (0.6 + s() * 0.4),
        20 + s() * 40,
        "rgba(120,90,40,.06)",
      );
    return (
      It(
        t,
        [
          [0, 96 * 0.18],
          [1024, 96 * 0.18],
        ],
        6,
        "rgba(110,95,70,.6)",
        1.6,
      ),
      e
    );
  }
  function S0() {
    const e = K(1024, 512),
      t = e.getContext("2d"),
      s = et(85);
    ((t.fillStyle = "#4f5e4c"),
      t.fillRect(0, 0, 1024, 512),
      zt(t, 1024, 512, s));
    for (let a = 1; a <= 7; a++)
      It(
        t,
        [
          [0, 512 * (1 - a * 0.072)],
          [1024, 512 * (1 - a * 0.072)],
        ],
        7,
        "rgba(30,40,30,.5)",
        2,
      );
    return ((t.fillStyle = vt), t.fillRect(0, 498, 1024, 14), e);
  }
  function d0() {
    const e = K(256, 160),
      t = e.getContext("2d");
    return (
      pt(t, 256 * 0.5, 160 * 0.5, 160 * 0.5, "rgba(255,190,110,.55)"),
      t.save(),
      t.translate(256 * 0.6, 160 * 0.5),
      t.scale(1, 0.55),
      (t.strokeStyle = "rgba(255,226,170,.55)"),
      (t.lineWidth = 10),
      (t.filter = "blur(7px)"),
      t.beginPath(),
      t.arc(0, 0, 160 * 0.42, -1.2, 1.2),
      t.stroke(),
      t.restore(),
      (t.filter = "none"),
      pt(t, 256 * 0.64, 160 * 0.5, 160 * 0.2, "rgba(255,232,190,.6)"),
      e
    );
  }
  const N = (n) => n;
  function b0(n) {
    const o = (r) => n.texture(r),
      e = (r) => n.mesh(r);
    function t() {
      const u = N({
          tex: o(s0("#a9ccba")),
          gloss: 0.18,
          specPow: 50,
          sheen: 0.06,
        }),
        g = N({
          color: [0.7, 0.82, 0.75, 1],
          gloss: 0.5,
          specPow: 90,
          sheen: 0.08,
          refl: 0.08,
        });
      return {
        id: "camera",
        parts: [
          {
            mesh: e(St(O(), 5.2, 6.1, 3.33, 1.9, { cz: 3.33, n: 14 })),
            mat: u,
          },
          {
            mesh: e(
              st(
                O(),
                [
                  [2.3, 8.5],
                  [2.55, 8.55],
                  [2.75, 8.42],
                  [2.9, 8.15],
                  [2.95, 7.3],
                  [3.05, 6.95],
                  [3.35, 6.72],
                  [3.6, 6.66],
                ],
                64,
                { cy: 0.8 },
              ),
            ),
            mat: g,
          },
          {
            mesh: e(
              st(
                O(),
                [
                  [1.25, 8.43],
                  [1.8, 8.45],
                  [2.3, 8.5],
                ],
                64,
                { uv: 4.8, cy: 0.8 },
              ),
            ),
            mat: N({ tex: o(l0()), gloss: 0.2, specPow: 60 }),
          },
          {
            mesh: e(
              st(
                O(),
                [
                  [0, 8.78],
                  [0.5, 8.74],
                  [0.95, 8.6],
                  [1.25, 8.43],
                ],
                48,
                { cy: 0.8 },
              ),
            ),
            mat: N({
              color: [0.04, 0.05, 0.08, 1],
              gloss: 1,
              specPow: 500,
              refl: 0.9,
            }),
          },
          {
            mesh: e(
              St(O(), 1.45, 0.72, 0.12, 0.1, {
                cx: -2.9,
                cy: -4.35,
                cz: 6.7,
                n: 6,
              }),
            ),
            mat: N({ tex: o(a0()), gloss: 0.7, specPow: 120, refl: 0.25 }),
          },
          {
            mesh: e(
              St(O(), 0.55, 0.45, 0.1, 0.08, {
                cx: 3.4,
                cy: -4.4,
                cz: 6.68,
                n: 5,
              }),
            ),
            mat: N({
              color: [0.06, 0.07, 0.09, 1],
              gloss: 1,
              specPow: 400,
              refl: 0.85,
            }),
          },
          {
            mesh: e(
              st(
                O(),
                [
                  [0, 6.72],
                  [0.45, 6.72],
                  [0.5, 6.68],
                ],
                32,
                { cx: 3.2, cy: -2.3 },
              ),
            ),
            mat: N({
              color: [0.62, 0.64, 0.66, 1],
              metal: 1,
              gloss: 1,
              specPow: 400,
              refl: 0.15,
            }),
          },
          {
            mesh: e(
              Pt(
                O(),
                Ut(
                  [
                    [4.4, 5.6, 4.6],
                    [5.6, 6.3, 3.3],
                    [6.6, 7.1, 1.4],
                    [7.5, 8.2, 0.32],
                    [8.8, 10, 0.25],
                    [8.4, 12.2, 0.25],
                    [6.6, 12.9, 0.25],
                    [5.1, 11.8, 0.3],
                    [4.9, 9.9, 0.45],
                    [5.2, 8.3, 1.1],
                    [4.9, 6.9, 2.9],
                    [4.2, 6, 4.1],
                  ],
                  10,
                ),
                0.42,
                0.13,
              ),
            ),
            mat: N({ tex: o(c0()), gloss: 0.05 }),
          },
        ],
        w: 10.4,
        h: 12.2,
        top: 6.66,
        interactive: !0,
        shot: [],
      };
    }
    function s() {
      const r = et(5),
        u = [
          {
            mesh: e(
              st(
                O(),
                [
                  [0, 0.45],
                  [5.1, 0.45],
                  [5.32, 0.38],
                  [5.4, 0.22],
                  [5.32, 0.03],
                  [0, 0],
                ],
                72,
                { uv: 10.8 },
              ),
            ),
            mat: N({ tex: o(Vt()), gloss: 0.02 }),
            still: !0,
          },
          {
            mesh: e(
              st(
                O(),
                [
                  [3.38, 1.6],
                  [3.74, 10.72],
                ],
                64,
                { uv: "z", zMax: 10.8 },
              ),
            ),
            mat: N({ tex: o(o0()), gloss: 0.2, specPow: 60 }),
            liquid: "side",
          },
          {
            mesh: e(
              st(
                O(),
                [
                  [0, 10.8],
                  [2.6, 10.8],
                  [3.5, 10.86],
                  [3.74, 10.98],
                ],
                64,
                { uv: 7.6 },
              ),
            ),
            mat: N({ tex: o(e0()), gloss: 0.55, specPow: 140, refl: 0.22 }),
            liquid: "top",
          },
          {
            mesh: e(
              Pt(
                O(),
                [
                  [-1.3, 1.1, 1.8],
                  [0.9, -0.8, 10.4],
                  [3.4, -2.9, 19.6],
                ],
                0.38,
                0.38,
                { sides: 18, up: [1, 0, 0] },
              ),
            ),
            mat: N({
              tex: o(n0("#f6f2ea", "#3f8a5c", 14, 1024, 64)),
              gloss: 0.08,
            }),
          },
        ];
      return (
        [
          [-1.2, -0.9, 10.9],
          [1.2, -0.3, 11],
          [0.1, 1.4, 10.75],
          [-1.8, 1.1, 10.5],
        ].forEach(([g, p, b]) => {
          const P = Jt(
            St(O(), 1.1, 1.05, 1, 0.42, { n: 6 }),
            Yt(r() * 0.8),
            Zt(r() * 0.8),
            Xt(r() * 3),
          );
          u.push({
            mesh: e(Qt(P, [g, p, b])),
            mat: N({
              clear: !0,
              color: [0.94, 0.98, 1, 1],
              opacity: 0.42,
              refl: 0.55,
              gloss: 1,
              specPow: 260,
              shadow: 0.3,
            }),
            ice: b,
          });
        }),
        u.push(
          {
            mesh: e(
              st(
                O(),
                [
                  [3.5, 0.55],
                  [3.62, 1.5],
                  [4.02, 13.3],
                  [4, 13.42],
                  [3.92, 13.47],
                ],
                72,
                { uv: "z", zMax: 13.5 },
              ),
            ),
            mat: N({
              clear: !0,
              tex: o(t0()),
              refl: 0.75,
              gloss: 1,
              specPow: 320,
              shadow: 0.25,
            }),
          },
          {
            mesh: e(
              st(
                O(),
                [
                  [3.92, 13.47],
                  [3.84, 13.42],
                  [3.8, 13.3],
                  [3.42, 1.9],
                  [3.2, 1.62],
                  [0, 1.55],
                ],
                72,
              ),
            ),
            mat: N({
              clear: !0,
              color: [0.93, 0.97, 0.98, 1],
              opacity: 0.06,
              refl: 0.6,
              gloss: 1,
              specPow: 320,
              shadow: 0.2,
            }),
          },
        ),
        {
          id: "coffee",
          parts: u,
          w: 10.8,
          h: 10.8,
          top: 13.47,
          rimR: 4,
          caustic: o(d0()),
          interactive: !0,
        }
      );
    }
    function a() {
      const r = N({
          color: [0.72, 0.73, 0.75, 1],
          metal: 1,
          gloss: 1,
          specPow: 400,
          refl: 0.1,
        }),
        u = St(O(), 6.5, 4, 1.8, 0.9, { cz: 1.8, n: 12 }),
        g = [];
      for (let P = 0; P < 64; P++) {
        const M = (P / 64) * C,
          d = Math.cos(M),
          W = Math.sin(M);
        g.push([
          -1.75 + Math.sign(d) * Math.pow(Math.abs(d), 0.3) * 3.95,
          Math.sign(W) * Math.pow(Math.abs(W), 0.3) * 3.3,
          3.62,
        ]);
      }
      const p = [
          [-6, -3.5, 3.2],
          [-10, -5, 2.4],
          [-14, -6.4, 1.6],
          [-17.5, -7.6, 1],
          [-20.5, -8.6, 0.55],
        ],
        b = [
          {
            mesh: e(u),
            mat: N({
              tex: o(r0()),
              gloss: 0.4,
              specPow: 80,
              sheen: 0.08,
              refl: 0.06,
            }),
          },
          {
            mesh: e(
              St(O(), 3.8, 3.15, 0.06, 0.05, { cx: -1.75, cz: 3.6, n: 4 }),
            ),
            mat: N({ tex: o(f0()), metal: 0.6, gloss: 0.6, specPow: 60 }),
          },
          { mesh: e(Pt(O(), g, 0.16, 0.12, { closed: !0 })), mat: r },
          {
            mesh: e(
              st(
                O(),
                [
                  [0, 2.3],
                  [1.9, 2.3],
                  [2.05, 2.1],
                  [2.05, 1.5],
                  [1.9, 1.3],
                  [0, 1.3],
                ],
                64,
                { uv: "arc", cx: 0, cy: 0 },
              ),
            ),
            mat: N({
              tex: o(h0()),
              metal: 0.85,
              gloss: 1,
              specPow: 200,
              color: [1, 0.86, 0.6, 1],
            }),
            wheel: [5.7, 1.4],
          },
          {
            mesh: e(St(O(), 1.2, 0.035, 0.02, 0.02, { cz: 3.62, n: 2 })),
            mat: N({ color: [0.75, 0.1, 0.1, 1] }),
            needle: !0,
          },
        ];
      for (let P = 0; P < p.length - 1; P++)
        b.push({
          mesh: e(
            Pt(O(), [p[P], p[P + 1]], 0.3 - P * 0.05, 0.3 - P * 0.05, {
              sides: 12,
              up: [0, 0, 1],
            }),
          ),
          mat: r,
        });
      return (
        b.push({
          mesh: e(
            st(
              O(),
              [
                [0, 0.85],
                [0.18, 0.8],
                [0.3, 0.55],
                [0.18, 0.3],
                [0, 0.25],
              ],
              16,
              { cx: p[4][0], cy: p[4][1] },
            ),
          ),
          mat: r,
        }),
        { id: "radio", parts: b, w: 13, h: 8, top: 3.6, interactive: !0 }
      );
    }
    function c() {
      const M = (m) => {
          const S = Math.cos(m);
          return [S * (S > 0 ? 8.4 : 9.4), 9.2 * Math.sin(m)];
        },
        d = (m) => 0.9 * Math.pow(Math.max(0, Math.cos(m)), 2),
        W = (m, S) => {
          const w = Math.pow(Math.max(0, Math.cos(m)), 1.5),
            l = (S * Math.PI) / 2,
            f = tt(Math.cos(l), 1 - S, w),
            h = M(m),
            y = d(m);
          return [h[0] * f, h[1] * f, y + (11 - y) * Math.sin(l)];
        },
        H = (m, S, w, l = 0.001) => {
          const f = m(S, w),
            h = m(S + l, w),
            y = m(S, w + l);
          return Mt(
            kt(
              h.map((k, R) => k - f[R]),
              y.map((k, R) => k - f[R]),
            ),
          );
        },
        x = (m, S) => H(W, m, Math.min(S, 0.99)),
        z = (m) => [m[0] / ut + 0.5, m[1] / ut + 0.5],
        I = N({ tex: o(p0(W)), gloss: 0.03, specPow: 10, sheen: 0.06 }),
        j = N({ tex: o(u0()), gloss: 0.03, specPow: 10, sheen: 0.06 }),
        D = [
          {
            mesh: e(
              ht(O(), 120, 40, (m, S) => {
                const w = W(m * C, S);
                return [w, x(m * C, S), z(w)];
              }),
            ),
            mat: I,
          },
        ];
      D.push({
        mesh: e(
          st(
            O(),
            [
              [0, 11 + 0.42],
              [0.42, 11 + 0.4],
              [0.7, 11 + 0.28],
              [0.8, 11 + 0.1],
              [0.72, 11 - 0.08],
            ],
            32,
          ),
        ),
        mat: I,
      });
      const q = 4.4,
        _ = 2.3,
        U = 4.9,
        ot = (m) =>
          m <= 1 ? 0.16 + 0.05 * (1 - m * m) : 0.16 * (1 - (m - 1) / 0.035),
        gt = (m, S) => {
          let w = Math.asin(Q(m / 9.2, -1, 1)) * 0.8,
            l = Math.asin(Q(S / 11, 0, 1)) / (Math.PI / 2);
          for (let f = 0; f < 14; f++) {
            const h = W(w, l),
              y = W(w + 1e-4, l),
              k = W(w, l + 1e-4),
              R = (y[1] - h[1]) / 1e-4,
              T = (k[1] - h[1]) / 1e-4,
              G = (y[2] - h[2]) / 1e-4,
              A = (k[2] - h[2]) / 1e-4,
              E = m - h[1],
              Y = S - h[2],
              B = R * A - T * G || 1e-6;
            ((w += (A * E - T * Y) / B),
              (l = Q(l + (R * Y - G * E) / B, 0, 0.98)));
          }
          return [w, l];
        },
        lt = (m, S) => {
          const w = Math.min(S, 1),
            [l, f] = gt(-Math.cos(m) * w * q, U + Math.sin(m) * w * _),
            h = W(l, f),
            y = x(l, f),
            k = ot(S);
          return [h[0] + y[0] * k, h[1] + y[1] * k, h[2] + y[2] * k];
        };
      D.push({
        mesh: e(
          ht(O(), 96, 16, (m, S) => {
            const w = m * C,
              l = S * 1.035,
              f = Math.min(l, 1);
            let h = H(lt, w, Math.max(l, 0.03));
            return (
              h[0] < 0 && (h = h.map((y) => -y)),
              [
                lt(w, l),
                h,
                [0.5 + Math.cos(w) * f * 0.5, 0.5 - Math.sin(w) * f * 0.5],
              ]
            );
          }),
        ),
        mat: N({ tex: o(g0()), gloss: 0.06, specPow: 20, sheen: 0.12 }),
      });
      const ct = (m, S) => Math.sign(m) * Math.pow(Math.abs(m), S),
        nt = M(1.42),
        it = 8.4 + 10 - nt[0],
        X = (m, S) => {
          const w = m * 1.42,
            l = M(w),
            f = (m * Math.PI) / 2,
            h = [
              nt[0] + it * ct(Math.cos(f), 0.72),
              nt[1] * ct(Math.sin(f), 0.72),
            ],
            y = d(w),
            k = 0.32 + 0.5 * (1 - m * m);
          return [
            tt(l[0], h[0], S),
            tt(l[1], h[1], S),
            tt(y, k, S) + 0.18 * Math.sin(S * Math.PI) * (1 - m * m),
          ];
        };
      D.push({
        mesh: e(
          ht(O(), 72, 20, (m, S) => {
            const w = m * 2 - 1;
            let l = H(X, w, S);
            return (l[2] < 0 && (l = l.map((f) => -f)), [X(w, S), l, [m, S]]);
          }),
        ),
        mat: j,
      });
      const rt = [];
      for (let m = 0; m <= 64; m++) {
        const S = X(-1 + (m / 64) * 2, 1);
        rt.push([S[0], S[1], S[2] - 0.1]);
      }
      D.push({
        mesh: e(Pt(O(), rt, 0.17, 0.14, { sides: 10 })),
        mat: N({
          color: [0.12, 0.22, 0.7, 1],
          gloss: 0.03,
          specPow: 10,
          sheen: 0.05,
        }),
      });
      const $ = (m, S) => {
        const w = W(m, S),
          l = x(m, S);
        return [w[0] - l[0] * 0.12, w[1] - l[1] * 0.12, w[2] - l[2] * 0.12];
      };
      (D.push({
        mesh: e(
          ht(O(), 96, 30, (m, S) => [
            $(m * C, S * 0.985),
            x(m * C, S * 0.985).map((l) => -l),
            z(W(m * C, S * 0.985)),
          ]),
        ),
        mat: N({ tex: o(m0(W)), gloss: 0.02, specPow: 10, sheen: 0.04 }),
      }),
        D.push({
          mesh: e(
            ht(O(), 120, 4, (m, S) => {
              const w = m * C,
                l = M(w),
                f = Math.hypot(...l),
                h = (f - 0.3) / f,
                y = d(w) + 0.06 + S * 2.6;
              return [
                [l[0] * h, l[1] * h, y],
                [-l[0] / f, -l[1] / f, 0],
                [m * 6, S],
              ];
            }),
          ),
          mat: N({ tex: o(M0()), gloss: 0.02, specPow: 10 }),
        }),
        D.push({
          mesh: e(
            ht(O(), 72, 20, (m, S) => {
              const w = m * 2 - 1,
                l = X(w, S);
              let f = H(X, w, S);
              return (
                f[2] > 0 && (f = f.map((h) => -h)),
                [[l[0], l[1], l[2] - 0.08], f, [m, S]]
              );
            }),
          ),
          mat: N({ tex: o(S0()), gloss: 0.03, specPow: 10, sheen: 0.05 }),
        }));
      const bt = [];
      for (let m = 0; m < 36; m++)
        for (let S = 0; S <= 8; S++) bt.push(W((m / 36) * C, S / 8));
      bt.push([0, 0, 11 + 0.42]);
      for (let m = 0; m <= 24; m++)
        for (let S = 1; S <= 4; S++) bt.push(X(-1 + m / 12, S / 4));
      const Ht = 325,
        yt = [0, 0, 11 / 2],
        Rt = (m, S) =>
          bt.map((w) => {
            let l = w[0] - yt[0],
              f = w[1],
              h = w[2] - yt[2];
            return (
              ([f, h] = [
                f * Math.cos(m) - h * Math.sin(m),
                f * Math.sin(m) + h * Math.cos(m),
              ]),
              ([l, h] = [
                l * Math.cos(S) + h * Math.sin(S),
                -l * Math.sin(S) + h * Math.cos(S),
              ]),
              h + yt[2]
            );
          }),
        Bt = (m) => {
          const S = Rt(Math.PI, m);
          return Math.min(...S.slice(Ht)) - Math.min(...S.slice(0, Ht));
        };
      let dt = 0,
        Ct = 1.4;
      for (let m = 0; m < 40; m++) {
        const S = (dt + Ct) / 2;
        Bt(S) > 0 ? (dt = S) : (Ct = S);
      }
      const Lt = (m, S) => Math.min(...Rt(m, S));
      return {
        id: "cap",
        parts: D,
        w: 18.4,
        h: 27,
        top: 11,
        rest: [
          [0, 11, 8, 8],
          [8.4 + 5, 0.8, 5, 14],
        ],
        interactive: !0,
        pick: [(8.4 + 10 - 9.4) / 2, (8.4 + 10 + 9.4) / 2, 9.2 + 0.4],
        tip: dt,
        pivot: yt,
        lowest: Lt,
        back: 9.4,
      };
    }
    const i = [1, 2, 3, 4, 5].map((r) => {
      const u = i0(`/picnic/photos/${r}.jpg`, r),
        g = { a: o(u.undeveloped), b: o(u.developed) };
      return (u.load.then((p) => p && n.upload(g.b, u.developed)), g);
    });
    return { camera: t(), coffee: s(), radio: a(), cap: c(), photos: i };
  }
  function y0(n, o) {
    const e = b0(n),
      t = [e.camera, e.coffee, e.radio, e.cap];
    let s = 16,
      a = {},
      c = !1,
      i = 0;
    const r = 10.8,
      u = [10.8, 8.4, 6, 3.6, 2],
      g = { level: r, from: r, to: r, t0: -9, refill: !1, sips: 0, hov: 0 },
      p = { over: !1, t0: -9, hov: 0 },
      b = 1.05,
      P = { camera: 0, radio: 0 };
    let M = 0;
    const d = Scene.L,
      W = Mt([-d[0], -d[1], 0]);
    function H(l) {
      const { vw: f, vh: h, cw: y, portrait: k } = l;
      s = Q(Math.min(f, h * 1.25) * 0.0165, 5.5, 22);
      const R = h / 2,
        T = -h / 2;
      k
        ? ((s = Q(f * 0.03, 6, 14)),
          (a = {
            coffee: [-f / 2 + 6.5 * s, T + 7.5 * s, 0.2],
            cap: [f / 2 - 2 * s, T + 3.5 * s, 2.5],
            camera: [f / 2 - 6 * s, R - 10 * s, -1.9],
            radio: [-f / 2 + 9 * s, R - 5.5 * s, 0.1],
          }))
        : (a = {
            cap: [-f / 2 + 7.5 * s, T + 3.5 * s, 1.38],
            coffee: [y / 2 + 8 * s, T + 8.5 * s, 0.2],
            camera: [y / 2 + 5 * s, R - 7 * s, 0.9],
            radio: [-y / 2 - 4 * s, R - 6.8 * s, -0.14],
          });
    }
    const x = (l, f, h) => {
        const y = Math.cos(l),
          k = Math.sin(l);
        let R = [y, k, 0, -k, y, 0, 0, 0, 1];
        return (h && (R = z(R, h)), { M: R.map((T) => T * f), MN: R });
      },
      z = (l, f) => {
        const h = new Array(9);
        for (let y = 0; y < 3; y++)
          for (let k = 0; k < 3; k++)
            h[y * 3 + k] =
              l[k] * f[y * 3] +
              l[3 + k] * f[y * 3 + 1] +
              l[6 + k] * f[y * 3 + 2];
        return h;
      },
      I = (l) => {
        const f = Math.cos(l),
          h = Math.sin(l);
        return [f, h, 0, -h, f, 0, 0, 0, 1];
      },
      j = (l) => {
        const f = Math.cos(l),
          h = Math.sin(l);
        return [1, 0, 0, 0, f, h, 0, -h, f];
      },
      D = (l) => {
        const f = Math.cos(l),
          h = Math.sin(l);
        return [f, 0, -h, 0, 1, 0, h, 0, f];
      },
      q = (l, f) =>
        [0, 1, 2].map((h) => l[h] * f[0] + l[3 + h] * f[1] + l[6 + h] * f[2]),
      _ = [1, 0, 0, 0, 1, 0, 0, 0, 1],
      U = (l = _, f = [0, 0, 0], h = l) => ({ A: l, b: f, R: h }),
      ot = (l, f) => ({
        A: z(l.A, f.A),
        b: q(l.A, f.b).map((h, y) => h + l.b[y]),
        R: z(l.R, f.R),
      }),
      gt = (l, f) =>
        U(
          l,
          f.map((h, y) => h - q(l, f)[y]),
        ),
      lt = (l) => ((l = Q(l)), l * l * (3 - 2 * l)),
      ct = (l, f, h) => {
        const y = I(l[2]),
          k = q(y, f.b);
        return {
          mesh: h.mesh,
          mat: h.mat,
          M: z(y, f.A).map((R) => R * s),
          MN: z(y, f.R),
          pos: [l[0] + k[0] * s, l[1] + k[1] * s, k[2] * s],
        };
      },
      nt = (l, f, h, y = 0) => {
        const k = Math.cos(l[2]),
          R = Math.sin(l[2]);
        return [l[0] + (f * k - h * R) * s, l[1] + (f * R + h * k) * s, y * s];
      },
      it = (l, f, h, y) => Math.abs(l[0] - f) < h / 2 + y * s + 40,
      X = [];
    let rt = 0;
    const $ = { n: -1, p: 0, open: !1, cam: 0, camY: 0 },
      bt = (l) => (
        (l = Q(l)),
        l < 0.5 ? 4 * l * l * l : 1 - Math.pow(-2 * l + 2, 3) / 2
      );
    let Ht = -1;
    function yt({
      now: l,
      cam: f,
      camY: h = 0,
      vw: y,
      vh: k,
      objects: R,
      meshes: T,
      supports: G,
      hover: A,
      dt: E,
    }) {
      const Y = l / 1e3;
      M = Y;
      for (const B of t) {
        const L = a[B.id];
        if (!L || !it(L, f, y, 22)) continue;
        const v = x(L[2], s),
          J = [L[0], L[1], 0];
        if (B.id === "coffee") {
          (Rt(B, L, Y, E, A === "coffee", T), G.push(...dt(B, L)));
          continue;
        }
        if (B.id === "cap") {
          (Bt(B, L, Y, E, A === "cap", T), G.push(...dt(B, L)));
          continue;
        }
        P[B.id] += ((A === B.id ? 1 : 0) - P[B.id]) * (1 - Math.exp(-E * 10));
        const at = 0.7 * s * P[B.id];
        for (const F of B.parts) {
          let Z = { mesh: F.mesh, mat: F.mat, M: v.M, MN: v.MN, pos: J };
          if (F.wheel) {
            const ft = nt(L, F.wheel[0], F.wheel[1]),
              mt = x(L[2], s, I(i));
            Z = { ...Z, M: mt.M, MN: mt.MN, pos: ft };
          }
          (F.needle && (Z = { ...Z, pos: nt(L, 3.9, -2.2 + Q(i / 4.2) * 2.4) }),
            T.push({ ...Z, pos: [Z.pos[0], Z.pos[1], Z.pos[2] + at] }));
        }
        G.push(...dt(B, L));
      }
      i += ((c ? 4.2 : 0) - i) * (1 - Math.exp(-E * 3));
      {
        const B = a.coffee;
        if (B && it(B, f, y, 30)) {
          const L = 13.5 * s * 0.42,
            v = nt(B, 0, 0);
          R.push({
            mode: 3,
            pos: [
              v[0] + (W[0] * L * 0.72) / 0.81,
              v[1] + (W[1] * L * 0.72) / 0.81,
              0.6 * s,
            ],
            size: [9 * s, 5.6 * s],
            rot: [Math.atan2(W[1], W[0]), 0, 0],
            texA: e.coffee.caustic,
            alpha: 0.75,
          });
        }
      }
      {
        const B = a.camera;
        ($.open &&
          (Math.abs(f - $.cam) > 40 || Math.abs(h - $.camY) > 40) &&
          ($.open = !1),
          $.n >= 0 &&
            (($.p = Q($.p + ($.open ? E : -E) / 0.85)),
            !$.open && $.p <= 0 && ($.n = -1)),
          (Ht = A && A.startsWith("shot") ? +A.slice(4) : -1));
        for (let L = X.length - 1; L >= 0; L--) {
          const v = X[L],
            J = Y - v.t0,
            at = Gt(Q(J / 1.4));
          let F = 0,
            Z = -6.1 + 4.3 - at * 7.4,
            ft = 3.3,
            mt = 0,
            $t = 0;
          if (J > 1.4) {
            const V = Gt(Q((J - 1.4) / 0.5));
            ((Z -= V * (4 + v.j * 2)),
              (F += V * v.dx),
              (ft = tt(3.3, 0.06, V)),
              (mt = Math.sin(V * Math.PI) * 0.35),
              ($t = V * v.dyaw));
          }
          if (v.gone) {
            const V = Y - v.gone;
            if (((Z -= V * V * 120), V > 2)) {
              X.splice(L, 1);
              continue;
            }
          }
          const qt = nt(B, F, Z, 0),
            Ot = Q((J - 2.2) / 7);
          v.hv =
            (v.hv || 0) +
            ((Ht === v.n && $.n < 0 ? 1 : 0) - (v.hv || 0)) *
              (1 - Math.exp(-E * 10));
          let Wt = [qt[0], qt[1], (ft + 0.5 * v.hv) * s + 0.6],
            jt = [B[2] + $t, mt, 0],
            Ft = 0;
          const At = [5.4 * s, 8.6 * s];
          if ($.n === v.n) {
            const V = $.p,
              P0 = Math.sin(Math.PI * V),
              _t = lt(V / 0.7),
              xt = bt((V - 0.15) / 0.85),
              H0 = Math.max(
                1.05,
                Math.min((0.82 * k) / At[1], (0.9 * y) / At[0]),
              ),
              Kt = jt[0],
              W0 = Kt - Math.round(Kt / C) * C;
            ((Wt = [
              tt(Wt[0], f, xt),
              tt(Wt[1], h, xt),
              tt(Wt[2], Scene.D * (1 - 1 / H0), _t),
            ]),
              (jt = [
                tt(W0, 0, xt),
                tt(mt, 0, _t) + 0.1 * P0 + 0.012 * xt * Math.sin(l / 900),
                0.01 * xt * Math.sin(l / 1300 + 1),
              ]),
              (Ft = 0.6 * V));
          }
          const Dt = {
            pos: Wt,
            size: At,
            rot: jt,
            texA: v.tex.a,
            texB: v.tex.b,
            mixB: Ot * Ot * (3 - 2 * Ot),
            gloss: 0.3,
            sheen: 0.12,
            dapple: Ft,
          };
          ((v.obj = Dt),
            R.push(Dt),
            J > 2 &&
              G.push({
                id: "shot" + v.n,
                obj: Dt,
                stable: !v.gone && $.n !== v.n && v.hv < 0.05,
              }));
        }
      }
    }
    function Rt(l, f, h, y, k, R) {
      g.hov += ((k ? 1 : 0) - g.hov) * (1 - Math.exp(-y * 10));
      const T = h - g.t0,
        A = !g.refill && T < 1.25 ? Math.sin(Math.PI * lt(T / 1.25)) : 0;
      g.level = tt(g.from, g.to, lt(g.refill ? T / 1.5 : (T - 0.25) / 0.7));
      const E = 0.9 * g.hov * (1 - A) + 2.2 * A,
        Y = 0.2 * A,
        B = ot(U(_, [0, 0, E]), gt(D(Y), [-3.6, 0, 0.5])),
        L = g.level,
        v = (L - 1.6) / 9.12,
        J = (3.38 + 0.36 * v) / 3.74,
        at = tt(0.62, 1, v);
      for (const F of l.parts)
        F.liquid && (F.mat.color = [at, at * 0.97, at * 0.94, 1]);
      l.parts.forEach((F, Z) => {
        let ft = F.still ? U() : B;
        if (
          (F.liquid === "side" &&
            (ft = ot(
              B,
              U([J, 0, 0, 0, J, 0, 0, 0, v], [0, 0, 1.6 - 1.6 * v], _),
            )),
          F.liquid === "top" &&
            (ft = ot(B, U([J, 0, 0, 0, J, 0, 0, 0, 1], [0, 0, L - r], _))),
          F.ice != null)
        ) {
          const mt = 0.12 * Math.sin(h * 2.1 + Z) * g.hov;
          ft = ot(
            B,
            U(_, [
              0,
              0,
              Math.max(L + (F.ice - r), 1.9 + (Z % 4) * 0.55) - F.ice + mt,
            ]),
          );
        }
        R.push(ct(f, ft, F));
      });
    }
    function Bt(l, f, h, y, k, R) {
      p.hov += ((k ? 1 : 0) - p.hov) * (1 - Math.exp(-y * 10));
      const T = (h - p.t0) / b,
        G = lt(p.over ? T : 1 - T),
        A = T < 1 ? Math.sin(Math.PI * Q(T)) : 0,
        E =
          T >= 1
            ? 0.07 * Math.exp(-(T - 1) * b * 7) * Math.sin((T - 1) * b * 22)
            : 0,
        Y = Math.PI * G,
        B = l.tip * G + E + (p.over ? -0.05 : 0) * p.hov,
        L = -l.lowest(Y, B) + 6 * A;
      let v = ot(U(_, [0, 0, L]), gt(z(D(B), j(Y)), l.pivot));
      G < 0.01 && (v = gt(D(-0.15 * p.hov), [-l.back, 0, 0]));
      for (const J of l.parts) R.push(ct(f, v, J));
    }
    function dt(l, f) {
      const h = (y, k, R, T, G, A = 0) => {
        const E = nt(f, A, 0);
        return {
          id: y,
          obj: {
            pos: [E[0], E[1], k * s],
            size: [R * s, T * s],
            rot: [f[2], 0, 0],
          },
          stable: !0,
          fit: G,
        };
      };
      return l.id === "cap"
        ? !p.over && M - p.t0 > b + 0.6 && p.hov < 0.05
          ? l.rest.map(([k, R, T, G], A) => h("cap" + A, R, T, G, 0.9, k))
          : []
        : l.id === "coffee"
          ? [
              ...(M - g.t0 > 1.6 && g.hov < 0.05
                ? [h("coffee", l.top, 8, 8, 0.95)]
                : []),
              h("coaster", 0.45, 10.8, 10.8, 0.9),
            ]
          : P[l.id] > 0.05
            ? []
            : [h(l.id, l.top, l.w, l.h, 0.92)];
    }
    function Ct(l, f, h, y, k, R = 0) {
      for (let T = X.length - 1; T >= 0; T--) {
        const G = X[T],
          A = G.obj;
        if (!A || G.gone || M - G.t0 < 2) continue;
        const E = Scene.D / (Scene.D - A.pos[2]),
          Y = (l - ((A.pos[0] - h) * E + y / 2)) / E,
          B = (f - ((A.pos[1] - R) * E + k / 2)) / E,
          L = Math.cos(-A.rot[0]),
          v = Math.sin(-A.rot[0]);
        if (
          Math.abs(Y * L - B * v) < A.size[0] / 2 &&
          Math.abs(Y * v + B * L) < A.size[1] / 2
        )
          return "shot" + G.n;
      }
      for (const T of t) {
        if (!T.interactive) continue;
        const G = a[T.id];
        if (!G) continue;
        const A = T.top * s,
          E = Scene.D / (Scene.D - A),
          Y = (G[0] - h) * E + y / 2,
          B = (G[1] - R) * E + k / 2,
          L = (l - Y) / (E * s),
          v = (f - B) / (E * s),
          J = Math.cos(-G[2]),
          at = Math.sin(-G[2]),
          F = L * J - v * at,
          Z = L * at + v * J;
        if (
          T.pick
            ? Math.abs(F - T.pick[0]) < T.pick[1] && Math.abs(Z) < T.pick[2]
            : Math.abs(F) < T.w / 2 && Math.abs(Z) < T.h / 2
        )
          return T.id;
      }
      return null;
    }
    function Lt(l, f, h = 0, y = 0) {
      const k = f / 1e3;
      if (l.startsWith("shot")) {
        Object.assign($, { n: +l.slice(4), open: !0, cam: h, camY: y });
        return;
      }
      if (l === "camera") {
        if (X.some((T) => k - T.t0 < 1.6)) return;
        const R = X.filter((T) => !T.gone);
        if (R.length >= 3) {
          const T = R.find((G) => G.n !== $.n);
          T && (T.gone = k);
        }
        (rt++,
          o.sound && o.sound("shutter"),
          X.push({
            t0: k,
            n: rt,
            tex: e.photos[(rt - 1) % e.photos.length],
            j: R.length % 3,
            dx: (Math.random() - 0.5) * 3,
            dyaw: (Math.random() - 0.5) * 0.5,
          }));
      } else if (l === "radio") o.radio && o.radio();
      else if (l === "coffee") {
        if (k - g.t0 < (g.refill ? 1.5 : 1.25)) return;
        const R = g.sips >= u.length - 1;
        ((g.refill = R),
          (g.sips = R ? 0 : g.sips + 1),
          Object.assign(g, { from: g.level, to: u[g.sips], t0: k }),
          R || (o.sound && o.sound("slurp", 0.22)));
      } else if (l === "cap") {
        if (k - p.t0 < b) return;
        ((p.over = !p.over), (p.t0 = k));
      }
    }
    function m(l) {
      c = l;
    }
    return {
      layout: H,
      frame: yt,
      pick: Ct,
      click: Lt,
      setRadio: m,
      holding: () => $.n >= 0 && $.open,
      release: () => {
        $.open = !1;
      },
    };
  }
  return { create: y0 };
})();
