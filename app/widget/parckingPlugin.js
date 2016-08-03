function __comParckingPlugin(jQuery, jSelector) {
  "use strict";
  (function ($, jSelector) {
    var shade = "#556b2f";
    var data_jsonp_url = "http://localhost:8080/widget/assets/model_jsonp.js";
    // This also should be a JSONP request
    var html_url = "http://localhost:8080/widget/assets/widget.html";

    $.fn.comParckingPlugin = function () {
      var _self = this;

      function loadCss() {
        var css_link = jQuery("<link>", {
          rel: "stylesheet",
          type: "text/css",
          href: "http://localhost:8080/widget/css/style.css"
        });
        css_link.appendTo('head');
      }

      function loadHtml(dataModel) {
        // This also should be a JSONP request 
        $.get(html_url, function (remoteHtml) {
          console.log("data html loaded");
          praseData(dataModel, remoteHtml);
        });
      }

      function loadDataModel(callback) {
        $.ajax({
          url: data_jsonp_url,
          dataType: 'jsonp',
          jsonpCallback: 'callback',
          success: function (data) {
            console.log("Data successfully loaded");
            callback(data);
          },
          error: function (xhr, status, errorThrown) {
            console.error("ERROR getting data: ", xhr);
            console.log(xhr);
          }
        });
      }

      function template_me(html, data) {

        var old_var = _.templateSettings.variable;
        
        _.templateSettings.variable = "com_parking";
        var template = _.template(html);
        _self.html(template(data));

        _.templateSettings.variable = old_var;
      }

      function praseData(dataModel, html) {
/*<img src="<%= com_parking.vendor.map %>"></img> */
        template_me(html, dataModel);
      }

      function initPlugin() {
        loadCss();
        loadDataModel(loadHtml);
      }

      initPlugin();

      return this;
    };

    $(jSelector).comParckingPlugin();
  } (jQuery, jSelector));
}