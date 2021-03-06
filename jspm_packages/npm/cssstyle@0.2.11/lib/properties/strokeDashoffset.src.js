'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('stroke-dashoffset', v);
    },
    get: function () {
        return this.getPropertyValue('stroke-dashoffset');
    },
    enumerable: true,
    configurable: true
};
