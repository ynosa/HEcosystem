'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-filter', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-filter');
    },
    enumerable: true,
    configurable: true
};
