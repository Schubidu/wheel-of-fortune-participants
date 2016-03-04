"use strict";
var Generator = require('./generator');

class GeneratorJSON extends Generator {
    constructor(filename) {
        super({ext: 'json', filename});
    }

    /**
     *
     * @returns {String}
     */
    toString() {
        return JSON.stringify(super.participants, null, 2);
    }

    /**
     *
     * @param filename
     * @returns {Generator}
     */
    static file(filename) {
       return super.file(new GeneratorJSON(filename));
    }
}

module.exports = GeneratorJSON;

