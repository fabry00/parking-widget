(function (window, document) {
    "use strict";

    var jQuery;
    var _readyInterval;

    /**
     * General function to load a rempote script
     */
    function loadScript(url, callback) {
        /* Load script from url and calls callback once it's loaded */
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", url);
        if (typeof callback !== "undefined") {
            if (scriptTag.readyState) {
                /* For old versions of IE */
                scriptTag.onreadystatechange = function () {
                    if (this.readyState === 'complete' || this.readyState === 'loaded') {
                        callback();
                    }
                };
            } else {
                scriptTag.onload = callback;
            }
        }
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    }

    /**
     * Check jquery loaded and which version, if it not comply our requirements,
     *  the right jquery version will be downloaded 
     */
    function checkAndLoadJquery() {
        if (window.jQuery === undefined || window.jQuery.fn.jquery !== '2.2.4') {
            loadScript("http://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js", scriptLoadHandler);
        } else {
            // The jQuery version on the window is the one we want to use
            jQuery = window.jQuery;
            // Start the main
            main();
        }
    }

    /**
     * Called once jQuery has loaded 
     */
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    /**
     * Load all the libs needed
     */
    function loadLibs() {
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js");
    }

    /**
     * Check if the widget and jquery is ready,
     * if yes download your plugin and start it 
     */
    function widgetReady() {
        if (jQuery("#com-parking-widget")) {
            window.clearInterval(_readyInterval);
            loadLibs();
            loadScript("http://localhost:8080/widget/parckingPlugin.js", function () {
                console.log("loaded");
                __comParckingPlugin(jQuery,'#com-parking-widget');               
            });           
        }
    }


    /**
     * Entry point of my widget
     */
    function main() {
        _readyInterval = window.setInterval(widgetReady, 500);
    }


    // Load jQuery if not present
    checkAndLoadJquery();
}(window, document));