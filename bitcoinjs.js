/**
 * BitcoinJS-lib v0.1.0-default
 * Copyright (c) 2011 BitcoinJS Project
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the MIT license.
 */ (function () {
    var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        b = window.Crypto = {},
        c = b.util = {
            rotl: function (a, b) {
                return a << b | a >>> 32 - b
            },
            rotr: function (a, b) {
                return a << 32 - b | a >>> b
            },
            endian: function (a) {
                if (a.constructor == Number) return c.rotl(a, 8) & 16711935 | c.rotl(a, 24) & 4278255360;
                for (var b = 0; b < a.length; b++) a[b] = c.endian(a[b]);
                return a
            },
            randomBytes: function (a) {
                for (var b = []; a > 0; a--) b.push(Math.floor(Math.random() * 256));
                return b
            },
            bytesToWords: function (a) {
                for (var b = [], c = 0, d = 0; c < a.length; c++, d += 8) b[d >>> 5] |= a[c] << 24 - d % 32;
                return b
            },
            wordsToBytes: function (a) {
                for (var b = [], c = 0; c < a.length * 32; c += 8) b.push(a[c >>> 5] >>> 24 - c % 32 & 255);
                return b
            },
            bytesToHex: function (a) {
                for (var b = [], c = 0; c < a.length; c++) b.push((a[c] >>> 4).toString(16)), b.push((a[c] & 15).toString(16));
                return b.join("")
            },
            hexToBytes: function (a) {
                for (var b = [], c = 0; c < a.length; c += 2) b.push(parseInt(a.substr(c, 2), 16));
                return b
            },
            bytesToBase64: function (b) {
                if (typeof btoa == "function") return btoa(f.bytesToString(b));
                for (var c = [], d = 0; d < b.length; d += 3) {
                    var e = b[d] << 16 | b[d + 1] << 8 | b[d + 2];
                    for (var g = 0; g < 4; g++) d * 8 + g * 6 <= b.length * 8 ? c.push(a.charAt(e >>> 6 * (3 - g) & 63)) : c.push("=")
                }
                return c.join("")
            },
            base64ToBytes: function (b) {
                if (typeof atob == "function") return f.stringToBytes(atob(b));
                b = b.replace(/[^A-Z0-9+\/]/ig, "");
                for (var c = [], d = 0, e = 0; d < b.length; e = ++d % 4) {
                    if (e == 0) continue;
                    c.push((a.indexOf(b.charAt(d - 1)) & Math.pow(2, -2 * e + 8) - 1) << e * 2 | a.indexOf(b.charAt(d)) >>> 6 - e * 2)
                }
                return c
            }
        };
    b.mode = {};
    var d = b.charenc = {},
        e = d.UTF8 = {
            stringToBytes: function (a) {
                return f.stringToBytes(unescape(encodeURIComponent(a)))
            },
            bytesToString: function (a) {
                return decodeURIComponent(escape(f.bytesToString(a)))
            }
        },
        f = d.Binary = {
            stringToBytes: function (a) {
                for (var b = [], c = 0; c < a.length; c++) b.push(a.charCodeAt(c));
                return b
            },
            bytesToString: function (a) {
                for (var b = [], c = 0; c < a.length; c++) b.push(String.fromCharCode(a[c]));
                return b.join("")
            }
        }
})();
(function () {
    var a = Crypto,
        b = a.util,
        c = a.charenc,
        d = c.UTF8,
        e = c.Binary,
        f = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        g = a.SHA256 = function (a, c) {
            var d = b.wordsToBytes(g._sha256(a));
            return c && c.asBytes ? d : c && c.asString ? e.bytesToString(d) : b.bytesToHex(d)
        };
    g._sha256 = function (a) {
        a.constructor == String && (a = d.stringToBytes(a));
        var c = b.bytesToWords(a),
            e = a.length * 8,
            g = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
            h = [],
            i, j, k, l, m, n, o, p, q, r, s, t;
        c[e >> 5] |= 128 << 24 - e % 32, c[(e + 64 >> 9 << 4) + 15] = e;
        for (var q = 0; q < c.length; q += 16) {
            i = g[0], j = g[1], k = g[2], l = g[3], m = g[4], n = g[5], o = g[6], p = g[7];
            for (var r = 0; r < 64; r++) {
                if (r < 16) h[r] = c[r + q];
                else {
                    var u = h[r - 15],
                        v = h[r - 2],
                        w = (u << 25 | u >>> 7) ^ (u << 14 | u >>> 18) ^ u >>> 3,
                        x = (v << 15 | v >>> 17) ^ (v << 13 | v >>> 19) ^ v >>> 10;
                    h[r] = w + (h[r - 7] >>> 0) + x + (h[r - 16] >>> 0)
                }
                var y = m & n ^ ~m & o,
                    z = i & j ^ i & k ^ j & k,
                    A = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22),
                    B = (m << 26 | m >>> 6) ^ (m << 21 | m >>> 11) ^ (m << 7 | m >>> 25);
                s = (p >>> 0) + B + y + f[r] + (h[r] >>> 0), t = A + z, p = o, o = n, n = m, m = l + s, l = k, k = j, j = i, i = s + t
            }
            g[0] += i, g[1] += j, g[2] += k, g[3] += l, g[4] += m, g[5] += n, g[6] += o, g[7] += p
        }
        return g
    }, g._blocksize = 16
})();
(function () {
    function g(a, b, c, d) {
        return 0 <= a && a <= 15 ? b ^ c ^ d : 16 <= a && a <= 31 ? b & c | ~b & d : 32 <= a && a <= 47 ? (b | ~c) ^ d : 48 <= a && a <= 63 ? b & d | c & ~d : 64 <= a && a <= 79 ? b ^ (c | ~d) : "rmd160_f: j out of range"
    }
    function h(a) {
        return 0 <= a && a <= 15 ? 0 : 16 <= a && a <= 31 ? 1518500249 : 32 <= a && a <= 47 ? 1859775393 : 48 <= a && a <= 63 ? 2400959708 : 64 <= a && a <= 79 ? 2840853838 : "rmd160_K1: j out of range"
    }
    function i(a) {
        return 0 <= a && a <= 15 ? 1352829926 : 16 <= a && a <= 31 ? 1548603684 : 32 <= a && a <= 47 ? 1836072691 : 48 <= a && a <= 63 ? 2053994217 : 64 <= a && a <= 79 ? 0 : "rmd160_K2: j out of range"
    }
    function n(a, b) {
        var c = (a & 65535) + (b & 65535),
            d = (a >> 16) + (b >> 16) + (c >> 16);
        return d << 16 | c & 65535
    }
    function o(a, b) {
        return a << b | a >>> 32 - b
    }
    var a = Crypto,
        b = a.util,
        c = a.charenc,
        d = c.UTF8,
        e = c.Binary;
    b.bytesToLWords = function (a) {
        var b = Array(a.length >> 2);
        for (var c = 0; c < b.length; c++) b[c] = 0;
        for (var c = 0; c < a.length * 8; c += 8) b[c >> 5] |= (a[c / 8] & 255) << c % 32;
        return b
    }, b.lWordsToBytes = function (a) {
        var b = [];
        for (var c = 0; c < a.length * 32; c += 8) b.push(a[c >> 5] >>> c % 32 & 255);
        return b
    };
    var f = a.RIPEMD160 = function (a, c) {
            var d = b.lWordsToBytes(f._rmd160(a));
            return c && c.asBytes ? d : c && c.asString ? e.bytesToString(d) : b.bytesToHex(d)
        };
    f._rmd160 = function (a) {
        a.constructor == String && (a = d.stringToBytes(a));
        var c = b.bytesToLWords(a),
            e = a.length * 8;
        c[e >> 5] |= 128 << e % 32, c[(e + 64 >>> 9 << 4) + 14] = e;
        var f = 1732584193,
            p = 4023233417,
            q = 2562383102,
            r = 271733878,
            s = 3285377520;
        for (var t = 0; t < c.length; t += 16) {
            var u, v = f,
                w = p,
                x = q,
                y = r,
                z = s,
                A = f,
                B = p,
                C = q,
                D = r,
                E = s;
            for (var F = 0; F <= 79; ++F) u = n(v, g(F, w, x, y)), u = n(u, c[t + j[F]]), u = n(u, h(F)), u = n(o(u, l[F]), z), v = z, z = y, y = o(x, 10), x = w, w = u, u = n(A, g(79 - F, B, C, D)), u = n(u, c[t + k[F]]), u = n(u, i(F)), u = n(o(u, m[F]), E), A = E, E = D, D = o(C, 10), C = B, B = u;
            u = n(p, n(x, D)), p = n(q, n(y, E)), q = n(r, n(z, A)), r = n(s, n(v, B)), s = n(f, n(w, C)), f = u
        }
        return [f, p, q, r, s]
    };
    var j = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
        k = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
        l = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
        m = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
})();

function Arcfour() {
    this.i = 0, this.j = 0, this.S = new Array
}
function ARC4init(a) {
    var b, c, d;
    for (b = 0; b < 256; ++b) this.S[b] = b;
    c = 0;
    for (b = 0; b < 256; ++b) c = c + this.S[b] + a[b % a.length] & 255, d = this.S[b], this.S[b] = this.S[c], this.S[c] = d;
    this.i = 0, this.j = 0
}
function ARC4next() {
    var a;
    return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, a = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = a, this.S[a + this.S[this.i] & 255]
}
function prng_newstate() {
    return new Arcfour
}
Arcfour.prototype.init = ARC4init, Arcfour.prototype.next = ARC4next;
var rng_psize = 256;

function rng_seed_int(a) {
    rng_pool[rng_pptr++] ^= a & 255, rng_pool[rng_pptr++] ^= a >> 8 & 255, rng_pool[rng_pptr++] ^= a >> 16 & 255, rng_pool[rng_pptr++] ^= a >> 24 & 255, rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}
function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}
function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time(), rng_state = prng_newstate(), rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}
function rng_get_bytes(a) {
    var b;
    for (b = 0; b < a.length; ++b) a[b] = rng_get_byte()
}
function SecureRandom() {}
var rng_state, rng_pool, rng_pptr;
if (rng_pool == null) {
    rng_pool = new Array, rng_pptr = 0;
    var t;
    if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
    }
    while (rng_pptr < rng_psize) t = Math.floor(65536 * Math.random()), rng_pool[rng_pptr++] = t >>> 8, rng_pool[rng_pptr++] = t & 255;
    rng_pptr = 0, rng_seed_time()
}
SecureRandom.prototype.nextBytes = rng_get_bytes;

