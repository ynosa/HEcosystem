'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-rtl-ordering', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-rtl-ordering');
    },
    enumerable: true,
    configurable: true
};
