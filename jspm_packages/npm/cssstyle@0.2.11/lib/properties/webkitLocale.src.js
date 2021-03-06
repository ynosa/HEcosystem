'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-locale', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-locale');
    },
    enumerable: true,
    configurable: true
};
