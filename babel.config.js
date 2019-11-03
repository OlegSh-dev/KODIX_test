const presets = [
    [
        "@babel/env",
        {
            targets: { // версии браузеров которые нужно поддерживать
                edge: "12",
                firefox: "20",
                chrome: "29",
                safari: "9",
                ie: "10",
            },
            useBuiltIns: "usage", // эта настройка babel-polyfill, если стоит значение usage, то будут подставлятся полифилы для версий браузеров которые указали выше.
            corejs: "3.0.0", // явно проставить версию corejs
                     "targets": { // указать цели, для полифилов
                            "esmodules": true, // es модули 
                             "ie": "10" // Internet Expolorer 10
                 }
        },
    ],
];

module.exports = { presets };