'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-line-box-contain', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-line-box-contain');
    },
    enumerable: true,
    configurable: true
};
