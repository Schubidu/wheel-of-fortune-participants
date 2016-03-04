"use strict";
var Generator = require('./generator');

class GeneratorCSV extends Generator {
    constructor(filename, cols) {
        super({ext: 'csv', filename});
        this.cols = cols;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        let participants = super.participants
            .map((data)=> {
                let p = [];
                this.cols.forEach((col) => {
                    p.push(data[col]);
                });
                return p.join(';');
            });
        return [this.cols.join(';')].concat(participants).join(require('os').EOL);
    }

    /**
     *
     * @param filename
     * @param cols
     * @returns {Generator}
     */
    static file(filename, cols) {
       return super.file(new GeneratorCSV(filename, cols));
    }
}

module.exports = GeneratorCSV;

