'use strict';

const through = require('through2');

function transform(parameters) {
    parameters = parameters || {};
    parameters.gtmId = parameters.gtmId || '';
    parameters.layerName = parameters.layerName || 'dataLayer';
    parameters.placeHolder = parameters.placeHolder || 'gtm';

    return through.obj(function (chunk, encoding, callback) {
        if (chunk.isNull()) {
            return callback(null, chunk);
        }
        if (chunk.isStream()) {
            return callback(new Error('Streams not supported'));
        }

        let html = chunk.contents.toString();
        if (html.match("<!-- headHolder:" + parameters.placeHolder + " -->")) {
            html = html.replace(new RegExp("<!-- headHolder:" + parameters.placeHolder + " -->", "gi"), "<script>var " + parameters.layerName + " = " + parameters.layerName + " || [];</script>" +
                "<!-- Google Tag Manager -->" +
                "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
                "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
                "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
                "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
                "})(window,document,'script','" + parameters.layerName + "','" + parameters.gtmId + "');</script>" +
                "<!-- End Google Tag Manager -->");
        }
        if (html.match("<!-- bodyHolder:" + parameters.placeHolder + " -->")) {
            html = html.replace(new RegExp("<!-- bodyHolder:" + parameters.placeHolder + " -->", "gi"), "<!-- Google Tag Manager (noscript) -->" +
                "<noscript><iframe src='https://www.googletagmanager.com/ns.html?id=" + parameters.gtmId + "'" +
                "height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript>" +
                "<!-- End Google Tag Manager (noscript) -->");
        }

        chunk.contents = new Buffer(html)
        callback(null, chunk)
    });
}

module.exports = transform;