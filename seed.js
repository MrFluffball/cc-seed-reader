// if you want to test with this, copy it into the console of the game



function escapeUnicode(str) {
    return [...str].map(c => /^[\x00-\x7F]$/.test(c) ? c : c.split("").map(a => "\\u" + a.charCodeAt().toString(16).padStart(4, "0")).join("")).join("");
}

function unescapeUnicode(str) {
    var x = str;
    var r = /\\u([\d\w]{4})/gi;
    x = x.replace(r, function (match, grp) {
        return String.fromCharCode(parseInt(grp, 16));
    });
    return unescape(x);
}


// nicely formatted function taken from FtHoF planner v4.

// the only modification made to this code is that it hands the seed over to currentSeedVal, 
// exposing it for our use.
(function (a, b, c, d, e, f) {
    function k(a) {
        var b, c = a.length, e = this, f = 0, g = e.i = e.j = 0, h = e.S = [];
        for (c || (a = [c++]); d > f;) h[f] = f++;
        for (f = 0; d > f; f++) h[f] = h[g = j & g + a[f % c] + (b = h[f])], h[g] = b;
        (e.g = function (a) {
            for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--;) b = h[f = j & f + 1], c = c * d + h[j & (h[f] = h[g = j & g + b]) + (h[g] = b)];
            return e.i = f, e.j = g, c
        })(d)
    }

    function l(a, b) {
        var e, c = [], d = (typeof a)[0];
        if (b && "o" == d) for (e in a) try {
            c.push(l(a[e], b - 1))
        } catch (f) {
        }
        return c.length ? c : "s" == d ? a : a + "\0"
    }

    function m(a, b) {
        for (var d, c = a + "", e = 0; c.length > e;) b[j & e] = j & (d ^= 19 * b[j & e]) + c.charCodeAt(e++);
        return o(b)
    }

    function n(c) {
        try {
            return a.crypto.getRandomValues(c = new Uint8Array(d)), o(c)
        } catch (e) {
            return [+new Date, a, a.navigator.plugins, a.screen, o(b)]
        }
    }

    function o(a) {
        return String.fromCharCode.apply(0, a)
    }

    var g = c.pow(d, e), h = c.pow(2, f), i = 2 * h, j = d - 1;
    c.seedrandom = function (a, f) {
        var j = [], p = m(l(f ? [a, o(b)] : 0 in arguments ? a : n(), 3), j), q = new k(j);

        //
        // expose the seed (make sure to turn unicode into /u.... so data isn't lost)
        currentSeedVal = escapeUnicode(p)

        // console.log(currentSeedVal)


        return m(o(q.S), b), c.random = function () {
            for (var a = q.g(e), b = g, c = 0; h > a;) a = (a + c) * d, b *= d, c = q.g(1);
            for (; a >= i;) a /= 2, b /= 2, c >>>= 1;
            return (a + c) / b
        }, p
    }, m(c.random(), b)
})(this, [], Math, 256, 6, 52);



let currentSeedVal;

// example of how to re-seed with the value we just got.
// the seed is unescaped so the function can read the original unicode value.
if (false) {
    Math.seedrandom(unescapeUnicode(currentSeedVal))
}