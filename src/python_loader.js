(() => {
  var e = {
      d: (n, t) => {
        for (var r in t) e.o(t, r) && !e.o(n, r) && Object.defineProperty(n, r, { enumerable: !0, get: t[r] });
      },
      o: (e, n) => Object.prototype.hasOwnProperty.call(e, n),
    },
    n = {};
  (() => {
    'use strict';
    e.d(n, { default: () => i });
    const t = ['', 'p', 'b', 'n', 'r', 'q', 'k', '', '', 'P', 'B', 'N', 'R', 'Q', 'K'],
      r = ['-', 'q', 'k', 'kq', 'Q', 'Qq', 'Qk', 'Qkq', 'K', 'Kq', 'Kk', 'Kkq', 'KQ', 'KQq', 'KQk', 'KQkq'],
      a = (e) => {
        let n = '',
          a = 0;
        var o;
        return (
          e.slice(0, 64).forEach((e, r) => {
            r > 0 && r % 8 == 0 && (a && (n = `${n}${a}`), (n = `${n}/`), (a = 0)),
              0 !== e ? (a && ((n = `${n}${a}`), (a = 0)), (n = `${n}${t[e]}`)) : (a += 1);
          }),
          a && (n = `${n}${a}`),
          (n = `${n} ${e[64] ? 'w' : 'b'}`),
          (n = `${n} ${r[e[65]]}`),
          (n = `${n} ${e[66] ? ((o = e[66]), `${String.fromCharCode((o % 8) + 97)}${8 - Math.floor(o / 8)}`) : '-'}`),
          `${n} 0 1`
        );
      },
      o = [];
    let l = 0;
    const s = new Array(64).fill(0).reduce(
      (e, n, t) => (
        (e[t] = {}),
        ((e, n, t) => {
          const r = [],
            a = e >>> 3,
            o = 7 & e,
            l = 7 - a,
            s = 7 - o,
            i = e - 9 * Math.min(a, o);
          for (let t = e - 9; t >= i; t -= 9) {
            if (0 !== n[t]) {
              n[t] >>> 3 != 1 && (r[r.length] = t);
              break;
            }
            r[r.length] = t;
          }
          const f = e - 7 * Math.min(a, s);
          for (let t = e - 7; t >= f; t -= 7) {
            if (0 !== n[t]) {
              n[t] >>> 3 != 1 && (r[r.length] = t);
              break;
            }
            r[r.length] = t;
          }
          const c = e + 7 * Math.min(l, o);
          for (let t = e + 7; t <= c; t += 7) {
            if (0 !== n[t]) {
              n[t] >>> 3 != 1 && (r[r.length] = t);
              break;
            }
            r[r.length] = t;
          }
          const h = e + 9 * Math.min(l, s);
          for (let t = e + 9; t <= h; t += 9) {
            if (0 !== n[t]) {
              n[t] >>> 3 != 1 && (r[r.length] = t);
              break;
            }
            r[r.length] = t;
          }
          const u = e - 8 * a;
          for (let t = e - 8; t >= u; t -= 8) {
            if (0 !== n[t]) {
              n[t] >>> 3 != 1 && (r[r.length] = t);
              break;
            }
            r[r.length] = t;
          }
          const g = e + s;
          for (let t = e + 1; t <= g; t += 1) {
            if (0 !== n[t]) {
              n[t] >>> 3 != 1 && (r[r.length] = t);
              break;
            }
            r[r.length] = t;
          }
          const p = e + 8 * l;
          for (let t = e + 8; t <= p; t += 8) {
            if (0 !== n[t]) {
              n[t] >>> 3 != 1 && (r[r.length] = t);
              break;
            }
            r[r.length] = t;
          }
          const m = e - o;
          for (let t = e - 1; t >= m; t -= 1) {
            if (0 !== n[t]) {
              n[t] >>> 3 != 1 && (r[r.length] = t);
              break;
            }
            r[r.length] = t;
          }
          return r;
        })(t, new Array(64).fill(0)).forEach((n) => {
          var r, a;
          (o[l] = [t, n, '']),
            (e[t][n] = { '': l++ }),
            (r = t),
            (a = n),
            [7, 8, 9].includes(Math.abs(r - a)) &&
              ((r >= 8 && r < 16 && a < 8) || (r >= 48 && r < 56 && a >= 56)) &&
              ((o[l] = [t, n, 'n']), (e[t][n].n = l++));
        }),
        ((e, n, t) => {
          const r = [],
            a = e >>> 3,
            o = 7 & e,
            l = o > 1,
            s = l || o > 0,
            i = o < 6,
            f = i || o < 7,
            c = a > 1,
            h = c || a > 0,
            u = a < 6,
            g = u || a < 7;
          if (c) {
            if (s) {
              const t = e - 17;
              (0 !== n[t] && n[t] >>> 3 == 1) || (r[r.length] = t);
            }
            if (f) {
              const t = e - 15;
              (0 !== n[t] && n[t] >>> 3 == 1) || (r[r.length] = t);
            }
          }
          if (u) {
            if (s) {
              const t = e + 15;
              (0 !== n[t] && n[t] >>> 3 == 1) || (r[r.length] = t);
            }
            if (f) {
              const t = e + 17;
              (0 !== n[t] && n[t] >>> 3 == 1) || (r[r.length] = t);
            }
          }
          if (l) {
            if (h) {
              const t = e - 10;
              (0 !== n[t] && n[t] >>> 3 == 1) || (r[r.length] = t);
            }
            if (g) {
              const t = e + 6;
              (0 !== n[t] && n[t] >>> 3 == 1) || (r[r.length] = t);
            }
          }
          if (i) {
            if (h) {
              const t = e - 6;
              (0 !== n[t] && n[t] >>> 3 == 1) || (r[r.length] = t);
            }
            if (g) {
              const t = e + 10;
              (0 !== n[t] && n[t] >>> 3 == 1) || (r[r.length] = t);
            }
          }
          return r;
        })(t, new Array(64).fill(0)).forEach((n) => {
          (o[l] = [t, n, '']), (e[t][n] = { '': l++ });
        }),
        e
      ),
      {},
    );
    (o[l] = [0, 0, '']), (s[0][0] = { '': l++ });
    const i = async ({ tf: e }) => {
      console.log('Loading python model...'), console.log('initialising pg model transforms.');
      const n = ['', 'p', 'b', 'n', 'r', 'q', 'k', '', '', 'P', 'B', 'N', 'R', 'Q', 'K'],
        t = o.map(([e, t, r]) => (e << 10) + t + (r ? n.indexOf(r.toUpperCase()) << 6 : 0)),
        r = (e) => `${i(e >>> 10)}${i(63 & e)}${n[(e >>> 6) & 15]}`,
        l = (e) => ((7 - (e >>> 3)) << 3) + (7 & e),
        s = (e) => {
          const n = 63 & e,
            t = (e >>> 6) & 15,
            r = t ? 8 ^ t : 0;
          return (l(e >>> 10) << 10) + l(n) + (r << 6);
        },
        i = (e) => `${String.fromCharCode((e % 8) + 97)}${8 - Math.floor(e / 8)}`,
        f = (e, n) => 1 / e[n],
        c = ({ fens: n, lmt: t, lmf: r, noTensor: a }) => {
          const o = n.map((e) => {
              if (!e) return Array(64).fill(Array(12).fill(0));
              const [n] = e.split(' '),
                t = [];
              return (
                n.split('').forEach((e) => {
                  switch (e) {
                    case 'p':
                      t.push([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                      break;
                    case 'b':
                      t.push([0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                      break;
                    case 'n':
                      t.push([0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                      break;
                    case 'r':
                      t.push([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
                      break;
                    case 'q':
                      t.push([0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
                      break;
                    case 'k':
                      t.push([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]);
                      break;
                    case 'P':
                      t.push([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
                      break;
                    case 'B':
                      t.push([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]);
                      break;
                    case 'N':
                      t.push([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]);
                      break;
                    case 'R':
                      t.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]);
                      break;
                    case 'Q':
                      t.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]);
                      break;
                    case 'K':
                      t.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
                      break;
                    case '/':
                      break;
                    default:
                      for (let n = 0; n < Number(e); n += 1) t.push(Array(12).fill(0));
                  }
                }),
                t
              );
            }),
            l = new Array(64)
              .fill(0)
              .map((e, n) => [...o.map((e) => e[n]).flat(), f(r, n), f(t, n)])
              .flat();
          return a ? l : e.tensor(l, [1, 8, 8, 14]);
        },
        h = (e) => {
          const n = [],
            t = e.slice();
          for (; t.length; ) n.push(t.splice(-8));
          return n.flat();
        },
        u = (e) => {
          const n = e.toLowerCase(),
            t = e.toUpperCase();
          return e === n ? t : n;
        },
        g = ['K', 'Q', 'k', 'q', '-'],
        p = (e, n) => g.indexOf(e) - g.indexOf(n),
        m = (e, n) => {
          if ((e >>> 6) & 15) return e;
          const t = e >>> 10,
            r = 63 & e;
          return 1 === n[t] && r >= 56 ? e + 320 : 9 === n[t] && r < 8 ? e + 832 : e;
        };
      return {
        predict: async ({ game: e }) => {
          const n = `{MODEL_URL}?input=${(({
              game: { board: e, allPastFens: n, wNext: t, moves: r, lmf: o, lmt: l },
            }) => {
              const s = n && n.length,
                i = s ? [n[s - 1]] : [a(e)];
              if (
                (t ||
                  i.forEach((e, n) => {
                    i[n] &&
                      (i[n] = ((e) => {
                        const [n, t, r, a] = e.split(' ');
                        var o;
                        return `${n.split('/').reverse().join('/').split('').map(u).join('')} ${
                          'w' === t ? 'b' : 'w'
                        } ${r.split('').map(u).sort(p).join('')} ${
                          '-' === (o = a) ? '-' : '3' === o[1] ? `${o[0]}6` : `${o[0]}3`
                        }`;
                      })(e));
                  }),
                o && l)
              )
                return c({ fens: i, lmf: o, lmt: l, noTensor: !0 });
              const f = n.length - 1,
                g = new Array(64).fill(255).map((e, n) => {
                  let t = f;
                  for (; t--; ) if (r[t] >>> 10 === n) return Math.min(255, f - t);
                  return 255;
                }),
                m = new Array(64).fill(255).map((e, n) => {
                  let t = f;
                  for (; t--; ) if ((63 & r[t]) === n) return Math.min(255, f - t);
                  return 255;
                });
              return c({ fens: i, lmf: (t ? (e) => e : h)(g), lmt: (t ? (e) => e : h)(m), noTensor: !0 });
            })({ game: e }).join(',')}`,
            o = await fetch(n);
          return (({ ys: e, game: { wNext: n, nextMoves: a, board: o } }) => {
            const l = e.reduce((e, r, a) => ((e[m(n ? t[a] : s(t[a]), o)] = r), e), {}),
              i = t.reduce((t, a, l) => {
                const i = m(n ? a : s(a), o);
                return (t[r(i)] = e[l]), t;
              }, {}),
              { winningMove: f } = (n ? (e) => e : ({ winningMove: e }) => ({ winningMove: s(e) }))(
                t.reduce((n, t, r) => (e[r] > n.winningValue ? { winningMove: t, winningValue: e[r] } : n), {
                  winningMove: null,
                  winningValue: -1e3,
                }),
              );
            return { winningMoveString: r(f), moveValues: l, moveStringValues: i, ys: e };
          })({ ys: (await o.json()).prediction.split(',').map(Number), game: e });
        },
      };
    };
  })(),
    (loader = n.default);
})();
