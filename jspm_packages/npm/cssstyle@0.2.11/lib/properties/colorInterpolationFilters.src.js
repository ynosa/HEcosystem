'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('color-interpolation-filters', v);
    },
    get: function () {
        return this.getPropertyValue('color-interpolation-filters');
    },
    enumerable: true,
    configurable: true
};
