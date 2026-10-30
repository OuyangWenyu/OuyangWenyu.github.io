/*
	Override by WUWEI	
	version 1.0
*/

(function ($) {

    // 断点样式表按本脚本所在位置解析，使根目录页面和 /en/ 子目录页面都能正确加载 css/
    var cur = document.currentScript || (function () { var ss = document.getElementsByTagName('script'); return ss[ss.length - 1]; })();
    var base = (cur && cur.src) ? cur.src.replace(/js\/init\.js(\?.*)?$/, '') : '';

    skel.init({
        reset: 'full',
        breakpoints: {

            // Global.
            // global: {
            // 	range: '*',
            // 	href: base + 'css/style.css',
            // 	containers: 1400,
            // 	grid: {
            // 		gutters: {
            // 			vertical: '4em',
            // 			horizontal: 0
            // 		}
            // 	}
            // },

            // XLarge.
            xlarge: {
                range: '-1680',
                href: base + 'css/style-xlarge.css',
                containers: 1200
            },

            // Large.
            large: {
                range: '-1280',
                href: base + 'css/style-large.css',
                containers: 960,
                grid: {
                    gutters: {
                        vertical: '2.5em'
                    }
                },
                viewport: {
                    scalable: false
                }
            },

            // Medium.
            medium: {
                range: '-980',
                href: base + 'css/style-medium.css',
                containers: '90%',
                grid: {
                    collapse: 1
                }
            },

            // Small.
            small: {
                range: '-736',
                href: base + 'css/style-small.css',
                containers: '90%',
                grid: {
                    gutters: {
                        vertical: '1.25em'
                    }
                }
            },

            // XSmall.
            xsmall: {
                range: '-480',
                href: base + 'css/style-xsmall.css',
                grid: {
                    collapse: 2
                }
            }

        }
        // 	plugins: {
        // 		layers: {

        // 			// Config.
        // 				config: {
        // 					transform: true
        // 				},

        // 			// Navigation Panel.
        // 				navPanel: {
        // 					animation: 'pushX',
        // 					breakpoints: 'medium',
        // 					clickToHide: true,
        // 					height: '100%',
        // 					hidden: true,
        // 					html: '<div data-action="moveElement" data-args="nav"></div>',
        // 					orientation: 'vertical',
        // 					position: 'top-left',
        // 					side: 'left',
        // 					width: 250
        // 				},

        // 			// Navigation Button.
        // 				navButton: {
        // 					breakpoints: 'medium',
        // 					height: '4em',
        // 					html: '<span class="toggle" data-action="toggleLayer" data-args="navPanel"></span>',
        // 					position: 'top-left',
        // 					side: 'top',
        // 					width: '6em'
        // 				}

        // 		}
        // 	}
    });

    $(function () {

        // jQuery ready stuff.

    });

})(jQuery);