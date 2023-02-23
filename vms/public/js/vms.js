var Chart = function() {
	"use strict";

    function t(t, e) { return "string" == typeof t ? (e || document).querySelector(t) : t || null }

    function e(t) { var e = t.getBoundingClientRect(); return { top: e.top + (document.documentElement.scrollTop || document.body.scrollTop), left: e.left + (document.documentElement.scrollLeft || document.body.scrollLeft) } }

    function i(t) { var e = t.getBoundingClientRect(); return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth) }

    function n(t) { var e = window.getComputedStyle(t),
            i = parseFloat(e.paddingLeft) + parseFloat(e.paddingRight); return t.clientWidth - i }

    function a(t, e, i) { var n = document.createEvent("HTMLEvents");
        n.initEvent(e, !0, !0); for (var a in i) n[a] = i[a]; return t.dispatchEvent(n) }

    function s(t) { return t.titleHeight + t.margins.top + t.paddings.top }

    function r(t) { return t.margins.left + t.paddings.left }

    function o(t) { return t.margins.top + t.margins.bottom + t.paddings.top + t.paddings.bottom + t.titleHeight + t.legendHeight }

    function l(t) { return t.margins.left + t.margins.right + t.paddings.left + t.paddings.right }

    function u(t) { return parseFloat(t.toFixed(2)) }

    function h(t, e, i) { var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        i || (i = n ? t[0] : t[t.length - 1]); var a = new Array(Math.abs(e)).fill(i); return t = n ? a.concat(t) : t.concat(a) }

    function c(t, e) { return (t + "").length * e }

    function d(t, e) { return { x: Math.sin(t * Vt) * e, y: Math.cos(t * Vt) * e } }

    function p(t, e) { var i = void 0,
            n = void 0; return t <= e ? (i = e - t, n = t) : (i = t - e, n = e), [i, n] }

    function f(t, e) { var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length - t.length; return i > 0 ? t = h(t, i) : e = h(e, i), [t, e] }

    function v(t) { return t > 255 ? 255 : t < 0 ? 0 : t }

    function g(t, e) { var i = Gt(t),
            n = !1; "#" == i[0] && (i = i.slice(1), n = !0); var a = parseInt(i, 16),
            s = v((a >> 16) + e),
            r = v((a >> 8 & 255) + e),
            o = v((255 & a) + e); return (n ? "#" : "") + (o | r << 8 | s << 16).toString(16) }

    function y(t) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t) }

    function m(t, e) { return "string" == typeof t ? (e || document).querySelector(t) : t || null }

    function b(t, e) { var i = document.createElementNS("http://www.w3.org/2000/svg", t); for (var n in e) { var a = e[n]; if ("inside" === n) m(a).appendChild(i);
            else if ("around" === n) { var s = m(a);
                s.parentNode.insertBefore(i, s), i.appendChild(s) } else "styles" === n ? "object" === (void 0 === a ? "undefined" : Dt(a)) && Object.keys(a).map(function(t) { i.style[t] = a[t] }) : ("className" === n && (n = "class"), "innerHTML" === n ? i.textContent = a : i.setAttribute(n, a)) } return i }

    function x(t, e) { return b("linearGradient", { inside: t, id: e, x1: 0, x2: 0, y1: 0, y2: 1 }) }

    function k(t, e, i, n) { return b("stop", { inside: t, style: "stop-color: " + i, offset: e, "stop-opacity": n }) }

    function w(t, e, i, n) { return b("svg", { className: e, inside: t, width: i, height: n }) }

    function A(t) { return b("defs", { inside: t }) }

    function P(t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0,
            n = { className: t, transform: e }; return i && (n.inside = i), b("g", n) }

    function C(t) { return b("path", { className: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", d: t, styles: { stroke: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "none", fill: arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none" } }) }

    function L(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
            s = i.x + t.x,
            r = i.y + t.y,
            o = i.x + e.x,
            l = i.y + e.y; return "M" + i.x + " " + i.y + "\n\t\tL" + s + " " + r + "\n\t\tA " + n + " " + n + " 0 0 " + (a ? 1 : 0) + "\n\t\t" + o + " " + l + " z" }

    function T(t, e) { var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            n = "path-fill-gradient-" + e + "-" + (i ? "lighter" : "default"),
            a = x(t, n),
            s = [1, .6, .2]; return i && (s = [.4, .2, 0]), k(a, "0%", e, s[0]), k(a, "50%", e, s[1]), k(a, "100%", e, s[2]), n }

    function D(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Wt,
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "none"; return b("rect", { className: "percentage-bar", x: t, y: e, width: i, height: n, fill: s, styles: { stroke: g(s, -25), "stroke-dasharray": "0, " + (n + i) + ", " + i + ", " + n, "stroke-width": a } }) }

    function O(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "none",
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
            r = { className: t, x: e, y: i, width: n, height: n, fill: a }; return Object.keys(s).map(function(t) { r[t] = s[t] }), b("rect", r) }

    function M(t, e, i) { var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
            a = arguments[4],
            s = { className: "legend-bar", x: 0, y: 0, width: i, height: "2px", fill: n },
            r = b("text", { className: "legend-dataset-text", x: 0, y: 0, dy: 2 * Jt + "px", "font-size": 1.2 * Jt + "px", "text-anchor": "start", fill: $t, innerHTML: a }),
            o = b("g", { transform: "translate(" + t + ", " + e + ")" }); return o.appendChild(b("rect", s)), o.appendChild(r), o }

    function N(t, e, i) { var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
            a = arguments[4],
            s = { className: "legend-dot", cx: 0, cy: 0, r: i, fill: n },
            r = b("text", { className: "legend-dataset-text", x: 0, y: 0, dx: Jt + "px", dy: Jt / 3 + "px", "font-size": 1.2 * Jt + "px", "text-anchor": "start", fill: $t, innerHTML: a }),
            o = b("g", { transform: "translate(" + t + ", " + e + ")" }); return o.appendChild(b("circle", s)), o.appendChild(r), o }

    function E(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            s = a.fontSize || Jt; return b("text", { className: t, x: e, y: i, dy: (void 0 !== a.dy ? a.dy : s / 2) + "px", "font-size": s + "px", fill: a.fill || $t, "text-anchor": a.textAnchor || "start", innerHTML: n }) }

    function S(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
        a.stroke || (a.stroke = Kt); var s = b("line", { className: "line-vertical " + a.className, x1: 0, x2: 0, y1: i, y2: n, styles: { stroke: a.stroke } }),
            r = b("text", { x: 0, y: i > n ? i + Xt : i - Xt - Jt, dy: Jt + "px", "font-size": Jt + "px", "text-anchor": "middle", innerHTML: e + "" }),
            o = b("g", { transform: "translate(" + t + ", 0)" }); return o.appendChild(s), o.appendChild(r), o }

    function _(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
        a.stroke || (a.stroke = Kt), a.lineType || (a.lineType = ""); var s = b("line", { className: "line-horizontal " + a.className + ("dashed" === a.lineType ? "dashed" : ""), x1: i, x2: n, y1: 0, y2: 0, styles: { stroke: a.stroke } }),
            r = b("text", { x: i < n ? i - Xt : i + Xt, y: 0, dy: Jt / 2 - 2 + "px", "font-size": Jt + "px", "text-anchor": i < n ? "end" : "start", innerHTML: e + "" }),
            o = b("g", { transform: "translate(0, " + t + ")", "stroke-opacity": 1 }); return 0 !== r && "0" !== r || (o.style.stroke = "rgba(27, 31, 35, 0.6)"), o.appendChild(s), o.appendChild(r), o }

    function z(t, e, i) { var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        n.pos || (n.pos = "left"), n.offset || (n.offset = 0), n.mode || (n.mode = "span"), n.stroke || (n.stroke = Kt), n.className || (n.className = ""); var a = -1 * qt,
            s = "span" === n.mode ? i + qt : 0; return "tick" === n.mode && "right" === n.pos && (a = i + qt, s = i), a += n.offset, s += n.offset, _(t, e, a, s, { stroke: n.stroke, className: n.className, lineType: n.lineType }) }

    function H(t, e, i) { var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        n.pos || (n.pos = "bottom"), n.offset || (n.offset = 0), n.mode || (n.mode = "span"), n.stroke || (n.stroke = Kt), n.className || (n.className = ""); var a = i + qt,
            s = "span" === n.mode ? -1 * qt : i; return "tick" === n.mode && "top" === n.pos && (a = -1 * qt, s = 0), S(t, e, a, s, { stroke: n.stroke, className: n.className, lineType: n.lineType }) }

    function F(t, e, i) { var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        n.labelPos || (n.labelPos = "right"); var a = b("text", { className: "chart-label", x: "left" === n.labelPos ? Xt : i - c(e, 5) - Xt, y: 0, dy: Jt / -2 + "px", "font-size": Jt + "px", "text-anchor": "start", innerHTML: e + "" }),
            s = _(t, "", 0, i, { stroke: n.stroke || Kt, className: n.className || "", lineType: n.lineType }); return s.appendChild(a), s }

    function j(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            s = t - e,
            r = b("rect", { className: "bar mini", styles: { fill: "rgba(228, 234, 239, 0.49)", stroke: Kt, "stroke-dasharray": i + ", " + s }, x: 0, y: 0, width: i, height: s });
        a.labelPos || (a.labelPos = "right"); var o = b("text", { className: "chart-label", x: "left" === a.labelPos ? Xt : i - c(n + "", 4.5) - Xt, y: 0, dy: Jt / -2 + "px", "font-size": Jt + "px", "text-anchor": "start", innerHTML: n + "" }),
            l = b("g", { transform: "translate(0, " + e + ")" }); return l.appendChild(r), l.appendChild(o), l }

    function W(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
            r = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
            o = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {},
            l = p(e, o.zeroLine),
            u = _t(l, 2),
            h = u[0],
            c = u[1];
        c -= r, 0 === h && (h = o.minHeight, c -= o.minHeight); var d = b("rect", { className: "bar mini", style: "fill: " + n, "data-point-index": s, x: t, y: c, width: i, height: h }); if ((a += "") || a.length) { d.setAttribute("y", 0), d.setAttribute("x", 0); var f = b("text", { className: "data-point-value", x: i / 2, y: 0, dy: Jt / 2 * -1 + "px", "font-size": Jt + "px", "text-anchor": "middle", innerHTML: a }),
                v = b("g", { "data-point-index": s, transform: "translate(" + t + ", " + c + ")" }); return v.appendChild(d), v.appendChild(f), v } return d }

    function I(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
            r = b("circle", { style: "fill: " + n, "data-point-index": s, cx: t, cy: e, r: i }); if ((a += "") || a.length) { r.setAttribute("cy", 0), r.setAttribute("cx", 0); var o = b("text", { className: "data-point-value", x: 0, y: 0, dy: Jt / 2 * -1 - i + "px", "font-size": Jt + "px", "text-anchor": "middle", innerHTML: a }),
                l = b("g", { "data-point-index": s, transform: "translate(" + t + ", " + e + ")" }); return l.appendChild(r), l.appendChild(o), l } return r }

    function R(t, e, i) { var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            s = e.map(function(e, i) { return t[i] + "," + e }).join("L"),
            r = C("M" + s, "line-graph-path", i); if (n.heatline) { var o = T(a.svgDefs, i);
            r.style.stroke = "url(#" + o + ")" } var l = { path: r }; if (n.regionFill) { var u = T(a.svgDefs, i, !0),
                h = "M" + t[0] + "," + a.zeroLine + "L" + s + "L" + t.slice(-1)[0] + "," + a.zeroLine;
            l.region = C(h, "region-fill", "none", "url(#" + u + ")") } return l }

    function Y(t, e, i, n) { var a = "string" == typeof e ? e : e.join(", "); return [t, { transform: i.join(", ") }, n, ae, "translate", { transform: a }] }

    function V(t, e, i) { return Y(t, [i, 0], [e, 0], ie) }

    function B(t, e, i) { return Y(t, [0, i], [0, e], ie) }

    function U(t, e, i, n) { var a = e - i,
            s = t.childNodes[0]; return [
            [s, { height: a, "stroke-dasharray": s.getAttribute("width") + ", " + a }, ie, ae], Y(t, [0, n], [0, i], ie)
        ] }

    function G(t, e, i, n) { var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
            s = p(i, (arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {}).zeroLine),
            r = _t(s, 2),
            o = r[0],
            l = r[1]; return l -= a, "rect" !== t.nodeName ? [
            [t.childNodes[0], { width: n, height: o }, te, ae], Y(t, t.getAttribute("transform").split("(")[1].slice(0, -1), [e, l], ie)
        ] : [
            [t, { width: n, height: o, x: e, y: l }, te, ae]
        ] }

    function q(t, e, i) { return "circle" !== t.nodeName ? [Y(t, t.getAttribute("transform").split("(")[1].slice(0, -1), [e, i], ie)] : [
            [t, { cx: e, cy: i }, te, ae]
        ] }

    function X(t, e, i, n) { var a = [],
            s = i.map(function(t, i) { return e[i] + "," + t }).join("L"),
            r = [t.path, { d: "M" + s }, ee, ae]; if (a.push(r), t.region) { var o = e[0] + "," + n + "L",
                l = "L" + e.slice(-1)[0] + ", " + n,
                u = [t.region, { d: "M" + o + s + l }, ee, ae];
            a.push(u) } return a }

    function J(t, e) { return [t, { d: e }, te, ae] }

    function K(t, e, i) { var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "linear",
            a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : void 0,
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
            r = t.cloneNode(!0),
            o = t.cloneNode(!0); for (var l in e) { var u = void 0;
            u = "transform" === l ? document.createElementNS("http://www.w3.org/2000/svg", "animateTransform") : document.createElementNS("http://www.w3.org/2000/svg", "animate"); var h = s[l] || t.getAttribute(l),
                c = e[l],
                d = { attributeName: l, from: h, to: c, begin: "0s", dur: i / 1e3 + "s", values: h + ";" + c, keySplines: se[n], keyTimes: "0;1", calcMode: "spline", fill: "freeze" };
            a && (d.type = a); for (var p in d) u.setAttribute(p, d[p]);
            r.appendChild(u), a ? o.setAttribute(l, "translate(" + c + ")") : o.setAttribute(l, c) } return [r, o] }

    function $(t, e) { t.style.transform = e, t.style.webkitTransform = e, t.style.msTransform = e, t.style.mozTransform = e, t.style.oTransform = e }

    function Q(t, e) { var i = [],
            n = [];
        e.map(function(t) { var e = t[0],
                a = e.parentNode,
                s = void 0,
                r = void 0;
            t[0] = e; var o = K.apply(void 0, zt(t)),
                l = _t(o, 2);
            s = l[0], r = l[1], i.push(r), n.push([s, a]), a.replaceChild(s, e) }); var a = t.cloneNode(!0); return n.map(function(t, n) { t[1].replaceChild(i[n], t[0]), e[n][0] = i[n] }), a }

    function Z(t, e, i) { if (0 !== i.length) { var n = Q(e, i);
            e.parentNode == t && (t.removeChild(e), t.appendChild(n)), setTimeout(function() { n.parentNode == t && (t.removeChild(n), t.appendChild(e)) }, ne) } }

    function tt(t, e) { var i = document.createElement("a");
        i.style = "display: none"; var n = new Blob(e, { type: "image/svg+xml; charset=utf-8" }),
            a = window.URL.createObjectURL(n);
        i.href = a, i.download = t, document.body.appendChild(i), i.click(), setTimeout(function() { document.body.removeChild(i), window.URL.revokeObjectURL(a) }, 300) }

    function et(e) { var i = e.cloneNode(!0);
        i.classList.add("chart-container"), i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"); var n = t.create("style", { innerHTML: re });
        i.insertBefore(n, i.firstChild); var a = t.create("div"); return a.appendChild(i), a.innerHTML }

    function it(t) { var e = new Date(t); return e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e }

    function nt(t) { var e = t.getDate(),
            i = t.getMonth() + 1; return [t.getFullYear(), (i > 9 ? "" : "0") + i, (e > 9 ? "" : "0") + e].join("-") }

    function at(t) { return new Date(t.getTime()) }

    function st(t, e) { var i = ht(t); return Math.ceil(rt(i, e) / he) }

    function rt(t, e) { var i = de * ce; return (it(e) - it(t)) / i }

    function ot(t, e) { return t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear() }

    function lt(t) { var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            i = pe[t]; return e ? i.slice(0, 3) : i }

    function ut(t, e) { return new Date(e, t + 1, 0) }

    function ht(t) { var e = at(t),
            i = e.getDay(); return 0 !== i && ct(e, -1 * i), e }

    function ct(t, e) { t.setDate(t.getDate() + e) }

    function dt(t, e, i) { var n = Object.keys(ge).filter(function(e) { return t.includes(e) }),
            a = ge[n[0]]; return Object.assign(a, { constants: e, getData: i }), new ve(a) }

    function pt(t) { if (0 === t) return [0, 0]; if (isNaN(t)) return { mantissa: -6755399441055744, exponent: 972 }; var e = t > 0 ? 1 : -1; if (!isFinite(t)) return { mantissa: 4503599627370496 * e, exponent: 972 };
        t = Math.abs(t); var i = Math.floor(Math.log10(t)); return [e * (t / Math.pow(10, i)), i] }

    function ft(t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            i = Math.ceil(t),
            n = Math.floor(e),
            a = i - n,
            s = a,
            r = 1;
        a > 5 && (a % 2 != 0 && (a = ++i - n), s = a / 2, r = 2), a <= 2 && (r = a / (s = 4)), 0 === a && (s = 5, r = 1); for (var o = [], l = 0; l <= s; l++) o.push(n + r * l); return o }

    function vt(t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            i = pt(t),
            n = _t(i, 2),
            a = n[0],
            s = n[1],
            r = e ? e / Math.pow(10, s) : 0,
            o = ft(a = a.toFixed(6), r); return o = o.map(function(t) { return t * Math.pow(10, s) }) }

    function gt(t) {
        function e(t, e) { for (var i = vt(t), n = i[1] - i[0], a = 0, s = 1; a < e; s++) a += n, i.unshift(-1 * a); return i } var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = Math.max.apply(Math, zt(t)),
            a = Math.min.apply(Math, zt(t)),
            s = []; if (n >= 0 && a >= 0) pt(n)[1], s = i ? vt(n, a) : vt(n);
        else if (n > 0 && a < 0) { var r = Math.abs(a);
            n >= r ? (pt(n)[1], s = e(n, r)) : (pt(r)[1], s = e(r, n).map(function(t) { return -1 * t })) } else if (n <= 0 && a <= 0) { var o = Math.abs(a),
                l = Math.abs(n);
            pt(o)[1], s = (s = i ? vt(o, l) : vt(o)).reverse().map(function(t) { return -1 * t }) } return s }

    function yt(t) { var e = mt(t); return t.indexOf(0) >= 0 ? t.indexOf(0) : t[0] > 0 ? -1 * t[0] / e : -1 * t[t.length - 1] / e + (t.length - 1) }

    function mt(t) { return t[1] - t[0] }

    function bt(t) { return t[t.length - 1] - t[0] }

    function xt(t, e) { return u(e.zeroLine - t * e.scaleMultiplier) }

    function kt(t, e) { var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            n = e.reduce(function(e, i) { return Math.abs(i - t) < Math.abs(e - t) ? i : e }); return i ? e.indexOf(n) : n }

    function wt(t, e) { for (var i = Math.max.apply(Math, zt(t)), n = 1 / (e - 1), a = [], s = 0; s < e; s++) { var r = i * (n * s);
            a.push(r) } return a }

    function At(t, e) { return e.filter(function(e) { return e < t }).length }

    function Pt(t, e) { t.labels = t.labels || []; var i = t.labels.length,
            n = t.datasets,
            a = new Array(i).fill(0); return n || (n = [{ values: a }]), n.map(function(t) { if (t.values) { var n = t.values;
                n = (n = n.map(function(t) { return isNaN(t) ? 0 : t })).length > i ? n.slice(0, i) : h(n, i - n.length, 0) } else t.values = a;
            t.chartType || (jt.includes(e), t.chartType = e) }), t.yRegions && t.yRegions.map(function(t) { if (t.end < t.start) { var e = [t.end, t.start];
                t.start = e[0], t.end = e[1] } }), t }

    function Ct(t) { var e = t.labels.length,
            i = new Array(e).fill(0),
            n = { labels: t.labels.slice(0, -1), datasets: t.datasets.map(function(t) { return { name: "", values: i.slice(0, -1), chartType: t.chartType } }) }; return t.yMarkers && (n.yMarkers = [{ value: 0, label: "" }]), t.yRegions && (n.yRegions = [{ start: 0, end: 0, label: "" }]), n }

    function Lt(t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
            n = t / e.length;
        n <= 0 && (n = 1); var a = n / It; return e.map(function(t, e) { return (t += "").length > a && (i ? e % Math.ceil(t.length / a) != 0 && (t = "") : t = a - 3 > 0 ? t.slice(0, a - 3) + " ..." : t.slice(0, a) + ".."), t }) }

    function Tt() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "line",
            e = arguments[1],
            i = arguments[2]; return "axis-mixed" === t ? (i.type = "line", new xe(e, i)) : ke[t] ? new ke[t](e, i) : void console.error("Undefined chart type: " + t) }! function(t, e) { void 0 === e && (e = {}); var i = e.insertAt; if (t && "undefined" != typeof document) { var n = document.head || document.getElementsByTagName("head")[0],
                a = document.createElement("style");
            a.type = "text/css", "top" === i && n.firstChild ? n.insertBefore(a, n.firstChild) : n.appendChild(a), a.styleSheet ? a.styleSheet.cssText = t : a.appendChild(document.createTextNode(t)) } }('.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:1;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}', {}); var Dt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t },
        Ot = (function() {
            function t(t) { this.value = t }

            function e(e) {
                function i(t, e) { return new Promise(function(i, a) { var o = { key: t, arg: e, resolve: i, reject: a, next: null };
                        r ? r = r.next = o : (s = r = o, n(t, e)) }) }

                function n(i, s) { try { var r = e[i](s),
                            o = r.value;
                        o instanceof t ? Promise.resolve(o.value).then(function(t) { n("next", t) }, function(t) { n("throw", t) }) : a(r.done ? "return" : "normal", r.value) } catch (t) { a("throw", t) } }

                function a(t, e) { switch (t) {
                        case "return":
                            s.resolve({ value: e, done: !0 }); break;
                        case "throw":
                            s.reject(e); break;
                        default:
                            s.resolve({ value: e, done: !1 }) }(s = s.next) ? n(s.key, s.arg): r = null } var s, r;
                this._invoke = i, "function" != typeof e.return && (this.return = void 0) } "function" == typeof Symbol && Symbol.asyncIterator && (e.prototype[Symbol.asyncIterator] = function() { return this }), e.prototype.next = function(t) { return this._invoke("next", t) }, e.prototype.throw = function(t) { return this._invoke("throw", t) }, e.prototype.return = function(t) { return this._invoke("return", t) } }(), function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }),
        Mt = function() {
            function t(t, e) { for (var i = 0; i < e.length; i++) { var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n) } } return function(e, i, n) { return i && t(e.prototype, i), n && t(e, n), e } }(),
        Nt = function t(e, i, n) { null === e && (e = Function.prototype); var a = Object.getOwnPropertyDescriptor(e, i); if (void 0 === a) { var s = Object.getPrototypeOf(e); return null === s ? void 0 : t(s, i, n) } if ("value" in a) return a.value; var r = a.get; if (void 0 !== r) return r.call(n) },
        Et = function(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e) },
        St = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e },
        _t = function() {
            function t(t, e) { var i = [],
                    n = !0,
                    a = !1,
                    s = void 0; try { for (var r, o = t[Symbol.iterator](); !(n = (r = o.next()).done) && (i.push(r.value), !e || i.length !== e); n = !0); } catch (t) { a = !0, s = t } finally { try {!n && o.return && o.return() } finally { if (a) throw s } } return i } return function(e, i) { if (Array.isArray(e)) return e; if (Symbol.iterator in Object(e)) return t(e, i); throw new TypeError("Invalid attempt to destructure non-iterable instance") } }(),
        zt = function(t) { if (Array.isArray(t)) { for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e]; return i } return Array.from(t) };
    t.create = function(e, i) { var n = document.createElement(e); for (var a in i) { var s = i[a]; if ("inside" === a) t(s).appendChild(n);
            else if ("around" === a) { var r = t(s);
                r.parentNode.insertBefore(n, r), n.appendChild(r) } else "styles" === a ? "object" === (void 0 === s ? "undefined" : Dt(s)) && Object.keys(s).map(function(t) { n.style[t] = s[t] }) : a in n ? n[a] = s : n.setAttribute(a, s) } return n }; var Ht = { margins: { top: 10, bottom: 10, left: 20, right: 20 }, paddings: { top: 20, bottom: 40, left: 30, right: 10 }, baseHeight: 240, titleHeight: 20, legendHeight: 30, titleFontSize: 12 },
        Ft = 700,
        jt = ["line", "bar"],
        Wt = 2,
        It = 7,
        Rt = ["light-blue", "blue", "violet", "red", "orange", "yellow", "green", "light-green", "purple", "magenta", "light-grey", "dark-grey"],
        Yt = { bar: Rt, line: Rt, pie: Rt, percentage: Rt, heatmap: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"] },
        Vt = Math.PI / 180,
        Bt = function() {
            function e(t) { var i = t.parent,
                    n = void 0 === i ? null : i,
                    a = t.colors,
                    s = void 0 === a ? [] : a;
                Ot(this, e), this.parent = n, this.colors = s, this.titleName = "", this.titleValue = "", this.listValues = [], this.titleValueFirst = 0, this.x = 0, this.y = 0, this.top = 0, this.left = 0, this.setup() } return Mt(e, [{ key: "setup", value: function() { this.makeTooltip() } }, { key: "refresh", value: function() { this.fill(), this.calcPosition() } }, { key: "makeTooltip", value: function() { var e = this;
                    this.container = t.create("div", { inside: this.parent, className: "graph-svg-tip comparison", innerHTML: '<span class="title"></span>\n\t\t\t\t<ul class="data-point-list"></ul>\n\t\t\t\t<div class="svg-pointer"></div>' }), this.hideTip(), this.title = this.container.querySelector(".title"), this.dataPointList = this.container.querySelector(".data-point-list"), this.parent.addEventListener("mouseleave", function() { e.hideTip() }) } }, { key: "fill", value: function() { var e = this,
                        i = void 0;
                    this.index && this.container.setAttribute("data-point-index", this.index), i = this.titleValueFirst ? "<strong>" + this.titleValue + "</strong>" + this.titleName : this.titleName + "<strong>" + this.titleValue + "</strong>", this.title.innerHTML = i, this.dataPointList.innerHTML = "", this.listValues.map(function(i, n) { var a = e.colors[n] || "black",
                            s = 0 === i.formatted || i.formatted ? i.formatted : i.value,
                            r = t.create("li", { styles: { "border-top": "3px solid " + a }, innerHTML: '<strong style="display: block;">' + (0 === s || s ? s : "") + "</strong>\n\t\t\t\t\t" + (i.title ? i.title : "") });
                        e.dataPointList.appendChild(r) }) } }, { key: "calcPosition", value: function() { var t = this.container.offsetWidth;
                    this.top = this.y - this.container.offsetHeight - 5, this.left = this.x - t / 2; var e = this.parent.offsetWidth - t,
                        i = this.container.querySelector(".svg-pointer"); if (this.left < 0) i.style.left = "calc(50% - " + -1 * this.left + "px)", this.left = 0;
                    else if (this.left > e) { var n = "calc(50% + " + (this.left - e) + "px)";
                        i.style.left = n, this.left = e } else i.style.left = "50%" } }, { key: "setValues", value: function(t, e) { var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
                        a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : -1;
                    this.titleName = i.name, this.titleValue = i.value, this.listValues = n, this.x = t, this.y = e, this.titleValueFirst = i.valueFirst || 0, this.index = a, this.refresh() } }, { key: "hideTip", value: function() { this.container.style.top = "0px", this.container.style.left = "0px", this.container.style.opacity = "0" } }, { key: "showTip", value: function() { this.container.style.top = this.top + "px", this.container.style.left = this.left + "px", this.container.style.opacity = "1" } }]), e }(),
        Ut = { "light-blue": "#7cd6fd", blue: "#5e64ff", violet: "#743ee2", red: "#ff5858", orange: "#ffa00a", yellow: "#feef72", green: "#28a745", "light-green": "#98d85b", purple: "#b554ff", magenta: "#ffa3ef", black: "#36114C", grey: "#bdd3e6", "light-grey": "#f0f4f7", "dark-grey": "#b8c2cc" },
        Gt = function(t) { return Ut[t] || t },
        qt = 6,
        Xt = 4,
        Jt = 10,
        Kt = "#dadada",
        $t = "#555b51",
        Qt = { bar: function(t) { var e = void 0; "rect" !== t.nodeName && (e = t.getAttribute("transform"), t = t.childNodes[0]); var i = t.cloneNode(); return i.style.fill = "#000000", i.style.opacity = "0.4", e && i.setAttribute("transform", e), i }, dot: function(t) { var e = void 0; "circle" !== t.nodeName && (e = t.getAttribute("transform"), t = t.childNodes[0]); var i = t.cloneNode(),
                    n = t.getAttribute("r"),
                    a = t.getAttribute("fill"); return i.setAttribute("r", parseInt(n) + 4), i.setAttribute("fill", a), i.style.opacity = "0.6", e && i.setAttribute("transform", e), i }, heat_square: function(t) { var e = void 0; "circle" !== t.nodeName && (e = t.getAttribute("transform"), t = t.childNodes[0]); var i = t.cloneNode(),
                    n = t.getAttribute("r"),
                    a = t.getAttribute("fill"); return i.setAttribute("r", parseInt(n) + 4), i.setAttribute("fill", a), i.style.opacity = "0.6", e && i.setAttribute("transform", e), i } },
        Zt = { bar: function(t, e) { var i = void 0; "rect" !== t.nodeName && (i = t.getAttribute("transform"), t = t.childNodes[0]); var n = ["x", "y", "width", "height"];
                Object.values(t.attributes).filter(function(t) { return n.includes(t.name) && t.specified }).map(function(t) { e.setAttribute(t.name, t.nodeValue) }), i && e.setAttribute("transform", i) }, dot: function(t, e) { var i = void 0; "circle" !== t.nodeName && (i = t.getAttribute("transform"), t = t.childNodes[0]); var n = ["cx", "cy"];
                Object.values(t.attributes).filter(function(t) { return n.includes(t.name) && t.specified }).map(function(t) { e.setAttribute(t.name, t.nodeValue) }), i && e.setAttribute("transform", i) }, heat_square: function(t, e) { var i = void 0; "circle" !== t.nodeName && (i = t.getAttribute("transform"), t = t.childNodes[0]); var n = ["cx", "cy"];
                Object.values(t.attributes).filter(function(t) { return n.includes(t.name) && t.specified }).map(function(t) { e.setAttribute(t.name, t.nodeValue) }), i && e.setAttribute("transform", i) } },
        te = 350,
        ee = 350,
        ie = te,
        ne = 250,
        ae = "easein",
        se = { ease: "0.25 0.1 0.25 1", linear: "0 0 1 1", easein: "0.1 0.8 0.2 1", easeout: "0 0 0.58 1", easeinout: "0.42 0 0.58 1" },
        re = ".chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}",
        oe = void 0,
        le = function() {
            function e(t, i) { if (Ot(this, e), this.parent = "string" == typeof t ? document.querySelector(t) : t, !(this.parent instanceof HTMLElement)) throw new Error("No `parent` element to render on was provided.");
                this.rawChartArgs = i, this.title = i.title || "", this.type = i.type || "", this.realData = this.prepareData(i.data), this.data = this.prepareFirstData(this.realData), this.colors = this.validateColors(i.colors, this.type), this.config = { showTooltip: 1, showLegend: 1, isNavigable: i.isNavigable || 0, animate: 1 }, this.measures = JSON.parse(JSON.stringify(Ht)); var n = this.measures;
                this.setMeasures(i), this.title.length || (n.titleHeight = 0), this.config.showLegend || (n.legendHeight = 0), this.argHeight = i.height || n.baseHeight, this.state = {}, this.options = {}, this.initTimeout = Ft, this.config.isNavigable && (this.overlays = []), this.configure(i) } return Mt(e, [{ key: "prepareData", value: function(t) { return t } }, { key: "prepareFirstData", value: function(t) { return t } }, { key: "validateColors", value: function(t, e) { var i = []; return (t = (t || []).concat(Yt[e])).forEach(function(t) { var e = Gt(t);
                        y(e) ? i.push(e) : console.warn('"' + t + '" is not a valid color.') }), i } }, { key: "setMeasures", value: function() {} }, { key: "configure", value: function() { var t = this.argHeight;
                    this.baseHeight = t, this.height = t - o(this.measures), oe = this.boundDrawFn.bind(this), window.addEventListener("resize", oe), window.addEventListener("orientationchange", this.boundDrawFn.bind(this)) } }, { key: "boundDrawFn", value: function() { this.draw(!0) } }, { key: "unbindWindowEvents", value: function() { window.removeEventListener("resize", oe), window.removeEventListener("orientationchange", this.boundDrawFn.bind(this)) } }, { key: "setup", value: function() { this.makeContainer(), this.updateWidth(), this.makeTooltip(), this.draw(!1, !0) } }, { key: "makeContainer", value: function() { this.parent.innerHTML = ""; var e = { inside: this.parent, className: "chart-container" };
                    this.independentWidth && (e.styles = { width: this.independentWidth + "px" }), this.container = t.create("div", e) } }, { key: "makeTooltip", value: function() { this.tip = new Bt({ parent: this.container, colors: this.colors }), this.bindTooltip() } }, { key: "bindTooltip", value: function() {} }, { key: "draw", value: function() { var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this.updateWidth(), this.calc(e), this.makeChartArea(), this.setupComponents(), this.components.forEach(function(e) { return e.setup(t.drawArea) }), this.render(this.components, !1), i && (this.data = this.realData, setTimeout(function() { t.update(t.data) }, this.initTimeout)), this.renderLegend(), this.setupNavigation(i) } }, { key: "calc", value: function() {} }, { key: "updateWidth", value: function() { this.baseWidth = n(this.parent), this.width = this.baseWidth - l(this.measures) } }, { key: "makeChartArea", value: function() { this.svg && this.container.removeChild(this.svg); var t = this.measures;
                    this.svg = w(this.container, "frappe-chart chart", this.baseWidth, this.baseHeight), this.svgDefs = A(this.svg), this.title.length && (this.titleEL = E("title", t.margins.left, t.margins.top, this.title, { fontSize: t.titleFontSize, fill: "#666666", dy: t.titleFontSize })); var e = s(t);
                    this.drawArea = P(this.type + "-chart chart-draw-area", "translate(" + r(t) + ", " + e + ")"), this.config.showLegend && (e += this.height + t.paddings.bottom, this.legendArea = P("chart-legend", "translate(" + r(t) + ", " + e + ")")), this.title.length && this.svg.appendChild(this.titleEL), this.svg.appendChild(this.drawArea), this.config.showLegend && this.svg.appendChild(this.legendArea), this.updateTipOffset(r(t), s(t)) } }, { key: "updateTipOffset", value: function(t, e) { this.tip.offset = { x: t, y: e } } }, { key: "setupComponents", value: function() { this.components = new Map } }, { key: "update", value: function(t) { t || console.error("No data to update."), this.data = this.prepareData(t), this.calc(), this.render() } }, { key: "render", value: function() { var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.components,
                        i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    this.config.isNavigable && this.overlays.map(function(t) { return t.parentNode.removeChild(t) }); var n = [];
                    e.forEach(function(t) { n = n.concat(t.update(i)) }), n.length > 0 ? (Z(this.container, this.svg, n), setTimeout(function() { e.forEach(function(t) { return t.make() }), t.updateNav() }, 400)) : (e.forEach(function(t) { return t.make() }), this.updateNav()) } }, { key: "updateNav", value: function() { this.config.isNavigable && (this.makeOverlay(), this.bindUnits()) } }, { key: "renderLegend", value: function() {} }, { key: "setupNavigation", value: function() { var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.config.isNavigable && e && (this.bindOverlay(), this.keyActions = { 13: this.onEnterKey.bind(this), 37: this.onLeftArrow.bind(this), 38: this.onUpArrow.bind(this), 39: this.onRightArrow.bind(this), 40: this.onDownArrow.bind(this) }, document.addEventListener("keydown", function(e) { i(t.container) && (e = e || window.event, t.keyActions[e.keyCode] && t.keyActions[e.keyCode]()) })) } }, { key: "makeOverlay", value: function() {} }, { key: "updateOverlay", value: function() {} }, { key: "bindOverlay", value: function() {} }, { key: "bindUnits", value: function() {} }, { key: "onLeftArrow", value: function() {} }, { key: "onRightArrow", value: function() {} }, { key: "onUpArrow", value: function() {} }, { key: "onDownArrow", value: function() {} }, { key: "onEnterKey", value: function() {} }, { key: "addDataPoint", value: function() {} }, { key: "removeDataPoint", value: function() {} }, { key: "getDataPoint", value: function() {} }, { key: "setCurrentDataPoint", value: function() {} }, { key: "updateDataset", value: function() {} }, { key: "export", value: function() { var t = et(this.svg);
                    tt(this.title || "Chart", [t]) } }]), e }(),
        ue = function(t) {
            function e(t, i) { return Ot(this, e), St(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)) } return Et(e, t), Mt(e, [{ key: "configure", value: function(t) { Nt(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t), this.config.maxSlices = t.maxSlices || 20, this.config.maxLegendPoints = t.maxLegendPoints || 20 } }, { key: "calc", value: function() { var t = this,
                        e = this.state,
                        i = this.config.maxSlices;
                    e.sliceTotals = []; var n = this.data.labels.map(function(e, i) { var n = 0; return t.data.datasets.map(function(t) { n += t.values[i] }), [n, e] }).filter(function(t) { return t[0] >= 0 }),
                        a = n; if (n.length > i) { n.sort(function(t, e) { return e[0] - t[0] }), a = n.slice(0, i - 1); var s = 0;
                        n.slice(i - 1).map(function(t) { s += t[0] }), a.push([s, "Rest"]), this.colors[i - 1] = "grey" } e.labels = [], a.map(function(t) { e.sliceTotals.push(t[0]), e.labels.push(t[1]) }), e.grandTotal = e.sliceTotals.reduce(function(t, e) { return t + e }, 0), this.center = { x: this.width / 2, y: this.height / 2 } } }, { key: "renderLegend", value: function() { var t = this,
                        e = this.state;
                    this.legendArea.textContent = "", this.legendTotals = e.sliceTotals.slice(0, this.config.maxLegendPoints); var i = 0,
                        n = 0;
                    this.legendTotals.map(function(a, s) { var r = Math.floor((t.width - l(t.measures)) / 110);
                        i > r && (i = 0, n += 20); var o = N(110 * i + 5, n, 5, t.colors[s], e.labels[s] + ": " + a);
                        t.legendArea.appendChild(o), i++ }) } }]), e }(le),
        he = 7,
        ce = 1e3,
        de = 86400,
        pe = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        fe = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ve = function() {
            function t(e) { var i = e.layerClass,
                    n = void 0 === i ? "" : i,
                    a = e.layerTransform,
                    s = void 0 === a ? "" : a,
                    r = e.constants,
                    o = e.getData,
                    l = e.makeElements,
                    u = e.animateElements;
                Ot(this, t), this.layerTransform = s, this.constants = r, this.makeElements = l, this.getData = o, this.animateElements = u, this.store = [], this.labels = [], this.layerClass = n, this.layerClass = "function" == typeof this.layerClass ? this.layerClass() : this.layerClass, this.refresh() } return Mt(t, [{ key: "refresh", value: function(t) { this.data = t || this.getData() } }, { key: "setup", value: function(t) { this.layer = P(this.layerClass, this.layerTransform, t) } }, { key: "make", value: function() { this.render(this.data), this.oldData = this.data } }, { key: "render", value: function(t) { var e = this;
                    this.store = this.makeElements(t), this.layer.textContent = "", this.store.forEach(function(t) { e.layer.appendChild(t) }), this.labels.forEach(function(t) { e.layer.appendChild(t) }) } }, { key: "update", value: function() { var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    this.refresh(); var e = []; return t && (e = this.animateElements(this.data) || []), e } }]), t }(),
        ge = { pieSlices: { layerClass: "pie-slices", makeElements: function(t) { return t.sliceStrings.map(function(e, i) { var n = C(e, "pie-path", "none", t.colors[i]); return n.style.transition = "transform .3s;", n }) }, animateElements: function(t) { return this.store.map(function(e, i) { return J(e, t.sliceStrings[i]) }) } }, percentageBars: { layerClass: "percentage-bars", makeElements: function(t) { var e = this; return t.xPositions.map(function(i, n) { return D(i, 0, t.widths[n], e.constants.barHeight, e.constants.barDepth, t.colors[n]) }) }, animateElements: function(t) { if (t) return [] } }, yAxis: { layerClass: "y axis", makeElements: function(t) { var e = this; return t.positions.map(function(i, n) { return z(i, t.labels[n], e.constants.width, { mode: e.constants.mode, pos: e.constants.pos }) }) }, animateElements: function(t) { var e = t.positions,
                        i = t.labels,
                        n = this.oldData.positions,
                        a = this.oldData.labels,
                        s = f(n, e),
                        r = _t(s, 2);
                    n = r[0], e = r[1]; var o = f(a, i),
                        l = _t(o, 2); return a = l[0], i = l[1], this.render({ positions: n, labels: i }), this.store.map(function(t, i) { return B(t, e[i], n[i]) }) } }, xAxis: { layerClass: "x axis", makeElements: function(t) { var e = this; return t.positions.map(function(i, n) { return H(i, t.calcLabels[n], e.constants.height, { mode: e.constants.mode, pos: e.constants.pos }) }) }, animateElements: function(t) { var e = t.positions,
                        i = t.calcLabels,
                        n = this.oldData.positions,
                        a = this.oldData.calcLabels,
                        s = f(n, e),
                        r = _t(s, 2);
                    n = r[0], e = r[1]; var o = f(a, i),
                        l = _t(o, 2); return a = l[0], i = l[1], this.render({ positions: n, calcLabels: i }), this.store.map(function(t, i) { return V(t, e[i], n[i]) }) } }, yMarkers: { layerClass: "y-markers", makeElements: function(t) { var e = this; return t.map(function(t) { return F(t.position, t.label, e.constants.width, { labelPos: t.options.labelPos, mode: "span", lineType: "dashed" }) }) }, animateElements: function(t) { var e = f(this.oldData, t),
                        i = _t(e, 2);
                    this.oldData = i[0]; var n = (t = i[1]).map(function(t) { return t.position }),
                        a = t.map(function(t) { return t.label }),
                        s = t.map(function(t) { return t.options }),
                        r = this.oldData.map(function(t) { return t.position }); return this.render(r.map(function(t, e) { return { position: r[e], label: a[e], options: s[e] } })), this.store.map(function(t, e) { return B(t, n[e], r[e]) }) } }, yRegions: { layerClass: "y-regions", makeElements: function(t) { var e = this; return t.map(function(t) { return j(t.startPos, t.endPos, e.constants.width, t.label, { labelPos: t.options.labelPos }) }) }, animateElements: function(t) { var e = f(this.oldData, t),
                        i = _t(e, 2);
                    this.oldData = i[0]; var n = (t = i[1]).map(function(t) { return t.endPos }),
                        a = t.map(function(t) { return t.label }),
                        s = t.map(function(t) { return t.startPos }),
                        r = t.map(function(t) { return t.options }),
                        o = this.oldData.map(function(t) { return t.endPos }),
                        l = this.oldData.map(function(t) { return t.startPos });
                    this.render(o.map(function(t, e) { return { startPos: l[e], endPos: o[e], label: a[e], options: r[e] } })); var u = []; return this.store.map(function(t, e) { u = u.concat(U(t, s[e], n[e], o[e])) }), u } }, heatDomain: { layerClass: function() { return "heat-domain domain-" + this.constants.index }, makeElements: function(t) { var e = this,
                        i = this.constants,
                        n = i.index,
                        a = i.colWidth,
                        s = i.rowHeight,
                        r = i.squareSize,
                        o = i.xTranslate,
                        l = 0; return this.serializedSubDomains = [], t.cols.map(function(t, i) { 1 === i && e.labels.push(E("domain-name", o, -12, lt(n, !0).toUpperCase(), { fontSize: 9 })), t.map(function(t, i) { if (t.fill) { var n = { "data-date": t.yyyyMmDd, "data-value": t.dataValue, "data-day": i },
                                    a = O("day", o, l, r, t.fill, n);
                                e.serializedSubDomains.push(a) } l += s }), l = 0, o += a }), this.serializedSubDomains }, animateElements: function(t) { if (t) return [] } }, barGraph: { layerClass: function() { return "dataset-units dataset-bars dataset-" + this.constants.index }, makeElements: function(t) { var e = this.constants; return this.unitType = "bar", this.units = t.yPositions.map(function(i, n) { return W(t.xPositions[n], i, t.barWidth, e.color, t.labels[n], n, t.offsets[n], { zeroLine: t.zeroLine, barsWidth: t.barsWidth, minHeight: e.minHeight }) }), this.units }, animateElements: function(t) { var e = t.xPositions,
                        i = t.yPositions,
                        n = t.offsets,
                        a = t.labels,
                        s = this.oldData.xPositions,
                        r = this.oldData.yPositions,
                        o = this.oldData.offsets,
                        l = this.oldData.labels,
                        u = f(s, e),
                        h = _t(u, 2);
                    s = h[0], e = h[1]; var c = f(r, i),
                        d = _t(c, 2);
                    r = d[0], i = d[1]; var p = f(o, n),
                        v = _t(p, 2);
                    o = v[0], n = v[1]; var g = f(l, a),
                        y = _t(g, 2);
                    l = y[0], a = y[1], this.render({ xPositions: s, yPositions: r, offsets: o, labels: a, zeroLine: this.oldData.zeroLine, barsWidth: this.oldData.barsWidth, barWidth: this.oldData.barWidth }); var m = []; return this.store.map(function(a, s) { m = m.concat(G(a, e[s], i[s], t.barWidth, n[s], { zeroLine: t.zeroLine })) }), m } }, lineGraph: { layerClass: function() { return "dataset-units dataset-line dataset-" + this.constants.index }, makeElements: function(t) { var e = this.constants; return this.unitType = "dot", this.paths = {}, e.hideLine || (this.paths = R(t.xPositions, t.yPositions, e.color, { heatline: e.heatline, regionFill: e.regionFill }, { svgDefs: e.svgDefs, zeroLine: t.zeroLine })), this.units = [], e.hideDots || (this.units = t.yPositions.map(function(i, n) { return I(t.xPositions[n], i, t.radius, e.color, e.valuesOverPoints ? t.values[n] : "", n) })), Object.values(this.paths).concat(this.units) }, animateElements: function(t) { var e = t.xPositions,
                        i = t.yPositions,
                        n = t.values,
                        a = this.oldData.xPositions,
                        s = this.oldData.yPositions,
                        r = this.oldData.values,
                        o = f(a, e),
                        l = _t(o, 2);
                    a = l[0], e = l[1]; var u = f(s, i),
                        h = _t(u, 2);
                    s = h[0], i = h[1]; var c = f(r, n),
                        d = _t(c, 2);
                    r = d[0], n = d[1], this.render({ xPositions: a, yPositions: s, values: n, zeroLine: this.oldData.zeroLine, radius: this.oldData.radius }); var p = []; return Object.keys(this.paths).length && (p = p.concat(X(this.paths, e, i, t.zeroLine))), this.units.length && this.units.map(function(t, n) { p = p.concat(q(t, e[n], i[n])) }), p } } },
        ye = function(t) {
            function i(t, e) { Ot(this, i); var n = St(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e)); return n.type = "percentage", n.setup(), n } return Et(i, t), Mt(i, [{ key: "setMeasures", value: function(t) { var e = this.measures;
                    this.barOptions = t.barOptions || {}; var i = this.barOptions;
                    i.height = i.height || 20, i.depth = i.depth || Wt, e.paddings.right = 30, e.legendHeight = 80, e.baseHeight = 8 * (i.height + .5 * i.depth) } }, { key: "setupComponents", value: function() { var t = this.state,
                        e = [
                            ["percentageBars", { barHeight: this.barOptions.height, barDepth: this.barOptions.depth }, function() { return { xPositions: t.xPositions, widths: t.widths, colors: this.colors } }.bind(this)]
                        ];
                    this.components = new Map(e.map(function(t) { var e = dt.apply(void 0, zt(t)); return [t[0], e] })) } }, { key: "calc", value: function() { var t = this;
                    Nt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "calc", this).call(this); var e = this.state;
                    e.xPositions = [], e.widths = []; var n = 0;
                    e.sliceTotals.map(function(i) { var a = t.width * i / e.grandTotal;
                        e.widths.push(a), e.xPositions.push(n), n += a }) } }, { key: "makeDataByIndex", value: function() {} }, { key: "bindTooltip", value: function() { var t = this,
                        i = this.state;
                    this.container.addEventListener("mousemove", function(n) { var a = t.components.get("percentageBars").store,
                            s = n.target; if (a.includes(s)) { var r = a.indexOf(s),
                                o = e(t.container),
                                l = e(s),
                                u = l.left - o.left + parseInt(s.getAttribute("width")) / 2,
                                h = l.top - o.top,
                                c = (t.formattedLabels && t.formattedLabels.length > 0 ? t.formattedLabels[r] : t.state.labels[r]) + ": ",
                                d = i.sliceTotals[r] / i.grandTotal;
                            t.tip.setValues(u, h, { name: c, value: (100 * d).toFixed(1) + "%" }), t.tip.showTip() } }) } }]), i }(ue),
        me = function(t) {
            function i(t, e) { Ot(this, i); var n = St(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e)); return n.type = "pie", n.initTimeout = 0, n.init = 1, n.setup(), n } return Et(i, t), Mt(i, [{ key: "configure", value: function(t) { Nt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "configure", this).call(this, t), this.mouseMove = this.mouseMove.bind(this), this.mouseLeave = this.mouseLeave.bind(this), this.hoverRadio = t.hoverRadio || .1, this.config.startAngle = t.startAngle || 0, this.clockWise = t.clockWise || !1 } }, { key: "calc", value: function() { var t = this;
                    Nt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "calc", this).call(this); var e = this.state;
                    this.radius = this.height > this.width ? this.center.x : this.center.y; var n = this.radius,
                        a = this.clockWise,
                        s = e.slicesProperties || [];
                    e.sliceStrings = [], e.slicesProperties = []; var r = 180 - this.config.startAngle;
                    e.sliceTotals.map(function(i, o) { var l = r,
                            u = i / e.grandTotal * 360,
                            h = a ? -u : u,
                            c = r += h,
                            p = d(l, n),
                            f = d(c, n),
                            v = t.init && s[o],
                            g = void 0,
                            y = void 0;
                        t.init ? (g = v ? v.startPosition : p, y = v ? v.endPosition : p) : (g = p, y = f); var m = L(g, y, t.center, t.radius, t.clockWise);
                        e.sliceStrings.push(m), e.slicesProperties.push({ startPosition: p, endPosition: f, value: i, total: e.grandTotal, startAngle: l, endAngle: c, angle: h }) }), this.init = 0 } }, { key: "setupComponents", value: function() { var t = this.state,
                        e = [
                            ["pieSlices", {}, function() { return { sliceStrings: t.sliceStrings, colors: this.colors } }.bind(this)]
                        ];
                    this.components = new Map(e.map(function(t) { var e = dt.apply(void 0, zt(t)); return [t[0], e] })) } }, { key: "calTranslateByAngle", value: function(t) { var e = this.radius,
                        i = this.hoverRadio,
                        n = d(t.startAngle + t.angle / 2, e); return "translate3d(" + n.x * i + "px," + n.y * i + "px,0)" } }, { key: "hoverSlice", value: function(t, i, n, a) { if (t) { var s = this.colors[i]; if (n) { $(t, this.calTranslateByAngle(this.state.slicesProperties[i])), t.style.fill = g(s, 50); var r = e(this.svg),
                                o = a.pageX - r.left + 10,
                                l = a.pageY - r.top - 10,
                                u = (this.formatted_labels && this.formatted_labels.length > 0 ? this.formatted_labels[i] : this.state.labels[i]) + ": ",
                                h = (100 * this.state.sliceTotals[i] / this.state.grandTotal).toFixed(1);
                            this.tip.setValues(o, l, { name: u, value: h + "%" }), this.tip.showTip() } else $(t, "translate3d(0,0,0)"), this.tip.hideTip(), t.style.fill = s } } }, { key: "bindTooltip", value: function() { this.container.addEventListener("mousemove", this.mouseMove), this.container.addEventListener("mouseleave", this.mouseLeave) } }, { key: "mouseMove", value: function(t) { var e = t.target,
                        i = this.components.get("pieSlices").store,
                        n = this.curActiveSliceIndex,
                        a = this.curActiveSlice; if (i.includes(e)) { var s = i.indexOf(e);
                        this.hoverSlice(a, n, !1), this.curActiveSlice = e, this.curActiveSliceIndex = s, this.hoverSlice(e, s, !0, t) } else this.mouseLeave() } }, { key: "mouseLeave", value: function() { this.hoverSlice(this.curActiveSlice, this.curActiveSliceIndex, !1) } }]), i }(ue),
        be = function(t) {
            function e(t, i) { Ot(this, e); var n = St(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i));
                n.type = "heatmap", n.countLabel = i.countLabel || ""; var a = ["Sunday", "Monday"],
                    s = a.includes(i.startSubDomain) ? i.startSubDomain : "Sunday"; return n.startSubDomainIndex = a.indexOf(s), n.setup(), n } return Et(e, t), Mt(e, [{ key: "setMeasures", value: function(t) { var e = this.measures;
                    this.discreteDomains = 0 === t.discreteDomains ? 0 : 1, e.paddings.top = 36, e.paddings.bottom = 0, e.legendHeight = 24, e.baseHeight = 12 * he + o(e); var i = this.data,
                        n = this.discreteDomains ? 12 : 0;
                    this.independentWidth = 12 * (st(i.start, i.end) + n) + l(e) } }, { key: "updateWidth", value: function() { var t = this.discreteDomains ? 12 : 0,
                        e = this.state.noOfWeeks ? this.state.noOfWeeks : 52;
                    this.baseWidth = 12 * (e + t) + l(this.measures) } }, { key: "prepareData", value: function() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data; if (t.start && t.end && t.start > t.end) throw new Error("Start date cannot be greater than end date."); if (t.start || (t.start = new Date, t.start.setFullYear(t.start.getFullYear() - 1)), t.end || (t.end = new Date), t.dataPoints = t.dataPoints || {}, parseInt(Object.keys(t.dataPoints)[0]) > 1e5) { var e = {};
                        Object.keys(t.dataPoints).forEach(function(i) { var n = new Date(i * ce);
                            e[nt(n)] = t.dataPoints[i] }), t.dataPoints = e } return t } }, { key: "calc", value: function() { var t = this.state;
                    t.start = at(this.data.start), t.end = at(this.data.end), t.firstWeekStart = at(t.start), t.noOfWeeks = st(t.start, t.end), t.distribution = wt(Object.values(this.data.dataPoints), 5), t.domainConfigs = this.getDomains() } }, { key: "setupComponents", value: function() { var t = this,
                        e = this.state,
                        i = this.discreteDomains ? 0 : 1,
                        n = e.domainConfigs.map(function(n, a) { return ["heatDomain", { index: n.index, colWidth: 12, rowHeight: 12, squareSize: 10, xTranslate: 12 * e.domainConfigs.filter(function(t, e) { return e < a }).map(function(t) { return t.cols.length - i }).reduce(function(t, e) { return t + e }, 0) }, function() { return e.domainConfigs[a] }.bind(t)] });
                    this.components = new Map(n.map(function(t, e) { var i = dt.apply(void 0, zt(t)); return [t[0] + "-" + e, i] })); var a = 0;
                    fe.forEach(function(e, i) { if ([1, 3, 5].includes(i)) { var n = E("subdomain-name", -6, a, e, { fontSize: 10, dy: 8, textAnchor: "end" });
                            t.drawArea.appendChild(n) } a += 12 }) } }, { key: "update", value: function(t) { t || console.error("No data to update."), this.data = this.prepareData(t), this.draw(), this.bindTooltip() } }, { key: "bindTooltip", value: function() { var t = this;
                    this.container.addEventListener("mousemove", function(e) { t.components.forEach(function(i) { var n = i.store,
                                a = e.target; if (n.includes(a)) { var s = a.getAttribute("data-value"),
                                    r = a.getAttribute("data-date").split("-"),
                                    o = lt(parseInt(r[1]) - 1, !0),
                                    l = t.container.getBoundingClientRect(),
                                    u = a.getBoundingClientRect(),
                                    h = parseInt(e.target.getAttribute("width")),
                                    c = u.left - l.left + h / 2,
                                    d = u.top - l.top,
                                    p = s + " " + t.countLabel,
                                    f = " on " + o + " " + r[0] + ", " + r[2];
                                t.tip.setValues(c, d, { name: f, value: p, valueFirst: 1 }, []), t.tip.showTip() } }) }) } }, { key: "renderLegend", value: function() { var t = this;
                    this.legendArea.textContent = ""; var e = 0,
                        i = E("subdomain-name", e, 12, "Less", { fontSize: 11, dy: 9 });
                    e = 30, this.legendArea.appendChild(i), this.colors.slice(0, 5).map(function(i, n) { var a = O("heatmap-legend-unit", e + 15 * n, 12, 10, i);
                        t.legendArea.appendChild(a) }); var n = E("subdomain-name", e + 75 + 3, 12, "More", { fontSize: 11, dy: 9 });
                    this.legendArea.appendChild(n) } }, { key: "getDomains", value: function() { for (var t = this.state, e = [t.start.getMonth(), t.start.getFullYear()], i = e[0], n = e[1], a = [t.end.getMonth(), t.end.getFullYear()], s = a[0] - i + 1 + 12 * (a[1] - n), r = [], o = at(t.start), l = 0; l < s; l++) { var u = t.end; if (!ot(o, t.end)) { var h = [o.getMonth(), o.getFullYear()];
                            u = ut(h[0], h[1]) } r.push(this.getDomainConfig(o, u)), ct(u, 1), o = u } return r } }, { key: "getDomainConfig", value: function(t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        i = [t.getMonth(), t.getFullYear()],
                        n = i[0],
                        a = i[1],
                        s = ht(t),
                        r = { index: n, cols: [] };
                    ct(e = at(e) || ut(n, a), 1); for (var o = st(s, e), l = [], u = void 0, h = 0; h < o; h++) u = this.getCol(s, n), l.push(u), ct(s = new Date(u[he - 1].yyyyMmDd), 1); return void 0 !== u[he - 1].dataValue && (ct(s, 1), l.push(this.getCol(s, n, !0))), r.cols = l, r } }, { key: "getCol", value: function(t, e) { for (var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], n = this.state, a = at(t), s = [], r = 0; r < he; r++, ct(a, 1)) { var o = {},
                            l = a >= n.start && a <= n.end;
                        i || a.getMonth() !== e || !l ? o.yyyyMmDd = nt(a) : o = this.getSubDomainConfig(a), s.push(o) } return s } }, { key: "getSubDomainConfig", value: function(t) { var e = nt(t),
                        i = this.data.dataPoints[e]; return { yyyyMmDd: e, dataValue: i || 0, fill: this.colors[At(i, this.state.distribution)] } } }]), e }(le),
        xe = function(t) {
            function i(t, e) { Ot(this, i); var n = St(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e)); return n.barOptions = e.barOptions || {}, n.lineOptions = e.lineOptions || {}, n.type = e.type || "line", n.init = 1, n.setup(), n } return Et(i, t), Mt(i, [{ key: "setMeasures", value: function() { this.data.datasets.length <= 1 && (this.config.showLegend = 0, this.measures.paddings.bottom = 30) } }, { key: "configure", value: function(t) { Nt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "configure", this).call(this, t), t.axisOptions = t.axisOptions || {}, t.tooltipOptions = t.tooltipOptions || {}, this.config.xAxisMode = t.axisOptions.xAxisMode || "span", this.config.yAxisMode = t.axisOptions.yAxisMode || "span", this.config.xIsSeries = t.axisOptions.xIsSeries || 0, this.config.formatTooltipX = t.tooltipOptions.formatTooltipX, this.config.formatTooltipY = t.tooltipOptions.formatTooltipY, this.config.valuesOverPoints = t.valuesOverPoints } }, { key: "prepareData", value: function() { return Pt(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data, this.type) } }, { key: "prepareFirstData", value: function() { return Ct(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data) } }, { key: "calc", value: function() { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.calcXPositions(), t || this.calcYAxisParameters(this.getAllYValues(), "line" === this.type), this.makeDataByIndex() } }, { key: "calcXPositions", value: function() { var t = this.state,
                        e = this.data.labels;
                    t.datasetLength = e.length, t.unitWidth = this.width / t.datasetLength, t.xOffset = t.unitWidth / 2, t.xAxis = { labels: e, positions: e.map(function(e, i) { return u(t.xOffset + i * t.unitWidth) }) } } }, { key: "calcYAxisParameters", value: function(t) { var e = gt(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "false"),
                        i = this.height / bt(e),
                        n = mt(e) * i,
                        a = this.height - yt(e) * n;
                    this.state.yAxis = { labels: e, positions: e.map(function(t) { return a - t * i }), scaleMultiplier: i, zeroLine: a }, this.calcDatasetPoints(), this.calcYExtremes(), this.calcYRegions() } }, { key: "calcDatasetPoints", value: function() { var t = this.state,
                        e = function(e) { return e.map(function(e) { return xt(e, t.yAxis) }) };
                    t.datasets = this.data.datasets.map(function(t, i) { var n = t.values,
                            a = t.cumulativeYs || []; return { name: t.name, index: i, chartType: t.chartType, values: n, yPositions: e(n), cumulativeYs: a, cumulativeYPos: e(a) } }) } }, { key: "calcYExtremes", value: function() { var t = this.state; if (this.barOptions.stacked) return void(t.yExtremes = t.datasets[t.datasets.length - 1].cumulativeYPos);
                    t.yExtremes = new Array(t.datasetLength).fill(9999), t.datasets.map(function(e) { e.yPositions.map(function(e, i) { e < t.yExtremes[i] && (t.yExtremes[i] = e) }) }) } }, { key: "calcYRegions", value: function() { var t = this.state;
                    this.data.yMarkers && (this.state.yMarkers = this.data.yMarkers.map(function(e) { return e.position = xt(e.value, t.yAxis), e.options || (e.options = {}), e })), this.data.yRegions && (this.state.yRegions = this.data.yRegions.map(function(e) { return e.startPos = xt(e.start, t.yAxis), e.endPos = xt(e.end, t.yAxis), e.options || (e.options = {}), e })) } }, { key: "getAllYValues", value: function() { var t, e = this,
                        i = "values"; if (this.barOptions.stacked) { i = "cumulativeYs"; var n = new Array(this.state.datasetLength).fill(0);
                        this.data.datasets.map(function(t, a) { var s = e.data.datasets[a].values;
                            t[i] = n = n.map(function(t, e) { return t + s[e] }) }) } var a = this.data.datasets.map(function(t) { return t[i] }); return this.data.yMarkers && a.push(this.data.yMarkers.map(function(t) { return t.value })), this.data.yRegions && this.data.yRegions.map(function(t) { a.push([t.end, t.start]) }), (t = []).concat.apply(t, zt(a)) } }, { key: "setupComponents", value: function() { var t = this,
                        e = [
                            ["yAxis", { mode: this.config.yAxisMode, width: this.width }, function() { return this.state.yAxis }.bind(this)],
                            ["xAxis", { mode: this.config.xAxisMode, height: this.height }, function() { var t = this.state; return t.xAxis.calcLabels = Lt(this.width, t.xAxis.labels, this.config.xIsSeries), t.xAxis }.bind(this)],
                            ["yRegions", { width: this.width, pos: "right" }, function() { return this.state.yRegions }.bind(this)]
                        ],
                        i = this.state.datasets.filter(function(t) { return "bar" === t.chartType }),
                        n = this.state.datasets.filter(function(t) { return "line" === t.chartType }),
                        a = i.map(function(e) { var n = e.index; return ["barGraph-" + e.index, { index: n, color: t.colors[n], stacked: t.barOptions.stacked, valuesOverPoints: t.config.valuesOverPoints, minHeight: .01 * t.height }, function() { var t = this.state,
                                    e = t.datasets[n],
                                    a = this.barOptions.stacked,
                                    s = this.barOptions.spaceRatio || .5,
                                    r = t.unitWidth * (1 - s),
                                    o = r / (a ? 1 : i.length),
                                    l = t.xAxis.positions.map(function(t) { return t - r / 2 });
                                a || (l = l.map(function(t) { return t + o * n })); var u = new Array(t.datasetLength).fill("");
                                this.config.valuesOverPoints && (u = a && e.index === t.datasets.length - 1 ? e.cumulativeYs : e.values); var h = new Array(t.datasetLength).fill(0); return a && (h = e.yPositions.map(function(t, i) { return t - e.cumulativeYPos[i] })), { xPositions: l, yPositions: e.yPositions, offsets: h, labels: u, zeroLine: t.yAxis.zeroLine, barsWidth: r, barWidth: o } }.bind(t)] }),
                        s = n.map(function(e) { var i = e.index; return ["lineGraph-" + e.index, { index: i, color: t.colors[i], svgDefs: t.svgDefs, heatline: t.lineOptions.heatline, regionFill: t.lineOptions.regionFill, hideDots: t.lineOptions.hideDots, hideLine: t.lineOptions.hideLine, valuesOverPoints: t.config.valuesOverPoints }, function() { var t = this.state,
                                    e = t.datasets[i],
                                    n = t.yAxis.positions[0] < t.yAxis.zeroLine ? t.yAxis.positions[0] : t.yAxis.zeroLine; return { xPositions: t.xAxis.positions, yPositions: e.yPositions, values: e.values, zeroLine: n, radius: this.lineOptions.dotSize || 4 } }.bind(t)] }),
                        r = [
                            ["yMarkers", { width: this.width, pos: "right" }, function() { return this.state.yMarkers }.bind(this)]
                        ];
                    e = e.concat(a, s, r); var o = ["yMarkers", "yRegions"];
                    this.dataUnitComponents = [], this.components = new Map(e.filter(function(e) { return !o.includes(e[0]) || t.state[e[0]] }).map(function(e) { var i = dt.apply(void 0, zt(e)); return (e[0].includes("lineGraph") || e[0].includes("barGraph")) && t.dataUnitComponents.push(i), [e[0], i] })) } }, { key: "makeDataByIndex", value: function() { var t = this;
                    this.dataByIndex = {}; var e = this.state,
                        i = this.config.formatTooltipX,
                        n = this.config.formatTooltipY;
                    e.xAxis.labels.map(function(a, s) { var r = t.state.datasets.map(function(e, i) { var a = e.values[s]; return { title: e.name, value: a, yPos: e.yPositions[s], color: t.colors[i], formatted: n ? n(a) : a } });
                        t.dataByIndex[s] = { label: a, formattedLabel: i ? i(a) : a, xPos: e.xAxis.positions[s], values: r, yExtreme: e.yExtremes[s] } }) } }, { key: "bindTooltip", value: function() { var t = this;
                    this.container.addEventListener("mousemove", function(i) { var n = t.measures,
                            a = e(t.container),
                            o = i.pageX - a.left - r(n),
                            l = i.pageY - a.top;
                        l < t.height + s(n) && l > s(n) ? t.mapTooltipXPosition(o) : t.tip.hideTip() }) } }, { key: "mapTooltipXPosition", value: function(t) { var e = this.state; if (e.yExtremes) { var i = kt(t, e.xAxis.positions, !0),
                            n = this.dataByIndex[i];
                        this.tip.setValues(n.xPos + this.tip.offset.x, n.yExtreme + this.tip.offset.y, { name: n.formattedLabel, value: "" }, n.values, i), this.tip.showTip() } } }, { key: "renderLegend", value: function() { var t = this,
                        e = this.data;
                    e.datasets.length > 1 && (this.legendArea.textContent = "", e.datasets.map(function(e, i) { var n = M(100 * i, "0", 100, t.colors[i], e.name);
                        t.legendArea.appendChild(n) })) } }, { key: "makeOverlay", value: function() { var t = this; if (this.init) return void(this.init = 0);
                    this.overlayGuides && this.overlayGuides.forEach(function(t) { var e = t.overlay;
                        e.parentNode.removeChild(e) }), this.overlayGuides = this.dataUnitComponents.map(function(t) { return { type: t.unitType, overlay: void 0, units: t.units } }), void 0 === this.state.currentIndex && (this.state.currentIndex = this.state.datasetLength - 1), this.overlayGuides.map(function(e) { var i = e.units[t.state.currentIndex];
                        e.overlay = Qt[e.type](i), t.drawArea.appendChild(e.overlay) }) } }, { key: "updateOverlayGuides", value: function() { this.overlayGuides && this.overlayGuides.forEach(function(t) { var e = t.overlay;
                        e.parentNode.removeChild(e) }) } }, { key: "bindOverlay", value: function() { var t = this;
                    this.parent.addEventListener("data-select", function() { t.updateOverlay() }) } }, { key: "bindUnits", value: function() { var t = this;
                    this.dataUnitComponents.map(function(e) { e.units.map(function(e) { e.addEventListener("click", function() { var i = e.getAttribute("data-point-index");
                                t.setCurrentDataPoint(i) }) }) }), this.tip.container.addEventListener("click", function() { var e = t.tip.container.getAttribute("data-point-index");
                        t.setCurrentDataPoint(e) }) } }, { key: "updateOverlay", value: function() { var t = this;
                    this.overlayGuides.map(function(e) { var i = e.units[t.state.currentIndex];
                        Zt[e.type](i, e.overlay) }) } }, { key: "onLeftArrow", value: function() { this.setCurrentDataPoint(this.state.currentIndex - 1) } }, { key: "onRightArrow", value: function() { this.setCurrentDataPoint(this.state.currentIndex + 1) } }, { key: "getDataPoint", value: function() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.currentIndex,
                        e = this.state; return { index: t, label: e.xAxis.labels[t], values: e.datasets.map(function(e) { return e.values[t] }) } } }, { key: "setCurrentDataPoint", value: function(t) { var e = this.state;
                    (t = parseInt(t)) < 0 && (t = 0), t >= e.xAxis.labels.length && (t = e.xAxis.labels.length - 1), t !== e.currentIndex && (e.currentIndex = t, a(this.parent, "data-select", this.getDataPoint())) } }, { key: "addDataPoint", value: function(t, e) { var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.state.datasetLength;
                    Nt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "addDataPoint", this).call(this, t, e, n), this.data.labels.splice(n, 0, t), this.data.datasets.map(function(t, i) { t.values.splice(n, 0, e[i]) }), this.update(this.data) } }, { key: "removeDataPoint", value: function() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.datasetLength - 1;
                    this.data.labels.length <= 1 || (Nt(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "removeDataPoint", this).call(this, t), this.data.labels.splice(t, 1), this.data.datasets.map(function(e) { e.values.splice(t, 1) }), this.update(this.data)) } }, { key: "updateDataset", value: function(t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    this.data.datasets[e].values = t, this.update(this.data) } }, { key: "updateDatasets", value: function(t) { this.data.datasets.map(function(e, i) { t[i] && (e.values = t[i]) }), this.update(this.data) } }]), i }(le),
        ke = { bar: xe, line: xe, percentage: ye, heatmap: be, pie: me },
        we = function t(e, i) { return Ot(this, t), Tt(i.type, e, i) },
        Ae = Object.freeze({ Chart: we, PercentageChart: ye, PieChart: me, Heatmap: be, AxisChart: xe }),
        Pe = {}; return Pe.NAME = "Frappe Charts", Pe.VERSION = "1.1.0", Pe = Object.assign({}, Pe, Ae) }();
//# sourceMappingURL=frappe-charts.min.iife.js.map

frappe.Chart = Chart.Chart;
