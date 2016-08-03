(function () {

    // Localize jQuery variable
    var jQuery;

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

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    function widgetReady() {
        if (jQuery("#com-parking-widget")) {
            window.clearInterval(_readyInterval);

            loadScript("http://localhost:8080/widget/parckingPlugin.js",function(){
                console.log("loaded");
                parckingPlugin(jQuery);
            });
            // Make stuff here
            var css_link = jQuery("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: "http://localhost:8080/widget/css/style.css"
            });
            css_link.appendTo('head');

            // Load HTML
            var json_url = "http://localhost:8080/widget/assets/model.json";
            jQuery.getJSON(json_url, function (data) {
                console.log(data);
                jQuery('#com-parking-widget').html("This data comes from another server: " + data.html);
            });
        }
    }


    /******** Our main function ********/
    function main() {
        _readyInterval = window.setInterval(widgetReady, 500);
    }


    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '2.2.4') {
        loadScript("http://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js",scriptLoadHandler);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

})();