function BigInteger(a, b, c) {
    a != null && ("number" == typeof a ? this.fromNumber(a, b, c) : b == null && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
}
function nbi() {
    return new BigInteger(null)
}
function am1(a, b, c, d, e, f) {
    while (--f >= 0) {
        var g = b * this[a++] + c[d] + e;
        e = Math.floor(g / 67108864), c[d++] = g & 67108863
    }
    return e
}
function am2(a, b, c, d, e, f) {
    var g = b & 32767,
        h = b >> 15;
    while (--f >= 0) {
        var i = this[a] & 32767,
            j = this[a++] >> 15,
            k = h * i + j * g;
        i = g * i + ((k & 32767) << 15) + c[d] + (e & 1073741823), e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30), c[d++] = i & 1073741823
    }
    return e
}
function am3(a, b, c, d, e, f) {
    var g = b & 16383,
        h = b >> 14;
    while (--f >= 0) {
        var i = this[a] & 16383,
            j = this[a++] >> 14,
            k = h * i + j * g;
        i = g * i + ((k & 16383) << 14) + c[d] + e, e = (i >> 28) + (k >> 14) + h * j, c[d++] = i & 268435455
    }
    return e
}
function int2char(a) {
    return BI_RM.charAt(a)
}
function intAt(a, b) {
    var c = BI_RC[a.charCodeAt(b)];
    return c == null ? -1 : c
}
function bnpCopyTo(a) {
    for (var b = this.t - 1; b >= 0; --b) a[b] = this[b];
    a.t = this.t, a.s = this.s
}
function bnpFromInt(a) {
    this.t = 1, this.s = a < 0 ? -1 : 0, a > 0 ? this[0] = a : a < -1 ? this[0] = a + DV : this.t = 0
}
function nbv(a) {
    var b = nbi();
    return b.fromInt(a), b
}
function bnpFromString(a, b) {
    var c;
    if (b == 16) c = 4;
    else if (b == 8) c = 3;
    else if (b == 256) c = 8;
    else if (b == 2) c = 1;
    else if (b == 32) c = 5;
    else if (b == 4) c = 2;
    else {
        this.fromRadix(a, b);
        return
    }
    this.t = 0, this.s = 0;
    var d = a.length,
        e = !1,
        f = 0;
    while (--d >= 0) {
        var g = c == 8 ? a[d] & 255 : intAt(a, d);
        if (g < 0) {
            a.charAt(d) == "-" && (e = !0);
            continue
        }
        e = !1, f == 0 ? this[this.t++] = g : f + c > this.DB ? (this[this.t - 1] |= (g & (1 << this.DB - f) - 1) << f, this[this.t++] = g >> this.DB - f) : this[this.t - 1] |= g << f, f += c, f >= this.DB && (f -= this.DB)
    }
    c == 8 && (a[0] & 128) != 0 && (this.s = -1, f > 0 && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f)), this.clamp(), e && BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
    var a = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == a)--this.t
}
function bnToString(a) {
    if (this.s < 0) return "-" + this.negate().toString(a);
    var b;
    if (a == 16) b = 4;
    else if (a == 8) b = 3;
    else if (a == 2) b = 1;
    else if (a == 32) b = 5;
    else if (a == 4) b = 2;
    else return this.toRadix(a);
    var c = (1 << b) - 1,
        d, e = !1,
        f = "",
        g = this.t,
        h = this.DB - g * this.DB % b;
    if (g-- > 0) {
        h < this.DB && (d = this[g] >> h) > 0 && (e = !0, f = int2char(d));
        while (g >= 0) h < b ? (d = (this[g] & (1 << h) - 1) << b - h, d |= this[--g] >> (h += this.DB - b)) : (d = this[g] >> (h -= b) & c, h <= 0 && (h += this.DB, --g)), d > 0 && (e = !0), e && (f += int2char(d))
    }
    return e ? f : "0"
}
function bnNegate() {
    var a = nbi();
    return BigInteger.ZERO.subTo(this, a), a
}
function bnAbs() {
    return this.s < 0 ? this.negate() : this
}
function bnCompareTo(a) {
    var b = this.s - a.s;
    if (b != 0) return b;
    var c = this.t;
    b = c - a.t;
    if (b != 0) return b;
    while (--c >= 0) if ((b = this[c] - a[c]) != 0) return b;
    return 0
}
function nbits(a) {
    var b = 1,
        c;
    return (c = a >>> 16) != 0 && (a = c, b += 16), (c = a >> 8) != 0 && (a = c, b += 8), (c = a >> 4) != 0 && (a = c, b += 4), (c = a >> 2) != 0 && (a = c, b += 2), (c = a >> 1) != 0 && (a = c, b += 1), b
}
function bnBitLength() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnpDLShiftTo(a, b) {
    var c;
    for (c = this.t - 1; c >= 0; --c) b[c + a] = this[c];
    for (c = a - 1; c >= 0; --c) b[c] = 0;
    b.t = this.t + a, b.s = this.s
}
function bnpDRShiftTo(a, b) {
    for (var c = a; c < this.t; ++c) b[c - a] = this[c];
    b.t = Math.max(this.t - a, 0), b.s = this.s
}
function bnpLShiftTo(a, b) {
    var c = a % this.DB,
        d = this.DB - c,
        e = (1 << d) - 1,
        f = Math.floor(a / this.DB),
        g = this.s << c & this.DM,
        h;
    for (h = this.t - 1; h >= 0; --h) b[h + f + 1] = this[h] >> d | g, g = (this[h] & e) << c;
    for (h = f - 1; h >= 0; --h) b[h] = 0;
    b[f] = g, b.t = this.t + f + 1, b.s = this.s, b.clamp()
}
function bnpRShiftTo(a, b) {
    b.s = this.s;
    var c = Math.floor(a / this.DB);
    if (c >= this.t) {
        b.t = 0;
        return
    }
    var d = a % this.DB,
        e = this.DB - d,
        f = (1 << d) - 1;
    b[0] = this[c] >> d;
    for (var g = c + 1; g < this.t; ++g) b[g - c - 1] |= (this[g] & f) << e, b[g - c] = this[g] >> d;
    d > 0 && (b[this.t - c - 1] |= (this.s & f) << e), b.t = this.t - c, b.clamp()
}
function bnpSubTo(a, b) {
    var c = 0,
        d = 0,
        e = Math.min(a.t, this.t);
    while (c < e) d += this[c] - a[c], b[c++] = d & this.DM, d >>= this.DB;
    if (a.t < this.t) {
        d -= a.s;
        while (c < this.t) d += this[c], b[c++] = d & this.DM, d >>= this.DB;
        d += this.s
    } else {
        d += this.s;
        while (c < a.t) d -= a[c], b[c++] = d & this.DM, d >>= this.DB;
        d -= a.s
    }
    b.s = d < 0 ? -1 : 0, d < -1 ? b[c++] = this.DV + d : d > 0 && (b[c++] = d), b.t = c, b.clamp()
}
function bnpMultiplyTo(a, b) {
    var c = this.abs(),
        d = a.abs(),
        e = c.t;
    b.t = e + d.t;
    while (--e >= 0) b[e] = 0;
    for (e = 0; e < d.t; ++e) b[e + c.t] = c.am(0, d[e], b, e, 0, c.t);
    b.s = 0, b.clamp(), this.s != a.s && BigInteger.ZERO.subTo(b, b)
}
function bnpSquareTo(a) {
    var b = this.abs(),
        c = a.t = 2 * b.t;
    while (--c >= 0) a[c] = 0;
    for (c = 0; c < b.t - 1; ++c) {
        var d = b.am(c, b[c], a, 2 * c, 0, 1);
        (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV, a[c + b.t + 1] = 1)
    }
    a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)), a.s = 0, a.clamp()
}
function bnpDivRemTo(a, b, c) {
    var d = a.abs();
    if (d.t <= 0) return;
    var e = this.abs();
    if (e.t < d.t) {
        b != null && b.fromInt(0), c != null && this.copyTo(c);
        return
    }
    c == null && (c = nbi());
    var f = nbi(),
        g = this.s,
        h = a.s,
        i = this.DB - nbits(d[d.t - 1]);
    i > 0 ? (d.lShiftTo(i, f), e.lShiftTo(i, c)) : (d.copyTo(f), e.copyTo(c));
    var j = f.t,
        k = f[j - 1];
    if (k == 0) return;
    var l = k * (1 << this.F1) + (j > 1 ? f[j - 2] >> this.F2 : 0),
        m = this.FV / l,
        n = (1 << this.F1) / l,
        o = 1 << this.F2,
        p = c.t,
        q = p - j,
        r = b == null ? nbi() : b;
    f.dlShiftTo(q, r), c.compareTo(r) >= 0 && (c[c.t++] = 1, c.subTo(r, c)), BigInteger.ONE.dlShiftTo(j, r), r.subTo(f, f);
    while (f.t < j) f[f.t++] = 0;
    while (--q >= 0) {
        var s = c[--p] == k ? this.DM : Math.floor(c[p] * m + (c[p - 1] + o) * n);
        if ((c[p] += f.am(0, s, c, q, 0, j)) < s) {
            f.dlShiftTo(q, r), c.subTo(r, c);
            while (c[p] < --s) c.subTo(r, c)
        }
    }
    b != null && (c.drShiftTo(j, b), g != h && BigInteger.ZERO.subTo(b, b)), c.t = j, c.clamp(), i > 0 && c.rShiftTo(i, c), g < 0 && BigInteger.ZERO.subTo(c, c)
}
function bnMod(a) {
    var b = nbi();
    return this.abs().divRemTo(a, null, b), this.s < 0 && b.compareTo(BigInteger.ZERO) > 0 && a.subTo(b, b), b
}
function Classic(a) {
    this.m = a
}
function cConvert(a) {
    return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
}
function cRevert(a) {
    return a
}
function cReduce(a) {
    a.divRemTo(this.m, null, a)
}
function cMulTo(a, b, c) {
    a.multiplyTo(b, c), this.reduce(c)
}
function cSqrTo(a, b) {
    a.squareTo(b), this.reduce(b)
}
function bnpInvDigit() {
    if (this.t < 1) return 0;
    var a = this[0];
    if ((a & 1) == 0) return 0;
    var b = a & 3;
    return b = b * (2 - (a & 15) * b) & 15, b = b * (2 - (a & 255) * b) & 255, b = b * (2 - ((a & 65535) * b & 65535)) & 65535, b = b * (2 - a * b % this.DV) % this.DV, b > 0 ? this.DV - b : -b
}
function Montgomery(a) {
    this.m = a, this.mp = a.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << a.DB - 15) - 1, this.mt2 = 2 * a.t
}
function montConvert(a) {
    var b = nbi();
    return a.abs().dlShiftTo(this.m.t, b), b.divRemTo(this.m, null, b), a.s < 0 && b.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(b, b), b
}
function montRevert(a) {
    var b = nbi();
    return a.copyTo(b), this.reduce(b), b
}
function montReduce(a) {
    while (a.t <= this.mt2) a[a.t++] = 0;
    for (var b = 0; b < this.m.t; ++b) {
        var c = a[b] & 32767,
            d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
        c = b + this.m.t, a[c] += this.m.am(0, d, a, b, 0, this.m.t);
        while (a[c] >= a.DV) a[c] -= a.DV, a[++c]++
    }
    a.clamp(), a.drShiftTo(this.m.t, a), a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
}
function montSqrTo(a, b) {
    a.squareTo(b), this.reduce(b)
}
function montMulTo(a, b, c) {
    a.multiplyTo(b, c), this.reduce(c)
}
function bnpIsEven() {
    return (this.t > 0 ? this[0] & 1 : this.s) == 0
}
function bnpExp(a, b) {
    if (a > 4294967295 || a < 1) return BigInteger.ONE;
    var c = nbi(),
        d = nbi(),
        e = b.convert(this),
        f = nbits(a) - 1;
    e.copyTo(c);
    while (--f >= 0) {
        b.sqrTo(c, d);
        if ((a & 1 << f) > 0) b.mulTo(d, e, c);
        else {
            var g = c;
            c = d, d = g
        }
    }
    return b.revert(c)
}
function bnModPowInt(a, b) {
    var c;
    return a < 256 || b.isEven() ? c = new Classic(b) : c = new Montgomery(b), this.exp(a, c)
}
var dbits, canary = 0xdeadbeefcafe,
    j_lm = (canary & 16777215) == 15715070;
j_lm && navigator.appName == "Microsoft Internet Explorer" ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && navigator.appName != "Netscape" ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP), BigInteger.prototype.F1 = BI_FP - dbits, BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
    BI_RC = new Array,
    rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
