'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-marquee-increment', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-marquee-increment');
    },
    enumerable: true,
    configurable: true
};
