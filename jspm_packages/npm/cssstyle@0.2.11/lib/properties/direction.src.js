'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('direction', v);
    },
    get: function () {
        return this.getPropertyValue('direction');
    },
    enumerable: true,
    configurable: true
};