Classic.prototype.convert = cConvert, Classic.prototype.revert = cRevert, Classic.prototype.reduce = cReduce, Classic.prototype.mulTo = cMulTo, Classic.prototype.sqrTo = cSqrTo, Montgomery.prototype.convert = montConvert, Montgomery.prototype.revert = montRevert, Montgomery.prototype.reduce = montReduce, Montgomery.prototype.mulTo = montMulTo, Montgomery.prototype.sqrTo = montSqrTo, BigInteger.prototype.copyTo = bnpCopyTo, BigInteger.prototype.fromInt = bnpFromInt, BigInteger.prototype.fromString = bnpFromString, BigInteger.prototype.clamp = bnpClamp, BigInteger.prototype.dlShiftTo = bnpDLShiftTo, BigInteger.prototype.drShiftTo = bnpDRShiftTo, BigInteger.prototype.lShiftTo = bnpLShiftTo, BigInteger.prototype.rShiftTo = bnpRShiftTo, BigInteger.prototype.subTo = bnpSubTo, BigInteger.prototype.multiplyTo = bnpMultiplyTo, BigInteger.prototype.squareTo = bnpSquareTo, BigInteger.prototype.divRemTo = bnpDivRemTo, BigInteger.prototype.invDigit = bnpInvDigit, BigInteger.prototype.isEven = bnpIsEven, BigInteger.prototype.exp = bnpExp, BigInteger.prototype.toString = bnToString, BigInteger.prototype.negate = bnNegate, BigInteger.prototype.abs = bnAbs, BigInteger.prototype.compareTo = bnCompareTo, BigInteger.prototype.bitLength = bnBitLength, BigInteger.prototype.mod = bnMod, BigInteger.prototype.modPowInt = bnModPowInt, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1);

