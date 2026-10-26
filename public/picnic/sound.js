// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
window.Garden = (() => {
  let t = null,
    r,
    u,
    o = !1;
  const g = { slurp: "sound/slurp.mp3", shutter: "sound/shutter.mp3" },
    f = {},
    A = 0.45;
  function d(e, c, n) {
    const s = t.currentTime + 0.005,
      h = e.value,
      i = new Float32Array(48);
    for (let a = 0; a < i.length; a++) {
      const l = a / (i.length - 1);
      i[a] = h + (c - h) * l * l * (3 - 2 * l);
    }
    (e.cancelAndHoldAtTime
      ? e.cancelAndHoldAtTime(s)
      : e.cancelScheduledValues(s),
      e.setValueCurveAtTime(i, s, n));
  }
  function w() {
    ((t = new (window.AudioContext || window.webkitAudioContext)()),
      (r = t.createGain()),
      (r.gain.value = 0),
      r.connect(t.destination),
      (u = t.createGain()),
      (u.gain.value = 0.8),
      u.connect(t.destination));
    for (const [e, c] of Object.entries(g))
      fetch(c)
        .then((n) => (n.ok ? n.arrayBuffer() : Promise.reject()))
        .then((n) => t.decodeAudioData(n))
        .then((n) => {
          f[e] = n;
        })
        .catch(() => {});
    fetch("sound/garden.mp3")
      .then((e) => (e.ok ? e.arrayBuffer() : Promise.reject()))
      .then((e) => t.decodeAudioData(e))
      .then((e) => {
        const c = t.createBufferSource(),
          n = t.createGain();
        ((c.buffer = e),
          (c.loop = !0),
          (n.gain.value = 0),
          c.connect(n).connect(r),
          c.start(),
          d(n.gain, 1, 5));
      })
      .catch(() => {});
  }
  function m(e) {
    ((o = e),
      o && !t && w(),
      t && (o && t.resume(), d(r.gain, o ? A : 0, o ? 2.5 : 1.2)));
  }
  function v(e, c = 0) {
    if (!o || !t || !f[e]) return;
    const n = t.createBufferSource();
    ((n.buffer = f[e]), n.connect(u), n.start(t.currentTime + c));
  }
  return {
    set: m,
    play: v,
    get on() {
      return o;
    },
  };
})();
