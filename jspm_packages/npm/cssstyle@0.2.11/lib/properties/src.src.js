'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('src', v);
    },
    get: function () {
        return this.getPropertyValue('src');
    },
    enumerable: true,
    configurable: true
};
