'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('text-overflow', v);
    },
    get: function () {
        return this.getPropertyValue('text-overflow');
    },
    enumerable: true,
    configurable: true
};
