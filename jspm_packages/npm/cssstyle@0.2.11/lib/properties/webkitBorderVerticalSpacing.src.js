'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-border-vertical-spacing', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-border-vertical-spacing');
    },
    enumerable: true,
    configurable: true
};
