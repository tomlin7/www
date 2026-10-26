// Picnic scene adapted from the public client at https://aarya.wtf/.
// Original WebGL, paper, nature, prop, and animation implementations by Aarya Shah.
// Personal content is generated separately; original analytics and lead collection are removed.
window.Case = (() => {
  const u = Object.fromEntries(
      window.PicnicData.all.map((project) => [
        project.id,
        "/picnic/work/" + project.id + ".html",
      ]),
    ),
    w = (e) => "/picnic/index.html#" + e,
    x = () => {
      const e = location.pathname.match(/^\/work\/([^/.]+)(\.html)?$/);
      return e ? e[1] : location.hash.slice(1);
    };
  let a = null,
    i = null,
    h = !1,
    P = !1,
    p = null;
  const C = (e) => new Promise((o) => setTimeout(o, e)),
    L =
      (e, o) =>
      ({ x: s, y: n, r: c, s: r = 1, l: t = 0 }) => ({
        transform: `translate(${s - e / 2}px, ${n - o / 2}px) rotate(${c}rad) scale(${r * (1 + 0.06 * t)})`,
        filter: `drop-shadow(0 ${2 + 22 * t}px ${3 + 26 * t}px rgba(40, 10, 15, ${0.28 - 0.06 * t}))`,
      });
  function E(e, o) {
    const s = document.createElement("div");
    ((s.id = "fly"),
      (s.style.width = e.w + "px"),
      (s.style.height = e.h + "px"));
    const n = document.createElement("div");
    ((n.className = "card"), s.appendChild(n));
    for (const [c, r] of [
      [o.front, "f"],
      [o.back, "b"],
    ]) {
      if (!c) continue;
      const t = document.createElement("canvas");
      ((t.width = c.width),
        (t.height = c.height),
        (t.className = r),
        t.getContext("2d").drawImage(c, 0, 0),
        n.appendChild(t));
    }
    return (document.body.appendChild(s), s);
  }
  const S = (e) =>
      e &&
      e.x > -e.w &&
      e.x < innerWidth + e.w &&
      e.y > -e.h &&
      e.y < innerHeight + e.h
        ? e
        : null,
    m = (e, o, s) => e.animate(o, { fill: "forwards", ...s }).finished,
    Y = (e, o) => ({ x: e.x, y: e.y, r: e.r, s: e.w / o });
  let k = 0;
  const W = new Set([
      " ",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      "ArrowUp",
      "ArrowDown",
    ]),
    $ = (e) => {
      i && e.preventDefault();
    };
  (addEventListener("wheel", $, { passive: !1 }),
    addEventListener("touchmove", $, { passive: !1 }),
    addEventListener("keydown", (e) => {
      i &&
        W.has(e.key) &&
        !e.target.closest?.("input, textarea") &&
        e.preventDefault();
    }),
    addEventListener("scroll", () => {
      i && Math.abs(scrollY - k) > 0.5 && scrollTo(0, k);
    }));
  const z = () => {
    try {
      a.contentDocument.documentElement.style.overscrollBehavior = "none";
    } catch {}
  };
  async function y(e, o = !0) {
    if (P && u[e]) {
      p = e;
      return;
    }
    if (h || i || !u[e]) return;
    ((h = !0),
      (i = e),
      (k = scrollY),
      location.pathname !== w(e) && history.pushState({ case: e }, "", w(e)));
    const s = window.Picnic ? Picnic.art(e) : {};
    o && s.front && (await Picnic.settle(e));
    const n = o && s.front ? S(Picnic.rect(e)) : null;
    (document.body.classList.add("case"),
      (a = document.createElement("iframe")),
      (a.id = "case"),
      (a.title = "Case study"),
      (a.src = u[e] + "?embed"),
      (a.style.transform = "translateY(105vh)"),
      document.body.appendChild(a));
    const c = Promise.race([
      new Promise((l) => a.addEventListener("load", l, { once: !0 })),
      new Promise((l) => {
        const v = () => {
          try {
            const b = a.contentWindow;
            if (b.Letter && b.document.readyState !== "loading")
              return b.document.fonts.ready.then(l);
          } catch {}
          requestAnimationFrame(v);
        };
        v();
      }),
    ]);
    let r = null,
      t = null,
      d = null;
    (n &&
      ((r = E(n, s)),
      (t = L(n.w, n.h)),
      Picnic.hide(e, !0),
      (d = { x: n.x, y: n.y - 26, r: n.r * 0.5, l: 1 }),
      r.animate([t(n), t(d)], {
        duration: 420,
        easing: "cubic-bezier(.3,1.3,.5,1)",
        fill: "forwards",
      })),
      await c,
      z());
    const f = a.contentWindow.Letter;
    n && f.hideStamp();
    const g = m(
      a,
      [
        { transform: "translateY(105vh) rotate(2.5deg)" },
        { transform: "translateY(0) rotate(0deg)" },
      ],
      { duration: 750, easing: "cubic-bezier(.16,1,.3,1)" },
    );
    if (n) {
      await C(200);
      const l = Y(f.slot(), n.w),
        v = {
          x: (d.x + l.x) / 2,
          y: Math.min(d.y, l.y) - 70,
          r: (d.r + l.r) / 2,
          s: (1 + l.s) / 2 + 0.06,
          l: 1,
        };
      (await m(r, [t(d), t(v), t({ ...l, l: 0.5 })], {
        duration: 600,
        easing: "cubic-bezier(.45,0,.25,1)",
      }),
        await m(
          r,
          [t({ ...l, l: 0.5 }), t({ ...l, s: l.s * 0.97, l: 0 }), t(l)],
          { duration: 150, easing: "ease-out" },
        ),
        f.land(),
        r.remove());
    } else (await g, f.land());
    (await g, a.focus(), (h = !1));
  }
  function T() {
    !i ||
      h ||
      (history.state && history.state.case === i
        ? history.back()
        : (history.replaceState(
            null,
            "",
            "/picnic/index.html" + location.search,
          ),
          A()));
  }
  async function A() {
    if (!i || h) return;
    ((h = !0), (P = !0));
    const e = a.contentWindow.Letter,
      o = i;
    await e.toTop();
    const s = window.Picnic ? Picnic.art(o) : {},
      n = s.front ? S(Picnic.rect(o)) : null;
    let c = null;
    if (n) {
      c = E(n, s);
      const r = L(n.w, n.h),
        t = Y(e.slot(), n.w);
      (c.animate([r(t)], { fill: "forwards" }), e.hideStamp());
      const d = { x: n.x, y: n.y - 26, r: n.r * 0.5, l: 1 },
        f = {
          x: (t.x + d.x) / 2,
          y: Math.min(t.y, d.y) - 70,
          r: (t.r + d.r) / 2,
          s: (t.s + 1) / 2 + 0.06,
          l: 1,
        },
        g = m(
          a,
          [
            { transform: "translateY(0) rotate(0deg)" },
            { transform: "translateY(105vh) rotate(2.5deg)" },
          ],
          { duration: 820, delay: 200, easing: "cubic-bezier(.7,0,.84,0)" },
        );
      (await m(
        c,
        [r({ ...t, l: 0 }), r({ ...t, s: t.s * 1.04, l: 0.8 }), r(f), r(d)],
        { duration: 900, easing: "cubic-bezier(.45,0,.25,1)" },
      ),
        await m(c, [r(d), r({ ...n, l: 0.15 }), r(n)], {
          duration: 300,
          easing: "cubic-bezier(.3,1.2,.5,1)",
        }),
        Picnic.hide(o, !1),
        requestAnimationFrame(() => c.remove()),
        await g);
    } else
      (window.Picnic && Picnic.hide(o, !1),
        await m(
          a,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(105vh) rotate(2.5deg)" },
          ],
          { duration: 700, easing: "cubic-bezier(.7,0,.84,0)" },
        ));
    if (
      (a.remove(),
      (a = null),
      (i = null),
      (h = !1),
      (P = !1),
      document.body.classList.remove("case"),
      p)
    ) {
      const r = p;
      ((p = null), y(r));
    }
  }
  function D(e) {
    !i ||
      h ||
      !u[e] ||
      e === i ||
      (window.Picnic && Picnic.hide(i, !1),
      (i = e),
      history.replaceState({ case: e }, "", w(e)),
      a.addEventListener(
        "load",
        () => {
          (z(),
            a.contentWindow.scrollTo(0, 0),
            a.contentWindow.Letter.land(),
            a.focus());
        },
        { once: !0 },
      ),
      a.contentWindow.location.replace(
        new URL(u[e] + "?embed", location.href).href,
      ));
  }
  if (
    (addEventListener("popstate", () => {
      const e = x();
      i && e !== i ? A() : !i && u[e] && y(e);
    }),
    u[x()])
  ) {
    const e = x();
    history.replaceState(null, "", w(e));
    const o = () =>
      document.body.classList.contains("on")
        ? setTimeout(() => y(e, !1), 600)
        : setTimeout(o, 200);
    addEventListener("load", o);
  }
  return { open: y, close: T, go: D, has: (e) => !!u[e] };
})();
