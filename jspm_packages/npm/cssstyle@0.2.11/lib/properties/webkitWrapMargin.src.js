'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-wrap-margin', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-wrap-margin');
    },
    enumerable: true,
    configurable: true
};
