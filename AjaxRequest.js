define(function(require, exports, module) {
    var OptionsManager  = require('famous/core/OptionsManager');

    function AjaxRequest() {

        this.response = Q.defer();
        this.options = Object.create(AjaxRequest.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
    };

    AjaxRequest.DEFAULT_OPTIONS = {
        method: 'GET',
        url: undefined,
        type: 'application/json',
        params: undefined,
        timeout: 5000
    };

    AjaxRequest.prototype.get = function get(options) {
        _makeRequest.call(this, options);
        return this.response.promise;
    };

    AjaxRequest.prototype.post = function post(options) {
        this.options.post = 'POST';
        _makeRequest.call(this, options);
        return this.response.promise;
    };

    // make your own helper methods!
    // AjaxRequest.prototype.loginRequest = function loginRequest(options) {
    //     this.options.method = 'POST';
    //     this.options.url = '/auth/login';
    //     _makeRequest.call(this, options);
    //     return this.response.promise;
    // };

    function _makeRequest(options) {

        this._optionsManager.setOptions(options);

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            var req = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            try {
                var req = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    var req = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {};
            };
        };

        if (!req) {
            console.log('Unable to create an XMLHTTP instance');
            return false;
        };

        // .open(method, url, async)
        req.open(this.options.method, this.options.url, true);

        var ctx = this;
        req.onreadystatechange = function() {
            try {
                if (req.readyState === 4) {
                    if (req.status) {
                        ctx.response.resolve(req);
                    } else {
                        ctx.response.reject("HTTP " + req.status + " for " + ctx.options.url);
                    };   
                };
            } catch (e) {
                console.log('Exception: ' + e.description);
            };
        };
        req.setRequestHeader('Content-Type', this.options.type);
        this.options.timeout && setTimeout(this.response.reject, this.options.timeout);
        if (this.options.params) {
            if (this.options.type === 'application/json') {
                req.send(JSON.stringify(this.options.params));
            } else {
                req.send(this.options.params);
            };
        } else req.send();
    };

    module.exports = AjaxRequest;
});