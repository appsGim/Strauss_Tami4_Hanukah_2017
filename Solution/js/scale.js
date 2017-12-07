(function () {
    function init(isResize) {
        var baseWidth = 1980;
        var baseFontSize = 50;
        var delayMS = 0/*100*/;

        var doc = document.documentElement;
        var currentFontSize = NaN;
        var timeoutId = NaN;

        function scaleFont(isResize) {
            // Calculate new font size
            var newFontSize = Math.min(doc.offsetWidth / baseWidth, 1) * baseFontSize;

            if (newFontSize !== currentFontSize) {
                // Set new font size
                doc.style.fontSize = newFontSize + 'px';
                currentFontSize = newFontSize;
            }

            timeoutId = NaN;
        }

        // Call once to initialize
        setTimeout(function () { scaleFont(false); }, 0);

        window.addEventListener('resize', function () {
            if (timeoutId) {
                // Cancel the currently queued re-scale
                clearTimeout(timeoutId);
            }
            // Queue size recalc
            timeoutId = setTimeout(function () {
                scaleFont(true);
            }, delayMS);
        });
    }

    init(false);

    if (document.readyState === 'complete') {
        setTimeout(function () {
            init(false);
        });
    } else {
        window.addEventListener('load', function () {
            init(false);
        });
    }
})();