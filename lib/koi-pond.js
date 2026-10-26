// ASCII koi simulation, movement, feeding, and cell renderer.
let TAU = 2 * Math.PI,
  clamp = (e, t, i) => (e < t ? t : e > i ? i : e),
  randomBetween = (e, t) => e + Math.random() * (t - e);
function smoothstep(e, t, i) {
  let r = clamp((i - e) / (t - e), 0, 1);
  return r * r * (3 - 2 * r);
}
function angleDelta(e, t) {
  let i = (t - e) % TAU;
  return (i > Math.PI && (i -= TAU), i < -Math.PI && (i += TAU), i);
}
function hash(e, t, i) {
  let r =
    Math.imul(0 | e, 374761393) ^
    Math.imul(0 | t, 668265263) ^
    Math.imul(0 | i, 1442695041);
  return (
    (r = Math.imul(r ^ (r >>> 13), 1274126177)),
    ((r ^= r >>> 16) >>> 0) / 4294967296
  );
}
let varieties = [
    ["kohaku", 3],
    ["sanke", 2],
    ["tancho", 1],
  ],
  varietyWeight = varieties.reduce((e, t) => {
    let [, i] = t;
    return e + i;
  }, 0),
  avoidanceVector = { x: 0, y: 0 };
class KoiWorld {
  resize(e, t) {
    let i = 0 === this.width;
    ((this.width = e), (this.height = t), i && this.seed());
  }
  seed() {
    let { width: e, height: t } = this,
      i = clamp(0.5 * Math.min(e, t), 170, 420),
      r = clamp(Math.round((e * t) / 24e4), 3, 6),
      s = e >= 1024 ? 2 : 0;
    this.koi = [];
    for (let a = 0; a < r + s; a++) {
      let s = a >= r,
        n = i * (s ? randomBetween(0.32, 0.45) : randomBetween(0.6, 1)),
        o = s ? 0.72 : 1,
        l = randomBetween(0, TAU),
        h = randomBetween(0.1 * e, 0.9 * e),
        c = randomBetween(0.1 * t, 0.9 * t),
        d = new Float32Array(40),
        p = n / 19;
      for (let e = 0; e < 20; e++)
        ((d[2 * e] = h - Math.cos(l) * p * e),
          (d[2 * e + 1] = c - Math.sin(l) * p * e));
      this.koi.push({
        id: a + 1,
        variety: (function () {
          let e = Math.random() * varietyWeight;
          for (let [t, i] of varieties) if ((e -= i) <= 0) return t;
          return "kohaku";
        })(),
        length: n,
        nodes: d,
        heading: l,
        speed: 20,
        phase: randomBetween(0, TAU),
        turn: 0,
        wander: 0,
        curiosity: randomBetween(0.35, 1),
        depth: randomBetween(0.5, o),
        depthTarget: randomBetween(0.5, o),
        depthMax: o,
        nextDive: randomBetween(6, 18),
        nextSurface: randomBetween(3, 14),
        nextWake: randomBetween(0, 2),
        beat: 0,
        rush: 0,
        food: null,
        burstUntil: 0,
        nextBurst: randomBetween(0, 3),
        finPhase: randomBetween(0, TAU),
        startle: 0,
        fleeX: 0,
        fleeY: 0,
        gulp: 0,
      });
    }
  }
  feed(e, t) {
    ((this.lastFeed = this.time),
      this.ripples.push({ x: e, y: t, born: this.time, strength: 0.35 }));
    let i = Math.min(
      5 + Math.floor(3 * Math.random()),
      24 - this.pellets.length,
    );
    for (let r = 0; r < i; r++) {
      let i = randomBetween(0, TAU),
        r = 34 * Math.sqrt(Math.random()),
        s = randomBetween(2, 6);
      this.pellets.push({
        x: e + Math.cos(i) * r * 1.3,
        y: t + Math.sin(i) * r,
        born: this.time,
        landAt: randomBetween(0.15, 0.45),
        landed: !1,
        vx: Math.cos(i) * s,
        vy: Math.sin(i) * s,
      });
    }
  }
  step(e) {
    for (let t of ((this.time += e),
    (this.pointer.speed *= Math.exp(-(8 * e))),
    this.koi))
      this.stepKoi(t, e);
    let t = this.time;
    for (let i of ((this.pellets = this.pellets.filter((e) => t - e.born < 14)),
    this.pellets)) {
      if (!i.landed) {
        if (t - i.born < i.landAt) continue;
        for (let e of ((i.landed = !0),
        this.ripples.push({ x: i.x, y: i.y, born: t, strength: 0.1 }),
        this.koi))
          650 > Math.hypot(e.nodes[0] - i.x, e.nodes[1] - i.y) && (e.rush = 1);
        continue;
      }
      let r = Math.exp(-(0.2 * e));
      ((i.vx *= r), (i.vy *= r), (i.x += i.vx * e), (i.y += i.vy * e));
    }
    ((this.ripples = this.ripples.filter(
      (e) => t - e.born < rippleDuration(e),
    )),
      (this.bites = this.bites.filter((e) => t - e.born < 0.45)));
  }
  stepKoi(e, t) {
    let { width: i, height: r, pointer: s, time: a } = this,
      n = e.length,
      o = e.nodes,
      l = o[0],
      h = o[1],
      c = Math.cos(e.heading),
      d = Math.sin(e.heading);
    ((e.wander = clamp(e.wander + (Math.random() - 0.5) * t * 2.4, -0.9, 0.9)),
      (c += 0.6 * Math.cos(e.heading + e.wander)),
      (d += 0.6 * Math.sin(e.heading + e.wander)));
    let p = this.pickFood(
        e,
        l,
        h,
        Math.max(1.6 * n + 220, e.rush > 0 ? 650 : 0),
      ),
      u = Math.hypot(s.x - l, s.y - h),
      f = a - this.lastFeed < 2;
    (!p &&
      !f &&
      s.active &&
      s.speed > 1100 &&
      u < 0.9 * n &&
      ((e.startle = 1), (e.fleeX = s.x), (e.fleeY = s.y)),
      (e.startle = Math.max(0, e.startle - 0.6 * t)));
    let g = e.startle > 0.3 && !p,
      m = !1,
      x = !1,
      y = 0;
    if (g) {
      let t = l - e.fleeX,
        i = h - e.fleeY,
        r = Math.hypot(t, i) || 1;
      ((c += (t / r) * 4 * e.startle), (d += (i / r) * 4 * e.startle));
    } else if (p) {
      let e = p.x - l,
        t = p.y - h,
        i = Math.hypot(e, t) || 1;
      ((c += (e / i) * 3),
        (d += (t / i) * 3),
        (m = !0),
        (y = clamp(1 - i / (1.2 * n), 0, 1)));
    } else if (s.active) {
      let t = s.x - l,
        i = s.y - h,
        r = Math.hypot(t, i) || 1;
      if (r < 300) {
        let s = e.curiosity * (1 - r / 300) * 2.2,
          a = clamp(r / (0.6 * n), 0, 1);
        ((c += ((t / r) * a - (i / r) * (1 - a)) * s),
          (d += ((i / r) * a + (t / r) * (1 - a)) * s),
          (x = !0));
      }
    }
    for (let t of this.koi) {
      if (t === e) continue;
      let i = t.nodes[0],
        r = t.nodes[1];
      if (!(Math.abs(i - l) > 2 * n || Math.abs(r - h) > 2 * n)) {
        for (let e = 0; e < 20; e += 3) {
          let i = l - t.nodes[2 * e],
            r = h - t.nodes[2 * e + 1],
            s = Math.hypot(i, r),
            a = (n + t.length) * (p ? 0.12 : 0.28);
          if (s < a && s > 0.001) {
            let e = (1 - s / a) * 2.4;
            ((c += (i / s) * e), (d += (r / s) * e));
          }
        }
        !m &&
          Math.hypot(i - l, r - h) < 1.6 * n &&
          ((c += 0.18 * Math.cos(t.heading)),
          (d += 0.18 * Math.sin(t.heading)));
      }
    }
    (!(function (e, t, i, r, s) {
      for (let a of ((s.x = 0), (s.y = 0), e)) {
        let e = t - clamp(t, a.left, a.right),
          n = i - clamp(i, a.top, a.bottom),
          o = Math.hypot(e, n);
        if (o > r) continue;
        if (o < 0.001) {
          let r = [a.left - t, t - a.right, a.top - i, i - a.bottom],
            s = r.indexOf(Math.max(...r));
          ((e = 0 === s ? -1 : 1 === s ? 1 : 0),
            (n = 2 === s ? -1 : 3 === s ? 1 : 0),
            (o = 0));
        }
        let l = Math.hypot(e, n) || 1;
        ((s.x += (e / l) * (1 - o / r)), (s.y += (n / l) * (1 - o / r)));
      }
    })(this.avoid, l, h, 0.4 * n, avoidanceVector),
      (c += avoidanceVector.x * (m || x ? 0.5 : 1.8)),
      (d += avoidanceVector.y * (m || x ? 0.5 : 1.8)));
    let M = Math.max(-l, l - i, -h, h - r);
    if (M > -(0.25 * n)) {
      let e = 3.5 * clamp((M + 0.25 * n) / (0.5 * n), 0, 1),
        t = i / 2 - l,
        s = r / 2 - h,
        a = Math.hypot(t, s) || 1;
      ((c += (t / a) * e), (d += (s / a) * e));
    }
    let v = Math.atan2(d, c),
      w =
        (1 + 0.6 * e.rush) *
        Math.min(g ? 3 : m ? 1.9 + y : x ? 1.2 : 0.7, (e.speed / n) * 4) *
        t,
      b = clamp(angleDelta(e.heading, v), -w, w);
    ((e.heading += b),
      (e.turn += (b / t - e.turn) * Math.min(1, 3 * t)),
      a > e.nextBurst &&
        a > e.burstUntil &&
        ((e.burstUntil = a + randomBetween(0.7, 1.6)),
        (e.nextBurst = e.burstUntil + randomBetween(1.2, 4))));
    let k = g || m || a < e.burstUntil;
    ((e.beat += ((k ? 1 : 0) - e.beat) * Math.min(1, 3 * t)),
      e.beat > 0.6 &&
        e.depth > 0.65 &&
        a > e.nextWake &&
        (this.ripples.push({
          x: o[34],
          y: o[35],
          born: a,
          strength: 0.25 + 0.2 * e.depth,
        }),
        (e.nextWake = a + randomBetween(0.8, 1.6) / e.beat)),
      (e.rush = Math.max(0, e.rush - 0.7 * t)));
    let j = 12 + 0.05 * n,
      S =
        (1 + 0.8 * e.rush) *
        (g ? 3.2 * j : m ? j * (1.9 + y) : k ? j * (x ? 1.6 : 1.35) : 0.45 * j);
    ((e.speed +=
      (S - e.speed) * Math.min(1, t * (k ? 1.6 + 3 * e.rush : 0.35))),
      (e.phase += t * (0.6 + e.beat * (2.2 + e.speed / 11))),
      (e.finPhase += 2.4 * t),
      (e.gulp += ((m && y > 0.55 ? 1 : 0) - e.gulp) * Math.min(1, 6 * t)),
      a > e.nextDive &&
        ((e.depthTarget = randomBetween(0.5, e.depthMax)),
        (e.nextDive = a + randomBetween(8, 20))),
      (e.depth +=
        ((m ? 1 : e.depthTarget) - e.depth) *
        Math.min(1, t * (m ? 0.8 : 0.15))),
      (o[0] += Math.cos(e.heading) * e.speed * t),
      (o[1] += Math.sin(e.heading) * e.speed * t));
    let E = n / 19,
      L = e.heading + Math.PI;
    for (let e = 1; e < 20; e++) {
      let t = o[(e - 1) * 2],
        i = o[(e - 1) * 2 + 1],
        r = Math.atan2(o[2 * e + 1] - i, o[2 * e] - t);
      ((r = L + clamp(angleDelta(L, r), -0.16, 0.16)),
        (o[2 * e] = t + Math.cos(r) * E),
        (o[2 * e + 1] = i + Math.sin(r) * E),
        (L = r));
    }
    let C = 0.08 * n + 6,
      P = this.pellets.length;
    ((this.pellets = this.pellets.filter(
      (e) => !e.landed || (e.x - o[0]) ** 2 + (e.y - o[1]) ** 2 > C * C,
    )),
      this.pellets.length < P
        ? (this.ripples.push({ x: o[0], y: o[1], born: a, strength: 0.6 }),
          this.bites.push({ x: o[0], y: o[1], born: a }),
          (e.nextSurface = a + randomBetween(6, 16)))
        : a > e.nextSurface &&
          (this.ripples.push({ x: o[0], y: o[1], born: a, strength: 0.3 }),
          (e.nextSurface = a + randomBetween(8, 20))));
  }
  pickFood(e, t, i, r) {
    e.food && !this.pellets.includes(e.food) && (e.food = null);
    let s = this.nearestPellet(t, i, r);
    if (!e.food) return (e.food = s);
    let a = Math.hypot(e.food.x - t, e.food.y - i);
    return (
      a > 1.3 * r
        ? (e.food = s)
        : s && Math.hypot(s.x - t, s.y - i) < 0.5 * a && (e.food = s),
      e.food
    );
  }
  nearestPellet(e, t, i) {
    let r = null,
      s = i * i;
    for (let i of this.pellets) {
      if (!i.landed) continue;
      let a = (i.x - e) ** 2 + (i.y - t) ** 2;
      a < s && ((s = a), (r = i));
    }
    return r;
  }
  constructor() {
    ((this.width = 0),
      (this.height = 0),
      (this.time = 0),
      (this.koi = []),
      (this.pellets = []),
      (this.bites = []),
      (this.lastFeed = -1 / 0),
      (this.ripples = []),
      (this.pointer = { x: 0, y: 0, speed: 0, active: !1 }),
      (this.avoid = []));
  }
}
function rippleDuration(e) {
  return 2.2 + 1.6 * e.strength;
}
function bodyHalfWidth(e) {
  return e < 0.12
    ? 0.11 * Math.pow(Math.sin(((e / 0.12) * Math.PI) / 2), 0.55)
    : e < 0.3
      ? 0.11 + 0.025 * smoothstep(0.12, 0.3, e)
      : 0.033 + 0.102 * (1 - smoothstep(0.3, 0.74, e));
}
function sampleFin(e, t, i, r, s, a, n) {
  let o = 0.85 * bodyHalfWidth(i),
    l = Math.cos(r),
    h = Math.sin(r),
    c = e - i,
    d = t - o;
  return (
    !(((c * l + d * h - s) / s) ** 2 + ((-c * h + d * l) / a) ** 2 > 1) &&
    ((n.flag = 2), (n.du = c), (n.da = d), !0)
  );
}
let darkPalette = {
    bg: [26, 25, 33],
    white: [236, 228, 218],
    red: [232, 96, 56],
    black: [92, 90, 108],
    fin: [214, 206, 198],
    eye: [20, 20, 26],
    water: [255, 247, 240],
    shadow: [0, 0, 0],
    shadowAlpha: 0.55,
    pellet: [236, 170, 92],
    alpha: 0.8,
    depthFloor: 0.4,
    tile: [0.68, 0.98],
    hi: [
      [112, 22, 24],
      [168, 34, 28],
      [214, 58, 30],
      [240, 96, 34],
      [250, 138, 52],
      [255, 178, 96],
    ],
    ink: 0.42,
  },
  lightPalette = {
    bg: [245, 244, 241],
    white: [112, 108, 104],
    red: [204, 62, 28],
    black: [36, 33, 40],
    fin: [138, 132, 126],
    eye: [24, 22, 26],
    water: [38, 37, 35],
    shadow: [60, 58, 56],
    shadowAlpha: 0.2,
    pellet: [176, 108, 40],
    alpha: 0.9,
    depthFloor: 0.55,
    tile: [0.78, 0.55],
    hi: [
      [138, 24, 22],
      [184, 38, 24],
      [222, 62, 28],
      [238, 100, 38],
      [244, 140, 66],
      [248, 176, 116],
    ],
    ink: 0.45,
  },
  bodyGlyphs = "t%SX8@#",
  sampleOffsets = [0.25, 0.25, 0.75, 0.25, 0.25, 0.75, 0.75, 0.75];