function bnClone() {
    var a = nbi();
    return this.copyTo(a), a
}
function bnIntValue() {
    if (this.s < 0) {
        if (this.t == 1) return this[0] - this.DV;
        if (this.t == 0) return -1
    } else {
        if (this.t == 1) return this[0];
        if (this.t == 0) return 0
    }
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
}
function bnByteValue() {
    return this.t == 0 ? this.s : this[0] << 24 >> 24
}
function bnShortValue() {
    return this.t == 0 ? this.s : this[0] << 16 >> 16
}
function bnpChunkSize(a) {
    return Math.floor(Math.LN2 * this.DB / Math.log(a))
}
function bnSigNum() {
    return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this[0] <= 0 ? 0 : 1
}
function bnpToRadix(a) {
    a == null && (a = 10);
    if (this.signum() == 0 || a < 2 || a > 36) return "0";
    var b = this.chunkSize(a),
        c = Math.pow(a, b),
        d = nbv(c),
        e = nbi(),
        f = nbi(),
        g = "";
    this.divRemTo(d, e, f);
    while (e.signum() > 0) g = (c + f.intValue()).toString(a).substr(1) + g, e.divRemTo(d, e, f);
    return f.intValue().toString(a) + g
}
function bnpFromRadix(a, b) {
    this.fromInt(0), b == null && (b = 10);
    var c = this.chunkSize(b),
        d = Math.pow(b, c),
        e = !1,
        f = 0,
        g = 0;
    for (var h = 0; h < a.length; ++h) {
        var i = intAt(a, h);
        if (i < 0) {
            a.charAt(h) == "-" && this.signum() == 0 && (e = !0);
            continue
        }
        g = b * g + i, ++f >= c && (this.dMultiply(d), this.dAddOffset(g, 0), f = 0, g = 0)
    }
    f > 0 && (this.dMultiply(Math.pow(b, f)), this.dAddOffset(g, 0)), e && BigInteger.ZERO.subTo(this, this)
}
function bnpFromNumber(a, b, c) {
    if ("number" == typeof b) if (a < 2) this.fromInt(1);
    else {
        this.fromNumber(a, c), this.testBit(a - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0);
        while (!this.isProbablePrime(b)) this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(BigInteger.ONE.shiftLeft(a - 1), this)
    } else {
        var d = new Array,
            e = a & 7;
        d.length = (a >> 3) + 1, b.nextBytes(d), e > 0 ? d[0] &= (1 << e) - 1 : d[0] = 0, this.fromString(d, 256)
    }
}
function bnToByteArray() {
    var a = this.t,
        b = new Array;
    b[0] = this.s;
    var c = this.DB - a * this.DB % 8,
        d, e = 0;
    if (a-- > 0) {
        c < this.DB && (d = this[a] >> c) != (this.s & this.DM) >> c && (b[e++] = d | this.s << this.DB - c);
        while (a >= 0) {
            c < 8 ? (d = (this[a] & (1 << c) - 1) << 8 - c, d |= this[--a] >> (c += this.DB - 8)) : (d = this[a] >> (c -= 8) & 255, c <= 0 && (c += this.DB, --a)), (d & 128) != 0 && (d |= -256), e == 0 && (this.s & 128) != (d & 128) && ++e;
            if (e > 0 || d != this.s) b[e++] = d
        }
    }
    return b
}
function bnEquals(a) {
    return this.compareTo(a) == 0
}
function bnMin(a) {
    return this.compareTo(a) < 0 ? this : a
}
function bnMax(a) {
    return this.compareTo(a) > 0 ? this : a
}
function bnpBitwiseTo(a, b, c) {
    var d, e, f = Math.min(a.t, this.t);
    for (d = 0; d < f; ++d) c[d] = b(this[d], a[d]);
    if (a.t < this.t) {
        e = a.s & this.DM;
        for (d = f; d < this.t; ++d) c[d] = b(this[d], e);
        c.t = this.t
    } else {
        e = this.s & this.DM;
        for (d = f; d < a.t; ++d) c[d] = b(e, a[d]);
        c.t = a.t
    }
    c.s = b(this.s, a.s), c.clamp()
}
function op_and(a, b) {
    return a & b
}
function bnAnd(a) {
    var b = nbi();
    return this.bitwiseTo(a, op_and, b), b
}
function op_or(a, b) {
    return a | b
}
function bnOr(a) {
    var b = nbi();
    return this.bitwiseTo(a, op_or, b), b
}
function op_xor(a, b) {
    return a ^ b
}
function bnXor(a) {
    var b = nbi();
    return this.bitwiseTo(a, op_xor, b), b
}
function op_andnot(a, b) {
    return a & ~b
}
function bnAndNot(a) {
    var b = nbi();
    return this.bitwiseTo(a, op_andnot, b), b
}
function bnNot() {
    var a = nbi();
    for (var b = 0; b < this.t; ++b) a[b] = this.DM & ~this[b];
    return a.t = this.t, a.s = ~this.s, a
}
function bnShiftLeft(a) {
    var b = nbi();
    return a < 0 ? this.rShiftTo(-a, b) : this.lShiftTo(a, b), b
}
function bnShiftRight(a) {
    var b = nbi();
    return a < 0 ? this.lShiftTo(-a, b) : this.rShiftTo(a, b), b
}
function lbit(a) {
    if (a == 0) return -1;
    var b = 0;
    return (a & 65535) == 0 && (a >>= 16, b += 16), (a & 255) == 0 && (a >>= 8, b += 8), (a & 15) == 0 && (a >>= 4, b += 4), (a & 3) == 0 && (a >>= 2, b += 2), (a & 1) == 0 && ++b, b
}
function bnGetLowestSetBit() {
    for (var a = 0; a < this.t; ++a) if (this[a] != 0) return a * this.DB + lbit(this[a]);
    return this.s < 0 ? this.t * this.DB : -1
}
function cbit(a) {
    var b = 0;
    while (a != 0) a &= a - 1, ++b;
    return b
}
function bnBitCount() {
    var a = 0,
        b = this.s & this.DM;
    for (var c = 0; c < this.t; ++c) a += cbit(this[c] ^ b);
    return a
}
function bnTestBit(a) {
    var b = Math.floor(a / this.DB);
    return b >= this.t ? this.s != 0 : (this[b] & 1 << a % this.DB) != 0
}
function bnpChangeBit(a, b) {
    var c = BigInteger.ONE.shiftLeft(a);
    return this.bitwiseTo(c, b, c), c
}
function bnSetBit(a) {
    return this.changeBit(a, op_or)
}
function bnClearBit(a) {
    return this.changeBit(a, op_andnot)
}
function bnFlipBit(a) {
    return this.changeBit(a, op_xor)
}
function bnpAddTo(a, b) {
    var c = 0,
        d = 0,
        e = Math.min(a.t, this.t);
    while (c < e) d += this[c] + a[c], b[c++] = d & this.DM, d >>= this.DB;
    if (a.t < this.t) {
        d += a.s;
        while (c < this.t) d += this[c], b[c++] = d & this.DM, d >>= this.DB;
        d += this.s
    } else {
        d += this.s;
        while (c < a.t) d += a[c], b[c++] = d & this.DM, d >>= this.DB;
        d += a.s
    }
    b.s = d < 0 ? -1 : 0, d > 0 ? b[c++] = d : d < -1 && (b[c++] = this.DV + d), b.t = c, b.clamp()
}
function bnAdd(a) {
    var b = nbi();
    return this.addTo(a, b), b
}
function bnSubtract(a) {
    var b = nbi();
    return this.subTo(a, b), b
}
function bnMultiply(a) {
    var b = nbi();
    return this.multiplyTo(a, b), b
}
function bnSquare() {
    var a = nbi();
    return this.squareTo(a), a
}
function bnDivide(a) {
    var b = nbi();
    return this.divRemTo(a, b, null), b
}
function bnRemainder(a) {
    var b = nbi();
    return this.divRemTo(a, null, b), b
}
function bnDivideAndRemainder(a) {
    var b = nbi(),
        c = nbi();
    return this.divRemTo(a, b, c), new Array(b, c)
}
function bnpDMultiply(a) {
    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t), ++this.t, this.clamp()
}
function bnpDAddOffset(a, b) {
    if (a == 0) return;
    while (this.t <= b) this[this.t++] = 0;
    this[b] += a;
    while (this[b] >= this.DV) this[b] -= this.DV, ++b >= this.t && (this[this.t++] = 0), ++this[b]
}
function NullExp() {}
function nNop(a) {
    return a
}
function nMulTo(a, b, c) {
    a.multiplyTo(b, c)
}
function nSqrTo(a, b) {
    a.squareTo(b)
}
function bnPow(a) {
    return this.exp(a, new NullExp)
}
function bnpMultiplyLowerTo(a, b, c) {
    var d = Math.min(this.t + a.t, b);
    c.s = 0, c.t = d;
    while (d > 0) c[--d] = 0;
    var e;
    for (e = c.t - this.t; d < e; ++d) c[d + this.t] = this.am(0, a[d], c, d, 0, this.t);
    for (e = Math.min(a.t, b); d < e; ++d) this.am(0, a[d], c, d, 0, b - d);
    c.clamp()
}
function bnpMultiplyUpperTo(a, b, c) {
    --b;
    var d = c.t = this.t + a.t - b;
    c.s = 0;
    while (--d >= 0) c[d] = 0;
    for (d = Math.max(b - this.t, 0); d < a.t; ++d) c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b);
    c.clamp(), c.drShiftTo(1, c)
}
function Barrett(a) {
    this.r2 = nbi(), this.q3 = nbi(), BigInteger.ONE.dlShiftTo(2 * a.t, this.r2), this.mu = this.r2.divide(a), this.m = a
}
function barrettConvert(a) {
    if (a.s < 0 || a.t > 2 * this.m.t) return a.mod(this.m);
    if (a.compareTo(this.m) < 0) return a;
    var b = nbi();
    return a.copyTo(b), this.reduce(b), b
}
function barrettRevert(a) {
    return a
}
function barrettReduce(a) {
    a.drShiftTo(this.m.t - 1, this.r2), a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (a.compareTo(this.r2) < 0) a.dAddOffset(1, this.m.t + 1);
    a.subTo(this.r2, a);
    while (a.compareTo(this.m) >= 0) a.subTo(this.m, a)
}
function barrettSqrTo(a, b) {
    a.squareTo(b), this.reduce(b)
}
function barrettMulTo(a, b, c) {
    a.multiplyTo(b, c), this.reduce(c)
}
function bnModPow(a, b) {
    var c = a.bitLength(),
        d, e = nbv(1),
        f;
    if (c <= 0) return e;
    c < 18 ? d = 1 : c < 48 ? d = 3 : c < 144 ? d = 4 : c < 768 ? d = 5 : d = 6, c < 8 ? f = new Classic(b) : b.isEven() ? f = new Barrett(b) : f = new Montgomery(b);
    var g = new Array,
        h = 3,
        i = d - 1,
        j = (1 << d) - 1;
    g[1] = f.convert(this);
    if (d > 1) {
        var k = nbi();
        f.sqrTo(g[1], k);
        while (h <= j) g[h] = nbi(), f.mulTo(k, g[h - 2], g[h]), h += 2
    }
    var l = a.t - 1,
        m, n = !0,
        o = nbi(),
        p;
    c = nbits(a[l]) - 1;
    while (l >= 0) {
        c >= i ? m = a[l] >> c - i & j : (m = (a[l] & (1 << c + 1) - 1) << i - c, l > 0 && (m |= a[l - 1] >> this.DB + c - i)), h = d;
        while ((m & 1) == 0) m >>= 1, --h;
        (c -= h) < 0 && (c += this.DB, --l);
        if (n) g[m].copyTo(e), n = !1;
        else {
            while (h > 1) f.sqrTo(e, o), f.sqrTo(o, e), h -= 2;
            h > 0 ? f.sqrTo(e, o) : (p = e, e = o, o = p), f.mulTo(o, g[m], e)
        }
        while (l >= 0 && (a[l] & 1 << c) == 0) f.sqrTo(e, o), p = e, e = o, o = p, --c < 0 && (c = this.DB - 1, --l)
    }
    return f.revert(e)
}
function bnGCD(a) {
    var b = this.s < 0 ? this.negate() : this.clone(),
        c = a.s < 0 ? a.negate() : a.clone();
    if (b.compareTo(c) < 0) {
        var d = b;
        b = c, c = d
    }
    var e = b.getLowestSetBit(),
        f = c.getLowestSetBit();
    if (f < 0) return b;
    e < f && (f = e), f > 0 && (b.rShiftTo(f, b), c.rShiftTo(f, c));
    while (b.signum() > 0)(e = b.getLowestSetBit()) > 0 && b.rShiftTo(e, b), (e = c.getLowestSetBit()) > 0 && c.rShiftTo(e, c), b.compareTo(c) >= 0 ? (b.subTo(c, b), b.rShiftTo(1, b)) : (c.subTo(b, c), c.rShiftTo(1, c));
    return f > 0 && c.lShiftTo(f, c), c
}
function bnpModInt(a) {
    if (a <= 0) return 0;
    var b = this.DV % a,
        c = this.s < 0 ? a - 1 : 0;
    if (this.t > 0) if (b == 0) c = this[0] % a;
    else for (var d = this.t - 1; d >= 0; --d) c = (b * c + this[d]) % a;
    return c
}
function bnModInverse(a) {
    var b = a.isEven();
    if (this.isEven() && b || a.signum() == 0) return BigInteger.ZERO;
    var c = a.clone(),
        d = this.clone(),
        e = nbv(1),
        f = nbv(0),
        g = nbv(0),
        h = nbv(1);
    while (c.signum() != 0) {
        while (c.isEven()) {
            c.rShiftTo(1, c);
            if (b) {
                if (!e.isEven() || !f.isEven()) e.addTo(this, e), f.subTo(a, f);
                e.rShiftTo(1, e)
            } else f.isEven() || f.subTo(a, f);
            f.rShiftTo(1, f)
        }
        while (d.isEven()) {
            d.rShiftTo(1, d);
            if (b) {
                if (!g.isEven() || !h.isEven()) g.addTo(this, g), h.subTo(a, h);
                g.rShiftTo(1, g)
            } else h.isEven() || h.subTo(a, h);
            h.rShiftTo(1, h)
        }
        c.compareTo(d) >= 0 ? (c.subTo(d, c), b && e.subTo(g, e), f.subTo(h, f)) : (d.subTo(c, d), b && g.subTo(e, g), h.subTo(f, h))
    }
    if (d.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
    if (h.compareTo(a) >= 0) return h.subtract(a);
    if (h.signum() < 0) h.addTo(a, h);
    else return h;
    return h.signum() < 0 ? h.add(a) : h
}
function bnIsProbablePrime(a) {
    var b, c = this.abs();
    if (c.t == 1 && c[0] <= lowprimes[lowprimes.length - 1]) {
        for (b = 0; b < lowprimes.length; ++b) if (c[0] == lowprimes[b]) return !0;
        return !1
    }
    if (c.isEven()) return !1;
    b = 1;
    while (b < lowprimes.length) {
        var d = lowprimes[b],
            e = b + 1;
        while (e < lowprimes.length && d < lplim) d *= lowprimes[e++];
        d = c.modInt(d);
        while (b < e) if (d % lowprimes[b++] == 0) return !1
    }
    return c.millerRabin(a)
}
function bnpMillerRabin(a) {
    var b = this.subtract(BigInteger.ONE),
        c = b.getLowestSetBit();
    if (c <= 0) return !1;
    var d = b.shiftRight(c);
    a = a + 1 >> 1, a > lowprimes.length && (a = lowprimes.length);
    var e = nbi();
    for (var f = 0; f < a; ++f) {
        e.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var g = e.modPow(d, this);
        if (g.compareTo(BigInteger.ONE) != 0 && g.compareTo(b) != 0) {
            var h = 1;
            while (h++ < c && g.compareTo(b) != 0) {
                g = g.modPowInt(2, this);
                if (g.compareTo(BigInteger.ONE) == 0) return !1
            }
            if (g.compareTo(b) != 0) return !1
        }
    }
    return !0
}
NullExp.prototype.convert = nNop, NullExp.prototype.revert = nNop, NullExp.prototype.mulTo = nMulTo, NullExp.prototype.sqrTo = nSqrTo, Barrett.prototype.convert = barrettConvert, Barrett.prototype.revert = barrettRevert, Barrett.prototype.reduce = barrettReduce, Barrett.prototype.mulTo = barrettMulTo, Barrett.prototype.sqrTo = barrettSqrTo;
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
    lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
BigInteger.prototype.chunkSize = bnpChunkSize, BigInteger.prototype.toRadix = bnpToRadix, BigInteger.prototype.fromRadix = bnpFromRadix, BigInteger.prototype.fromNumber = bnpFromNumber, BigInteger.prototype.bitwiseTo = bnpBitwiseTo, BigInteger.prototype.changeBit = bnpChangeBit, BigInteger.prototype.addTo = bnpAddTo, BigInteger.prototype.dMultiply = bnpDMultiply, BigInteger.prototype.dAddOffset = bnpDAddOffset, BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo, BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo, BigInteger.prototype.modInt = bnpModInt, BigInteger.prototype.millerRabin = bnpMillerRabin, BigInteger.prototype.clone = bnClone, BigInteger.prototype.intValue = bnIntValue, BigInteger.prototype.byteValue = bnByteValue, BigInteger.prototype.shortValue = bnShortValue, BigInteger.prototype.signum = bnSigNum, BigInteger.prototype.toByteArray = bnToByteArray, BigInteger.prototype.equals = bnEquals, BigInteger.prototype.min = bnMin, BigInteger.prototype.max = bnMax, BigInteger.prototype.and = bnAnd, BigInteger.prototype.or = bnOr, BigInteger.prototype.xor = bnXor, BigInteger.prototype.andNot = bnAndNot, BigInteger.prototype.not = bnNot, BigInteger.prototype.shiftLeft = bnShiftLeft, BigInteger.prototype.shiftRight = bnShiftRight, BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit, BigInteger.prototype.bitCount = bnBitCount, BigInteger.prototype.testBit = bnTestBit, BigInteger.prototype.setBit = bnSetBit, BigInteger.prototype.clearBit = bnClearBit, BigInteger.prototype.flipBit = bnFlipBit, BigInteger.prototype.add = bnAdd, BigInteger.prototype.subtract = bnSubtract, BigInteger.prototype.multiply = bnMultiply, BigInteger.prototype.divide = bnDivide, BigInteger.prototype.remainder = bnRemainder, BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder, BigInteger.prototype.modPow = bnModPow, BigInteger.prototype.modInverse = bnModInverse, BigInteger.prototype.pow = bnPow, BigInteger.prototype.gcd = bnGCD, BigInteger.prototype.isProbablePrime = bnIsProbablePrime, BigInteger.prototype.square = bnSquare;

function ECFieldElementFp(a, b) {
    this.x = b, this.q = a
}
function feFpEquals(a) {
    return a == this ? !0 : this.q.equals(a.q) && this.x.equals(a.x)
}
function feFpToBigInteger() {
    return this.x
}
function feFpNegate() {
    return new ECFieldElementFp(this.q, this.x.negate().mod(this.q))
}
function feFpAdd(a) {
    return new ECFieldElementFp(this.q, this.x.add(a.toBigInteger()).mod(this.q))
}
function feFpSubtract(a) {
    return new ECFieldElementFp(this.q, this.x.subtract(a.toBigInteger()).mod(this.q))
}
function feFpMultiply(a) {
    return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger()).mod(this.q))
}
function feFpSquare() {
    return new ECFieldElementFp(this.q, this.x.square().mod(this.q))
}
function feFpDivide(a) {
    return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q))
}
function ECPointFp(a, b, c, d) {
    this.curve = a, this.x = b, this.y = c, d == null ? this.z = BigInteger.ONE : this.z = d, this.zinv = null
}
function pointFpGetX() {
    return this.zinv == null && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
}
function pointFpGetY() {
    return this.zinv == null && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
}
function pointFpEquals(a) {
    if (a == this) return !0;
    if (this.isInfinity()) return a.isInfinity();
    if (a.isInfinity()) return this.isInfinity();
    var b, c;
    return b = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q), b.equals(BigInteger.ZERO) ? (c = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q), c.equals(BigInteger.ZERO)) : !1
}
function pointFpIsInfinity() {
    return this.x == null && this.y == null ? !0 : this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO)
}
function pointFpNegate() {
    return new ECPointFp(this.curve, this.x, this.y.negate(), this.z)
}
function pointFpAdd(a) {
    if (this.isInfinity()) return a;
    if (a.isInfinity()) return this;
    var b = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q),
        c = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);
    if (BigInteger.ZERO.equals(c)) return BigInteger.ZERO.equals(b) ? this.twice() : this.curve.getInfinity();
    var d = new BigInteger("3"),
        e = this.x.toBigInteger(),
        f = this.y.toBigInteger(),
        g = a.x.toBigInteger(),
        h = a.y.toBigInteger(),
        i = c.square(),
        j = i.multiply(c),
        k = e.multiply(i),
        l = b.square().multiply(this.z),
        m = l.subtract(k.shiftLeft(1)).multiply(a.z).subtract(j).multiply(c).mod(this.curve.q),
        n = k.multiply(d).multiply(b).subtract(f.multiply(j)).subtract(l.multiply(b)).multiply(a.z).add(b.multiply(j)).mod(this.curve.q),
        o = j.multiply(this.z).multiply(a.z).mod(this.curve.q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(m), this.curve.fromBigInteger(n), o)
}
function pointFpTwice() {
    if (this.isInfinity()) return this;
    if (this.y.toBigInteger().signum() == 0) return this.curve.getInfinity();
    var a = new BigInteger("3"),
        b = this.x.toBigInteger(),
        c = this.y.toBigInteger(),
        d = c.multiply(this.z),
        e = d.multiply(c).mod(this.curve.q),
        f = this.curve.a.toBigInteger(),
        g = b.square().multiply(a);
    BigInteger.ZERO.equals(f) || (g = g.add(this.z.square().multiply(f))), g = g.mod(this.curve.q);
    var h = g.square().subtract(b.shiftLeft(3).multiply(e)).shiftLeft(1).multiply(d).mod(this.curve.q),
        i = g.multiply(a).multiply(b).subtract(e.shiftLeft(1)).shiftLeft(2).multiply(e).subtract(g.square().multiply(g)).mod(this.curve.q),
        j = d.square().multiply(d).shiftLeft(3).mod(this.curve.q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(h), this.curve.fromBigInteger(i), j)
}
function pointFpMultiply(a) {
    if (this.isInfinity()) return this;
    if (a.signum() == 0) return this.curve.getInfinity();
    var b = a,
        c = b.multiply(new BigInteger("3")),
        d = this.negate(),
        e = this,
        f;
    for (f = c.bitLength() - 2; f > 0; --f) {
        e = e.twice();
        var g = c.testBit(f),
            h = b.testBit(f);
        g != h && (e = e.add(g ? this : d))
    }
    return e
}
function pointFpMultiplyTwo(a, b, c) {
    var d;
    a.bitLength() > c.bitLength() ? d = a.bitLength() - 1 : d = c.bitLength() - 1;
    var e = this.curve.getInfinity(),
        f = this.add(b);
    while (d >= 0) e = e.twice(), a.testBit(d) ? c.testBit(d) ? e = e.add(f) : e = e.add(this) : c.testBit(d) && (e = e.add(b)), --d;
    return e
}
function ECCurveFp(a, b, c) {
    this.q = a, this.a = this.fromBigInteger(b), this.b = this.fromBigInteger(c), this.infinity = new ECPointFp(this, null, null)
}
function curveFpGetQ() {
    return this.q
}
function curveFpGetA() {
    return this.a
}
function curveFpGetB() {
    return this.b
}
function curveFpEquals(a) {
    return a == this ? !0 : this.q.equals(a.q) && this.a.equals(a.a) && this.b.equals(a.b)
}
function curveFpGetInfinity() {
    return this.infinity
}
function curveFpFromBigInteger(a) {
    return new ECFieldElementFp(this.q, a)
}
function curveFpDecodePointHex(a) {
    switch (parseInt(a.substr(0, 2), 16)) {
    case 0:
        return this.infinity;
    case 2:
    case 3:
        return null;
    case 4:
    case 6:
    case 7:
        var b = (a.length - 2) / 2,
            c = a.substr(2, b),
            d = a.substr(b + 2, b);
        return new ECPointFp(this, this.fromBigInteger(new BigInteger(c, 16)), this.fromBigInteger(new BigInteger(d, 16)));
    default:
        return null
    }
}
ECFieldElementFp.prototype.equals = feFpEquals, ECFieldElementFp.prototype.toBigInteger = feFpToBigInteger, ECFieldElementFp.prototype.negate = feFpNegate, ECFieldElementFp.prototype.add = feFpAdd, ECFieldElementFp.prototype.subtract = feFpSubtract, ECFieldElementFp.prototype.multiply = feFpMultiply, ECFieldElementFp.prototype.square = feFpSquare, ECFieldElementFp.prototype.divide = feFpDivide, ECPointFp.prototype.getX = pointFpGetX, ECPointFp.prototype.getY = pointFpGetY, ECPointFp.prototype.equals = pointFpEquals, ECPointFp.prototype.isInfinity = pointFpIsInfinity, ECPointFp.prototype.negate = pointFpNegate, ECPointFp.prototype.add = pointFpAdd, ECPointFp.prototype.twice = pointFpTwice, ECPointFp.prototype.multiply = pointFpMultiply, ECPointFp.prototype.multiplyTwo = pointFpMultiplyTwo, ECCurveFp.prototype.getQ = curveFpGetQ, ECCurveFp.prototype.getA = curveFpGetA, ECCurveFp.prototype.getB = curveFpGetB, ECCurveFp.prototype.equals = curveFpEquals, ECCurveFp.prototype.getInfinity = curveFpGetInfinity, ECCurveFp.prototype.fromBigInteger = curveFpFromBigInteger, ECCurveFp.prototype.decodePointHex = curveFpDecodePointHex;

