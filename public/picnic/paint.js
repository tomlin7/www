// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
window.Paint = (() => {
  const v = Math.PI * 2;
  function T(e) {
    let t = e >>> 0;
    return () => {
      t = (t + 1831565813) | 0;
      let l = Math.imul(t ^ (t >>> 15), 1 | t);
      return (
        (l = (l + Math.imul(l ^ (l >>> 7), 61 | l)) ^ l),
        ((l ^ (l >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  function C(e) {
    const t = T(e),
      l = Array.from({ length: 512 }, t);
    return (o) => {
      const g = Math.floor(o),
        r = o - g,
        f = r * r * (3 - 2 * r),
        i = l[g & 511],
        s = l[(g + 1) & 511];
      return i + (s - i) * f;
    };
  }
  function M(e, t, l = 4) {
    let o = 0,
      g = 0.5,
      r = 1,
      f = 0;
    for (let i = 0; i < l; i++)
      ((o += g * e(t * r + i * 31.7)), (f += g), (g *= 0.5), (r *= 2.07));
    return o / f;
  }
  function R(e, t, l, o, g = l) {
    const r = e.createLinearGradient(0, 0, 0, g);
    for (const [f, i] of o) r.addColorStop(f, i);
    ((e.fillStyle = r), e.fillRect(0, 0, t, l));
  }
  function k(e, t, l, o, g, r = -2, f = t + 2, i = l + 2) {
    (e.beginPath(), e.moveTo(r, i));
    for (let s = r; s <= f; s += 2) e.lineTo(s, o(s));
    (e.lineTo(f, i), e.closePath(), (e.fillStyle = g), e.fill());
  }
  function S(e, t, l, o, g) {
    (e.beginPath(), e.arc(t, l, o, 0, v), (e.fillStyle = g), e.fill());
  }
  function O(e, t, l, o, g, r, f) {
    (e.save(),
      (e.shadowColor = r),
      (e.shadowBlur = f),
      (e.shadowOffsetX = 1e4),
      e.beginPath(),
      e.ellipse(t - 1e4, l, o, g, 0, 0, v),
      (e.fillStyle = "#000"),
      e.fill(),
      e.restore());
  }
  function z(
    e,
    t,
    l,
    {
      warm: o = "rgba(255,196,140,.2)",
      vig: g = 0.3,
      grain: r = 24,
      seed: f = 1,
    } = {},
  ) {
    (e.save(),
      (e.globalCompositeOperation = "soft-light"),
      (e.fillStyle = o),
      e.fillRect(0, 0, t, l),
      (e.globalCompositeOperation = "source-over"));
    const i = e.createRadialGradient(
      t / 2,
      l * 0.45,
      Math.min(t, l) * 0.3,
      t / 2,
      l / 2,
      Math.hypot(t, l) * 0.62,
    );
    (i.addColorStop(0, "rgba(40,20,10,0)"),
      i.addColorStop(1, `rgba(40,20,10,${g})`),
      (e.fillStyle = i),
      e.fillRect(0, 0, t, l),
      e.restore());
    const s = e.getImageData(0, 0, t, l),
      d = s.data,
      n = T(f);
    for (let a = 0; a < d.length; a += 4) {
      const b = (n() - 0.5) * r;
      ((d[a] += b), (d[a + 1] += b), (d[a + 2] += b * 0.9));
    }
    e.putImageData(s, 0, 0);
  }
  function h(e, t, l) {
    const o = T(7),
      g = C(3),
      r = C(9),
      f = t / 1200,
      i = l * 0.66;
    (R(
      e,
      t,
      l,
      [
        [0, "#86aed0"],
        [0.55, "#c6d7de"],
        [1, "#f2e2c8"],
      ],
      i,
    ),
      O(
        e,
        t * 0.78,
        l * 0.2,
        t * 0.28,
        l * 0.12,
        "rgba(255,242,218,.75)",
        90 * f,
      ),
      k(
        e,
        t,
        l,
        (p) => i - l * 0.05 - M(g, (p / t) * 4) * l * 0.2,
        "rgba(146,166,182,.92)",
      ));
    const s = e.createLinearGradient(0, i, 0, l);
    (s.addColorStop(0, "#4f93a6"),
      s.addColorStop(1, "#1a4860"),
      (e.fillStyle = s),
      e.fillRect(0, i, t, l - i));
    for (let p = 0; p < 1600; p++) {
      const y = Math.pow(o(), 1.5),
        m = i + y * (l - i),
        u = o() * t,
        $ = (5 + o() * 24) * f * (0.4 + y * 1.8),
        P = Math.max(1, (0.6 + y * 2.2) * f);
      ((e.fillStyle =
        o() < 0.45
          ? `rgba(240,248,250,${0.1 + 0.25 * o()})`
          : `rgba(8,40,58,${0.12 + 0.22 * o()})`),
        e.fillRect(u, m, $, P));
    }
    const d = (p) =>
      i -
      Math.pow(Math.max(0, (p / t - 0.8) / 0.2), 0.7) * l * 0.34 -
      M(g, (p / t) * 9 + 5) * l * 0.04;
    k(e, t, l, d, "#56603b", t * 0.79, t + 2, i + 2);
    for (let p = 0; p < 260; p++) {
      const y = t * (0.8 + o() * 0.2),
        m = d(y) + o() * (i - d(y));
      S(e, y, m, (2 + o() * 5) * f, o() < 0.5 ? "#6c6447" : "#3f4c2c");
    }
    const n = (p) => {
      const y = p / t;
      let m =
        y < 0.3 ? 0.04 + y * 0.12 : 0.076 + ((y - 0.3) / 0.52) * (0.66 - 0.076);
      return ((m += (M(r, y * 7) - 0.5) * 0.08), Math.min(i, m * l));
    };
    k(e, t, l, n, "#727648", -2, t * 0.84, i + 2);
    const a = ["#5d6b3a", "#7d7f4e", "#8e8456", "#4a5a32", "#66733f"];
    for (let p = 0; p < 1300; p++) {
      const y = o() * t * 0.84,
        m = n(y),
        u = m + o() * (i - m);
      S(e, y, u, (2 + o() * 6) * f, a[(o() * a.length) | 0]);
    }
    const b = [
      "#f4e7d4",
      "#f7dcc6",
      "#efcdb5",
      "#faf2e6",
      "#ecd8ae",
      "#f3c0a6",
      "#e9e1d0",
      "#f6d3c7",
      "#f1e9dc",
    ];
    for (let p = l * 0.1; p < i - l * 0.008; p += l * 0.011)
      for (let y = o() * t * 0.02; y < t * 0.83; ) {
        const m = p / i,
          u = t * (0.012 + o() * 0.016) * (0.7 + m * 0.6),
          $ = u * (0.7 + o() * 0.5);
        if (p - $ > n(y + u / 2) + l * 0.008 && o() < 0.3 + m * 0.45)
          if (o() < 0.16)
            for (let P = 0; P < 4; P++)
              S(
                e,
                y + o() * u,
                p - o() * $,
                u * (0.25 + o() * 0.2),
                o() < 0.5 ? "#3f522c" : "#536238",
              );
          else {
            ((e.fillStyle = b[(o() * b.length) | 0]),
              e.fillRect(y, p - $, u, $),
              (e.fillStyle = "rgba(120,70,50,.22)"),
              e.fillRect(y + u * 0.68, p - $, u * 0.32, $),
              (e.fillStyle = "rgba(255,255,255,.4)"),
              e.fillRect(y, p - $, u, Math.max(1, f)),
              (e.fillStyle = "rgba(70,46,44,.55)"));
            const P = 1 + ((o() * 3) | 0);
            for (let I = 0; I < P; I++)
              e.fillRect(
                y + u * (0.12 + I * 0.28),
                p - $ * 0.62,
                u * 0.13,
                $ * 0.24,
              );
          }
        y += u * (0.85 + o() * 0.9);
      }
    const c = t * 0.46,
      q = n(c) + l * 0.12;
    ((e.fillStyle = "#f2e6d2"),
      e.fillRect(c - 18 * f, q - 10 * f, 36 * f, 22 * f),
      e.beginPath(),
      e.ellipse(c, q - 10 * f, 16 * f, 15 * f, 0, Math.PI, v),
      (e.fillStyle = "#3f8a7a"),
      e.fill(),
      e.beginPath(),
      e.ellipse(c + 5 * f, q - 14 * f, 5 * f, 9 * f, 0, 0, v),
      (e.fillStyle = "rgba(240,210,120,.55)"),
      e.fill(),
      (e.fillStyle = "#433d31"),
      e.fillRect(0, i - 2 * f, t * 0.84, 4 * f));
    for (let p = 0; p < 7; p++) {
      const y = t * (0.08 + o() * 0.8),
        m = i + l * (0.06 + o() * 0.25),
        u = (0.8 + (m - i) / (l - i)) * f;
      ((e.fillStyle = "rgba(245,250,250,.5)"),
        e.fillRect(y - 40 * u, m + 4 * u, 36 * u, 1.5 * u),
        e.beginPath(),
        e.ellipse(y, m, 14 * u, 4 * u, 0, 0, v),
        (e.fillStyle = "#f7f4ee"),
        e.fill(),
        (e.fillStyle = "#2f3f52"),
        e.fillRect(y - 4 * u, m - 6 * u, 8 * u, 4 * u));
    }
    z(e, t, l, { warm: "rgba(255,190,130,.24)", vig: 0.3, grain: 26, seed: 3 });
  }
  function B(e, t, l) {
    const o = T(21),
      g = C(5);
    (R(
      e,
      t,
      l,
      [
        [0, "#f2c58c"],
        [0.55, "#f8e1b8"],
        [1, "#fbecd0"],
      ],
      l * 0.7,
    ),
      S(e, t * 0.72, l * 0.4, t * 0.12, "#fff4da"),
      k(e, t, l, (b) => l * 0.6 - M(g, (b / t) * 3) * l * 0.14, "#bcc58f"),
      k(
        e,
        t,
        l,
        (b) => l * 0.71 - M(g, (b / t) * 2.4 + 9) * l * 0.12,
        "#93a65d",
      ),
      k(
        e,
        t,
        l,
        (b) => l * 0.84 - M(g, (b / t) * 2 + 20) * l * 0.06,
        "#6f8c40",
      ));
    const r = t * 0.36,
      f = l * 0.84;
    ((e.fillStyle = "rgba(38,58,20,.35)"),
      e.beginPath(),
      e.ellipse(r + t * 0.07, f + l * 0.015, t * 0.27, l * 0.035, 0, 0, v),
      e.fill(),
      (e.strokeStyle = "#4a3423"),
      (e.lineCap = "round"),
      (e.lineWidth = t * 0.035),
      e.beginPath(),
      e.moveTo(r, f),
      e.quadraticCurveTo(r - t * 0.01, l * 0.6, r + t * 0.005, l * 0.45),
      e.stroke(),
      (e.lineWidth = t * 0.014));
    for (const [b, c] of [
      [-0.12, 0.33],
      [0.13, 0.35],
      [-0.06, 0.28],
    ])
      (e.beginPath(),
        e.moveTo(r, l * 0.55),
        e.quadraticCurveTo(r + b * t * 0.5, l * 0.45, r + b * t, l * c),
        e.stroke());
    const i = r,
      s = l * 0.33,
      d = t * 0.27,
      n = l * 0.22;
    for (const [b, c, q, p] of [
      ["#2b4527", 1, 0, 0],
      ["#3e5d2f", 0.75, -0.18, -0.18],
      ["#62803c", 0.45, -0.32, -0.34],
    ])
      for (let y = 0; y < 110 * c; y++) {
        const m = o() * v,
          u = Math.sqrt(o()) * c,
          $ = i + (Math.cos(m) * u + q) * d,
          P = s + (Math.sin(m) * u * 0.9 + p) * n;
        S(e, $, P, t * (0.03 + o() * 0.035) * (0.6 + c * 0.4), b);
      }
    (e.save(),
      e.translate(r + t * 0.16, f + l * 0.025),
      e.transform(1, 0, -0.6, 0.38, 0, 0));
    const a = t * 0.022;
    for (let b = 0; b < 5; b++)
      for (let c = 0; c < 4; c++)
        ((e.fillStyle = (b + c) % 2 ? "#f6c9cc" : "#c8283a"),
          e.fillRect(b * a - a * 2.5, c * a - a * 2, a, a));
    (e.restore(),
      z(e, t, l, {
        warm: "rgba(255,200,140,.2)",
        vig: 0.26,
        grain: 22,
        seed: 5,
      }));
  }
  function W(e, t, l) {
    const o = T(41);
    (R(
      e,
      t,
      l,
      [
        [0, "#f0d6ae"],
        [1, "#f7e8cf"],
      ],
      l * 0.6,
    ),
      S(e, t * 0.68, l * 0.27, t * 0.13, "#e2553a"));
    for (let r = 0; r < 4; r++)
      O(
        e,
        t * (0.2 + o() * 0.7),
        l * (0.12 + o() * 0.28),
        t * (0.18 + o() * 0.2),
        l * 0.012,
        "rgba(250,238,215,.95)",
        t * 0.012,
      );
    const g = [
      "#a7bccb",
      "#7899bb",
      "#4a73aa",
      "#2e5492",
      "#213f7a",
      "#162d5e",
    ];
    for (let r = 0; r < 6; r++) {
      const f = l * (0.47 + r * 0.095),
        i = l * (0.014 + r * 0.013),
        s = ((2.6 - r * 0.28) * v) / t,
        d = r * 1.7,
        n = (a) =>
          f -
          Math.pow(Math.max(0, Math.sin(a * s + d)), 1.6) * i * 1.9 +
          Math.sin(a * s * 2.3 + d) * i * 0.22;
      (k(e, t, l, n, g[r]),
        (e.strokeStyle = "rgba(250,244,230,.9)"),
        (e.lineWidth = Math.max(1, t * 0.004 * (1 + r * 0.45))),
        e.beginPath());
      for (let a = 0; a <= t; a += 2) e.lineTo(a, n(a) + e.lineWidth * 0.6);
      e.stroke();
      for (let a = 0; a < t; a += 3)
        Math.sin(a * s + d) > 0.93 &&
          o() < 0.5 &&
          S(
            e,
            a + (o() - 0.5) * 8,
            n(a) - o() * i * 0.4,
            t * 0.006 * (1 + r * 0.4),
            "rgba(252,248,236,.95)",
          );
    }
    z(e, t, l, { warm: "rgba(255,190,130,.14)", vig: 0.3, grain: 22, seed: 7 });
  }
  function j(e, t, l, o, g, r, f) {
    const s = [];
    for (let d = 1; d <= 10; d++) {
      const n = l - o + (o * d) / 10,
        a = g * (d / 10) * (0.75 + f() * 0.5);
      s.push([a, n]);
    }
    ((e.fillStyle = r), e.beginPath(), e.moveTo(t, l - o));
    for (const [d, n] of s)
      (e.lineTo(t + d, n), e.lineTo(t + d * 0.4, n - (o / 10) * 0.3));
    e.lineTo(t, l);
    for (let d = s.length - 1; d >= 0; d--) {
      const [n, a] = s[d];
      (e.lineTo(t - n * 0.4, a - (o / 10) * 0.3), e.lineTo(t - n, a));
    }
    (e.closePath(), e.fill());
  }
  function F(e, t, l) {
    const o = T(31),
      g = C(4),
      r = C(14);
    R(
      e,
      t,
      l,
      [
        [0, "#1f3570"],
        [0.6, "#40619e"],
        [1, "#6383b6"],
      ],
      l * 0.75,
    );
    for (let n = 0; n < 5; n++)
      O(
        e,
        o() * t,
        l * (0.1 + o() * 0.3),
        t * (0.12 + o() * 0.15),
        l * 0.022,
        "rgba(210,222,240,.6)",
        t * 0.03,
      );
    S(e, t * 0.36, l * 0.13, t * 0.034, "#fbf7ea");
    const f = (n) => Math.pow(M(g, (n / t) * 2.2 + 1), 1.7);
    (k(e, t, l, (n) => l * 0.64 - f(n) * l * 0.55, "#cfd7e3"),
      k(
        e,
        t,
        l,
        (n) =>
          l * 0.66 -
          f(n + t * 0.02) * l * 0.45 +
          (M(r, (n / t) * 9) - 0.5) * l * 0.05,
        "rgba(112,134,172,.6)",
      ),
      k(
        e,
        t,
        l,
        (n) => l * 0.74 - M(r, (n / t) * 4 + 4) * l * 0.09,
        "#24332f",
      ));
    const i = [];
    for (let n = 0; n < 16; n++)
      i.push([
        t * (0.42 + o() * 0.66),
        l * (0.78 + o() * 0.24),
        l * (0.3 + o() * 0.55),
      ]);
    i.sort((n, a) => n[1] - a[1]);
    for (const [n, a, b] of i)
      j(e, n, a, b, b * 0.22, o() < 0.5 ? "#121c18" : "#1b2a23", o);
    const s = t * 0.3,
      d = l * 0.9;
    ((e.fillStyle = "#2a211b"),
      e.fillRect(s - t * 0.07, d - l * 0.06, t * 0.14, l * 0.06),
      e.beginPath(),
      e.moveTo(s - t * 0.085, d - l * 0.06),
      e.lineTo(s, d - l * 0.12),
      e.lineTo(s + t * 0.085, d - l * 0.06),
      (e.fillStyle = "#dfe4ec"),
      e.fill(),
      O(
        e,
        s - t * 0.025,
        d - l * 0.03,
        t * 0.05,
        l * 0.03,
        "rgba(255,196,96,.55)",
        t * 0.03,
      ),
      (e.fillStyle = "#f6c86a"),
      e.fillRect(s - t * 0.045, d - l * 0.042, t * 0.026, l * 0.022),
      e.fillRect(s + t * 0.015, d - l * 0.042, t * 0.026, l * 0.022),
      z(e, t, l, {
        warm: "rgba(120,150,220,.12)",
        vig: 0.42,
        grain: 26,
        seed: 9,
      }));
  }
  function L(e, t, l) {
    const o = T(51),
      g = C(6);
    R(
      e,
      t,
      l,
      [
        [0, "#93bddc"],
        [1, "#e6eee9"],
      ],
      l * 0.55,
    );
    for (let i = 0; i < 3; i++) {
      const s = t * (0.15 + i * 0.33 + o() * 0.1),
        d = l * (0.13 + o() * 0.16);
      for (let n = 0; n < 8; n++)
        O(
          e,
          s + (o() - 0.5) * t * 0.18,
          d + (o() - 0.5) * l * 0.05,
          t * (0.04 + o() * 0.04),
          t * (0.03 + o() * 0.03),
          "rgba(255,255,255,.95)",
          t * 0.012,
        );
    }
    k(e, t, l, (i) => l * 0.5 - M(g, (i / t) * 14) * l * 0.08, "#56713f");
    const r = e.createLinearGradient(0, l * 0.52, 0, l);
    (r.addColorStop(0, "#a9c564"),
      r.addColorStop(1, "#6b9638"),
      k(e, t, l, () => l * 0.53, r),
      (e.fillStyle = "#eadfb9"),
      e.beginPath(),
      e.moveTo(t * 0.5, l * 0.53),
      e.bezierCurveTo(t * 0.42, l * 0.68, t * 0.7, l * 0.78, t * 0.48, l + 2),
      e.lineTo(t * 0.86, l + 2),
      e.bezierCurveTo(
        t * 0.86,
        l * 0.8,
        t * 0.52,
        l * 0.68,
        t * 0.515,
        l * 0.53,
      ),
      e.fill());
    for (let i = 0; i < 420; i++) {
      const s = Math.pow(o(), 0.8),
        d = l * 0.54 + s * l * 0.46,
        n = o() * t;
      ((e.strokeStyle =
        o() < 0.5 ? "rgba(62,98,40,.7)" : "rgba(120,156,70,.7)"),
        (e.lineWidth = Math.max(1, t * 0.002 * (0.5 + s))),
        e.beginPath(),
        e.moveTo(n, d),
        e.lineTo(n + (o() - 0.5) * t * 0.01, d - l * 0.03 * (0.4 + s)),
        e.stroke());
    }
    const f = ["#ffffff", "#f4d54b", "#f39cb3", "#b59bdc", "#ffffff"];
    for (let i = 0; i < 900; i++) {
      const s = Math.pow(o(), 0.7),
        d = l * 0.54 + s * l * 0.46,
        n = o() * t;
      S(
        e,
        n,
        d,
        t * (0.002 + s * 0.007) * (0.6 + o() * 0.6),
        f[(o() * f.length) | 0],
      );
    }
    z(e, t, l, {
      warm: "rgba(255,214,150,.16)",
      vig: 0.26,
      grain: 22,
      seed: 11,
    });
  }
  function D(e, t, l) {
    const o = T(61);
    (R(
      e,
      t,
      l,
      [
        [0, "#f6d27a"],
        [1, "#f1a65c"],
      ],
      l * 0.5,
    ),
      S(e, t * 0.26, l * 0.24, t * 0.1, "#fff1c8"),
      k(e, t, l, () => l * 0.47, "#a3a453"));
    for (let g = 0; g < 7; g++) {
      const r = g / 6,
        f = l * (0.5 + Math.pow(r, 1.4) * 0.52),
        i = 0.28 + r * 0.95;
      ((e.fillStyle = g % 2 ? "rgba(201,152,85,.55)" : "rgba(118,148,64,.5)"),
        e.fillRect(0, f - l * 0.02 * i, t, l * 0.02 * i));
      const s = t * 0.11 * i;
      for (let d = (g % 2) * s * 0.5 - s * 0.3; d < t + s; d += s) {
        const n = d + (o() - 0.5) * s * 0.15,
          a = t * 0.042 * i;
        ((e.fillStyle = "rgba(60,40,20,.35)"),
          e.beginPath(),
          e.ellipse(n + a * 0.4, f, a * 1.1, a * 0.25, 0, 0, v),
          e.fill(),
          (e.fillStyle = "#5a3d25"),
          e.fillRect(n - a * 0.1, f - a * 1.1, a * 0.2, a * 1.1));
        for (let b = 0; b < 7; b++)
          S(
            e,
            n + (o() - 0.5) * a * 1.2,
            f - a * 1.5 + (o() - 0.5) * a * 0.9,
            a * (0.45 + o() * 0.25),
            "#3b5a29",
          );
        for (let b = 0; b < 4; b++)
          S(
            e,
            n - a * 0.3 + (o() - 0.5) * a * 0.8,
            f - a * 1.75 + (o() - 0.5) * a * 0.5,
            a * (0.3 + o() * 0.15),
            "#5f7f35",
          );
        for (let b = 0; b < 6; b++)
          S(
            e,
            n + (o() - 0.5) * a * 1.6,
            f - a * 1.5 + (o() - 0.5) * a * 1.1,
            Math.max(1, a * 0.09),
            "#f08328",
          );
      }
    }
    z(e, t, l, {
      warm: "rgba(255,180,110,.18)",
      vig: 0.3,
      grain: 22,
      seed: 13,
    });
  }
  const N = { town: h, tree: B, waves: W, night: F, meadow: L, orchard: D };
  function A(e, t) {
    const l = e.getContext("2d");
    (l.clearRect(0, 0, e.width, e.height), N[t](l, e.width, e.height));
  }
  function E(e, t, l, o) {
    const g = t.split(`
`),
      r = Math.max(...g.map((i) => i.length)) > 7 ? 12 : 17,
      f = (i, s) =>
        g
          .map(
            (d, n) =>
              `<text x="${i}" y="${s + (n - (g.length - 1) / 2) * r * 1.05 + r * 0.35}" text-anchor="middle" font-family="Geist, sans-serif" font-weight="800" font-size="${r}" letter-spacing="-.02em" fill="${o}">${d}</text>`,
          )
          .join("");
    if (e === "sun") {
      let i = "";
      for (let s = 0; s < 28; s++) {
        const d = (s / 28) * v - Math.PI / 2,
          n = s % 2 ? 36 : 47;
        i += `${s ? "L" : "M"}${(50 + Math.cos(d) * n).toFixed(1)} ${(50 + Math.sin(d) * n).toFixed(1)}`;
      }
      return `<svg viewBox="0 0 100 100"><path d="${i}Z" fill="#fffdf7" stroke="#fffdf7" stroke-width="7" stroke-linejoin="round"/><path d="${i}Z" fill="${l}"/><circle cx="50" cy="50" r="27" fill="none" stroke="${o}" stroke-width="1.2" stroke-dasharray="3 3"/>${f(50, 50)}</svg>`;
    }
    return e === "oval"
      ? `<svg viewBox="0 0 140 84"><ellipse cx="70" cy="42" rx="64" ry="36" fill="${l}" stroke="#fffdf7" stroke-width="6"/><ellipse cx="70" cy="42" rx="55" ry="28" fill="none" stroke="${o}" stroke-width="1.2" stroke-dasharray="4 3"/>${f(70, 42)}</svg>`
      : e === "square"
        ? `<svg viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" rx="12" fill="${l}" stroke="#fffdf7" stroke-width="6"/><rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="${o}" stroke-width="1.2" stroke-dasharray="4 3"/>${f(50, 50)}</svg>`
        : `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="${l}" stroke="#fffdf7" stroke-width="6"/><circle cx="50" cy="50" r="35" fill="none" stroke="${o}" stroke-width="1.2" stroke-dasharray="3 3"/>${f(50, 50)}</svg>`;
  }
  let G = 0;
  function Z(e, t, l, o) {
    const g = `pm${G++}`,
      r = (f) =>
        `<path d="M112 ${f} q8 -7 16 0 t16 0 t16 0 t16 0 t16 0" stroke-width="2.6"/>`;
    return `<svg viewBox="0 0 200 120" aria-hidden="true">
      <defs>
        <path id="${g}t" d="M22,60 a38,38 0 0,1 76,0"/>
        <path id="${g}b" d="M15,60 a45,45 0 0,0 90,0"/>
        <filter id="${g}f" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${G * 7}" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" result="d"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="3" seed="${G * 3 + 1}" result="m"/>
          <feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.6 2.2" result="mask"/>
          <feComposite in="d" in2="mask" operator="in"/>
        </filter>
      </defs>
      <g filter="url(#${g}f)" fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="52" stroke-width="2.6"/>
        <circle cx="60" cy="60" r="29" stroke-width="1.4"/>
        <g fill="currentColor" stroke="none" font-family="Geist, sans-serif" font-weight="700" letter-spacing="1.6">
          <text font-size="11"><textPath href="#${g}t" startOffset="50%" text-anchor="middle">${e}</textPath></text>
          <text font-size="10"><textPath href="#${g}b" startOffset="50%" text-anchor="middle">${t}</textPath></text>
          <text x="16" y="64" font-size="9">★</text><text x="96" y="64" font-size="9">★</text>
          <text x="60" y="58" text-anchor="middle" font-size="13" letter-spacing="0">${l}</text>
          <text x="60" y="73" text-anchor="middle" font-size="10" letter-spacing=".5">${o}</text>
        </g>
        ${r(40)}${r(54)}${r(68)}${r(82)}
      </g>
    </svg>`;
  }
  return { paint: A, sticker: E, postmark: Z };
})();
