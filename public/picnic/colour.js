// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
window.Colour = (() => {
  const A = Math.PI * 2,
    V = "#141210",
    e0 = 5,
    D = (U, b) => {
      const v = document.createElement("canvas");
      return ((v.width = Math.round(U)), (v.height = Math.round(b)), v);
    };
  function X(U, b, v, E) {
    const P = D(U * v, b * v),
      i = P.getContext("2d"),
      O = (b * v) / 1e3;
    (i.scale(O, O),
      (i.strokeStyle = V),
      (i.fillStyle = V),
      (i.lineCap = "round"),
      (i.lineJoin = "round"));
    const I = Print.rng(E ? 23 : 17),
      J = (e) => (I() - 0.5) * 2 * e;
    function q(e, o) {
      const t = e.length,
        r = (n) => (o ? e[(n + t) % t] : e[Math.max(0, Math.min(t - 1, n))]);
      (i.beginPath(), i.moveTo(e[0][0], e[0][1]));
      for (let n = 0; n < (o ? t : t - 1); n++) {
        const u = r(n - 1),
          s = r(n),
          a = r(n + 1),
          j = r(n + 2);
        i.bezierCurveTo(
          s[0] + (a[0] - u[0]) / 6,
          s[1] + (a[1] - u[1]) / 6,
          a[0] - (j[0] - s[0]) / 6,
          a[1] - (j[1] - s[1]) / 6,
          a[0],
          a[1],
        );
      }
      o && i.closePath();
    }
    function F(e, o) {
      (i.beginPath(), i.moveTo(e[0][0], e[0][1]));
      for (let t = 1; t < e.length; t++) i.lineTo(e[t][0], e[t][1]);
      o && i.closePath();
    }
    function c(e, o = {}) {
      const t = o.j == null ? 1.2 : o.j,
        r = e.map(([n, u]) => [n + J(t), u + J(t)]);
      ((o.sharp ? F : q)(r, o.closed),
        o.cut &&
          (i.save(),
          (i.globalCompositeOperation = "destination-out"),
          i.fill(),
          i.restore()),
        o.fill && i.fill(),
        (i.lineWidth = (o.w || e0) * (0.9 + I() * 0.2)),
        i.stroke());
    }
    function h(e, o, t, r, n = 0, u = 18, s = 0.03) {
      const a = I() * A,
        j = [],
        l = Math.cos(n),
        f = Math.sin(n);
      for (let M = 0; M < u; M++) {
        const g = (M / u) * A,
          C = 1 + s * Math.sin(g * 2 + a) + s * 0.6 * Math.sin(g * 3 + a * 1.7),
          L = Math.cos(g) * t * C,
          S = Math.sin(g) * r * C;
        j.push([e + L * l - S * f, o + L * f + S * l]);
      }
      return j;
    }
    function p(e, o, t, r, n, u = 1) {
      const s = [],
        a = r * 7,
        j = I() * A;
      for (let l = 0; l < a; l++) {
        const f = (l / a) * A,
          M =
            1 -
            n +
            n * Math.abs(Math.sin((f * r) / 2 + j)) +
            0.03 * Math.sin(f * 3);
        s.push([e + Math.cos(f) * t * M, o + Math.sin(f) * t * M * u]);
      }
      return s;
    }
    function N(e, o, t, r) {
      const n = [];
      for (let s = 0; s <= 44; s++) {
        const a = e + ((o - e) * s) / 44;
        let j = 0;
        for (const [l, f] of r)
          j = Math.max(j, Math.sqrt(Math.max(0, f * f - (a - l) * (a - l))));
        n.push([a, t - j]);
      }
      return (n.push([o - 6, t + 2], [(e + o) / 2, t + 4], [e + 6, t + 2]), n);
    }
    const z = (e, o, t, r) =>
      e.map(([n, u]) => {
        const s = n - o,
          a = u - t;
        return [
          o + s * Math.cos(r) - a * Math.sin(r),
          t + s * Math.sin(r) + a * Math.cos(r),
        ];
      });
    function B(e, o, t) {
      c(h(e, o, t, t, 0, 16, 0.02), { closed: !0 });
      for (let r = 0; r < 11; r++) {
        const n = (r / 11) * A + 0.3,
          u = n + 0.12;
        c(
          [
            [e + Math.cos(n) * (t + 16), o + Math.sin(n) * (t + 16)],
            [e + Math.cos(u) * (t + 30), o + Math.sin(u) * (t + 30)],
            [e + Math.cos(n) * (t + 46), o + Math.sin(n) * (t + 46)],
          ],
          { j: 0.8 },
        );
      }
    }
    function T(e, o, t) {
      c(
        N(e - t / 2, e + t / 2, o, [
          [e - t * 0.3, t * 0.17],
          [e - t * 0.04, t * 0.27],
          [e + t * 0.27, t * 0.2],
        ]),
        { closed: !0, j: 0.6 },
      );
    }
    function d(e, o, t) {
      c(
        [
          [e - 16 * t, o - 4 * t],
          [e - 8 * t, o - 10 * t],
          [e, o],
          [e + 8 * t, o - 10 * t],
          [e + 16 * t, o - 4 * t],
        ],
        { j: 0.4, w: 4 },
      );
    }
    function w(e, o, t, r) {
      const n = [];
      for (let u = 0; u <= 10; u++) {
        const s = e + ((o - e) * u) / 10;
        n.push([s, t + r * Math.sin((u / 10) * Math.PI * 2.2 + 0.6)]);
      }
      c(n, { j: 1.5 });
    }
    function m(e, o, t, r) {
      const n = t + r * 0.78,
        u = [
          [e - 34, o + 4],
          [e - 22, o - 14],
          [e - 17, (o + n) / 2],
          [e - 13, n],
        ],
        s = [
          [e + 14, n],
          [e + 18, (o + n) / 2],
          [e + 24, o - 14],
          [e + 38, o + 6],
        ],
        a = [...u, ...s];
      (i.save(),
        F(a, !0),
        (i.globalCompositeOperation = "destination-out"),
        i.fill(),
        i.restore(),
        c(u),
        c(s),
        c(
          [
            [e - 4, o - 40],
            [e + 2, o - 70],
            [e - 2, o - 96],
          ],
          { w: 3.5, j: 0.6 },
        ),
        c(p(e, t, r, 9, 0.16, 0.92), { closed: !0, cut: !0, j: 0.8 }));
      for (const [j, l] of [
        [-0.12, -0.6],
        [0.55, -0.1],
        [-0.55, 0.12],
        [0.2, 0.42],
      ]) {
        const f = e + j * r,
          M = t + l * r,
          g = r * 0.075;
        (c(h(f, M, g, g, 0, 12, 0.03), { closed: !0, j: 0.4, w: 4 }),
          c(
            [
              [f, M - g],
              [f + 3, M - g - 9],
            ],
            { j: 0.3, w: 3.5 },
          ));
      }
    }
    function Y(e, o, t, r) {
      const n = o - e,
        u = [];
      for (let s = 0; s < r; s++)
        u.push([
          e + n * ((s + 0.5) / r) + J(n * 0.03),
          (n / r) * (0.62 + I() * 0.2),
        ]);
      c(N(e, o, t, u), { closed: !0, cut: !0, j: 0.6 });
    }
    function Z(e, o, t, r, n, u) {
      c(
        [
          [o, e],
          [t, e],
          [u, r],
          [n, r],
        ],
        { closed: !0, sharp: !0, cut: !0, j: 1.6 },
      );
      const s = 7,
        a = 5,
        j = (l) => e + (r - e) * Math.pow(l, 1.25);
      for (let l = 1; l < s; l++) {
        const f = l / s;
        c(
          [
            [o + (t - o) * f, e],
            [n + (u - n) * f, r],
          ],
          { sharp: !0, w: 3.6, j: 1 },
        );
      }
      for (let l = 1; l < a; l++) {
        const f = j(l / a),
          M = (f - e) / (r - e);
        c(
          [
            [o + (n - o) * M, f],
            [t + (u - t) * M, f],
          ],
          { sharp: !0, w: 3.6, j: 1 },
        );
      }
      for (const [l, f, M, g] of [
        [e, o, t, -1],
        [r, n, u, 1],
      ]) {
        const C = Math.round((M - f) / 28);
        for (let L = 0; L <= C; L++) {
          const S = f + ((M - f) * L) / C;
          c(
            [
              [S, l + g * 4],
              [S + J(2), l + g * (14 + I() * 4)],
            ],
            { sharp: !0, w: 3, j: 0.4 },
          );
        }
      }
    }
    function _(e, o, t) {
      const r = [],
        n = [];
      for (let s = 0; s <= 10; s++) {
        const a = Math.PI + (s / 10) * Math.PI;
        (r.push([e + Math.cos(a) * 84 * t, o - 40 * t + Math.sin(a) * 100 * t]),
          n.push([
            e + Math.cos(a) * 70 * t,
            o - 40 * t + Math.sin(a) * 86 * t,
          ]));
      }
      c([...r, ...n.reverse()], { closed: !0, cut: !0, j: 0.8 });
      const u = [
        [e - 104 * t, o - 40 * t],
        [e + 104 * t, o - 40 * t],
        [e + 92 * t, o + 34 * t],
        [e + 78 * t, o + 52 * t],
        [e - 78 * t, o + 52 * t],
        [e - 92 * t, o + 34 * t],
      ];
      (c(u, { closed: !0, sharp: !0, cut: !0, j: 1 }),
        c(
          [
            [e - 102 * t, o - 22 * t],
            [e + 102 * t, o - 22 * t],
          ],
          { sharp: !0, w: 4 },
        ));
      for (const [s, a] of [
        [0, 97],
        [24, 89],
      ])
        c(
          [
            [e - a * t, o + s * t],
            [e + a * t, o + s * t],
          ],
          { sharp: !0, w: 3.4, j: 0.8 },
        );
      for (let s = 0; s < 3; s++) {
        const a = [-22, 0, 24][s],
          j = [0, 24, 50][s],
          l = [97, 89, 78][s];
        for (let f = -3; f <= 3; f++) {
          const M = e + (f + (s % 2 ? 0.5 : 0)) * l * t * 0.27;
          Math.abs(M - e) < l * t * 0.9 &&
            c(
              [
                [M, o + a * t + 4],
                [M + 3, o + j * t - 4],
              ],
              { sharp: !0, w: 3, j: 0.6 },
            );
        }
      }
      c(
        [
          [e - 70 * t, o - 40 * t],
          [e - 52 * t, o - 76 * t],
          [e - 30 * t, o - 58 * t],
          [e - 6 * t, o - 84 * t],
          [e + 16 * t, o - 40 * t],
        ],
        { closed: !0, cut: !0, j: 0.8 },
      );
    }
    function $(e, o, t) {
      (c(h(e, o, 100 * t, 36 * t, 0, 22, 0.015), {
        closed: !0,
        cut: !0,
        j: 0.6,
      }),
        c(h(e, o + 2 * t, 74 * t, 25 * t, 0, 20, 0.02), {
          closed: !0,
          j: 0.5,
          w: 3.4,
        }));
      for (const [r, n] of [
        [-26, -0.12],
        [30, 0.14],
      ]) {
        const u = e + r * t,
          s = o + 4 * t,
          a = z(
            [
              [u - 34 * t, s + 6 * t],
              [u + 6 * t, s - 62 * t],
              [u + 30 * t, s + 8 * t],
            ],
            u,
            s,
            n,
          );
        c(a, { closed: !0, sharp: !0, cut: !0, j: 0.8 });
        const j = z(
          [
            [u - 25 * t, s - 6 * t],
            [u + 2 * t, s - 50 * t],
          ],
          u,
          s,
          n,
        );
        c(j, { sharp: !0, w: 3.4, j: 0.6 });
      }
    }
    function H(e, o, t) {
      const r = [],
        n = [];
      for (let u = 0; u <= 12; u++) {
        const s = (u / 12) * Math.PI;
        (r.push([e + Math.cos(s) * 70 * t, o + Math.sin(s) * 52 * t]),
          n.push([e + Math.cos(s) * 56 * t, o + Math.sin(s) * 40 * t]));
      }
      (c(r, { closed: !0, cut: !0, j: 0.6 }), c(n, { j: 0.6, w: 3.6 }));
      for (const [u, s] of [
        [-30, 10],
        [-8, 22],
        [16, 12],
        [34, 6],
        [4, 4],
      ])
        c(h(e + u * t, o + s * t, 3.4 * t, 5.4 * t, 0.4, 8, 0.02), {
          closed: !0,
          fill: !0,
          w: 2,
          j: 0.2,
        });
    }
    function K(e, o, t) {
      (c(h(e + 34 * t, o + 2 * t, 20 * t, 22 * t, 0, 12, 0.03), {
        closed: !0,
        j: 0.4,
      }),
        i.save(),
        (i.globalCompositeOperation = "destination-out"),
        i.beginPath(),
        i.ellipse(e + 34 * t, o + 2 * t, 10 * t, 12 * t, 0, 0, A),
        i.fill(),
        i.restore(),
        c(h(e + 34 * t, o + 2 * t, 10 * t, 12 * t, 0, 10, 0.03), {
          closed: !0,
          j: 0.3,
          w: 3.4,
        }));
      const r = [
        [e - 34 * t, o - 38 * t],
        [e + 34 * t, o - 38 * t],
        [e + 32 * t, o + 34 * t],
        [e + 24 * t, o + 42 * t],
        [e - 24 * t, o + 42 * t],
        [e - 32 * t, o + 34 * t],
      ];
      (c(r, { closed: !0, cut: !0, j: 0.8 }),
        c(h(e, o - 38 * t, 34 * t, 9 * t, 0, 16, 0.02), {
          closed: !0,
          j: 0.4,
          w: 3.6,
        }));
      for (const n of [-10, 12])
        c(
          [
            [e + n * t, o - 54 * t],
            [e + (n - 8) * t, o - 70 * t],
            [e + (n + 6) * t, o - 86 * t],
            [e + (n - 4) * t, o - 104 * t],
          ],
          { j: 0.4, w: 3.4 },
        );
    }
    function R(e, o, t, r) {
      const n = z(
        [
          [e - 70 * t, o - 46 * t],
          [e + 70 * t, o - 46 * t],
          [e + 70 * t, o + 46 * t],
          [e - 70 * t, o + 46 * t],
        ],
        e,
        o,
        r,
      );
      c(n, { closed: !0, sharp: !0, cut: !0, j: 0.8 });
      const u = [],
        s = e + 42 * t,
        a = o - 22 * t,
        j = 20 * t,
        l = 15 * t,
        f = 3.6 * t,
        M = (g, C, L, S, Q, r0, n0) => {
          for (let W = 0; W < Q; W++) {
            const t0 = (W + 0.5) / Q;
            u.push(
              [g + (L - g) * (W / Q), C + (S - C) * (W / Q)],
              [g + (L - g) * t0 + r0 * f, C + (S - C) * t0 + n0 * f],
            );
          }
        };
      (M(s - j, a - l, s + j, a - l, 5, 0, -1),
        M(s + j, a - l, s + j, a + l, 4, 1, 0),
        M(s + j, a + l, s - j, a + l, 5, 0, 1),
        M(s - j, a + l, s - j, a - l, 4, -1, 0),
        c(z(u, e, o, r), { closed: !0, j: 0.2, w: 3 }));
      for (const [g, C] of [
        [60, 4],
        [70, 18],
        [50, 32],
      ])
        c(
          z(
            [
              [e - 56 * t, o + C * t],
              [e + (g - 56) * t, o + C * t],
            ],
            e,
            o,
            r,
          ),
          { w: 3, j: 0.6 },
        );
      c(
        z(
          [
            [e - 56 * t, o - 26 * t],
            [e - 10 * t, o - 32 * t],
            [e - 30 * t, o - 18 * t],
          ],
          e,
          o,
          r,
        ),
        { w: 3, j: 0.6 },
      );
    }
    function G(e, o, t, r) {
      c(
        [
          [e, o],
          [e + 4 * t, o + r * 0.5],
          [e - 2 * t, o + r],
        ],
        { j: 0.6 },
      );
      const n = e + 2 * t,
        u = o + r * 0.62;
      c(
        [
          [n, u],
          [n + 18 * t, u - 16 * t],
          [n + 38 * t, u - 14 * t],
          [n + 22 * t, u + 2 * t],
        ],
        { closed: !0, cut: !0, j: 0.5, w: 4 },
      );
      for (let s = 0; s < 9; s++) {
        const a = (s / 9) * A + 0.2;
        c(
          h(
            e + Math.cos(a) * 26 * t,
            o + Math.sin(a) * 26 * t,
            17 * t,
            8.5 * t,
            a,
            12,
            0.03,
          ),
          { closed: !0, cut: !0, j: 0.3, w: 4 },
        );
      }
      c(h(e, o, 13 * t, 13 * t, 0, 12, 0.03), {
        closed: !0,
        cut: !0,
        j: 0.3,
        w: 4,
      });
    }
    function y(e, o, t, r) {
      c(
        [
          [e, o + 4 * t],
          [e - 3 * t, o + r * 0.5],
          [e + 2 * t, o + r],
        ],
        { j: 0.6 },
      );
      for (const n of [-1, 1])
        c(
          [
            [e, o + r],
            [e + n * 30 * t, o + r * 0.55],
            [e + n * 22 * t, o + r * 0.3],
            [e + n * 8 * t, o + r * 0.7],
          ],
          { closed: !0, cut: !0, j: 0.5, w: 4 },
        );
      c(
        [
          [e - 22 * t, o - 8 * t],
          [e - 26 * t, o - 44 * t],
          [e - 10 * t, o - 30 * t],
          [e, o - 50 * t],
          [e + 10 * t, o - 30 * t],
          [e + 26 * t, o - 44 * t],
          [e + 22 * t, o - 8 * t],
          [e + 8 * t, o + 8 * t],
          [e - 8 * t, o + 8 * t],
        ],
        { closed: !0, cut: !0, j: 0.5 },
      );
    }
    function x(e, o, t) {
      c(
        [
          [e - 14 * t, o],
          [e - 9 * t, o - 16 * t],
          [e - 4 * t, o - 2 * t],
          [e, o - 24 * t],
          [e + 5 * t, o - 2 * t],
          [e + 10 * t, o - 17 * t],
          [e + 15 * t, o],
        ],
        { sharp: !0, j: 0.8, w: 3.8 },
      );
    }
    function k(e, o, t) {
      for (const r of [-1, 1])
        (c(h(e + r * 30 * t, o - 18 * t, 30 * t, 22 * t, r * -0.5, 14, 0.04), {
          closed: !0,
          cut: !0,
          j: 0.4,
          w: 4,
        }),
          c(h(e + r * 22 * t, o + 20 * t, 19 * t, 15 * t, r * 0.6, 12, 0.04), {
            closed: !0,
            cut: !0,
            j: 0.4,
            w: 4,
          }),
          c(h(e + r * 32 * t, o - 20 * t, 7 * t, 7 * t, 0, 10, 0.04), {
            closed: !0,
            j: 0.3,
            w: 3,
          }),
          c(
            [
              [e + r * 2 * t, o - 26 * t],
              [e + r * 10 * t, o - 48 * t],
              [e + r * 20 * t, o - 54 * t],
            ],
            { j: 0.3, w: 3 },
          ));
      c(h(e, o, 6 * t, 30 * t, 0, 12, 0.02), {
        closed: !0,
        cut: !0,
        j: 0.3,
        w: 4,
      });
    }
    if (E) {
      (w(30, 810, 518, 9),
        B(690, 150, 46),
        T(400, 124, 190),
        d(540, 236, 0.8),
        d(586, 262, 0.65),
        Y(560, 810, 524, 3),
        m(160, 572, 274, 118),
        k(480, 384, 0.8));
      for (const [e, o, t] of [
        [46, 600, 0.9],
        [330, 572, 0.8],
        [520, 580, 0.8],
        [800, 600, 0.8],
        [40, 966, 0.9],
        [420, 970, 0.8],
        [790, 960, 0.8],
      ])
        x(e, o, t);
      (Z(616, 170, 690, 904, 64, 784),
        _(300, 694, 0.82),
        H(574, 690, 0.84),
        $(442, 812, 0.86),
        R(206, 846, 0.8, -0.12),
        K(684, 832, 0.78),
        G(70, 730, 0.8, 130),
        y(790, 690, 0.78, 120));
    } else {
      (w(40, 1410, 556, 12),
        B(1250, 168, 56),
        T(560, 176, 250),
        T(890, 268, 190),
        d(720, 106, 1),
        d(778, 136, 0.8),
        d(680, 150, 0.7),
        Y(1030, 1410, 562, 5),
        m(232, 612, 290, 168),
        k(1010, 410, 1.15));
      for (const [e, o, t] of [
        [96, 650, 1],
        [400, 612, 0.9],
        [1140, 622, 0.9],
        [1340, 640, 1],
        [60, 960, 1],
        [330, 966, 0.9],
        [1220, 968, 1],
        [1408, 930, 0.8],
        [700, 970, 0.8],
      ])
        x(e, o, t);
      (Z(630, 480, 1080, 908, 360, 1200),
        _(590, 712, 1),
        H(950, 686, 1),
        $(812, 806, 1),
        R(560, 858, 0.95, -0.12),
        K(1066, 830, 0.95),
        G(120, 780, 1.2, 150),
        G(254, 866, 0.95, 104),
        G(1296, 760, 1.15, 160),
        y(1392, 840, 1.05, 120));
    }
    return P;
  }
  function o0(U, b, v, E, P) {
    const i = Math.round(U * v),
      O = Math.round(b * v),
      I = D(i, O),
      J = D(i, O),
      q = D(i, O),
      F = X(U, b, v, E);
    Print.paper(J.getContext("2d"), U, b, "#fbf7ec", 41, 15);
    const c = I.getContext("2d"),
      h = q.getContext("2d");
    ((h.lineCap = h.lineJoin = "round"),
      P && P.portrait === E && h.drawImage(P.paint, 0, 0, i, O));
    const p = {
        colour: P ? P.colour : "#3f9a4f",
        eraser: P ? P.eraser : !1,
        size: P ? P.brush : 1,
        last: null,
        fade: 0,
        dirty: !0,
      },
      N = () => b * v * (E ? 0.042 : 0.036) * p.size * (p.eraser ? 1.5 : 1),
      z = (d, w) => [(d + 0.5) * i, (w + 0.5) * O];
    function B(d, w) {
      ((h.globalCompositeOperation = p.eraser
        ? "destination-out"
        : "source-over"),
        (h.strokeStyle = h.fillStyle = p.colour),
        (h.lineWidth = N()),
        h.beginPath(),
        d
          ? (h.moveTo(d[0], d[1]), h.lineTo(w[0], w[1]), h.stroke())
          : (h.arc(w[0], w[1], N() / 2, 0, A), h.fill()),
        (p.dirty = !0));
    }
    function T(d = 1) {
      ((c.globalCompositeOperation = "source-over"),
        (c.globalAlpha = 1),
        c.drawImage(J, 0, 0),
        (c.globalCompositeOperation = "multiply"),
        (c.globalAlpha = 0.9 * d),
        c.drawImage(q, 0, 0),
        (c.globalCompositeOperation = "source-over"),
        (c.globalAlpha = 1),
        c.drawImage(F, 0, 0));
    }
    return (
      T(),
      {
        canvas: I,
        paint: q,
        portrait: E,
        get colour() {
          return p.colour;
        },
        get eraser() {
          return p.eraser;
        },
        get brush() {
          return p.size;
        },
        setSize(d) {
          p.size = d;
        },
        get size() {
          return N() / v;
        },
        set(d) {
          ((p.colour = d), (p.eraser = !1));
        },
        erase(d) {
          p.eraser = d;
        },
        down(d, w) {
          if (p.fade) return;
          const m = z(d, w);
          (B(null, m), (p.last = m));
        },
        move(d, w) {
          if (!p.last) return;
          const m = z(d, w);
          (B(p.last, m), (p.last = m));
        },
        up() {
          p.last = null;
        },
        clear(d) {
          (p.fade || (p.fade = d), (p.last = null));
        },
        tick(d) {
          if (p.fade) {
            const w = Math.min(1, (d - p.fade) / 450);
            return (
              T(1 - w * w),
              w >= 1 && (h.clearRect(0, 0, i, O), (p.fade = 0), T()),
              !0
            );
          }
          return p.dirty ? ((p.dirty = !1), T(), !0) : !1;
        },
        save(d) {
          (T(),
            I.toBlob((w) => {
              if (!w) return;
              const m = document.createElement("a");
              ((m.href = URL.createObjectURL(w)),
                (m.download = d),
                document.body.appendChild(m),
                m.click(),
                m.remove(),
                setTimeout(() => URL.revokeObjectURL(m.href), 4e3));
            }, "image/png"));
        },
      }
    );
  }
  return { painter: o0, lineArt: X };
})();