function X9ECParameters(a, b, c, d) {
    this.curve = a, this.g = b, this.n = c, this.h = d
}
function x9getCurve() {
    return this.curve
}
function x9getG() {
    return this.g
}
function x9getN() {
    return this.n
}
function x9getH() {
    return this.h
}
function fromHex(a) {
    return new BigInteger(a, 16)
}
function secp128r1() {
    var a = fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF"),
        b = fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC"),
        c = fromHex("E87579C11079F43DD824993C2CEE5ED3"),
        d = fromHex("FFFFFFFE0000000075A30D1B9038A115"),
        e = BigInteger.ONE,
        f = new ECCurveFp(a, b, c),
        g = f.decodePointHex("04161FF7528B899B2D0C28607CA52C5B86CF5AC8395BAFEB13C02DA292DDED7A83");
    return new X9ECParameters(f, g, d, e)
}
function secp160k1() {
    var a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73"),
        b = BigInteger.ZERO,
        c = fromHex("7"),
        d = fromHex("0100000000000000000001B8FA16DFAB9ACA16B6B3"),
        e = BigInteger.ONE,
        f = new ECCurveFp(a, b, c),
        g = f.decodePointHex("043B4C382CE37AA192A4019E763036F4F5DD4D7EBB938CF935318FDCED6BC28286531733C3F03C4FEE");
    return new X9ECParameters(f, g, d, e)
}
function secp160r1() {
    var a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF"),
        b = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC"),
        c = fromHex("1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45"),
        d = fromHex("0100000000000000000001F4C8F927AED3CA752257"),
        e = BigInteger.ONE,
        f = new ECCurveFp(a, b, c),
        g = f.decodePointHex("044A96B5688EF573284664698968C38BB913CBFC8223A628553168947D59DCC912042351377AC5FB32");
    return new X9ECParameters(f, g, d, e)
}
function secp192k1() {
    var a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37"),
        b = BigInteger.ZERO,
        c = fromHex("3"),
        d = fromHex("FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D"),
        e = BigInteger.ONE,
        f = new ECCurveFp(a, b, c),
        g = f.decodePointHex("04DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D");
    return new X9ECParameters(f, g, d, e)
}
function secp192r1() {
    var a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF"),
        b = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC"),
        c = fromHex("64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1"),
        d = fromHex("FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831"),
        e = BigInteger.ONE,
        f = new ECCurveFp(a, b, c),
        g = f.decodePointHex("04188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF101207192B95FFC8DA78631011ED6B24CDD573F977A11E794811");
    return new X9ECParameters(f, g, d, e)
}
function secp224r1() {
    var a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001"),
        b = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE"),
        c = fromHex("B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4"),
        d = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D"),
        e = BigInteger.ONE,
        f = new ECCurveFp(a, b, c),
        g = f.decodePointHex("04B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34");
    return new X9ECParameters(f, g, d, e)
}
function secp256k1() {
    var a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F"),
        b = BigInteger.ZERO,
        c = fromHex("7"),
        d = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141"),
        e = BigInteger.ONE,
        f = new ECCurveFp(a, b, c),
        g = f.decodePointHex("0479BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8");
    return new X9ECParameters(f, g, d, e)
}
function secp256r1() {
    var a = fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF"),
        b = fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC"),
        c = fromHex("5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B"),
        d = fromHex("FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551"),
        e = BigInteger.ONE,
        f = new ECCurveFp(a, b, c),
        g = f.decodePointHex("046B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C2964FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5");
    return new X9ECParameters(f, g, d, e)
}
function getSECCurveByName(a) {
    return a == "secp128r1" ? secp128r1() : a == "secp160k1" ? secp160k1() : a == "secp160r1" ? secp160r1() : a == "secp192k1" ? secp192k1() : a == "secp192r1" ? secp192r1() : a == "secp224r1" ? secp224r1() : a == "secp256k1" ? secp256k1() : a == "secp256r1" ? secp256r1() : null
}
X9ECParameters.prototype.getCurve = x9getCurve, X9ECParameters.prototype.getG = x9getG, X9ECParameters.prototype.getN = x9getN, X9ECParameters.prototype.getH = x9getH;
var EventEmitter = function () {};
EventEmitter.prototype.on = function (a, b, c) {
    c || (c = this), this._listeners || (this._listeners = {}), this._listeners[a] || (this._listeners[a] = []), this._unbinders || (this._unbinders = {}), this._unbinders[a] || (this._unbinders[a] = []);
    var d = function (a) {
            b.apply(c, [a])
        };
    this._unbinders[a].push(b), this._listeners[a].push(d)
}, EventEmitter.prototype.trigger = function (a, b) {
    b === undefined && (b = {}), this._listeners || (this._listeners = {});
    if (!this._listeners[a]) return;
    var c = this._listeners[a].length;
    while (c--) this._listeners[a][c](b)
}, EventEmitter.prototype.removeListener = function (a, b) {
    this._unbinders || (this._unbinders = {});
    if (!this._unbinders[a]) return;
    var c = this._unbinders[a].length;
    while (c--) this._unbinders[a][c] === b && (this._unbinders[a].splice(c, 1), this._listeners[a].splice(c, 1))
}, EventEmitter.augment = function (a) {
    for (var b in EventEmitter.prototype) a[b] || (a[b] = EventEmitter.prototype[b])
};
(function (a) {
    var b = a;
    "object" != typeof module && (b.EventEmitter = EventEmitter)
})("object" == typeof module ? module.exports : window.Bitcoin = {});
BigInteger.valueOf = nbv, BigInteger.prototype.toByteArrayUnsigned = function () {
    var a = this.toByteArray();
    return a.length ? (a[0] == 0 && (a = a.slice(1)), a.map(function (a) {
        return a < 0 ? a + 256 : a
    })) : a
}, BigInteger.fromByteArrayUnsigned = function (a) {
    return a.length ? a[0] & 128 ? new BigInteger([0].concat(a)) : new BigInteger(a) : a.valueOf(0)
};
var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
"undefined" == typeof window.console && (window.console = {});
for (var i = 0; i < names.length; ++i)"undefined" == typeof window.console[names[i]] && (window.console[names[i]] = function () {});
Bitcoin.Util = {
    isArray: Array.isArray ||
    function (a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    },
    makeFilledArray: function (a, b) {
        var c = [],
            d = 0;
        while (d < a) c[d++] = b;
        return c
    },
    numToVarInt: function (a) {
        return a < 253 ? [a] : a <= 65536 ? [253, a >>> 8, a & 255] : a <= 1 ? [254].concat(Crypto.util.wordsToBytes([a])) : [255].concat(Crypto.util.wordsToBytes([a >>> 32, a]))
    },
    valueToBigInt: function (a) {
        return a instanceof BigInteger ? a : BigInteger.fromByteArrayUnsigned(a)
    },
    formatValue: function (a) {
        var b = this.valueToBigInt(a).toString(),
            c = b.length > 8 ? b.substr(0, b.length - 8) : "0",
            d = b.length > 8 ? b.substr(b.length - 8) : b;
        while (d.length < 8) d = "0" + d;
        d = d.replace(/0*$/, "");
        while (d.length < 2) d += "0";
        return c + "." + d
    },
    parseValue: function (a) {
        var b = a.split("."),
            c = b[0],
            d = b[1] || "0";
        while (d.length < 8) d += "0";
        d = d.replace(/^0+/g, "");
        var e = BigInteger.valueOf(parseInt(c));
        return e = e.multiply(BigInteger.valueOf(1e8)), e = e.add(BigInteger.valueOf(parseInt(d))), e
    },
    sha256ripe160: function (a) {
        return Crypto.RIPEMD160(Crypto.SHA256(a, {
            asBytes: !0
        }), {
            asBytes: !0
        })
    }
};
for (var i in Crypto.util) Crypto.util.hasOwnProperty(i) && (Bitcoin.Util[i] = Crypto.util[i]);
(function (a) {
    a.Base58 = {
        alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
        base: BigInteger.valueOf(58),
        encode: function (a) {
            var c = BigInteger.fromByteArrayUnsigned(a),
                d = [];
            while (c.compareTo(b.base) >= 0) {
                var e = c.mod(b.base);
                d.unshift(b.alphabet[e.intValue()]), c = c.subtract(e).divide(b.base)
            }
            d.unshift(b.alphabet[c.intValue()]);
            for (var f = 0; f < a.length; f++) if (a[f] == 0) d.unshift(b.alphabet[0]);
            else break;
            return s = d.join(""), s
        },
        decode: function (a) {
            bi = BigInteger.valueOf(0);
            var c = 0;
            for (var d = a.length - 1; d >= 0; d--) {
                var e = b.alphabet.indexOf(a[d]);
                bi = bi.add(BigInteger.valueOf(e).multiply(b.base.pow(a.length - 1 - d))), a[d] == "1" ? c++ : c = 0
            }
            var f = bi.toByteArrayUnsigned();
            while (c-- > 0) f.unshift(0);
            return f
        }
    };
    var b = a.Base58
})("undefined" != typeof Bitcoin ? Bitcoin : module.exports);
Bitcoin.Address = function (a) {
    "string" == typeof a && (a = Bitcoin.Address.decodeString(a)), this.hash = a, this.version = 0
}, Bitcoin.Address.prototype.toString = function () {
    var a = this.hash.slice(0);
    a.unshift(this.version);
    var b = Crypto.SHA256(Crypto.SHA256(a, {
        asBytes: !0
    }), {
        asBytes: !0
    }),
        c = a.concat(b.slice(0, 4));
    return Bitcoin.Base58.encode(c)
}, Bitcoin.Address.prototype.getHashBase64 = function () {
    return Crypto.util.bytesToBase64(this.hash)
}, Bitcoin.Address.decodeString = function (a) {
    var b = Bitcoin.Base58.decode(a),
        c = b.slice(0, 21),
        d = Crypto.SHA256(Crypto.SHA256(c, {
            asBytes: !0
        }), {
            asBytes: !0
        });
    if (d[0] != b[21] || d[1] != b[22] || d[2] != b[23] || d[3] != b[24]) throw "Checksum validation failed!";
    var e = c.shift();
    if (e != 0) throw "Version " + e + " not supported!";
    return c
};

