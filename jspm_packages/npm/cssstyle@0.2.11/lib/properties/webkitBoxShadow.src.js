'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-box-shadow', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-box-shadow');
    },
    enumerable: true,
    configurable: true
};
