$(document).ready(function () {

    var invertHandler = false;
    var grayHandler = false;


    var zoomText = function () {
        return $('[data-aaZoom="true"]');
    };

    var underlineText = function () {
        return $('[data-aaUnderline="true"]');
    };

    var zoomClicked = 0;
    var zoomMax = 2;      //------------------------------------------------------ 1 click = 10% zoom text

    $('.aa-icon-btn').on('click', function () {
        var box = $('.aa-wrapper');
        box.toggleClass('aa-right-non');
    });
    $('.aa-close').on('click', function () {
        var box = $('.aa-wrapper');
        box.toggleClass('aa-right-non');
    });

    $('.aa-text-plus').on('click', function () {

        if (zoomClicked < zoomMax) {
            zoomClicked++;
            console.log('plus ' + zoomClicked);
            var zoomFont = zoomText();
            zoomFont.each(function () {
                var size = parseFloat($(this).css('font-size'));
                var currentSize = (size / 100) * 110;
                $(this).css('font-size', currentSize + 'px')
            })
        }
    });

    $('.aa-text-minus').on('click', function () {

        if (zoomClicked > 0) {
            zoomClicked--;
            console.log('minus ' + zoomClicked);
            var zoomFont = zoomText();
            zoomFont.each(function () {
                var size = parseFloat($(this).css('font-size'));
                var currentSize = (size / 100) * 90;
                $(this).css('font-size', currentSize + 'px')
            })
        }

    });

    $('.aa-underlineEvent').on('click', function () {
        var undeline = underlineText();
        undeline.each(function () {
            $(this).toggleClass('aa-underline');
        });
    });

    $('.aa-resetEvent').on('click', function () {
        var zoomFont = zoomText();
        zoomFont.each(function () {
            zoomFont.attr('style', '""')
        });
        var underline = underlineText();
        underline.each(function () {
            if ($(this).hasClass('aa-underline')) {
                $(this).removeClass('aa-underline')
            }
        });

        $('style[class="invert"]').each(function () {
            $(this).remove();
            invertHandler = false;
        });

        if ($('body').hasClass('aa-gray')) {
            $('body').removeClass('aa-gray');
            grayHandler = false;
        }

        if ($('body').hasClass('aa-readFont')) {
            $('body').removeClass('aa-readFont')
        }

        if ($('body').hasClass('aa-textVersion')) {
            $('body').removeClass('aa-textVersion')
        }

    });

    $('.aa-pop-close, .aa-termsEvent').on('click', function () {
        $('.aa-popup').toggleClass('aa-pop-display');
    });

    $('.aa-invertEvent').on('click', function () {

        if (invertHandler == false && grayHandler == false) {
            invertHandler = true;
            invert();
        } else if (invertHandler == true && grayHandler == false) {
            invertHandler = false;
            invert();
        } else if (invertHandler == false && grayHandler == true) {
            invertHandler = true;
            invert();
            grayHandler = false;
            $('body').toggleClass('aa-gray')
        } else {
            invertHandler = false;
            invert();
            grayHandler = false;
            $('body').toggleClass('aa-gray')
        }


    });

    $('.aa-grayEvent').on('click', function () {
        if (grayHandler == false && invertHandler == false) {
            grayHandler = true;
            $('body').toggleClass('aa-gray');
        } else if (invertHandler == false && grayHandler == true) {
            grayHandler = false;
            $('body').toggleClass('aa-gray');
        } else if (invertHandler == true && grayHandler == false) {
            invertHandler = false;
            invert();
            grayHandler = true;
            $('body').toggleClass('aa-gray')
        } else {
            invertHandler = false;
            invert();
            grayHandler = false;
            $('body').toggleClass('aa-gray')
        }

    });

    $('.aa-readFontEvent').on('click', function () {
        $('body').toggleClass('aa-readFont')
    });

    $('.aa-clearColorsEvent').on('click', function () {

        $('style[class="invert"]').each(function () {
            $(this).remove();
            invertHandler = false;
        });

        if ($('body').hasClass('aa-gray')) {
            $('body').removeClass('aa-gray');
            grayHandler = false;
        }
    });

    $('.aa-textVersionEvent').on('click', function () {
        $('body').toggleClass('aa-textVersion')
    })

});

function invert() {
// the css we are going to inject
    var css = 'html {-webkit-filter: invert(100%);' +
            '-moz-filter: invert(100%);' +
            '-o-filter: invert(100%);' +
            '-ms-filter: invert(100%); }',

        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.setAttribute('class', 'invert');

// a hack, so you can "invert back" clicking the bookmarklet again
    if (!window.counter) {
        window.counter = 1;
    } else {
        window.counter++;
        if (window.counter % 2 == 0) {
            var css = 'html {-webkit-filter: invert(0%); -moz-filter:    invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }'
        }
    }
    ;

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

//injecting the css to the head
    head.appendChild(style);
}
