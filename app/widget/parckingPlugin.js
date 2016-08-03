<<<<<<< HEAD
function __comParckingPlugin(jQuery, jSelector, window, document) {
  "use strict";
  (function ($, jSelector, window, document) {
    var baseAddress = "http://localhost:8080/widget/";
    var data_jsonp_url = baseAddress + "assets/model_jsonp.js";
    var html_url = baseAddress + "assets/widget.html";
    var parking_dialoghtml_url = baseAddress + "assets/parking_dialog.html";
    var style_url = baseAddress + "css/style.css";

    var myData = { baseAddress: baseAddress };
    var dialogHtml;
    var dictionary;
    $.fn.comParckingPlugin = function () {
      var _self = this;

      function loadCss() {
        var css_link = jQuery("<link>", {
          rel: "stylesheet",
          type: "text/css",
          href: style_url
        });
        css_link.appendTo('head');
      }

      function loadHtml(dataModel) {
        $.get(html_url, function (remoteHtml) {
          console.log("data html loaded");
          dictionary = dataModel.dictionary;
          praseData(dataModel, remoteHtml);
        });

        $.get(parking_dialoghtml_url, function (remoteHtml) {
          console.log("parking data html loaded");
          dialogHtml = remoteHtml;
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
        var parsedHtml = template($.extend(myData, data));
        _.templateSettings.variable = old_var;

        return parsedHtml;
      }

      function praseData(dataModel, html) {
        /*<img src="<%= com_parking.vendor.map %>"></img> */
        var parsedHtml = template_me(html, dataModel);
        _self.html(parsedHtml);
        bindElements(dataModel);

        var mapImage = new Image();
        $(mapImage).load(function () {
          $('.com_parking_widget_pakring_map_container', _self).html(mapImage)
            .addClass("com_parking_widget_pakring_map");

          $('.com_parking_widget_pakring_blocks', _self).show();

        }).attr('src', dataModel.vendor.map).error(function () {
          alert("Error loading map image");
        });
      }

      function bindElements(dataModel) {
        $(".com_parking_widget_footer .com_parking_widget_showdetails").click(function () {
          toggleParkingDetail(dataModel);
        });


        $(".com_parking_widget_block_icon").click(function () {
          var parking = JSON.parse($(this).attr("data-parking"));
          showParkingBlockInfo(parking, $(this));
        });
      }

      function closeDialog() {
        $(".com_parking_widget_parking_dialog").hide();
      }

      function showParkingBlockInfo(parking, obj) {
        console.log("clicked on ", parking);
        var parsedHtml = template_me(dialogHtml, { selectedparking: parking, dictionary: dictionary });
        $(".com_parking_widget_parking_dialog").html(parsedHtml);

        var top = obj.css("top");
        var left = obj.css("left");
        $(".com_parking_widget_parking_dialog").css("top", top);
        $(".com_parking_widget_parking_dialog").css("left", left);
        $(".com_parking_widget_parking_dialog").show();
        $(".com_parking_dialog_header a").click(function () {
          closeDialog();
        });

        $(".com_parking_dialog_btn_reserve").click(function (e) {
          var my_element = $(this)[0];

          e.detail = parking;
          triggerEvent(my_element, 'customChangeEvent', e);
          closeDialog();

        });
      }

      function triggerEvent(el, eventName, options) {
        var event;
        if (window.CustomEvent) {
          event = new CustomEvent(eventName, options);
        } else {
          event = document.createEvent('CustomEvent');
          event.initCustomEvent(eventName, true, true, options);
        }
        el.dispatchEvent(event);
      }

      function toggleParkingDetail(dataModel) {
        $(".com_parking_widget_container").slideToggle("slow", function () {
          if ($(".com_parking_widget_container").is(":visible") == true) {
            $(".com_parking_widget_footer hr").show();
            $(".com_parking_widget_footer .com_parking_widget_showdetails").html(dataModel.dictionary.hideDetails);
          }
          else {
            $(".com_parking_widget_footer hr").hide();
            $(".com_parking_widget_footer .com_parking_widget_showdetails").html(dataModel.dictionary.showDetails);
          }
        });
      }

      function initPlugin() {
        loadCss();
        loadDataModel(loadHtml);
      }

      initPlugin();

      return this;
    };

    $(jSelector).comParckingPlugin();
  } (jQuery, jSelector, window, document));
=======
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
>>>>>>> 469d3db173dff89b3daaca7626fabb9991e8e09b
}