function directionGlyph(e, t) {
  let i = Math.hypot(e, t) || 1;
  return Math.abs(t) < 0.38 * i
    ? "-"
    : Math.abs(e) < 0.38 * i
      ? "|"
      : e * t > 0
        ? "\\"
        : "/";
}
function noise(e, t, i) {
  let r = Math.floor(e),
    s = Math.floor(t),
    a = smoothstep(0, 1, e - r),
    n = smoothstep(0, 1, t - s),
    o = hash(r, s, i),
    l = hash(r + 1, s, i),
    h = hash(r, s + 1, i);
  return (
    o + (l - o) * a + (h - o) * n + (o - l - h + hash(r + 1, s + 1, i)) * a * n
  );
}
function insideMarking(e, t, i, r) {
  return ((t - e.s) / e.rs) ** 2 + ((i - e.v) / e.rv) ** 2 < 1 + r;
}
let packColor = (e) => (e[0] << 16) | (e[1] << 8) | e[2],
  mixColor = (e, t, i) => [
    (e[0] + (t[0] - e[0]) * i) | 0,
    (e[1] + (t[1] - e[1]) * i) | 0,
    (e[2] + (t[2] - e[2]) * i) | 0,
  ],
  shadeColor = (e, t) => [
    0 | Math.min(255, e[0] * t),
    0 | Math.min(255, e[1] * t),
    0 | Math.min(255, e[2] * t),
  ];
