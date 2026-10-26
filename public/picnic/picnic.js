// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
(() => {
  const Ue = /[?&]tick/.test(location.search)
      ? (t) => setTimeout(() => t(performance.now()), 16)
      : (t) => requestAnimationFrame(t),
    qe = (t) => document.querySelector(t),
    M = (t, n = 0, e = 1) => Math.min(e, Math.max(n, t)),
    A = (t, n, e) => t + (n - t) * e,
    ue = (t, n, e) => M((t - n) / (e - n)),
    xt = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    Ve = (t) => 1 - Math.pow(1 - t, 3),
    gn = (t) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2),
    St = (t) => t * t * (3 - 2 * t),
    Fs = window.PicnicData.bio,
    Xs = window.PicnicData.identity,
    Vt = window.PicnicData.cover,
    vt = window.PicnicData.projects,
    vn = [-0.035, 0.045, -0.03, 0.04, -0.025, 0.05, -0.04, 0.035],
    Ee = window.PicnicData.notes,
    Jn = [-0.04, 0.035, -0.03, 0.045, -0.02, 0.03],
    Pe = window.PicnicData.tools,
    Zn = Pe.filter((t) => !Ee.some((n) => n.client === t)),
    Qn = [-0.12, 0.18, -0.06, 0.1, -0.2, 0.07, 0.14, -0.1],
    bn = [
      [
        "S",
        { family: "Shrikhand", shape: "cut", ink: "#2448b8" },
        1.04,
        -0.08,
        0.02,
      ],
      [
        "e",
        {
          family: "Fraunces",
          weight: 900,
          style: "italic",
          shape: "tile",
          ink: "#141414",
          bg: "#ffffff",
        },
        0.9,
        0.06,
        -0.04,
      ],
      [
        "l",
        { family: "Bebas Neue", shape: "tile", ink: "#ffffff", bg: "#141414" },
        1.02,
        -0.04,
        0.03,
      ],
      [
        "e",
        {
          family: "Cherry Bomb One",
          shape: "circle",
          ink: "#141414",
          bg: "#f6c22d",
        },
        0.84,
        0.1,
        0.06,
      ],
      [
        "c",
        { family: "Abril Fatface", shape: "cut", ink: "#141414" },
        1.06,
        -0.05,
        -0.02,
      ],
      [
        "t",
        {
          family: "Rubik Mono One",
          shape: "tile",
          ink: "#ffffff",
          bg: "#e8452c",
        },
        0.82,
        0.07,
        -0.02,
      ],
      [
        "e",
        {
          family: "DM Serif Display",
          style: "italic",
          shape: "tile",
          ink: "#141414",
          bg: "#ffffff",
        },
        0.96,
        -0.06,
        0.04,
      ],
      [
        "d",
        { family: "Bowlby One", shape: "cut", ink: "#141414" },
        1,
        0.04,
        -0.03,
      ],
      [" "],
      [
        "w",
        { family: "Bungee", shape: "tile", ink: "#ffffff", bg: "#2f8f4e" },
        0.86,
        0.09,
        0.02,
      ],
      [
        "o",
        {
          family: "Instrument Serif",
          style: "italic",
          shape: "circle",
          ink: "#141414",
          bg: "#ffffff",
        },
        1.02,
        -0.05,
        -0.04,
      ],
      [
        "r",
        { family: "Archivo Black", shape: "cut", ink: "#e8452c" },
        1,
        0.08,
        0.03,
      ],
      [
        "k",
        {
          family: "Abril Fatface",
          shape: "tile",
          ink: "#ffffff",
          bg: "#141414",
        },
        1.05,
        -0.07,
        -0.02,
      ],
    ],
    Bt = window.PicnicData.contacts,
    wn = 0.7,
    Ns = { base: [0.98, 0.83, 0.835], dye: [0.8, 0.1, 0.18] },
    d = { flip0: 0.12, flip1: 1.3, peel0: 1.85, peel1: 2.25, trav1: 3.35 };
  ((d.proj1 = d.trav1 + vt.length),
    (d.tf0 = d.proj1 + 0.35),
    (d.tf1 = d.tf0 + 1.1),
    (d.end = d.tf1));
  const Gs = [
      ["Fine brush", 0.45],
      ["Medium brush", 1],
      ["Broad brush", 2.1],
    ],
    Ks = [
      ["Red", "#d8322a"],
      ["Pink", "#f08aa8"],
      ["Yellow", "#ffbe12"],
      ["Green", "#3f9a4f"],
      ["Blue", "#4f86d9"],
      ["Brown", "#9b6234"],
    ],
    Dt = qe("#scene"),
    _s = qe("#track");
  {
    const t = document.createElement("ul"),
      n = document.createElement("h2");
    ((n.textContent = "Get in touch"),
      Bt.forEach((e) => {
        const s = e.id === "email" ? e.value && `mailto:${e.value}` : e.url;
        if (!s) return;
        const a = document.createElement("li"),
          c = document.createElement("a");
        ((c.href = s),
          (c.textContent = e.id === "email" ? e.value : e.name),
          a.appendChild(c),
          t.appendChild(a));
      }),
      t.children.length && qe(".copy").append(n, t));
  }
  let P = null;
  try {
    P = Scene.create(Dt);
  } catch (t) {
    console.error(t);
  }
  if (!P) {
    document.body.classList.add("nogl");
    return;
  }
  const Mn = new Date(),
    kn = [
      `${Mn.toLocaleString("en", { month: "short" }).toUpperCase()} ${Mn.getDate()}`,
      String(Mn.getFullYear()),
    ];
  let p = 0,
    u = 0,
    Ae = 1,
    E = !1,
    Q,
    ht,
    Yt,
    ee,
    zt,
    bt,
    pe,
    It,
    Lt = null,
    ts = "",
    Wt = null,
    es = !1,
    Je = 0;
  const Ht = [];
  let ns = null;
  const Ze = { front: null, back: null };
  let Qe = null,
    Te = !1,
    ss = !1;
  const Sn = {},
    tn = [];
  let en = -1,
    R = null,
    fe = [],
    os = "",
    Ft = null,
    as = !1;
  const J = { open: !1, at: 0, anchor: null, savedAt: 0 };
  try {
    localStorage.getItem("picnic-logo") === "1" && (J.savedAt = 1);
  } catch {}
  let ze = null,
    is = "",
    ne = [],
    rs = "",
    me = null,
    Ie = null,
    ye = null,
    N = null,
    X = null,
    Et = null,
    cs = "",
    Pn = null,
    An = null;
  const nn = {},
    rt = { clients: {}, title: null, stamps: {}, posters: {} };
  function ls() {
    ((p = innerWidth),
      (u = innerHeight),
      (Ae = Math.min(window.devicePixelRatio || 1, 2)),
      (E = p < u * 0.85),
      E
        ? ((Q = Math.min(p * 0.86, 460)),
          (ht = Q * 1.42),
          ht > u * 0.74 && ((ht = u * 0.74), (Q = ht / 1.42)))
        : ((Q = M(Math.min(p * 0.5, u * 0.62 * 1.5), 300, 720)),
          (ht = Q / 1.5)),
      (Yt = E
        ? Math.min(p * 0.84, 400)
        : M(Math.min(p * 0.32, (u * 0.5 * Print.SW) / Print.SH), 300, 520)),
      (ee = (Yt * Print.SH) / Print.SW),
      (zt = Yt * (0.5 + wn / 2) + (E ? p * 0.35 : M(p * 0.06, 56, 120))),
      (bt = p * 0.5 + Q * 0.3 + Yt * 0.3),
      (pe = E ? u * 0.05 : u * 0.08),
      (It = bt + zt * vt.length),
      (R = qs()),
      (d.down = d.tf0 + Math.max(d.tf1 - d.tf0, R.bottom / u - 0.5)),
      (d.sheet = d.tf0 + Math.max(0, (R.sheet.y - R.sheet.H / 2) / u - 0.3)),
      (d.end = d.down),
      (d.s0 = d.down + 0.45),
      (d.s1 = d.s0 + 1),
      (d.u0 = d.s1 + 0.35),
      (d.u1 = d.u0 + 1.6));
    const t = (d.down - d.tf0) * u;
    ((N = Vs(t)), (_s.style.height = (d.u1 + 1) * u + "px"));
    const n = [],
      e = [],
      s = Math.max(p, u),
      a = (i, m, T, x, w, L, j) => n.push([i, m, T, x, w, L, j, 0]);
    E
      ? (a(p / 2 + 60, -u / 2 - 60, 2.2, u * 0.42, 10, 1.3, 0.05),
        a(-p / 2 - 50, u / 2 + 40, -0.9, u * 0.34, 14, 4.1, 0.06),
        e.push([p / 2 + 50, -u / 2 - 20, 170, 0]))
      : (a(
          p / 2 + 70,
          -u / 2 - 90,
          2.3,
          Math.max(620, s * 0.52),
          10,
          1.3,
          0.05,
        ),
        a(p / 2 + 90, u * 0.1, 3.1, Math.max(420, s * 0.34), 17, 2.7, -0.07),
        a(
          -p / 2 - 70,
          u / 2 + 70,
          -0.8,
          Math.max(460, s * 0.36),
          14,
          4.1,
          0.06,
        ),
        e.push([p / 2 + 30, -u / 2 - 10, Math.max(300, s * 0.26), 0]));
    for (let i = 0; i <= vt.length; i++) {
      const m = bt + (i + 0.5) * zt;
      i % 2 === 0
        ? a(
            m + 120,
            -u / 2 - 80,
            2 + 0.2 * Math.sin(i),
            Math.max(480, u * 0.6),
            10 + (i % 3) * 4,
            5 + i * 1.7,
            0.05,
          )
        : a(
            m - 100,
            u / 2 + 80,
            -1.15 + 0.2 * Math.cos(i),
            Math.max(440, u * 0.52),
            12 + (i % 2) * 5,
            6 + i * 2.1,
            -0.05,
          );
    }
    e.push([bt + 2.5 * zt, u / 2 + 30, 300, 0], [It + p * 0.3, -u / 2, 340, 0]);
    const c = R.cards[0],
      l = R.cards[R.cards.length - 1];
    (a(
      It + p / 2 + 60,
      c.y + c.h * 0.6,
      2.7,
      Math.max(460, s * 0.4),
      12,
      8.3,
      0.05,
    ),
      a(
        It - p / 2 - 60,
        (c.y + l.y) / 2 + c.h * 0.5,
        -0.45,
        Math.max(440, s * 0.36),
        15,
        9.7,
        -0.06,
      ),
      a(
        It + p / 2 + 40,
        l.y + l.h * 0.4,
        3.4,
        Math.max(400, s * 0.34),
        11,
        11.2,
        0.04,
      ),
      e.push([It - p * 0.42, (c.y + l.y) / 2, E ? 220 : 320, 0]),
      a(
        R.sheet.x - R.sheet.W / 2 - 90,
        R.sheet.y - R.sheet.H * 0.1,
        -0.25,
        Math.max(420, s * 0.36),
        13,
        12.6,
        0.05,
      ),
      P.resize(p, u, Ae, It + p, Math.max(R.bottom, N.y + N.h / 2) + u * 0.3),
      P.branches(n, e),
      es && hs());
  }
  const sn = { wide: [1086, 110], tall: [700, 206] };
  function Us() {
    const [t, n] = E ? sn.tall : sn.wide,
      e = 11;
    return [t + e * 2, n + e * 2];
  }
  function qs() {
    const t = It,
      n = E ? 470 : 330,
      e = E ? Math.min(p - 36, 440) : M(p * 0.34, 380, 540),
      s = (e * n) / Print.SW,
      [a, c] = Us(),
      l = E ? p - 20 : Math.min(p * 0.62, 860),
      i = (l * c) / a,
      m = (d.tf1 - d.tf0) * u,
      T = E ? p * 0.02 : Math.min(p * 0.17, 270),
      x = E ? 150 : 0,
      w = Ee.map((et, C) => ({
        x: t + (C % 2 ? 1 : -1) * T,
        y: E ? m + C * (s + x) : m + C * s * 0.8,
        w: e,
        h: s,
        r: Jn[C % Jn.length],
        tH: n,
      })),
      L = { x: t, y: m - s / 2 - 34 - i / 2, w: l, h: i },
      j = [];
    w.forEach((et, C) => {
      if (E) {
        const lt = et.y + s / 2 + x / 2;
        j.push([t - p * 0.22, lt - 8], [t + p * 0.22, lt + 10]);
      } else {
        const lt = C % 2 ? -1 : 1,
          Ut = t + lt * T;
        j.push(
          [Ut - e * 0.22, et.y - s * 0.08],
          [Ut + e * 0.24, et.y + s * 0.12],
        );
      }
    });
    const _ = E ? 54 : 78,
      tt = E ? p * 0.36 : e * 0.42,
      D = Zn.map((et, C) => ({
        id: et,
        x: j[C][0],
        y: j[C][1],
        r: Qn[C % Qn.length],
        h: _,
        maxW: tt,
      })),
      O = w[w.length - 1],
      G = Zs(
        t,
        Math.max(O.y + s / 2, ...D.map((et) => et.y + _)) + (E ? 70 : 120),
        _,
        tt,
      ),
      U = G.H < u - 40 ? u / 2 : G.H / 2 + (E ? 76 : 24);
    return {
      cards: w,
      title: L,
      stickers: D,
      sh: _,
      maxW: tt,
      sheet: G,
      bottom: G.y + U,
      cardSticker: E ? 44 : 58,
    };
  }
  function Vs(t) {
    const n = E,
      e = n ? 152 : 52,
      s = n ? 14 : 18;
    let a, c;
    if (n) {
      ((a = p - 24), (c = a / 0.84));
      const l = u - e - s - 80;
      c > l && ((c = l), (a = c * 0.84));
    } else
      ((c = Math.min(u - e - s - 110, 700)),
        (a = c * 1.45),
        a > p * 0.86 && ((a = p * 0.86), (c = a / 1.45)));
    return {
      x: 0,
      y: t - (e + s) / 2,
      w: a,
      h: c,
      r: n ? 0.006 : -0.01,
      gap: s,
      camY: t,
    };
  }
  function Js(t, n, e) {
    const s = rt.clients[t],
      a = s ? s.width / s.height : 1.9;
    return n * a > e ? [e, e / a] : [n * a, n];
  }
  function Zs(t, n, e, s) {
    const a = E,
      c = a ? p - 24 : M(p * 0.68, 780, 1040),
      l = a ? 20 : 40,
      i = a ? 50 : 78,
      m = a ? 96 : 122,
      T = m + (a ? 26 : 34),
      x = c * 0.6,
      w = l,
      L = a ? c - l : x - 28,
      j = a ? 14 : 24,
      _ = a ? 18 : 26,
      tt = Pe.map((dt) => ({ id: dt, size: Js(dt, e, s) }));
    tt.push({ id: "you", size: [Math.min(e * 2.3, s), e] });
    const D = [];
    let O = [],
      G = 0;
    for (const dt of tt)
      (O.length &&
        G + j + dt.size[0] > L - w &&
        (D.push([O, G]), (O = []), (G = 0)),
        (G += (O.length ? j : 0) + dt.size[0]),
        O.push(dt));
    D.push([O, G]);
    const U = {};
    let et = T;
    D.forEach(([dt, q]) => {
      let Ne = w + (L - w - q) / 2;
      (dt.forEach((At) => {
        ((U[At.id] = {
          x: Ne + At.size[0] / 2,
          y: et + e / 2,
          w: At.size[0],
          h: At.size[1],
        }),
          (Ne += At.size[0] + j));
      }),
        (et += e + _));
    });
    const C = et - _,
      lt = a ? 92 : 136,
      Ut = Print.CONTACT_DIMS,
      Me = lt * Ut.email[1] + 18,
      K = a ? 40 : 46,
      gt = lt * 0.88 + (a ? 20 : 26),
      Z = a ? 30 : 40,
      W = Z + (a ? 18 : 24),
      De = Bt.length - 1,
      ce = W + Me + K + Math.ceil(De / 2) * gt;
    let Rt, Qt, Ye, Ot;
    if (a) {
      const dt = et + 4;
      ((Ot = [l, dt, c - l, dt]), (Rt = dt + 28), (Qt = l), (Ye = c - l));
    } else
      ((Rt = T - 6 + Math.max(0, (C - T - ce) / 2)),
        (Qt = x + 28),
        (Ye = c - l),
        (Ot = [x, m + 24, x, null]));
    const We = (Ye - Qt) / 2,
      Fe = (Qt + Ye) / 2,
      Xe = Rt + W,
      te = Bt.map((dt, q) =>
        q === 0
          ? { x: Fe, y: Xe + Me / 2 }
          : {
              x: Qt + We * (((q - 1) % 2) + 0.5),
              y:
                Xe +
                Me +
                K +
                Math.floor((q - 1) / 2) * gt +
                gt / 2 -
                (a ? 10 : 13),
            },
      ),
      le = Math.max(C, Rt + ce - (a ? 10 : 13)) + l;
    return (
      a || (Ot[3] = le - l),
      {
        x: t,
        y: n + le / 2,
        W: c,
        H: le,
        r: a ? -0.008 : -0.012,
        pad: l,
        band: m,
        titleSize: i,
        titleRoom: c - l * 2,
        slots: U,
        S: lt,
        contact: te,
        perf: Ot,
        hi: { text: "Say hi to me", x: Fe, y: Rt + Z * 0.82, size: Z },
        stamp: { x: Fe + lt * 0.08, y: Xe + Me + K * 0.45 },
      }
    );
  }
  function Qs() {
    const [t, n] = E ? sn.tall : sn.wide,
      e = 2,
      s = rt.title,
      a = document.createElement("canvas");
    ((a.width = t * e), (a.height = n * e));
    const c = a.getContext("2d");
    return (
      E
        ? (c.drawImage(s, 0, 0, 646, 110, 0, 0, 646 * e, 110 * e),
          c.drawImage(
            s,
            646,
            0,
            440,
            110,
            (t - 440) * e,
            96 * e,
            440 * e,
            110 * e,
          ))
        : c.drawImage(s, 0, 0, 1086, 110, 0, 0, t * e, n * e),
      Print.dieCut(a, t, n, 7, e)
    );
  }
  function to(t, n, e) {
    ((g.art = Print.frontLive(t, n, e)), (g.t = -1));
    const s = E ? "tall" : "wide";
    g.loop &&
      g.cut !== s &&
      ((g.cut = s),
      (g.live = !1),
      g.v !== g.loop && (g.v.remove(), (g.v = g.loop)),
      (g.v.src = `${xe[s].loop}.mp4`),
      g.v.play().catch(() => {}),
      ge(`${xe[s].loop}-poster.jpg`)
        .then((c) => {
          rt.posters[s] = c;
        })
        .catch(() => {}));
    const a = rt.posters[s];
    return !(g.live && g.v.readyState >= 2 && g.art.draw(g.v)) &&
      !(a && g.art.draw(a))
      ? Print.front(t, n, e, null)
      : g.art.canvas;
  }
  function hs() {
    const t = P.gl,
      n = Math.round(M(Q * Ae * 1.35, 1024, 2048)),
      e = `${E}|${n}|${Math.round((ht / Q) * 100)}`;
    if (e !== ts) {
      if (((ts = e), Lt))
        for (const x of ["front", "back", "backPeeled", "cover"])
          t.deleteTexture(Lt[x]);
      const i = Print.openMark(E, kn),
        m = Print.coverStamp(E, i, rt.stamps[Vt.id]),
        T = {
          cw: Q,
          ch: ht,
          TW: n,
          portrait: E,
          cover: m,
          mark: i,
          intro: Fs,
          lines: Xs,
        };
      ((Lt = {
        front: P.texture(to(Q, ht, n)),
        back: P.texture(Print.back({ ...T, peeled: !1 })),
        backPeeled: P.texture(Print.back({ ...T, peeled: !0 })),
        cover: P.texture(m.inked),
      }),
        (Ze.front = m.inked));
    }
    Ht.length ||
      ((Ze.back = Print.stampBack(Vt, rt.stamps[Vt.id], 0)),
      (ns = P.texture(Ze.back)),
      vt.forEach((i, m) => {
        const T = Print.stamp(rt.stamps[i.id], {
          ...i.pm,
          top: "SELECTED WORK",
          bottom: "DHEERAJ C.",
          l1: kn[0],
          l2: kn[1],
          color: i.ink,
          seed: 20 + m,
        });
        ((Sn[i.id] = {
          front: T.inked,
          back: Print.stampBack(i, rt.stamps[i.id], m + 1),
        }),
          Ht.push({
            plain: P.texture(T.plain),
            inked: P.texture(T.inked),
            back: P.texture(Sn[i.id].back),
            stickers: (i.stickers || []).map(([x, w, L, j, _, tt, D, O, G]) => {
              const U = Print.sticker(x, w, L, j, _, tt);
              return {
                tex: P.texture(U.canvas),
                w: U.w,
                h: U.h,
                cx: D + _ / 2 - Print.SW / 2,
                cy: O + tt / 2 - Print.SH / 2,
                r: G,
              };
            }),
          }));
      }));
    let s = E ? p * 0.11 : M(p * 0.05, 48, 84);
    const a = (E ? p - 32 : p * 0.8) / (eo(s) || 1);
    if ((a < 1 && (s *= a), !Wt || Wt.size !== s)) {
      Wt && Wt.letters.forEach((w) => t.deleteTexture(w.tex));
      const i = [];
      let m = 0,
        T = 0;
      bn.forEach(([w, L, j, _, tt], D) => {
        if (w === " ") {
          m += s * 0.32;
          return;
        }
        const O = Print.letter(w, L, s * j);
        (i.push({
          tex: P.texture(O.canvas),
          w: O.w,
          h: O.h,
          ox: m + O.w / 2,
          oy: _ * s,
          r: tt,
          k: 60 + ((D * 37) % 30),
          z: 0.5 + (D % 3) * 0.08,
        }),
          (m += O.w * 0.86),
          (T = Math.max(T, O.h)));
      });
      const x = m + i[i.length - 1].w * 0.14;
      (i.forEach((w) => {
        ((w.ox -= x / 2), (w.x = null), (w.v = 0));
      }),
        (Wt = { size: s, letters: i, width: x, height: T }));
    }
    const c = `${E}`;
    if (
      (c !== os &&
        ((os = c),
        fe.forEach((i) => t.deleteTexture(i)),
        (fe = Ee.map((i, m) =>
          P.texture(Print.testimonial(i, m, R.cards[0].tH)),
        )),
        Ft && (t.deleteTexture(Ft.tex), (Ft = null))),
      as)
    ) {
      for (const x of Pe) {
        const w = rt.clients[x];
        w && !nn[x] && (nn[x] = { tex: P.texture(w), w: w.width, h: w.height });
      }
      if (rt.title && !Ft) {
        const x = Qs();
        Ft = { tex: P.texture(x.canvas), w: x.w, h: x.h };
      }
      const i = R.sheet,
        m = `${i.S}`;
      m !== rs &&
        ((rs = m),
        ne.forEach((x) => t.deleteTexture(x.tex)),
        (ne = Bt.map((x) => {
          const w = Print.contactSticker(x.id, i.S);
          return { ...w, tex: P.texture(w.canvas) };
        })));
      const T = `${E}|${Math.round(i.W)}|${Math.round(i.H)}|${i.slots.byd ? Math.round(i.slots.byd.w) : 0}`;
      if (T !== is) {
        ((is = T), ze && t.deleteTexture(ze));
        const x = Pe.filter((L) => rt.clients[L]).map((L) => ({
          img: rt.clients[L],
          ...i.slots[L],
        }));
        Ie && t.deleteTexture(Ie.tex);
        const w = Print.blankSticker(i.slots.you.w, i.slots.you.h);
        ((Ie = { ...w, tex: P.texture(w.canvas) }),
          x.push({ img: w.canvas, ...i.slots.you }),
          i.contact.forEach((L, j) =>
            x.push({
              img: ne[j].canvas,
              x: L.x,
              y: L.y,
              w: ne[j].w,
              h: ne[j].h,
            }),
          ),
          (ze = P.texture(
            Print.stickerSheet({
              W: i.W,
              H: i.H,
              K: Math.min(3, Math.max(2, Ae * 1.25)),
              pad: i.pad,
              band: i.band,
              titleSize: i.titleSize,
              title: "Be the next sticker.",
              titleRoom: i.titleRoom,
              hi: i.hi,
              perf: i.perf,
              holes: x,
            }),
          )));
      }
      if (!me) {
        const x = Print.inkStamp("COPIED", "#d8322a");
        me = { ...x, tex: P.texture(x.canvas) };
      }
      if (!ye) {
        const x = Print.inkStamp("SAVED", "#d8322a");
        ye = { ...x, tex: P.texture(x.canvas) };
      }
    }
    const l = `${E}|${Math.round(N.w)}|${Math.round(N.h)}`;
    if (
      (l !== cs &&
        ((cs = l),
        (X = Colour.painter(
          N.w,
          N.h,
          Math.min(2, Math.max(1.25, Ae * 1.1), 2400 / N.w),
          E,
          X,
        )),
        Et && t.deleteTexture(Et),
        (Et = P.texture(X.canvas)),
        Is(X.colour, X.eraser)),
      !Pn)
    ) {
      const i = document.createElement("canvas");
      i.width = i.height = 4;
      const m = i.getContext("2d");
      ((m.fillStyle = "#fff"), m.fillRect(0, 0, 4, 4), (Pn = P.texture(i)));
    }
    (ft ||
      (ft = Props.create(P, {
        radio: () => {
          const i = !Garden.on;
          (_n(i), Os(i));
        },
        sound: (i, m) => Garden.play(i, m),
      })),
      ft.layout({
        vw: p,
        vh: u,
        cw: Q,
        ch: ht,
        Xc: bt,
        spacing: zt,
        yRow: pe,
        SHd: ee,
        maxCam: It,
        portrait: E,
      }),
      Je || (Je = performance.now()));
  }
  function eo(t) {
    let n = 0,
      e = 0;
    for (const [s, a, c] of bn) {
      if (s === " ") {
        n += t * 0.32;
        continue;
      }
      const l = Print.letter(s, a, t * c);
      ((n += l.w * 0.86), (e = l.w));
    }
    return n + e * 0.14;
  }
  const xe = {
      wide: { intro: "hero-intro", loop: "hero" },
      tall: { intro: "hero-tall-intro", loop: "hero-tall" },
    },
    g = {
      v: null,
      loop: null,
      art: null,
      t: -1,
      live: !1,
      cut: innerWidth < innerHeight * 0.85 ? "tall" : "wide",
      still: matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  function ds(t, n) {
    const e = document.createElement("video");
    ((e.muted = !0),
      (e.loop = n),
      (e.playsInline = !0),
      (e.preload = "auto"),
      (e.disablePictureInPicture = !0));
    for (const s of ["muted", "playsinline", ...(n ? ["loop"] : [])])
      e.setAttribute(s, "");
    return (
      e.setAttribute("aria-hidden", "true"),
      (e.tabIndex = -1),
      (e.style.cssText =
        "position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none;z-index:-1"),
      (e.src = `${t}.mp4`),
      e.addEventListener("playing", () => {
        g.v === e && (g.live = !0);
      }),
      document.body.appendChild(e),
      e
    );
  }
  if (!g.still) {
    const t = ds(xe[g.cut].intro, !1),
      n = ds(xe[g.cut].loop, !0);
    (t.addEventListener("ended", () => {
      g.v === t && ((g.v = n), n.play().catch(() => {}), t.remove());
    }),
      (g.v = t),
      (g.loop = n),
      addEventListener(
        "pointerdown",
        () => {
          g.started && !g.live && g.v.play().catch(() => {});
        },
        { once: !0 },
      ));
  }
  const ge = (t) =>
      new Promise((n, e) => {
        const s = new Image();
        ((s.onload = () => n(s)), (s.onerror = e), (s.src = t));
      }),
    no = Promise.all([
      ...[Vt, ...vt]
        .map((t) => t.id)
        .map((t) =>
          ge(`stamps/${t}.svg`)
            .then((n) => {
              rt.stamps[t] = n;
            })
            .catch(() => {}),
        ),
      ...(g.still
        ? ["wide", "tall"].map((t) => [t, `${xe[t].loop}-poster.jpg`])
        : [[g.cut, `${xe[g.cut].intro}-poster.jpg`]]
      ).map(([t, n]) =>
        ge(n)
          .then((e) => {
            rt.posters[t] = e;
          })
          .catch(() => {}),
      ),
    ]);
  (Promise.all([
    document.fonts.load("400 40px 'Geist'"),
    document.fonts.load("500 40px 'Geist'"),
    document.fonts.load("600 40px 'Geist'"),
    document.fonts.load("700 40px 'Geist'"),
    document.fonts.load("800 40px 'Geist'"),
    document.fonts.load("500 40px 'Geist Mono'"),
    document.fonts.load("400 40px 'Yellowtail'"),
    document.fonts.load("700 40px 'Source Serif 4'", "NORISKTY"),
    document.fonts.load("400 40px 'Kalam'"),
    document.fonts.load("400 40px 'Cherry Bomb One'", "e"),
    document.fonts.load("italic 400 40px 'DM Serif Display'", "“"),
    ...bn
      .filter((t) => t[1])
      .map(([t, n]) =>
        document.fonts.load(
          `${n.style || ""} ${n.weight || 400} 40px '${n.family}'`,
          t,
        ),
      ),
  ])
    .catch(() => {})
    .then(() => no)
    .then(() => {
      ((es = !0), p && hs());
    }),
    Promise.all([
      ...Pe.map((t) =>
        ge(`clients/${t}.svg`)
          .then((n) => {
            rt.clients[t] = Print.cleanSticker(n);
          })
          .catch(() => {}),
      ),
      ge("clients/title.svg")
        .then((t) => {
          rt.title = t;
        })
        .catch(() => {}),
    ]).then(() => {
      ((as = !0), p && ls());
    }));
  let Tn = 0,
    us = 0,
    ps = 0;
  function zn() {
    !innerWidth ||
      !innerHeight ||
      (innerWidth === Tn && Math.abs(innerHeight - us) < 120) ||
      (innerWidth === Tn && J.open) ||
      ((Tn = innerWidth), (us = innerHeight), ls());
  }
  (addEventListener("resize", () => {
    (clearTimeout(ps), (ps = setTimeout(zn, 120)));
  }),
    zn());
  const fs = matchMedia("(hover: hover) and (pointer: fine)"),
    ms = () =>
      fs.matches
        ? "desktop"
        : Math.min(innerWidth, innerHeight) >= 600
          ? "tablet"
          : "mobile",
    In = () => {
      document.documentElement.dataset.device = ms();
    };
  (In(), addEventListener("resize", In), fs.addEventListener?.("change", In));
  const b = { x: -1, y: -1, speed: 0, lx: 0, ly: 0, lt: 0, vx: 0, vy: 0 },
    Xt = [];
  let se = 0,
    oe = 0;
  (addEventListener("pointermove", (t) => {
    const n = performance.now(),
      e = Math.max(8, n - b.lt);
    if (b.lt && n - b.lt < 200) {
      const l = ((t.clientX - b.lx) / e) * 1e3,
        i = ((t.clientY - b.ly) / e) * 1e3;
      ((b.vx += (l - b.vx) * 0.5),
        (b.vy += (i - b.vy) * 0.5),
        (b.speed = Math.max(b.speed, Math.hypot(l, i))));
    } else b.vx = b.vy = 0;
    ((b.lx = b.x = t.clientX),
      (b.ly = b.y = t.clientY),
      (b.lt = n),
      (b.touch = t.pointerType === "touch"));
    const s = t.clientX - p / 2 + se,
      a = t.clientY - u / 2 + oe,
      c = Xt[Xt.length - 1];
    (!c || Math.hypot(s - c.x, a - c.y) > 14 || n - c.t > 60) &&
      (Xt.push({ x: s, y: a, vx: b.vx, vy: b.vy, t: n }),
      Xt.length > 12 && Xt.shift());
  }),
    document.addEventListener("pointerleave", () => {
      b.x = -1;
    }));
  const Ln = new Float32Array(48),
    Hn = new Float32Array(12),
    ys = Nature.create(P),
    xs = Butterflies.create(P),
    ae = { on: !1, at: -1e9, x: null, v: 0 };
  let Pt = scrollY / Math.max(1, innerHeight),
    gs = performance.now(),
    Cn = 1;
  const Le = { z: 0, rx: 0, ry: 0 };
  let ft = null,
    on = null,
    $n = 0,
    Rn = 0,
    vs = 0;
  const He = vt.map(() => ({ z: 0, rx: 0, ry: 0, p: 0 })),
    wt = { z: 0, rx: 0, ry: 0, p: 0 },
    Ce = vt.map(() => 0),
    bs = Ee.map(() => ({ z: 0, rx: 0, ry: 0 })),
    Nt = { k: 0, stage: 0, lock: -1, input: 0, to: -1 },
    On = () => {
      ((Nt.input = performance.now()), (Nt.to = -1));
    },
    ws = document.getElementById("more"),
    so = document.getElementById("minimal");
  let Ms = !0,
    an = performance.now(),
    jn = !1,
    ks = !1;
  const oo = () => {
    an = performance.now();
  };
  for (const t of ["wheel", "touchmove", "keydown", "pointerdown", "scroll"])
    addEventListener(t, oo, { passive: !0 });
  (addEventListener("wheel", On, { passive: !0 }),
    addEventListener("touchmove", On, { passive: !0 }),
    addEventListener("keydown", On));
  const B = { k: -1, p: 0, open: !1, at: 0 };
  let Bn = !1;
  const Gt = { on: !1, at: 0 },
    Ss = {},
    Dn = [...Bt, 0].map(() => ({ a: 0, at: -1e9 })),
    Yn = [],
    $e = { z: 0, rx: 0, ry: 0 };
  let Re = 0,
    Wn = -1,
    Ct = !1,
    Kt = null,
    rn = 1,
    Fn = 0,
    cn = !1,
    Es = !1;
  const ln = {},
    Xn = (t, n) => ln[t] || (ln[t] = n);
  function Oe(t, n, e, s, a) {
    const c = 1 - Math.exp(-a * 8);
    ((t.z += ((n ? 14 : 0) - t.z) * c),
      (t.rx += ((n ? -s * 0.3 : 0) - t.rx) * c),
      (t.ry += ((n ? e * 0.34 : 0) - t.ry) * c),
      (t.bow = (t.bow || 0) + ((n ? 1 : 0) - (t.bow || 0)) * c));
    const l = n && ms() === "desktop" && !b.touch;
    t.p = t.settle
      ? M((t.p || 0) - a / 0.16)
      : M((t.p || 0) + ((l ? 1 : -1) * a) / 0.7);
  }
  function Ps(t, n, e) {
    const s = Math.PI,
      a = 0.5 - 0.5 * Math.cos(s * n.p),
      [c, l] = t.size;
    ((t.mode = 1),
      (t.texB = e),
      (t.mixB = 0),
      (t.glossBack = 0.1),
      (t.bend = [0, 0]));
    const i = Math.atan2(l, c) * (1 - St(M(a / 0.65))),
      m = Math.cos(i),
      T = Math.sin(i),
      x = (m * c + T * l) / 2,
      w = c * (0.06 + 0.06 * Math.sin(s * a)),
      L = A(x, -x - s * w, a);
    let j = 1 / 0,
      _ = -1 / 0;
    for (let tt = 0; tt <= 24; tt++) {
      const D = -x + (2 * x * tt) / 24,
        O = D - L,
        G =
          O > 0
            ? L + w * Math.sin(Math.min(O / w, s)) - Math.max(O - s * w, 0)
            : D;
      ((j = Math.min(j, G)), (_ = Math.max(_, G)));
    }
    return ((t.curl = [m, T, L, w, -(j + _) / 2]), 12 * Math.sin(s * a));
  }
  function ie(t, n) {
    let e = 1 / 0;
    const [s, a] = t.size;
    t.pos[2] = 0;
    for (const c of [-0.5, -0.25, 0, 0.25, 0.5])
      for (const l of [-0.5, 0.5]) e = Math.min(e, P.point(t, c * s, l * a)[2]);
    return ((t.pos[2] = Math.max(n, -e + 1)), t);
  }
  function hn(t, n, e) {
    const s = P.point(t, n, e),
      a = P.point(t, n + 2, e),
      c = P.point(t, n, e + 2),
      l = [a[0] - s[0], a[1] - s[1], a[2] - s[2]],
      i = [c[0] - s[0], c[1] - s[1], c[2] - s[2]],
      m = [
        l[1] * i[2] - l[2] * i[1],
        l[2] * i[0] - l[0] * i[2],
        l[0] * i[1] - l[1] * i[0],
      ],
      T = Math.hypot(...m);
    return { p: s, n: m.map((x) => x / T) };
  }
  function je(t, n) {
    const e = Math.cos(-n),
      s = Math.sin(-n);
    return [
      Math.asin(M(-(t[0] * s + t[1] * e), -1, 1)),
      Math.atan2(t[0] * e - t[1] * s, t[2]),
    ];
  }
  function $t(t, n, e, s, a, c, l = b.x, i = b.y) {
    if (l < 0 || Es) return null;
    const m = Scene.D / (Scene.D - e),
      T = (t - se) * m + p / 2,
      x = (n - oe) * m + u / 2,
      w = (l - T) / m,
      L = (i - x) / m,
      j = Math.cos(-c),
      _ = Math.sin(-c),
      tt = (w * j - L * _) / s,
      D = (w * _ + L * j) / a;
    return Math.abs(tt) <= 0.5 && Math.abs(D) <= 0.5 ? [tt, D] : null;
  }
  function dn(t) {
    const n = Math.min((t - gs) / 1e3, 0.05);
    if (((gs = t), !u)) {
      (zn(), Ue(dn));
      return;
    }
    if (!Lt || !Wt) {
      Ue(dn);
      return;
    }
    document.body.classList.add("on");
    let e = scrollY / u;
    if (
      ((Pt += (e - Pt) * (1 - Math.exp(-n * 7))),
      Math.abs(e - Pt) < 1e-4 && (Pt = e),
      e >= d.u1 - 0.002 && Pt >= d.u1 - 0.004)
    ) {
      ((Pt = e = 0),
        scrollTo(0, 0),
        Object.assign(Nt, { k: 0, stage: 0, lock: -1, to: -1 }),
        Ce.fill(0));
      for (const r in ln) delete ln[r];
    }
    {
      const r = d.s0,
        h = d.s0 + 0.5,
        k = d.s1,
        o = Nt,
        z = 0.01;
      (o.to >= 0 && Math.abs(e - o.to) < 0.01 && (o.to = -1),
        o.to >= 0
          ? (o.stage = e >= k ? 2 : e > r ? 1 : 0)
          : e < d.down || e > d.u0
            ? ((o.stage = e > d.u0 ? 2 : 0),
              (o.k = [0, 0.7, 1][o.stage]),
              (o.lock = -1))
            : e <= r && o.lock < 0
              ? (o.stage = 0)
              : e >= k && o.lock < 0
                ? (o.stage = 2)
                : o.stage === 0 && e > r + z
                  ? ((o.stage = 1), (o.lock = h))
                  : o.stage === 1 && e > h + z
                    ? ((o.stage = 2), (o.lock = k))
                    : o.stage === 1 && e < h - z
                      ? ((o.stage = 0), (o.lock = r))
                      : o.stage === 2 && e < k - z
                        ? ((o.stage = 1), (o.lock = h))
                        : o.lock < 0 &&
                          e > r &&
                          e < k &&
                          (o.lock = [r, h, k][o.stage]));
      const I = [0, 0.7, 1][o.stage],
        $ = (o.k < 0.7 || (o.k === 0.7 && I < 0.7) ? 0.7 / 2.1 : 0.3 / 1.3) * n;
      ((o.k = o.k < I ? Math.min(I, o.k + $) : Math.max(I, o.k - $)),
        o.lock >= 0 &&
          (Math.abs(scrollY - o.lock * u) > 1 && scrollTo(0, o.lock * u),
          o.k === I && t - o.input > 260 && (o.lock = -1)));
    }
    const s = Pt,
      a = s >= d.u0 ? 0 : Math.min(s, d.down),
      c = Nt.k,
      l = ue(s, d.u0, d.u1),
      i = M(c / 0.7),
      m = s > d.u0,
      T = (r, h) => h * Math.pow(Math.sin(Math.PI * r), 1.4),
      x = 1 + 0.45 * xt(i) * (1 - St(M((c - 0.68) / 0.32))) - T(l, 0.42),
      w = 0;
    Es = x < 0.97;
    const L = (t - Je) / 1e3,
      j = xt(M(L / 2.8)),
      _ = A(0.34, 1, j) * x,
      tt = -0.16 * (1 - j) + w,
      D = 1 / _,
      O = M(L / 2.6),
      G = 1 - Ve(O),
      U = xt(ue(a, d.flip0, d.flip1));
    if (g.v) {
      !g.started && L > 2.2 && ((g.started = !0), g.v.play().catch(() => {}));
      const r = U < 0.98 || m;
      (r && g.v.paused && !g.v.ended && g.live
        ? g.v.play().catch(() => {})
        : !r && !g.v.paused && g.v.pause(),
        r &&
          g.live &&
          g.v.readyState >= 2 &&
          g.v.currentTime !== g.t &&
          ((g.t = g.v.currentTime),
          g.art.draw(g.v) && P.upload(Lt.front, g.art.canvas)));
    }
    const et = xt(ue(a, d.peel0, d.peel1)),
      C = xt(ue(a, d.peel1, d.trav1)),
      lt = vt.length,
      Ut = ue(a, d.trav1, d.proj1) * lt,
      Me =
        Ut >= lt
          ? lt
          : Math.floor(Ut) + St(M((Ut - Math.floor(Ut) - 0.3) / 0.5));
    let K = bt * C + zt * Me;
    const gt = xt(ue(a, d.tf0, d.tf1));
    let Z = Math.min(Math.max(0, a - d.tf0), d.down - d.tf0) * u;
    ((s > d.s0 || (c > 0 && s > d.down)) &&
      ((K = A(It, N.x, xt(i))), (Z = A(N.camY, 0, xt(l)))),
      (se = K),
      (oe = Z),
      (Bn = gt >= 1),
      J.open &&
        document.activeElement !== ve &&
        Math.abs(e - J.at) > 0.08 &&
        Be(),
      B.k >= 0 &&
        (B.open && Math.abs(e - B.at) > 0.06 && (B.open = !1),
        (B.p = M(B.p + (B.open ? n : -n) / 0.85)),
        !B.open && B.p <= 0 && (B.k = -1)));
    const W = [],
      De = Math.max(0, (K - bt) / zt),
      ce = (r) => wn + (1 - wn) * St(M(1 - Math.abs(De - r)));
    ks = C >= 1 && a < d.tf0 && Math.abs(De - Math.round(De)) < 0.12;
    const Rt = Math.sin(Math.PI * U),
      Qt = -20 * Rt,
      Ot =
        (U < 0.02 || (U > 0.98 && et === 0)) && O >= 1
          ? $t(0, Qt, U > 0.5 ? 56 : 2, Q, ht, A(-0.08, 0.02, U))
          : null;
    Oe(Le, !!Ot, Ot ? Ot[0] * (U > 0.5 ? -1 : 1) : 0, Ot ? Ot[1] : 0, n);
    const We = Math.PI * U,
      Fe = n > 0 ? (We - vs) / n : 0;
    vs = We;
    const Xe =
      (1.3 * Rt +
        M(Fe * 0.14, -0.7, 0.7) +
        Le.bow * 0.3 * (U > 0.5 ? -1 : 1) +
        G * (0.6 + 0.4 * Math.sin(L * 3.1))) /
      Q;
    ((Rn += ((Xe - $n) * 130 - Rn * 13) * n), ($n += Rn * n));
    const te = {
      mode: 1,
      pos: [G * 70 * Math.sin(L * 1.9), Qt - G * 40, 0],
      size: [Q, ht],
      rot: [
        A(-0.08, 0.02, U) - G * 0.55,
        0.12 * Rt + Le.rx * 0.6 + G * 0.25 * Math.sin(L * 2.3),
        Le.ry * 0.6 + G * 0.2 * Math.cos(L * 1.7),
      ],
      bend: [We, $n],
      texA: Lt.front,
      texB: et > 0 ? Lt.backPeeled : Lt.back,
      gloss: 0.55,
      glossBack: 0.18,
      sheen: 0.14,
    };
    let le = 1 / 0;
    for (let r = 0; r <= 12; r++)
      for (const h of [-0.5, 0.5])
        le = Math.min(le, P.point(te, (r / 12 - 0.5) * Q, h * ht)[2]);
    const dt = Rt * 230 + 55 * U * (1 - et) + G * 900 + Le.z * 0.6;
    ((te.pos[2] = Math.max(dt, -le + 1.5)), m || W.push(te));
    const q = [
        {
          id: "card",
          obj: te,
          stable: !m && O >= 1 && (U < 0.004 || (U > 0.996 && et === 0)),
        },
      ],
      Ne = Print.backLayout(E, (ht / Q) * 1e3),
      At = Ne.slot,
      yo = (At.w * Print.SH) / Print.SW,
      xo = (0.5 - (At.x + At.w / 2) / 1e3) * Q,
      go = ((At.y + yo / 2) / Ne.H - 0.5) * ht;
    if (((Qe = null), et > 0 || C > 0)) {
      const r = P.point(te, xo, go),
        h = (At.w / 1e3) * Q,
        k = et * (1 - C),
        o = C >= 1 && !Te ? $t(bt, pe, 1, Yt * ce(0), ee * ce(0), vn[0]) : null;
      Oe(wt, !!o, o ? o[0] : 0, o ? o[1] : 0, n);
      const z = h * Math.pow((Yt * ce(0)) / h, C),
        I = (0.35 * wt.bow) / z,
        $ = {
          pos: [A(r[0], bt, C), A(r[1], pe, C), 0],
          size: [z, (z * Print.SH) / Print.SW],
          rot: [
            A(te.rot[0] + Print.SLOT_ROT, vn[0], C) +
              0.14 * Math.sin(Math.PI * C),
            0.16 * k + wt.rx,
            wt.ry,
          ],
          bend: [-0.45 * k, (2.4 * k) / z + I],
          texA: Lt.cover,
          gloss: 0.06,
          sheen: 0.2,
        },
        nt = A(r[2] + 0.6, 0.8, C) + k * 90 + Math.sin(Math.PI * C) * 230;
      C < 1 && (wt.p = 0);
      const Mt = wt.p > 0 ? Ps($, wt, ns) : 0;
      (C >= 1 ? ie($, nt + wt.z + Mt) : ($.pos[2] = nt),
        (Qe = $),
        (ss = C < 1),
        Te ||
          (W.push($),
          q.push({ id: "cover", obj: $, stable: C >= 1 && wt.p === 0 })));
    }
    ((tn.length = 0),
      vt.forEach((r, h) => {
        const k = bt + (h + 1) * zt,
          o = pe + (h % 2 ? 8 : -6),
          z = vn[h + 1];
        if (Math.abs(k - K) > p * D + Yt || O < 1) return;
        !Ce[h] && K > k - zt * 0.3 && (Ce[h] = t);
        const I = Ce[h] ? (t - Ce[h]) / 1e3 : -1,
          $ = I >= 0 && I < 0.35 ? Math.sin((Math.PI * I) / 0.35) : 0,
          nt = h === lt - 1 && gt > 0;
        if (nt && gt >= 1) return;
        const Mt = ce(h + 1),
          yt = He[h],
          jt = nt || en === h ? null : $t(k, o, 1, Yt * Mt, ee * Mt, z);
        Oe(yt, !!jt, jt ? jt[0] : 0, jt ? jt[1] : 0, n);
        const f = Mt * (1 - $ * 0.02),
          y = Yt * f,
          v = (0.35 * yt.bow) / y;
        let S;
        if (nt) {
          const H = R.cards[0],
            Y = gt,
            V = Math.sin(Math.PI * Y),
            ut = V * V,
            it = t / 1e3,
            at = xt(M((Y - 0.15) / 0.7)),
            pt = A(y, H.w, Y),
            st = A(ee * f, H.h, St(M((at - 0.3) / 0.4)));
          S = ie(
            {
              mode: 1,
              pos: [A(k, H.x, Y), A(o, H.y, Y), 0],
              size: [pt, st],
              rot: [
                A(z, H.r, Y) + 0.35 * V,
                0.12 * V + 0.07 * ut * Math.sin(it * 2.2),
                0.06 * ut * Math.sin(it * 1.7 + 1),
              ],
              bend: [
                Math.PI * at,
                (1.1 * V + 0.25 * ut * Math.sin(it * 2.6)) / pt,
              ],
              texA: Ht[h].inked,
              texB: fe[0],
              gloss: 0.06,
              glossBack: 0.1,
              sheen: 0.2,
            },
            0.8 + V * 240,
          );
        } else {
          const H = I < 0 ? 0 : St(M((I - 0.06) / 0.14));
          S = {
            pos: [k, o, 0],
            size: [y, ee * f],
            rot: [z, yt.rx, yt.ry],
            bend: [0, v],
            texA: Ht[h].plain,
            texB: Ht[h].inked,
            mixB: H,
            gloss: 0.06,
            sheen: 0.2,
          };
          let Y = 0;
          (yt.p > 0 &&
            ((S.texA = H > 0.5 ? Ht[h].inked : Ht[h].plain),
            (Y = Ps(S, yt, Ht[h].back))),
            ie(S, 0.8 + yt.z - $ * 0.6 + Y));
        }
        if (
          (nt && (yt.p = 0),
          nt || (tn[h] = { obj: S, X: k, Y: o, r: z }),
          en === h)
        )
          return;
        (W.push(S), q.push({ id: "p" + h, obj: S, stable: !nt && yt.p === 0 }));
        const ot = S.size[0] / Print.SW,
          F = S.size[1] / Print.SH;
        Ht[h].stickers.forEach((H, Y) => {
          const V = I < 0 ? 0 : M((I - 0.3 - Y * 0.16) / 0.45);
          if (V <= 0) return;
          const ut = gn(V),
            it = hn(S, H.cx * ot, H.cy * F);
          if (nt && it.n[2] < 0.05) return;
          const at = z + H.r + (1 - ut) * 0.5,
            [pt, st] = je(it.n, at),
            kt = 1.4 + (1 - Ve(V)) * 60,
            he = {
              pos: it.p.map((Tt, Ke) => Tt + it.n[Ke] * kt),
              size: [H.w * ot * (1.4 - 0.4 * ut), H.h * ot * (1.4 - 0.4 * ut)],
              rot: [at, pt, st],
              texA: H.tex,
              alpha: Math.min(1, V * 5),
              gloss: 0.25,
              sheen: 0.1,
            };
          (W.push(he),
            q.push({
              id: `p${h}s${Y}`,
              obj: he,
              stable: V >= 1 && !nt,
              fit: 0.8,
            }));
        });
      }));
    const Bs = C > 0.6;
    Bs !== ae.on && ((ae.on = Bs), (ae.at = t));
    const Ds = (t - ae.at) / 1e3,
      vo = Wt.letters.length,
      Ys = M(K, bt, bt + lt * zt),
      bo = pe - ee / 2 - 30 - Wt.height / 2;
    if (
      (Wt.letters.forEach((r, h) => {
        r.x === null && (r.x = Ys);
        const k = (Ys - r.x) * r.k - r.v * 2 * Math.sqrt(r.k) * 0.62;
        ((r.v += k * n), (r.x += r.v * n));
        const o = ae.on
          ? M((Ds - h * 0.055) / 0.45)
          : 1 - M((Ds - (vo - 1 - h) * 0.025) / 0.22);
        if (o <= 0) return;
        const z = ae.on ? gn(o) : o,
          I = Math.min(16, Math.abs(r.v) * 0.012),
          $ = {
            pos: [r.x + r.ox, bo + r.oy, r.z + I + (1 - Ve(o)) * 60],
            size: [r.w * (1.4 - 0.4 * z), r.h * (1.4 - 0.4 * z)],
            rot: [
              r.r + (1 - z) * 0.5 + M(-r.v * 15e-5, -0.1, 0.1),
              0,
              M(r.v * 1e-4, -0.08, 0.08),
            ],
            texA: r.tex,
            alpha: Math.min(1, o * 5),
            gloss: 0.3,
          };
        (W.push($),
          q.push({ id: "t" + h, obj: $, stable: ae.on && o >= 1, fit: 0.85 }));
      }),
      R && fe.length)
    ) {
      const r = (f, y) => Math.abs(f - Z) < (u / 2) * D + y,
        h = (f, y, v) => {
          const S = gn(y);
          return (
            (f.size = f.size.map((ot) => ot * (1.4 - 0.4 * S))),
            (f.rot[0] += (1 - S) * 0.5),
            (f.alpha = Math.min(1, y * 5)),
            v * (1 - Ve(y))
          );
        },
        k = (f, y, v) => {
          let S = (y * f.w) / f.h;
          return (S > v && ((y *= v / S), (S = v)), [S, y]);
        };
      if (Ft && gt > 0 && r(R.title.y, R.title.h)) {
        const f = R.title,
          y = M(((t - Xn("title", t)) / 1e3 - 0.1) / 0.5),
          v = {
            pos: [f.x, f.y, 0],
            size: [f.w, (f.w * Ft.h) / Ft.w],
            rot: [-0.015, 0, 0],
            texA: Ft.tex,
            gloss: 0.3,
            sheen: 0.1,
          };
        ((v.pos[2] = 0.6 + h(v, y, 60)),
          y > 0 &&
            (W.push(v),
            q.push({ id: "tt", obj: v, stable: y >= 1, fit: 0.85 })));
      }
      gt > 0 &&
        Ee.forEach((f, y) => {
          const v = R.cards[y],
            S = y === 0,
            ot = B.k === y;
          if ((S && gt < 1) || (!ot && !r(v.y, v.h))) return;
          const F = bs[y],
            H = B.k >= 0 ? null : $t(v.x, v.y, 1, v.w, v.h, v.r);
          Oe(F, !!H, H ? H[0] * (S ? -1 : 1) : 0, H ? H[1] : 0, n);
          let Y = [v.x, v.y, 0],
            V = [v.r, F.rx, F.ry],
            ut = (0.35 * F.bow) / v.w,
            it = 0.8 + F.z;
          if (ot) {
            const de = B.p,
              xn = Math.sin(Math.PI * de),
              Vn = St(M(de / 0.7)),
              Se = xt(M((de - 0.15) / 0.85)),
              ko = Math.max(1.05, Math.min((0.8 * u) / v.h, (0.92 * p) / v.w));
            ((Y = [A(v.x, K, Se), A(v.y, Z, Se), 0]),
              (V = [
                A(v.r, 0, Se),
                A(F.rx, 0, Vn) + 0.1 * xn + 0.012 * Se * Math.sin(t / 900),
                A(F.ry, 0, Vn) + 0.01 * Se * Math.sin(t / 1300 + 1),
              ]),
              (ut = (1.3 * xn + 0.18 * Se) / v.w),
              (it = A(it, Scene.D * (1 - 1 / ko), Vn)));
          }
          const at = ie(
            {
              mode: S ? 1 : 0,
              pos: Y,
              size: [v.w, v.h],
              rot: V,
              bend: [S ? Math.PI : 0, ut * (S ? -1 : 1)],
              texA: S ? Ht[lt - 1].inked : fe[y],
              texB: fe[y],
              gloss: 0.1,
              glossBack: 0.1,
              sheen: 0.2,
              dapple: ot ? 0.6 * B.p : 0,
            },
            it,
          );
          (W.push(at), q.push({ id: "q" + y, obj: at, stable: !ot }));
          const pt = f.client && nn[f.client];
          if (!pt || (!ot && !r(v.y, -40))) return;
          const st = M(((t - Xn("q" + y, t)) / 1e3 - (S ? 0.15 : 0.3)) / 0.45);
          if (st <= 0) return;
          const kt = v.w * (E ? 0.28 : 0.36),
            he = -v.h * (E ? 0.44 : 0.42),
            Tt = hn(at, S ? -kt : kt, he);
          Tt.n[2] < 0 && (Tt.n = Tt.n.map((de) => -de));
          const [Ke, qn] = k(pt, R.cardSticker, v.w * 0.38),
            qt = {
              pos: [0, 0, 0],
              size: [Ke, qn],
              rot: [v.r + (y % 2 ? -0.16 : 0.14), 0, 0],
              texA: pt.tex,
              gloss: 0.3,
              sheen: 0.1,
              dapple: at.dapple,
            },
            yn = 1.4 + h(qt, st, 60),
            [_e, ke] = je(Tt.n, qt.rot[0]);
          ((qt.rot[1] = _e),
            (qt.rot[2] = ke),
            (qt.pos = Tt.p.map((de, xn) => de + Tt.n[xn] * yn)),
            W.push(qt),
            q.push({ id: "qs" + y, obj: qt, stable: st >= 1, fit: 0.8 }));
        });
      const o = R.sheet,
        z = ze && r(o.y, o.H / 2) && Math.abs(o.x - K) < (p / 2) * D + o.W / 2,
        I = z && B.k < 0 && !J.open ? $t(o.x, o.y, 1, o.W, o.H, o.r) : null;
      Oe($e, !!I, I ? I[0] : 0, I ? I[1] : 0, n);
      const $ = (0.35 * $e.bow) / o.W,
        nt = ie(
          {
            pos: [o.x, o.y, 0],
            size: [o.W, o.H],
            rot: [o.r, $e.rx * 0.3, $e.ry * 0.3],
            bend: [0, $],
            texA: ze,
            gloss: 0.5,
            sheen: 0.34,
          },
          0.5 + $e.z * 0.5,
        );
      z && (W.push(nt), q.push({ id: "sheet", obj: nt, stable: !0 }));
      const Mt = (f, y) => hn(nt, f - o.W / 2, y - o.H / 2),
        yt = o.y - o.H / 2;
      (!Gt.on && Z > yt - u * 0.05
        ? ((Gt.on = !0), (Gt.at = t))
        : Gt.on && Z < yt - u * 0.35 && ((Gt.on = !1), (Gt.at = t)),
        R.stickers.forEach((f, y) => {
          const v = nn[f.id];
          if (!v) return;
          const S = o.slots[f.id],
            ot = Math.hypot(
              o.x - o.W / 2 + S.x - f.x,
              o.y - o.H / 2 + S.y - f.y,
            ),
            F = Ss[f.id] || 0,
            H = Gt.on ? y * 0.14 : (Zn.length - 1 - y) * 0.07,
            Y =
              (t - Gt.at) / 1e3 > H
                ? M(F + (Gt.on ? n : -n) / (1.15 + ot / 2600))
                : F;
          Ss[f.id] = Y;
          const [V, ut] = k(v, f.h, f.maxW);
          if (Y <= 0) {
            if (gt <= 0 || !r(f.y, -50)) return;
            const _e = M(
              ((t - Xn("l" + y, t)) / 1e3 - 0.1 - (y % 2) * 0.12) / 0.45,
            );
            if (_e <= 0) return;
            const ke = {
              pos: [f.x, f.y, 0],
              size: [V, ut],
              rot: [f.r, 0, 0],
              texA: v.tex,
              gloss: 0.3,
              sheen: 0.1,
            };
            ((ke.pos[2] = 0.6 + h(ke, _e, 60)),
              W.push(ke),
              q.push({ id: "l" + y, obj: ke, stable: _e >= 1, fit: 0.85 }));
            return;
          }
          const it = o.slots[f.id],
            at = Mt(it.x, it.y),
            pt = St(M(Y / 0.18)),
            st = xt(M((Y - 0.1) / 0.75)),
            kt = Math.sin(Math.PI * st),
            he = Math.sin(Math.PI * M((Y - 0.84) / 0.16)),
            Tt = pt * (1 - st) + 0.22 * kt,
            Ke = Math.min(
              520,
              140 + Math.hypot(at.p[0] - f.x, at.p[1] - f.y) * 0.22,
            ),
            [qn, qt] = je(at.n, o.r),
            yn = {
              pos: [
                A(f.x, at.p[0], st),
                A(f.y, at.p[1], st),
                A(0.6, at.p[2] + 2, st) + kt * Ke + pt * (1 - st) * 16,
              ],
              size: [V * (1 + 0.04 * he), ut * (1 + 0.04 * he)],
              rot: [
                A(f.r, o.r, st) + kt * 0.5 * (y % 2 ? 1 : -1),
                A(0, qn, st) + kt * 0.22 * Math.sin(t / 170 + y),
                A(0, qt, st) + kt * 0.18 * Math.cos(t / 210 + y),
              ],
              bend: [-0.45 * Tt, (2.4 * Tt) / V + $ * st],
              texA: v.tex,
              gloss: 0.3,
              sheen: 0.1,
            };
          (W.push(yn),
            q.push({ id: "l" + y, obj: yn, stable: Y >= 1, fit: 0.85 }));
        }),
        (Wn = -1));
      const jt = (f, y, v, S, ot) => {
        const F = Dn[f],
          H = Mt(y, v);
        Yn[f] = [H.p[0], H.p[1], H.p[2] + 1.2, S.w, S.h, o.r];
        const Y = B.k < 0 && !J.open && $t(...Yn[f]);
        Y && (Wn = f);
        const V = t - F.at < 420 ? 1 : ot ? 0.5 : Y ? 0.4 : 0;
        F.a += (V - F.a) * (1 - Math.exp(-n * (V > F.a ? 14 : 7)));
        const [ut, it] = je(H.n, o.r),
          at = 2 + F.a * 40,
          pt = {
            pos: H.p.map((st, kt) => st + H.n[kt] * at),
            size: [S.w, S.h],
            rot: [o.r + F.a * 0.1, ut, it],
            bend: [-0.55 * F.a, (3 * F.a) / S.w + $],
            texA: S.tex,
            gloss: 0.3,
            sheen: 0.12,
          };
        return (
          W.push(pt),
          q.push({ id: "c" + f, obj: pt, stable: F.a < 0.01, fit: 0.85 }),
          pt
        );
      };
      if (
        (z &&
          ne.length &&
          o.contact.forEach((f, y) => {
            jt(y, f.x, f.y, ne[y]);
          }),
        z && Ie)
      ) {
        const f = o.slots.you,
          y = jt(Bt.length, f.x, f.y, Ie, J.open);
        if (
          ((J.anchor = [y.pos[0], y.pos[1], y.pos[2], f.h]), J.savedAt && ye)
        ) {
          const v = M((t - J.savedAt) / 140),
            S = 1.12 - 0.12 * v;
          W.push({
            pos: y.pos.map((ot, F) => ot + [0, 0, 0.5][F]),
            size: [ye.w * S, ye.h * S],
            rot: [o.r - 0.14, y.rot[1], y.rot[2]],
            bend: y.bend,
            texA: ye.tex,
            alpha: v * 0.9,
            gloss: 0.05,
          });
        }
      }
      if (z && Re && me) {
        const f = o.stamp,
          y = M((t - Re) / 140),
          v = Mt(f.x, f.y),
          S = 1.12 - 0.12 * y,
          [ot, F] = je(v.n, o.r - 0.1);
        W.push({
          pos: v.p.map((H, Y) => H + v.n[Y] * 1),
          size: [me.w * S, me.h * S],
          rot: [o.r - 0.1, ot, F],
          bend: [0, $],
          texA: me.tex,
          alpha: y * 0.9,
          gloss: 0.05,
        });
      }
    }
    if ((X && Et && X.tick(t) && P.upload(Et, X.canvas), R && N && Et && m)) {
      const r = N;
      let h;
      {
        const k = xt(l),
          o = Math.sin(Math.PI * l),
          z = St(M((l - 0.2) / 0.6)),
          I = St(M((z - 0.35) / 0.3)),
          $ = A(r.w, Q, k),
          nt = $ / A(r.w / r.h, Q / ht, I);
        h = ie(
          {
            mode: 1,
            pos: [A(r.x, 0, k), A(r.y, 0, k), 0],
            size: [$, nt],
            rot: [A(r.r, -0.08, k) - 0.25 * o, 0.12 * o, 0],
            bend: [Math.PI * (1 - z), (1.1 * Math.sin(Math.PI * z)) / $],
            texA: Lt.front,
            texB: Et,
            gloss: 0.55,
            glossBack: 0.08,
            sheen: A(0.12, 0.14, k),
          },
          A(0.6, 1.5, k) + 320 * o,
        );
      }
      (W.push(h), q.push({ id: "foot", obj: h, stable: !1 }));
    }
    if (R && N && Et && !m && c < 1) {
      const r = N,
        h = R.sheet,
        k = M(Math.min(p, u) * 0.085, 42, 84),
        o = E ? h.x - h.W / 2 + k * 0.9 : h.x - h.W / 2 - k * 1.7,
        z = E ? h.y + h.H / 2 - k * 0.5 : h.y + h.H / 2 - k * 1.3,
        I = xt(i),
        $ = St(M((c - 0.68) / 0.32)),
        nt = A(o, r.x, I),
        Mt = A(z, r.y, I),
        yt = Math.max(
          1,
          Math.round(Math.hypot(r.x - o, r.y - z) / (2 * Math.PI * k)),
        );
      if (
        Math.abs(nt - K) < (p / 2) * D + r.w &&
        Math.abs(Mt - Z) < (u / 2) * D + r.h
      ) {
        if (!An) {
          const f = document.createElement("canvas");
          ((f.width = f.height = 256),
            Print.paper(f.getContext("2d"), 256, 256, "#fbf7ec", 41, 15),
            (An = P.texture(f)));
        }
        const jt = {
          mode: 1,
          pos: [nt, Mt, E ? A(4, 0.6, I) : 0.6],
          size: [r.w, r.h],
          rot: [A(-0.3, r.r, $), 0, 0],
          crumple: [
            1 - $,
            k,
            Math.PI - Math.PI * (2 * yt + 1) * I,
            Math.hypot(r.w, r.h) / 2,
          ],
          texA: Et,
          texB: An,
          gloss: 0,
          glossBack: 0,
          sheen: 0,
        };
        W.push(jt);
      }
    }
    Ct = !1;
    let Un = !1;
    if (
      N &&
      Et &&
      c >= 1 &&
      !m &&
      Math.abs(N.x - K) < (p / 2) * D + N.w &&
      Math.abs(N.y - Z) < (u / 2) * D + N.h
    ) {
      const r = N,
        h = ie(
          {
            pos: [r.x, r.y, 0],
            size: [r.w, r.h],
            rot: [r.r, 0, 0],
            texA: Et,
            gloss: 0.08,
            sheen: 0.12,
          },
          0.6,
        );
      ((rn = h.pos[2]), W.push(h), q.push({ id: "foot", obj: h, stable: !0 }));
      const k = Fn ? 1 - (t - Fn) / 420 : 0;
      (k > 0 &&
        W.push({
          ...h,
          pos: [r.x, r.y, rn + 0.3],
          texA: Pn,
          alpha: 0.75 * k * k,
          gloss: 0,
          sheen: 0,
        }),
        (Ct = !0));
      const o = Ct && b.x >= 0 && !b.touch ? Gn(b.x, b.y) : null;
      Un =
        Kt !== null || (!!o && Math.abs(o[0]) <= 0.5 && Math.abs(o[1]) <= 0.5);
    }
    co(K, Z, Un);
    {
      (Nt.lock >= 0 ||
        Ct ||
        B.k >= 0 ||
        J.open ||
        Zt.getAttribute("aria-expanded") === "true" ||
        document.body.classList.contains("case") ||
        Math.abs(e - Pt) > 0.002) &&
        (an = Math.max(an, t));
      const h = t - Math.max(an, Je + 2800) > 2e3;
      (h && !jn && ws.classList.toggle("tap", ks),
        h !== jn && ((jn = h), ws.classList.toggle("on", h)));
    }
    uo(Pt);
    {
      const r = Pt < 0.04 && !document.body.classList.contains("case");
      r !== Ms && ((Ms = r), so.classList.toggle("on", r));
    }
    const Ws = [];
    (O >= 1 && b.x >= 0 && B.k < 0 && !ft.holding()
      ? (on = ft.pick(b.x, b.y, K, p, u, Z))
      : (on = null),
      ft.frame({
        now: t,
        cam: K,
        camY: Z,
        vw: p * D,
        vh: u,
        objects: W,
        meshes: Ws,
        supports: q,
        hover: on,
        dt: n,
      }));
    const Ge = t / 1e3,
      wo =
        b.x >= 0 && t - b.lt < 80
          ? {
              x: b.x - p / 2 + K,
              y: b.y - u / 2 + Z,
              vx: b.vx,
              vy: b.vy,
              speed: Math.hypot(b.vx, b.vy),
            }
          : null;
    for (
      xs.step(
        {
          t: Ge,
          dt: n,
          cam: K,
          camY: Z,
          vw: p,
          vh: u,
          zv: D,
          supports: q,
          surfaceAt: hn,
          on: O >= 1,
          toScreen: (r) => P.toScreen(r, K, Z),
          ptr: b.x >= 0 ? { x: b.x, y: b.y, moving: t - b.lt < 150 } : null,
        },
        W,
      ),
        ys.step(
          Ge,
          n,
          {
            cam: K,
            camY: Z,
            vw: p,
            vh: u,
            supports: q,
            ptr: O >= 1 ? wo : null,
          },
          W,
        ),
        W.sort((r, h) => r.pos[2] - h.pos[2]),
        Dt.style.cursor = Un
          ? "none"
          : B.k >= 0 || ft.holding()
            ? "zoom-out"
            : Wn >= 0 ||
                He.some((r) => r.z > 6) ||
                bs.some((r) => r.z > 6) ||
                (wt.z > 6 && !Te) ||
                on
              ? "pointer"
              : "";
      Xt.length && t - Xt[0].t > 1600;
    )
      Xt.shift();
    (Ln.fill(0),
      Hn.fill(1),
      Xt.forEach((r, h) => {
        const k = (t - r.t) / 1e3,
          o = Math.min(1, k / 0.05) * Math.exp(-k / 0.42) * Math.cos(k * 5.5);
        let z = r.vx * 0.012,
          I = r.vy * 0.012;
        const $ = Math.hypot(z, I);
        ($ > 14 && ((z *= 14 / $), (I *= 14 / $)),
          Ln.set([r.x, r.y, z * o, I * o], h * 4),
          (Hn[h] = 55 + k * 50));
      }),
      (b.speed *= Math.exp(-n * 2.5)));
    const Mo =
      0.85 +
      0.3 * Math.sin(Ge * 0.21) * Math.sin(Ge * 0.13 + 2) +
      Math.min(b.speed / 1800, 1.1) +
      1.5 * Math.sin(Math.PI * gt);
    ((Cn += (Mo - Cn) * (1 - Math.exp(-n * 1.5))),
      J.open && J.anchor && ro(K, Z),
      P.render({
        cam: K,
        camY: Z,
        time: Ge,
        gust: Cn,
        soft: 1.25,
        drags: Ln,
        dragR: Hn,
        colors: Ns,
        objects: W,
        meshes: Ws,
        zoom: _,
        spin: tt,
      }),
      Ue(dn));
  }
  Ue(dn);
  let Jt = null,
    As = -1e9;
  (addEventListener(
    "touchstart",
    (t) => {
      const n = t.changedTouches[0];
      Jt =
        t.touches.length === 1
          ? { x: n.clientX, y: n.clientY, t: performance.now() }
          : null;
    },
    { passive: !0 },
  ),
    addEventListener(
      "touchmove",
      (t) => {
        const n = t.touches[0];
        Jt &&
          (!n || Math.hypot(n.clientX - Jt.x, n.clientY - Jt.y) > 12) &&
          (Jt = null);
      },
      { passive: !0 },
    ),
    addEventListener(
      "touchcancel",
      () => {
        Jt = null;
      },
      { passive: !0 },
    ),
    addEventListener(
      "touchend",
      (t) => {
        const n = Jt,
          e = t.changedTouches[0];
        ((Jt = null),
          !(
            !n ||
            !e ||
            t.touches.length ||
            Math.hypot(e.clientX - n.x, e.clientY - n.y) > 12 ||
            performance.now() - n.t > 700
          ) &&
            ((As = performance.now()),
            Ts({ target: t.target, clientX: e.clientX, clientY: e.clientY })));
      },
      { passive: !0 },
    ),
    addEventListener("click", (t) => {
      performance.now() - As > 800 && Ts(t);
    }));
  function Ts(t) {
    if (
      !ft ||
      t.target === we ||
      (t.target instanceof Node &&
        (mt.contains(t.target) ||
          ct.contains(t.target) ||
          re.contains(t.target))) ||
      (t.target instanceof Element &&
        t.target.closest("a, button, input, textarea, select, label"))
    )
      return;
    if (Zt.getAttribute("aria-expanded") === "true") {
      fn(!1);
      return;
    }
    if (cn) {
      cn = !1;
      return;
    }
    if (J.open) {
      Be();
      return;
    }
    if (B.k >= 0) {
      B.open = !1;
      return;
    }
    if (ft.holding()) {
      ft.release();
      return;
    }
    const n = Qe,
      e = ss ? 1.3 : 1;
    if (
      n &&
      !Te &&
      $t(
        n.pos[0],
        n.pos[1],
        Math.max(1, n.pos[2]),
        n.size[0] * e,
        n.size[1] * e,
        n.rot[0],
        t.clientX,
        t.clientY,
      )
    ) {
      window.Case && Case.open(Vt.id);
      return;
    }
    const s = tn.findIndex(
      (i, m) =>
        i &&
        en !== m &&
        window.Case &&
        Case.has(vt[m].id) &&
        $t(
          i.X,
          i.Y,
          1,
          i.obj.size[0],
          i.obj.size[1],
          i.r,
          t.clientX,
          t.clientY,
        ),
    );
    if (s >= 0) {
      Case.open(vt[s].id);
      return;
    }
    const a = zs(t.clientX, t.clientY);
    if (a >= 0) return ao(a);
    const c = Rs(t.clientX, t.clientY);
    if (c >= 0) {
      Object.assign(B, { k: c, p: 0, open: !0, at: scrollY / u });
      return;
    }
    const l = ft.pick(t.clientX, t.clientY, se, p, u, oe);
    l && ft.click(l, performance.now(), se, oe);
  }
  const Nn = (t) => vt.findIndex((n) => n.id === t);
  ((window.Picnic = {
    art: (t) => (t === Vt.id ? Ze : Sn[t] || {}),
    settle: (t) =>
      new Promise((n) => {
        const e = t === Vt.id ? wt : He[Nn(t)] || {};
        e.settle = !0;
        const s = () =>
          e.p > 0 ? requestAnimationFrame(s) : ((e.settle = !1), n());
        s();
      }),
    rect(t) {
      const n = t === Vt.id ? Qe : (tn[Nn(t)] || {}).obj;
      if (!n) return null;
      const e = { ...n, bend: [0, 0], curl: null },
        [s, a] = e.size,
        c = (T, x) => P.toScreen(P.point(e, T, x), se, oe),
        l = c(0, 0),
        i = c(s / 2, 0),
        m = c(0, a / 2);
      return {
        x: l[0],
        y: l[1],
        w: 2 * Math.hypot(i[0] - l[0], i[1] - l[1]),
        h: 2 * Math.hypot(m[0] - l[0], m[1] - l[1]),
        r: Math.atan2(i[1] - l[1], i[0] - l[0]),
      };
    },
    hide(t, n) {
      if (t === Vt.id) {
        ((Te = n), n && (wt.p = 0));
        return;
      }
      const e = Nn(t);
      ((en = n ? e : -1), n && He[e] && (He[e].p = 0));
    },
  }),
    addEventListener("keydown", (t) => {
      if (t.key === "Escape") {
        if (Zt.getAttribute("aria-expanded") === "true") {
          (fn(!1), Zt.focus());
          return;
        }
        (B.k >= 0 && (B.open = !1), J.open && Be());
      }
    }));
  function zs(t, n) {
    return !R || !Bn ? -1 : Yn.findIndex((e) => e && $t(...e, t, n));
  }
  function ao(t) {
    if (((Dn[t].at = performance.now()), t === Bt.length)) return io();
    const n = Bt[t];
    if (n.id === "email")
      n.value &&
        po(n.value)
          .then(() => {
            Re = Re || performance.now();
          })
          .catch(() => {});
    else if (n.url) {
      const e = document.createElement("a");
      ((e.href = n.url),
        (e.target = "_blank"),
        (e.rel = "noopener noreferrer"),
        document.body.appendChild(e),
        e.click(),
        e.remove());
    }
  }
  const mt = document.createElement("form");
  ((mt.id = "logo"),
    (mt.noValidate = !0),
    (mt.innerHTML =
      '<label class="sr" for="logo-email">Your message</label><input id="logo-email" type="text" name="message" maxlength="500" placeholder="Say hello…" required><button type="submit">Draft email</button><p class="err" role="status" aria-live="polite"></p>'),
    document.body.appendChild(mt));
  const ve = mt.querySelector("input"),
    un = mt.querySelector("button"),
    pn = mt.querySelector(".err");
  function io() {
    ((J.open = !0),
      (J.at = scrollY / u),
      (pn.textContent = ""),
      mt.classList.add("on"),
      ve.focus({ preventScroll: !0 }));
  }
  function Be() {
    ((J.open = !1), mt.classList.remove("on"), ve.blur());
  }
  function ro(t, n) {
    const [e, s, a, c] = J.anchor,
      l = Scene.D / (Scene.D - a),
      i = (e - t) * l + p / 2,
      m = (s - n) * l + u / 2,
      T = mt.offsetWidth,
      x = mt.offsetHeight;
    let w = m - (c * l) / 2 - x - 14;
    (w < 16 && (w = m + (c * l) / 2 + 14),
      (mt.style.translate = `${Math.round(M(i - T / 2, 16, p - T - 16))}px ${Math.round(M(w, 16, u - x - 16))}px`));
  }
  mt.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = ve.value.trim();
    window.location.href =
      "mailto:hello@tomlin7.com?subject=" +
      encodeURIComponent("Hello from the picnic") +
      "&body=" +
      encodeURIComponent(note);
  });
  const ct = document.createElement("div");
  ((ct.id = "paints"),
    ct.setAttribute("role", "toolbar"),
    ct.setAttribute("aria-label", "Paints"),
    (ct.inert = !0),
    (ct.innerHTML =
      '<div class="sw">' +
      Ks.map(
        ([t, n]) =>
          `<button type="button" aria-label="${t}" aria-pressed="false" data-c="${n}" style="--c:${n}"></button>`,
      ).join("") +
      '</div><div class="sz">' +
      Gs.map(
        ([t, n], e) =>
          `<button type="button" aria-label="${t}" aria-pressed="false" data-s="${n}"><i style="--d:${[6, 12, 20][e]}px"></i></button>`,
      ).join("") +
      '<button type="button" class="tool" data-a="erase" aria-pressed="false">Eraser</button></div><div class="act"><button type="button" class="tool" data-a="clear">Start over</button><button type="button" class="tool save" data-a="save">Save</button></div>'),
    document.body.appendChild(ct));
  const _t = document.createElement("div");
  ((_t.id = "brush"),
    _t.setAttribute("aria-hidden", "true"),
    document.body.appendChild(_t));
  function Is(t, n) {
    (ct
      .querySelectorAll("[data-c]")
      .forEach((e) =>
        e.setAttribute("aria-pressed", String(!n && e.dataset.c === t)),
      ),
      ct
        .querySelectorAll("[data-s]")
        .forEach((e) =>
          e.setAttribute("aria-pressed", String(+e.dataset.s === X.brush)),
        ),
      ct
        .querySelectorAll("[data-s] i")
        .forEach((e) => (e.style.background = n ? "#fff" : t)),
      ct
        .querySelector('[data-a="erase"]')
        .setAttribute("aria-pressed", String(n)),
      _t.style.setProperty("--c", n ? "rgba(255, 255, 255, 0.6)" : t),
      _t.classList.toggle("erase", n));
  }
  ct.addEventListener("click", (t) => {
    const n = t.target instanceof Element && t.target.closest("button");
    !n ||
      !X ||
      (n.dataset.c
        ? X.set(n.dataset.c)
        : n.dataset.s
          ? X.setSize(+n.dataset.s)
          : n.dataset.a === "erase"
            ? X.erase(!X.eraser)
            : n.dataset.a === "clear"
              ? X.clear(performance.now())
              : n.dataset.a === "save" &&
                (X.save("dheeraj-picnic.png"), (Fn = performance.now())),
      Is(X.colour, X.eraser));
  });
  let Ls = !1;
  function co(t, n, e) {
    if (
      (Ct !== Ls &&
        ((Ls = Ct), ct.classList.toggle("on", Ct), (ct.inert = !Ct)),
      Ct)
    ) {
      const s = N,
        a = s.x - t + p / 2,
        c = s.y + s.h / 2 - n + u / 2 + s.gap;
      ct.style.translate = `${Math.round(a - ct.offsetWidth / 2)}px ${Math.round(c)}px`;
    }
    if ((_t.classList.toggle("on", e && !b.touch), e && X)) {
      const s = X.size * (Scene.D / (Scene.D - rn));
      ((_t.style.width = _t.style.height = `${s}px`),
        (_t.style.translate = `${b.x - s / 2}px ${b.y - s / 2}px`));
    }
  }
  function Gn(t, n) {
    const e = N,
      s = Scene.D / (Scene.D - rn),
      a = (t - ((e.x - se) * s + p / 2)) / s,
      c = (n - ((e.y - oe) * s + u / 2)) / s,
      l = Math.cos(-e.r),
      i = Math.sin(-e.r);
    return [(a * l - c * i) / e.w, (a * i + c * l) / e.h];
  }
  function Hs(t, n) {
    if (!Ct || !X) return null;
    const e = Gn(t, n);
    return Math.abs(e[0]) <= 0.5 && Math.abs(e[1]) <= 0.5 ? e : null;
  }
  (Dt.addEventListener("pointerdown", (t) => {
    if (((cn = !1), t.button > 0 || Kt !== null)) return;
    const n = Hs(t.clientX, t.clientY);
    if (n) {
      ((Kt = t.pointerId), (cn = !0));
      try {
        Dt.setPointerCapture(t.pointerId);
      } catch {}
      X.down(n[0], n[1]);
    }
  }),
    Dt.addEventListener("pointermove", (t) => {
      if (t.pointerId !== Kt) return;
      const n = t.getCoalescedEvents ? t.getCoalescedEvents() : [];
      for (const e of n.length ? n : [t]) {
        const s = Gn(e.clientX, e.clientY);
        X.move(s[0], s[1]);
      }
    }));
  function Cs() {
    Kt !== null && ((Kt = null), X.up());
  }
  (Dt.addEventListener("pointerup", (t) => {
    t.pointerId === Kt && Cs();
  }),
    Dt.addEventListener("pointercancel", (t) => {
      t.pointerId === Kt && Cs();
    }),
    Dt.addEventListener(
      "touchstart",
      (t) => {
        const n = t.touches[0];
        t.touches.length === 1 &&
          Hs(n.clientX, n.clientY) &&
          t.preventDefault();
      },
      { passive: !1 },
    ),
    Dt.addEventListener(
      "touchmove",
      (t) => {
        Kt !== null && t.preventDefault();
      },
      { passive: !1 },
    ));
  const Kn = [
      ["hello", "Hello", "#f6c945", "#141210", () => 0],
      ["work", "Work", "#2442c6", "#fff8e4", () => d.trav1],
      ["words", "Field notes", "#f08aa8", "#141210", () => d.tf1],
      ["hi", "Say hi", "#d8322a", "#fff8e4", () => d.down],
      ["colour", "Colour in", "#3f9a4f", "#fff8e4", () => d.s1],
    ],
    lo = [-3, 2, -1.5, 3, -2.5],
    ho =
      '<svg class="pm" viewBox="0 0 70 40" aria-hidden="true"><g fill="none" stroke="#c2303a" stroke-width="2.2" stroke-linecap="round"><circle cx="17" cy="20" r="13"/><path d="M34 11q4-4 8 0t8 0t8 0t8 0M34 20q4-4 8 0t8 0t8 0t8 0M34 29q4-4 8 0t8 0t8 0t8 0"/></g></svg>',
    re = document.createElement("nav");
  ((re.id = "nav"),
    re.setAttribute("aria-label", "Sections"),
    (re.innerHTML =
      '<button type="button" class="open" aria-expanded="false" aria-controls="nav-sheet" aria-label="Menu"><img alt=""></button><div id="nav-sheet" class="sheet">' +
      Kn.map(
        ([t, n], e) =>
          `<button type="button" class="st" data-k="${t}" aria-label="${n}" style="--r:${lo[e]}deg;--d:${60 + e * 60}ms"><img alt="">${ho}</button>`,
      ).join("") +
      "</div>"),
    document.body.appendChild(re));
  const Zt = re.querySelector(".open"),
    be = re.querySelector(".sheet");
  ((be.inert = !0),
    Promise.all([
      document.fonts.load("600 12px 'Geist Mono'"),
      ge("clients/logo.svg").catch(() => null),
    ]).then(([, t]) => {
      ((Zt.querySelector("img").src = Print.navStamp(
        "logo",
        "",
        "#fbf6ea",
        "#141210",
        t,
      ).toDataURL()),
        Kn.forEach(([n, e, s, a], c) => {
          be.children[c].querySelector("img").src = Print.navStamp(
            n,
            e,
            s,
            a,
          ).toDataURL();
        }));
    }));
  function fn(t) {
    (Zt.setAttribute("aria-expanded", String(t)),
      be.classList.toggle("on", t),
      (be.inert = !t));
  }
  (Zt.addEventListener("click", () => {
    const t = Zt.getAttribute("aria-expanded") !== "true";
    fn(t);
  }),
    be.addEventListener("click", (t) => {
      const n = t.target instanceof Element && t.target.closest(".st");
      if (!n) return;
      const e = Kn.find((s) => s[0] === n.dataset.k)[4]();
      (fn(!1),
        B.k >= 0 && (B.open = !1),
        J.open && Be(),
        (Nt.to = e),
        (Nt.lock = -1),
        scrollTo({
          top: e * u,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        }));
    }));
  let $s = -1;
  function uo(t) {
    const n =
      t < d.peel1 || t >= d.u0
        ? 0
        : t < d.tf0
          ? 1
          : t < d.sheet
            ? 2
            : t < d.s0 + 0.3
              ? 3
              : 4;
    n !== $s &&
      (($s = n),
      [...be.children].forEach((e, s) =>
        e.setAttribute("aria-current", String(s === n)),
      ));
  }
  function po(t) {
    let n = !1;
    try {
      const e = document.createElement("textarea");
      ((e.value = t),
        e.setAttribute("readonly", ""),
        (e.style.cssText = "position:fixed;top:0;left:0;opacity:0"),
        document.body.appendChild(e),
        e.select(),
        e.setSelectionRange(0, t.length),
        (n = document.execCommand("copy")),
        e.remove());
    } catch {}
    return n
      ? Promise.resolve()
      : navigator.clipboard
        ? Promise.race([
            navigator.clipboard.writeText(t),
            new Promise((e, s) => setTimeout(s, 1500)),
          ])
        : Promise.reject();
  }
  function Rs(t, n) {
    if (!R || !Bn) return -1;
    for (let e = R.cards.length - 1; e >= 0; e--) {
      const s = R.cards[e];
      if ($t(s.x, s.y, 1, s.w, s.h, s.r, t, n)) return e;
    }
    return -1;
  }
  const we = qe("#sound"),
    fo = [...we.querySelectorAll("i")],
    mn = [],
    mo = (t) => {
      (mn.forEach(clearTimeout), (mn.length = 0));
      const n = matchMedia("(prefers-reduced-motion: reduce)").matches;
      fo.forEach((e, s) => {
        if (!t) {
          e.style.height = "";
          return;
        }
        if (n) {
          e.style.height = [12, 18, 12][s] + "px";
          return;
        }
        const a = s === 1 ? 20 : 14,
          c = () => {
            const l = 120 + Math.random() * 160;
            (e.style.setProperty("--d", (l / 1e3).toFixed(2) + "s"),
              (e.style.height = (6 + Math.random() * a).toFixed(1) + "px"),
              (mn[s] = setTimeout(c, l)));
          };
        mn[s] = setTimeout(c, s * 70);
      });
    },
    Os = (t) => {
      try {
        localStorage.setItem("picnic-sound", t ? "1" : "0");
      } catch {}
    },
    _n = (t) => {
      (Garden.set(t),
        ft && ft.setRadio(t),
        we.setAttribute("aria-pressed", String(t)),
        we.setAttribute("aria-label", t ? "Sound on" : "Sound off"),
        mo(t));
    };
  we.addEventListener("click", () => {
    const t = !Garden.on;
    (_n(t), Os(t));
  });
  let js = !1;
  try {
    js = localStorage.getItem("picnic-sound") === "1";
  } catch {}
  if (js) {
    const t = (n) => {
      (n.target instanceof Node && we.contains(n.target)) ||
        (removeEventListener("pointerdown", t),
        removeEventListener("keydown", t),
        Garden.on || _n(!0));
    };
    (addEventListener("pointerdown", t), addEventListener("keydown", t));
  }
  window.picnic = {
    jump(t) {
      (scrollTo(0, t * u), (Pt = t));
    },
    T: d,
    roll: Nt,
    foot: () => N,
    painter: () => X,
    flies: xs,
    drop: () => ys.drop(),
    held: B,
    cardAt: Rs,
    contactAt: zs,
    contactState: Dn,
    CONTACT: Bt,
    copied: () => {
      Re = performance.now();
    },
  };
})();
