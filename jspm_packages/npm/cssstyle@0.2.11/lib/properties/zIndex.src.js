'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('z-index', v);
    },
    get: function () {
        return this.getPropertyValue('z-index');
    },
    enumerable: true,
    configurable: true
};