class AsciiRenderer {
  setTheme(e) {
    this.palette = e ? lightPalette : darkPalette;
  }
  resize(e, t, i) {
    ((this.dpr = i),
      (this.cw = clamp(Math.round(e / 125), 8, 12)),
      (this.ch = this.cw + 2),
      (this.cols = Math.ceil(e / this.cw)),
      (this.rows = Math.ceil(t / this.ch)),
      (this.ctx.canvas.width = Math.round(e * i)),
      (this.ctx.canvas.height = Math.round(t * i)));
    let r = this.cols * this.rows;
    ((this.energy = new Float32Array(r)),
      (this.energyTmp = new Float32Array(r)),
      (this.cellGlyph = new Uint16Array(r)),
      (this.cellColor = new Uint32Array(r)),
      (this.cellAlpha = new Float32Array(r)),
      (this.cellTile = new Uint32Array(r)),
      (this.cellTileAlpha = new Float32Array(r)),
      (this.cellDim = new Float32Array(r).fill(1)),
      (this.cellShadow = new Uint8Array(r)));
  }
  setDimBoxes(e) {
    let { cols: t, rows: i, cw: r, ch: s, cellDim: a } = this;
    a.fill(1);
    let n = 4 * r;
    for (let o of e) {
      let e = Math.max(0, Math.floor((o.left - n) / r)),
        l = Math.min(t - 1, Math.floor((o.right + n) / r)),
        h = Math.max(0, Math.floor((o.top - n) / s)),
        c = Math.min(i - 1, Math.floor((o.bottom + n) / s));
      for (let i = h; i <= c; i++)
        for (let h = e; h <= l; h++) {
          let e = h * r + r / 2,
            l = i * s + s / 2,
            c = Math.hypot(
              Math.max(o.left - e, 0, e - o.right),
              Math.max(o.top - l, 0, l - o.bottom),
            ),
            d = i * t + h;
          a[d] = Math.min(a[d], 0.15 + 0.85 * smoothstep(0, n, c));
        }
    }
  }
  render(e, t) {
    let { ctx: i, dpr: r, cols: s } = this;
    if (0 !== s) {
      for (let t of (this.cellGlyph.fill(0),
      this.cellTileAlpha.fill(0),
      this.cellShadow.fill(0),
      [...e.koi].sort((e, t) => e.depth - t.depth)))
        this.rasterizeKoi(t, e.time);
      (this.depositWake(e),
        this.diffuse(t),
        i.setTransform(1, 0, 0, 1, 0, 0),
        i.clearRect(0, 0, i.canvas.width, i.canvas.height),
        i.setTransform(r, 0, 0, r, 0, 0),
        (i.font = "600 "
          .concat(Math.round(0.72 * this.ch), "px ")
          .concat(this.fontFamily)),
        (i.textAlign = "center"),
        (i.textBaseline = "middle"),
        this.drawShadows(),
        this.drawWake(),
        this.drawRipples(e),
        this.drawPellets(e),
        this.drawCells(),
        this.drawBites(e),
        (i.globalAlpha = 1));
    }
  }
  style(e) {
    let t = this.styles.get(e);
    return (
      t ||
        ((t = "rgb("
          .concat(e >>> 16, ",")
          .concat((e >>> 8) & 255, ",")
          .concat(255 & e, ")")),
        this.styles.set(e, t)),
      t
    );
  }
  glyphAt(e, t, i, r) {
    let { ctx: s, cw: a, ch: n, cols: o } = this;
    ((s.globalAlpha = r),
      (s.fillStyle = this.style(packColor(i))),
      s.fillText(t, (e % o) * a + a / 2, ((e / o) | 0) * n + n / 2));
  }
  cellIndex(e, t) {
    let i = Math.floor(e / this.cw),
      r = Math.floor(t / this.ch);
    return i < 0 || r < 0 || i >= this.cols || r >= this.rows
      ? -1
      : r * this.cols + i;
  }
  sample(e, t, i) {
    let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
      s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 18,
      { spine: a, arc: n } = this,
      o = 1 / 0,
      l = 0,
      h = 1,
      c = 0,
      d = 0,
      p = 0;
    for (let i = r; i <= s; i++) {
      let r = a[2 * i],
        s = a[2 * i + 1],
        u = a[(i + 1) * 2] - r,
        f = a[(i + 1) * 2 + 1] - s,
        g = u * u + f * f || 1,
        m = ((e - r) * u + (t - s) * f) / g,
        x = clamp(m, 0, 1),
        y = (e - r - u * x) ** 2 + (t - s - f * x) ** 2;
      if (y < o) {
        let a = Math.sqrt(g);
        ((o = y),
          (l = (n[i] + x * a) / this.arcTotal),
          (h = u * (t - s) - f * (e - r) >= 0 ? 1 : -1),
          (c = 18 === i ? Math.max(0, m - 1) * a : 0),
          (d = 0 === i ? Math.max(0, -m) * a : 0),
          (p = Math.abs(u * (t - s) - f * (e - r)) / a),
          (this.hitTx = u / a),
          (this.hitTy = f / a),
          (this.hitSeg = i));
      }
    }
    let u = Math.sqrt(o);
    return (
      (this.hitDist = u),
      (this.hitS = l),
      (this.hitV = u * h),
      (function (e, t, i, r, s) {
        let a =
            arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
          n =
            arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0;
        if (((s.flag = 0), (s.across = 1), (s.du = 1), (s.da = 0), a > 0))
          return (
            !!(a < 0.05 && 0.016 > Math.abs(n - (0.045 + 0.7 * a))) &&
            ((s.flag = 5), !0)
          );
        let o = bodyHalfWidth(e);
        if (e <= 0.74 && t <= o) {
          let i = t / o;
          return (
            (s.across = i),
            e > 0.055 && e < 0.1 && i > 0.5 && i < 0.85
              ? (s.flag = 3)
              : e > 0.28 && e < 0.6 && i < 0.14
                ? (s.flag = 4)
                : (s.flag = 1),
            !0
          );
        }
        if (e > 0.68 && i <= 0) {
          let i = (0.03 + 0.15 * Math.pow(smoothstep(0.7, 1, e), 0.8)) * r;
          if (t <= i && e <= 0.86 + (t / i) * 0.14)
            return ((s.flag = 2), (s.da = (t / i) * 0.8), !0);
        }
        return (
          sampleFin(e, t, 0.19, 0.85 + 0.5 * (r - 1), 0.066 * r, 0.04, s) ||
          sampleFin(e, t, 0.47, 0.75, 0.036, 0.018, s)
        );
      })(
        l,
        u / i,
        c / i,
        h > 0 ? this.flareLeft : this.flareRight,
        this.hit,
        d / i,
        p / i,
      )
    );
  }
  skin(e, t, i, r) {
    let s = this.palette,
      a = i / e.length;
    if (r > 0.9 || t > 0.74) return s.white;
    let n = (noise(14 * t + e.id, 30 * a, e.id + 3) - 0.5) * 0.6,
      o = this.markings(e);
    for (let e of o.black) if (insideMarking(e, t, a, n)) return s.black;
    for (let e of o.red) if (insideMarking(e, t, a, n)) return s.red;
    return s.white;
  }
  markings(e) {
    let t = this.markingCache.get(e.id);
    return (
      t ||
        ((t = (function (e) {
          let t = (t) => hash(e.id, t, 41);
          if ("tancho" === e.variety)
            return { red: [{ s: 0.11, v: 0, rs: 0.05, rv: 0.055 }], black: [] };
          let i = [];
          0.75 > t(0) &&
            i.push({
              s: 0.1,
              v: (t(1) - 0.5) * 0.03,
              rs: 0.055 + 0.03 * t(2),
              rv: 0.11,
            });
          let r = 2 + Math.floor(2 * t(3));
          for (let e = 0; e < r; e++) {
            let s = 0.42 / r;
            i.push({
              s: 0.25 + s * (e + 0.5) + (t(10 + e) - 0.5) * s * 0.3,
              v: (t(20 + e) - 0.5) * 0.05,
              rs: s * (0.32 + 0.12 * t(30 + e)),
              rv: 0.09 + 0.05 * t(40 + e),
            });
          }
          let s = [];
          if ("sanke" === e.variety) {
            let e = 4 + Math.floor(3 * t(50));
            for (let i = 0; i < e; i++)
              s.push({
                s: 0.24 + 0.44 * t(60 + i),
                v: (t(70 + i) - 0.5) * 0.16,
                rs: 0.022,
                rv: 0.026,
              });
          }
          return { red: i, black: s };
        })(e)),
        this.markingCache.set(e.id, t)),
      t
    );
  }
  rasterizeKoi(e, t) {
    let {
        spine: i,
        arc: r,
        cw: s,
        ch: a,
        cols: n,
        rows: o,
        cellGlyph: l,
        cellColor: h,
        cellAlpha: c,
        cellTile: d,
        cellTileAlpha: p,
        palette: u,
      } = this,
      f = e.length,
      g = e.nodes,
      m = 0.2 + 1.1 * e.beat;
    for (let t = 0; t < 20; t++) {
      let r = t / 19,
        s = Math.max(0, t - 1),
        a = Math.min(19, t + 1),
        n = g[2 * s] - g[2 * a],
        o = g[2 * s + 1] - g[2 * a + 1],
        l = Math.hypot(n, o) || 1;
      ((n /= l), (o /= l));
      let h =
        0.04 *
        f *
        (0.05 + 0.95 * Math.pow(r, 2.2)) *
        m *
        Math.sin(e.phase - 4.6 * r);
      ((i[2 * t] = g[2 * t] - o * h), (i[2 * t + 1] = g[2 * t + 1] + n * h));
    }
    r[0] = 0;
    for (let e = 1; e < 20; e++)
      r[e] =
        r[e - 1] +
        Math.hypot(
          i[2 * e] - i[(e - 1) * 2],
          i[2 * e + 1] - i[(e - 1) * 2 + 1],
        );
    this.arcTotal = r[19] || 1;
    let x = 1 - 0.25 * e.beat,
      y = 0.18 * (1 - e.beat) * Math.sin(e.finPhase),
      M = clamp(0.6 * e.turn, -0.35, 0.35);
    ((this.flareLeft = x + y - M), (this.flareRight = x - y + M));
    let v = 1 / 0,
      w = 1 / 0,
      b = -1 / 0,
      k = -1 / 0;
    for (let e = 0; e < 20; e++)
      ((v = Math.min(v, i[2 * e])),
        (b = Math.max(b, i[2 * e])),
        (w = Math.min(w, i[2 * e + 1])),
        (k = Math.max(k, i[2 * e + 1])));
    let j = 0.26 * f,
      S = Math.max(0, Math.floor((v - j) / s)),
      T = Math.min(n - 1, Math.floor((b + j) / s)),
      E = Math.max(0, Math.floor((w - j) / a)),
      N = Math.min(o - 1, Math.floor((k + j) / a));
    if (S > T || E > N) return;
    let C = Math.hypot(s, a),
      P = Math.round((0.07 * f * e.depth) / s) + 1,
      F = Math.round((0.05 * f * e.depth) / a) + 1,
      R = u.alpha * (u.depthFloor + (1 - u.depthFloor) * e.depth),
      [I, z] = u.tile,
      D = this.hit;
    for (let i = E; i <= N; i++)
      for (let r = S; r <= T; r++) {
        let g = r * s,
          m = i * a,
          x = this.sample(g + s / 2, m + a / 2, f);
        if (
          !x &&
          this.hitDist >
            f * (this.hitS > 0.4 && this.hitS < 0.62 ? 0.15 : 0.25) + C
        ) {
          r += Math.max(0, Math.floor((this.hitDist - 0.25 * f - C) / s));
          continue;
        }
        let y = Math.max(0, this.hitSeg - 2),
          M = Math.min(18, this.hitSeg + 2),
          { flag: v, across: w } = D,
          b = this.hitS,
          k = this.hitV,
          j = this.hitTx,
          S = this.hitTy,
          T = x ? 1 : 0,
          E = 0,
          N = 0,
          _ =
            x &&
            2 !== v &&
            5 !== v &&
            b > 0.04 &&
            b < 0.72 &&
            bodyHalfWidth(b) * f - this.hitDist > 0.35 * C;
        _ && (T = 5);
        for (let e = 0; !_ && e < sampleOffsets.length; e += 2)
          this.sample(
            g + sampleOffsets[e] * s,
            m + sampleOffsets[e + 1] * a,
            f,
            y,
            M,
          ) &&
            ((E += (sampleOffsets[e] - 0.5) * s),
            (N += (sampleOffsets[e + 1] - 0.5) * a),
            0 === T &&
              (({ flag: v, across: w } = D),
              (b = this.hitS),
              (k = this.hitV),
              (j = this.hitTx),
              (S = this.hitTy)),
            T++);
        if (0 === T) continue;
        ((this.hitTx = j), (this.hitTy = S));
        let q = T / 5,
          V = k >= 0 ? 1 : -1,
          Y = i * n + r,
          J =
            (4294967295 *
              hash(Math.round(90 * b), Math.round(k / (0.8 * s)), e.id)) >>>
            0,
          H = x && q >= 0.6,
          Q = " ",
          $ = u.fin,
          ee = R,
          et = null,
          ei = 0;
        if (5 === v)
          ((Q = directionGlyph(-j - V * S * 0.7, -S + V * j * 0.7)),
            ($ = shadeColor(mixColor(u.bg, u.fin, 0.9), u.ink + 0.3)));
        else if (3 === v && H)
          ((et = mixColor(u.bg, u.eye, 0.85)),
            (ei = R),
            (Q = "o"),
            ($ = mixColor(u.bg, u.white, 0.9)));
        else if (2 === v)
          ((et = mixColor(u.bg, u.fin, 0.55)),
            (ei = 0.45 * R * q),
            J % 2 == 0 && ((Q = "."), (ee *= 0.6 * q)));
        else {
          let a = this.skin(e, b, k, w),
            l = V * (0.6 * S - 0.8 * j) * w,
            h = clamp(0.22 + 0.5 * Math.sqrt(1 - w * w) + 0.18 * l, 0, 1);
          if (a === u.red) {
            let i = (hash(e.id, 5, 17) - 0.5) * 0.3,
              r = (noise(9 * b + e.id, (k / f) * 18, e.id + 21) - 0.5) * 0.25,
              s = Math.max(0, Math.sin(11 * b - 1.8 * t + e.id) - 0.7) / 0.3;
            et = (function (e, t) {
              let i = clamp(t, 0, 1) * (e.length - 1),
                r = Math.min(e.length - 2, Math.floor(i));
              return mixColor(e[r], e[r + 1], i - r);
            })(u.hi, 0.15 + 0.8 * h + i + r + 0.35 * s);
          } else et = mixColor(u.bg, a, I + (z - I) * h);
          if (5 === T) {
            let s = r + P,
              l = i + F;
            if (
              (s < n && l < o && (this.cellShadow[l * n + s] = 1),
              (ei = R),
              b < 0.035 && w < 0.6 && e.gulp > 0.5)
            )
              ((Q = "o"), ($ = u.eye));
            else {
              ((Q =
                bodyGlyphs[
                  clamp(
                    Math.round((1 - h) * 4) + ((J >>> 4) % 3),
                    0,
                    bodyGlyphs.length - 1,
                  )
                ]),
                ($ = shadeColor(et, u.ink)),
                a === u.white && (ee *= 0.6));
              let e = Math.floor(1.4 * t + (J % 997) / 97);
              0.03 > hash(J, e, 7) && (et = mixColor(et, u.bg, 0.45));
            }
          } else
            ((ei = R * q * 0.55),
              Math.hypot(E, N) > 0.2 * s &&
                J % 3 == 0 &&
                ((Q = "."), ($ = shadeColor(et, u.ink))));
        }
        (" " !== Q || 0 !== ei) &&
          ((d[Y] = et ? packColor(et) : 0),
          (p[Y] = ei),
          (l[Y] = Q.charCodeAt(0)),
          (h[Y] = packColor($)),
          (c[Y] = ee));
      }
  }
  drawCells() {
    let {
      ctx: e,
      cw: t,
      ch: i,
      cols: r,
      cellGlyph: s,
      cellColor: a,
      cellAlpha: n,
      cellTile: o,
      cellTileAlpha: l,
      cellDim: h,
    } = this;
    for (let c = 0; c < s.length; c++) {
      let d = s[c];
      if (!d) continue;
      let p = (c % r) * t,
        u = ((c / r) | 0) * i;
      (l[c] > 0 &&
        ((e.globalAlpha = l[c] * h[c]),
        (e.fillStyle = this.style(o[c])),
        e.fillRect(p + 1, u + 1, t - 1, i - 1)),
        32 !== d &&
          ((e.globalAlpha = n[c] * h[c]),
          (e.fillStyle = this.style(a[c])),
          e.fillText(String.fromCharCode(d), p + t / 2, u + i / 2 + 1)));
    }
  }
  depositWake(e) {
    let { energy: t } = this;
    for (let i of e.koi)
      for (let e = 16; e < 20; e++) {
        let r = this.cellIndex(i.nodes[2 * e], i.nodes[2 * e + 1]);
        r >= 0 && (t[r] = Math.min(1.5, t[r] + 0.035 + 0.0012 * i.speed));
      }
    if (e.pointer.active) {
      let i = this.cellIndex(e.pointer.x, e.pointer.y);
      i >= 0 && (t[i] = Math.min(1.5, t[i] + 0.12));
    }
  }
  diffuse(e) {
    let { cols: t, rows: i, energy: r, energyTmp: s } = this,
      a = Math.exp(-(1.1 * e));
    for (let e = 0; e < i; e++)
      for (let n = 0; n < t; n++) {
        let o = e * t + n,
          l = n > 0 ? r[o - 1] : r[o],
          h = n < t - 1 ? r[o + 1] : r[o],
          c = e > 0 ? r[o - t] : r[o],
          d = e < i - 1 ? r[o + t] : r[o];
        s[o] = (4 * r[o] + l + h + c + d) * 0.125 * a;
      }
    ((this.energy = s), (this.energyTmp = r));
  }
  drawShadows() {
    let { cellShadow: e, cellGlyph: t, cellDim: i, palette: r } = this;
    for (let s = 0; s < e.length; s++)
      e[s] && !t[s] && this.glyphAt(s, ":", r.shadow, r.shadowAlpha * i[s]);
  }
  drawWake() {
    let { energy: e, cellGlyph: t, cellShadow: i, palette: r } = this;
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      a < 0.22 ||
        t[s] ||
        i[s] ||
        this.glyphAt(
          s,
          a > 0.5 ? "-" : ".",
          r.water,
          0.35 * Math.min(1, (a - 0.22) * 1.4),
        );
    }
  }
  drawRipples(e) {
    let { cw: t, ch: i, cols: r, rows: s, cellGlyph: a, palette: n } = this;
    for (let o of e.ripples) {
      let l = e.time - o.born,
        h = Math.pow(1 - l / rippleDuration(o), 1.5) * o.strength;
      for (let e = 0; e < 2; e++) {
        let c = 52 * Math.max(0, l - 0.45 * e) * (0.7 + 0.5 * o.strength);
        if (c < 2) continue;
        let d = 0.6 * t,
          p = Math.max(0, Math.floor((o.x - c - t) / t)),
          u = Math.min(r - 1, Math.floor((o.x + c + t) / t)),
          f = Math.max(0, Math.floor((o.y - c - i) / i)),
          g = Math.min(s - 1, Math.floor((o.y + c + i) / i)),
          m = h * (0 === e ? 0.55 : 0.3);
        for (let s = f; s <= g; s++)
          for (let l = p; l <= u; l++) {
            let h = s * r + l;
            if (a[h]) continue;
            let p = l * t + t / 2 - o.x,
              u = s * i + i / 2 - o.y;
            if (Math.abs(Math.hypot(p, u) - c) > d) continue;
            let f = 1 === e ? "." : directionGlyph(-u, p);
            this.glyphAt(h, f, n.water, m);
          }
      }
    }
  }
  drawBites(e) {
    let { palette: t } = this;
    for (let i of e.bites) {
      let r = this.cellIndex(i.x, i.y);
      if (r < 0) continue;
      let s = (e.time - i.born) / 0.45,
        a = s < 0.35 ? "*" : s < 0.7 ? "+" : ".";
      this.glyphAt(r, a, t.pellet, Math.min(1, 1.6 * t.alpha) * (1 - s * s));
    }
  }
  drawPellets(e) {
    let { cellGlyph: t, palette: i, ch: r } = this;
    for (let s of e.pellets) {
      let a = e.time - s.born;
      if (!s.landed) {
        let e = a / s.landAt,
          n = this.cellIndex(s.x, s.y - (1 - e) * r * 1.5);
        if (n < 0 || t[n]) continue;
        this.glyphAt(
          n,
          e < 0.5 ? "'" : ".",
          i.pellet,
          i.alpha * (0.5 + 0.4 * e),
        );
        continue;
      }
      let n = this.cellIndex(s.x, s.y);
      if (n < 0 || t[n]) continue;
      let o = smoothstep(9, 14, a),
        l = 0.8 + 0.2 * Math.sin(3 * a + s.x);
      this.glyphAt(
        n,
        o > 0.55 ? "." : "o",
        i.pellet,
        i.alpha * l * (1 - 0.85 * o),
      );
    }
  }
  constructor(e) {
    ((this.dpr = 1),
      (this.cw = 8),
      (this.ch = 12),
      (this.cols = 0),
      (this.rows = 0),
      (this.palette = darkPalette),
      (this.styles = new Map()),
      (this.markingCache = new Map()),
      (this.fontFamily = "ui-monospace, SFMono-Regular, Menlo, monospace"),
      (this.energy = new Float32Array(0)),
      (this.energyTmp = new Float32Array(0)),
      (this.cellGlyph = new Uint16Array(0)),
      (this.cellColor = new Uint32Array(0)),
      (this.cellAlpha = new Float32Array(0)),
      (this.cellTile = new Uint32Array(0)),
      (this.cellTileAlpha = new Float32Array(0)),
      (this.cellDim = new Float32Array(0)),
      (this.cellShadow = new Uint8Array(0)),
      (this.spine = new Float32Array(40)),
      (this.arc = new Float32Array(20)),
      (this.arcTotal = 1),
      (this.flareLeft = 1),
      (this.flareRight = 1),
      (this.hit = { flag: 0, across: 1, du: 1, da: 0 }),
      (this.hitS = 0),
      (this.hitV = 0),
      (this.hitDist = 0),
      (this.hitTx = 1),
      (this.hitTy = 0),
      (this.hitSeg = 0));
    let t = e.getContext("2d");
    if (!t) throw Error("2D canvas unavailable");
    this.ctx = t;
  }
}
let STEP_SECONDS = 1 / 60;
class KoiPond {
  destroy() {
    ((this.disposed = !0),
      cancelAnimationFrame(this.raf),
      this.resizeObserver.disconnect(),
      this.intersectionObserver.disconnect(),
      this.reducedMotion.removeEventListener("change", this.schedule),
      window.removeEventListener("pointermove", this.onPointerMove),
      window.removeEventListener("click", this.onClick),
      document.documentElement.removeEventListener(
        "pointerleave",
        this.onPointerLeave,
      ),
      window.removeEventListener("blur", this.onPointerLeave));
  }
  setTheme(e) {
    (this.renderer.setTheme(e), this.reducedMotion.matches && this.drawStill());
  }
  resize() {
    let e = this.canvas.getBoundingClientRect();
    e.width < 1 ||
      e.height < 1 ||
      (this.renderer.resize(
        e.width,
        e.height,
        Math.min(window.devicePixelRatio || 1, 2),
      ),
      this.world.resize(e.width, e.height),
      this.measureContent(),
      this.report(),
      this.reducedMotion.matches && this.drawStill());
  }
  report() {
    let e = this.world.koi.length,
      t = this.world.pellets.length;
    (e !== this.reported.koi || t !== this.reported.pellets) &&
      ((this.reported = { koi: e, pellets: t }), this.onStats(this.reported));
  }
  measureContent() {
    let e = this.canvas.getBoundingClientRect(),
      t = (function (e) {
        let t = [];
        for (let i of [...e].sort((e, t) => e.top - t.top)) {
          let e = t.find(
            (e) =>
              i.top - e.bottom < 160 &&
              i.left - e.right < 160 &&
              e.left - i.right < 160,
          );
          if (!e) {
            t.push({ ...i });
            continue;
          }
          ((e.left = Math.min(e.left, i.left)),
            (e.right = Math.max(e.right, i.right)),
            (e.bottom = Math.max(e.bottom, i.bottom)));
        }
        return t;
      })(
        Array.from(document.querySelectorAll("[data-koi-avoid]"), (t) => {
          let i = t.getBoundingClientRect();
          return {
            left: i.left - e.left,
            top: i.top - e.top,
            right: i.right - e.left,
            bottom: i.bottom - e.top,
          };
        }),
      );
    (this.renderer.setDimBoxes(t), (this.world.avoid = t));
  }
  drawStill() {
    if (this.world.time < 4)
      for (let e = 0; e < 240; e++) this.world.step(STEP_SECONDS);
    (this.measureContent(),
      this.renderer.render(this.world, STEP_SECONDS),
      this.report());
  }
  toLocal(e) {
    let t = this.canvas.getBoundingClientRect(),
      i = e.clientX - t.left,
      r = e.clientY - t.top;
    return {
      x: i,
      y: r,
      inside: i >= 0 && r >= 0 && i <= t.width && r <= t.height,
    };
  }
  constructor(e, t, i) {
    ((this.canvas = e),
      (this.onStats = i),
      (this.world = new KoiWorld()),
      (this.raf = 0),
      (this.last = 0),
      (this.acc = 0),
      (this.frames = 0),
      (this.lastPointerTime = 0),
      (this.reported = { koi: -1, pellets: -1 }),
      (this.visible = !0),
      (this.disposed = !1),
      (this.reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      )),
      (this.resizeObserver = new ResizeObserver(() => this.resize())),
      (this.intersectionObserver = new IntersectionObserver((e) => {
        let [t] = e;
        ((this.visible = t.isIntersecting), this.schedule());
      })),
      (this.schedule = () => {
        if ((cancelAnimationFrame(this.raf), !this.disposed && this.visible)) {
          if (this.reducedMotion.matches) {
            this.drawStill();
            return;
          }
          ((this.last = performance.now()),
            (this.raf = requestAnimationFrame(this.frame)));
        }
      }),
      (this.frame = (e) => {
        let t = Math.min(0.1, (e - this.last) / 1e3);
        ((this.last = e), (this.acc += t));
        let i = 0;
        for (; this.acc >= STEP_SECONDS && i < 4;)
          (this.world.step(STEP_SECONDS), (this.acc -= STEP_SECONDS), i++);
        (4 === i && (this.acc = 0),
          ++this.frames % 30 == 0 && this.measureContent(),
          this.renderer.render(this.world, t),
          this.report(),
          (this.raf = requestAnimationFrame(this.frame)));
      }),
      (this.onPointerMove = (e) => {
        let { x: t, y: i, inside: r } = this.toLocal(e),
          s = this.world.pointer,
          a = Math.max(1, e.timeStamp - this.lastPointerTime) / 1e3,
          n = Math.hypot(t - s.x, i - s.y) / a;
        ((s.speed += (Math.min(n, 5e3) - s.speed) * 0.5),
          (this.lastPointerTime = e.timeStamp),
          (s.x = t),
          (s.y = i),
          (s.active = r && "touch" !== e.pointerType));
      }),
      (this.onClick = (e) => {
        var t;
        if (
          this.reducedMotion.matches ||
          e
            .composedPath()
            .some(
              (e) =>
                e instanceof Element &&
                e.matches(
                  "a, button, input, textarea, select, label, [role='button'], [data-koi-ignore]",
                ),
            ) ||
          document.documentElement.dataset.transition ||
          (null === (t = window.getSelection()) || void 0 === t
            ? void 0
            : t.toString())
        )
          return;
        let { x: i, y: r, inside: s } = this.toLocal(e);
        s && (this.world.feed(i, r), this.report());
      }),
      (this.onPointerLeave = () => {
        ((this.world.pointer.active = !1), (this.world.pointer.speed = 0));
      }),
      (this.renderer = new AsciiRenderer(e)),
      this.renderer.setTheme(t),
      this.resizeObserver.observe(e),
      this.intersectionObserver.observe(e),
      this.reducedMotion.addEventListener("change", this.schedule),
      window.addEventListener("pointermove", this.onPointerMove, {
        passive: !0,
      }),
      window.addEventListener("click", this.onClick),
      document.documentElement.addEventListener(
        "pointerleave",
        this.onPointerLeave,
      ),
      window.addEventListener("blur", this.onPointerLeave),
      this.resize(),
      this.schedule());
  }
}
export { KoiPond };
