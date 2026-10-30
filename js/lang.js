/*
 * Language routing for ouyangwenyu.github.io (zh-CN / en).
 * - A saved manual choice (localStorage "site-lang") always wins.
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
    function go(url) {
        window.location.replace(url + window.location.search + window.location.hash);
    }

    if (counterpart) {
        var saved = getSaved();
        if (saved) {
            if (saved !== pageLang) { go(counterpart); return; }
        } else if (pageLang === 'zh' && !browserPrefersZh()) {
            go(counterpart);
            return;
        }
    }

    // Manual toggle: remember the choice and keep the current #hash.
    // Capture phase so page scripts (jQuery handlers) cannot swallow the click.
    document.addEventListener('click', function (e) {
        var el = e.target;
        while (el && el !== document) {
            if (el.getAttribute && el.getAttribute('data-lang-switch')) {
                var target = el.getAttribute('data-lang-switch') === 'en' ? 'en' : 'zh';
                save(target);
                e.preventDefault();
                e.stopPropagation();
                window.location.href = el.getAttribute('href') + window.location.hash;
                return;
            }
            el = el.parentNode;
        }
    }, true);
})();
