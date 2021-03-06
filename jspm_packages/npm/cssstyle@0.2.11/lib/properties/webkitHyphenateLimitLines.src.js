'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-hyphenate-limit-lines', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-hyphenate-limit-lines');
    },
    enumerable: true,
    configurable: true
};
