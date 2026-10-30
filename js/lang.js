/*
 * Language routing for ouyangwenyu.github.io (zh-CN / en).
 * - A manual choice always wins: the "site-lang" localStorage key, or a
 *   "?lang=zh|en" query parameter (used as a fallback when localStorage is
 *   unavailable, e.g. blocked by the browser). The parameter is removed from
 *   the address bar right after it has been applied.
 * - Otherwise: browsers whose preferred language starts with "zh" stay on the
 *   Chinese pages; all other browsers are sent from a Chinese page to its
 *   English counterpart. English pages never auto-redirect to Chinese unless
 *   the visitor explicitly chose Chinese.
 * - No IP geolocation, no third-party services. Visitors without JS see the
 *   Chinese root page.
 * Usage: <script src="js/lang.js" data-page-lang="zh" data-counterpart="en/index.html"></script>
 * Toggle links: <a href="..." data-lang-switch="en|zh">
 */
(function () {
    var KEY = 'site-lang';
    var script = document.currentScript;
    if (!script) { return; }
    var pageLang = script.getAttribute('data-page-lang') === 'en' ? 'en' : 'zh';
    var counterpart = script.getAttribute('data-counterpart');

    function getSaved() {
        try {
            var v = window.localStorage.getItem(KEY);
            return (v === 'en' || v === 'zh') ? v : null;
        } catch (e) { return null; }
    }
    function save(v) {
        try { window.localStorage.setItem(KEY, v); } catch (e) {}
    }
    function browserPrefersZh() {
        var langs = (navigator.languages && navigator.languages.length)
            ? navigator.languages : [navigator.language || navigator.userLanguage || ''];
        // Use the visitor's first (most preferred) language.
        return String(langs[0] || '').toLowerCase().indexOf('zh') === 0;
    }
    function requestedLang() {
        try {
            var v = new URLSearchParams(window.location.search).get('lang');
            return (v === 'en' || v === 'zh') ? v : null;
        } catch (e) {
            return null;
        }
    }
    function clearRequestedLang() {
        try {
            var u = new URL(window.location.href);
            if (!u.searchParams.has('lang')) { return; }
            u.searchParams.delete('lang');
            window.history.replaceState(null, '', u.pathname + (u.search || '') + (u.hash || ''));
        } catch (e) {}
    }
    function buildSwitchUrl(href, target) {
        try {
            var dest = new URL(href, window.location.href);
            var current = new URLSearchParams(window.location.search);
            current.delete('lang');
            current.forEach(function (value, key) { dest.searchParams.set(key, value); });
            dest.searchParams.set('lang', target);
            dest.hash = window.location.hash;
            return dest.href;
        } catch (e) {
            // Very old browsers: fall back to the previous behaviour.
            return href + window.location.hash;
        }
    }
    function go(url) {
        window.location.replace(url + window.location.search + window.location.hash);
    }

    var requested = requestedLang();
    if (requested) {
        // An explicit choice carried by the URL wins over the browser language
        // and does not depend on localStorage being writable.
        save(requested);
        if (requested !== pageLang && counterpart) {
            go(counterpart);
            return;
        }
        clearRequestedLang();
    } else if (counterpart) {
        var saved = getSaved();
        if (saved) {
            if (saved !== pageLang) { go(counterpart); return; }
        } else if (pageLang === 'zh' && !browserPrefersZh()) {
            go(counterpart);
            return;
        }
    }

    // Manual toggle: remember the choice, keep the current query and #hash, and
    // carry the choice in the URL so it survives when localStorage is blocked.
    // Capture phase so page scripts (jQuery handlers) cannot swallow the click.
    document.addEventListener('click', function (e) {
        var el = e.target;
        while (el && el !== document) {
            if (el.getAttribute && el.getAttribute('data-lang-switch')) {
                var target = el.getAttribute('data-lang-switch') === 'en' ? 'en' : 'zh';
                save(target);
                e.preventDefault();
                e.stopPropagation();
                window.location.href = buildSwitchUrl(el.getAttribute('href'), target);
                return;
            }
            el = el.parentNode;
        }
    }, true);
})();