function integerToBytes(a, b) {
    var c = a.toByteArrayUnsigned();
    if (b < c.length) c = c.slice(c.length - b);
    else while (b > c.length) c.unshift(0);
    return c
}
function dmp(a) {
    return a instanceof BigInteger || (a = a.toBigInteger()), Crypto.util.bytesToHex(a.toByteArrayUnsigned())
}
ECFieldElementFp.prototype.getByteLength = function () {
    return Math.floor((this.toBigInteger().bitLength() + 7) / 8)
}, ECPointFp.prototype.getEncoded = function (a) {
    var b = this.getX().toBigInteger(),
        c = this.getY().toBigInteger(),
        d = integerToBytes(b, 32);
    return a ? c.testBit(0) ? d.unshift(2) : d.unshift(3) : (d.unshift(4), d = d.concat(integerToBytes(c, 32))), d
}, ECPointFp.decodeFrom = function (a, b) {
    var c = b[0],
        d = b.length - 1,
        e = b.slice(1, 1 + d / 2),
        f = b.slice(1 + d / 2, 1 + d);
    e.unshift(0), f.unshift(0);
    var g = new BigInteger(e),
        h = new BigInteger(f);
    return new ECPointFp(a, a.fromBigInteger(g), a.fromBigInteger(h))
}, ECPointFp.prototype.add2D = function (a) {
    if (this.isInfinity()) return a;
    if (a.isInfinity()) return this;
    if (this.x.equals(a.x)) return this.y.equals(a.y) ? this.twice() : this.curve.getInfinity();
    var b = a.x.subtract(this.x),
        c = a.y.subtract(this.y),
        d = c.divide(b),
        e = d.square().subtract(this.x).subtract(a.x),
        f = d.multiply(this.x.subtract(e)).subtract(this.y);
    return new ECPointFp(this.curve, e, f)
}, ECPointFp.prototype.twice2D = function () {
    if (this.isInfinity()) return this;
    if (this.y.toBigInteger().signum() == 0) return this.curve.getInfinity();
    var a = this.curve.fromBigInteger(BigInteger.valueOf(2)),
        b = this.curve.fromBigInteger(BigInteger.valueOf(3)),
        c = this.x.square().multiply(b).add(this.curve.a).divide(this.y.multiply(a)),
        d = c.square().subtract(this.x.multiply(a)),
        e = c.multiply(this.x.subtract(d)).subtract(this.y);
    return new ECPointFp(this.curve, d, e)
}, ECPointFp.prototype.multiply2D = function (a) {
    if (this.isInfinity()) return this;
    if (a.signum() == 0) return this.curve.getInfinity();
    var b = a,
        c = b.multiply(new BigInteger("3")),
        d = this.negate(),
        e = this,
        f;
    for (f = c.bitLength() - 2; f > 0; --f) {
        e = e.twice();
        var g = c.testBit(f),
            h = b.testBit(f);
        g != h && (e = e.add2D(g ? this : d))
    }
    return e
}, ECPointFp.prototype.isOnCurve = function () {
    var a = this.getX().toBigInteger(),
        b = this.getY().toBigInteger(),
        c = this.curve.getA().toBigInteger(),
        d = this.curve.getB().toBigInteger(),
        e = this.curve.getQ(),
        f = b.multiply(b).mod(e),
        g = a.multiply(a).multiply(a).add(c.multiply(a)).add(d).mod(e);
    return f.equals(g)
}, ECPointFp.prototype.validate = function () {
    var a = this.curve.getQ();
    if (this.isInfinity()) throw new Error("Point is at infinity.");
    var b = this.getX().toBigInteger(),
        c = this.getY().toBigInteger();
    if (b.compareTo(BigInteger.ONE) < 0 || b.compareTo(a.subtract(BigInteger.ONE)) > 0) throw new Error("x coordinate out of bounds");
    if (c.compareTo(BigInteger.ONE) < 0 || c.compareTo(a.subtract(BigInteger.ONE)) > 0) throw new Error("y coordinate out of bounds");
    if (!this.isOnCurve()) throw new Error("Point is not on the curve.");
    if (this.multiply(a).isInfinity()) throw new Error("Point is not a scalar multiple of G.");
    return !0
}, Bitcoin.ECDSA = function () {
    function c(a, b, c, d) {
        var e = Math.max(b.bitLength(), d.bitLength()),
            f = a.add2D(c),
            g = a.curve.getInfinity();
        for (var h = e - 1; h >= 0; --h) g = g.twice2D(), g.z = BigInteger.ONE, b.testBit(h) ? d.testBit(h) ? g = g.add2D(f) : g = g.add2D(a) : d.testBit(h) && (g = g.add2D(c));
        return g
    }
    var a = getSECCurveByName("secp256k1"),
        b = new SecureRandom,
        d = {
            getBigRandom: function (a) {
                return (new BigInteger(a.bitLength(), b)).mod(a.subtract(BigInteger.ONE)).add(BigInteger.ONE)
            },
            sign: function (b, c) {
                var e = c,
                    f = a.getN(),
                    g = BigInteger.fromByteArrayUnsigned(b);
                do
                var h = d.getBigRandom(f),
                    i = a.getG(),
                    j = i.multiply(h),
                    k = j.getX().toBigInteger().mod(f);
                while (k.compareTo(BigInteger.ZERO) <= 0);
                var l = h.modInverse(f).multiply(g.add(e.multiply(k))).mod(f);
                return {r: k, s: l}
            },
            serializeSig: function (a, b) {
                var c = a.toByteArrayUnsigned(),
                    d = b.toByteArrayUnsigned(),
                    e = [];
                return e.push(2), e.push(c.length), e = e.concat(c), e.push(2), e.push(d.length), e = e.concat(d), e.unshift(e.length), e.unshift(48), e
            },
            verify: function (b, e, f) {
                var g = d.parseSig(e),
                    h = g.r,
                    i = g.s,
                    j = a.getN(),
                    k = BigInteger.fromByteArrayUnsigned(b);
                if (h.compareTo(BigInteger.ONE) < 0 || h.compareTo(j) >= 0) return !1;
                if (i.compareTo(BigInteger.ONE) < 0 || i.compareTo(j) >= 0) return !1;
                var l = i.modInverse(j),
                    m = k.multiply(l).mod(j),
                    n = h.multiply(l).mod(j),
                    o = a.getG(),
                    p = ECPointFp.decodeFrom(a.getCurve(), f),
                    q = c(o, m, p, n),
                    r = q.x.toBigInteger().mod(j);
                return r.equals(h)
            },
            parseSig: function (a) {
                var b;
                if (a[0] != 48) throw new Error("Signature not a valid DERSequence");
                b = 2;
                if (a[b] != 2) throw new Error("First element in signature must be a DERInteger");
                var c = a.slice(b + 2, b + 2 + a[b + 1]);
                b += 2 + a[b + 1];
                if (a[b] != 2) throw new Error("Second element in signature must be a DERInteger");
                var d = a.slice(b + 2, b + 2 + a[b + 1]);
                b += 2 + a[b + 1];
                var e = BigInteger.fromByteArrayUnsigned(c),
                    f = BigInteger.fromByteArrayUnsigned(d);
                return {
                    r: e,
                    s: f
                }
            }
        };
    return d
}();
Bitcoin.ECKey = function () {
    var a = Bitcoin.ECDSA,
        b = getSECCurveByName("secp256k1"),
        c = new SecureRandom,
        d = function (c) {
            if (!c) {
                var d = b.getN();
                this.priv = a.getBigRandom(d)
            } else c instanceof BigInteger ? this.priv = c : Bitcoin.Util.isArray(c) ? this.priv = BigInteger.fromByteArrayUnsigned(c) : "string" == typeof c && (this.priv = BigInteger.fromByteArrayUnsigned(Crypto.util.base64ToBytes(c)))
        };
    return d.prototype.getPub = function () {
        return this.pub ? this.pub : this.pub = b.getG().multiply(this.priv).getEncoded()
    }, d.prototype.getPubKeyHash = function () {
        return this.pubKeyHash ? this.pubKeyHash : this.pubKeyHash = Bitcoin.Util.sha256ripe160(this.getPub())
    }, d.prototype.getBitcoinAddress = function () {
        var a = this.getPubKeyHash(),
            b = new Bitcoin.Address(a);
        return b
    }, d.prototype.setPub = function (a) {
        this.pub = a
    }, d.prototype.toString = function (a) {
        return a === "base64" ? Crypto.util.bytesToBase64(this.priv.toByteArrayUnsigned()) : Crypto.util.bytesToHex(this.priv.toByteArrayUnsigned())
    }, d.prototype.sign = function (b) {
        return a.sign(b, this.priv)
    }, d.prototype.verify = function (b, c) {
        return a.verify(b, c, this.getPub())
    }, d
}();
(function () {
    var a = Bitcoin.Opcode = function (a) {
            this.code = a
        };
    a.prototype.toString = function () {
        return a.reverseMap[this.code]
    }, a.map = {
        OP_0: 0,
        OP_FALSE: 0,
        OP_PUSHDATA1: 76,
        OP_PUSHDATA2: 77,
        OP_PUSHDATA4: 78,
        OP_1NEGATE: 79,
        OP_RESERVED: 80,
        OP_1: 81,
        OP_TRUE: 81,
        OP_2: 82,
        OP_3: 83,
        OP_4: 84,
        OP_5: 85,
        OP_6: 86,
        OP_7: 87,
        OP_8: 88,
        OP_9: 89,
        OP_10: 90,
        OP_11: 91,
        OP_12: 92,
        OP_13: 93,
        OP_14: 94,
        OP_15: 95,
        OP_16: 96,
        OP_NOP: 97,
        OP_VER: 98,
        OP_IF: 99,
        OP_NOTIF: 100,
        OP_VERIF: 101,
        OP_VERNOTIF: 102,
        OP_ELSE: 103,
        OP_ENDIF: 104,
        OP_VERIFY: 105,
        OP_RETURN: 106,
        OP_TOALTSTACK: 107,
        OP_FROMALTSTACK: 108,
        OP_2DROP: 109,
        OP_2DUP: 110,
        OP_3DUP: 111,
        OP_2OVER: 112,
        OP_2ROT: 113,
        OP_2SWAP: 114,
        OP_IFDUP: 115,
        OP_DEPTH: 116,
        OP_DROP: 117,
        OP_DUP: 118,
        OP_NIP: 119,
        OP_OVER: 120,
        OP_PICK: 121,
        OP_ROLL: 122,
        OP_ROT: 123,
        OP_SWAP: 124,
        OP_TUCK: 125,
        OP_CAT: 126,
        OP_SUBSTR: 127,
        OP_LEFT: 128,
        OP_RIGHT: 129,
        OP_SIZE: 130,
        OP_INVERT: 131,
        OP_AND: 132,
        OP_OR: 133,
        OP_XOR: 134,
        OP_EQUAL: 135,
        OP_EQUALVERIFY: 136,
        OP_RESERVED1: 137,
        OP_RESERVED2: 138,
        OP_1ADD: 139,
        OP_1SUB: 140,
        OP_2MUL: 141,
        OP_2DIV: 142,
        OP_NEGATE: 143,
        OP_ABS: 144,
        OP_NOT: 145,
        OP_0NOTEQUAL: 146,
        OP_ADD: 147,
        OP_SUB: 148,
        OP_MUL: 149,
        OP_DIV: 150,
        OP_MOD: 151,
        OP_LSHIFT: 152,
        OP_RSHIFT: 153,
        OP_BOOLAND: 154,
        OP_BOOLOR: 155,
        OP_NUMEQUAL: 156,
        OP_NUMEQUALVERIFY: 157,
        OP_NUMNOTEQUAL: 158,
        OP_LESSTHAN: 159,
        OP_GREATERTHAN: 160,
        OP_LESSTHANOREQUAL: 161,
        OP_GREATERTHANOREQUAL: 162,
        OP_MIN: 163,
        OP_MAX: 164,
        OP_WITHIN: 165,
        OP_RIPEMD160: 166,
        OP_SHA1: 167,
        OP_SHA256: 168,
        OP_HASH160: 169,
        OP_HASH256: 170,
        OP_CODESEPARATOR: 171,
        OP_CHECKSIG: 172,
        OP_CHECKSIGVERIFY: 173,
        OP_CHECKMULTISIG: 174,
        OP_CHECKMULTISIGVERIFY: 175,
        OP_NOP1: 176,
        OP_NOP2: 177,
        OP_NOP3: 178,
        OP_NOP4: 179,
        OP_NOP5: 180,
        OP_NOP6: 181,
        OP_NOP7: 182,
        OP_NOP8: 183,
        OP_NOP9: 184,
        OP_NOP10: 185,
        OP_PUBKEYHASH: 253,
        OP_PUBKEY: 254,
        OP_INVALIDOPCODE: 255
    }, a.reverseMap = [];
    for (var b in a.map) a.reverseMap[a.map[b]] = b
})();
(function () {
    var Opcode = Bitcoin.Opcode;
    for (var i in Opcode.map) eval("var " + i + " = " + Opcode.map[i] + ";");
    var Script = Bitcoin.Script = function (a) {
            if (!a) this.buffer = [];
            else if ("string" == typeof a) this.buffer = Crypto.util.base64ToBytes(a);
            else if (Bitcoin.Util.isArray(a)) this.buffer = a;
            else if (a instanceof Script) this.buffer = a.buffer;
            else throw new Error("Invalid script");
            this.parse()
        };
    Script.prototype.parse = function () {
        function c(c) {
            a.chunks.push(a.buffer.slice(b, b + c)), b += c
        }
        var a = this;
        this.chunks = [];
        var b = 0;
        while (b < this.buffer.length) {
            var d = this.buffer[b++];
            d >= 240 && (d = d << 8 | this.buffer[b++]);
            var e;
            d > 0 && d < OP_PUSHDATA1 ? c(d) : d == OP_PUSHDATA1 ? (e = this.buffer[b++], c(e)) : d == OP_PUSHDATA2 ? (e = this.buffer[b++] << 8 | this.buffer[b++], c(e)) : d == OP_PUSHDATA4 ? (e = this.buffer[b++] << 24 | this.buffer[b++] << 16 | this.buffer[b++] << 8 | this.buffer[b++], c(e)) : this.chunks.push(d)
        }
    }, Script.prototype.getOutType = function () {
        if (this.chunks.length == 5 &&
			this.chunks[0] == OP_DUP &&
			this.chunks[1] == OP_HASH160 &&
			this.chunks[3] == OP_EQUALVERIFY &&
			this.chunks[4] == OP_CHECKSIG) {
			console.log('Address');
	
			// Transfer to Bitcoin address
			return 'Address';
		} else if (this.chunks.length == 2 &&
				   this.chunks[1] == OP_CHECKSIG) {
			// Transfer to IP address
			return 'Pubkey';
		} else {
			return 'Strange';
		}   
    
    }, Script.prototype.simpleOutPubKeyHash = function () {
        switch (this.getOutType()) {
        case "Address":
            return this.chunks[2];
        case "Pubkey":
            return Bitcoin.Util.sha256ripe160(this.chunks[0]);
        default:
            throw new Error("Encountered non-standard scriptPubKey")
        }
    }, Script.prototype.getInType = function () {
        if (this.chunks.length == 1) return "Pubkey";
        if (this.chunks.length == 2 && Bitcoin.Util.isArray(this.chunks[0]) && Bitcoin.Util.isArray(this.chunks[1])) return "Address";
        throw console.log(this.chunks), new Error("Encountered non-standard scriptSig")
    }, Script.prototype.simpleInPubKey = function () {
        switch (this.getInType()) {
        case "Address":
            return this.chunks[1];
        case "Pubkey":
            return this.chunks[0];
        default:
            throw new Error("Encountered non-standard scriptSig")
        }
    }, Script.prototype.simpleInPubKeyHash = function () {
        return Bitcoin.Util.sha256ripe160(this.simpleInPubKey())
    }, Script.prototype.writeOp = function (a) {
        this.buffer.push(a), this.chunks.push(a)
    }, Script.prototype.writeBytes = function (a) {
        a.length < OP_PUSHDATA1 ? this.buffer.push(a.length) : a.length <= 255 ? (this.buffer.push(OP_PUSHDATA1), this.buffer.push(a.length)) : a.length <= 65535 ? (this.buffer.push(OP_PUSHDATA2), this.buffer.push(a.length & 255), this.buffer.push(a.length >>> 8 & 255)) : (this.buffer.push(OP_PUSHDATA4), this.buffer.push(a.length & 255), this.buffer.push(a.length >>> 8 & 255), this.buffer.push(a.length >>> 16 & 255), this.buffer.push(a.length >>> 24 & 255)), this.buffer = this.buffer.concat(a), this.chunks.push(a)
    }, Script.createOutputScript = function (a) {
        var b = new Script;
        return b.writeOp(OP_DUP), b.writeOp(OP_HASH160), b.writeBytes(a.hash), b.writeOp(OP_EQUALVERIFY), b.writeOp(OP_CHECKSIG), b
    }, Script.createInputScript = function (a, b) {
        var c = new Script;
        return c.writeBytes(a), c.writeBytes(b), c
    }, Script.prototype.clone = function () {
        return new Script(this.buffer)
    }
})();
(function () {
    var a = Bitcoin.Script,
        b = Bitcoin.Transaction = function (a) {
            this.version = 1, this.lock_time = 0, this.ins = [], this.outs = [], this.timestamp = null, this.block = null;
            if (a) {
                a.hash && (this.hash = a.hash), a.version && (this.version = a.version), a.lock_time && (this.lock_time = a.lock_time);
                if (a.ins && a.ins.length) for (var b = 0; b < a.ins.length; b++) this.addInput(new h(a.ins[b]));
                if (a.outs && a.outs.length) for (var b = 0; b < a.outs.length; b++) this.addOutput(new i(a.outs[b]));
                a.timestamp && (this.timestamp = a.timestamp), a.block && (this.block = a.block)
            }
        };
    b.objectify = function (a) {
        var c = [];
        for (var d = 0; d < a.length; d++) c.push(new b(a[d]));
        return c
    }, b.prototype.addInput = function (a, b) {
        arguments[0] instanceof h ? this.ins.push(arguments[0]) : this.ins.push(new h({
            outpoint: {
                hash: a.hash,
                index: b
            },
            script: new Bitcoin.Script,
            sequence: 4294967295
        }))
    }, b.prototype.addOutput = function (b, c) {
        if (arguments[0] instanceof i) this.outs.push(arguments[0]);
        else {
            if (c instanceof BigInteger) {
                c = c.toByteArrayUnsigned().reverse();
                while (c.length < 8) c.push(0)
            } else!Bitcoin.Util.isArray(c);
            this.outs.push(new i({
                value: c,
                script: a.createOutputScript(b)
            }))
        }
    }, b.prototype.serialize = function () {
        var a = [];
        a = a.concat(Crypto.util.wordsToBytes([parseInt(this.version)]).reverse()), a = a.concat(Bitcoin.Util.numToVarInt(this.ins.length));
        for (var b = 0; b < this.ins.length; b++) {
            var c = this.ins[b];
            a = a.concat(Crypto.util.base64ToBytes(c.outpoint.hash)), a = a.concat(Crypto.util.wordsToBytes([parseInt(c.outpoint.index)]).reverse());
            var d = c.script.buffer;
            a = a.concat(Bitcoin.Util.numToVarInt(d.length)), a = a.concat(d), a = a.concat(Crypto.util.wordsToBytes([parseInt(c.sequence)]).reverse())
        }
        a = a.concat(Bitcoin.Util.numToVarInt(this.outs.length));
        for (var b = 0; b < this.outs.length; b++) {
            var e = this.outs[b];
            a = a.concat(e.value);
            var d = e.script.buffer;
            a = a.concat(Bitcoin.Util.numToVarInt(d.length)), a = a.concat(d)
        }
        return a = a.concat(Crypto.util.wordsToBytes([parseInt(this.lock_time)]).reverse()), a
    };
    var c = 171,
        d = 1,
        e = 2,
        f = 3,
        g = 80;
    b.prototype.hashTransactionForSignature = function (b, c, d) {
        var h = this.clone();
        for (var i = 0; i < h.ins.length; i++) h.ins[i].script = new a;
        h.ins[c].script = b;
        if ((d & 31) == e) {
            h.outs = [];
            for (var i = 0; i < h.ins.length; i++) i != c && (h.ins[i].sequence = 0)
        } else(d & 31) != f;
        d & g && (h.ins = [h.ins[c]]);
        var j = h.serialize();
        j = j.concat(Crypto.util.wordsToBytes([parseInt(d)]).reverse());
        var k = Crypto.SHA256(j, {
            asBytes: !0
        });
        return Crypto.SHA256(k, {
            asBytes: !0
        })
    }, b.prototype.getHash = function () {
        var a = this.serialize();
        return Crypto.SHA256(Crypto.SHA256(a, {
            asBytes: !0
        }), {
            asBytes: !0
        })
    }, b.prototype.clone = function () {
        var a = new b;
        a.version = this.version, a.lock_time = this.lock_time;
        for (var c = 0; c < this.ins.length; c++) {
            var d = this.ins[c].clone();
            a.addInput(d)
        }
        for (var c = 0; c < this.outs.length; c++) {
            var e = this.outs[c].clone();
            a.addOutput(e)
        }
        return a
    }, b.prototype.analyze = function (a) {
        if (a instanceof Bitcoin.Wallet) {
            var b = !0,
                c = !0,
                d = null,
                e = null,
                f = null;
            for (var g = this.outs.length - 1; g >= 0; g--) {
                var h = this.outs[g],
                    i = h.script.simpleOutPubKeyHash();
                a.hasHash(i) ? e = i : c = !1, d = i
            }
            for (var g = this.ins.length - 1; g >= 0; g--) {
                var j = this.ins[g];
                f = j.script.simpleInPubKeyHash();
                if (!a.hasHash(f)) {
                    b = !1;
                    break
                }
            }
            var k = this.calcImpact(a),
                l = {};
            return l.impact = k, k.sign > 0 && k.value.compareTo(BigInteger.ZERO) > 0 ? (l.type = "recv", l.addr = new Bitcoin.Address(e)) : b && c ? l.type = "self" : b ? (l.type = "sent", l.addr = new Bitcoin.Address(d)) : l.type = "other", l
        }
        return null
    }, b.prototype.getDescription = function (a) {
        var b = this.analyze(a);
        if (!b) return "";
        switch (b.type) {
        case "recv":
            return "Received with " + b.addr;
        case "sent":
            return "Payment to " + b.addr;
        case "self":
            return "Payment to yourself";
        case "other":
        default:
            return ""
        }
    }, b.prototype.getTotalValue = function () {
        var a = BigInteger.ZERO;
        for (var b = 0; b < this.outs.length; b++) {
            var c = this.outs[b];
            a = a.add(Bitcoin.Util.valueToBigInt(c.value))
        }
        return a
    }, b.prototype.calcImpact = function (a) {
        if (a instanceof Bitcoin.Wallet) {
            var b = BigInteger.ZERO;
            for (var c = 0; c < this.outs.length; c++) {
                var d = this.outs[c],
                    e = Crypto.util.bytesToBase64(d.script.simpleOutPubKeyHash());
                a.hasHash(e) && (b = b.add(Bitcoin.Util.valueToBigInt(d.value)))
            }
            var f = BigInteger.ZERO;
            for (var c = 0; c < this.ins.length; c++) {
                var g = this.ins[c],
                    e = Crypto.util.bytesToBase64(g.script.simpleInPubKeyHash());
                if (a.hasHash(e)) {
                    var h = a.txIndex[g.outpoint.hash];
                    h && (f = f.add(Bitcoin.Util.valueToBigInt(h.outs[g.outpoint.index].value)))
                }
            }
            return b.compareTo(f) >= 0 ? {
                sign: 1,
                value: b.subtract(f)
            } : {
                sign: -1,
                value: f.subtract(b)
            }
        }
        return BigInteger.ZERO
    };
    var h = Bitcoin.TransactionIn = function (b) {
            this.outpoint = b.outpoint, b.script instanceof a ? this.script = b.script : this.script = new a(b.script), this.sequence = b.sequence
        };
    h.prototype.clone = function () {
        var a = new h({
            outpoint: {
                hash: this.outpoint.hash,
                index: this.outpoint.index
            },
            script: this.script.clone(),
            sequence: this.sequence
        });
        return a
    };
    var i = Bitcoin.TransactionOut = function (b) {
            b.script instanceof a ? this.script = b.script : this.script = new a(b.script);
            if (Bitcoin.Util.isArray(b.value)) this.value = b.value;
            else if ("string" == typeof b.value) {
                var c = (new BigInteger(b.value, 10)).toString(16);
                while (c.length < 16) c = "0" + c;
                this.value = Crypto.util.hexToBytes(c)
            }
        };
    i.prototype.clone = function () {
        var a = new i({
            script: this.script.clone(),
            value: this.value.slice(0)
        });
        return a
    }
})();
Bitcoin.Wallet = function () {
    var a = Bitcoin.Script,
        b = Bitcoin.TransactionIn,
        c = Bitcoin.TransactionOut,
        d = function () {
            var a = [];
            this.addressHashes = [], this.txIndex = {}, this.unspentOuts = [], this.addressPointer = 0, this.addKey = function (b, c) {
                b instanceof Bitcoin.ECKey || (b = new Bitcoin.ECKey(b)), a.push(b), c && ("string" == typeof c && (c = Crypto.util.base64ToBytes(c)), b.pub = c), this.addressHashes.push(b.getBitcoinAddress().getHashBase64())
            }, this.addKeys = function (a, b) {
                "string" == typeof a && (a = a.split(",")), "string" == typeof b && (b = b.split(",")), console.log(b);
                if (Array.isArray(b) && a.length == b.length) for (var c = 0; c < a.length; c++) this.addKey(a[c], b[c]);
                else for (var c = 0; c < a.length; c++) this.addKey(a[c])
            }, this.getKeys = function () {
                var b = [];
                for (var c = 0; c < a.length; c++) b.push(a[c].toString("base64"));
                return b
            }, this.getPubKeys = function () {
                var b = [];
                for (var c = 0; c < a.length; c++) b.push(Crypto.util.bytesToBase64(a[c].getPub()));
                return b
            }, this.clear = function () {
                a = []
            }, this.getLength = function () {
                return a.length
            }, this.getAllAddresses = function () {
                var b = [];
                for (var c = 0; c < a.length; c++) b.push(a[c].getBitcoinAddress());
                return b
            }, this.getCurAddress = function () {
                return a[this.addressPointer] ? a[this.addressPointer].getBitcoinAddress() : null
            }, this.getNextAddress = function () {
                return a.length ? (this.addressPointer = (this.addressPointer + 1) % a.length, a[this.addressPointer].getBitcoinAddress()) : null
            }, this.signWithKey = function (b, c) {
                b = Crypto.util.bytesToBase64(b);
                for (var d = 0; d < this.addressHashes.length; d++) if (this.addressHashes[d] == b) return a[d].sign(c);
                throw new Error("Missing key for signature")
            }, this.getPubKeyFromHash = function (b) {
                b = Crypto.util.bytesToBase64(b);
                for (var c = 0; c < this.addressHashes.length; c++) if (this.addressHashes[c] == b) return console.log(Crypto.util.bytesToBase64(Bitcoin.Util.sha256ripe160(a[c].getPub())), b), a[c].getPub();
                throw new Error("Hash unknown")
            }
        };
    return d.prototype.generateAddress = function () {
        this.addKey(new Bitcoin.ECKey)
    }, d.prototype.process = function (a) {
        if (this.txIndex[a.hash]) return;
        for (var d = 0; d < a.outs.length; d++) {
            var e = new c(a.outs[d]),
                f = Crypto.util.bytesToBase64(e.script.simpleOutPubKeyHash());
            for (var g = 0; g < this.addressHashes.length; g++) if (this.addressHashes[g] === f) {
                this.unspentOuts.push({
                    tx: a,
                    index: d,
                    out: e
                });
                break
            }
        }
        for (var d = 0; d < a.ins.length; d++) {
            var h = new b(a.ins[d]),
                i = h.script.simpleInPubKey(),
                f = Crypto.util.bytesToBase64(Bitcoin.Util.sha256ripe160(i));
            for (var g = 0; g < this.addressHashes.length; g++) if (this.addressHashes[g] === f) {
                for (var j = 0; j < this.unspentOuts.length; j++) h.outpoint.hash == this.unspentOuts[j].tx.hash && h.outpoint.index == this.unspentOuts[j].index && this.unspentOuts.splice(j, 1);
                break
            }
        }
        this.txIndex[a.hash] = a
    }, d.prototype.getBalance = function () {
        var a = BigInteger.valueOf(0);
        for (var b = 0; b < this.unspentOuts.length; b++) {
            var c = this.unspentOuts[b].out;
            a = a.add(Bitcoin.Util.valueToBigInt(c.value))
        }
        return a
    }, d.prototype.createSend = function (b, c, d) {
        var e = [],
            f = c.add(d),
            g = BigInteger.ZERO;
        for (var h = 0; h < this.unspentOuts.length; h++) {
            e.push(this.unspentOuts[h]), g = g.add(Bitcoin.Util.valueToBigInt(this.unspentOuts[h].out.value));
            if (g.compareTo(f) >= 0) break
        }
        if (g.compareTo(f) < 0) throw new Error("Insufficient funds.");
        console.log(e);
        var i = g.subtract(f),
            j = new Bitcoin.Transaction;
        for (var h = 0; h < e.length; h++) j.addInput(e[h].tx, e[h].index);
        j.addOutput(b, c), i.compareTo(BigInteger.ZERO) > 0 && j.addOutput(this.getNextAddress(), i);
        var k = 1;
        for (var h = 0; h < j.ins.length; h++) {
            var l = j.hashTransactionForSignature(e[h].out.script, h, k),
                m = e[h].out.script.simpleOutPubKeyHash(),
                n = this.signWithKey(m, l);
            n.push(parseInt(k)), j.ins[h].script = a.createInputScript(n, this.getPubKeyFromHash(m))
        }
        return console.log(j), console.log("pubkey: " + Crypto.util.bytesToHex(this.getPubKeyFromHash(m))), j
    }, d.prototype.clearTransactions = function () {
        this.txIndex = {}, this.unspentOuts = []
    }, d.prototype.hasHash = function (a) {
        Bitcoin.Util.isArray(a) && (a = Crypto.util.bytesToBase64(a));
        for (var b = 0; b < this.addressHashes.length; b++) if (this.addressHashes[b] === a) return !0;
        return !1
    }, d
}();
var TransactionDatabase = function () {
        this.txs = [], this.txIndex = {}
    };
