cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-app-preferences.apppreferences",
        "file": "plugins/cordova-plugin-app-preferences/www/apppreferences.js",
        "pluginId": "cordova-plugin-app-preferences",
        "clobbers": [
            "plugins.appPreferences"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-background-mode.BackgroundMode",
        "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
        "pluginId": "cordova-plugin-background-mode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    },
    {
        "id": "cordova-plugin-cookieemperor.cookieEmperor",
        "file": "plugins/cordova-plugin-cookieemperor/www/cookieEmperor.js",
        "pluginId": "cordova-plugin-cookieemperor",
        "clobbers": [
            "cookieEmperor"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "cordova-plugin-local-notification.LocalNotification",
        "file": "plugins/cordova-plugin-local-notification/www/local-notification.js",
        "pluginId": "cordova-plugin-local-notification",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "id": "cordova-plugin-local-notification.LocalNotification.Core",
        "file": "plugins/cordova-plugin-local-notification/www/local-notification-core.js",
        "pluginId": "cordova-plugin-local-notification",
        "clobbers": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "id": "cordova-plugin-local-notification.LocalNotification.Util",
        "file": "plugins/cordova-plugin-local-notification/www/local-notification-util.js",
        "pluginId": "cordova-plugin-local-notification",
        "merges": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-app-event": "1.2.1",
    "cordova-plugin-app-preferences": "0.99.3",
    "cordova-plugin-device": "1.1.7",
    "cordova-plugin-background-mode": "0.7.2",
    "cordova-plugin-compat": "1.2.0",
    "cordova-plugin-cookieemperor": "1.0.0",
    "cordova-plugin-geolocation": "2.4.3",
    "cordova-plugin-local-notification": "0.8.4",
    "cordova-plugin-whitelist": "1.3.2"
};
// BOTTOM OF METADATA
});