// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
window.Print = (() => {
  const C = Math.PI * 2,
    Z = "#2b2824",
    pe = "#f4eee0";
  function oe(e) {
    let s = e >>> 0;
    return () => {
      s = (s + 1831565813) | 0;
      let c = Math.imul(s ^ (s >>> 15), 1 | s);
      return (
        (c = (c + Math.imul(c ^ (c >>> 7), 61 | c)) ^ c),
        ((c ^ (c >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  function le(e) {
    const s = oe(e),
      c = new Float32Array(4096);
    for (let t = 0; t < c.length; t++) c[t] = s();
    const r = (t, n) =>
      c[((Math.imul(t, 73856093) ^ Math.imul(n, 19349663)) >>> 0) & 4095];
    return (t, n) => {
      const l = Math.floor(t),
        f = Math.floor(n),
        o = t - l,
        a = n - f,
        u = o * o * (3 - 2 * o),
        i = a * a * (3 - 2 * a),
        d = r(l, f),
        h = r(l + 1, f),
        m = r(l, f + 1),
        g = r(l + 1, f + 1);
      return d + (h - d) * u + (m - d) * i + (d - h - m + g) * u * i;
    };
  }
  function P(e, s) {
    const c = document.createElement("canvas");
    return ((c.width = Math.round(e)), (c.height = Math.round(s)), c);
  }
  function W(e, s, c, r, t, n) {
    (e.beginPath(),
      e.moveTo(s + n, c),
      e.arcTo(s + r, c, s + r, c + t, n),
      e.arcTo(s + r, c + t, s, c + t, n),
      e.arcTo(s, c + t, s, c, n),
      e.arcTo(s, c, s + r, c, n),
      e.closePath());
  }
  function x(e, s, c, r = "Geist") {
    e.font = `${s} ${c}px ${r === "Geist" ? "'Geist', sans-serif" : r === "mono" ? "'Geist Mono', monospace" : "'Yellowtail', cursive"}`;
  }
  function F(e, s, c, r, t, n = "left") {
    const l = [...s],
      f = l.map((i) => e.measureText(i).width),
      o = f.reduce((i, d) => i + d, 0) + t * (l.length - 1);
    let a = n === "center" ? c - o / 2 : n === "right" ? c - o : c;
    const u = e.textAlign;
    return (
      (e.textAlign = "left"),
      l.forEach((i, d) => {
        (e.fillText(i, a, r), (a += f[d] + t));
      }),
      (e.textAlign = u),
      o
    );
  }
  function ge(e, s, c) {
    const r = s.split(" "),
      t = [];
    let n = "";
    for (const l of r) {
      const f = n ? n + " " + l : l;
      e.measureText(f).width > c && n ? (t.push(n), (n = l)) : (n = f);
    }
    return (n && t.push(n), t);
  }
  function we(e, s, c, r, t, n, l, f) {
    const o = [...s],
      a = o.map((d) => e.measureText(d).width),
      u = a.reduce((d, h) => d + h, 0) + l * (o.length - 1);
    let i = 0;
    o.forEach((d, h) => {
      const m = n + (f * (i + a[h] / 2 - u / 2)) / t;
      (e.save(),
        e.translate(c + t * Math.cos(m), r + t * Math.sin(m)),
        e.rotate(m + (f * Math.PI) / 2),
        e.fillText(d, -a[h] / 2, 0),
        e.restore(),
        (i += a[h] + l));
    });
  }
  function Q(e, s, c, r, t, n = 14) {
    const l = e.canvas.width,
      f = e.canvas.height;
    (e.save(),
      e.setTransform(1, 0, 0, 1, 0, 0),
      (e.fillStyle = r),
      e.fillRect(0, 0, l, f));
    const o = oe(t),
      a = le(t + 1),
      u = e.getImageData(0, 0, l, f),
      i = u.data,
      d = Math.max(l, f) / 180;
    for (let h = 0, m = 0; h < f; h++)
      for (let g = 0; g < l; g++, m += 4) {
        const b = (o() - 0.5) * n + (a(g / d, h / d) - 0.5) * n * 0.8;
        ((i[m] += b), (i[m + 1] += b), (i[m + 2] += b * 0.9));
      }
    (e.putImageData(u, 0, 0), e.save(), (e.lineWidth = Math.max(1, l / 1400)));
    for (let h = 0; h < (l * f) / 9e3; h++) {
      const m = o() * l,
        g = o() * f,
        b = o() * C,
        T = (4 + o() * 10) * (l / 1e3);
      ((e.strokeStyle =
        o() < 0.5 ? "rgba(120,96,70,.12)" : "rgba(255,255,255,.25)"),
        e.beginPath(),
        e.moveTo(m, g),
        e.quadraticCurveTo(
          m + Math.cos(b + 1) * T * 0.5,
          g + Math.sin(b + 1) * T * 0.5,
          m + Math.cos(b) * T,
          g + Math.sin(b) * T,
        ),
        e.stroke());
    }
    (e.restore(), e.restore());
  }
  function Se(e, s) {
    const c = e.getContext("2d"),
      r = c.getImageData(0, 0, e.width, e.height),
      t = r.data,
      n = le(s),
      l = le(s + 9),
      f = oe(s + 3),
      o = e.width / 60;
    for (let a = 0, u = 0; a < e.height; a++)
      for (let i = 0; i < e.width; i++, u += 4) {
        if (!t[u + 3]) continue;
        const d = Math.min(
          1,
          Math.max(
            0.12,
            (n(i / o, a / o) * 0.7 +
              l(i / (o * 0.3), a / (o * 0.3)) * 0.3 -
              0.18) *
              2.6,
          ),
        );
        t[u + 3] *= d * (f() < 0.04 ? 0.3 : 1);
      }
    c.putImageData(r, 0, 0);
  }
  function ue({
    R: e,
    top: s,
    bottom: c,
    l1: r,
    l2: t,
    color: n,
    waves: l = 0,
    waveLen: f = 0,
    seed: o = 1,
    k: a = 2,
  }) {
    const u = e * 0.12,
      i = 2 * e + 2 * u + f,
      d = 2 * e + 2 * u,
      h = P(i * a, d * a),
      m = h.getContext("2d");
    m.scale(a, a);
    const g = l < 0 ? i - e - u : e + u,
      b = d / 2;
    if (
      ((m.strokeStyle = m.fillStyle = n),
      (m.lineWidth = e * 0.055),
      m.beginPath(),
      m.arc(g, b, e, 0, C),
      m.stroke(),
      (m.lineWidth = e * 0.03),
      m.beginPath(),
      m.arc(g, b, e * 0.56, 0, C),
      m.stroke(),
      x(m, 700, e * 0.19),
      we(m, s, g, b, e * 0.7, -Math.PI / 2, e * 0.035, 1),
      we(m, c, g, b, e * 0.86, Math.PI / 2, e * 0.035, -1),
      m.beginPath(),
      m.arc(g - e * 0.78, b, e * 0.045, 0, C),
      m.arc(g + e * 0.78, b, e * 0.045, 0, C),
      m.fill(),
      (m.textAlign = "center"),
      x(m, 800, e * 0.25),
      m.fillText(r, g, b + e * 0.02),
      x(m, 600, e * 0.17),
      F(m, t, g, b + e * 0.3, e * 0.02, "center"),
      l)
    ) {
      ((m.lineWidth = e * 0.05), (m.lineCap = "round"));
      for (let T = 0; T < 4; T++) {
        const v = b - e * 0.48 + T * e * 0.32,
          M = l > 0 ? g + e * 1.06 : g - e * 1.06;
        m.beginPath();
        for (let w = 0; w <= f - e * 0.1; w += 1)
          m.lineTo(
            M + l * w,
            v + Math.sin((w / (e * 0.36)) * Math.PI) * e * 0.08,
          );
        m.stroke();
      }
    }
    return (Se(h, o), { canvas: h, W: i, H: d, cx: g, cy: b });
  }
  const R = 440,
    z = 308,
    ae = 2.5;
  function be(e, s, c, r = 7.5) {
    (e.save(), (e.globalCompositeOperation = "destination-out"), e.beginPath());
    const t = Math.round(s / (r * 2.7)),
      n = Math.round(c / (r * 2.7));
    for (let l = 0; l <= t; l++) {
      const f = (l * s) / t;
      (e.moveTo(f + r, 0),
        e.arc(f, 0, r, 0, C),
        e.moveTo(f + r, c),
        e.arc(f, c, r, 0, C));
    }
    for (let l = 0; l <= n; l++) {
      const f = (l * c) / n;
      (e.moveTo(r, f),
        e.arc(0, f, r, 0, C),
        e.moveTo(s + r, f),
        e.arc(s, f, r, 0, C));
    }
    (e.fill(), e.restore());
  }
  function Me(e, s) {
    const c = P(R * ae, z * ae),
      r = c.getContext("2d");
    if ((e && r.drawImage(e, 0, 0, c.width, c.height), !s)) return c;
    const t = P(c.width, c.height),
      n = t.getContext("2d");
    (n.drawImage(c, 0, 0), n.scale(ae, ae));
    const l = ue({ ...s, k: ae });
    return (
      (n.globalAlpha = 0.88),
      n.drawImage(l.canvas, s.x - l.cx, s.y - l.cy, l.W, l.H),
      (n.globalAlpha = 1),
      (n.globalCompositeOperation = "destination-in"),
      n.setTransform(1, 0, 0, 1, 0, 0),
      n.drawImage(c, 0, 0),
      { plain: c, inked: t }
    );
  }
  function Ke(e, s, c, r, t, n) {
    const o = P((t + 12) * 3, (n + 12) * 3),
      a = o.getContext("2d");
    (a.scale(3, 3), a.translate(6, 6));
    const u = () => {
      if ((a.beginPath(), e === "sun")) {
        for (let h = 0; h < 28; h++) {
          const m = (h / 28) * C - Math.PI / 2,
            g = (h % 2 ? 0.38 : 0.48) * t;
          a.lineTo(t / 2 + Math.cos(m) * g, n / 2 + Math.sin(m) * g);
        }
        a.closePath();
      } else
        e === "oval"
          ? a.ellipse(t / 2, n / 2, t / 2 - 2, n / 2 - 2, 0, 0, C)
          : e === "square"
            ? W(a, 2, 2, t - 4, n - 4, t * 0.13)
            : a.arc(t / 2, n / 2, t / 2 - 2, 0, C);
    };
    (u(),
      (a.lineJoin = "round"),
      (a.lineWidth = 7),
      (a.strokeStyle = a.fillStyle = "#fffdf6"),
      a.stroke(),
      a.fill(),
      u(),
      (a.fillStyle = c),
      a.fill(),
      a.save(),
      a.translate(t / 2, n / 2),
      a.scale(0.8, 0.8),
      a.translate(-t / 2, -n / 2),
      u(),
      a.restore(),
      a.setLineDash([3, 3]),
      (a.lineWidth = 1.1),
      (a.strokeStyle = r),
      a.stroke(),
      a.setLineDash([]));
    const i = s.split(`
`),
      d = Math.max(...i.map((h) => h.length)) > 7 ? t * 0.13 : t * 0.19;
    return (
      x(a, 800, d),
      (a.fillStyle = r),
      (a.textAlign = "center"),
      (a.textBaseline = "middle"),
      i.forEach((h, m) =>
        a.fillText(h, t / 2, n / 2 + (m - (i.length - 1) / 2) * d * 1.05),
      ),
      { canvas: o, w: t + 12, h: n + 12 }
    );
  }
  function We(e, s, c, r) {
    const t = c / e,
      n = P(c, s * t),
      l = n.getContext("2d");
    Q(l, n.width, n.height, "#f6f0e3", 61, 10);
    const f = e * 0.034 * t,
      o = P(n.width - 2 * f, n.height - 2 * f);
    if (r) {
      const i = Math.max(o.width / r.width, o.height / r.height),
        d = r.width * i,
        h = r.height * i,
        m = Math.min(0, Math.max(o.width - d, o.width / 2 - 0.47 * d)),
        g = Math.min(0, Math.max(o.height - h, o.height / 2 - 0.5 * h));
      o.getContext("2d").drawImage(r, m, g, d, h);
    } else Paint.paint(o, "town");
    return (
      l.save(),
      W(l, f, f, o.width, o.height, t * 2),
      l.clip(),
      l.drawImage(o, f, f),
      l.restore(),
      n
    );
  }
  function Ee(e, s, c, r = 0.5, t = 0.5) {
    const n = c / e,
      l = P(c, s * n),
      f = l.getContext("2d");
    Q(f, l.width, l.height, "#f6f0e3", 61, 10);
    const o = e * 0.034 * n,
      a = l.width - 2 * o,
      u = l.height - 2 * o;
    return {
      canvas: l,
      draw(i) {
        const d = i.videoWidth || i.naturalWidth || i.width,
          h = i.videoHeight || i.naturalHeight || i.height;
        if (!d || !h) return !1;
        const m = Math.max(a / d, u / h),
          g = d * m,
          b = h * m,
          T = Math.min(0, Math.max(a - g, a / 2 - r * g)),
          v = Math.min(0, Math.max(u - b, u / 2 - t * b));
        return (
          f.save(),
          W(f, o, o, a, u, n * 2),
          f.clip(),
          f.drawImage(i, o + T, o + v, g, b),
          f.restore(),
          !0
        );
      },
    };
  }
  function De(e, s, c, r, t) {
    const n = {
        research: "#3a8a55",
        design: "#e2533a",
        prototype: "#2c56c4",
        build: "#f2b52f",
      }[s],
      l = () => {
        if ((e.beginPath(), s === "research"))
          for (let o = 0; o <= 64; o++) {
            const a = (o / 64) * C,
              u = t * (0.46 + 0.035 * Math.cos(a * 12));
            e.lineTo(t / 2 + Math.cos(a) * u, t / 2 + Math.sin(a) * u);
          }
        else if (s === "design")
          (e.moveTo(t * 0.08, t),
            e.lineTo(t * 0.08, t * 0.46),
            e.arc(t / 2, t * 0.46, t * 0.42, Math.PI, 0),
            e.lineTo(t * 0.92, t));
        else if (s === "prototype")
          W(e, t * 0.04, t * 0.04, t * 0.92, t * 0.92, t * 0.2);
        else
          for (let o = 0; o <= 80; o++) {
            const a = (o / 80) * C,
              u =
                t *
                (0.44 +
                  0.05 *
                    Math.sign(Math.cos(a * 9)) *
                    Math.min(1, Math.abs(Math.cos(a * 9)) * 3));
            e.lineTo(t / 2 + Math.cos(a) * u, t / 2 + Math.sin(a) * u);
          }
        e.closePath();
      };
    (e.save(),
      e.translate(c, r),
      l(),
      (e.fillStyle = n),
      e.fill(),
      e.save(),
      l(),
      e.clip(),
      (e.fillStyle = "rgba(255,255,255,.14)"));
    for (let o = 0; o < t; o += t * 0.07)
      for (let a = (o / (t * 0.07)) % 2 ? t * 0.035 : 0; a < t; a += t * 0.07)
        (e.beginPath(), e.arc(a, o, t * 0.012, 0, C), e.fill());
    e.restore();
    const f = s === "build" ? "#3a2b25" : "#f7f0df";
    ((e.fillStyle = e.strokeStyle = f),
      (e.lineCap = "round"),
      (e.lineJoin = "round"),
      s === "research"
        ? ((e.lineWidth = t * 0.075),
          e.beginPath(),
          e.arc(t * 0.44, t * 0.44, t * 0.17, 0, C),
          e.stroke(),
          (e.lineWidth = t * 0.1),
          e.beginPath(),
          e.moveTo(t * 0.57, t * 0.57),
          e.lineTo(t * 0.71, t * 0.71),
          e.stroke(),
          e.beginPath(),
          e.arc(t * 0.4, t * 0.4, t * 0.04, 0, C),
          e.fill())
        : s === "design"
          ? (e.beginPath(),
            e.moveTo(t * 0.5, t * 0.84),
            e.lineTo(t * 0.31, t * 0.55),
            e.lineTo(t * 0.37, t * 0.34),
            e.lineTo(t * 0.63, t * 0.34),
            e.lineTo(t * 0.69, t * 0.55),
            e.closePath(),
            e.fill(),
            e.fillRect(t * 0.36, t * 0.22, t * 0.28, t * 0.09),
            (e.strokeStyle = n),
            (e.lineWidth = t * 0.035),
            e.beginPath(),
            e.moveTo(t * 0.5, t * 0.82),
            e.lineTo(t * 0.5, t * 0.56),
            e.stroke(),
            (e.fillStyle = n),
            e.beginPath(),
            e.arc(t * 0.5, t * 0.53, t * 0.045, 0, C),
            e.fill())
          : s === "prototype"
            ? (e.beginPath(),
              e.moveTo(t * 0.18, t * 0.5),
              e.lineTo(t * 0.83, t * 0.22),
              e.lineTo(t * 0.55, t * 0.8),
              e.lineTo(t * 0.45, t * 0.58),
              e.closePath(),
              e.fill(),
              (e.strokeStyle = n),
              (e.lineWidth = t * 0.03),
              e.beginPath(),
              e.moveTo(t * 0.83, t * 0.22),
              e.lineTo(t * 0.45, t * 0.58),
              e.stroke(),
              (e.strokeStyle = f),
              e.setLineDash([t * 0.04, t * 0.05]),
              (e.lineWidth = t * 0.025),
              e.beginPath(),
              e.moveTo(t * 0.4, t * 0.66),
              e.quadraticCurveTo(t * 0.22, t * 0.8, t * 0.1, t * 0.7),
              e.stroke(),
              e.setLineDash([]))
            : ([
                [0.25, 0.52],
                [0.53, 0.52],
                [0.39, 0.27],
              ].forEach(([o, a]) => {
                (W(e, t * o, t * a, t * 0.23, t * 0.22, t * 0.03), e.fill());
              }),
              (e.fillStyle = n),
              e.fillRect(t * 0.3, t * 0.57, t * 0.06, t * 0.03),
              e.fillRect(t * 0.58, t * 0.57, t * 0.06, t * 0.03)),
      e.translate(t * 0.022, t * 0.018),
      l(),
      (e.strokeStyle = "rgba(31,29,26,.8)"),
      (e.lineWidth = t * 0.022),
      e.stroke(),
      e.restore());
  }
  function re(e, s) {
    return e
      ? {
          H: s,
          slot: { x: 700, y: 120, w: 240 },
          pm: { x: 585, y: 205, R: 66, waveLen: 170 },
        }
      : {
          H: s,
          slot: { x: 752, y: 98, w: 190 },
          pm: { x: 700, y: 178, R: 58, waveLen: 150 },
        };
  }
  const fe = 0.05;
  function ve(e, s, c) {
    const t = c ? 26 : 20,
      n = c ? 9 : 7,
      l = c ? 20 : 16,
      f = c ? 10 : 8;
    (e.save(),
      (e.globalCompositeOperation = "multiply"),
      e.beginPath(),
      e.rect(t, t, 1e3 - 2 * t, s - 2 * t),
      e.rect(t + n, t + n, 1e3 - 2 * (t + n), s - 2 * (t + n)),
      e.clip("evenodd"));
    for (let o = -s, a = 0; o < 1e3 + s; o += l + f, a++)
      ((e.fillStyle = a % 2 ? "#3f6e50" : "#c8283a"),
        e.beginPath(),
        e.moveTo(o, 0),
        e.lineTo(o + l, 0),
        e.lineTo(o + l - s, s),
        e.lineTo(o - s, s),
        e.closePath(),
        e.fill());
    e.restore();
  }
  function Ce(e, s, c, r) {
    const t = new Float32Array(e.length),
      n = new Float32Array(e.length),
      l = 2 * r + 1;
    for (let f = 0; f < c; f++) {
      let o = 0;
      for (let a = -r; a <= r; a++)
        o += e[f * s + Math.min(s - 1, Math.max(0, a))];
      for (let a = 0; a < s; a++)
        ((n[f * s + a] = o / l),
          (o +=
            e[f * s + Math.min(s - 1, a + r + 1)] -
            e[f * s + Math.max(0, a - r)]));
    }
    for (let f = 0; f < s; f++) {
      let o = 0;
      for (let a = -r; a <= r; a++)
        o += n[Math.min(c - 1, Math.max(0, a)) * s + f];
      for (let a = 0; a < c; a++)
        ((t[a * s + f] = o / l),
          (o +=
            n[Math.min(c - 1, a + r + 1) * s + f] -
            n[Math.max(0, a - r) * s + f]));
    }
    return t;
  }
  function Be(e, s, c, r, t) {
    const n = Math.round(s * r),
      l = Math.round(c * r),
      f = oe(t),
      o = le(t + 1),
      a = le(t + 2),
      u = le(t + 3),
      i = P(n, l),
      d = i.getContext("2d"),
      h = P(n, l),
      m = h.getContext("2d");
    m.drawImage(e, 0, 0, n, l);
    const g = m.getImageData(0, 0, n, l).data,
      b = new Float32Array(n * l);
    for (let y = 0; y < b.length; y++) b[y] = g[y * 4 + 3] / 255;
    const T = Math.max(2, Math.round(n * 0.03)),
      v = Ce(Ce(b, n, l, T), n, l, T),
      M = d.createImageData(n, l),
      w = M.data,
      K = n / 7;
    for (let y = 0, k = 0; y < l; y++)
      for (let S = 0; S < n; S++, k++) {
        if (b[k] < 0.02) continue;
        const O = Math.min(1, Math.max(0, (1 - v[k]) * 2.4)),
          D = o(S / K, y / K) * 0.6 + a(S / (K * 0.25), y / (K * 0.25)) * 0.4,
          J = Math.min(
            1,
            Math.max(0, (u(S / (K * 1.4), y / (K * 1.4)) - 0.7) * 5),
          ),
          $ = b[k] * (0.09 + 0.17 * D + 0.3 * O) * (1 - 0.75 * J),
          B = 0.35 + 0.65 * O;
        ((w[k * 4] = 214 - 44 * B),
          (w[k * 4 + 1] = 186 - 44 * B),
          (w[k * 4 + 2] = 120 - 38 * B),
          (w[k * 4 + 3] = $ * 255));
      }
    d.putImageData(M, 0, 0);
    const A = (y, k, S, O, D, J, $, B, j = {}) => {
        const ne = 6 + Math.floor(f() * 4),
          Te = [];
        for (let N = 0; N < ne; N++)
          Te.push([((N + f() * 0.6) / ne) * C, O * (0.55 + f() * 0.6)]);
        const ee = [];
        Te.forEach(([N, G], U) => {
          const [q, L] = Te[(U + 1) % ne],
            X = U === ne - 1 ? q + C : q,
            _ = Math.cos(N) * G * D,
            ie = Math.sin(N) * G,
            he = Math.cos(X) * L * D,
            ce = Math.sin(X) * L,
            de = Math.hypot(he - _, ce - ie),
            me = Math.max(4, Math.round(de / (0.9 * r)));
          for (let te = 0; te < me; te++) {
            const se = te / me,
              ke =
                (f() - 0.5) * 1.1 * r + (f() < 0.08 ? (f() - 0.5) * 3 * r : 0),
              tt = -(ce - ie) / (de || 1),
              ot = (he - _) / (de || 1),
              Oe = _ + (he - _) * se + tt * ke,
              Ae = ie + (ce - ie) * se + ot * ke;
            ee.push([
              k + Oe * Math.cos(J) - Ae * Math.sin(J),
              S + Oe * Math.sin(J) + Ae * Math.cos(J),
            ]);
          }
        });
        const Ie = () => {
          (y.beginPath(),
            ee.forEach(([N, G], U) => (U ? y.lineTo(N, G) : y.moveTo(N, G))),
            y.closePath());
        };
        if (
          (y.save(),
          j.shadow &&
            ((y.shadowColor = "rgba(70,52,28,.2)"),
            (y.shadowBlur = 1.2 * r),
            (y.shadowOffsetY = 0.4 * r)),
          (y.fillStyle = $),
          Ie(),
          y.fill(),
          y.restore(),
          j.thin)
        ) {
          (y.save(), Ie(), y.clip());
          const N = le(Math.floor(f() * 1e6)),
            G = 2 * r;
          y.globalCompositeOperation = "destination-out";
          for (let U = S - O * 1.3; U < S + O * 1.3; U += G)
            for (let q = k - O * D * 1.3; q < k + O * D * 1.3; q += G) {
              const L = N(q / (O * 0.35), U / (O * 0.35));
              L < 0.42 ||
                ((y.fillStyle = `rgba(0,0,0,${Math.min(0.75, (L - 0.42) * 2.2)})`),
                y.fillRect(q, U, G, G));
            }
          ((y.globalCompositeOperation = "source-over"),
            (y.strokeStyle = "rgba(160,140,108,.22)"),
            (y.lineWidth = Math.max(0.5, 0.25 * r)));
          for (let U = 0; U < (O / r) * 1.4; U++) {
            const q = k + (f() - 0.5) * O * D * 2,
              L = S + (f() - 0.5) * O * 2,
              X = f() * C,
              _ = (1 + f() * 3) * r;
            (y.beginPath(),
              y.moveTo(q, L),
              y.quadraticCurveTo(
                q + Math.cos(X + 0.8) * _ * 0.5,
                L + Math.sin(X + 0.8) * _ * 0.5,
                q + Math.cos(X) * _,
                L + Math.sin(X) * _,
              ),
              y.stroke());
          }
          y.restore();
        }
        ((y.strokeStyle = B),
          (y.lineWidth = Math.max(0.5, 0.28 * r)),
          ee.forEach(([N, G], U) => {
            if (f() < 0.35) return;
            const [q, L] = ee[(U + ee.length - 1) % ee.length],
              [X, _] = ee[(U + 1) % ee.length],
              ie = X - q,
              he = _ - L,
              ce = Math.hypot(ie, he) || 1,
              de = he / ce,
              me = -ie / ce,
              te = (0.6 + f() * f() * 3.4) * r,
              se = (f() - 0.5) * 1.6 * r;
            (y.beginPath(),
              y.moveTo(N, G),
              y.quadraticCurveTo(
                N + de * te * 0.5 + se * 0.5,
                G + me * te * 0.5 - se * 0.3,
                N + de * te + se,
                G + me * te - se * 0.5,
              ),
              y.stroke());
          }));
      },
      E = P(n, l),
      p = E.getContext("2d");
    A(
      p,
      n * (0.22 + f() * 0.15),
      l * 0.97,
      n * 0.13,
      1.7,
      (f() - 0.5) * 0.3,
      "rgba(252,249,242,.5)",
      "rgba(150,128,96,.25)",
      { thin: !0 },
    );
    const I = P(n, l),
      Y = I.getContext("2d");
    [
      [0.03, 0.05, 0.16, 1.2, 0.6],
      [0.97, 0.1, 0.1, 1.6, -0.2],
      [0.98, 0.95, 0.17, 1.1, 0.4],
      [0.58, 0.02, 0.06, 2.6, 0.05],
      [0.01, 0.62, 0.09, 0.55, 0],
    ].forEach(([y, k, S, O, D], J) =>
      A(
        Y,
        n * y,
        l * k,
        n * S * (0.85 + f() * 0.3),
        O,
        D,
        "#f8f5ec",
        "rgba(247,244,235,.85)",
        { shadow: !0, thin: J % 2 === 1 },
      ),
    );
    for (const y of [p, Y])
      ((y.globalCompositeOperation = "destination-in"), y.drawImage(h, 0, 0));
    return (d.drawImage(E, 0, 0), d.drawImage(I, 0, 0), i);
  }
  function Ne({
    cw: e,
    ch: s,
    TW: c,
    portrait: r,
    cover: t,
    mark: n,
    peeled: l,
    intro: f,
    lines: o,
  }) {
    const u = (s / e) * 1e3,
      i = c / 1e3,
      d = P(c, u * i),
      h = d.getContext("2d");
    (Q(h, d.width, d.height, pe, 71, 12), h.scale(i, i), ve(h, u, r));
    const m = re(r, u),
      g = m.slot,
      b = (g.w * z) / R;
    ((h.fillStyle = Z),
      (h.textBaseline = "alphabetic"),
      x(h, 700, r ? 30 : 24),
      F(h, "POST CARD", 500, r ? 74 : 62, r ? 16 : 13, "center"),
      l &&
        (h.save(),
        h.translate(g.x + g.w / 2, g.y + b / 2),
        h.rotate(fe),
        h.drawImage(Be(t.plain, g.w, b, i, 23), -g.w / 2, -b / 2, g.w, b),
        h.restore()),
      (h.strokeStyle = "#3f6e50"),
      (h.lineWidth = 1.6),
      (h.fillStyle = "rgba(43,40,36,.55)"),
      x(h, 500, r ? 12 : 8.5, "mono"),
      r
        ? (h.beginPath(),
          h.moveTo(70, 650),
          h.lineTo(930, 650),
          h.stroke(),
          F(
            h,
            "DHEERAJ C. · PORTFOLIO · EDITION OF 2026 · NO. 001",
            500,
            680,
            2,
            "center",
          ))
        : (h.beginPath(),
          h.moveTo(566, 96),
          h.lineTo(566, 612),
          h.stroke(),
          h.save(),
          h.translate(552, 354),
          h.rotate(-Math.PI / 2),
          F(
            h,
            "DHEERAJ C. · PORTFOLIO · EDITION OF 2026 · NO. 001",
            0,
            0,
            1.8,
            "center",
          ),
          h.restore()));
    const T = r ? 70 : 600,
      v = r ? 930 : 944,
      M = r ? [420, 500, 580] : [330, 404, 478];
    ((h.strokeStyle = "rgba(43,40,36,.38)"),
      (h.lineWidth = 1.2),
      M.forEach((B) => {
        (h.beginPath(), h.moveTo(T, B + 12), h.lineTo(v, B + 12), h.stroke());
      }),
      (h.fillStyle = Z),
      o.forEach((B, j) => {
        (x(h, j ? 500 : 700, r ? (j ? 32 : 38) : j ? 23 : 28),
          h.fillText(B, T + 6, M[j]));
      }));
    const w = r ? 70 : 60,
      K = r ? 860 : 455;
    let A = r ? 790 : 156;
    h.fillStyle = Z;
    const E = r ? 1205 : 500,
      p = r ? 112 : 74,
      I = r ? 104 : 40,
      Y = "Hey I’m Dheeraj",
      H = E - (r ? 70 : 44) - A;
    let y = r ? 33 : 21.5,
      k,
      S;
    for (
      ;
      (k = y * (r ? 1.5 : 1.56)),
        x(h, 400, y),
        (S = ge(h, f, K)),
        !((S.length + 0.5) * k <= H || y <= 12);
      y -= 0.5
    );
    (h.fillText(Y, w, A),
      (A += k * 1.5),
      S.forEach((B) => {
        (h.fillText(B, w, A), (A += k));
      }),
      ["research", "systems", "devtools", "build"].forEach((B, j) => {
        const ne = w + j * (p + I);
        (De(h, B, ne, E, p),
          (h.fillStyle = Z),
          x(h, 600, r ? 13 : 9.5, "mono"),
          F(
            h,
            B.toUpperCase(),
            ne + p / 2,
            E + p + (r ? 30 : 20),
            r ? 2 : 1.4,
            "center",
          ));
      }),
      r ||
        ((h.fillStyle = "rgba(43,40,36,.55)"),
        x(h, 500, 8.5, "mono"),
        F(h, "NO. 001 · PRINTED 2026", 944, 612, 1.6, "right")));
    const D = m.pm,
      J = P(d.width, d.height),
      $ = J.getContext("2d");
    return (
      $.scale(i, i),
      ($.globalAlpha = 0.86),
      $.drawImage(n.canvas, D.x - n.cx, D.y - n.cy, n.W, n.H),
      l &&
        (($.globalAlpha = 1),
        ($.globalCompositeOperation = "destination-out"),
        $.translate(g.x + g.w / 2, g.y + b / 2),
        $.rotate(fe),
        $.drawImage(t.plain, -g.w / 2, -b / 2, g.w, b)),
      h.setTransform(1, 0, 0, 1, 0, 0),
      h.drawImage(J, 0, 0),
      l ||
        (h.scale(i, i),
        h.translate(g.x + g.w / 2, g.y + b / 2),
        h.rotate(fe),
        h.save(),
        (h.shadowColor = "rgba(60,40,20,.25)"),
        (h.shadowBlur = 3 * i),
        (h.shadowOffsetY = 0.6 * i),
        h.drawImage(t.inked, -g.w / 2, -b / 2, g.w, b),
        h.restore()),
      d
    );
  }
  function Ue({
    cw: e,
    ch: s,
    TW: c,
    portrait: r,
    cover: t,
    mark: n,
    path: l,
  }) {
    const o = (s / e) * 1e3,
      a = c / 1e3,
      u = P(c, o * a),
      i = u.getContext("2d");
    (Q(i, u.width, u.height, pe, 71, 12), i.scale(a, a), ve(i, o, r));
    const d = re(r, o),
      h = d.slot,
      m = (h.w * z) / R;
    ((i.fillStyle = Z),
      (i.textBaseline = "alphabetic"),
      x(i, 700, r ? 30 : 24),
      F(i, "POST CARD", 500, r ? 74 : 62, r ? 16 : 13, "center"),
      (i.strokeStyle = "#3f6e50"),
      (i.lineWidth = 1.6),
      (i.fillStyle = "rgba(43,40,36,.55)"),
      x(i, 500, r ? 12 : 8.5, "mono"));
    const g = "DHEERAJ C. · PORTFOLIO · RETURNED · NO. 404";
    r
      ? (i.beginPath(),
        i.moveTo(70, 650),
        i.lineTo(930, 650),
        i.stroke(),
        F(i, g, 500, 680, 2, "center"))
      : (i.beginPath(),
        i.moveTo(566, 96),
        i.lineTo(566, 612),
        i.stroke(),
        i.save(),
        i.translate(552, 354),
        i.rotate(-Math.PI / 2),
        F(i, g, 0, 0, 1.8, "center"),
        i.restore());
    const b = r ? 70 : 600,
      T = r ? 930 : 944,
      v = r ? [420, 500, 580] : [330, 404, 478];
    ((i.strokeStyle = "rgba(43,40,36,.38)"),
      (i.lineWidth = 1.2),
      v.forEach((D) => {
        (i.beginPath(), i.moveTo(b, D + 12), i.lineTo(T, D + 12), i.stroke());
      }),
      (i.fillStyle = Z));
    let M = r ? 38 : 28;
    for (x(i, 700, M); i.measureText(l).width > T - b - 12 && M > 14; )
      x(i, 700, --M);
    let w = l;
    for (; i.measureText(w).width > T - b - 12; ) w = w.slice(0, -2) + "…";
    i.fillText(w, b + 6, v[0]);
    const K = i.measureText(w).width;
    ((i.strokeStyle = "#c8283a"),
      (i.lineWidth = r ? 4 : 3),
      (i.lineCap = "round"),
      i.beginPath(),
      i.moveTo(b, v[0] - M * 0.3 + 3),
      i.lineTo(b + K + 12, v[0] - M * 0.3 - 3),
      i.stroke(),
      x(i, 500, r ? 32 : 23),
      i.fillText("tomlin7.com", b + 6, v[1]));
    const A = r ? 70 : 60,
      E = r ? 860 : 455;
    let p = r ? 800 : 170;
    (x(i, 700, r ? 64 : 46),
      i.fillText("Lost in the post", A, p),
      (p += r ? 76 : 56));
    const I = r ? 33 : 21.5,
      Y = I * (r ? 1.5 : 1.56);
    (x(i, 400, I),
      ge(
        i,
        "Nothing lives at this address. It may have moved, or there’s a typo somewhere.",
        E,
      ).forEach((D) => {
        (i.fillText(D, A, p), (p += Y));
      }));
    const H = r ? 92 : 60;
    x(i, 600, H * 0.36);
    const y = "Back to the portfolio",
      k = i.measureText(y + "  →").width + H * 1.1,
      S = p + (r ? 30 : 16);
    ((i.textAlign = "left"),
      (i.textBaseline = "alphabetic"),
      (i.fillStyle = "#1d3fa6"),
      x(i, 400, r ? 56 : 38, "script"),
      i.fillText("Dheeraj C.", A, r ? o - 90 : 560));
    const O = d.pm;
    return (
      i.save(),
      (i.globalAlpha = 0.86),
      i.drawImage(n.canvas, O.x - n.cx, O.y - n.cy, n.W, n.H),
      i.restore(),
      i.translate(h.x + h.w / 2, h.y + m / 2),
      i.rotate(fe),
      i.save(),
      (i.shadowColor = "rgba(60,40,20,.25)"),
      (i.shadowBlur = 3 * a),
      (i.shadowOffsetY = 0.6 * a),
      i.drawImage(t.inked, -h.w / 2, -m / 2, h.w, m),
      i.restore(),
      {
        canvas: u,
        H: o,
        button: { x: A, y: S, w: k, h: H, label: y },
        address: { x: (b + T) / 2, y: (v[0] + v[1]) / 2 },
      }
    );
  }
  function He(e, s, c) {
    const t = c * 0.09,
      n = P((s + t * 2) * 3, (c + t * 2) * 3),
      l = n.getContext("2d");
    return (
      l.scale(3, 3),
      W(l, 0, 0, s + t * 2, c + t * 2, (c + t * 2) / 2),
      (l.fillStyle = "#fffdf6"),
      l.fill(),
      W(l, t, t, s, c, c / 2),
      (l.fillStyle = "#c8283a"),
      l.fill(),
      x(l, 600, c * 0.36),
      (l.fillStyle = "#fff8f0"),
      (l.textAlign = "center"),
      (l.textBaseline = "middle"),
      l.fillText(e + "  →", t + s / 2, t + c / 2 + c * 0.02),
      { canvas: n, w: s + t * 2, h: c + t * 2 }
    );
  }
  function Ge(e, s) {
    const c = re(e, 0).pm;
    return ue({
      R: c.R,
      top: "NOT FOUND",
      bottom: "DHEERAJ C.",
      l1: s[0],
      l2: "404",
      color: "#2a3a7a",
      waves: 1,
      waveLen: c.waveLen,
      seed: 404,
      k: 3,
    });
  }
  function qe(e, s, c) {
    const r = Me(c),
      t = re(e, 0),
      n = t.slot,
      l = (n.w * z) / R,
      f = t.pm,
      o = P(r.width, r.height),
      a = o.getContext("2d");
    return (
      a.drawImage(r, 0, 0),
      a.save(),
      a.scale(ae, ae),
      a.translate(R / 2, z / 2),
      a.rotate(-fe),
      a.scale(R / n.w, R / n.w),
      a.translate(-(n.x + n.w / 2), -(n.y + l / 2)),
      (a.globalAlpha = 0.86),
      a.drawImage(s.canvas, f.x - s.cx, f.y - s.cy, s.W, s.H),
      a.restore(),
      (a.globalCompositeOperation = "destination-in"),
      a.drawImage(r, 0, 0),
      { plain: r, inked: o }
    );
  }
  function Fe(e, s) {
    const c = re(e, 0).pm;
    return ue({
      R: c.R,
      top: "OPEN TO WORK",
      bottom: "PORTFOLIO",
      l1: s[0],
      l2: s[1],
      color: "#2a3a7a",
      waves: 1,
      waveLen: c.waveLen,
      seed: 5,
      k: 3,
    });
  }
  function Ye(e, s, c = 800) {
    const t = document.createElement("canvas").getContext("2d");
    x(t, c, s);
    const n = t.measureText(e).width + s * 0.3,
      l = s * 1.3,
      f = P(n * 2, l * 2),
      o = f.getContext("2d");
    (o.scale(2, 2),
      x(o, c, s),
      (o.fillStyle = "#f7f0e1"),
      (o.textBaseline = "alphabetic"),
      o.fillText(e, s * 0.15, s * 1),
      (o.globalCompositeOperation = "source-atop"));
    const a = oe(81);
    for (let u = 0; u < (n * l) / 6; u++)
      ((o.fillStyle =
        a() < 0.5 ? "rgba(120,96,70,.08)" : "rgba(255,255,255,.2)"),
        o.fillRect(a() * n, a() * l, 1, 1));
    return { canvas: f, w: n, h: l };
  }
  function $e(
    e,
    {
      family: s,
      weight: c = 400,
      style: r = "",
      shape: t = "cut",
      ink: n = "#141414",
      bg: l = "#ffffff",
    },
    f,
  ) {
    const a = `${r} ${c} ${f}px '${s}'`,
      u = document.createElement("canvas").getContext("2d");
    u.font = a;
    const i = u.measureText(e),
      d = i.actualBoundingBoxAscent,
      h = i.actualBoundingBoxDescent,
      m = i.actualBoundingBoxLeft,
      g = i.actualBoundingBoxRight,
      b = m + g,
      T = d + h,
      v = f * 0.075;
    let M, w;
    if (t === "cut") ((M = b + v * 2), (w = T + v * 2));
    else {
      const O = f * 0.16;
      ((M = Math.max(b + O * 2, f * 0.5)),
        (w = Math.max(T + O * 2, f * 0.62)),
        t === "circle" && (M = w = Math.max(M, w)));
    }
    const K = M + v * 2 + 6,
      A = w + v * 2 + 6,
      E = P(K * 2, A * 2),
      p = E.getContext("2d");
    p.scale(2, 2);
    const I = K / 2,
      Y = A / 2,
      H = I + (m - g) / 2,
      y = Y + (d - h) / 2;
    ((p.font = a),
      (p.textBaseline = "alphabetic"),
      (p.textAlign = "left"),
      (p.lineJoin = "round"),
      (p.lineCap = "round"));
    const k = (O) => {
      (p.beginPath(),
        t === "circle"
          ? p.arc(I, Y, M / 2 + O, 0, C)
          : W(
              p,
              I - M / 2 - O,
              Y - w / 2 - O,
              M + O * 2,
              w + O * 2,
              f * 0.06 + O,
            ));
    };
    (t === "cut"
      ? ((p.strokeStyle = "rgba(60,40,30,.16)"),
        (p.lineWidth = v * 2 + 1.4),
        p.strokeText(e, H, y),
        (p.strokeStyle = "#fffdf8"),
        (p.lineWidth = v * 2),
        p.strokeText(e, H, y),
        (p.fillStyle = "#fffdf8"),
        p.fillText(e, H, y))
      : (k(v + 0.7),
        (p.fillStyle = "rgba(60,40,30,.16)"),
        p.fill(),
        k(v),
        (p.fillStyle = "#fffdf8"),
        p.fill(),
        k(0),
        (p.fillStyle = l),
        p.fill()),
      (p.fillStyle = n),
      p.fillText(e, H, y),
      (p.globalCompositeOperation = "source-atop"));
    const S = p.createLinearGradient(0, 0, K * 0.4, A);
    return (
      S.addColorStop(0, "rgba(255,255,255,.14)"),
      S.addColorStop(0.5, "rgba(255,255,255,0)"),
      S.addColorStop(1, "rgba(0,0,0,.04)"),
      (p.fillStyle = S),
      p.fillRect(0, 0, K, A),
      (p.globalCompositeOperation = "source-over"),
      { canvas: E, w: K, h: A }
    );
  }
  const Re = "#27304a",
    Je = "#e39904";
  function Le({ quote: e, name: s, role: c }, r, t) {
    const l = R,
      f = P(l * 4.5, t * 4.5),
      o = f.getContext("2d");
    (o.scale(4.5, 4.5), Q(o, l, t, "#f2ead6", 70 + r, 9));
    const a = o.createLinearGradient(0, 0, l, t);
    (a.addColorStop(0, "rgba(255,248,225,.35)"),
      a.addColorStop(0.5, "rgba(255,248,225,0)"),
      a.addColorStop(1, "rgba(210,190,140,.12)"),
      (o.fillStyle = a),
      o.fillRect(0, 0, l, t));
    const u = 36,
      i = 64;
    ((o.fillStyle = Je),
      (o.font = "italic 400 74px 'DM Serif Display', serif"),
      (o.textBaseline = "alphabetic"),
      o.fillText("“", u - 6, u + 44));
    const d = u + 40,
      h = t - d - i - u;
    let m = t > 400 ? 24 : 19,
      g,
      b;
    for (
      ;
      m > 11 &&
      ((o.font = `400 ${m}px 'Kalam', cursive`),
      (g = ge(o, e, l - u * 2)),
      (b = m * 1.38),
      !(g.length * b <= h));
      m -= 0.5
    );
    ((o.fillStyle = Re), g.forEach((v, M) => o.fillText(v, u, d + m + M * b)));
    const T = t - u - i + 14;
    return (
      (o.strokeStyle = "rgba(80,70,55,.28)"),
      (o.lineWidth = 0.8),
      o.beginPath(),
      o.moveTo(u, T),
      o.lineTo(l - u, T),
      o.stroke(),
      x(o, 600, 16),
      (o.fillStyle = Z),
      o.fillText(s, u, T + 28),
      x(o, 400, 12.5),
      (o.fillStyle = "#6f675a"),
      o.fillText(c, u, T + 47),
      be(o, l, t),
      f
    );
  }
  function _e({ name: e, summary: s }, c, r) {
    const n = R,
      l = z,
      f = P(n * 3, l * 3),
      o = f.getContext("2d");
    (o.scale(3, 3), Q(o, n, l, "#f2ead6", 90 + r, 9));
    const a = o.createLinearGradient(0, 0, n, l);
    (a.addColorStop(0, "rgba(255,248,225,.35)"),
      a.addColorStop(0.5, "rgba(255,248,225,0)"),
      a.addColorStop(1, "rgba(210,190,140,.12)"),
      (o.fillStyle = a),
      o.fillRect(0, 0, n, l));
    const u = 30,
      i = 118,
      d = (i * z) / R;
    (c &&
      (o.save(),
      o.translate(n - u - i / 2, u + d / 2),
      o.rotate(0.05),
      (o.shadowColor = "rgba(60,40,20,.25)"),
      (o.shadowBlur = 3),
      (o.shadowOffsetY = 0.8),
      o.drawImage(c, -i / 2, -d / 2, i, d),
      o.restore()),
      (o.fillStyle = Z),
      (o.textBaseline = "alphabetic"));
    const h = n - u * 2 - i - 16;
    let m = 26,
      g;
    for (
      ;
      m > 15 && (x(o, 700, m), (g = ge(o, e, h)), !(g.length * m * 1.15 <= d));
      m -= 1
    );
    const b = u + d / 2 - (g.length * m * 1.15) / 2 + m * 0.9;
    g.forEach((A, E) => o.fillText(A, u, b + E * m * 1.15));
    const T = u + d + 22,
      v = l - T - u + 4;
    let M = 17,
      w,
      K;
    for (
      ;
      M > 10 &&
      (x(o, 400, M),
      (K = M * 1.42),
      (w = ge(o, s, n - u * 2)),
      !(w.length * K <= v));
      M -= 0.5
    );
    return (
      (o.fillStyle = "#4a443b"),
      w.forEach((A, E) => o.fillText(A, u, T + M + E * K)),
      be(o, n, l),
      f
    );
  }
  function Pe(e, s, c, r, t = 2) {
    const n = r + 4,
      l = P((s + n * 2) * t, (c + n * 2) * t),
      f = l.getContext("2d"),
      o = P(l.width, l.height),
      a = o.getContext("2d");
    (a.drawImage(e, n * t, n * t, s * t, c * t),
      (a.globalCompositeOperation = "source-in"),
      (a.fillStyle = "#000"),
      a.fillRect(0, 0, o.width, o.height));
    const u = (d, h) => {
      const m = P(l.width, l.height),
        g = m.getContext("2d");
      for (let b = 0; b < 32; b++) {
        const T = (b / 32) * C;
        g.drawImage(o, Math.cos(T) * d * t, Math.sin(T) * d * t);
      }
      for (let b = 0; b < 16; b++) {
        const T = (b / 16) * C;
        g.drawImage(o, Math.cos(T) * d * 0.55 * t, Math.sin(T) * d * 0.55 * t);
      }
      return (
        g.drawImage(o, 0, 0),
        (g.globalCompositeOperation = "source-in"),
        (g.fillStyle = h),
        g.fillRect(0, 0, m.width, m.height),
        m
      );
    };
    ((f.globalAlpha = 0.16),
      f.drawImage(u(r + 0.8, "#3c281e"), 0, 0),
      (f.globalAlpha = 1),
      f.drawImage(u(r, "#fffdf8"), 0, 0),
      f.drawImage(e, n * t, n * t, s * t, c * t),
      (f.globalCompositeOperation = "source-atop"));
    const i = f.createLinearGradient(0, 0, l.width * 0.4, l.height);
    return (
      i.addColorStop(0, "rgba(255,255,255,.14)"),
      i.addColorStop(0.5, "rgba(255,255,255,0)"),
      i.addColorStop(1, "rgba(0,0,0,.04)"),
      (f.fillStyle = i),
      f.fillRect(0, 0, l.width, l.height),
      { canvas: l, w: s + n * 2, h: c + n * 2 }
    );
  }
  function Qe(e) {
    const s = e.naturalWidth,
      c = e.naturalHeight,
      r = P(s, c),
      t = r.getContext("2d");
    t.drawImage(e, 0, 0);
    const n = t.getImageData(0, 0, s, c),
      l = n.data,
      f = new Uint8Array(s * c),
      o = [],
      a = (g) =>
        l[g * 4 + 3] > 200 && l[g * 4] + l[g * 4 + 1] + l[g * 4 + 2] > 600;
    for (let g = 0; g < s; g++) o.push(g, (c - 1) * s + g);
    for (let g = 0; g < c; g++) o.push(g * s, g * s + s - 1);
    for (; o.length; ) {
      const g = o.pop();
      if (f[g] || a(g)) continue;
      f[g] = 1;
      const b = g % s,
        T = (g / s) | 0;
      (b > 0 && o.push(g - 1),
        b < s - 1 && o.push(g + 1),
        T > 0 && o.push(g - s),
        T < c - 1 && o.push(g + s));
    }
    let u = s,
      i = c,
      d = 0,
      h = 0;
    for (let g = 0; g < s * c; g++) {
      if (f[g]) {
        const b = (l[g * 4] + l[g * 4 + 1] + l[g * 4 + 2]) / 3,
          T = Math.max(0, Math.min(1, (b - 150) / 100));
        ((l[g * 4] = l[g * 4 + 1] = l[g * 4 + 2] = 253),
          (l[g * 4 + 3] *= T * T));
      }
      if (l[g * 4 + 3] > 8) {
        const b = g % s,
          T = (g / s) | 0;
        ((u = Math.min(u, b)),
          (d = Math.max(d, b)),
          (i = Math.min(i, T)),
          (h = Math.max(h, T)));
      }
    }
    t.putImageData(n, 0, 0);
    const m = P(d - u + 3, h - i + 3);
    return (
      m
        .getContext("2d")
        .drawImage(r, u - 1, i - 1, m.width, m.height, 0, 0, m.width, m.height),
      m
    );
  }
  function ye(e, s, c, r, t) {
    const n = P(s * r, c * r),
      l = n.getContext("2d");
    return (
      l.drawImage(e, 0, 0, n.width, n.height),
      (l.globalCompositeOperation = "source-in"),
      (l.fillStyle = t),
      l.fillRect(0, 0, n.width, n.height),
      n
    );
  }
  function Ve(e, s, c, r, t, n, l) {
    const f = c - t / 2,
      o = r - n / 2,
      a = ye(s, t, n, l, "#6f685c");
    e.globalAlpha = 0.3;
    for (let h = 0; h < 12; h++) {
      const m = (h / 12) * C;
      e.drawImage(a, f + Math.cos(m) * 0.8, o + Math.sin(m) * 0.8, t, n);
    }
    e.globalAlpha = 1;
    const u = ye(s, t, n, l, "#d3d6d3"),
      i = u.getContext("2d");
    ((i.globalCompositeOperation = "source-atop"),
      i.drawImage(ye(s, t, n, l, "#e8ebe8"), 0.6 * l, 1.6 * l));
    const d = i.createLinearGradient(0, 0, u.width, u.height);
    (d.addColorStop(0, "rgba(255,255,255,.55)"),
      d.addColorStop(0.4, "rgba(255,255,255,0)"),
      d.addColorStop(0.75, "rgba(255,255,255,.1)"),
      d.addColorStop(1, "rgba(255,255,255,.3)"),
      (i.fillStyle = d),
      i.fillRect(0, 0, u.width, u.height),
      e.drawImage(u, f, o, t, n));
  }
  const V = {
    yellow: "#eeac0c",
    ink: "#141210",
    cream: "#fff8e4",
    blue: "#1a3794",
    blueDeep: "#0b1650",
  };
  function je(e) {
    const { W: s, H: c, K: r, pad: t } = e,
      n = P(s * r, c * r),
      l = n.getContext("2d");
    (Q(l, s, c, "#fbfaf5", 131, 5),
      l.scale(r, r),
      (l.globalCompositeOperation = "multiply"),
      (l.fillStyle = V.yellow),
      l.fillRect(0, 0, s, c),
      (l.globalCompositeOperation = "source-over"));
    const f = e.band,
      o = f > 110 ? 15 : 12,
      a = Math.max(6, Math.round(s / (o * 2.2))),
      u = s / a;
    (l.beginPath(), l.moveTo(0, 0), l.lineTo(s, 0), l.lineTo(s, f - o));
    for (let I = a - 1; I >= 0; I--)
      l.arc(I * u + u / 2, f - o, u / 2, 0, Math.PI);
    (l.closePath(), (l.fillStyle = V.blue), l.fill());
    const i = (I) => {
      l.font = `400 ${I}px 'Yellowtail', cursive`;
    };
    let d = e.titleSize;
    i(d);
    const h = l.measureText(e.title).width,
      m = e.titleRoom || s - t * 2;
    (h > m && ((d *= m / h), i(d)),
      (l.textAlign = "center"),
      (l.textBaseline = "alphabetic"));
    const g = (f - o) / 2 + d * 0.34,
      b = Math.max(2, d * 0.045);
    ((l.fillStyle = V.blueDeep),
      l.fillText(e.title, s / 2 + b, g + b),
      (l.fillStyle = V.cream),
      l.fillText(e.title, s / 2, g));
    const T = (I, Y, H) => {
        l.beginPath();
        for (let y = 0; y < 8; y++) {
          const k = (y * Math.PI) / 4 - Math.PI / 2,
            S = y % 2 ? H * 0.28 : H;
          l.lineTo(I + Math.cos(k) * S, Y + Math.sin(k) * S);
        }
        (l.closePath(), l.fill());
      },
      v = Math.min(h, m) / 2,
      M = (f - o) / 2;
    (s / 2 - v - d * 0.5 > t * 0.6 &&
      (T(s / 2 - v - d * 0.42, M - d * 0.08, d * 0.16),
      T(s / 2 + v + d * 0.42, M + d * 0.06, d * 0.13)),
      i(e.hi.size * 1.15),
      (l.fillStyle = V.blue),
      l.fillText(e.hi.text, e.hi.x, e.hi.y),
      (l.textAlign = "left"));
    const [w, K, A, E] = e.perf,
      p = Math.hypot(A - w, E - K);
    l.fillStyle = "rgba(70,45,0,.32)";
    for (let I = 0; I < p; I += 9)
      (l.beginPath(),
        l.arc(w + ((A - w) * I) / p, K + ((E - K) * I) / p, 1.6, 0, C),
        l.fill());
    return (
      e.holes.forEach((I) => Ve(l, I.img, I.x, I.y, I.w, I.h, r)),
      (l.globalCompositeOperation = "destination-in"),
      (l.globalAlpha = 1),
      (l.fillStyle = "#000"),
      W(l, 0, 0, s, c, 14),
      l.fill(),
      n
    );
  }
  function Xe(e, s) {
    const r = P(e * 3, s * 3),
      t = r.getContext("2d");
    (t.scale(3, 3),
      W(t, 0.5, 0.5, e - 1, s - 1, s * 0.24),
      (t.fillStyle = V.cream),
      t.fill(),
      W(t, 6, 6, e - 12, s - 12, s * 0.18),
      t.setLineDash([5, 4]),
      (t.lineWidth = 1.3),
      (t.strokeStyle = V.ink),
      (t.globalAlpha = 0.45),
      t.stroke(),
      t.setLineDash([]),
      (t.globalAlpha = 1),
      (t.strokeStyle = V.ink),
      (t.lineWidth = 1.5));
    const n = s / 2 - 9;
    return (
      t.beginPath(),
      t.moveTo(e / 2 - 6, n),
      t.lineTo(e / 2 + 6, n),
      t.moveTo(e / 2, n - 6),
      t.lineTo(e / 2, n + 6),
      t.stroke(),
      x(t, 500, 10, "mono"),
      (t.fillStyle = V.ink),
      F(t, "YOUR NEXT IDEA", e / 2, s / 2 + 14, 1.4, "center"),
      { canvas: r, w: e, h: s }
    );
  }
  const xe = {
    email: [1.42, 0.6],
    linkedin: [0.76, 0.76],
    instagram: [0.76, 0.76],
    x: [0.76, 0.76],
    resume: [0.66, 0.86],
  };
  function Ze(e, s) {
    const [r, t] = xe[e],
      n = s * r,
      l = s * t,
      f = P(n * 3, l * 3),
      o = f.getContext("2d");
    if ((o.scale(3, 3), (o.lineJoin = o.lineCap = "round"), e === "email")) {
      (W(o, 0, 0, n, l, l / 2),
        (o.fillStyle = "#2442c6"),
        o.fill(),
        x(o, 800, l * 0.36));
      const a = l * 0.46,
        u = l * 0.34,
        i = l * 0.16,
        d = o.measureText("Email").width,
        h = (n - a - i - d) / 2,
        m = (l - u) / 2;
      ((o.strokeStyle = "#fff"),
        (o.lineWidth = l * 0.05),
        W(o, h, m, a, u, l * 0.05),
        o.stroke(),
        o.beginPath(),
        o.moveTo(h + l * 0.03, m + l * 0.04),
        o.lineTo(h + a / 2, m + u * 0.58),
        o.lineTo(h + a - l * 0.03, m + l * 0.04),
        o.stroke(),
        (o.fillStyle = "#fff"),
        (o.textBaseline = "middle"),
        o.fillText("Email", h + a + i, l / 2 + l * 0.02));
    } else if (e === "linkedin")
      (W(o, 0, 0, n, l, n * 0.2),
        (o.fillStyle = "#0a66c2"),
        o.fill(),
        x(o, 800, l * 0.66),
        (o.fillStyle = "#fff"),
        (o.textAlign = "center"),
        (o.textBaseline = "middle"),
        o.fillText("in", n * 0.52, l * 0.53));
    else if (e === "instagram") {
      W(o, 0, 0, n, l, n * 0.24);
      const a = o.createRadialGradient(
        n * 0.28,
        l * 1.05,
        0,
        n * 0.28,
        l * 1.05,
        n * 1.25,
      );
      (a.addColorStop(0, "#fdf497"),
        a.addColorStop(0.08, "#fdf497"),
        a.addColorStop(0.45, "#fd5949"),
        a.addColorStop(0.62, "#d6249f"),
        a.addColorStop(0.92, "#285aeb"),
        (o.fillStyle = a),
        o.fill(),
        (o.strokeStyle = "#fff"),
        (o.lineWidth = n * 0.075),
        W(o, n * 0.22, l * 0.22, n * 0.56, l * 0.56, n * 0.17),
        o.stroke(),
        o.beginPath(),
        o.arc(n / 2, l / 2, n * 0.13, 0, C),
        o.stroke(),
        (o.fillStyle = "#fff"),
        o.beginPath(),
        o.arc(n * 0.655, l * 0.345, n * 0.035, 0, C),
        o.fill());
    } else if (e === "x") {
      (W(o, 0, 0, n, l, n * 0.2), (o.fillStyle = "#0f0f10"), o.fill());
      const a = n * 0.25;
      ((o.strokeStyle = "#fff"),
        (o.lineCap = "butt"),
        (o.lineWidth = n * 0.055),
        o.beginPath(),
        o.moveTo(n - a, a),
        o.lineTo(a, l - a),
        o.stroke());
      const u = n - 2 * a,
        i = l - 2 * a,
        d = Math.hypot(u, i),
        h = (-i / d) * n * 0.07,
        m = (u / d) * n * 0.07;
      (o.beginPath(),
        o.moveTo(a - n * 0.02 + h, a + m),
        o.lineTo(n - a + n * 0.02 + h, l - a + m),
        o.lineTo(n - a + n * 0.02 - h, l - a - m),
        o.lineTo(a - n * 0.02 - h, a - m),
        o.closePath(),
        (o.fillStyle = "#0f0f10"),
        o.fill(),
        (o.lineWidth = n * 0.035),
        (o.lineJoin = "miter"),
        o.stroke());
    } else {
      const a = n * 0.24;
      (o.beginPath(),
        o.moveTo(0, 0),
        o.lineTo(n - a, 0),
        o.lineTo(n, a),
        o.lineTo(n, l),
        o.lineTo(0, l),
        o.closePath(),
        (o.fillStyle = "#fbf6ea"),
        o.fill(),
        o.beginPath(),
        o.moveTo(n - a, 0),
        o.lineTo(n - a, a),
        o.lineTo(n, a),
        o.closePath(),
        (o.fillStyle = "#e4d8bd"),
        o.fill(),
        x(o, 800, n * 0.2),
        (o.fillStyle = "#1b1a18"),
        (o.textBaseline = "alphabetic"),
        o.fillText("Résumé", n * 0.11, l * 0.36),
        (o.fillStyle = "#c2303a"),
        o.fillRect(n * 0.11, l * 0.43, n * 0.3, l * 0.035),
        (o.fillStyle = "#d6cdb9"),
        [0.54, 0.62, 0.7, 0.78].forEach((u, i) =>
          o.fillRect(n * 0.11, l * u, n * (i % 2 ? 0.58 : 0.74), l * 0.025),
        ));
    }
    return Pe(f, n, l, 5, 3);
  }
  function ze(e, s = "#c2303a") {
    const n = P(336, 114),
      l = n.getContext("2d");
    (l.scale(3, 3),
      (l.strokeStyle = l.fillStyle = s),
      (l.lineWidth = 2.4),
      W(l, 3, 3, 106, 32, 6),
      l.stroke(),
      x(l, 800, 17),
      (l.textBaseline = "middle"),
      F(l, e, 112 / 2, 38 / 2 + 1, 3, "center"),
      (l.globalCompositeOperation = "destination-out"));
    const f = oe(91);
    for (let o = 0; o < 320; o++)
      ((l.globalAlpha = f() * 0.7),
        l.beginPath(),
        l.arc(f() * 112, f() * 38, 0.3 + f() * 1.2, 0, C),
        l.fill());
    return { canvas: n, w: 112, h: 38 };
  }
  function et(e, s, c, r, t) {
    const o = P(276, 336),
      a = o.getContext("2d");
    (a.scale(3, 3), Q(a, 92, 112, "#fbf6ea", 60 + e.length, 10));
    const u = 8;
    ((a.fillStyle = c),
      W(a, u, u, 92 - u * 2, 112 - u * 2, 3),
      a.fill(),
      (a.strokeStyle = r),
      (a.fillStyle = r),
      (a.lineWidth = 2.4),
      (a.lineCap = a.lineJoin = "round"));
    const i = 92 / 2,
      d = s ? 44 : 112 / 2;
    if ((a.beginPath(), e === "logo" && t))
      a.drawImage(t, i - 34, d - 18, 68, 36);
    else if (e === "hello")
      (W(a, i - 26, d - 17, 52, 34, 2),
        a.stroke(),
        a.beginPath(),
        a.rect(i + 10, d - 11, 10, 12),
        a.stroke(),
        a.beginPath(),
        a.moveTo(i - 20, d - 4),
        a.lineTo(i + 2, d - 4),
        a.moveTo(i - 20, d + 3),
        a.lineTo(i + 4, d + 3),
        a.moveTo(i - 20, d + 10),
        a.lineTo(i - 2, d + 10),
        a.stroke());
    else if (e === "work")
      (a.setLineDash([2.4, 3]),
        W(a, i - 20, d - 22, 40, 44, 1),
        a.stroke(),
        a.setLineDash([]),
        a.beginPath(),
        a.moveTo(i - 14, d + 14),
        a.quadraticCurveTo(i - 4, d - 6, i + 4, d + 4),
        a.quadraticCurveTo(i + 9, d - 2, i + 14, d + 14),
        a.stroke(),
        a.beginPath(),
        a.arc(i + 7, d - 10, 4.5, 0, C),
        a.stroke());
    else if (e === "words") {
      (a.moveTo(i - 24, d - 6),
        a.bezierCurveTo(i - 24, d - 22, i + 24, d - 22, i + 24, d - 6),
        a.bezierCurveTo(i + 24, d + 8, i - 2, d + 12, i - 8, d + 10),
        a.lineTo(i - 18, d + 18),
        a.lineTo(i - 15, d + 6),
        a.bezierCurveTo(i - 22, d + 3, i - 24, d - 1, i - 24, d - 6),
        a.stroke());
      for (const h of [-10, 0, 10])
        (a.beginPath(), a.arc(i + h, d - 6, 2.2, 0, C), a.fill());
    } else
      e === "colour"
        ? (a.moveTo(i - 22, d + 16),
          a.bezierCurveTo(i - 10, d + 2, i + 2, d + 22, i + 16, d + 10),
          (a.lineWidth = 5),
          a.stroke(),
          (a.lineWidth = 2.4),
          a.beginPath(),
          a.moveTo(i - 4, d + 2),
          a.lineTo(i + 18, d - 20),
          a.stroke(),
          a.beginPath(),
          a.moveTo(i - 4, d + 2),
          a.quadraticCurveTo(i - 12, d + 4, i - 10, d + 10),
          a.quadraticCurveTo(i - 4, d + 10, i - 4, d + 2),
          a.fill())
        : e === "hi" &&
          (W(a, i - 24, d - 16, 48, 32, 2),
          a.stroke(),
          a.beginPath(),
          a.moveTo(i - 22, d - 14),
          a.lineTo(i, d + 3),
          a.lineTo(i + 22, d - 14),
          a.stroke());
    return (
      s &&
        ((a.font = "600 10.5px 'Geist Mono', monospace"),
        (a.textAlign = "center"),
        (a.textBaseline = "alphabetic"),
        F(a, s.toUpperCase(), i, 112 - u - 12, 0.8, "center")),
      be(a, 92, 112, 3.6),
      o
    );
  }
  return {
    lost: Ue,
    lostMark: Ge,
    goSticker: He,
    navStamp: et,
    frontLive: Ee,
    rng: oe,
    paper: Q,
    postmark: ue,
    stickerSheet: je,
    blankSticker: Xe,
    contactSticker: Ze,
    inkStamp: ze,
    CONTACT_DIMS: xe,
    testimonial: Le,
    stampBack: _e,
    dieCut: Pe,
    cleanSticker: Qe,
    letter: $e,
    stamp: Me,
    sticker: Ke,
    front: We,
    back: Ne,
    coverStamp: qe,
    openMark: Fe,
    title: Ye,
    SW: R,
    SH: z,
    backLayout: re,
    SLOT_ROT: fe,
  };
})();
