Famo.us-AjaxRequest
===================

*This is a simple XHR2 helper module for Famo.us framework.*

```javascript
req.get({ url: '/user/me' }).then(function(response) {
    // handle response
});
```

## Getting Started

### Dependency:
``AjaxRequest`` is using asynchronous requests and requires [Q](https://github.com/kriskowal/q) by Kris Kowal.
-   Add ``Q`` library in your HTML header, before you load ``Famo.us``. For example:
```HTML
<script type="text/javascript" src="q.js"></script>
<script type="text/javascript" src="https://famo.us/lib/alameda.min.js"></script>
<script type="text/javascript" src="http://code.famo.us/famous/0.2/famous.min.js"></script>

```

### How to load
-   Pull in with ``require(AjaxRequest);``
-   Create a new instance by passing options to ``AjaxRequest`` methods. Any passed options will override the defaults.

## Supported methods
```javascript
.get(options)
.post(options)  // request method overrides to 'POST'
```

## Default Options
```javascript
{
    method: 'GET',
    url:    undefined,
    type:   'application/json',
    params: undefined,
    timeout: 5000       // ms, before request times out
}
```

## Examples
```javascript
var ajaxRequest = require('AjaxRequest');

var req = new ajaxRequest();
req.get({ url: '/user/me' }).then(function(response) {
    // handle server response
    console.log(response);
}).catch(function(err) { console.log(err); }).done();
```

```javascript
var ajaxRequest = require('AjaxRequest');

var req = new ajaxRequest();
var user = {
    username: 'James',
    password: 'Bond'
};
req.post({ 
    url: '/auth/login',
    params: user,
    timeout: 10000
}).then(function(response) {
    // handle server response
    console.log(response);
}).catch(function(err) { console.log(err); }).done();
```

## License
GPLv3