EventEmitter.augment(TransactionDatabase.prototype), TransactionDatabase.prototype.addTransaction = function (a) {
    this.addTransactionNoUpdate(a), $(this).trigger("update")
}, TransactionDatabase.prototype.addTransactionNoUpdate = function (a) {
    if (this.txIndex[a.hash]) return;
    this.txs.push(new Bitcoin.Transaction(a)), this.txIndex[a.hash] = a
}, TransactionDatabase.prototype.removeTransaction = function (a) {
    this.removeTransactionNoUpdate(a), $(this).trigger("update")
}, TransactionDatabase.prototype.removeTransactionNoUpdate = function (a) {
    var b = this.txIndex[a];
    if (!b) return;
    for (var c = 0, d = this.txs.length; c < d; c++) if (this.txs[c].hash == a) {
        this.txs.splice(c, 1);
        break
    }
    delete this.txIndex[a]
}, TransactionDatabase.prototype.loadTransactions = function (a) {
    for (var b = 0; b < a.length; b++) this.addTransactionNoUpdate(a[b]);
    $(this).trigger("update")
}, TransactionDatabase.prototype.getTransactions = function () {
    return this.txs
}, TransactionDatabase.prototype.clear = function () {
    this.txs = [], this.txIndex = {}, $(this).trigger("update")
}