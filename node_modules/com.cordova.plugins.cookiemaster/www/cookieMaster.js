var cookieMaster = {

    getCookies: function(url, successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'CookieMaster', 'getCookies',
                    [url]
        );
    },
    setCookies: function(url, jsonCookies, successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'CookieMaster', 'setCookies',
                    [url, jsonCookies]
        );
    },
    getCookieValue: function(url, cookieName, successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'CookieMaster', 'getCookieValue',
                    [url, cookieName]
        );
    },
    setCookieValue: function (url, cookieName, cookieValue, successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'CookieMaster', 'setCookieValue',
                    [url, cookieName, cookieValue]
        );
    },
    clear: function(successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'CookieMaster', 'clearCookies',
                    []
        );
    }
};
module.exports = cookieMaster;
